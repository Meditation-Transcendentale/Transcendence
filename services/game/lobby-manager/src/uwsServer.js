// src/uwsServer.js
import { readFileSync } from 'fs';
import uWS from 'uWebSockets.js';
import {
	decodeClientMessage,
	encodeServerMessage
} from './proto/helper.js';

const sockets = new Map(); // lobbyId → Set<ws>

export function createUwsApp(path, lobbyService) {
	const key = readFileSync(process.env.SSL_KEY || './ssl/key.pem', 'utf8');
	const cert = readFileSync(process.env.SSL_CERT || './ssl/cert.pem', 'utf8');
	const app = uWS.SSLApp({
		key_file_name: process.env.SSL_KEY,
		cert_file_name: process.env.SSL_CERT
	});

	app.ws(path, {
		idleTimeout: 60,

		upgrade: (res, req, context) => {
			const fullQuery = req.getQuery();           // e.g. "?uuid=abcd&lobbyId=1234"
			const params = new URLSearchParams(fullQuery);
			const session = {
				userId: params.get('uuid'),
				lobbyId: params.get('lobbyId')
			};
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
			const { lobbyId } = ws;
			sockets.set(lobbyId, sockets.get(lobbyId) || new Set());
			sockets.get(lobbyId).add(ws);

			try {
				const state = lobbyService.join(lobbyId, ws.userId);
				const buf = encodeServerMessage({ update: { lobbyId: state.lobbyId, players: state.players, status: state.status, mode: state.mode } });
				ws.subscribe(lobbyId);
				app.publish(lobbyId, buf, true);
			} catch (err) {
				const buf = encodeServerMessage({ error: { message: err.message } });
				ws.send(buf, true);
			}
		},

		message: async (ws, message, isBinary) => {
			const buf = new Uint8Array(message);
			const payload = decodeClientMessage(buf);
			let newState;

			if (payload.quit) {
				newState = lobbyService.quit(payload.quit.lobbyId, payload.quit.uuid);
			}
			else if (payload.ready) {
				newState = await lobbyService.ready(ws.lobbyId, ws.userId);
				console.log(newState);

				if (newState.gameId) {
					const startBuf = encodeServerMessage({
						start: {
							lobbyId: newState.lobbyId,
							gameId: newState.gameId,
							map: newState.map
						}
					});
					app.publish(ws.lobbyId, startBuf, true);

					// for (const peer of sockets.get(ws.lobbyId) || []) {
					// 	peer.close(1000, 'Game starting');
					// }
					// sockets.delete(ws.lobbyId);
					return;
				}
			}

			if (newState) {
				const updateBuf = encodeServerMessage({ update: newState });
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

