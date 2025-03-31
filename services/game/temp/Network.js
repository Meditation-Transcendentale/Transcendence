
import Game from './Game.js';
import { v4 as uuidv4 } from 'uuid';

const playerMapping = new Map(); // key: UIID, value: paddleId

const availablePaddleIds = [];
for (let i = 0; i < 100; i++) {
	availablePaddleIds.push(i);
}

export function handleNewConnection(ws, req) {
	let clientUIID;
	if (req && req.url) {
		const base = req.headers.host ? `http://${req.headers.host}` : 'http://localhost';
		const urlObj = new URL(req.url, base);
		clientUIID = urlObj.searchParams.get("uuid");
	}
	if (!clientUIID) {
		clientUIID = uuidv4();
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

	Game.addPaddle(paddleId, 50, 100);
	Game.setPaddleOn(paddleId);
	Game.setWallOff(paddleId);

	ws.send(JSON.stringify({ type: 'welcome', uiid: clientUIID, paddleId }));
	ws.send(JSON.stringify({ type: 'stateUpdate', state: Game.getFullState() }));
}

export function handleMessage(ws, message) {
	try {
		const data = JSON.parse(message);
		if (data.type === 'paddleUpdate') {
			console.log(data);
			Game.updatePaddleInput(ws.paddleId, data);
		}
	} catch (err) {
		console.error('Error processing message:', err);
	}
}

export function broadcastState(wss, state) {
	const debugData = Game.getDebugState();
	const msg = JSON.stringify({ type: 'stateUpdate', state, debug: debugData });
	wss.clients.forEach(client => {
		client.send(msg);
	});
}

export function handleDisconnection(ws) {
	const paddleId = ws.paddleId;
	console.log(`Player disconnected: paddleId=${paddleId}`);
	Game.setWallOn(paddleId);
	Game.setPaddleOff(paddleId);
}
