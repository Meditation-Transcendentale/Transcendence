import fastify from "fastify";
import fs from "fs";
import dotenv from "dotenv";
import fastifyHttpProxy from "@fastify/http-proxy";
import fastifyCookie from "fastify-cookie";
import fastifyCaching from "@fastify/caching";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifyCompress from "@fastify/compress";
import fastifyCORS from "@fastify/cors";
import axios from "axios";
import https from "https";


dotenv.config({ path: "../../.env" });

const FRONTEND_PORT = 8080;
const hostIP = process.env.HOSTNAME;
const hostOrigin = `https://${hostIP}:${FRONTEND_PORT}`;
const app = fastify({
	logger: true,
	https: {
		key: fs.readFileSync(process.env.SSL_KEY),
		cert: fs.readFileSync(process.env.SSL_CERT)
	}
});

app.register(fastifyCookie);

app.register(fastifyCompress);

app.register(fastifyCaching, {
	privacy: 'private',
	expiresIn: 60
});

app.register(fastifyRateLimit, {
	max: 100,
	timeWindow: '1 minute'
});

app.register(fastifyCORS, {
	origin: ["*"],
	methods: ['GET', 'POST', 'PATCH', 'DELETE'],
	allowedHeaders: ['Content-Type'],
	credentials: true
});

app.setErrorHandler((error, req, res) => {
	app.log.error(error);
	return res.code(500).send({ message: 'Server Error' });
});

const verifyJWT = async (req, res) => {
	if (req.raw.url && req.raw.url.endsWith('/metrics') || req.raw.url.endsWith('/health')) {
		if (req.raw.url.endsWith('/health')) {
			return res.status(200).send('OK');
		}
		const IP = req.ip || req.raw.socket.remoteAddress;
		if (IP.startsWith('172.18.') || IP.startsWith('172.19.') || IP.startsWith('172.20.')) {
			return;
		}
		return res.code(403).send({ message: 'Forbidden' });
	}

	const token = req.cookies.accessToken;
	if (!token) {
		return res.code(401).send({ message: 'No token provided' });
	}

	const agent = new https.Agent({
		rejectUnauthorized: false
	});

	const response = await axios.post('https://auth-service:4002/auth', { token }, { headers: { 'x-api-key': process.env.API_GATEWAY_KEY }, httpsAgent: agent });
	const data = response.data;

	if (!data.valid) {
		return res.code(401).send({ message: 'Invalid token' });
	}
	req.user = data.user;
};

const addApiKeyHeader = (req, headers) => {
	headers['x-api-key'] = process.env.API_GATEWAY_KEY;
	return headers;
};

app.register(fastifyHttpProxy, {
	upstream: 'https://register-service:4001',
	prefix: '/register',
	http2: false,
	replyOptions: {
		rewriteRequestHeaders: addApiKeyHeader
	}
});

app.register(fastifyHttpProxy, {
	upstream: 'https://auth-service:4002',
	prefix: '/auth',
	http2: false,
	replyOptions: {
		rewriteRequestHeaders: addApiKeyHeader
	}
});

app.register(fastifyHttpProxy, {
	upstream: 'https://update_user_info-service:4003',
	prefix: '/update-info',
	http2: false,
	preHandler: verifyJWT,
	replyOptions: {
		rewriteRequestHeaders: (req, headers) => {
			if (req.user) {
				headers['user'] = JSON.stringify(req.user);
			}
			headers['x-api-key'] = process.env.API_GATEWAY_KEY;
			return headers;
		}
	}
});

app.register(fastifyHttpProxy, {
	upstream: 'https://friends-service:4004',
	prefix: '/friends',
	http2: false,
	preHandler: verifyJWT,
	replyOptions: {
		rewriteRequestHeaders: (req, headers) => {
			if (req.user) {
				headers['user'] = JSON.stringify(req.user);
			}
			headers['x-api-key'] = process.env.API_GATEWAY_KEY;
			return headers;
		}
	}
});

app.register(fastifyHttpProxy, {
	upstream: 'https://get-info-service:4005',
	prefix: '/info',
	http2: false,
	preHandler: verifyJWT,
	replyOptions: {
		rewriteRequestHeaders: (req, headers) => {
			if (req.user) {
				headers['user'] = JSON.stringify(req.user);
			}
			headers['x-api-key'] = process.env.API_GATEWAY_KEY;
			return headers;
		}
	}
});

app.register(fastifyHttpProxy, {
	upstream: 'https://stats_manager:6000',
	prefix: '/stats',
	http2: false,
	preHandler: verifyJWT,
	replyOptions: {
		rewriteRequestHeaders: (req, headers) => {
			if (req.user) {
				headers['user'] = JSON.stringify(req.user);
			}
			headers['x-api-key'] = process.env.API_GATEWAY_KEY;
			return headers;
		}
	}
});

app.register(fastifyHttpProxy, {
	upstream: 'https://docs-service:3001',
	prefix: '/docs',
	http2: false,
	replyOptions: {
		rewriteRequestHeaders: addApiKeyHeader
	}
});

app.get('/health', (req, res) => {
	res.status(200).send('OK');
});

const start = async () => {
	try {
		await app.listen({ port: 3000, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();



