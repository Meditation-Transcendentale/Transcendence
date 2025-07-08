import Fastify from "fastify";
import dotenv from "dotenv";
import fs from "fs";
import { connect, JSONCodec } from 'nats';

import { collectDefaultMetrics, Registry, Histogram, Counter } from 'prom-client';

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

async function checkFriendshipStatus(user, friend) {

	const friendship = await natsRequest(nats, jc, 'user.isFriendshipExisting', { userId1: user.id, userId2: friend.id });
	const isBlocked = await natsRequest(nats, jc, 'user.isBlocked', { userId: user.id, blockedUserId: friend.id });
	const isBlockedBy = await natsRequest(nats, jc, 'user.isBlocked', { userId: friend.id, blockedUserId: user.id });


	if (friendship) {
		if (friendship.status === 'accepted') {
			throw { status : statusCode.CONFLICT, message: returnMessages.ALREADY_FRIEND };
		} else if (friendship.status === 'pending' && friendship.user_id_1 === user.id) {
			throw { status : statusCode.CONFLICT, message: returnMessages.ALREADY_FRIEND_REQUEST };
		} else if (friendship.status === 'pending' && friendship.user_id_2 === user.id) {
			throw { status : statusCode.CONFLICT, message: returnMessages.ALREADY_RECEIVED };
		}
	}
	if (isBlocked) {
		throw { status : statusCode.CONFLICT, message: returnMessages.ADD_BLOCKED_USER };
	}
	if (isBlockedBy) {
		throw { status : statusCode.CONFLICT, message: returnMessages.USER_BLOCKED_YOU };
	}
}

app.post('/add', handleErrors(async (req, res) => {

	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers } );

	const addedPlayerUsername = req.body.inputUsername;
	
	if (!addedPlayerUsername) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.USERNAME_REQUIRED };
	}

	const friend = await natsRequest(nats, jc, 'user.getUserFromUsername', { username: addedPlayerUsername });

	if (user.id === friend.id) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.AUTO_FRIEND_REQUEST };
	}
	checkFriendshipStatus(user, friend);

	await natsRequest(nats, jc, 'user.addFriendRequest', { userId: user.id, friendId: friend.id });

	res.code(statusCode.SUCCESS).send({ message: returnMessages.FRIEND_REQUEST_SENT });
	console.log(`publishing on: notification.${friend.uuid}.friendRequest`)
	nats.publish(`notification.${friend.uuid}.friendRequest`, jc.encode({ senderID: user.uuid }));
}));

app.post('/accept', handleErrors(async (req, res) => {
	
	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

	const requestFrom = req.body.inputUsername;
	if (!requestFrom) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.USERNAME_REQUIRED };
	} else if (user.username === requestFrom) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.AUTO_FRIEND_REQUEST };
	}

	const friend = await natsRequest(nats, jc, 'user.getUserFromUsername', { username: requestFrom });

	const friendship = await natsRequest(nats, jc, 'user.getFriendshipFromUser1Username', { userId: user.id, friendId: friend.id });
	if (friendship.status !== 'pending') {
		throw { status : statusCode.NOT_FOUND, message: returnMessages.FRIEND_REQUEST_NOT_FOUND };
	}

	await natsRequest(nats, jc, 'user.acceptFriendRequest', { friendshipId: friendship.id });
	
	res.code(statusCode.SUCCESS).send({ message: returnMessages.FRIEND_REQUEST_ACCEPTED });
	console.log(`publishing on: notification.${friend.uuid}.friendAccept`)
	nats.publish(`notification.${friend.uuid}.friendAccept`, jc.encode({ senderID: user.uuid}));
}));

app.delete('/decline', handleErrors(async (req, res) => {

	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

	const requestFrom = req.body.inputUsername;
	if (!requestFrom) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.USERNAME_REQUIRED };
	} else if (user.username === requestFrom) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.AUTO_DECLINE_REQUEST };
	}

	const friend = await natsRequest(nats, jc, 'user.getUserFromUsername', { username: requestFrom });

	const friendship = await natsRequest(nats, jc, 'user.getFriendshipFromUser1Username', { userId: user.id, friendId: friend.id });
	if (friendship.status !== 'pending') {
		throw { status : statusCode.NOT_FOUND, message: returnMessages.FRIEND_REQUEST_NOT_FOUND };
	}

	await natsRequest(nats, jc, 'user.declineFriendRequest', { friendshipId: friendship.id });

	res.code(statusCode.SUCCESS).send({ message: returnMessages.FRIEND_REQUEST_DECLINED });
}));

