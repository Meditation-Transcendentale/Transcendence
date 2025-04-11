import Database from 'better-sqlite3';
import { statusCode, returnMessages } from "./returnValues.js";

const database = new Database(process.env.DATABASE_URL, {fileMustExist: true });
database.pragma("journal_mode=WAL");

const getUserByUsernameStmt = database.prepare("SELECT * FROM users WHERE username = ?");
const getUserByIdStmt = database.prepare("SELECT * FROM users WHERE id = ?");
const addFriendRequestStmt = database.prepare("INSERT INTO friendslist (user_id_1, user_id_2) VALUES (?, ?)");
const getFriendshipByIdStmt = database.prepare("SELECT * FROM friendslist WHERE id = ?");
const getFriendshipByUser1UsernameStmt = database.prepare("SELECT * FROM friendslist WHERE user_id_1 = ? AND user_id_2 = ?");
const acceptFriendRequestStmt = database.prepare("UPDATE friendslist SET status = 'accepted' WHERE id = ?");
const declineFriendRequestStmt = database.prepare("DELETE FROM friendslist WHERE id = ?");
const getFriendsRequestsStmt = database.prepare("SELECT * FROM friendslist WHERE user_id_2 = ?");
const isFriendshipExistingStmt = database.prepare("SELECT * FROM friendslist WHERE (user_id_1 = ? AND user_id_2 = ?) OR (user_id_1 = ? AND user_id_2 = ?)");
const deleteFriendshipStmt = database.prepare("DELETE FROM friendslist WHERE id = ?");
const blockUserStmt = database.prepare("INSERT INTO blocked_users (blocker_id, blocked_id) VALUES (?, ?)");
const isBlockedStmt = database.prepare("SELECT * FROM blocked_users WHERE blocker_id = ? AND blocked_id = ?");
const unblockUserStmt = database.prepare("DELETE FROM blocked_users WHERE blocker_id = ? AND blocked_id = ?");
const getBlockedUsersStmt = database.prepare("SELECT * FROM blocked_users WHERE blocker_id = ?");

const userService = {
	getUserFromUsername: (username) => {
		const user = getUserByUsernameStmt.get(username);
		if (!user) {
			throw { status: statusCode.NOT_FOUND, message: returnMessages.USER_NOT_FOUND };
		}
		return user;
	},
	getUserFromId: (id) => {
		const user = getUserByIdStmt.get(id);
		if (!user) {
			throw { status: statusCode.NOT_FOUND, message: returnMessages.USER_NOT_FOUND };
		}
		return user;
	},
	getUserFromHeader: (req) => {
		const userHeader = req.headers['user'];
		if (!userHeader) {
			throw { status : statusCode.BAD_REQUEST, message: returnMessages.UNAUTHORIZED };
		}
		const userToken = JSON.parse(userHeader);
		const user = userService.getUserFromId(userToken.id);
		return user;
	},
	addFriendRequest: (userId, friendId) => {
		addFriendRequestStmt.run(userId, friendId);
	},
	getFriendshipFromId: (friendshipId) => {
		const friendship = getFriendshipByIdStmt.get(friendshipId);
		if (!friendship) {
			throw { status: statusCode.NOT_FOUND, message: returnMessages.FRIENDSHIP_NOT_FOUND };
		}
		return friendship;
	},
	getFriendshipFromUser1Username: (userId, friendId) => {
		const friendship = getFriendshipByUser1UsernameStmt.get(friendId, userId);
		if (!friendship) {
			throw { status: statusCode.NOT_FOUND, message: returnMessages.FRIENDSHIP_NOT_FOUND };
		}
		return friendship;
	},
	acceptFriendRequest: (friendshipId) => {
		acceptFriendRequestStmt.run(friendshipId);
	},
	declineFriendRequest: (friendshipId) => {
		declineFriendRequestStmt.run(friendshipId);
	},
	getFriendsRequests: (userId) => {
		const friendRequestsList = getFriendsRequestsStmt.all(userId);
		if (friendRequestsList.length === 0) {
			throw { status: statusCode.NOT_FOUND, message: returnMessages.FRIEND_REQUEST_NOT_FOUND };
		}
		return friendRequestsList;
	},
	isFriendshipExisting: (userId1, userId2) => {
		const friendship = isFriendshipExistingStmt.get(userId1, userId2, userId2, userId1);
		return friendship;
	},
	deleteFriendship: (friendshipId) => {
		deleteFriendshipStmt.run(friendshipId);
	},
	blockUser: (userId, blockedUserId) => {
		blockUserStmt.run(userId, blockedUserId);
	},
	isBlocked: (userId, blockedUserId) => {
		const blockedUser = isBlockedStmt.get(userId, blockedUserId);
		return blockedUser;
	},
	unblockUser: (userId, blockedUserId) => {
		unblockUserStmt.run(userId, blockedUserId);
	},
	getBlockedUsers: (userId) => {
		const blockedUsers = getBlockedUsersStmt.all(userId);
		if (blockedUsers.length === 0) {
			throw { status: statusCode.NOT_FOUND, message: returnMessages.NO_BLOCKED_USERS };
		}
		return blockedUsers;
	}
};

export default userService;