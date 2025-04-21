import Fastify from "fastify";
import dotenv from "dotenv";
import fs from "fs";

// import userService from "./userService.js";
import { statusCode, returnMessages } from "../../shared/returnValues.mjs";
import { handleErrors } from "../../shared/handleErrors.mjs";

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

async function checkFriendshipStatus(user, friend) {

	const friendship = await userService.isFriendshipExisting(user.id, friend.id);
	const isBlocked = await userService.isBlocked(user.id, friend.id);
	const isBlockedBy = await userService.isBlocked(friend.id, user.id);

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

app.post('/add-friend', handleErrors(async (req, res) => {

	const user = userService.getUserFromHeader(req);

	const addedPlayerUsername = req.body.addedPlayerUsername;

	if (!addedPlayerUsername) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.USERNAME_REQUIRED };
	}

	const friend = userService.getUserFromUsername(addedPlayerUsername);

	if (user.id === friend.id) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.AUTO_FRIEND_REQUEST };
	}
	await checkFriendshipStatus(user, friend);

	userService.addFriendRequest(user.id, friend.id);

	res.code(statusCode.SUCCESS).send({ message: returnMessages.FRIEND_REQUEST_SENT });
}));

app.post('/accept-friend', handleErrors(async (req, res) => {
	
	const user = userService.getUserFromHeader(req);

	const requestFrom = req.body.requestFrom;
	if (!requestFrom) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.USERNAME_REQUIRED };
	} else if (user.username === requestFrom) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.AUTO_FRIEND_REQUEST };
	}

	const friend = userService.getUserFromUsername(requestFrom);

	const friendship = userService.getFriendshipFromUser1Username(user.id, friend.id);
	if (friendship.status !== 'pending') {
		throw { status : statusCode.NOT_FOUND, message: returnMessages.FRIEND_REQUEST_NOT_FOUND };
	}

	userService.acceptFriendRequest(friendship.id);
	
	res.code(statusCode.SUCCESS).send({ message: returnMessages.FRIEND_REQUEST_ACCEPTED });
}));

app.delete('/decline-friend', handleErrors(async (req, res) => {

	const user = userService.getUserFromHeader(req);

	const requestFrom = req.body.requestFrom;
	if (!requestFrom) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.USERNAME_REQUIRED };
	} else if (user.username === requestFrom) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.AUTO_DECLINE_REQUEST };
	}

	const friend = userService.getUserFromUsername(requestFrom);

	const friendship = userService.getFriendshipFromUser1Username(user.id, friend.id);
	if (friendship.status !== 'pending') {
		throw { status : statusCode.NOT_FOUND, message: returnMessages.FRIEND_REQUEST_NOT_FOUND };
	}

	userService.declineFriendRequest(friendship.id);

	res.code(statusCode.SUCCESS).send({ message: returnMessages.FRIEND_REQUEST_DECLINED });
}));

app.get('/friend-requests', handleErrors(async (req, res) => {

	const user = userService.getUserFromHeader(req);

	const friendsRequests = userService.getFriendsRequests(user.id);

	res.code(statusCode.SUCCESS).send({ friendsRequests });
}));

app.delete('/delete-friends', handleErrors(async (req, res) => {

	const user = userService.getUserFromHeader(req);

	const friendName = req.body.friendName;
	if (!friendName) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.USERNAME_REQUIRED };
	} else if (user.username === friendName) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.AUTO_DELETE_REQUEST };
	}

	const friend = userService.getUserFromUsername(friendName);

	const friendship = await userService.isFriendshipExisting(user.id, friend.id);
	if (!friendship || friendship.status !== 'accepted') {
		throw { status : statusCode.NOT_FOUND, message: returnMessages.FRIENDSHIP_NOT_FOUND };
	}

	userService.deleteFriendship(friendship.id);

	res.code(statusCode.SUCCESS).send({ message: returnMessages.FRIEND_DELETED });
}));

app.post('/block-user', handleErrors(async (req, res) => {
	
	const user = userService.getUserFromHeader(req);

	const blockedUserName = req.body.blockedUserName;
	if (!blockedUserName) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.USERNAME_REQUIRED };
	}

	const blockedUser = userService.getUserFromUsername(blockedUserName);
	if (user.id === blockedUser.id) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.AUTO_BLOCK_REQUEST };
	}

	const isBlocked = await userService.isBlocked(user.id, blockedUser.id);
	if (isBlocked) {
		throw { status : statusCode.CONFLICT, message: returnMessages.ALREADY_BLOCKED };
	}
	
	userService.blockUser(user.id, blockedUser.id);

	res.code(statusCode.SUCCESS).send({ message: returnMessages.USER_BLOCKED_SUCCESS });

}));

app.delete('/unblock-user', handleErrors(async (req, res) => {

	const user = userService.getUserFromHeader(req);

	const blockedUserName = req.body.blockedUserName;
	if (!blockedUserName) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.USERNAME_REQUIRED };
	}

	const blockedUser = userService.getUserFromUsername(blockedUserName);
	if (user.id === blockedUser.id) {
		throw { status : statusCode.BAD_REQUEST, message: returnMessages.AUTO_UNBLOCK_REQUEST };
	}

	const isBlocked = await userService.isBlocked(user.id, blockedUser.id);
	if (!isBlocked) {
		throw { status : statusCode.NOT_FOUND, message: returnMessages.NOT_BLOCKED };
	}
	userService.unblockUser(user.id, blockedUser.id);

	res.code(statusCode.SUCCESS).send({ message: returnMessages.USER_UNBLOCKED });
}));

app.get('/blocked-users', handleErrors(async (req, res) => {

	const user = userService.getUserFromHeader(req);

	const blockedUsers = userService.getBlockedUsers(user.id);

	res.code(statusCode.SUCCESS).send({ blockedUsers });
}));

const start = async () => {
	try {
		await app.listen({ port: 4004, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();
