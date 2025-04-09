import sqlite3 from "sqlite3";
import { promisify } from "util";

// const Database = sqlite3.Database;
// const database = new Database(process.env.DATABASE_URL, sqlite3.OPEN_READWRITE);
// await database.run("PRAGMA journal_mode = WAL;");
// database.configure("busyTimeout", 5000);
// database.get = promisify(database.get);
// database.run = promisify(database.run);
// database.all = promisify(database.all);
import database from "./update_user_infos.js";

// const getUserFromId = database.prepare(`SELECT * FROM users WHERE id = ?`);

const addFriendRoute = (app) => {
	app.post('/add-friend', async (req, res) => {
		try {
			const userHeader = req.headers['user'];

			if (!userHeader) {
				return res.code(400).send({ message: 'Unauthorized' });
			}

			const userToken = JSON.parse(userHeader);
			// const user = await getUserFromId.get(userToken.id);
			const user = await database.get("SELECT * FROM users WHERE id = ?", userToken.id);

			if (!user) {
				return res.code(404).send({ message: 'User not found' });
			}

			const addedPlayerUsername = req.body.addedPlayerUsername;

			if (!addedPlayerUsername) {
				return res.code(400).send({ message: 'Player username is required' });
			}

			const friend = await database.get("SELECT * FROM users WHERE username = ?", addedPlayerUsername);
			if (!friend) {
				return res.code(404).send({ message: 'Player not found' });
			}

			if (user.id === friend.id) {
				return res.code(400).send({ message: 'You cannot add yourself as a friend' });
			}

			await database.run(`INSERT INTO friendslist (user_id_1, user_id_2) VALUES (?, ?)`, user.id, friend.id), (err) => {
				if (err) {
					console.log(err);
					return res.code(500).send({ message: 'Server Error' });
				}
			};
		
			return res.code(200).send({ message: 'Friend request sent' });
		} catch (error) {
			console.log(error);
			return res.code(500).send({ message: 'Server Error' });
		}
	});

	app.post('/accept-friend', async (req, res) => {
		try {
			const userHeader = req.headers['user'];

			if (!userHeader) {
				return res.code(400).send({ message: 'Unauthorized' });
			}

			const userToken = JSON.parse(userHeader);
			const user = await database.get("SELECT * FROM users WHERE id = ?", userToken.id);
			if (!user) {
				return res.code(404).send({ message: 'User not found' });
			}

			const request_id = req.body.requestId;

			if (!request_id || !Number.isInteger(request_id) ) {
				return res.code(400).send({ message: 'Request ID is required' });
			}

			const isFriendRequestExisting = await database.get(`SELECT * FROM friendslist WHERE id = ?`, request_id);
			if (!isFriendRequestExisting) {
				return res.code(404).send({ message: 'Friend request not found' });
			}
			if (isFriendRequestExisting.user_id_2 !== user.id) {
				return res.code(404).send({ message: 'Friend request not found' });
			}

			await database.run(`UPDATE friendslist SET status = 'accepted' WHERE id = ?`, request_id),  (err) => {
				if (err) {
					console.log(err);
					return res.code(500).send({ message: 'Server Error' });
				}
			}

			return res.code(200).send({ message: 'Friend request accepted' });
		} catch (error) {
			console.log(error);
			return res.code(500).send({ message: 'Server Error' });
		}	
	});

	app.delete('/decline-friend', async (req, res) => {
		try {
			const userHeader = req.headers['user'];

			if (!userHeader) {
				return res.code(400).send({ message: 'Unauthorized' });
			}

			const userToken = JSON.parse(userHeader);
			// const user = await getUserFromId.get(userToken.id);
			const user = await database.get("SELECT * FROM users WHERE id = ?", userToken.id);

			if (!user) {
				return res.code(404).send({ message: 'User not found' });
			}

			const request_id = req.body.requestId;

			if (!request_id || !Number.isInteger(request_id) ) {
				return res.code(400).send({ message: 'Request ID is required' });
			}

			const isFriendRequestExisting = await database.get(`SELECT * FROM friendslist WHERE id = ?`, request_id);
			if (!isFriendRequestExisting) {
				return res.code(404).send({ message: 'Friend request not found' });
			}
			if (isFriendRequestExisting.user_id_2 !== user.id) {
				return res.code(404).send({ message: 'Friend request not found' });
			}

			await database.run(`DELETE FROM friendslist WHERE id = ?`, request_id), (err) => {
				if (err) {
					console.log(err);
					return res.code(500).send({ message: 'Server Error' });
				}
			}

			return res.code(200).send({ message: 'Friend request declined' });
		} catch (error) {
			console.log(error);
			return res.code(500).send({ message: 'Server Error' });
		}
	});

	app.get('/friend-requests', async (req, res) => {
		try {
			const userHeader = req.headers['user'];

			if (!userHeader) {
				return res.code(400).send({ message: 'Unauthorized' });
			}

			const userToken = JSON.parse(userHeader);
			const user = await database.get("SELECT * FROM users WHERE id = ?", userToken.id);
			if (!user) {
				return res.code(404).send({ message: 'User not found' });
			}

			const friendsRequests = await database.all("SELECT * FROM friendslist WHERE user_id_2 = ?", user.id);
			if (friendsRequests.length === 0) {
				return res.code(404).send({ message: 'No friend requests found' });
			}

			return res.code(200).send({ friendsRequests });
		} catch (error) {
			console.log(error);
			return res.code(500).send({ message: 'Server Error' });
		}
	});

	app.delete('/delete-friends', async (req, res) => {
		try {
			const userHeader = req.headers['user'];

			if (!userHeader) {
				return res.code(400).send({ message: 'Unauthorized' });
			}

			const userToken = JSON.parse(userHeader);
			const user = await database.get("SELECT * FROM users WHERE id = ?", userToken.id);
			if (!user) {
				return res.code(404).send({ message: 'User not found' });
			}
			
			const friendId = req.body.friendId;
			if (!friendId || !Number.isInteger(friendId) ) {
				return res.code(400).send({ message: 'Friendship id is required' });
			}

			const isFriendshipExisting = await database.get(`SELECT * FROM friendslist WHERE (user_id_1 = ? AND user_id_2 = ?) OR (user_id_1 = ? AND user_id_2 = ?)`, user.id, friendId, friendId, user.id);
			if (!isFriendshipExisting) {
				return res.code(404).send({ message: 'Friendship not found' });
			}

			await database.run(`DELETE FROM friendslist WHERE (user_id_1 = ? AND user_id_2 = ?) OR (user_id_1 = ? AND user_id_2 = ?)`, user.id, friendId, friendId, user.id), (err) => {
				if (err) {
					console.log(err);
					return res.code(500).send({ message: 'Server Error' });
				}
			}
			return res.code(200).send({ message: 'Friendship deleted' });
		} catch (error) {
			console.log(error);
			return res.code(500).send({ message: 'Server Error' });
		}
	});

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