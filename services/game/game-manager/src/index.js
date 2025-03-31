const Fastify = require('fastify');
const { connect } = require('nats');
require('dotenv').config();

const app = Fastify();
const SERVICE_NAME = process.env.SERVICE_NAME || 'game-manager';
const NATS_URL = process.env.NATS_URL || 'nats://nats:4222';
const PORT = 3001;

// Add a basic health endpoint
app.get('/health', async () => {
	return { status: 'ok', service: SERVICE_NAME };
});

async function start() {
	const nc = await connect({ servers: NATS_URL });
	console.log(`[${SERVICE_NAME}] connected to NATS`);

	// Subscribe to something, e.g., 'game.ping'
	const sub = nc.subscribe(`${SERVICE_NAME}.ping`);
	for await (const msg of sub) {
		console.log(`[${SERVICE_NAME}] received:`, msg.data.toString());
	}

	await app.listen({ port: PORT, host: '0.0.0.0' });
	console.log(`[${SERVICE_NAME}] Fastify listening on port ${PORT}`);
}

start();
