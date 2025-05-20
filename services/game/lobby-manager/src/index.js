// src/index.js
import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import config from './config.js';
import natsClient from './natsClient.js';
import { attach } from './uwsServer.js';
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
		lobbyService.shutdown(); await natsClient.close();
	});
	app.register(routes);
	const { server } = await app.listen({ port: config.PORT, host: '0.0.0.0' });
	attach(server, config.WS_PATH, lobbyService, natsClient);
}
start().catch(console.error);
