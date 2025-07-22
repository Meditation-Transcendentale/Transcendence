// services/game/pong-physics/src/index.js
import { connect } from 'nats';
import dotenv from 'dotenv';
dotenv.config();
import { Physics } from './Physics.js';
import {
	decodePhysicsRequest,
	encodePhysicsResponse,
} from './proto/helper.js';

const SERVICE_NAME = process.env.SERVICE_NAME || 'pongbr-physics';
const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';
const endedGames = new Set();

const handleEnd = async (sub) => {
	for await (const msg of sub) {
		const [, , gameId] = msg.subject.split('.');
		endedGames.add(gameId);
		Physics.removeGame(gameId);
		console.log(`[${SERVICE_NAME}] Stopped processing for game ${gameId}`);
	}
}

const handlePhysicsRequest = async (sub) => {
	for await (const msg of sub) {
		const data = decodePhysicsRequest(msg.data);

		if (endedGames.has(data.gameId)) {
			console.log(`[${SERVICE_NAME}] Ignoring tick ${data.tick} for ended game ${data.gameId}`);
			continue;
		}

		const { gameId, tick, balls, paddles, events } = Physics.processTick({ gameId: data.gameId, tick: data.tick, inputs: data.input });
		let scorerId = null;
		let goalScored = false;
		if (events && events.length) {
			for (const ev of events) {
				if (ev.type === 'goal') {
					goalScored = true;
					scorerId = ev.playerId;
				}
			}
		}
		let goal = null;
		if (goalScored)
			goal = { scorerId };
		//console.log(paddles);
		const buffer = encodePhysicsResponse({ gameId, tick, balls, paddles, goal });
		msg.respond(buffer);
	}
};

async function start() {
	const nc = await connect({
		servers: NATS_URL,
		token: process.env.NATS_GAME_TOKEN,
		tls: { rejectUnauthorized: false }
	});
	console.log(`[${SERVICE_NAME}] connected to NATS`);

	const endBr = nc.subscribe('games.br.*.match.end');
	handleEnd(endBr);

	const subBr = nc.subscribe("games.br.*.physics.request");

	handlePhysicsRequest(subBr);
}

start();


// -------------------------------------------------------------------------------
//                              Metrics server

import Fastify from 'fastify';
import client from 'prom-client';
import fs from 'fs';

const app = Fastify({
	logger: true,
	https: {
		key: fs.readFileSync(process.env.SSL_KEY),
		cert: fs.readFileSync(process.env.SSL_CERT)
	}
});

client.collectDefaultMetrics();

app.get('/metrics', async (req, res) => {
	res.type('text/plain');
	res.send(await client.register.metrics());
});

const startF = async () => {
	try {
		await app.listen({ port: 5053, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

startF();
