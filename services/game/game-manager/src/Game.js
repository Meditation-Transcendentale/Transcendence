import { generateGameId, releaseGameId } from "./generateGameId.js";

// services/game/game-manager/src/Game.js
export class Game {
	constructor(mode, players) {
		this.players = players;
		this.mode = mode;
		switch (this.mode) {
			case "local":
				this.state = this.initializeStatePong();
				break;
			case "ia":
				this.state = this.initializeStatePong();
				break;
			case "online":
				this.state = this.initializeStatePong();
				break;
			case "pongBR":
				this.state = this.initializeStatePongBR();
				break;
			case "pongIO":
				this.state = this.initializeStatePongIO();
				break;
			default:
				console.log(`Game init can't find game mode: ${this.mode}`);
		}
	}

	initializeStatePong() {
		const state = {
			gameId: this.createGameId(),
			tick: 0,
			balls: [],
			paddles: [],
			score: [],
			ranks: null,
			stage: null,
		};

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

		return state;
	}

	initializeStatePongBR() {
		const state = {
			gameId: this.createGameId(),
			tick: 0,
			balls: [],
			paddles: {},
			score: {},
			ranks: [],
			stage: 0,
		};

		return state;
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
