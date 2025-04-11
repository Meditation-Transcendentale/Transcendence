// services/game/pongBR-physics/src/index.js
import { connect, JSONCodec } from 'nats';
import dotenv from 'dotenv';
dotenv.config();

import { Physics } from './Physics.js';
import { decodeStateUpdate, encodeStateUpdate } from './binary.js';

const SERVICE_NAME = process.env.SERVICE_NAME || 'pongBR-physics';
const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';
const jc = JSONCodec();

const endedGames = new Set();

async function start() {
	const nc = await connect({ servers: NATS_URL });
	console.log(`[${SERVICE_NAME}] connected to NATS`);

	const endSub = nc.subscribe('game.pongBR.end');
	(async () => {
		for await (const msg of endSub) {
			const { gameId } = jc.decode(msg.data);
			endedGames.add(gameId);
			Physics.removeGame(gameId);
			console.log(`[${SERVICE_NAME}] Stopped processing for game ${gameId}`);
		}
	})();

	const inputSub = nc.subscribe('game.pongBR.input');
	(async () => {
		for await (const msg of inputSub) {
			console.log(`[${SERVICE_NAME}] Received input message`);
			const { gameId, inputs } = jc.decode(msg.data);
			if (endedGames.has(gameId)) continue;

			for (const { playerId, type } of inputs) {
				Physics.handleImmediateInput({
					gameId,
					inputs: [
						{ playerId, input: { type } }
					]
				});
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

		const result = Physics.processTick(data);
		const buffer = encodeStateUpdate(result.gameId, result.tick, result.balls, result.paddles);
		const temp = decodeStateUpdate(buffer);
		nc.publish('game.state', buffer);
	}
}

start();
