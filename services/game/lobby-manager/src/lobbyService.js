// src/lobbyService.js
import config from './config.js';

// Simple Lobby model
class Lobby {
	constructor({ id, mode, map }) {
		this.id = id;
		this.mode = mode;
		this.map = map;
		this.maxPlayers = config.MAX_PLAYERS[mode] ?? 2;
		this.players = new Map();  // userId -> { isReady: boolean, lastSeen: timestamp }
		this.createdAt = Date.now();
	}

	addPlayer(userId) {
		if (this.players.size >= this.maxPlayers) {
			throw new Error(`Lobby is full (max ${this.maxPlayers})`);
		}
		if (!this.players.has(userId)) {
			this.players.set(userId, { isReady: false, lastSeen: Date.now() });
		}
		else {
			throw new Error(`Can't join lobby`);
		}
	}

	removePlayer(userId) {
		this.players.delete(userId);
	}

	markReady(userId) {
		const p = this.players.get(userId);
		if (!p) throw new Error('Player not in lobby');
		p.isReady = true;
	}

	getState() {
		const players = [...this.players.keys()];
		const status = 'waiting'; // extend with 'ready' logic if needed
		return {
			lobbyId: this.id,
			players,
			status,
		};
	}
}

export default class LobbyService {
	constructor() {
		this.lobbies = new Map();
		// Periodic cleanup of empty or stale lobbies
		this._interval = setInterval(() => this.cleanup(), config.HEARTBEAT_INTERVAL);
	}

	// Create a new lobby and return its initial state
	create({ mode, map }) {
		const id = Date.now().toString();
		const lobby = new Lobby({ id, mode, map });
		this.lobbies.set(id, lobby);
		return id;
	}

	// Add a player to a lobby
	join(lobbyId, userId) {
		const lobby = this.lobbies.get(lobbyId);
		if (!lobby) throw new Error('Lobby not found');
		lobby.addPlayer(userId);
		return lobby.getState();
	}

	// Remove a player from a lobby
	quit(lobbyId, userId) {
		const lobby = this.lobbies.get(lobbyId);
		if (lobby) {
			lobby.removePlayer(userId);
			return lobby.getState();
		}
		return null;
	}

	// List all current lobby states
	list() {
		return [...this.lobbies.values()].map(l => l.getState());
	}

	// Remove lobbies that are empty or too old
	cleanup() {
		const now = Date.now();
		for (const [id, lobby] of this.lobbies) {
			if (
				lobby.players.size === 0 ||
				now - lobby.createdAt > config.HEARTBEAT_INTERVAL * 2
			) {
				this.lobbies.delete(id);
			}
		}
	}

	// Stop the cleanup interval
	shutdown() {
		clearInterval(this._interval);
	}
}
