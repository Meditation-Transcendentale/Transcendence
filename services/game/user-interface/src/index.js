// src/index.js
import UIService from './uiService.js';

new UIService().start().catch(err => {
	console.error('[UIService] start failed:', err);
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

const startF = async () => {
	try {
		await app.listen({ port: 5051, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

startF();