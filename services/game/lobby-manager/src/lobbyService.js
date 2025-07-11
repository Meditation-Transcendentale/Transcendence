// src/lobbyService.js
import config from './config.js'
import natsClient from './natsClient.js'
import {
	encodeMatchCreateRequest,
	decodeMatchCreateResponse
} from './proto/helper.js'

// Simple Lobby model
class Lobby {
	constructor({ id, mode, map }) {
		this.id = id
		this.mode = mode
		this.map = map
		console.log(mode);
		this.maxPlayers = config.MAX_PLAYERS[mode] ?? 2
		// userId -> { isReady, lastSeen }
		this.players = new Map()
		this.createdAt = Date.now()
		this.gameId = null
	}

	addPlayer(userId) {
		if (this.players.size >= this.maxPlayers) {
			throw new Error(`Lobby is full (max ${this.maxPlayers})`)
		}
		if (this.players.has(userId)) {
			throw new Error(`Player already in lobby`)
		}
		this.players.set(userId, { isReady: false })
	}

	removePlayer(userId) {
		this.players.delete(userId)
	}

	markReady(userId) {
		const p = this.players.get(userId)
		if (!p) throw new Error('Player not in lobby')
		p.isReady = true
	}

	allReady() {
		return (
			this.players.size == this.maxPlayers &&
			[...this.players.values()].every(p => p.isReady)
		)
	}

	getState() {
		const status = this.allReady() ? 'starting' : 'waiting'
		return {
			lobbyId: this.id,
			map: this.map,
			players: [...this.players.entries()].map(([uuid, { isReady }]) => ({
				uuid,
				ready: isReady,
			})),
			status,
			mode: this.mode,
			gameId: this.gameId
		}
	}
}

export default class LobbyService {
	constructor() {
		this.lobbies = new Map()
		this._interval = setInterval(
			() => this.cleanup(),
			config.HEARTBEAT_INTERVAL
		)
	}

	create({ mode, map }) {
		const id = Date.now().toString()
		const lobby = new Lobby({ id, mode, map })
		this.lobbies.set(id, lobby)
		return lobby.getState()
	}

	join(lobbyId, userId) {
		const lobby = this.lobbies.get(lobbyId)
		if (!lobby) throw new Error('Lobby not found')
		lobby.addPlayer(userId)
		return lobby.getState()
	}

	quit(lobbyId, userId) {
		const lobby = this.lobbies.get(lobbyId)
		if (!lobby) return null
		lobby.removePlayer(userId)
		return lobby.getState()
	}

	/**
	 * Mark the player ready; if everyone is ready, request a game via NATS.
	 * @returns {Promise<Object>} the updated lobby state (with gameId when available)
	 */

	async ready(lobbyId, userId) {
		console.log("HERE");
		const lobby = this.lobbies.get(lobbyId)
		if (!lobby) throw new Error('Lobby not found')

		lobby.markReady(userId)
		const state = lobby.getState()

		if (lobby.allReady()) {
			const reqBuf = encodeMatchCreateRequest({
				players: [...lobby.players.keys()],
			})

			try {
				const replyBuf = await natsClient.request(
					`games.${lobby.mode}.match.create`,
					reqBuf, {}
				)
				console.log('raw reply hex:', Buffer.from(replyBuf).toString('hex'));
				const resp = decodeMatchCreateResponse(replyBuf)
				console.log('decoded resp:', resp);
				lobby.gameId = resp.gameId
				state.gameId = resp.gameId
			} catch (err) {
				console.error('Failed to create game:', err)
			}
		}

		return state
	}

	list() {
		return [...this.lobbies.values()].map(l => l.getState())
	}

	getLobby(id) {
		const lobby = this.lobbies.get(id);
		if (!lobby) throw new Error('Lobby not found');
		return lobby.getState();
	}

	cleanup() {
		const now = Date.now()
		for (const [id, lobby] of this.lobbies) {
			if (
				lobby.players.size === 0 ||
				now - lobby.createdAt > config.HEARTBEAT_INTERVAL * 2
			) {
				this.lobbies.delete(id)
			}
		}
	}

	shutdown() {
		clearInterval(this._interval)
	}
}
