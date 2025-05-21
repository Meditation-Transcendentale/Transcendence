// src/index.js
import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import config from './config.js';
import natsClient from './natsClient.js';
import { createUwsApp } from './uwsServer.js';  // <-- changed
import LobbyService from './lobbyService.js';
import routes from './routes.js';

async function start() {
	await natsClient.connect(config.NATS_URL);
	const lobbyService = new LobbyService();

	const app = Fastify({ logger: true });
	await app.register(fastifyCors, { origin: '*' });
	app.decorate('lobbyService', lobbyService);
	app.decorate('natsClient', natsClient);
	app.addHook('onClose', async () => {
		lobbyService.shutdown();
		await natsClient.close();
	});
	app.register(routes);
	await app.listen({ port: config.PORT, host: '0.0.0.0' });
	app.log.info(`HTTP API listening on ${config.PORT}`);

	const uwsApp = createUwsApp(config.WS_PATH, lobbyService);
	uwsApp.listen(config.WS_PORT, token => {
		if (!token) console.error('uWS failed to start');
		else console.log(`uWS WebSocket listening on ${config.WS_PORT}`);
	});
}

start().catch(console.error);

