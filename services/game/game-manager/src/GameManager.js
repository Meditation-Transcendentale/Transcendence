// services/game/game-manager/src/GameManager.js
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

		this.nc.subscribe('game.state', {
			callback: (err, msg) => {
				if (err) return console.error('NATS error:', err);
				try {
					const data = jc.decode(msg.data);
					this.handlePhysicsResult(data);
				} catch (err) {
					console.error('[game-manager] Failed to decode message:', err);
					console.error('Raw message:', msg.data.toString());
				}
			}
		});
	}

	handleInput({ type, gameId, playerId, input, tick }) {
		const game = this.games.get(gameId);
		if (!game) return;
		// console.log('Received input:', { type, gameId, playerId, input, tick });

		// Immediate inputs
		if (type === 'disableWall' || type === 'enableWall' || type === 'newPlayerConnected') {
			this.nc.publish(`game.pongBR.input`, JSON.stringify({
				gameId,
				inputs: [{ playerId, type }]
			}));
			return;
		}

		const currentTick = typeof tick === 'number' ? tick : game.tick + 1;
		// console.log(currentTick);
		if (!game.inputs[currentTick]) {
			game.inputs[currentTick] = [];
		}
		game.inputs[currentTick].push({ playerId, type, input });
		// console.log(`Stored input for tick ${currentTick}`, game.inputs[currentTick]);
	}
	handlePhysicsResult({ gameId, state, tick }) {
		const game = this.games.get(gameId);
		if (!game) return;
		game.state = state;

		//console.log(`[game-manager] Received state for game ${gameId} at tick ${tick}`);
		this.nc.publish(game.options.stateTopic, JSON.stringify({ gameId, state, tick }));
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

			clearInterval(match.interval);
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
		match.interval = setInterval(() => {
			match.tick++;
			const inputs = match.inputs[match.tick] || [];
			this.nc.publish(match.options.physicsTopic, JSON.stringify({
				gameId,
				tick: match.tick,
				state: match.state,
				inputs
			}));
		}, tickRate);

		console.log(`[game-manager] Launched match ${gameId}`);
		return true;
	}

}
