import Fastify from 'fastify';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import fs from 'fs';
import { connect, JSONCodec } from 'nats';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';


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
		additionalProperties: false,
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

app.addHook('onRequest', verifyApiKey);

const nats = await connect({
	servers: process.env.NATS_URL,
	token: process.env.NATS_TOKEN,
	tls: { rejectUnauthorized: false }
});
const jc = JSONCodec();

const USERNAME_REGEX = /^[a-zA-Z0-9]{3,20}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!"#$%&'()*+,\\\-.\/:;<=>?@\[\]^_{|}~]{8,}$/;

function sanitizeRegisterInput(input) {

	return {
		username: validator.escape(input.username),
		password: validator.escape(input.password)
	};
}

app.post('/', { schema: registerSchema }, handleErrors(async (req, res) => {

	const { username, password } = sanitizeRegisterInput(req.body);

	if (USERNAME_REGEX.test(username) === false) {
		throw { status: userReturn.USER_010.http, code: userReturn.USER_010.code, message: userReturn.USER_010.message };
	}

	if (PASSWORD_REGEX.test(password) === false) {
		throw { status: userReturn.USER_009.http, code: userReturn.USER_009.code, message: userReturn.USER_009.message };
	}

	await natsRequest(nats, jc, "user.checkUsernameAvailability", { username });

	const hashedPassword = await bcrypt.hash(password, 10);
	const uuid = uuidv4();

	const randomAvatar = [
		'/cdn/default_avatar1.jpg',
		'/cdn/default_avatar2.gif',
		'/cdn/default_avatar3.jpg',
		'/cdn/default_avatar4.jpg',
		'/cdn/default_avatar5.jpg',
		'/cdn/default_avatar6.jpg',
		'/cdn/default_avatar7.jpg',
		'/cdn/default_avatar8.jpg',
		'/cdn/default_avatar9.jpg',
		'/cdn/default_avatar10.jpg',
		'/cdn/default_avatar11.gif',
		'/cdn/default_avatar12.gif',
		'/cdn/default_avatar13.gif',
		'/cdn/default_avatar14.jpg',
	];
	const randomInt = Math.floor(Math.random() * randomAvatar.length);
	const avatar = randomAvatar[randomInt];

	await natsRequest(nats, jc, 'user.registerUser', { uuid, username, hashedPassword, avatar });

	const user = await natsRequest(nats, jc, 'user.getUserFromUUID', { uuid });

	await natsRequest(nats, jc, 'status.addUserStatus', { userId: user.id, status: "offline" });
	await natsRequest(nats, jc, 'stats.addBrickBreakerStats', { playerId: user.id });

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
