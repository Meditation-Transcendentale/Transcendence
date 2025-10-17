import Fastify from "fastify";
import dotenv from "dotenv";
import fs from "fs";
import { connect, JSONCodec } from 'nats';


import { statusCode, returnMessages, userReturn, friendshipReturn } from "../../shared/returnValues.mjs";
import { handleErrors } from "../../shared/handleErrors.mjs";
import { natsRequest } from '../../shared/natsRequest.mjs';
import { encodeFriendUpdate } from "./proto/helper.js";

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

async function checkFriendshipStatus(user, friend) {

	const friendship = await natsRequest(nats, jc, 'user.isFriendshipExisting', { userId1: user.id, userId2: friend.id });
	const isBlocked = await natsRequest(nats, jc, 'user.isBlocked', { userId: user.id, blockedUserId: friend.id });
	const isBlockedBy = await natsRequest(nats, jc, 'user.isBlocked', { userId: friend.id, blockedUserId: user.id });

	if (friendship) {
		if (friendship.status === 'accepted') {
			throw { status : friendshipReturn.FRIEND_012.http, code: friendshipReturn.FRIEND_012.code, message: friendshipReturn.FRIEND_012.message };
		} else if (friendship.status === 'pending' && friendship.user_id_1 === user.id) {
			throw { status : friendshipReturn.FRIEND_013.http, code: friendshipReturn.FRIEND_013.code, message: friendshipReturn.FRIEND_013.message };
		} else if (friendship.status === 'pending' && friendship.user_id_2 === user.id) {
			throw { status : friendshipReturn.FRIEND_014.http, code: friendshipReturn.FRIEND_014.code, message: friendshipReturn.FRIEND_014.message };
		}
	}
	if (isBlocked) {
		throw { status : friendshipReturn.FRIEND_018.http, code: friendshipReturn.FRIEND_018.code, message: friendshipReturn.FRIEND_018.message };
	}
	if (isBlockedBy) {
		throw { status : friendshipReturn.FRIEND_016.http, code: friendshipReturn.FRIEND_016.code, message: friendshipReturn.FRIEND_016.message };
	}
}

app.post('/add', handleErrors(async (req, res) => {

	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers } );

	const addedPlayerUuid = req.body.inputUuid;

	if (!addedPlayerUuid) {
		throw { status : userReturn.USER_004.http, code: userReturn.USER_004.code, message: userReturn.USER_004.message };
	}

	const friend = await natsRequest(nats, jc, 'user.getUserFromUUID', { uuid: addedPlayerUuid });

	if (user.id === friend.id) {
		throw { status : friendshipReturn.FRIEND_006.http, code: friendshipReturn.FRIEND_006.code, message: friendshipReturn.FRIEND_006.message };
	}
	await checkFriendshipStatus(user, friend);

	await natsRequest(nats, jc, 'user.addFriendRequest', { userId: user.id, friendId: friend.id });

	res.code(statusCode.SUCCESS).send({ message: returnMessages.FRIEND_REQUEST_SENT });
	nats.publish(`notification.${friend.uuid}.friendRequest`, encodeFriendUpdate({ sender: user.uuid }));
}));

app.post('/accept', handleErrors(async (req, res) => {
	
	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

	const requestFrom = req.body.inputUuid;
	if (!requestFrom) {
		throw { status : userReturn.USER_004.http, code: userReturn.USER_004.code, message: userReturn.USER_004.message };
	} else if (user.uuid === requestFrom) {
		throw { status : friendshipReturn.FRIEND_006.http, code: friendshipReturn.FRIEND_006.code, message: friendshipReturn.FRIEND_006.message };
	}

	const friend = await natsRequest(nats, jc, 'user.getUserFromUUID', { uuid: requestFrom });
	const friendship = await natsRequest(nats, jc, 'user.getFriendshipFromUser1Username', { userId: user.id, friendId: friend.id });
	if (friendship.status !== 'pending') {
		throw { status : friendshipReturn.FRIEND_002.http, code: friendshipReturn.FRIEND_002.code, message: friendshipReturn.FRIEND_002.message };
	}

	await natsRequest(nats, jc, 'user.acceptFriendRequest', { friendshipId: friendship.id });
	
	res.code(statusCode.SUCCESS).send({ message: returnMessages.FRIEND_REQUEST_ACCEPTED });
	nats.publish(`notification.${friend.uuid}.friendAccept`, encodeFriendUpdate({ sender: user.uuid }));
}));

