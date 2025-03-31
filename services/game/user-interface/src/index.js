// services/game/user-interface/src/index.js
import { WebSocketServer } from 'ws';
import { connect, JSONCodec } from 'nats';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';
const SERVICE_NAME = 'user-interface';
const jc = JSONCodec();

const clients = new Map(); // playerId => ws

async function start() {
	const nc = await connect({ servers: NATS_URL });
	console.log(`[${SERVICE_NAME}] connected to NATS`);

	const wss = new WebSocketServer({ port: PORT });
	console.log(`[${SERVICE_NAME}] WebSocket server running on port ${PORT}`);

	wss.on('connection', (ws, req) => {
		let playerId = null;

		ws.on('message', (message) => {
			try {
				const { type, data } = JSON.parse(message);
				if (type === 'register') {
					playerId = data.playerId;
					clients.set(playerId, ws);
					console.log(`[${SERVICE_NAME}] Registered player ${playerId}`);
				} else if (type === 'input') {
					nc.publish('game.input', jc.encode(data));
				}
			} catch (err) {
				console.error(`[${SERVICE_NAME}] Error processing message`, err);
			}
		});

		ws.on('close', () => {
			if (playerId) {
				clients.delete(playerId);
				console.log(`[${SERVICE_NAME}] Player ${playerId} disconnected`);
			}
		});
	});

	const sub = nc.subscribe('game.update');
	for await (const msg of sub) {
		const { gameId, state, tick } = jc.decode(msg.data);
		for (const playerId in state.paddles) {
			const ws = clients.get(playerId);
			if (ws && ws.readyState === 1) {
				ws.send(JSON.stringify({ type: 'update', data: { gameId, tick, state } }));
			}
		}
	}
}

start();
