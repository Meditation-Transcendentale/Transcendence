// services/game/game-manager/src/GameManager.js
import { Game } from './Game.js';

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
				const data = JSON.parse(msg.data.toString());
				this.handlePhysicsResult(data);
			}
		});

	}

	handleInput({ gameId, playerId, input, tick }) {
		const game = this.games.get(gameId);
		if (!game) return;
		if (!game.inputs[tick]) game.inputs[tick] = [];
		game.inputs[tick].push({ playerId, input });
	}

	handlePhysicsResult({ gameId, state, tick }) {
		const game = this.games.get(gameId);
		if (!game) return;
		game.state = state;

		console.log(`[game-manager] Received state for game ${gameId} at tick ${tick}`);
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
