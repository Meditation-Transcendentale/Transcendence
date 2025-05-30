import Database from 'better-sqlite3';
import { statusCode, returnMessages } from "../../shared/returnValues.mjs";

const database = new Database(process.env.DATABASE_URL, {fileMustExist: true });
database.pragma("journal_mode=WAL");

const getUserByUsernameStmt = database.prepare("SELECT * FROM users WHERE username = ?");
const addGoogleUserStmt = database.prepare("INSERT INTO users (uuid, provider, google_id, username, avatar_path) VALUES (?, ?, ?, ?, ?)");
const add42UserStmt = database.prepare("INSERT INTO users (uuid, provider, username, avatar_path) VALUES (?, ?, ?, ?)");
const checkUsernameAvailabilityStmt = database.prepare("SELECT * FROM users WHERE username = ?");
const registerUserStmt = database.prepare("INSERT INTO users (uuid, username, password) VALUES (?, ?, ?)");
const getUserByIdStmt = database.prepare("SELECT * FROM users WHERE id = ?");
const addFriendRequestStmt = database.prepare("INSERT INTO friendslist (user_id_1, user_id_2) VALUES (?, ?)");
const getFriendshipByIdStmt = database.prepare("SELECT * FROM friendslist WHERE id = ?");
const getFriendshipByUser1UsernameStmt = database.prepare("SELECT * FROM friendslist WHERE user_id_1 = ? AND user_id_2 = ?");
const acceptFriendRequestStmt = database.prepare("UPDATE friendslist SET status = 'accepted' WHERE id = ?");
const declineFriendRequestStmt = database.prepare("DELETE FROM friendslist WHERE id = ?");
const isFriendshipExistingStmt = database.prepare("SELECT * FROM friendslist WHERE (user_id_1 = ? AND user_id_2 = ?) OR (user_id_1 = ? AND user_id_2 = ?)");
const deleteFriendshipStmt = database.prepare("DELETE FROM friendslist WHERE id = ?");
const deleteFriendshipByUserIdStmt = database.prepare("DELETE FROM friendslist WHERE (user_id_1 = ? AND user_id_2 = ?) OR (user_id_1 = ? AND user_id_2 = ?)");
const blockUserStmt = database.prepare("INSERT INTO blocked_users (blocker_id, blocked_id) VALUES (?, ?)");
const isBlockedStmt = database.prepare("SELECT * FROM blocked_users WHERE blocker_id = ? AND blocked_id = ?");
const unblockUserStmt = database.prepare("DELETE FROM blocked_users WHERE blocker_id = ? AND blocked_id = ?");
const updateUsernameStmt = database.prepare("UPDATE users SET username = ? WHERE id = ?");
const updateAvatarStmt = database.prepare("UPDATE users SET avatar_path = ? WHERE id = ?");
const updatePasswordStmt = database.prepare("UPDATE users SET password = ? WHERE id = ?");
const enable2FAStmt = database.prepare("UPDATE users SET two_fa_secret = ?, two_fa_enabled = ? WHERE id = ?");
const getUserInfoStmt = database.prepare("SELECT uuid, username, avatar_path, two_fa_enabled FROM users WHERE id = ?");
const getUserFromUUIDStmt = database.prepare("SELECT * FROM users WHERE uuid = ?");
const getUserForFriendResearchStmt = database.prepare("SELECT username FROM users WHERE username = ?");
const getUserStatusStmt = database.prepare("SELECT status FROM active_user WHERE user_id = ?");
const getBlockedUsersStmt = database.prepare(`
	SELECT bu.id, u1.username AS blocker_username, u2.username AS blocked_username 
	FROM blocked_users bu
	JOIN users u1 ON bu.blocker_id = u1.id
	JOIN users u2 ON bu.blocked_id = u2.id
	WHERE bu.blocker_id = ?`);
const getFriendsRequestsStmt = database.prepare(`
	SELECT f.id, u1.username AS sender_username, u2.username AS receiver_username
	FROM friendslist f
	JOIN users u1 ON f.user_id_1 = u1.id
	JOIN users u2 ON f.user_id_2 = u2.id
	WHERE f.user_id_2 = ? 
		AND status = 'pending'`);
