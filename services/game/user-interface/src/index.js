import { WebSocketServer } from 'ws';
import { connect, JSONCodec } from 'nats';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { decodeStateUpdate } from './binary.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';
const SERVICE_NAME = 'user-interface';
const jc = JSONCodec();

const clients = new Map();
const playerMappingByGame = new Map();
const availablePaddlesByGame = new Map();

function ensureGamePools(gameId) {
	if (!playerMappingByGame.has(gameId)) {
		playerMappingByGame.set(gameId, new Map());
		availablePaddlesByGame.set(gameId, [0, 1]);
	}
	return {
		mapping: playerMappingByGame.get(gameId),
		pool: availablePaddlesByGame.get(gameId)
	};
}

const gamePlayers = new Map();   // gameId => Set<paddleId>
const playerGames = new Map();   // sessionId => { gameId, paddleId }

async function start() {
	const nc = await connect({ servers: NATS_URL });
	const jc = JSONCodec();
	console.log(`[${SERVICE_NAME}] connected to NATS`);

	const wss = new WebSocketServer({ port: PORT });
	console.log(`[${SERVICE_NAME}] WebSocket server running on port ${PORT}`);

	wss.on('connection', (ws, req) => {
		let sessionId;
		if (req?.url) {
			const base = req.headers.host ? `http://${req.headers.host}` : 'http://localhost';
			const params = new URL(req.url, base).searchParams;
			sessionId = params.get('uuid') || uuidv4();
		} else {
			sessionId = uuidv4();
		}
		ws.sessionId = sessionId;
		clients.set(sessionId, ws);

		ws.send(JSON.stringify({ type: 'welcome', sessionId }));

		ws.on('message', raw => {
			let msg;
			try { msg = JSON.parse(raw); }
			catch (e) { return; }

			if (msg.type === 'paddleUpdate') {
				const info = playerGames.get(sessionId);
				if (!info) return; // not in any game yet
				nc.publish('game.input', jc.encode({
					type: 'paddleUpdate',
					gameId: info.gameId,
					playerId: info.paddleId,
					input: msg.data
				}));
			}

			else if (msg.type === 'registerGame') {
				const gameId = Number(msg.data.gameId);
				if (isNaN(gameId)) return;

				const { mapping, pool } = ensureGamePools(gameId);

				let paddleId;
				if (mapping.has(sessionId)) {
					paddleId = mapping.get(sessionId);
				} else {
					if (pool.length === 0) {
						ws.send(JSON.stringify({ type: 'error', message: 'Game is full.' }));
						return;
					}
					paddleId = pool.shift();
					mapping.set(sessionId, paddleId);
				}

				playerGames.set(sessionId, { gameId, paddleId });

				if (!gamePlayers.has(gameId)) gamePlayers.set(gameId, new Set());
				gamePlayers.get(gameId).add(paddleId);

				console.log(`[${SERVICE_NAME}] Session ${sessionId} → game ${gameId} as paddle ${paddleId}`);

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

				ws.paddleId = paddleId;
				ws.send(JSON.stringify({
					type: 'registered',
					gameId,
					paddleId,
					message: `Registered to game ${gameId} as paddle ${paddleId}`
				}));
			}
		});

		ws.on('close', () => {
			const info = playerGames.get(sessionId);
			if (!info) return;

			const { gameId, paddleId } = info;
			console.log(`[${SERVICE_NAME}] Session ${sessionId} left game ${gameId}`);

			gamePlayers.get(gameId)?.delete(paddleId);
			playerGames.delete(sessionId);

			const { mapping, pool } = ensureGamePools(gameId);
			mapping.delete(sessionId);
			pool.push(paddleId);
			pool.sort(); 


			nc.publish('game.input', jc.encode({
				type: 'enableWall',
				gameId,
				playerId: paddleId
			}));
		});
	});

	const sub = nc.subscribe('game.update');
	const endSub = nc.subscribe('game.*.end');

	; (async () => {
		for await (const msg of endSub) {
			const { gameId, winner } = jc.decode(msg.data);
			const paddles = gamePlayers.get(gameId) || new Set();
			for (const pid of paddles) {
				const ws = [...clients.values()].find(
					ws =>
						ws.paddleId === pid &&
						playerGames.get(ws.sessionId)?.gameId === gameId
				);
				if (ws?.readyState === WebSocketServer.OPEN) {
					ws.send(JSON.stringify({
						type: 'gameEnd',
						gameId,
						winner
					}));
				}
			}
		}
	})();

	for await (const msg of sub) {
		console.log(
			`[UI] got msg.subject=${msg.subject} ` +
			`msg.data.length=${msg.data.length}`
		);
		const { gameId, score } = decodeStateUpdate(msg.data);
		console.log('[UI] decoded scoreCount=', Object.keys(score).length,
			'entries=', score);
		const paddles = gamePlayers.get(gameId) || new Set();
		for (const pid of paddles) {
			const ws = [...clients.values()]
				.find(ws => ws.paddleId === pid && playerGames.get(ws.sessionId)?.gameId === gameId);

			if (ws && ws.readyState === 1) {
				ws.send(msg.data);
			}
		}
	}
}

start();