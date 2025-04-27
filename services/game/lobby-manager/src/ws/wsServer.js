// ==== ws/wsServer.js ====
import * as lobbyService from '../services/lobbyService.js';
import config from '../config.js';
import WebSocket from 'ws';

const lobbySockets = new Map(); // lobbyId -> Set<ws>

export default {
	attach(wss) {
		// heartbeat pings
		setInterval(() => {
			wss.clients.forEach(ws => {
				if (!ws.isAlive) return ws.terminate();
				ws.isAlive = false;
				ws.ping();
			});
		}, config.HEARTBEAT_INTERVAL);

		wss.on('connection', (ws, req) => {
			const params = new URL(req.url, `http://${req.headers.host}`).searchParams;
			const lobbyId = params.get('lobbyId');
			const userId = req.headers['x-user-id'];

			ws.lobbyId = lobbyId;
			ws.userId = userId;
			ws.isAlive = true;

			if (!lobbySockets.has(lobbyId)) lobbySockets.set(lobbyId, new Set());
			lobbySockets.get(lobbyId).add(ws);

			ws.on('pong', () => { ws.isAlive = true });

			ws.on('message', data => {
				const msg = JSON.parse(data);
				let state;
				switch (msg.type) {
					case 'join':
						state = lobbyService.join(lobbyId, userId);
						broadcast(lobbyId, { type: 'lobby.update', ...state });
						break;

					case 'ready':
						state = lobbyService.ready(lobbyId, userId);
						broadcast(lobbyId, { type: 'lobby.update', ...state });
						break;

					case 'heartbeat':
						lobbyService.heartbeat(lobbyId, userId);
						break;
				}
			});

			ws.on('close', () => {
				lobbySockets.get(lobbyId)?.delete(ws);
				lobbyService.leave(lobbyId, userId);
				const newState = lobbyService.getState(lobbyId);
				broadcast(lobbyId, { type: 'lobby.update', ...newState });
			});
		});
	}
};

function broadcast(lobbyId, msg) {
	const conns = lobbySockets.get(lobbyId) || [];
	const data = JSON.stringify(msg);
	for (const client of conns) {
		if (client.readyState === WebSocket.OPEN) client.send(data);
	}
}
