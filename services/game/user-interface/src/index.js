// services/game/user-interface/src/index.js
import { WebSocketServer } from 'ws';
import { connect, JSONCodec } from 'nats';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { decodeStateUpdate, encodeStateUpdate } from './binary.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';
const SERVICE_NAME = 'user-interface';
const jc = JSONCodec();

const clients = new Map(); // playerId => ws
const playerMapping = new Map(); // UIID => paddleId
const availablePaddleIds = Array.from({ length: 100 }, (_, i) => i);

const gamePlayers = new Map(); // gameId => Set(playerId)
const playerGames = new Map(); // playerId => gameId

async function start() {
	const nc = await connect({ servers: NATS_URL });
	console.log(`[${SERVICE_NAME}] connected to NATS`);

	const wss = new WebSocketServer({ port: PORT });
	console.log(`[${SERVICE_NAME}] WebSocket server running on port ${PORT}`);

	wss.on('connection', (ws, req) => {
		let clientUIID;
		if (req && req.url) {
			const base = req.headers.host ? `http://${req.headers.host}` : 'http://localhost';
			const urlObj = new URL(req.url, base);
			clientUIID = urlObj.searchParams.get("uuid") || uuidv4();
		}

		ws.clientUIID = clientUIID;

		let paddleId;
		if (playerMapping.has(clientUIID)) {
			paddleId = playerMapping.get(clientUIID);
			console.log(`Player reconnected: UIID=${clientUIID}, paddleId=${paddleId}`);
		} else {
			if (availablePaddleIds.length === 0) {
				console.error("No available paddle IDs.");
				ws.close();
				return;
			}
			paddleId = availablePaddleIds.shift();
			playerMapping.set(clientUIID, paddleId);
			console.log(`New player: UIID=${clientUIID}, assigned paddleId=${paddleId}`);
		}
		ws.paddleId = paddleId;

		clients.set(paddleId, ws);

		ws.send(JSON.stringify({ type: 'welcome', uiid: clientUIID, paddleId }));

		ws.on('message', (raw) => {
			try {
				const { type, data } = JSON.parse(raw);

				if (type === 'paddleUpdate') {
					const gameId = playerGames.get(paddleId);
					if (gameId) {
						nc.publish('game.input', jc.encode({
							type: 'paddleUpdate',
							gameId,
							playerId: paddleId,
							input: data
						}));
						// console.log(data);
					}
				}

				else if (type === 'registerGame') {
					const gameId = parseInt(data.gameId, 10);
					playerGames.set(paddleId, gameId);
					if (!gamePlayers.has(gameId)) gamePlayers.set(gameId, new Set());
					gamePlayers.get(gameId).add(paddleId);

					console.log(`[${SERVICE_NAME}] Registered paddle ${paddleId} to game ${gameId}`);

					nc.publish('game.input', jc.encode({
						type: 'disableWall',
						gameId,
						playerId: paddleId
					}));
					nc.publish('game.input', jc.encode({
						type: 'newPlayerConnected',
						gameId,
						playerId: paddleId
					}));
					ws.send(JSON.stringify({
						type: 'registered',
						gameId,
						paddleId,
						message: `You have been registered to game ${gameId}`
					}));

				}

			} catch (err) {
				console.error(`[${SERVICE_NAME}] Error processing message`, err);
			}
		});
		ws.on('close', () => {
			console.log(`Player disconnected: paddleId=${paddleId}`);
			clients.delete(paddleId);
			const gameId = playerGames.get(paddleId);
			if (gameId) {
				gamePlayers.get(gameId)?.delete(paddleId);
				playerGames.delete(paddleId);
				nc.publish('game.input', jc.encode({
					type: 'enableWall',
					gameId,
					playerId: paddleId
				}));

			}
		});
	});

	const sub = nc.subscribe('game.update');
	for await (const msg of sub) {
		const { gameId, tick, balls, paddles } = decodeStateUpdate(msg.data);
		//console.log(`[user-interface] Received update for ${gameId} tick ${tick}`, state);
		const targets = gamePlayers.get(gameId) || new Set();
		// console.log(`[user-interface] Found ${targets.size} players in game ${gameId}`);
		for (const playerId of targets) {
			const ws = clients.get(playerId);
			if (ws && ws.readyState === 1) {
				ws.send(msg.data);
			}
		}
	}
}

start();
