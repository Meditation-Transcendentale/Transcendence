// src/uwsServer.js
import { App } from 'uWebSockets.js';
import { decodeClientMessage } from './proto/helper.js';

export function startWsServer({ port, handlers }) {
	const app = App().ws('/*', {
		idleTimeout: 30,
		maxBackpressure: 1024,

		upgrade: (res, req, ctx) => {
			const params = new URLSearchParams(req.getQuery());
			res.upgrade(
				{
					uuid: params.get('uuid'),
					role: params.get('role'),
					gameId: params.get('gameId')
				},
				req.getHeader('sec-websocket-key'),
				req.getHeader('sec-websocket-protocol'),
				req.getHeader('sec-websocket-extensions'),
				ctx
			);
		},

		open: ws => {
			const { gameId } = ws;
			ws.subscribe(gameId);
			handlers.registerGame?.(ws);
		},

		message: (ws, raw, isBinary) => {
			if (!isBinary) return;
			const msg = decodeClientMessage(Buffer.from(raw));
			if (msg.paddleUpdate) handlers.paddleUpdate(ws, msg.paddleUpdate);
			else if (msg.quit) handlers.quit(ws);
			else if (msg.ready) handlers.ready(ws);
			else if (msg.spectate) handlers.spectate(ws);
			else {
				console.warn('Unknown ClientMessage payload');
			}
		}
	})
		.listen(port, token => {
			if (!token) throw new Error(`uWS listen failed on port ${port}`);
			console.log(`[uwsServer] ws://0.0.0.0:${port}`);
		});

	return app;
}

