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

		open(ws, req) {
			onOpen(ws, req);
		},

		message(ws, message, isBinary) {
			onMessage(ws, message, isBinary);
		},

		close(ws, code, message) {
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

