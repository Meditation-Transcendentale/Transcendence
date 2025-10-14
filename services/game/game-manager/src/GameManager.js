// services/game/game-manager/src/GameManager.js
import natsClient from "./natsClient.js";
import { Game } from "./Game.js";
import {
	decodeMatchCreateRequest,
	encodeMatchCreateResponse,
	decodeMatchInput,
	encodePhysicsRequest,
	decodePhysicsResponse,
	encodeStateUpdate,
	encodeMatchSetup,
	encodeMatchScoreUpdate,
	decodeStateUpdate,
	decodeMatchQuit,
	encodeMatchEnd,
	encodeMatchEndBr,
} from "./proto/helper.js";

export class GameManager {
	constructor(nc) {
		this.nc = nc;
		this.games = new Map(); // gameId -> { type, state, inputs, tick, interval }
	}

	start() {
		console.log("[game-manager] Ready to manage games");
	}

	async init(natsUrl) {
		this.nc = await natsClient.connect(natsUrl);

		// Subscribe to "games.*.match.create" (req/rep)
		const subCreate = this.nc.subscribe("games.*.match.create");
		(async () => {
			for await (const msg of subCreate) {
				const [, mode] = msg.subject.split(".");
				await this._onMatchCreate(mode, msg);
			}
		})();

		// Subscribe to "games.*.match.start" (req/rep)
		const subStart = this.nc.subscribe("games.*.*.match.start");
		(async () => {
			for await (const msg of subStart) {
				const [, , gameId] = msg.subject.split(".");
				await this._onMatchStart(gameId);
			}
		})();

		// Subscribe to "games.*.match.end" (req/rep)
		const subEnd = this.nc.subscribe("games.*.*.match.quit");
		(async () => {
			for await (const msg of subEnd) {
				const [, , gameId] = msg.subject.split(".");
				const uuid = decodeMatchQuit(msg.data);
				await this.quitMatch(gameId, uuid);
			}
		})();

		// Subscribe to "games.*.*.match.input" (pub/sub)
		const subInput = this.nc.subscribe("games.*.*.match.input");
		(async () => {
			for await (const msg of subInput) {
				const [, , gameId] = msg.subject.split(".");
				const request = decodeMatchInput(msg.data);
				this._onMatchInput(gameId, request);
			}
		})();

		console.log("[GameManager] NATS subscriptions established");
	}

	// ─── NATS Handlers ──────────────────────────────────────────────

	/** Handle a match.create request */
	async _onMatchCreate(mode, msg) {
		let gameId = "",
			error = "";
		const request = decodeMatchCreateRequest(msg.data);
		try {
			let players = request.players;

			// For BR mode: fill with bots to reach 100 players
			if (mode === 'br') {
				const targetPlayers = 100;
				const realPlayers = players.length;

				if (realPlayers < targetPlayers) {
					console.log(`[GameManager] Filling BR game with ${targetPlayers - realPlayers} bots (${realPlayers} real players)`);

					// Add bot UUIDs with "bot-" prefix to distinguish from real players
					for (let i = realPlayers; i < targetPlayers; i++) {
						players.push(`bot-${i}`);
					}
				}
			}

			gameId = this.createMatch({
				mode,
				players: players,
			});
			this.nc.publish(
				`games.${mode}.${gameId}.match.setup`,
				encodeMatchSetup({ players: players })
			);
		} catch (err) {
			console.log(err.message);
			error = err.message;
		}
		console.log("📬 replying on", msg.reply);
		if (msg.reply) {
			const respBuf = encodeMatchCreateResponse({ gameId: gameId.toString() });
			msg.respond(respBuf);
			console.log("✅ replied with gameId=", gameId);
		} else {
			console.warn("⚠️ no reply subject; request() will time out.");
		}
	}

	// match.start (pub/sub)
	async _onMatchStart(gameId) {
		if (!this.launchMatch(gameId)) {
			console.warn(`[GameManager] could not launch match ${gameId}`);
		}
	}

	// match.end (pub/sub)
	async _onMatchEnd(gameId) {
		if (!this.endMatch(gameId)) {
			console.warn(`[GameManager] could not end match ${gameId}`);
		}
	}

	/** Handle incoming player inputs */
	_onMatchInput(gameId, request) {
		const match = this.games.get(gameId);
		if (!match || match.status !== "running") return;

		// queue inputs for next tick
		this.handleInput({
			gameId,
			paddleId: request.paddleId,
			move: request.move,
		});
	}

	// ─── Public API ─────────────────────────────────────────────────

	createMatch({ mode, players }) {
		const instance = new Game(mode, players);
		const state = instance.getState();
		const gameId = state.gameId;

		this.games.set(gameId.toString(), {
			instance,
			mode,
			state,
			inputs: {}, // tick → PlayerInput[]
			tick: 0,
			status: "created",
			interval: null,
			isPaused: false,
			resumeTick: 0,
			pendingServe: false,
			isGameOver: false,
		});
		console.log(`[GameManager] Created match ${gameId} (${mode})`);
		return gameId;
	}

