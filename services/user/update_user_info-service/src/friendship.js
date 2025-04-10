import userService from "./userService.js";
import { statusCode, returnMessages } from "./returnValues.js";

const handleErrors = (fn) => async (req, res) => {
	try {
		await fn(req, res);
	} catch (error) {
		console.error(error);
		const status = error.status || statusCode.INTERNAL_SERVER_ERROR;
		const message = error.message || returnMessages.INTERNAL_SERVER_ERROR;
		res.code(status).send({ message });
	}
};

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


const addFriendRoute = (app) => {
	app.post('/add-friend', handleErrors(async (req, res) => {

		const user = await userService.getUserFromHeader(req);

		const addedPlayerUsername = req.body.addedPlayerUsername;

		if (!addedPlayerUsername) {
			throw { status : statusCode.BAD_REQUEST, message: returnMessages.USERNAME_REQUIRED };
		}

		const friend = await userService.getUserFromUsername(addedPlayerUsername);

		if (user.id === friend.id) {
			throw { status : statusCode.BAD_REQUEST, message: returnMessages.AUTO_FRIEND_REQUEST };
		}
		await checkFriendshipStatus(user, friend);

		await userService.addFriendRequest(user.id, friend.id);
	
		res.code(statusCode.SUCCESS).send({ message: returnMessages.FRIEND_REQUEST_SENT });
	}));

	app.post('/accept-friend', handleErrors(async (req, res) => {
		
		const user = await userService.getUserFromHeader(req);

		const request_id = req.body.requestId;

		if (!request_id || !Number.isInteger(request_id) ) {
			throw { status : statusCode.BAD_REQUEST, message: 'Request ID is required' };
		}

		const isFriendRequestExisting = await userService.getFriendshipFromId(request_id);
		if (isFriendRequestExisting.status !== 'pending' || isFriendRequestExisting.user_id_2 !== user.id) {
			throw { status : statusCode.NOT_FOUND, message: returnMessages.FRIEND_REQUEST_NOT_FOUND };
		}

		await userService.acceptFriendRequest(request_id);
		
		res.code(statusCode.SUCCESS).send({ message: returnMessages.FRIEND_REQUEST_ACCEPTED });
	}));

	app.delete('/decline-friend', handleErrors(async (req, res) => {

		const user = await userService.getUserFromHeader(req);

		const request_id = req.body.requestId;

		if (!request_id || !Number.isInteger(request_id) ) {
			throw { status : statusCode.BAD_REQUEST, message: 'Request ID is required' };
		}

		const isFriendRequestExisting = await userService.getFriendshipFromId(request_id);
		if (isFriendRequestExisting.status !== 'pending' || isFriendRequestExisting.user_id_2 !== user.id) {
			throw { status : statusCode.NOT_FOUND, message: returnMessages.FRIEND_REQUEST_NOT_FOUND };
		}

		await userService.declineFriendRequest(request_id);

		res.code(statusCode.SUCCESS).send({ message: returnMessages.FRIEND_REQUEST_DECLINED });
	}));

	app.get('/friend-requests', handleErrors(async (req, res) => {

		const user = await userService.getUserFromHeader(req);

		const friendsRequests = await userService.getFriendsRequests(user.id);

		res.code(statusCode.SUCCESS).send({ friendsRequests });
	}));

	app.delete('/delete-friends', handleErrors(async (req, res) => {

		const user = await userService.getUserFromHeader(req);

		const friendId = req.body.friendId;
		if (!friendId || !Number.isInteger(friendId) ) {
			throw { status : statusCode.BAD_REQUEST, message: 'Friendship id is required' };
		}

		const isFriendshipExisting = await userService.isFriendshipExisting(user.id, friendId);
		if (!isFriendshipExisting || isFriendshipExisting.status !== 'accepted') {
			throw { status : statusCode.NOT_FOUND, message: returnMessages.FRIENDSHIP_NOT_FOUND };
		}

		await userService.deleteFriendship(friendId);

		res.code(statusCode.SUCCESS).send({ message: returnMessages.FRIEND_DELETED });
	}));

	app.post('/block-user', handleErrors(async (req, res) => {
		
		const user = await userService.getUserFromHeader(req);

		const blockedUserName = req.body.blockedUserName;
		if (!blockedUserName) {
			throw { status : statusCode.BAD_REQUEST, message: returnMessages.USERNAME_REQUIRED };
		}

		const blockedUser = await userService.getUserFromUsername(blockedUserName);
		if (user.id === blockedUser.id) {
			throw { status : statusCode.BAD_REQUEST, message: returnMessages.AUTO_BLOCK_REQUEST };
		}

		const isBlocked = await userService.isBlocked(user.id, blockedUser.id);
		if (isBlocked) {
			throw { status : statusCode.CONFLICT, message: returnMessages.ALREADY_BLOCKED };
		}
		
		await userService.blockUser(user.id, blockedUser.id);

		res.code(statusCode.SUCCESS).send({ message: returnMessages.USER_BLOCKED_SUCCESS });

	}));

	app.delete('/unblock-user', handleErrors(async (req, res) => {

		const user = await userService.getUserFromHeader(req);

		const blockedUserName = req.body.blockedUserName;
		if (!blockedUserName) {
			throw { status : statusCode.BAD_REQUEST, message: returnMessages.USERNAME_REQUIRED };
		}

		const blockedUser = await userService.getUserFromUsername(blockedUserName);
		if (user.id === blockedUser.id) {
			throw { status : statusCode.BAD_REQUEST, message: returnMessages.AUTO_UNBLOCK_REQUEST };
		}

		const isBlocked = await userService.isBlocked(user.id, blockedUser.id);
		if (!isBlocked) {
			throw { status : statusCode.NOT_FOUND, message: returnMessages.NOT_BLOCKED };
		}
		await userService.unblockUser(user.id, blockedUser.id);

		res.code(statusCode.SUCCESS).send({ message: returnMessages.USER_UNBLOCKED });
	}));

	app.get('/blocked-users', handleErrors(async (req, res) => {

		const user = await userService.getUserFromHeader(req);

		const blockedUsers = await userService.getBlockedUsers(user.id);

		res.code(statusCode.SUCCESS).send({ blockedUsers });
	}));
}

export default addFriendRoute;