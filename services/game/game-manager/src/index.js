import natsClient from './natsClient.js';
import { connect, JSONCodec } from 'nats';
import { loadTemplates, getTemplate } from './templateService.js';
import { GameManager } from './GameManager.js';
import dotenv from 'dotenv';
dotenv.config();

const SERVICE_NAME = process.env.SERVICE_NAME || 'game-manager';
// const PORT = process.env.PORT || 4000;
const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';
const jc = JSONCodec();


// fastify.post('/match', async (request, reply) => {
// 	try {
// 		const { player = [], options = {}, mode = 'pongBR' } = request.body;
// 		console.log('[POST /match] received:', { mode, options });
// 		const template = getTemplate(mode);
// 		if (!template) {
// 			return reply.status(400).send({ error: `No template found for mode: ${mode}` });
// 		}
// 		const mergedOptions = { ...template, ...options, mode };
// 		const gameId = gameManager.createMatch(mergedOptions);
// 		return { gameId };
// 	} catch (err) {
// 		console.error(`[${SERVICE_NAME}] Error creating match`, err);
// 		return reply.status(500).send({ error: 'Internal server error' });
// 	}
// });
//
// fastify.post('/match/:id/end', async (req, reply) => {
// 	const gameId = req.params.id;
// 	const match = gameManager.games.get(gameId);
//
// 	if (!match) {
// 		return reply.status(404).send({ error: 'Match not found' });
// 	}
//
// 	gameManager.endMatch(gameId);
// 	return { success: true, gameId };
// });
//
// fastify.post('/match/:id/launch', async (req, reply) => {
// 	const gameIdStr = req.params.id;
// 	const gameId = parseInt(gameIdStr, 10);
// 	const launched = gameManager.launchGame(gameId);
// 	if (launched) {
// 		return { success: true, gameId };
// 	} else {
// 		return reply.status(400).send({ error: 'Game not found or already launched' });
// 	}
// });

async function start() {
	let nc = await natsClient.connect(NATS_URL)
	console.log(`[${SERVICE_NAME}] connected to NATS`);

	const gameManager = new GameManager(nc);
	loadTemplates();
	gameManager.start();

	const sub = nc.subscribe('game.state');
	(async () => {
		for await (const msg of sub) {
			// const data = jc.decode(msg.data);
			gameManager.handlePhysicsResult(msg.data);
		}
	})();

	const subInput = nc.subscribe('game.input');
	(async () => {
		for await (const msg of subInput) {
			const data = jc.decode(msg.data);
			gameManager.handleInput(data);
		}
	})();

	const events = nc.subscribe('game.pong.events');
	(async () => {
		for await (const msg of events) {
			const ev = jc.decode(msg.data);
			if (ev.type === 'goal')
				gameManager._onGoal(ev);
		}
	})();
}

start();
