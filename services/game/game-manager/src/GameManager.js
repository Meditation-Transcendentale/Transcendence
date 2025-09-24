// services/game/game-manager/src/GameManager.js
import natsClient from './natsClient.js';
import { Game } from './Game.js';
import {
	decodeMatchCreateRequest,
	encodeMatchCreateResponse,
	decodeMatchInput,
	encodePhysicsRequest,
	decodePhysicsResponse,
	encodeStateUpdate,
	encodeMatchSetup,
	decodeStateUpdate,
	decodeMatchQuit,
	encodeMatchEnd
} from './proto/helper.js';

export class GameManager {
	constructor(nc) {
		this.nc = nc;
		this.games = new Map(); // gameId -> { type, state, inputs, tick, interval }
	}

	start() {
		console.log('[game-manager] Ready to manage games');
	}

	async init(natsUrl) {
		this.nc = await natsClient.connect(natsUrl);

		// Subscribe to "games.*.match.create" (req/rep)
		const subCreate = this.nc.subscribe('games.*.match.create');
		(async () => {
			for await (const msg of subCreate) {
				const [, mode] = msg.subject.split('.');
				await this._onMatchCreate(mode, msg);
			}
		})();

		// Subscribe to "games.*.match.start" (req/rep)
		const subStart = this.nc.subscribe('games.*.*.match.start');
		(async () => {
			for await (const msg of subStart) {
				const [, , gameId] = msg.subject.split('.');
				await this._onMatchStart(gameId);
			}
		})();

		// Subscribe to "games.*.match.end" (req/rep)
		const subEnd = this.nc.subscribe('games.*.*.match.quit');
		(async () => {
			for await (const msg of subEnd) {
				const [, , gameId] = msg.subject.split('.');
				const uuid = decodeMatchQuit(msg.data);
				await this._onMatchEnd(gameId);
			}
		})();

		// Subscribe to "games.*.*.match.input" (pub/sub)
		const subInput = this.nc.subscribe('games.*.*.match.input');
		(async () => {
			for await (const msg of subInput) {
				const [, , gameId] = msg.subject.split('.');
				const request = decodeMatchInput(msg.data);
				this._onMatchInput(gameId, request);
			}
		})();

		console.log('[GameManager] NATS subscriptions established');
	}

	// ─── NATS Handlers ──────────────────────────────────────────────

