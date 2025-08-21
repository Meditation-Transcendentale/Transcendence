// src/uwsServer.js
import { readFileSync } from 'fs';
import { App, SSLApp } from 'uWebSockets.js';
import natsClient from './natsClient.js';
import {
	decodeClientMessage,
	encodeNotificationMessage,
	encodeStatusUpdate
} from './proto/helper.js';

export function startWsServer({ port, handlers }) {
	const app = SSLApp({
		key_file_name: process.env.SSL_KEY,
		cert_file_name: process.env.SSL_CERT
	}).ws('/*', {
		idleTimeout: 30,
		maxBackpressure: 1024,

		upgrade: (res, req, ctx) => {
			const params = new URLSearchParams(req.getQuery());
			res.upgrade(
				{
					uuid: params.get('uuid'),
					role: params.get('role'),
					gameId: params.get('gameId'),
					isAlive: false
				},
				req.getHeader('sec-websocket-key'),
				req.getHeader('sec-websocket-protocol'),
				req.getHeader('sec-websocket-extensions'),
				ctx
			);
		},

		open: ws => {
			const { gameId } = ws;
			ws.isAlive = true;
			ws.subscribe(gameId);
			handlers.registerGame?.(ws);
			natsClient.publish(`notification.${ws.uuid}.status`, encodeStatusUpdate({ sender: ws.uuid, status: "in game", option: gameId }));
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
		},

		close: ws => {
			ws.isAlive = false;
			//status -> online /!\ MIGHT CONFLICT WITH NOTIF WS WHICH SET OFFLINE
			natsClient.publish(`notification.${ws.uuid}.status`, encodeStatusUpdate({ sender: ws.uuid, status: "online" }));
			handlers.quit(ws);
		}

	})
		.listen(port, token => {
			if (!token) throw new Error(`uWS listen failed on port ${port}`);
			console.log(`[uwsServer] ws://0.0.0.0:${port}`);
		});

	return app;
}

