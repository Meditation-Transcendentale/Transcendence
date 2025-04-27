// ==== index.js ====
import Fastify from 'fastify';
import http from 'http';
import WebSocket from 'ws';
import config from './config.js';
import natsClient from './natsClient.js';
import lobbyRoutes from './routes/lobbyRoutes.js';
import wsServer from './ws/wsServer.js';

async function buildServer() {
	const app = Fastify({ logger: true }); // TODO add https
	app.register(lobbyRoutes, { prefix: '/lobby' });

	await natsClient.connect(config.NATS_URL);

	const server = http.createServer(app.handler.bind(app));

	const wss = new WebSocket.Server({ server, path: '/lobbies' });
	wsServer.attach(wss);

	return server;
}

async function start() {
	try {
		const server = await buildServer();
		server.listen(config.PORT, '0.0.0.0', () => {
			console.log(`Lobby Manager listening on port ${config.PORT}`);
		});
	} catch (err) {
		console.error('Failed to start Lobby Manager:', err);
		process.exit(1);
	}
}

start();
