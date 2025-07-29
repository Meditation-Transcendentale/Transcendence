// src/index.js
import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import config from './config.js';
import natsClient from './natsClient.js';
import { createUwsApp } from './uwsServer.js';  // <-- changed
import LobbyService from './lobbyService.js';
import routes from './routes.js';
import https from "https";
import fs from 'fs';

const verifyApiKey = (req, res, done) => {
	const apiKey = req.headers['x-api-key'];
	if (apiKey !== process.env.API_GATEWAY_KEY) {
		return res.code(statusCode.UNAUTHORIZED).send({ message: returnMessages.UNAUTHORIZED });
	}
	done();
}

async function start() {
	await natsClient.connect(config.NATS_URL);
	const lobbyService = new LobbyService();

	const app = Fastify({
		logger: true,
		https: {
			key: fs.readFileSync(process.env.SSL_KEY),
			cert: fs.readFileSync(process.env.SSL_CERT)
		}
	});
	app.addHook('onRequest', verifyApiKey);
	await app.register(fastifyCors, { origin: '*' });
	app.decorate('lobbyService', lobbyService);
	app.decorate('natsClient', natsClient);
	app.addHook('onClose', async () => {
		lobbyService.shutdown();
		await natsClient.close();
	});
	app.register(routes);
	await app.listen({ port: config.PORT, host: '0.0.0.0' });
	app.log.info(`HTTPS API listening on ${config.PORT}`);

	const uwsApp = createUwsApp(config.WS_PATH, lobbyService);
	uwsApp.listen(config.WS_PORT, token => {
		if (!token) console.error('uWS failed to start');
		else console.log(`uWS WebSocket listening on ${config.WS_PORT}`);
	});

}


start().catch(console.error);

