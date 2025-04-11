// services/game/game-manager/src/GameManager.js
import { decodeStateUpdate } from './binary.js';
import { Game } from './Game.js';
import { JSONCodec } from 'nats';
const jc = JSONCodec();

export class GameManager {
	constructor() {
		this.nc = null;
		this.games = new Map(); // gameId -> { type, state, inputs, tick, interval }
	}

	start() {
		console.log('[game-manager] Ready to manage games');

		// this.nc.subscribe('game.state', {
		// 	callback: (err, msg) => {
		// 		if (err) return console.error('NATS error:', err);
		// 		try {
		// 			// const data = jc.decode(msg.data);
		// 			this.handlePhysicsResult(msg);
		// 		} catch (err) {
		// 			console.error('[game-manager] Failed to decode message:', err);
		// 			console.error('Raw message:', msg.data.toString());
		// 		}
		// 	}
		// });
	}

	handleInput({ type, gameId, playerId, input, tick }) {
		const game = this.games.get(gameId);
		if (!game) return;

		if (type === 'disableWall' || type === 'enableWall' || type === 'newPlayerConnected') {
			this.nc.publish(`game.pongBR.input`, JSON.stringify({
				gameId,
				inputs: [{ playerId, type }]
			}));
			return;
		}

		const currentTick = typeof tick === 'number' ? tick : game.tick + 1;
		if (!game.inputs[currentTick]) {
			game.inputs[currentTick] = [];
		}
		game.inputs[currentTick].push({ playerId, type, input });
	}
	handlePhysicsResult(buffer) {
		const state = decodeStateUpdate(buffer);
		const game = this.games.get(state.gameId);
		if (!game) return;
		game.state = state;

		this.nc.publish(game.options.stateTopic, buffer);
	}

	createMatch(options = {}) {
		const gameInstance = new Game(options);
		const gameId = gameInstance.getState().gameId;
		const tickRate = 1000 / (options.tickRate || 60);

		const match = {
			type: gameInstance.mode,
			state: gameInstance.getState(),
			tick: 0,
			inputs: {},
			options,
			status: 'created',
			interval: null
		};

		this.games.set(gameId, match);
		console.log(`[game-manager] Created ${match.type} match ${gameId}`);
		return gameId;
	}

	endMatch(gameId) {
		const match = this.games.get(gameId);
		if (match) {

			match.status = 'ended'
			this.nc.publish(`game.${match.type}.end`, JSON.stringify({ gameId }));
			this.games.delete(gameId);
			console.log(`[game-manager] Ended match ${gameId}`);
		}
	}

	launchGame(gameId) {
		const match = this.games.get(gameId);
		if (!match || match.status !== 'created') return false;

		match.status = 'running';
		const tickRate = 1000 / (match.options.tickRate || 60);

		const gameLoop = () => {
			if (match.status !== 'running') return;
			const startTime = Date.now();
			match.tick++;
			const inputs = match.inputs[match.tick] || [];
			this.nc.publish(match.options.physicsTopic, JSON.stringify({
				gameId,
				tick: match.tick,
				state: match.state,
				inputs
			}));

			const elapsed = Date.now() - startTime;
			const delay = Math.max(0, tickRate - elapsed);
			setTimeout(gameLoop, delay);
		};

		gameLoop();
		console.log(`[game-manager] Launched match ${gameId}`);
		return true;
	}
}
