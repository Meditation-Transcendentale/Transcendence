// ==== store/lobbyStore.js ====
import Lobby from '../models/Lobby.js';
import { v4 as uuid } from 'uuid';
import config from '../config.js';

class LobbyStore {
	constructor() {
		this.lobbies = new Map();
		this._cleanupInterval = setInterval(() => this.cleanup(), config.HEARTBEAT_INTERVAL);
	}

	createLobby(params) {
		const id = uuid();
		const lobby = new Lobby({ id, ...params });
		console.log(params);
		this.lobbies.set(id, lobby);
		return lobby;
	}

	getLobby(id) {
		return this.lobbies.get(id);
	}

	deleteLobby(id) {
		this.lobbies.delete(id);
	}

	cleanup() {
		const now = Date.now();
		for (const [id, lobby] of this.lobbies) {
			// remove lobby if empty or owner timed out
			if (lobby.players.size === 0) {
				console.log(`lobby ${id} delete`)
				this.deleteLobby(id);
			} else {
				const owner = [...lobby.players.values()][0];
				if (now - owner.lastSeen > config.HEARTBEAT_INTERVAL * 2) {
					this.deleteLobby(id);
				}
			}
		}
	}

	shutdown() {
		clearInterval(this._cleanupInterval)
	}

}

export default new LobbyStore();
