// services/game/game-manager/src/index.js
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { connect, JSONCodec } from 'nats';
import { loadTemplates, getTemplate } from './templateService.js';
import { GameManager } from './GameManager.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const SERVICE_NAME = process.env.SERVICE_NAME || 'game-manager';
const PORT = process.env.PORT || 4000;
const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';
const jc = JSONCodec();

const fastify = Fastify();
let nc;
const gameManager = new GameManager();

await fastify.register(cors, {
	origin: true // or origin: 'http://localhost:3000' to lock it down
});

fastify.post('/match', async (request, reply) => {
	try {
		const { player = [], options = {}, mode = 'pongBR' } = request.body;
		console.log('[POST /match] received:', { mode, options });
		const template = getTemplate(mode);
		if (!template) {
			return reply.status(400).send({ error: `No template found for mode: ${mode}` });
		}
		const mergedOptions = { ...template, ...options, mode };
		const gameId = gameManager.createMatch(mergedOptions);
		return { gameId };
	} catch (err) {
		console.error(`[${SERVICE_NAME}] Error creating match`, err);
		return reply.status(500).send({ error: 'Internal server error' });
	}
});

fastify.post('/match/:id/end', async (req, reply) => {
	const gameId = req.params.id;
	const match = gameManager.games.get(gameId);

	if (!match) {
		return reply.status(404).send({ error: 'Match not found' });
	}

	gameManager.endMatch(gameId);
	return { success: true, gameId };
});

fastify.post('/match/:id/launch', async (req, reply) => {
	const gameId = req.params.id;
	const launched = gameManager.launchGame(gameId);
	if (launched) {
		return { success: true, gameId };
	} else {
		return reply.status(400).send({ error: 'Game not found or already launched' });
	}
});
async function start() {
	nc = await connect({ servers: NATS_URL });
	console.log(`[${SERVICE_NAME}] connected to NATS`);


	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	loadTemplates(path.join(__dirname, './template'));
	gameManager.nc = nc;
	gameManager.start();

	const sub = nc.subscribe('game.state');
	(async () => {
		for await (const msg of sub) {
			const data = jc.decode(msg.data);
			gameManager.handlePhysicsResult(data);
		}
	})();


	fastify.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		console.log(`[${SERVICE_NAME}] HTTP API running at ${address}`);
	});
}

start();
