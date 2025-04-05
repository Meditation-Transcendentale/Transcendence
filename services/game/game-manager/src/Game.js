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
			walls: [],
			mode: this.mode,
			options: this.options
		};

		const circleRadius = 50;
		for (let i = 0; i < this.ballCount; i++) {
			const r = Math.sqrt(Math.random()) * circleRadius;
			const theta = Math.random() * 2 * Math.PI;
			const x = r * Math.cos(theta);
			const y = r * Math.sin(theta);
			state.balls.push({
				x,
				y,
				vx: 0,
				vy: 25
			});
		}

		const maxPlayers = this.options.maxPlayers || 100;
		const playerIds = this.players.length > 0
			? this.players
			: [];

		const arenaRadius = this.calculateArenaRadius(maxPlayers);

		for (let i = 0; i < maxPlayers; i++) {
			const angle = (2 * Math.PI / maxPlayers) * i;
			const x = arenaRadius * Math.cos(angle);
			const y = arenaRadius * Math.sin(angle);
			const rotation = -(angle + Math.PI / 2);

			state.walls.push({
				id: i,
				x,
				y,
				rotation,
				isActive: true
			});
		}

		for (let i = 0; i < maxPlayers; i++) {
			const playerId = playerIds[i];
			const angle = (2 * Math.PI / maxPlayers) * i;
			const x = arenaRadius * Math.cos(angle);
			const y = arenaRadius * Math.sin(angle);
			const rotation = -(angle + Math.PI / 2);

			state.paddles[playerId] = {
				id: playerId,
				x,
				y,
				offset: 0,
				connected: false,
				rotation
			};

			state.score[playerId] = 0;
		}

		return state;
	}

	calculateArenaRadius(numPlayers) {
		const playerWidth = 7;
		const centralAngleDeg = 360 / numPlayers;
		const halfCentralAngleRad = (centralAngleDeg / 2) * Math.PI / 180;
		return playerWidth / (2 * Math.sin(halfCentralAngleRad));
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
