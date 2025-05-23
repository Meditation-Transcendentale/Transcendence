// src/uwsServer.js
import uWS from 'uWebSockets.js';
import {
	decodeClient,
	encodeUpdate,
	encodeError,
	encodeStart
} from './proto/message.js';

const sockets = new Map(); // lobbyId → Set<ws>

export function createUwsApp(path, lobbyService) {
	const app = uWS.App();

	app.ws(path, {
		idleTimeout: 60,
		upgrade: (res, req, context) => {
			// parse out your ?uuid=… query param
			const fullUrl = req.getQuery();               // e.g. "/?uuid=abcd1234"
			const [path, rawQs] = fullUrl.split('?');       // "uuid=abcd1234"
			const params = new URLSearchParams(rawQs);
			const lobbyId = params.get('lobbyId');
			const session = { userId: params.get('uuid'), lobbyId };

			// 2) Call res.upgrade and pass it as userData:
			res.upgrade(
				session,
				req.getHeader('sec-websocket-key'),
				req.getHeader('sec-websocket-protocol'),
				req.getHeader('sec-websocket-extensions'),
				context
			);
		},
		open: (ws) => {
			ws.isAlive = true;

			if (!sockets.has(ws.lobbyId)) sockets.set(ws.lobbyId, new Set());
			sockets.get(ws.lobbyId).add(ws);

			try {
				const state = lobbyService.join(ws.lobbyId, ws.userId);
				const buf = encodeUpdate(state);

				ws.subscribe(ws.lobbyId);
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

			} else if (payload.ready) {
				newState = await lobbyService.ready(ws.lobbyId, ws.userId);

				// start the game when gameId appears
				if (newState.gameId) {
					const startMsg = encodeStart({
						lobbyId: newState.lobbyId,
						gameId: newState.gameId,
						map: newState.map
					});
					app.publish(ws.lobbyId, startMsg, true);

					// close all sockets for this lobby
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
			sockets.get(ws.lobbyId)?.delete(ws);
			lobbyService.quit(ws.lobbyId, ws.userId);
		}
	});

	return app;
}

