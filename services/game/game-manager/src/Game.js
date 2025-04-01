// services/game/game-manager/src/Game.js
export class Game {
	constructor(options = {}) {
		this.players = []; // Array of playerIds
		this.options = options;
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
			mode: this.mode,
			options: this.options
		};

		for (let i = 0; i < this.ballCount; i++) {
			state.balls.push({
				x: 50,
				y: 50,
				vx: 1,
				vy: 1
			});
		}

		const maxPlayers = this.options.maxPlayers || this.players.length || 2;
		const playerIds = this.players.length > 0
			? this.players
			: Array.from({ length: maxPlayers }, (_, i) => `slot-${i}`);

		for (const playerId of playerIds) {
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
