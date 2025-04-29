import { generateGameId, releaseGameId } from "./generateGameId.js";

const config = {
	numberOfBalls: 1,
	wallWidth: 30,
	scaleFactor: 1,
	ballSize: 0.5,
	paddleHeight: 0.4,
	paddleWidth: 3,
	arenaHeight: 20,
	arenaWidth: 30,
	wallHeight: 1,
	paddleSpeed: 1,
	ballSpeed: 1,
	paddleOffsetRatio: 0.9
};

// services/game/game-manager/src/Game.js
export class Game {
	constructor(options = {}) {
		this.players = [];
		this.options = options;
		this.mode = options.mode || 'pong';
		this.ballCount = options.ballCount || 1;
		switch (this.mode) {
			case "pong":
				this.state = this.initializeStatePong();
				break;
			case "pongBR":
				this.state = this.initializeStatePongBR();
				break;
			case "pongIO":
				this.state = this.initializeStatePongIO();
				break;
			default:
				conole.log(`Game init can't find game mode: ${this.mode}`);
		}
		this.existingGameIds = new Set();
	}

	// Paddle for i = 0 && i = 1
	// paddleX = (arenaWidth / 2  * paddleOffsetRatio * ((i == 1) * -1 + (i == 0) * 1)) * scaleFactor
	// rotation_y = i % 2 ? -90 * Math.PI / 180 : 90 * Math.PI / 180
	//
	// Wall for i = 0 && i = 1
	//
	// x = i % 2 ? (config.arenaWidth / 2) * scaleFactor: 0
	// y = i % 2 ? 0 : ( config.arenaHeight/ 2 + config.wallWidth / 2 ) * scaleFactor
	// rotation_y = i % 2 ? 0 : 90 * Math.PI / 180
	//
	// const wallWidth = i % 2 ? arenaWidth * scaleFactor : arenaHeight * scaleFactor;

	initializeStatePong() {
		const state = {
			gameId: this.createGameId(),
			tick: 0,
			balls: [],
			paddles: {},
			score: {},
			walls: [],
			mode: this.mode,
			options: this.options
		};

		const playerIds = this.players.length > 0
			? this.players
			: [];
		for (let i = 0; i < 2; i++) {
			const posX = (config.arenaWidth / 2 * config.paddleOffsetRatio * ((i == 1) * -1 + (i == 0) * 1)) * config.scaleFactor
			const x = i ? -posX : posX;
			const y = 0;
			const rotation_y = i % 2 ? -90 * Math.PI / 180 : 90 * Math.PI / 180;
			const playerId = playerIds[i];

			state.paddles[playerId] = {
				id: playerId,
				x,
				y,
				offset: 0,
				connected: false,
				rotation_y
			};
		}
		for (let i = 0; i < 2; i++) {
			let x = i % 2 ? (config.arenaWidth / 2) * config.scaleFactor : 0;
			let y = i % 2 ? 0 : (config.arenaHeight / 2 + config.wallWidth / 2) * config.scaleFactor;
			const rotation = i % 2 ? 0 : 90 * Math.PI / 180;
			const wallWidth = i % 2 ? config.arenaWidth * config.scaleFactor : config.arenaHeight * config.scaleFactor;

			state.walls.push({
				id: i,
				x,
				y,
				rotation,
				isActive: true,
				wallWidth
			});
			x *= -1;
			y *= -1;
			console.log(x, y);
			state.walls.push({
				id: i,
				x,
				y,
				rotation,
				isActive: true,
				wallWidth
			});
		}
		state.balls.push({
			x: 0,
			y: 0,
			vx: 25,
			vy: 25
		});

		return state;
	}

	initializeStatePongIO() {
		const state = {
			gameId: this.createGameId(),
			tick: 0,
			balls: [],
			paddles: {},
			pillar: [],
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
				vy: 90
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

		const zoneAngleWidth = (2 * Math.PI) / maxPlayers;
		for (let i = 0; i < maxPlayers; i++) {
			const angle = (2 * Math.PI / maxPlayers) * i;
			const leftAngle = angle - zoneAngleWidth / 2;
			const x = arenaRadius * Math.cos(leftAngle);
			const y = arenaRadius * Math.sin(leftAngle);
			const rotation = -(leftAngle + (Math.PI / 2));
			state.pillar.push({
				id: i,
				x,
				y,
				rotation,
			});
		}
		return state;
	}
	initializeStatePongBR() {
		const state = {
			gameId: this.createGameId(),
			tick: 0,
			balls: [],
			paddles: {},
			pillar: [],
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

		const zoneAngleWidth = (2 * Math.PI) / maxPlayers;
		for (let i = 0; i < maxPlayers; i++) {
			const angle = (2 * Math.PI / maxPlayers) * i;
			const leftAngle = angle - zoneAngleWidth / 2;
			const x = arenaRadius * Math.cos(leftAngle);
			const y = arenaRadius * Math.sin(leftAngle);
			const rotation = -(leftAngle + (Math.PI / 2));
			state.pillar.push({
				id: i,
				x,
				y,
				rotation,
			});
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

	createGameId() {
		return generateGameId();
	}
	removeGameId(GameId) {
		releaseGameId(GameId);
	}
}
