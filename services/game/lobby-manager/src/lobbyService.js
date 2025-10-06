// src/lobbyService.js
import config from './config.js'
import natsClient from './natsClient.js'
import {
	encodeMatchCreateRequest,
	decodeMatchCreateResponse,
	encodeNotificationMessage,
	encodeTournamentCreateRequest,
	decodeTournamentCreateResponse,
	encodeStatusUpdate
} from './proto/helper.js'

class Lobby {
	constructor({ id, mode, map }) {
		this.id = id;
		this.mode = mode;
		this.map = map;
		console.log(mode);
		this.maxPlayers = config.MAX_PLAYERS[mode] ?? 2;
		this.players = new Map();
		this.createdAt = Date.now();
		this.lastActivity = Date.now();
		this.gameId = null;
	}

	addPlayer(userId) {
		if (this.players.size >= this.maxPlayers) {
			throw new Error(`Lobby is full (max ${this.maxPlayers})`)
		}
		if (this.players.has(userId)) {
			throw new Error(`Player already in lobby`)
		}
		this.updateActivity();
		natsClient.publish(`notification.${userId}.status`, encodeStatusUpdate({
			sender: userId,
			status: "in lobby",
			option: this.id
		}));

		this.players.set(userId, { isReady: false })
	}

	removePlayer(userId) {
		this.players.delete(userId);
		this.updateActivity();
		return this.isEmpty();
	}

	markReady(userId) {
		const p = this.players.get(userId)
		if (!p) throw new Error('Player not in lobby')
		p.isReady = true;
		this.updateActivity();
	}

	updateActivity() {
		this.lastActivity = Date.now()
	}

	isEmpty() {
		return this.players.size === 0
	}

	isStale() {
		const now = Date.now()
		const maxAge = config.LOBBY_MAX_AGE || (10 * 60 * 1000)
		const inactivityTimeout = config.LOBBY_INACTIVITY_TIMEOUT || (5 * 60 * 1000)

		return (
			now - this.createdAt > maxAge ||
			now - this.lastActivity > inactivityTimeout
		)
	}

	allReady() {
		return (
			this.players.size == this.maxPlayers &&
			[...this.players.values()].every(p => p.isReady)
		)
	}

	allReadyBr() {
		return (
			this.mode == "br" &&
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
			gameId: this.gameId,
			tournamentId: this.tournamentId,
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
		console.log(`Lobby ID = ${id}`)
		return lobby.getState()
	}

	join(lobbyId, userId) {
		const lobby = this.lobbies.get(lobbyId)
		if (!lobby) return null;
		lobby.addPlayer(userId)
		console.log(`ADDED ${userId}`);
		return lobby.getState()
	}

	quit(lobbyId, userId) {
		const lobby = this.lobbies.get(lobbyId)
		if (!lobby) return null;
		const isEmpty = lobby.removePlayer(userId)

		if (isEmpty) {
			console.log(`Lobby ${lobbyId} is empty, removing immediately`)
			this.lobbies.delete(lobbyId)
			return null
		}

		return lobby.getState()
	}

	/**
	 * Mark the player ready; if everyone is ready, request a game via NATS.
	 * @returns {Promise<Object>} the updated lobby state (with gameId when available)
	 */

	async ready(lobbyId, userId) {
		const lobby = this.lobbies.get(lobbyId)
		if (!lobby) return null;

		lobby.markReady(userId)
		const state = lobby.getState()

		if (lobby.allReady() || lobby.allReadyBr()) {
			if (lobby.mode == `tournament`) {
				console.log(lobby.players.keys());
				const reqBufTournament = encodeTournamentCreateRequest({
					players: [...lobby.players.keys()],
				});
				try {
					const replyBufTournament = await natsClient.request(
						`games.tournament.create`,
						reqBufTournament, {}
					);
					const respTournament = decodeTournamentCreateResponse(replyBufTournament);
					lobby.tournamentId = respTournament.tournamentId;
					state.tournamentId = respTournament.tournamentId;
				} catch (err) {
					console.error(`Failed to create tournament:`, err);
				}
			}
			else {
				const reqBuf = encodeMatchCreateRequest({
					players: [...lobby.players.keys()],
				})
				console.log("all ready");
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
		const toDelete = []

		for (const [id, lobby] of this.lobbies) {
			if (lobby.isEmpty()) {
				console.log(`Cleaning up empty lobby: ${id}`)
				toDelete.push(id)
			} else if (lobby.isStale()) {
				console.log(`Cleaning up stale lobby: ${id} (created: ${new Date(lobby.createdAt)}, last activity: ${new Date(lobby.lastActivity)})`)
				this.notifyPlayersLobbyClosing(lobby)
				toDelete.push(id)
			}
		}

		toDelete.forEach(id => this.lobbies.delete(id))

		if (toDelete.length > 0) {
			console.log(`Cleaned up ${toDelete.length} lobbies`)
		}
	}

	notifyPlayersLobbyClosing(lobby) {
		for (const userId of lobby.players.keys()) {
			natsClient.publish(`notification.${userId}.lobby`, encodeNotificationMessage({
				type: 'lobby_closed',
				message: 'Lobby closed due to inactivity',
				lobbyId: lobby.id
			}))
		}
	}

	shutdown() {
		clearInterval(this._interval)
	}
}
