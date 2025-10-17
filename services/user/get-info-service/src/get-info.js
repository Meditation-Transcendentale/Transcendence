import Fastify from "fastify";
import dotenv from "dotenv";
import fs from "fs";
import { connect, JSONCodec } from 'nats';
import validator from 'validator';

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

app.addHook('onRequest', verifyApiKey);

const nats = await connect({
	servers: process.env.NATS_URL,
	token: process.env.NATS_TOKEN,
	tls: { rejectUnauthorized: false }
});
const jc = JSONCodec();

app.get('/me', handleErrors(async (req, res) => {

	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

	const userInfo = await natsRequest(nats, jc, 'user.getUserInfo', { userId: user.id });

	res.header('Cache-Control', 'no-store');
	res.code(statusCode.SUCCESS).send({ userInfo: userInfo });
}));

const searchSchema = {
	body: {
		type: 'object',
		required: ['identifier', 'type'],
		additionalProperties: false,
		properties: {
			identifier: { type: 'string' },
			type: { type: 'string', enum: ['username', 'uuid'] }
		}
	}
};

function sanitizeSearchInput(input) {
	return {
		identifier: validator.escape(input.identifier),
		type: validator.escape(input.type)
	}
}

app.post('/search', { schema: searchSchema }, handleErrors(async (req, res) => {

	const { identifier, type } = sanitizeSearchInput(req.body);

	if (!identifier || !type) {
		throw { status: userReturn.USER_036.http, code: userReturn.USER_036.code, message: userReturn.USER_036.message };
	}

	let responseData;
	switch (type) {
		case 'username':
			const asker = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });
			if (asker.username === identifier) {
				throw { status: friendshipReturn.FRIEND_021.http, code: friendshipReturn.FRIEND_021.code, message: friendshipReturn.FRIEND_021.message };
			}
			responseData = await natsRequest(nats, jc, 'user.getUserForFriendResearch', { username: identifier });
			break;
		case 'uuid':
			responseData = await natsRequest(nats, jc, 'user.getUserInfosFromUUID', { uuid: identifier });
			if (!responseData) {
				throw { status: userReturn.USER_001.http, code: userReturn.USER_001.code, message: userReturn.USER_001.message };
			}
			break;
		default:
			throw { status: userReturn.USER_037.http, code: userReturn.USER_037.code, message: userReturn.USER_037.message };
	}
	res.header('Cache-Control', 'no-store');
	res.code(statusCode.SUCCESS).send({ data: responseData });
}));

app.get('/status', handleErrors(async (req, res) => {

	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

	const status = await natsRequest(nats, jc, 'user.getUserStatus', { userId: user.id });

	res.code(statusCode.SUCCESS).send({ statusInfos: status });

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
