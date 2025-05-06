// ==== services/lobbyService.js ====
import lobbyStore from '../store/lobbyStore.js';
import natsClient from '../natsClient.js';
import config from '../config.js';
import { requestNewMatch } from './natsRequests.js';

export function createLobby({ mode, map, submode }) {
	const caps = config.MAX_PLAYERS[mode] || {};
	const max = caps[submode] ?? caps.default ?? 2;
	const lobby = lobbyStore.createLobby({ mode, map, submode, maxPlayers: max });
	return lobby.getState();
}

export function join(lobbyId, userId) {
	const lobby = lobbyStore.getLobby(lobbyId);
	if (!lobby) throw new Error('Lobby not found');
	lobby.addPlayer(userId);
	return lobby.getState();
}

export async function ready(lobbyId, userId) {
	const lobby = lobbyStore.getLobby(lobbyId);
	if (!lobby) throw new Error('Lobby not found');
	lobby.markReady(userId);
	const state = lobby.getState();
	if (lobby.allReady()) {
		try {
			const gameId = await requestNewMatch(
				lobby.mode,
				state.players,
				{}
			);
			//lobby.setGameId(gameId);
			state.gameId = gameId;
		} catch (err) {
			console.error(`Failed to create game: ${err.message}`);
		}
	}
	return state;
}

export function heartbeat(lobbyId, userId) {
	const lobby = lobbyStore.getLobby(lobbyId);
	if (lobby) lobby.heartbeat(userId);
}

export function leave(lobbyId, userId) {
	const lobby = lobbyStore.getLobby(lobbyId);
	if (lobby) lobby.removePlayer(userId);
}

export function getState(lobbyId) {
	const lobby = lobbyStore.getLobby(lobbyId);
	return lobby ? lobby.getState() : null;
}