	launchMatch(gameId) {
		const match = this.games.get(gameId.toString());
		if (!match || match.status !== "created") return false;

		match.status = "running";
		const tickMs = 1000 / 60;

		match.interval = setInterval(() => {
			this._tickMatch(gameId);
		}, tickMs);
		console.log(`[GameManager] Launched match ${gameId}`);
		return true;
	}

	handleInput({ gameId, paddleId, move }) {
		const match = this.games.get(gameId);
		const targetTick = match.tick + 1;

		if (!match.inputs[targetTick]) {
			match.inputs[targetTick] = [];
		}

		match.inputs[targetTick].push({
			id: paddleId,
			move,
		});
	}

	endMatch(gameId) {
		const match = this.games.get(gameId);
		if (!match) return false;

		if (match.interval) {
			clearInterval(match.interval);
			match.interval = null;
		}

		match.status = "ended";

		if (match.mode != `br`) {
			const buf = encodeMatchEnd({
				winnerId:
					match.state.score[0] == 5 ? match.instance.players[0] : match.instance.players[1],
				loserId:
					match.state.score[0] == 5 ? match.instance.players[1] : match.instance.players[0],
				score: match.state.score,
			});
			this.nc.publish(`games.${match.mode}.${gameId}.match.end`, buf);
		} else {
			// BR mode: send final ranks with player UUIDs ordered by rank
			const ranks = match.state.ranks || [];
			const playerUUIDs = match.instance.players || [];

			// Create array of {playerId, uuid, rank} objects
			const playerRankings = playerUUIDs.map((uuid, playerId) => ({
				playerId,
				uuid,
				rank: ranks[playerId] || 99  // Default rank 99 if not found
			}));

			// Sort by rank (1 = winner, higher numbers = worse placement)
			playerRankings.sort((a, b) => a.rank - b.rank);

			// Extract just the UUIDs in rank order
			const orderedPlayerIds = playerRankings.map(p => p.uuid);

			console.log(`[GameManager] BR game ended. Final rankings:`);
			playerRankings.forEach((p, index) => {
				const displayName = p.uuid.startsWith('bot-') ? `Bot ${p.uuid.substring(4)}` : p.uuid;
				const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '  ';
				console.log(`${medal} #${p.rank} - ${displayName}`);
			});

			const buf = encodeMatchEndBr({
				playerIds: orderedPlayerIds
			});
			this.nc.publish(`games.${match.mode}.${gameId}.match.end`, buf);
		}
		this.games.delete(gameId);

		console.log(`[GameManager] Ended match ${gameId}`);
		return true;
	}

	eliminatePlayerBR(gameId, uuid) {
		const match = this.games.get(gameId);
		if (!match || match.mode !== 'br') return false;

		// Find the player ID from uuid
		const playerId = match.instance.players.indexOf(uuid);
		if (playerId === -1) {
			console.warn(`[GameManager] Player ${uuid} not found in game ${gameId}`);
			return false;
		}

		console.log(`[GameManager] Eliminating BR player ${uuid} (id: ${playerId}) from match ${gameId}`);

		// Send elimination message to physics service
		const eliminationData = JSON.stringify({ uuid: playerId.toString() });
		this.nc.publish(`games.br.${gameId}.player.eliminate`, new TextEncoder().encode(eliminationData));

		return true;
	}

	quitMatch(gameId, uuid) {
		const match = this.games.get(gameId);

		if (!match) return false;

		// For BR mode: eliminate player but don't end game unless ≤1 players remain
		if (match.mode === 'br') {
			const activePlayers = match.state.gameState?.activePlayers || [];

			// Check if quitting player is in active players
			const playerId = match.instance.players.indexOf(uuid);
			const isActivePlayer = activePlayers.includes(playerId);

			console.log(`[GameManager] BR player ${uuid} (id: ${playerId}) quit. Active players: ${activePlayers.length}`);

			// If this player is active and more than 1 active player remains, don't end game
			// The physics will handle elimination naturally when it detects no input
			if (isActivePlayer && activePlayers.length > 1) {
				// Don't end the game, just mark for elimination
				this.eliminatePlayerBR(gameId, uuid);
				return true;
			}
			// Otherwise fall through to end the game
		}

		// End the game for non-BR modes or when BR has ≤1 players
		if (match.interval) {
			clearInterval(match.interval);
			match.interval = null;
		}

		match.status = "ended";

		if (match.mode != `br`) {
			const buf = encodeMatchEnd({
				winnerId:
					match.instance.players[0] === uuid ? match.instance.players[1] : match.instance.players[0],
				loserId:
					match.instance.players[0] === uuid ? match.instance.players[0] : match.instance.players[1],
				score: match.state.score,
				forfeitId:
					match.instance.players[0] === uuid ? match.instance.players[0] : match.instance.players[1],
			});
			this.nc.publish(`games.${match.mode}.${gameId}.match.end`, buf);
		} else {
			// BR mode: send final ranks with player UUIDs ordered by rank
			const ranks = match.state.ranks || [];
			const playerUUIDs = match.instance.players || [];

			// Create array of {playerId, uuid, rank} objects
			const playerRankings = playerUUIDs.map((uuid, playerId) => ({
				playerId,
				uuid,
				rank: ranks[playerId] || 99  // Default rank 99 if not found
			}));

			// Sort by rank (1 = winner, higher numbers = worse placement)
			playerRankings.sort((a, b) => a.rank - b.rank);

			// Extract just the UUIDs in rank order
			const orderedPlayerIds = playerRankings.map(p => p.uuid);

			console.log(`[GameManager] BR game ended (quit). Final rankings:`);
			playerRankings.forEach((p, index) => {
				const displayName = p.uuid.startsWith('bot-') ? `Bot ${p.uuid.substring(4)}` : p.uuid;
				const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '  ';
				console.log(`${medal} #${p.rank} - ${displayName}`);
			});

			const buf = encodeMatchEndBr({
				playerIds: orderedPlayerIds
			});
			this.nc.publish(`games.${match.mode}.${gameId}.match.end`, buf);
		}
		this.games.delete(gameId);

		console.log(`[GameManager] Ended match ${gameId}`);
		return true;
	}

