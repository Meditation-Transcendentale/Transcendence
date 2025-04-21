import fastify from 'fastify';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import dotenv from 'dotenv';
import fastifyCookie from 'fastify-cookie';
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import https from 'https';
import axios from 'axios';

import { statusCode, returnMessages } from "../../shared/returnValues.mjs";
import { handleErrors } from "../../shared/handleErrors.mjs";
// import userService from "./userService.js";

dotenv.config({ path: "../../../../.env" });

const app = fastify({
	logger: true,
	https: {
		key: fs.readFileSync(process.env.SSL_KEY),
		cert: fs.readFileSync(process.env.SSL_CERT)
	}
});

app.register(fastifyCookie);

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const loginSchema = {
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

app.post('/login', { schema: loginSchema }, handleErrors(async (req, res) => {

	const { username, password, token } = req.body;

	const user = userService.getUserFromUsername(username);
		
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		throw { status: statusCode.UNAUTHORIZED, message: returnMessages.BAD_PASSWORD };
	}

	if (user.two_fa_enabled == true) {
		if (!token) {
			throw { status: statusCode.BAD_REQUEST, message: returnMessages.MISSING_TOKEN };
		}

		const agent = new https.Agent({
			rejectUnauthorized: false
		});

		try {
			const response = await axios.post('https://update_user_info-service:4003/verify-2fa', { token }, { headers: {'user': JSON.stringify({ id: user.id }), 'x-api-key': process.env.API_GATEWAY_KEY } , httpsAgent: agent });
			if (response.data.valid == false) {
				throw { status: statusCode.UNAUTHORIZED, message: response.data.message };
			}
		} catch (error) {
			throw { status: statusCode.UNAUTHORIZED, message: error.response.data.message };
		}
	}

	const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRETKEY, { expiresIn: '24h' });
	res.setCookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict', path: '/' });

	res.code(statusCode.SUCCESS).send({ message: returnMessages.LOGGED_IN });
}));


app.post('/auth-google', handleErrors(async (req, res) => {
	
	const { token } = req.body;
	let retCode = statusCode.SUCCESS, retMessage = returnMessages.LOGGED_IN;

	if (!token) {
		throw { status: statusCode.BAD_REQUEST, message: returnMessages.MISSING_TOKEN };
	}

	const ticket = await googleClient.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_CLIENT_ID
	});
	
	const payload = ticket.getPayload();

	const { sub: google_id, email, name: username, picture: avatar_path } = payload;

		
	let user = userService.getUserFromUsername(username);
	if (!user) {
		retCode = statusCode.CREATED, retMessage = returnMessages.GOOGLE_CREATED_LOGGED_IN;
		userService.addGoogleUser(google_id, username, email, avatar_path);
		user = userService.getUserFromUsername(username);
	}

	const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRETKEY, { expiresIn: '24h' });
	res.setCookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict', path: '/' });

	res.code(retCode).send({ message: retMessage});

}));

app.post('/auth', async (req, res) => {

	const { token } = req.body;

	if (!token) {

		return res.code(400).send({ valid: false, message: 'No token provided' });
	}
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);
		return res.code(200).send({ valid: true, user: decodedToken });
	} catch (error) {
		return res.code(401).send({ valid: false, message: 'Invalid token' });
	}
});

app.post('/logout', handleErrors(async (req, res) => {

	const token = req.cookies.accessToken;
	if (!token) {
		throw { status: statusCode.BAD_REQUEST, message: returnMessages.MISSING_TOKEN };
	}

	res.clearCookie('accessToken', { path: '/' });
	
	res.code(statusCode.SUCCESS).send({ message: returnMessages.LOGGED_OUT });

}));

const start = async () => {
	try {
		await app.listen({ port: 4002, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();



