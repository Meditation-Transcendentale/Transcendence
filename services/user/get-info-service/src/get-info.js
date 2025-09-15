import Fastify from "fastify";
import dotenv from "dotenv";
import fs from "fs";
import { connect, JSONCodec } from 'nats';

import { collectDefaultMetrics, Registry, Histogram, Counter } from 'prom-client';

import { statusCode, returnMessages, friendshipReturn, userReturn } from "../../shared/returnValues.mjs";
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


app.post('/search', handleErrors(async (req, res) => {
	
	const { identifier, type, response } = req.body;
	
	if (!identifier || !type || !response) {
		throw { status: userReturn.USER_036.http, code: userReturn.USER_036.code, message: userReturn.USER_036.message };
	}

	let responseData; 
	switch (response) {
		case 'user':
			switch (type) {
				case 'username':
					const asker = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers } );
					if (asker.username === identifier) {
						throw { status: friendshipReturn.FRIEND_021.http, code: friendshipReturn.FRIEND_021.code, message: friendshipReturn.FRIEND_021.message };
					}
					responseData = await natsRequest(nats, jc, 'user.getUserForFriendResearch', { username: identifier } );
					break;
				case 'uuid':
					responseData = await natsRequest(nats, jc, 'user.getUserFromUUID', { uuid: identifier } );
					if (!responseData) {
						throw { status: userReturn.USER_001.http, code: userReturn.USER_001.code, message: userReturn.USER_001.message };
					}
					break;
				default:
					throw { status: userReturn.USER_037.http, code: userReturn.USER_037.code, message: userReturn.USER_037.message };
			}
			break;
		case 'avatar':
			switch (type) {
				case 'username':
					responseData = await natsRequest(nats, jc, 'user.getAvatarFromUsername', { username: identifier } );
					break;
				case 'uuid':
					responseData = await natsRequest(nats, jc, 'user.getAvatarFromUUID', { uuid: identifier } );
					break;
				default:
					throw { status: userReturn.USER_037.http, code: userReturn.USER_037.code, message: userReturn.USER_037.message };
			}
			break;
		default:
			throw { status: userReturn.USER_037.http, code: userReturn.USER_037.code, message: userReturn.USER_037.message };
		}

		res.code(statusCode.SUCCESS).send({ data: responseData });
}));


app.get('/status', handleErrors(async (req, res) => {
	
	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers } );
	
	const status = await natsRequest(nats, jc, 'user.getUserStatus', { userId: user.id } );
	
	res.code(statusCode.SUCCESS).send({ statusInfos: status });
	
}));


app.post(`/users`, handleErrors(async (req, res) => {
	
	const pw = req.body.pw;
	``
	if (!pw || !pw.length) {
		return res.code(statusCode.UNAUTHORIZED).send({ message: returnMessages.UNAUTHORIZED });
	}
	if (pw !== process.env.PSSWD) {
		return res.code(statusCode.UNAUTHORIZED).send({ message: returnMessages.UNAUTHORIZED });
	}
	const users = await natsRequest(nats, jc, 'user.getAllUsers');

	res.code(statusCode.SUCCESS).send({ users: users });
}));

// app.get('/avatar/username/:username', handleErrors(async (req, res) => {
	
// 	if (!req.params.username) {
// 		throw { status: userReturn.USER_004.http, code: userReturn.USER_004.code, message: userReturn.USER_004.message };
// 	}

// 	const avatar = await natsRequest(nats, jc, 'user.getAvatarFromUsername', { username: req.params.username } );

// 	res.code(statusCode.SUCCESS).send({ avatar: avatar.avatar_path });
// }));

// app.get('/avatar/uuid/:uuid', handleErrors(async (req, res) => {
	
// 	if (!req.params.uuid) {
// 		throw { status: userReturn.USER_004.http, code: userReturn.USER_004.code, message: userReturn.USER_004.message };
// 	}

// 	const avatar = await natsRequest(nats, jc, 'user.getAvatarFromUUID', { uuid: req.params.uuid } );

// 	res.code(statusCode.SUCCESS).send({ avatar: avatar.avatar_path });
// }));

// app.get('/username/:username', handleErrors(async (req, res) => {
			
// 	const asker = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers } );

// 	if (asker.username === req.params.username) {
// 		throw { status: friendshipReturn.FRIEND_021.http, code: friendshipReturn.FRIEND_021.code, message: friendshipReturn.FRIEND_021.message };
// 	}
	
// 	const user = await natsRequest(nats, jc, 'user.getUserForFriendResearch', { username: req.params.username } );

// 	res.code(statusCode.SUCCESS).send({ user });
// }));

// app.get('/uuid/:uuid', handleErrors(async (req, res) => {

// 	if (!req.params.uuid) {
// 		throw { status: userReturn.USER_008.http, code: userReturn.USER_008.code, message: userReturn.USER_008.message };
// 	}
// 	const user = await natsRequest(nats, jc, 'user.getUserFromUUID', { uuid: req.params.uuid });
// 	if (!user) {
// 		throw { status: userReturn.USER_001.http, code: userReturn.USER_001.code, message: userReturn.USER_001.message };
// 	}
// 	res.code(statusCode.SUCCESS).send({ username: user.username });
// }));

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