app.get('/get/requests', handleErrors(async (req, res) => {

	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

	const friendsRequests = await natsRequest(nats, jc, 'user.getFriendsRequests', { userId: user.id });

	res.header('Cache-Control', 'no-store');
	res.code(statusCode.SUCCESS).send({ friendsRequests });
}));

app.get('/get/friendlist', handleErrors(async (req, res) => {

	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

	const friendlist = await natsRequest(nats, jc, 'user.getFriendlist', { userId: user.id });

	res.header('Cache-Control', 'no-store');
	res.code(statusCode.SUCCESS).send({ friendlist });
}));

app.delete('/delete', handleErrors(async (req, res) => {

	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

	const friendName = req.body.inputUsername;
	if (!friendName) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.USERNAME_REQUIRED };
	} else if (user.username === friendName) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.AUTO_DELETE_REQUEST };
	}

	const friend = await natsRequest(nats, jc, 'user.getUserFromUsername', { username: friendName });

	const friendship = await natsRequest(nats, jc, 'user.isFriendshipExisting', { userId1: user.id, userId2: friend.id });
	if (!friendship || friendship.status !== 'accepted') {
		throw { status : statusCode.NOT_FOUND, message: returnMessages.FRIENDSHIP_NOT_FOUND };
	}

	await natsRequest(nats, jc, 'user.deleteFriendship', { friendshipId: friendship.id });

	res.code(statusCode.SUCCESS).send({ message: returnMessages.FRIEND_DELETED });
}));

app.post('/block', handleErrors(async (req, res) => {
	
	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

	const blockedUserName = req.body.inputUsername;
	if (!blockedUserName) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.USERNAME_REQUIRED };
	}

	const blockedUser = await natsRequest(nats, jc, 'user.getUserFromUsername', { username: blockedUserName });
	if (user.id === blockedUser.id) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.AUTO_BLOCK_REQUEST };
	}

	const isBlocked = await natsRequest(nats, jc, 'user.isBlocked', { userId: user.id, blockedUserId: blockedUser.id });
	if (isBlocked) {
		throw { status : statusCode.CONFLICT, message: returnMessages.ALREADY_BLOCKED };
	}
	
	await natsRequest(nats, jc, 'user.blockUser', { userId: user.id, blockedUserId: blockedUser.id });

	res.code(statusCode.SUCCESS).send({ message: returnMessages.USER_BLOCKED_SUCCESS });

}));

app.delete('/unblock', handleErrors(async (req, res) => {

	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

	const blockedUserName = req.body.inputUsername;
	if (!blockedUserName) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.USERNAME_REQUIRED };
	}

	const blockedUser = await natsRequest(nats, jc, 'user.getUserFromUsername', { username: blockedUserName });
	if (user.id === blockedUser.id) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.AUTO_UNBLOCK_REQUEST };
	}

	const isBlocked = await natsRequest(nats, jc, 'user.isBlocked', { userId: user.id, blockedUserId: blockedUser.id });
	if (!isBlocked) {
		throw { status : statusCode.NOT_FOUND, message: returnMessages.NOT_BLOCKED };
	}
	await natsRequest(nats, jc, 'user.unblockUser', { userId: user.id, blockedUserId: blockedUser.id });

	res.code(statusCode.SUCCESS).send({ message: returnMessages.USER_UNBLOCKED });
}));

app.get('/get/blocked', handleErrors(async (req, res) => {

	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

	const blockedUsers = await natsRequest(nats, jc, 'user.getBlockedUsers', { userId: user.id });

	res.header('Cache-Control', 'no-store');
	res.code(statusCode.SUCCESS).send({ blockedUsers });
}));

app.get('/health', (req, res) => {
	res.status(200).send('OK');
});

const start = async () => {
	try {
		await app.listen({ port: 4004, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();
