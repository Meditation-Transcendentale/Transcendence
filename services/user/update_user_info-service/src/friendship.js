// import sqlite3 from "sqlite3";
// import { promisify } from "util";

// // const Database = sqlite3.Database;
// // const database = new Database(process.env.DATABASE_URL, sqlite3.OPEN_READWRITE);
// // await database.run("PRAGMA journal_mode = WAL;");
// // database.configure("busyTimeout", 5000);
// // database.get = promisify(database.get);
// // database.run = promisify(database.run);
// // database.all = promisify(database.all);
// import database from "./update_user_infos.js";

// // const getUserFromId = database.prepare(`SELECT * FROM users WHERE id = ?`);

import userService from "./userService";

const getUserFromHeader = async (req) => {
	const userHeader = req.headers['user'];

	if (!userHeader) {
		throw { status : 400, message: 'Unauthorized' };
	}

	const userToken = JSON.parse(userHeader);
	const user = await userService.getUserFromId(userToken.id);

	return user;
};

const handleErrors = (fn) => async (req, res) => {
	try {
		await fn(req, res);
	} catch (error) {
		console.error(error);
		const status = error.status || 500;
		const message = error.message || 'Server Error';
		res.code(status).send({ message });
	}
};

const addFriendRoute = (app) => {
	app.post('/add-friend', handleErrors(async (req, res) => {

		user = await getUserFromHeader(req);

		const addedPlayerUsername = req.body.addedPlayerUsername;

		if (!addedPlayerUsername) {
			throw { status : 400, message: 'Player username is required' };
		}

		const friend = await userService.getUserFromUsername(addedPlayerUsername);

		if (user.id === friend.id) {
			throw { status : 400, message: 'You cannot add yourself as a friend' };
		}
		await userService.addFriendRequest(user.id, friend.id);
	
		res.code(200).send({ message: 'Friend request sent' });
	}));

	app.post('/accept-friend', handleErrors(async (req, res) => {
		
		user = await getUserFromHeader(req);

		const request_id = req.body.requestId;

		if (!request_id || !Number.isInteger(request_id) ) {
			throw { status : 400, message: 'Request ID is required' };
		}

		const isFriendRequestExisting = await userService.getFriendshipFromId(request_id);
		if (isFriendRequestExisting.status !== 'pending' || isFriendRequestExisting.user_id_2 !== user.id) {
			throw { status : 404, message: 'Friend request not found' };
		}

		await userService.acceptFriendRequest(request_id);
		
		res.code(200).send({ message: 'Friend request accepted' });	
	}));

	app.delete('/decline-friend', handleErrors(async (req, res) => {

		user = await getUserFromHeader(req);

		const request_id = req.body.requestId;

		if (!request_id || !Number.isInteger(request_id) ) {
			throw { status : 400, message: 'Request ID is required' };
		}

		const isFriendRequestExisting = await userService.getFriendshipFromId(request_id);
		if (isFriendRequestExisting.status !== 'pending' || isFriendRequestExisting.user_id_2 !== user.id) {
			throw { status : 404, message: 'Friend request not found' };
		}

		await userService.declineFriendRequest(request_id);

		res.code(200).send({ message: 'Friend request declined' });
	}));

	app.get('/friend-requests', handleErrors(async (req, res) => {

		user = await getUserFromHeader(req);

		const friendsRequests = await userService.getFriendsRequests(user.id);

		res.code(200).send({ friendsRequests });
	}));

	app.delete('/delete-friends', handleErrors(async (req, res) => {

		user = await getUserFromHeader(req);

		const friendId = req.body.friendId;
		if (!friendId || !Number.isInteger(friendId) ) {
			throw { status : 400, message: 'Friendship id is required' };
		}

		const isFriendshipExisting = await userService.isFriendshipExisting(user.id, friendId);
		if (!isFriendshipExisting || isFriendshipExisting.status !== 'accepted') {
			throw { status : 404, message: 'Friendship not found' };
		}

		await userService.deleteFriendship(friendId);

		res.code(200).send({ message: 'Friendship deleted' });
	}));

	// app.get('/block-user', async (req, res) => {
	// 	try {
	// 		const userHeader = req.headers['user'];

	// 		if (!userHeader) {
	// 			return res.code(400).send({ message: 'Unauthorized' });
	// 		}

	// 		const userToken = JSON.parse(userHeader);
	// 		const user = await database.get("SELECT * FROM users WHERE id = ?", userToken.id);
	// 		if (!user) {
	// 			return res.code(404).send({ message: 'User not found' });
	// 		}

	// 		// const blockedUserId = req.body.blockedUserId;
	// 		// if (!blockedUserId || !Number.isInteger(blockedUserId) ) {
	// 		// 	return res.code(400).send({ message: 'Blocked user id is required' });
	// 		// }

	// 		// const isBlockedUserExisting = await database.get(`SELECT * FROM blocked_users WHERE (user_id_1 = ? AND user_id_2 = ?) OR (user_id_1 = ? AND user_id_2 = ?)`, user.id, blockedUserId, blockedUserId, user.id);
	// 		// if (!isBlockedUserExisting) {
	// 		// 	return res.code(404).send({ message: 'Blocked user not found' });
	// 		// }

	// 		// await database.run(`DELETE FROM blocked_users WHERE (user_id_1 = ? AND user_id_2 = ?) OR (user_id_1 = ? AND user_id_2 = ?)`, user.id, blockedUserId, blockedUserId, user.id), (err) => {
	// 		// 	if (err) {
	// 		// 		console.log(err);
	// 		// 		return res.code(500).send({ message: 'Server Error' });
	// 		// 	}
	// 		// }
			
	// 		return res.code(200).send({ message: 'User unblocked' });
	// 	} catch (error) {
	// 		console.log(error);
	// 		return res.code(500).send({ message: 'Server Error' });
	// 	}
	// });
}

export default addFriendRoute;