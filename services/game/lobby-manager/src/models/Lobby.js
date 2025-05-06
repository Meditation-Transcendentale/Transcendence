// ==== models/Lobby.js ====
export default class Lobby {
	constructor({ id, mode, map, submode, maxPlayers }) {
		this.id = id;
		this.mode = mode;
		this.map = map;
		if (mode != 'pong')
			this.submode = "none";
		else
			this.submode = submode;
		this.maxPlayers = maxPlayers;
		this.players = new Map(); // userId -> { isReady, lastSeen }
		this.createdAt = Date.now();
	}

	addPlayer(userId) {
		if (this.players.size >= this.maxPlayers) {
			throw new Error(`Lobby is full (max ${this.maxPlayers})`);
		}
		if (this.players.has(userId)) return;
		this.players.set(userId, { isReady: false, lastSeen: Date.now() });
	}

	markReady(userId) {
		const p = this.players.get(userId);
		if (p) p.isReady = true;
	}

	heartbeat(userId) {
		const p = this.players.get(userId);
		if (p) p.lastSeen = Date.now();
	}

	removePlayer(userId) {
		this.players.delete(userId);
	}

	allReady() {
		return (
			this.players.size > 0 &&
			[...this.players.values()].every(p => p.isReady)
		);
	}

	getState() {
		const players = [...this.players.keys()];
		const ready = players.filter(id => this.players.get(id).isReady);
		const status = this.allReady() ? 'starting' : 'waiting';

		return {
			lobbyId: this.id,
			mode: this.mode,
			map: this.map,
			submode: this.submode,
			maxPlayers: this.maxPlayers,
			currentCount: players.length,
			slotsRemaining: this.maxPlayers - players.length,
			players,
			ready,
			status: status,
		};
	}
};
