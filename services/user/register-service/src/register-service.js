import Fastify from 'fastify';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import fs from 'fs';
import { connect, JSONCodec } from 'nats';
import { v4 as uuidv4 } from 'uuid';

import { collectDefaultMetrics, Registry, Histogram, Counter } from 'prom-client';

import { statusCode, returnMessages, userReturn } from "../../shared/returnValues.mjs";
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

const registerSchema = {
	body: {
		type: 'object',
		required: ['username', 'password'],
		properties: {
			username: { type: 'string' },
			password: { type: 'string', format: 'password' }
		}
	}
};

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

	console.log(`Request: ${method} ${route} - Status: ${statusCode} - Duration: ${duration.toFixed(3)} seconds`);
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

const USERNAME_REGEX = /^[a-zA-Z0-9]{3,20}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!?@#$%&*()_{};:|,.<>]{8,}$/;

app.post('/', { schema: registerSchema }, handleErrors(async (req, res) => {

	const { username, password } = req.body;

	if (USERNAME_REGEX.test(username) === false) {
		throw { status: userReturn.USER_010.http, code: userReturn.USER_010.code, message: userReturn.USER_010.message };
	}

	if (PASSWORD_REGEX.test(password) === false) {
		throw { status: userReturn.USER_009.http, code: userReturn.USER_009.code, message: userReturn.USER_009.message };
	}

	await natsRequest(nats, jc, "user.checkUsernameAvailability", { username });

	const hashedPassword = await bcrypt.hash(password, 10);
	const uuid = uuidv4();

	await natsRequest(nats, jc, 'user.registerUser', { uuid, username, hashedPassword });

	const user = await natsRequest(nats, jc, 'user.getUserFromUUID', { uuid });

	await natsRequest(nats, jc, 'status.addUserStatus', { userId: user.id, status: "registered" });

	res.code(statusCode.CREATED).send({ message: returnMessages.USER_CREATED });
}));

app.get('/health', (req, res) => {
	res.status(200).send('OK');
});

const start = async () => {
	try {
		await app.listen({ port: 4001, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();

// {
// 	 "username":"",
// 	 "password":""
// }
