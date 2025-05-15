// wsServer.js
import uWS from 'uWebSockets.js';

/**
 * Start a uWebSockets.js‐based WebSocket server.
 *
 * @param {object} options
 * @param {number} options.port       – TCP port to listen on
 * @param {function(ws: WebSocket, req: HttpRequest)} options.onOpen
 * @param {function(ws: WebSocket, message: ArrayBuffer, isBinary: boolean)} options.onMessage
 * @param {function(ws: WebSocket, code: number, message: ArrayBuffer)} options.onClose
 */

export function startWsServer({ port, onOpen, onMessage, onClose }) {
	const app = uWS.App().ws('/*', {
		// TODO add option and security
		idleTimeout: 30,       // seconds before idle sockets are closed
		maxBackpressure: 1024, // max buffered messages per socket
		upgrade: (res, req, context) => {
			// parse out your ?uuid=… query param
			const fullUrl = req.getQuery();               // e.g. "/?uuid=abcd1234"
			const [path, rawQs] = fullUrl.split('?');       // "uuid=abcd1234"
			const params = new URLSearchParams(rawQs);
			const role = params.get('role');
			const gameId = params.get('gameId');
			const session = { sessionId: params.get('uuid'), role, gameId };

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
			onOpen(ws);
		},

		message: (ws, message, isBinary) => {
			onMessage(ws, message, isBinary);
		},

		close: (ws, code, message) => {
			onClose(ws, code, message);
		}
	}).listen(port, (token) => {
		if (token) {
			console.log(`[wsServer] Listening on ws://0.0.0.0:${port}`);
		} else {
			console.error('[wsServer] Failed to start WebSocket server');
		}
	});

	return app;
}

