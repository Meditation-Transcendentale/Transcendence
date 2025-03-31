const { connect } = require('nats');
require('dotenv').config();

const SERVICE_NAME = process.env.SERVICE_NAME || 'service';
const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';

async function start() {
	const nc = await connect({ servers: NATS_URL });
	console.log(`[${SERVICE_NAME}] connected to NATS`);

	const sub = nc.subscribe(`${SERVICE_NAME}.ping`);
	for await (const msg of sub) {
		console.log(`${SERVICE_NAME} received:`, msg.data.toString());
		nc.publish(`${SERVICE_NAME}.pong`, Buffer.from(`pong from ${SERVICE_NAME}`));
	}
}

start();
