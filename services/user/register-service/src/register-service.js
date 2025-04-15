import Fastify from 'fastify';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import fs from 'fs';

import handleErrors from './handleErrors.js';
import userService from './userService.js';
import { statusCode, returnMessages } from "./returnValues.js";

dotenv.config({path: "../../../../.env"});

const app = Fastify({ 
	logger: true,
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

app.addHook('onRequest', verifyApiKey);

const USERNAME_REGEX = /^[a-zA-Z0-9]{3,20}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

app.post('/', {schema: registerSchema},  handleErrors(async (req, res) => {
	
	const { username, password } = req.body;

	if (USERNAME_REGEX.test(username) === false) {
		throw { status: statusCode.BAD_REQUEST, message: returnMessages.USERNAME_INVALID };
	}

	if (PASSWORD_REGEX.test(password)	=== false) {
		throw { status: statusCode.BAD_REQUEST, message: returnMessages.PASSWORD_INVALID };
	}

	userService.checkUsernameAvailability(username);

	const hashedPassword = await bcrypt.hash(password, 10);

	userService.registerUser(username, hashedPassword);

	res.code(statusCode.CREATED).send({ message: returnMessages.USER_CREATED });
}));

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