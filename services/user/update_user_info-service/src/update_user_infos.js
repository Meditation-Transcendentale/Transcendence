import Fastify from "fastify";
import dotenv from "dotenv";
import fs from "fs";
import bcrypt from "bcrypt";
import axios from "axios";
import https from "https";
import { connect, JSONCodec } from "nats";

import { collectDefaultMetrics, Registry, Histogram, Counter } from 'prom-client';

import { twoFARoutes } from "./2FA.js";
import { statusCode, returnMessages } from "../../shared/returnValues.mjs";
import { handleErrors } from "../../shared/handleErrors.mjs";
import { natsRequest } from "../../shared/natsRequest.mjs";

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

const nats = await connect({ servers: process.env.NATS_URL });
const jc = JSONCodec();

const agent = new https.Agent({
	rejectUnauthorized: false
});

const USERNAME_REGEX = /^[a-zA-Z0-9]{3,20}$/;

async function checkPassword2FA(user, password, token) {

	if (user.two_fa_enabled == true) {
		if (!token) {
			throw { status: statusCode.BAD_REQUEST, message: returnMessages.MISSING_TOKEN };
		}

		try {
			const response = await axios.post('https://update_user_info-service:4003/verify-2fa', { token }, { headers: {'user': JSON.stringify({ id: user.id }), 'x-api-key': process.env.API_GATEWAY_KEY } , httpsAgent: agent });
			if (response.data.valid == false) {
				throw { status: statusCode.UNAUTHORIZED, message: response.data.message };
			}
		} catch (error) {
			throw { status: statusCode.UNAUTHORIZED, message: error.response.data.message };
		}
	} else {
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw { status: statusCode.UNAUTHORIZED, message: returnMessages.BAD_PASSWORD };
		}
	}
}

function isValidUrlAndImage(url) {
	try {
		new URL(url);
		const response = axios.head(url, { httpsAgent: agent });
		const contentType = response.headers['content-type'];
		if (!contentType || !contentType.startsWith('image/'))
			return false;
		return true;
	} catch (error) {
		return false;
	}
}

async function getAvatarCdnUrl(avatar, uuid) {
	const response = await fetch(avatar);
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


app.patch('/', handleErrors(async (req, res) => {

	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });
		
	if (!req.body) {
		throw { status: statusCode.BAD_REQUEST, message: returnMessages.NOTHING_TO_UPDATE };
	}

	const { username, avatar, password, token } = req.body;

	if (username && USERNAME_REGEX.test(username) === false) {
		throw { status: statusCode.BAD_REQUEST, message: returnMessages.USERNAME_INVALID };
	} else {
		await checkPassword2FA(user, password, token);
		await natsRequest(nats, jc, 'user.updateUsername', { username, userId: user.id });
	}

	if (avatar) {
		// if (!isValidUrlAndImage(avatar))
		// 	throw { status: statusCode.BAD_REQUEST, message: returnMessages.INVALID_AVATAR_URL };
		// const avatarUrl = await getAvatarCdnUrl(avatar, user.uuid);
		await natsRequest(nats, jc, 'user.updateAvatar', { avatar, userId: user.id });
	}

	res.code(statusCode.SUCCESS).send({ message: returnMessages.INFO_UPDATED });

}));

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!?@#$%&*()_{};:|,.<>]{8,}$/;

app.patch('/password', handleErrors(async (req, res) => {

	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

	if (!req.body) {
		throw { status: statusCode.BAD_REQUEST, message: returnMessages.NOTHING_TO_UPDATE };
	}

	const { password, newPassword, token } = req.body;

	if (!password) {
		throw { status: statusCode.BAD_REQUEST, message: returnMessages.PASSWORD_REQUIRED };
	}
	
	if (!newPassword) {
		throw { status: statusCode.BAD_REQUEST, message: returnMessages.NEW_PASSWORD_REQUIRED };
	}

	if (PASSWORD_REGEX.test(newPassword) === false) {
		throw { status: statusCode.BAD_REQUEST, message: returnMessages.PASSWORD_INVALID };
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		throw { status: statusCode.UNAUTHORIZED, message: returnMessages.BAD_PASSWORD };
	}

	if (user.two_fa_enabled) {

		if (!token) {
			throw { status: statusCode.BAD_REQUEST, message: returnMessages.MISSING_TOKEN };
		}

		try {
			const response = await axios.post('https://update_user_info-service:4003/verify-2fa', { token }, { headers: {'user': JSON.stringify({ id: user.id }), 'x-api-key': process.env.API_GATEWAY_KEY } , httpsAgent: agent });
			if (response.data.valid == false) {
				throw { status: statusCode.UNAUTHORIZED, message: response.data.message };
			}
		} catch (error) {
			throw { status: statusCode.UNAUTHORIZED, message: error.response.data.message };
		}
	}

	const hashedPassword = await bcrypt.hash(newPassword, 10);

	await natsRequest(nats, jc, 'user.updatePassword', { hashedPassword, userId: user.id });

	res.code(statusCode.SUCCESS).send({ message: returnMessages.PASSWORD_UPDATED });

}));

twoFARoutes(app);

const start = async () => {
	try {
		await app.listen({ port: 4003, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();






