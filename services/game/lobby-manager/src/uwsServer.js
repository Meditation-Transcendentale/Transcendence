// src/uwsServer.js
import uWS from 'uWebSockets.js';
import { decodeClient, encodeUpdate, encodeError } from './proto/message.js';

export function createUwsApp(path, lobbyService) {
	const app = uWS.App();

	app.ws(path, {
		idleTimeout: 60,

		open: (ws, req) => {
			ws.isAlive = true;

			// parse lobbyId/userId from query string
			const params = new URLSearchParams(req.getQuery());
			ws.lobbyId = params.get('lobbyId');
			ws.userId = params.get('userId');

			if (!sockets.has(ws.lobbyId)) sockets.set(ws.lobbyId, new Set());
			sockets.get(ws.lobbyId).add(ws);

			try {
				const state = lobbyService.join(ws.lobbyId, ws.userId);
				const buf = encodeUpdate(state);

				// subscribe this socket to lobby topic
				ws.subscribe(ws.lobbyId);

				// broadcast initial state to lobby
				app.publish(ws.lobbyId, buf, true);
			} catch (err) {
				ws.send(encodeError(err.message), true);
			}
		},

		message: async (ws, message, isBinary) => {
			const buf = new Uint8Array(message);
			const { payload } = decodeClient(buf);
			let newState;

			if (payload.quit) {
				newState = lobbyService.quit(payload.quit.lobbyId, payload.quit.userId);
			}
			else if (payload.ready) {
				newState = await lobbyService.ready(payload.ready.lobbyId, ws.userId);
				if (newState.gameId) {
					const startMsg = encodeStart({
						lobbyId: state.lobbyId,
						gameId: state.gameId,
						map: state.map
					});
					app.publish(ws.lobbyId, startMsg, true);
					for (const peer of sockets.get(ws.lobbyId) || []) {
						peer.close(1000, 'Game starting');
					}
					sockets.delete(ws.lobbyId);
				}

			}

			if (newState) {
				const updateBuf = encodeUpdate(newState);
				app.publish(ws.lobbyId, updateBuf, true);
			}
		},

		close: (ws) => {
			lobbyService.quit(ws.lobbyId, ws.userId);
		}
	});

	return app;
}