	/** Handle a match.create request */
	async _onMatchCreate(mode, msg) {
		let gameId = '', error = '';
		const request = decodeMatchCreateRequest(msg.data);
		try {
			const players = request.players;
			gameId = this.createMatch({
				mode,
				players: players,
			});
			this.nc.publish(`games.${mode}.${gameId}.match.setup`, encodeMatchSetup({ players: players }));
		} catch (err) {
			console.log(err.message);
			error = err.message;
		}
		console.log('📬 replying on', msg.reply);
		if (msg.reply) {
			const respBuf = encodeMatchCreateResponse({ gameId: gameId.toString() });
			msg.respond(respBuf);
			console.log('✅ replied with gameId=', gameId);
		} else {
			console.warn('⚠️ no reply subject; request() will time out.');
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
		if (!match || match.status !== 'running') return;

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
			inputs: {},       // tick → PlayerInput[]
			tick: 0,
			status: 'created',
			interval: null,
			isPaused: false,
			resumeTick: 0,
			pendingServe: false,
			isGameOver: false
		});
		console.log(`[GameManager] Created match ${gameId} (${mode})`);
		return gameId;
	}

	launchMatch(gameId) {
		const match = this.games.get(gameId.toString());
		if (!match || match.status !== 'created') return false;

		match.status = 'running';
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

		match.status = 'ended';

		if (match.mode != `br`) {
			const buf = encodeMatchEnd({
				winnerId: match.state.score[0] == 5 ? match.state.paddles[0].playerId : match.state.paddles[1].playerId,
				score: match.state.score
			});
			this.nc.publish(`games.${match.mode}.${gameId}.match.end`, buf);
		}
		else {
			this.nc.publish(`games.${match.mode}.${gameId}.match.end`, new Uint8Array());
			const testTab = [
				{ placement: 10, uuid: "4ef15e0f-e6f8-4e57-820c-2c291eabc585" },
				{ placement: 2, uuid: "da5e5254-8370-4672-b022-f55f4f427b1d" },
				{ placement: 3, uuid: "c0ef0080-66db-45ad-a0b5-46e7085944ad" },
				{ placement: 4, uuid: "77402928-b8f3-4cf7-bfe7-794ca3988642" },
				{ placement: 5, uuid: "6ea7ba81-4ad6-402e-953e-4de4ee3391d3" },
				{ placement: 6, uuid: "f1d660d6-75fd-487a-b808-99bbbf44c833" },
				{ placement: 7, uuid: "4b4b872b-6ac4-481f-8339-425e21ba9a0c" },
				{ placement: 8, uuid: "51630d5b-5f2a-4e44-807a-0e61993abd28" },
				{ placement: 9, uuid: "953e0f14-3359-41af-9632-ef55cb5d3e26" },
				{ placement: 1, uuid: "ef884486-f1fe-4370-b317-3ae49ba4afb6" },
				{ placement: 11, uuid: "af8ed3a0-049a-47a8-b0f3-b8bac469c962" },
				{ placement: 12, uuid: "895c7ba7-ac4c-4464-9cd8-442389d6a302" },
				{ placement: 13, uuid: "e430afb0-ac7f-4104-8e1e-528ee7101533" },
				{ placement: 14, uuid: "b8f9d1df-0807-44e7-af0b-017bff750311" },
				{ placement: 15, uuid: "92daf4f7-2135-46d1-b417-857b7e52c021" },
				{ placement: 16, uuid: "9ffdc5a8-75e0-4165-8f32-6da50d505782" },
				{ placement: 17, uuid: "3c273117-be18-4f70-a127-a2e632bcee94" },
				{ placement: 18, uuid: "a097e800-ac72-4b6f-a992-a22de8a44dd8" },
				{ placement: 19, uuid: "b74492e5-dcb0-4c31-87e2-51d9bfe477af" },
				{ placement: 20, uuid: "40357108-b64d-4881-897d-bad9185c5797" } 
			];
			// this.nc.publish(`stats.endgame`, testTab);
		}
		this.games.delete(gameId);

		console.log(`[GameManager] Ended match ${gameId}`);
		return true;
	}

	// ─── Internal Tick Logic ─────────────────────────────────────────

	/** Tick a single match: req/rep → physics → update → broadcast */
	async _tickMatch(gameId) {
		const match = this.games.get(gameId);
		if (!match || match.status !== 'running') return;

		match.tick++;

		const inputs = match.inputs[match.tick] || [];
		const lastState = match.state;

		try {
			// Send PhysicsRequest over NATS req/rep
			const reqBuf = encodePhysicsRequest({ gameId: gameId.toString(), tick: match.tick, input: inputs, stage: lastState.stage });
			const respMsg = await this.nc.request(`games.${match.mode}.${gameId}.physics.request`, reqBuf);
			const resp = decodePhysicsResponse(respMsg.data);

			const newState = lastState;
			newState.tick = resp.tick;
			newState.balls = resp.balls;
			newState.paddles = resp.paddles;
			newState.stage = resp.stage;
			newState.ranks = resp.ranks;
			newState.events = resp.events || [];        // ADD THIS
			newState.gameState = resp.gameState || {};
			if (resp.goal) {
				newState.score[resp.goal.scorerId] = (newState.score[resp.goal.scorerId] || 0) + 1;

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
				gameState: newState.gameState
			});

			this.nc.publish(
				`games.${match.mode}.${gameId}.match.state`,
				buf
			);
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
