import fastify from 'fastify';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import dotenv from 'dotenv';
import fastifyCookie from 'fastify-cookie';
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import https from 'https';
import axios from 'axios';
import { connect, JSONCodec } from 'nats';
import { v4 as uuidv4 } from 'uuid';

import { collectDefaultMetrics, Registry, Histogram, Counter } from 'prom-client';

import { statusCode, returnMessages } from "../../shared/returnValues.mjs";
import { handleErrors, handleErrorsValid } from "../../shared/handleErrors.mjs";
import { natsRequest } from '../../shared/natsRequest.mjs';

dotenv.config({ path: "../../../../.env" });

const app = fastify({
	logger: true,
	https: {
		key: fs.readFileSync(process.env.SSL_KEY),
		cert: fs.readFileSync(process.env.SSL_CERT)
	}
});

app.register(fastifyCookie);

const nats = await connect({ servers: process.env.NATS_URL });
const jc = JSONCodec();

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

app.post('/login', { schema: loginSchema }, handleErrors(async (req, res) => {

	const { username, password, token } = req.body;

	const user = await natsRequest(nats, jc, 'user.getUserFromUsername', { username } );
		
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

	const accessToken = jwt.sign({ uuid: user.uuid, role: user.role }, process.env.JWT_SECRETKEY, { expiresIn: '24h' });
	res.setCookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'lax', path: '/' });

	res.code(statusCode.SUCCESS).send({ message: returnMessages.LOGGED_IN });
}));

async function getAvatarCdnUrl(picture, uuid) {
	// console.log("picture", picture);
	const response = await fetch(picture);
	console.log("response", response.headers);
	if (response.status !== 200) {
		throw { status: statusCode.INTERNAL_SERVER_ERROR, message: returnMessages.INTERNAL_SERVER_ERROR };
	}

	const arrayBuffer = await response.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const filename = `${uuid}.png`;
	const fullPath = `/app/cdn_data/${filename}`;

	fs.writeFileSync(fullPath, buffer);
	
	return `${process.env.CDN_URL}/${filename}`;

}

// https://developers.google.com/oauthplayground/

app.post('/auth-google', handleErrors(async (req, res) => {
	
	const { token } = req.body;
	let retCode = statusCode.SUCCESS, retMessage = returnMessages.LOGGED_IN;

	if (!token) {
		throw { status: statusCode.BAD_REQUEST, message: returnMessages.MISSING_TOKEN };
	}

	// console.log("google token : ", token);
	// console.log("google client id : ", process.env.GOOGLE_CLIENT_ID);

	const ticket = await googleClient.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_CLIENT_ID
	});
	
	const payload = ticket.getPayload();

	const { sub: google_id, name: username, picture: avatar_path } = payload;

	let user = await natsRequest(nats, jc, 'user.checkUserExists', { username } );
	if (!user) {
		const uuid = uuidv4();
		const avatarCdnUrl = await getAvatarCdnUrl(avatar_path, uuid);
		// console.log('Avatar CDN URL:', avatarCdnUrl);
		retCode = statusCode.CREATED, retMessage = returnMessages.GOOGLE_CREATED_LOGGED_IN;
		await natsRequest(nats, jc, 'user.addGoogleUser', { uuid, google_id, username, avatarCdnUrl });
		user = await natsRequest(nats, jc, 'user.getUserFromUsername', { username } );
	}

	const accessToken = jwt.sign({ uuid: user.uuid, role: user.role }, process.env.JWT_SECRETKEY, { expiresIn: '24h' });
	res.setCookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'lax', path: '/' });

	res.code(retCode).send({ message: retMessage });

}));

let cached42Token = { token: null, expires_at: 0 };

async function get42accessToken(code) {

	console.log('42 code:', cached42Token);
	const now = Date.now();
	if (cached42Token.token && now < cached42Token.expires_at - 10000) {
		return { token42: cached42Token.token};
	}

	try {
		const response = await axios.post(
			'https://api.intra.42.fr/oauth/token',
			new URLSearchParams({
				grant_type: 'authorization_code',
				client_id: process.env.FT_API_UID,
				client_secret: process.env.FT_API_SECRET,
				code: code,
				redirect_uri: 'https://localhost:3000/auth/42'
			}),
			{ headers: {'Content-Type':'application/x-www-form-urlencoded'} }
		);
		cached42Token.token = response.data.access_token;
		cached42Token.expires_at = now + response.data.expires_in * 1000;
		return { token42: cached42Token.token};
	} catch (error) {
		console.error('Error fetching 42 access token:', error);
		throw { status: statusCode.INTERNAL_SERVER_ERROR, message: returnMessages.INTERNAL_SERVER_ERROR };
	}
}



app.get('/42', handleErrors(async (req, res) => {
	
	const { token42 } = await get42accessToken(req.query.code);
	// console.log('42 token:', token42);
	let response;

	try {
		response = await axios.get(`https://api.intra.42.fr/v2/me`, {
			headers: {
				Authorization: `Bearer ${token42}`
			}
		});
	} catch (error) {
		throw { status: statusCode.UNAUTHORIZED, message: returnMessages.UNAUTHORIZED };
	}

	const username = response.data.login;
	const avatar_path = response.data.image.link;

	let user = await natsRequest(nats, jc, 'user.checkUserExists', { username } );
	if (!user) {
		const uuid = uuidv4();
		const avatarCdnUrl = await getAvatarCdnUrl(avatar_path, uuid);
		// console.log('Avatar CDN URL:', avatarCdnUrl);
		await natsRequest(nats, jc, 'user.add42User', { uuid, username, avatarCdnUrl });
		user = await natsRequest(nats, jc, 'user.getUserFromUsername', { username } );
	}

	const accessToken = jwt.sign({ uuid: user.uuid, role: user.role }, process.env.JWT_SECRETKEY, { expiresIn: '24h' });
	res.setCookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'lax', path: '/' });

	res.code(statusCode.SUCCESS).send({ message: returnMessages.INTRA42_LOGGED_IN});
}));

app.post('/auth', handleErrorsValid(async (req, res) => {

	const { token } = req.body;

	if (!token) {
		return res.code(statusCode.BAD_REQUEST).send({ valid: false, message: returnMessages.MISSING_TOKEN });
	}
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);
		return res.code(statusCode.SUCCESS).send({ valid: true, user: decodedToken });
	} catch (error) {
		return res.code(statusCode.UNAUTHORIZED).send({ valid: false, message: returnMessages.INVALID_TOKEN });
	}
}));

app.post('/logout', handleErrors(async (req, res) => {

	const token = req.cookies.accessToken;
	if (!token) {
		throw { status: statusCode.BAD_REQUEST, message: returnMessages.MISSING_TOKEN };
	}

	res.clearCookie('accessToken', { path: '/' });
	
	res.code(statusCode.SUCCESS).send({ message: returnMessages.LOGGED_OUT });

}));

app.get('/health', (req, res) => {
	res.status(200).send('OK');
});

const start = async () => {
	try {
		await app.listen({ port: 4002, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();



