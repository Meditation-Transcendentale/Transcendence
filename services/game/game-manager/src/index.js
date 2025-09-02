// index.js
import dotenv from 'dotenv';
dotenv.config();

import { loadTemplates } from './templateService.js';
import { GameManager } from './GameManager.js';

loadTemplates();

const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';

async function main() {
	const gm = new GameManager();
	await gm.init(NATS_URL);

	gm.start();

	console.log('[game-manager] up and running');
}

main().catch(err => {
	console.error('[game-manager] fatal error:', err);
	process.exit(1);
});

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

const start = async () => {
	try {
		await app.listen({ port: 5050, host: '0.0.0.0' });
		console.log('Game manager metrics server is running');
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();
