// services/game/game-manager/src/GameManager.js
import natsClient from './natsClient.js';
import { Game } from './Game.js';
import {
	decodeMatchCreateRequest,
	encodeMatchCreateResponse,
	decodeMatchInput,
	encodePhysicsRequest,
	decodePhysicsResponse,
	encodeStateUpdate
} from './message.js';
import { JSONCodec } from 'nats';
const jc = JSONCodec();

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
				await this._onMatchCreate(msg);
			}
		})();

		// Subscribe to "games.*.match.start" (req/rep)
		const subStart = this.nc.subscribe('games.*.*.match.start');
		(async () => {
			for await (const msg of subStart) {
				await this._onMatchStart(msg);
			}
		})();

		// Subscribe to "games.*.match.end" (req/rep)
		const subEnd = this.nc.subscribe('games.*.*.match.end');
		(async () => {
			for await (const msg of subEnd) {
				await this._onMatchEnd(msg);
			}
		})();

		// Subscribe to "games.*.*.match.input" (pub/sub)
		const subInput = this.nc.subscribe('games.*.*.match.input');
		(async () => {
			for await (const msg of subInput) {
				this._onMatchInput(msg);
			}
		})();

		console.log('[GameManager] NATS subscriptions established');
	}

	// ─── NATS Handlers ──────────────────────────────────────────────

	/** Handle a match.create request */
	async _onMatchCreate(msg) {
		const [, mode] = msg.subject.split('.');
		let gameId = '', error = '';

		try {
			const req = decodeMatchCreateRequest(msg.data);
			const players = req.players;
			gameId = this.createMatch({
				mode,
				players: players,
				options: req.options
			});
		} catch (err) {
			error = err.message;
		}

		const respBuf = encodeMatchCreateResponse({ gameId, error });
		msg.respond(respBuf);
		this.nc.publish(`games.${mode}.match.setup`, JSON.stringify({ gameId, players }));
	}

	// match.start (pub/sub)
	async _onMatchStart(msg) {
		const { gameId } = jc.decode(msg.data);

		if (!this.launchMatch(gameId)) {
			console.warn(`[GameManager] could not launch match ${gameId}`);
		}
	}

	// match.end (pub/sub)
	async _onMatchEnd(msg) {
		const { gameId } = jc.decode(msg.data);

		if (!this.endMatch(gameId)) {
			console.warn(`[GameManager] could not end match ${gameId}`);
		}
	}

	/** Handle incoming player inputs */
	_onMatchInput(msg) {
		const [, , gameId] = msg.subject.split('.');
		let req;
		try {
			req = decodeMatchInput(msg.data);
		} catch {
			return;
		}

		const match = this.games.get(gameId);
		if (!match) return;

		// queue inputs for next tick
		for (const pi of req.inputs) {
			this.handleInput({
				gameId,
				playerId: pi.playerId,
				input: pi,
			});
		}
	}

	// ─── Public API ─────────────────────────────────────────────────

	createMatch({ mode, players, options = {} }) {
		const instance = new Game({ mode, ...options });
		instance.players = players;
		const state = instance.getState();
		const gameId = state.gameId;

		this.games.set(gameId, {
			instance,
			mode,
			state,
			inputs: {},       // tick → PlayerInput[]
			tick: 0,
			options,
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
		const match = this.games.get(gameId);
		if (!match || match.status !== 'created') return false;

		match.status = 'running';
		const tickMs = 1000 / (match.options.tickRate || 60);

		match.interval = setInterval(() => {
			this._tickMatch(gameId);
		}, tickMs);
		console.log(`[GameManager] Launched match ${gameId}`);
		return true;
	}

	handleInput({ gameId, playerId, input, tick }) {
		const match = this.games.get(gameId);
		if (!match || match.status !== 'running') return;

		const targetTick = Number.isInteger(tick)
			? tick
			: match.tick + 1;

		if (!match.inputs[targetTick]) {
			match.inputs[targetTick] = [];
		}

		match.inputs[targetTick].push({
			playerId,
			...input
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

		this.nc.publish(
			`games.${match.mode}.${gameId}.match.end`,
			JSON.stringify({ gameId })
		);

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

		// Handle paused state
		if (match.isPaused) {
			if (match.tick < match.resumeTick) {
				const updBuf = encodeStateUpdate({ state: match.state });
				this.nc.publish(
					`games.${match.mode}.${gameId}.state.update`,
					updBuf
				);
				return;
			}
			match.isPaused = false;

			const inputsThisTick = match.inputs[match.tick] || [];
			if (match.pendingServe) {
				inputsThisTick.push({
					playerId: null,
					input: { type: 'serve' }
				});
				match.pendingServe = false;
			}
			match.inputs[match.tick] = inputsThisTick;
		}

		const inputs = match.inputs[match.tick] || [];
		const lastState = match.state;

		try {
			// Send PhysicsRequest over NATS req/rep
			const reqBuf = encodePhysicsRequest({ gameId, inputs, lastState });
			const respMsg = await this.nc.request(
				`games.${match.mode}.${gameId}.physics.request`,
				reqBuf
			);
			const resp = decodePhysicsResponse(respMsg.data);
			if (resp.error) throw new Error(resp.error);

			// Handle goal if one occurred this tick
			const newState = resp.newState;
			if (resp.goalScored) {
				newState.scores[resp.scorerId] = (newState.scores[resp.scorerId] || 0) + 1;

				match.isPaused = true;
				const pauseMs = match.options.pauseMs || 1000;
				const tickMs = 1000 / (match.options.tickRate || 60);
				const pauseTicks = Math.ceil(pauseMs / tickMs);
				match.resumeTick = match.tick + pauseTicks;
				match.pendingServe = true;
				if (newState.scores[resp.scorerId] >= (match.options.winScore || Infinity)) {
					newState.isGameOver = true;
				}
			}

			match.state = newState;
			delete match.inputs[match.tick];

			const updBuf = encodeStateUpdate({ state: newState });
			this.nc.publish(
				`games.${match.mode}.${gameId}.state.update`,
				updBuf
			);
			if (match.state.isGameOver) {
				this.endMatch(gameId);
				return;
			}
		} catch (err) {
			console.error(`[GameManager] Tick failed for ${gameId}:`, err);
		}
	}
}