app.delete('/decline', handleErrors(async (req, res) => {

	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

	const requestFrom = req.body.inputUuid;
	if (!requestFrom) {
		throw { status : userReturn.USER_004.http, code: userReturn.USER_004.code, message: userReturn.USER_004.message };
	} else if (user.uuid === requestFrom) {
		throw { status : friendshipReturn.FRIEND_008.http, code: friendshipReturn.FRIEND_008.code, message: friendshipReturn.FRIEND_008.message };
	}

	const friend = await natsRequest(nats, jc, 'user.getUserFromUUID', { uuid: requestFrom });

	const friendship = await natsRequest(nats, jc, 'user.getFriendshipFromUser1Username', { userId: user.id, friendId: friend.id });
	if (friendship.status !== 'pending') {
		throw { status : friendshipReturn.FRIEND_002.http, code: friendshipReturn.FRIEND_002.code, message: friendshipReturn.FRIEND_002.message };
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

	const friendName = req.body.inputUuid;
	if (!friendName) {
		throw { status : userReturn.USER_004.http, code: userReturn.USER_004.code, message: userReturn.USER_004.message };
	} else if (user.uuid === friendName) {
		throw { status : friendshipReturn.FRIEND_007.http, code: friendshipReturn.FRIEND_007.code, message: friendshipReturn.FRIEND_007.message };
	}

	const friend = await natsRequest(nats, jc, 'user.getUserFromUUID', { uuid: friendName });

	const friendship = await natsRequest(nats, jc, 'user.isFriendshipExisting', { userId1: user.id, userId2: friend.id });
	if (!friendship || friendship.status !== 'accepted') {
		throw { status : friendshipReturn.FRIEND_001.http, code: friendshipReturn.FRIEND_001.code, message: friendshipReturn.FRIEND_001.message };
	}

	await natsRequest(nats, jc, 'user.deleteFriendship', { friendshipId: friendship.id });

	res.code(statusCode.SUCCESS).send({ message: returnMessages.FRIEND_DELETED });
	nats.publish(`notification.${friend.uuid}.friendRemove`, encodeFriendUpdate({ sender: user.uuid }));
}));

app.post('/block', handleErrors(async (req, res) => {
	
	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

	const blockedUuid = req.body.inputUuid;
	if (!blockedUuid) {
		throw { status : userReturn.USER_004.http, code: userReturn.USER_004.code, message: userReturn.USER_004.message };
	}

	const blockedUser = await natsRequest(nats, jc, 'user.getUserFromUUID', { uuid: blockedUuid });
	if (user.id === blockedUser.id) {
		throw { status : friendshipReturn.FRIEND_009.http, code: friendshipReturn.FRIEND_009.code, message: friendshipReturn.FRIEND_009.message };
	}

	const isBlocked = await natsRequest(nats, jc, 'user.isBlocked', { userId: user.id, blockedUserId: blockedUser.id });
	if (isBlocked) {
		throw { status : friendshipReturn.FRIEND_015.http, code: friendshipReturn.FRIEND_015.code, message: friendshipReturn.FRIEND_015.message };
	}
	
	await natsRequest(nats, jc, 'user.blockUser', { userId: user.id, blockedUserId: blockedUser.id });

	res.code(statusCode.SUCCESS).send({ message: returnMessages.USER_BLOCKED_SUCCESS });

}));

app.delete('/unblock', handleErrors(async (req, res) => {

	const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

	const blockedUuid = req.body.inputUuid;
	if (!blockedUuid) {
		throw { status : userReturn.USER_004.http, code: userReturn.USER_004.code, message: userReturn.USER_004.message };
	}

	const blockedUser = await natsRequest(nats, jc, 'user.getUserFromUUID', { uuid: blockedUuid });
	if (user.id === blockedUser.id) {
		throw { status : friendshipReturn.FRIEND_010.http, code: friendshipReturn.FRIEND_010.code, message: friendshipReturn.FRIEND_010.message };
	}

	const isBlocked = await natsRequest(nats, jc, 'user.isBlocked', { userId: user.id, blockedUserId: blockedUser.id });
	if (!isBlocked) {
		throw { status : friendshipReturn.FRIEND_017.http, code: friendshipReturn.FRIEND_017.code, message: friendshipReturn.FRIEND_017.message };
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