	// ─── Internal Tick Logic ─────────────────────────────────────────

	/** Tick a single match: req/rep → physics → update → broadcast */
	async _tickMatch(gameId) {
		const match = this.games.get(gameId);
		if (!match || match.status !== "running") return;

		match.tick++;

		const inputs = match.inputs[match.tick] || [];
		const lastState = match.state;

		// For BR mode: add random inputs for bot players
		if (match.mode === 'br') {
			const activePlayers = lastState.gameState?.activePlayers || [];

			match.instance.players.forEach((uuid, paddleId) => {
				// Check if this is a bot and is still active
				if (uuid.startsWith('bot-') && activePlayers.includes(paddleId)) {
					// Check if this bot already has input for this tick
					const hasInput = inputs.some(input => input.id === paddleId);

					if (!hasInput) {
						// Generate random move: -1 (left), 0 (none), or 1 (right)
						// Weight towards movement (less staying still)
						const rand = Math.random();
						let move;
						if (rand < 0.45) {
							move = -1; // Move left
						} else if (rand < 0.9) {
							move = 1; // Move right
						} else {
							move = 0; // Stay still
						}

						inputs.push({
							id: paddleId,
							move: move
						});
					}
				}
			});
		}

		try {
			// Send PhysicsRequest over NATS req/rep
			const reqBuf = encodePhysicsRequest({
				gameId: gameId.toString(),
				tick: match.tick,
				input: inputs,
				stage: lastState.stage,
			});
			const respMsg = await this.nc.request(
				`games.${match.mode}.${gameId}.physics.request`,
				reqBuf
			);
			const resp = decodePhysicsResponse(respMsg.data);

			const newState = lastState;
			newState.tick = resp.tick;
			newState.balls = resp.balls;
			newState.paddles = resp.paddles.map(paddle => {
				const playerIndex = paddle.paddleId !== undefined ? paddle.paddleId : paddle.playerId;
				const uuid = match.instance.players[playerIndex] || '';
				return {
					...paddle,
					paddleId: playerIndex,
					uuid: uuid
				};
			});
			newState.stage = resp.stage;
			newState.ranks = resp.ranks;
			newState.events = resp.events || [];
			newState.gameState = resp.gameState || {};
			if (resp.goal) {
				newState.score[resp.goal.scorerId] =
					(newState.score[resp.goal.scorerId] || 0) + 1;

				if (match.mode === "tournament") {
					console.log(`${newState.score}|${newState.score[0]}|${newState.score[1]}|${resp.goal.scorerId}`);
					const scoreBuf = encodeMatchScoreUpdate({ score: newState.score });
					this.nc.publish(`games.tournament.${gameId}.score`, scoreBuf);
				}
				if (newState.score[resp.goal.scorerId] >= (5 || Infinity)) {
					newState.isGameOver = true;
				}
			}

			match.state = newState;
			delete match.inputs[match.tick];

			const buf = encodeStateUpdate({
				gameId: newState.gameId.toString(),
				tick: newState.tick,
				balls: newState.balls,
				paddles: newState.paddles,
				score: newState.score,
				ranks: newState.ranks,
				stage: newState.stage,
				events: newState.events,
				gameState: newState.gameState,
			});

			this.nc.publish(`games.${match.mode}.${gameId}.match.state`, buf);
			if (match.state.isGameOver || resp.end) {
				this.endMatch(gameId);
				return;
			}
		} catch (err) {
			console.error(`[GameManager] Tick failed for ${gameId}:`, err);
			return;
		}
	}
}
