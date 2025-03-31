// services/game/pongBR-physics/src/index.js
import { connect, JSONCodec } from 'nats';
import dotenv from 'dotenv';
dotenv.config();

import { Physics } from './Physics.js';

const SERVICE_NAME = process.env.SERVICE_NAME || 'pongBR-physics';
const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';
const jc = JSONCodec();

async function start() {
	const nc = await connect({ servers: NATS_URL });
	console.log(`[${SERVICE_NAME}] connected to NATS`);

	const sub = nc.subscribe('game.pongBR.tick');
	for await (const msg of sub) {
		const data = jc.decode(msg.data);
		const result = await Physics.processTick(data);
		nc.publish('game.state', jc.encode(result));
	}
}

start();
