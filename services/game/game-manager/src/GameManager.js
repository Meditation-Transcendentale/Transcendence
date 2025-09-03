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
				winnerUuid: match.state.score[0] == 5 ? match.state.paddles[0].playerId : match.state.paddles[1].playerId,
				score: match.state.score
			});
			this.nc.publish(`games.${match.mode}.${gameId}.match.end`, buf);
		}
		else
			this.nc.publish(`games.${match.mode}.${gameId}.match.end`, new Uint8Array());
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
