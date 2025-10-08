import Fastify from "fastify";
import dotenv from "dotenv";
import fs from "fs";
import bcrypt from "bcrypt";
import axios from "axios";
import https from "https";
import fastifyMultipart from '@fastify/multipart';
import { fileTypeFromStream, fileTypeFromBuffer } from 'file-type';
import { connect, JSONCodec } from "nats";
import validator from 'validator';

import { collectDefaultMetrics, Registry, Histogram, Counter } from 'prom-client';

import { twoFARoutes } from "./2FA.js";
import { statusRoutes } from "./status.js";
import { statusCode, returnMessages, userReturn } from "../../shared/returnValues.mjs";
import { handleErrors } from "../../shared/handleErrors.mjs";
import { natsRequest } from "../../shared/natsRequest.mjs";
import { format } from "path";

dotenv.config({ path: "../../../../.env" });

const app = Fastify({
	logger: true,
	https: {
		key: fs.readFileSync(process.env.SSL_KEY),
		cert: fs.readFileSync(process.env.SSL_CERT)
	}
});

await app.register(import('@fastify/formbody'));

app.register(fastifyMultipart, {
	limits: {
		fileSize: 5 * 1024 * 1024
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

const agent = new https.Agent({
	rejectUnauthorized: false
});

const USERNAME_REGEX = /^[a-zA-Z0-9]{3,20}$/;

async function checkPassword2FA(user, password, token) {
	
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		throw { status: userReturn.USER_022.http, code: userReturn.USER_022.code, message: userReturn.USER_022.message };
	}
	if (user.two_fa_enabled == true) {
		if (!token) {
			throw { status: userReturn.USER_023.http, code: userReturn.USER_023.code, message: userReturn.USER_023.message };
		}

		try {
			const response = await axios.post('https://update_user_info-service:4003/verify-2fa', { token }, { headers: {'user': JSON.stringify({ uuid: user.uuid }), 'x-api-key': process.env.API_GATEWAY_KEY } , httpsAgent: agent });
			if (response.data.valid == false) {
				throw { status: statusCode.UNAUTHORIZED, code: response.data.code, message: response.data.message };
			}
		} catch (error) {
			throw { status: statusCode.UNAUTHORIZED, code: error.response.data.code, message: error.response.data.message };
		}
	}
}

async function removeOldAvatars(uuid) {
	const files = fs.readdirSync('/app/cdn_data');
	for (const file of files) {
		if (file.startsWith(uuid + '_')) {
			fs.unlinkSync(`/app/cdn_data/${file}`);
		}
	}
}

async function getAvatarCdnUrl(avatar, uuid) {

	const buffer = await avatar.toBuffer();
	const fileType = await fileTypeFromBuffer(buffer);

	if (!fileType || !fileType.mime.startsWith('image/')) {
		throw { status: userReturn.USER_012.http, code: userReturn.USER_012.code, message: userReturn.USER_012.message };
	}
	await removeOldAvatars(uuid);
	const randomAddition = Math.random().toString(36).substring(2, 8);
	// console.log(`Avatar upload: ${uuid}, type: ${fileType.ext}, random: ${randomAddition}`);

	const filename = `${uuid}_${randomAddition}.${fileType.ext}`;
	const fullPath = `/app/cdn_data/${filename}`;
	fs.writeFileSync(fullPath, buffer);

	return `${process.env.CDN_URL}/${filename}`;
}

const usernameSchema = {
	body: {
		type: 'object',
		required: ['username', 'password'],
		additionalProperties: false,
		properties: {
			password: { type: 'string', format: 'password' },
			username: { type: 'string' },
			token: { type: ['string', 'integer'] }
		}
	}
};

function sanitizeUsernameInput(input) {

	if (input.token !== undefined && validator.isInt(input.token)) {
		input.token = parseInt(input.token, 10);
	}

	return {
		username: validator.escape(input.username),
		password: validator.escape(input.password),
		token: input.token ? input.token : undefined
	}
}

app.patch('/username', { schema: usernameSchema }, handleErrors(async (req, res) => {
	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

	if (!req.body) {
		throw { status: userReturn.USER_021.http, code: userReturn.USER_021.code, message: userReturn.USER_021.message };
	}

	const { password, token, username } = sanitizeUsernameInput(req.body);

	if (username && USERNAME_REGEX.test(username) === false) {
		throw { status: userReturn.USER_010.http, code: userReturn.USER_010.code, message: userReturn.USER_010.message };
	} else {
		await checkPassword2FA(user, password, token);
		await natsRequest(nats, jc, 'user.updateUsername', { username, userId: user.id });
	}

	res.code(statusCode.SUCCESS).send({ message: returnMessages.USERNAME_UPDATED });

}));

app.patch('/avatar', handleErrors(async (req, res) => {

	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

	const avatar = await req.file();
	if (!avatar) {
		throw { status: userReturn.USER_007.http, code: userReturn.USER_007.code, message: userReturn.USER_007.message };
	}

	const cdnPath = await getAvatarCdnUrl(avatar, user.uuid);

	await natsRequest(nats, jc, 'user.updateAvatar', { avatar: cdnPath, userId: user.id });

	res.header('Cache-Control', 'no-store');
	res.code(statusCode.SUCCESS).send({ message: returnMessages.AVATAR_UPDATED, data: { cdnPath } });

}));

// const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!?@#$%&*()_{};:|,.<>]{8,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!"#$%&'()*+,\\\-.\/:;<=>?@\[\]^_{|}~]{8,}$/;

const passwordSchema = {
	body: {
		type: 'object',
		required: ['newPassword', 'password'],
		additionalProperties: false,
		properties: {
			password: { type: 'string', format: 'password' },
			newPassword: { type: 'string', format: 'password' },
			token: { type: ['string', 'integer'] }
		}
	}
};

function sanitizePasswordInput(input) {

	if (input.token !== undefined && validator.isInt(input.token)) {
		input.token = parseInt(input.token, 10);
	}
	
	return {
		newPassword: validator.escape(input.newPassword),
		password: validator.escape(input.password),
		token: input.token ? input.token : undefined
	}
}

app.patch('/password', { schema: passwordSchema }, handleErrors(async (req, res) => {

	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

	if (!req.body) {
		throw { status: userReturn.USER_021.http, code: userReturn.USER_021.code, message: userReturn.USER_021.message };
	}

	const { password, newPassword, token } = sanitizePasswordInput(req.body);

	if (!password) {
		throw { status: userReturn.USER_005.http, code: userReturn.USER_005.code, message: userReturn.USER_005.message };
	}

	if (!newPassword) {
		throw { status: userReturn.USER_006.http, code: userReturn.USER_006.code, message: userReturn.USER_006.message };
	}

	if (PASSWORD_REGEX.test(newPassword) === false) {
		throw { status: userReturn.USER_009.http, code: userReturn.USER_009.code, message: userReturn.USER_009.message };
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		throw { status: userReturn.USER_022.http, code: userReturn.USER_022.code, message: userReturn.USER_022.message };
	}

	if (user.two_fa_enabled) {

		if (!token) {
			throw { status: userReturn.USER_023.http, code: userReturn.USER_023.code, message: userReturn.USER_023.message };
		}

		try {
			const response = await axios.post('https://update_user_info-service:4003/verify-2fa', { token }, { headers: {'user': JSON.stringify({ uuid: user.uuid }), 'x-api-key': process.env.API_GATEWAY_KEY } , httpsAgent: agent });
			if (response.data.valid == false) {
				throw { status: statusCode.UNAUTHORIZED, code: response.data.code, message: response.data.message };
			}
		} catch (error) {
			throw { status: statusCode.UNAUTHORIZED, code: error.response.data.code, message: error.response.data.message };
		}
	}

	const hashedPassword = await bcrypt.hash(newPassword, 10);

	await natsRequest(nats, jc, 'user.updatePassword', { hashedPassword, userId: user.id });

	res.code(statusCode.SUCCESS).send({ message: returnMessages.PASSWORD_UPDATED });

}));

twoFARoutes(app);
statusRoutes(app);

app.get('/health', (req, res) => {
	res.status(200).send('OK');
});

const start = async () => {
	try {
		await app.listen({ port: 4003, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();






