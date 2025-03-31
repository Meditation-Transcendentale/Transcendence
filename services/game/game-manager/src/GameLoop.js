// services/game-manager/src/GameLoop.js
import { Game } from './Game.js';

export class GameManager {
	constructor(nc) {
		this.nc = nc;
		this.games = new Map(); // gameId -> { type, state, inputs, tick, interval }
	}

	start() {
		console.log('[game-manager] Ready to manage games');
		const players = ['p1', 'p2', 'p3', 'p4', 'p5'];
		const options = { mode: 'pongBR', ballCount: 3 };
		const gameId = this.createMatch(players, options);
		console.log(`[game-manager] Test match started: ${gameId}`);
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

		this.nc.publish('game.update', JSON.stringify({ gameId, state, tick }));
	}

	createMatch(players, options = {}) {
		const gameInstance = new Game(players, options);
		const gameId = gameInstance.getState().gameId;
		const tickRate = 1000 / 30; // 30Hz

		const match = {
			type: gameInstance.mode,
			state: gameInstance.getState(),
			tick: 0,
			inputs: {},
			interval: setInterval(() => {
				match.tick++;
				const inputs = match.inputs[match.tick] || [];
				this.nc.publish(`game.${match.type}.tick`, JSON.stringify({
					gameId,
					tick: match.tick,
					state: match.state,
					inputs
				}));
			}, tickRate)
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
}
