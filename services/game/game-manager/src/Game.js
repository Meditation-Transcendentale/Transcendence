// services/game-manager/src/Game.js

export class Game {
	constructor(players, options = {}) {
		this.players = players; // Array of playerIds
		this.mode = options.mode || 'pong';
		this.ballCount = options.ballCount || 1;
		this.state = this.initializeState();
	}

	initializeState() {
		const state = {
			gameId: this.generateGameId(),
			tick: 0,
			balls: [],
			paddles: {},
			score: {},
			mode: this.mode
		};

		for (let i = 0; i < this.ballCount; i++) {
			state.balls.push({
				x: 50,
				y: 50,
				vx: 1,
				vy: 1
			});
		}

		for (const playerId of this.players) {
			state.paddles[playerId] = { y: 40 };
			state.score[playerId] = 0;
		}

		return state;
	}

	getState() {
		return this.state;
	}

	updateState(newState) {
		this.state = newState;
	}

	generateGameId() {
		return 'game-' + Math.random().toString(36).substr(2, 9);
	}
}
