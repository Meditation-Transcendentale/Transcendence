import Fastify from "fastify";
import dotenv from "dotenv";
import fs from "fs";
import { connect, JSONCodec } from 'nats';

import { statusCode, returnMessages } from "../../shared/returnValues.mjs";
import { handleErrors } from "../../shared/handleErrors.mjs";
import { natsRequest } from '../../shared/natsRequest.mjs';

dotenv.config({ path: "../../../../.env" });

const app = Fastify({
	logger: true,
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

const nats = await connect({ servers: process.env.NATS_URL });
const jc = JSONCodec();

app.get('/me', handleErrors(async (req, res) => {

	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers } );

	const userInfo = await natsRequest(nats, jc, 'user.getUserInfo', { userId: user.id } );

	res.code(statusCode.SUCCESS).send( {userInfo: userInfo});
}));

app.get('/:username', handleErrors(async (req, res) => {

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

const start = async () => {
	try {
		await app.listen({ port: 4005, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();
