// src/uwsServer.js
import uWS from 'uWebSockets.js';
import { decodeClient, encodeUpdate, encodeError } from './message.js';

export function createUwsApp(path, lobbyService) {
	const app = uWS.App();

	app.ws(path, {
		idleTimeout: 60,

		open: (ws, req) => {
			// mark alive
			ws.isAlive = true;

			// parse lobbyId/userId from query string
			const params = new URLSearchParams(req.getQuery());
			ws.lobbyId = params.get('lobbyId');
			ws.userId = params.get('userId');

			// auto-join on connection
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

		message: (ws, message, isBinary) => {
			const buf = new Uint8Array(message);
			const { payload } = decodeClient(buf);
			let newState;

			if (payload.quit) {
				newState = lobbyService.quit(payload.quit.lobbyId, payload.quit.userId);
			} else if (payload.ready) {
				newState = lobbyService.ready(payload.ready.lobbyId, payload.ready.userId);
			}

			if (newState) {
				const updateBuf = encodeUpdate(newState);
				app.publish(ws.lobbyId, updateBuf, true);
			}
		},

		close: (ws) => {
			// optional: remove subscription / notify peers
			lobbyService.quit(ws.lobbyId, ws.userId);
		}
	});

	return app;
}
