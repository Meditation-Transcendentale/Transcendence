import Fastify from "fastify";
import dotenv from "dotenv";
import fs from "fs";
import { connect, JSONCodec } from 'nats';

import { collectDefaultMetrics, Registry, Histogram, Counter } from 'prom-client';

import { statusCode, returnMessages } from "../../shared/returnValues.mjs";
import { handleErrors } from "../../shared/handleErrors.mjs";
import { natsRequest } from '../../shared/natsRequest.mjs';

dotenv.config({ path: "../../../../.env" });

const app = Fastify({
	// logger: true,
	https: {
		key: fs.readFileSync(process.env.SSL_KEY),
		cert: fs.readFileSync(process.env.SSL_CERT)
	}
});

const verifyApiKey = (req, res, done) => {
	const apiKey = req.headers['x-api-key'];
	if (apiKey !== process.env.API_GATEWAY_KEY) {
		return res.code(statusCode.UNAUTHORIZED).send({ message: returnMessages.UNAUTHORIZED });
	}
	done();
}

const metricsRegistry = new Registry();
collectDefaultMetrics({ register: metricsRegistry });

const requestDuration = new Histogram({
	name: 'http_request_duration_seconds',
	help: 'Duration of HTTP requests in seconds',
	labelNames: ['method', 'route', 'status'],
	registers: [metricsRegistry],
	buckets: [0.1, 0.5, 1, 2, 5, 10]
});

const requestCounter = new Counter({
	name: 'http_requests_total',
	help: 'Total number of HTTP requests',
	labelNames: ['method', 'route', 'status'],
	registers: [metricsRegistry]
});

app.addHook('onRequest', (req, res, done) => {
	req.startTime = process.hrtime();
	done();
});

app.addHook('onResponse', (req, res, done) => {

	if (req.raw.url && req.raw.url.startsWith('/metrics')) {
		return done();
	}

	const diff = process.hrtime(req.startTime);
	const duration = diff[0] + diff[1] / 1e9;

	const route = req.routerPath || req.routeOptions?.url || 'unknown';
	const method = req.method;
	const statusCode = res.statusCode;

	requestCounter.inc({ method, route, status: statusCode });
	requestDuration.observe({ method, route, status: statusCode }, duration);

	done();
});

app.get('/metrics', async (req, res) => {
	res.header('Content-Type', metricsRegistry.contentType);
	res.send(await metricsRegistry.metrics());
});

app.addHook('onRequest', verifyApiKey);

const nats = await connect({ 
	servers: process.env.NATS_URL,
	token: process.env.NATS_TOKEN,
	tls: { rejectUnauthorized: false }
});
const jc = JSONCodec();

app.get('/me', handleErrors(async (req, res) => {

	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers } );

	const userInfo = await natsRequest(nats, jc, 'user.getUserInfo', { userId: user.id } );

	res.code(statusCode.SUCCESS).send( {userInfo: userInfo});
}));

app.get('/username/:username', handleErrors(async (req, res) => {

	const asker = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers } );

	if (asker.username === req.params.username) {
		return res.code(statusCode.BAD_REQUEST).send({ message: returnMessages.SELF_RESEARCH });
	}
	
	const user = await natsRequest(nats, jc, 'user.getUserForFriendResearch', { username: req.params.username } );

	res.code(statusCode.SUCCESS).send({ user });
}));

app.get('/status', handleErrors(async (req, res) => {

	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers } );

	const status = await natsRequest(nats, jc, 'user.getUserStatus', { userId: user.id } );

	res.code(statusCode.SUCCESS).send({ status: status.status });

}));

app.get('/uuid/:uuid', handleErrors(async (req, res) => {

	if (!req.params.uuid) {
		return res.code(statusCode.BAD_REQUEST).send({ message: returnMessages.UUID_REQUIRED });
	}
	const user = await natsRequest(nats, jc, 'user.getUserFromUUID', { uuid: req.params.uuid });
	if (!user) {
		return res.code(statusCode.NOT_FOUND).send({ message: returnMessages.USER_NOT_FOUND });
	}
	res.code(statusCode.SUCCESS).send({ username: user.username });
}));

app.get('/health', (req, res) => {
	res.status(200).send('OK');
});

const start = async () => {
	try {
		await app.listen({ port: 4005, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();
