// src/uwsServer.js
import { readFileSync } from 'fs';
import { App, SSLApp } from 'uWebSockets.js';
import natsClient from './natsClient.js';
import {
	decodeClientMessage,
	encodeStatusUpdate
} from './proto/helper.js';
import { parse } from 'path';
import axios from 'axios';
import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

function parseCookies(cookieHeader) {
	let cookies = {};
	if (!cookieHeader) return cookies;
	cookies = cookieHeader
		.split(';')
		.map(cookie => cookie.trim())
		.map(cookie => cookie.split('='))
		.reduce((acc, [key, value]) => {
			acc[key] = decodeURIComponent(value);
			return acc;
		}, {});
	return cookies.accessToken || null;
}

async function verifyJWT(token) {

	if (!token) {
		throw new Error('No token provided');
	}

	const agent = new https.Agent({
		rejectUnauthorized: false
	});

	const response = await axios.post('https://auth-service:4002/auth', { token }, { headers: { 'x-api-key': process.env.API_GATEWAY_KEY }, httpsAgent: agent });
	const data = response.data;

	if (!data.valid) {
		console.log('Invalid token');
		throw new Error(data.message || 'Invalid token');
	}
}

export function startWsServer({ port, handlers }) {
	const app = SSLApp({
		key_file_name: process.env.SSL_KEY,
		cert_file_name: process.env.SSL_CERT
	}).ws('/*', {
		idleTimeout: 30,
		maxBackpressure: 1024,

		upgrade: (res, req, ctx) => {

			const upgradeAborted = {aborted: false};

			/* You MUST copy data out of req here, as req is only valid within this immediate callback */
			const url = req.getUrl();
			const secWebSocketKey = req.getHeader('sec-websocket-key');
			const secWebSocketProtocol = req.getHeader('sec-websocket-protocol');
			const secWebSocketExtensions = req.getHeader('sec-websocket-extensions');

			await verifyJWT(parseCookies(req.getHeader('cookie')));

			/* Simulate doing "async" work before upgrading */
			setTimeout(() => {
				console.log("We are now done with our async task, let's upgrade the WebSocket!");

				if (upgradeAborted.aborted) {
					console.log("Ouch! Client disconnected before we could upgrade it!");
					/* You must not upgrade now */
					return;
				}

				/* Cork any async response including upgrade */
				res.cork(() => {
					/* This immediately calls open handler, you must not use res after this call */
					res.upgrade(
					{
						uuid: params.get('uuid'),
						role: params.get('role'),
						gameId: params.get('gameId'),
						isAlive: false
					},
						secWebSocketKey,
						secWebSocketProtocol,
						secWebSocketExtensions,
						ctx
					);
				});
			
			}, 1000);

			/* You MUST register an abort handler to know if the upgrade was aborted by peer */
			res.onAborted(() => {
			/* We can simply signal that we were aborted */
				upgradeAborted.aborted = true;
			});
		},
			// (async () => {
			// 	try {
			// 		await verifyJWT(parseCookies(req.getHeader('cookie')));
			// 		// await verifyJWT(null);
			// 	} catch (e) {
			// 		console.log('WebSocket connection rejected:', e.message);
			// 		// res.writeStatus('401 Unauthorized');
			// 		// res.writeHeader('Content-Type', 'application/json');
      		// 		// res.end(JSON.stringify({ error: 'Invalid or missing token' }));
			// 		return ;
			// 	}
			// })();
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
			else if (msg.ready) { console.log (`ready|${ws.uuid}`) ; handlers.ready(ws); }
			else if (msg.spectate) handlers.spectate(ws);
			else {
				console.warn('Unknown ClientMessage payload');
			}
		},

		close: ws => {
			console.log(`user disconnect = ${ws.uuid}`);
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

