import database from "./update_user_infos.js";
import { statusCode, returnMessages } from "./returnValues.js";

const userService = {
	getUserFromUsername: async (username) => {
		const user = await database.get("SELECT * FROM users WHERE username = ?", username);
		if (!user) {
			throw { status: statusCode.NOT_FOUND, message: returnMessages.USER_NOT_FOUND };
		}
		return user;
	},
	getUserFromId: async (id) => {
		const user = await database.get("SELECT * FROM users WHERE id = ?", id);
		if (!user) {
			throw { status: statusCode.NOT_FOUND, message: returnMessages.USER_NOT_FOUND };
		}
		return user;
	},
	getUserFromHeader: async (req) => {
		const userHeader = req.headers['user'];
		if (!userHeader) {
			throw { status : statusCode.BAD_REQUEST, message: returnMessages.UNAUTHORIZED };
		}
		const userToken = JSON.parse(userHeader);
		const user = await userService.getUserFromId(userToken.id);
		return user;
	},
	addFriendRequest: async (userId, friendId) => {
		await database.run(`INSERT INTO friendslist (user_id_1, user_id_2) VALUES (?, ?)`, userId, friendId);
	},
	getFriendshipFromId: async (friendshipId) => {
		const friendship = await database.get("SELECT * FROM friendslist WHERE id = ?", friendshipId);
		if (!friendship) {
			throw { status: statusCode.NOT_FOUND, message: returnMessages.FRIENDSHIP_NOT_FOUND };
		}
		return friendship;
	},
	acceptFriendRequest: async (friendshipId) => {
		await database.run(`UPDATE friendslist SET status = 'accepted' WHERE id = ?`, friendshipId);
	},
	declineFriendRequest: async (friendshipId) => {
		await database.run(`DELETE FROM friendslist WHERE id = ?`, friendshipId);
	},
	getFriendsRequests: async (userId) => {
		const friendRequestsList = await database.all("SELECT * FROM friendslist WHERE user_id_2 = ?", userId);
		if (friendRequestsList.length === 0) {
			throw { status: statusCode.NOT_FOUND, message: returnMessages.FRIEND_REQUEST_NOT_FOUND };
		}
		return friendRequestsList;
	},
	isFriendshipExisting: async (userId1, userId2) => {
		const friendship = await database.get(`SELECT * FROM friendslist WHERE (user_id_1 = ? AND user_id_2 = ?) OR (user_id_1 = ? AND user_id_2 = ?)`, userId1, userId2, userId2, userId1);
		return friendship;
	},
	deleteFriendship: async (friendshipId) => {
		await database.run(`DELETE FROM friendslist WHERE id = ?`, friendshipId);
	},
	blockUser: async (userId, blockedUserId) => {
		await database.run(`INSERT INTO friendslist (user_id_1, user_id_2, status) VALUES (?, ?, ?)`, userId, blockedUserId, 'blocked');
	},
	blockFriend: async (userId, blockedUserId, friendshipId) => {
		await database.run(`UPDATE friendslist SET user_id_1 = ?, user_id_2 = ? , status = 'blocked' WHERE id = ?`, userId, blockedUserId, friendshipId);
	}
}

export default userService;