const getFriendlistStmt = database.prepare(`
	SELECT 
		f.id, 
		CASE 
			WHEN f.user_id_1 = ? THEN u2.username
			ELSE u1.username
		END AS friend_username,
		CASE
			WHEN f.user_id_1 = ? THEN u2.uuid
			ELSE u1.uuid
		END AS friend_uuid
	FROM friendslist f
	JOIN users u1 ON f.user_id_1 = u1.id
	JOIN users u2 ON f.user_id_2 = u2.id
	WHERE (f.user_id_1 = ? OR f.user_id_2 = ?) 
		AND status = 'accepted'`
);


const userService = {
	getUserFromUsername: (username) => {
		const user = getUserByUsernameStmt.get(username);
		if (!user) {
			throw { status: statusCode.NOT_FOUND, message: returnMessages.USER_NOT_FOUND };
		}
		return user;
	},
	checkUserExists: (username) => {
		const user = getUserByUsernameStmt.get(username);
		return user;
	},
	addGoogleUser: (uuid, googleId, username, avatarPath) => {
		addGoogleUserStmt.run(uuid, 'google', googleId, username, avatarPath);
	},
	add42User: (uuid, username, avatarPath) => {
		add42UserStmt.run(uuid, '42', username, avatarPath);
	},
	checkUsernameAvailability: (username) => {
		const user = checkUsernameAvailabilityStmt.get(username);
		if (user) {
			throw { status: statusCode.CONFLICT, message: returnMessages.USERNAME_ALREADY_USED };
		}
	},
	registerUser: (uuid, username, hashedPassword) => {
		registerUserStmt.run(uuid, username, hashedPassword);
	},
	getUserFromId: (id) => {
		const user = getUserByIdStmt.get(id);
		if (!user) {
			throw { status: statusCode.NOT_FOUND, message: returnMessages.USER_NOT_FOUND };
		}
		return user;
	},
	getUserFromUUID: (uuid) => {
		const user = getUserFromUUIDStmt.get(uuid);
		if (!user) {
			throw { status: statusCode.NOT_FOUND, message: returnMessages.USER_NOT_FOUND };
		}
		return user;
	},
	getUserFromHeader: (headers) => {
		const userHeader = headers['user'];
		if (!userHeader) {
			throw { status : statusCode.BAD_REQUEST, message: returnMessages.UNAUTHORIZED };
		}
		const userToken = JSON.parse(userHeader);
		const user = userService.getUserFromUUID(userToken.uuid);
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
	deleteFriendshipByUserId: (userId1, userId2) => {
		deleteFriendshipByUserIdStmt.run(userId1, userId2, userId2, userId1);
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
	},
	updateUsername: (username, userId) => {
		updateUsernameStmt.run(username, userId);
	},
	updateAvatar: (avatar, userId) => {
		updateAvatarStmt.run(avatar, userId);
	},
	updatePassword: (hashedPassword, userId) => {
		updatePasswordStmt.run(hashedPassword, userId);
	},
	enable2FA: (secret, userId) => {
		enable2FAStmt.run(JSON.stringify(secret), 1, userId);
	},
	disable2FA: (userId) => {
		enable2FAStmt.run(null, 0, userId);
	},
	getUserInfo: (userId) => {
		const userInfo = getUserInfoStmt.get(userId);
		if (!userInfo) {
			throw { status: statusCode.NOT_FOUND, message: returnMessages.USER_NOT_FOUND };
		}
		return userInfo;
	},
	getFriendlist: (userId) => {
		const friendlist = getFriendlistStmt.all(userId, userId, userId, userId);
		if (friendlist.length === 0) {
			throw { status: statusCode.NOT_FOUND, message: returnMessages.FRIENDLIST_NOT_FOUND };
		}
		return friendlist;
	},
	getUserForFriendResearch: (username) => {
		const user = getUserForFriendResearchStmt.get(username);
		if (!user) {
			throw { status: statusCode.NOT_FOUND, message: returnMessages.USER_NOT_FOUND };
		}
		return user;
	},
	getUserStatus: (userId) => {
		const status = getUserStatusStmt.get(userId);
		if (!status) {
			throw { status: statusCode.NOT_FOUND, message: returnMessages.PLAYER_INACTIVE };
		}
		return status;
	}
};

export default userService;