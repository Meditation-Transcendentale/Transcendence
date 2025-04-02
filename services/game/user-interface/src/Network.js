// services/game/user-interface/src/network.js
import Game from './Game.js';
import { v4 as uuidv4 } from 'uuid';

const playerMapping = new Map(); // key: UIID, value: { gameId, paddleId }
const gameClients = new Map();   // key: gameId, value: Set of ws
const availablePaddleIds = {};   // key: gameId, value: [ids]

export function handleNewConnection(ws, req) {
	let clientUIID;
	let gameId;

	if (req && req.url) {
		const base = req.headers.host ? `http://${req.headers.host}` : 'http://localhost';
		const urlObj = new URL(req.url, base);
		clientUIID = urlObj.searchParams.get("uuid") || uuidv4();
		gameId = urlObj.searchParams.get("gameId");
	} else {
		clientUIID = uuidv4();
	}

	if (!gameId) {
		ws.close();
		return;
	}

	ws.clientUIID = clientUIID;
	ws.gameId = gameId;

	if (!availablePaddleIds[gameId]) {
		availablePaddleIds[gameId] = Array.from({ length: 100 }, (_, i) => i);
	}
	if (!gameClients.has(gameId)) {
		gameClients.set(gameId, new Set());
	}
	gameClients.get(gameId).add(ws);

	let paddleId;
	if (playerMapping.has(clientUIID)) {
		const info = playerMapping.get(clientUIID);
		paddleId = info.paddleId;
		console.log(`Reconnect: UIID=${clientUIID}, gameId=${gameId}, paddleId=${paddleId}`);
	} else {
		paddleId = availablePaddleIds[gameId].shift();
		playerMapping.set(clientUIID, { gameId, paddleId });
		console.log(`New Player: UIID=${clientUIID}, gameId=${gameId}, paddleId=${paddleId}`);
	}

	ws.paddleId = paddleId;
	Game.addPaddle(gameId, paddleId, 50, 100);
	Game.setPaddleOn(gameId, paddleId);
	Game.setWallOff(gameId, paddleId);

	ws.send(JSON.stringify({ type: 'welcome', uiid: clientUIID, paddleId }));
	ws.send(JSON.stringify({ type: 'stateUpdate', state: Game.getFullState(gameId) }));
}

export function handleMessage(ws, message) {
	try {
		const data = JSON.parse(message);
		if (data.type === 'paddleUpdate') {
			Game.updatePaddleInput(ws.gameId, ws.paddleId, data);
		}
	} catch (err) {
		console.error('Error processing message:', err);
	}
}

export function broadcastState(wss, gameId, state) {
	const debugData = Game.getDebugState(gameId);
	const msg = JSON.stringify({ type: 'stateUpdate', state, debug: debugData });

	const clients = gameClients.get(gameId);
	if (!clients) return;

	for (const client of clients) {
		if (client.readyState === 1) {
			client.send(msg);
		}
	}
}

export function handleDisconnection(ws) {
	const { paddleId, gameId } = ws;
	console.log(`Player disconnected: paddleId=${paddleId}, gameId=${gameId}`);
	Game.setWallOn(gameId, paddleId);
	Game.setPaddleOff(gameId, paddleId);

	if (gameClients.has(gameId)) {
		gameClients.get(gameId).delete(ws);
	}
}
