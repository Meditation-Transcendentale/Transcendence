// services/game/pongBR-physics/src/index.js
import { connect, JSONCodec } from 'nats';
import dotenv from 'dotenv';
dotenv.config();

import { Physics } from './Physics.js';

const SERVICE_NAME = process.env.SERVICE_NAME || 'pongBR-physics';
const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';
const jc = JSONCodec();

const endedGames = new Set();

async function start() {
	const nc = await connect({ servers: NATS_URL });
	console.log(`[${SERVICE_NAME}] connected to NATS`);

	const endSub = nc.subscribe('game.ended');
	(async () => {
		for await (const msg of endSub) {
			const { gameId } = jc.decode(msg.data);
			endedGames.add(gameId);
			Physics.removeGame(gameId); // Optional: clean up memory
			console.log(`[${SERVICE_NAME}] Stopped processing for game ${gameId}`);
		}
	})();

	const inputSub = nc.subscribe('game.pongBR.input');
	(async () => {
		for await (const msg of inputSub) {
			console.log(`[${SERVICE_NAME}] Received input message`);
			const { gameId, inputs } = jc.decode(msg.data);
			console.log(`[${SERVICE_NAME}] Decoded input message:`, inputs);
			if (endedGames.has(gameId)) continue;

			for (const { playerId, type } of inputs) {
				console.log(`[${SERVICE_NAME}] Handling immediate input for ${gameId}`, type);
				Physics.handleImmediateInput({ gameId, playerId, type });
			}
		}
	})();
	const sub = nc.subscribe('game.pongBR.tick');
	for await (const msg of sub) {
		const data = jc.decode(msg.data);

		if (endedGames.has(data.gameId)) {
			console.log(`[${SERVICE_NAME}] Ignoring tick ${data.tick} for ended game ${data.gameId}`);
			continue;
		}

		//console.log(`[${SERVICE_NAME}] Processing tick ${data.tick} for game ${data.gameId}`);
		const result = Physics.processTick(data);
		nc.publish('game.state', jc.encode(result));
	}
}


start();
