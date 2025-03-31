// services/game-manager/src/index.js
import { connect } from 'nats';
import dotenv from 'dotenv';
dotenv.config();

import { GameManager } from './GameLoop.js';

const SERVICE_NAME = process.env.SERVICE_NAME || 'game-manager';
const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';

async function start() {
	const nc = await connect({ servers: NATS_URL });
	console.log(`[${SERVICE_NAME}] connected to NATS`);

	const gameManager = new GameManager(nc);
	gameManager.start();

	// Subscribe to player inputs
	const inputSub = nc.subscribe('game.input');
	for await (const msg of inputSub) {
		const data = JSON.parse(msg.data);
		gameManager.handleInput(data);
	}

	// Subscribe to physics responses
	const stateSub = nc.subscribe('game.state');
	for await (const msg of stateSub) {
		const data = JSON.parse(msg.data);
		gameManager.handlePhysicsResult(data);
	}

	// Optional: handle bot input from AI
	//const aiSub = nc.subscribe('ai.input');
	//for await (const msg of aiSub) {
	//	const data = JSON.parse(msg.data);
	//	gameManager.handleInput(data);
	//}
}

start();
