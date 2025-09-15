import Database from 'better-sqlite3';
import { statusCode, returnMessages, userReturn, friendshipReturn, statusReturn } from "../../shared/returnValues.mjs";

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
const getAvatarFromUsernameStmt = database.prepare("SELECT avatar_path FROM users WHERE username = ?");
const getAvatarFromUUIDStmt = database.prepare("SELECT avatar_path FROM users WHERE uuid = ?");
const getUserForFriendResearchStmt = database.prepare("SELECT username FROM users WHERE username = ?");
const getAllUsersStmt = database.prepare("SELECT * FROM users");
const getUserStatusStmt = database.prepare("SELECT status, lobby_gameId FROM active_user WHERE user_id = ?");
const addUserStatusStmt = database.prepare("INSERT INTO active_user (user_id, status) VALUES (?, ?)");
const updateStatusStmt = database.prepare("UPDATE active_user SET status = ?, lobby_gameId = ? WHERE user_id = ?");
const getBlockedUsersStmt = database.prepare(`
	SELECT bu.id, u1.username AS blocker_username, u2.username AS blocked_username 
	FROM blocked_users bu
	JOIN users u1 ON bu.blocker_id = u1.id
	JOIN users u2 ON bu.blocked_id = u2.id
	WHERE bu.blocker_id = ?`);
const getFriendsRequestsStmt = database.prepare(`
	SELECT f.id, u1.username AS sender_username, u2.username AS receiver_username, u1.uuid AS sender_uuid, u2.uuid AS receiver_uuid
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
			throw { status: userReturn.USER_001.http, code: userReturn.USER_001.code, message: userReturn.USER_001.message };
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
			throw { status: userReturn.USER_002.http, code: userReturn.USER_002.code, message: userReturn.USER_002.message };
		}
	},
	registerUser: (uuid, username, hashedPassword) => {
		registerUserStmt.run(uuid, username, hashedPassword);
	},
	getUserFromId: (id) => {
		const user = getUserByIdStmt.get(id);
		if (!user) {
			throw { status: userReturn.USER_001.http, code: userReturn.USER_001.code, message: userReturn.USER_001.message };
		}
		return user;
	},
	getUserFromUUID: (uuid) => {
		const user = getUserFromUUIDStmt.get(uuid);
		if (!user) {
			throw { status: userReturn.USER_001.http, code: userReturn.USER_001.code, message: userReturn.USER_001.message };
		}
		return user;
	},
	getUserFromHeader: (headers) => {
		const userHeader = headers['user'];
		if (!userHeader) {
			throw { status : statusCode.UNAUTHORIZED, code: 401, message: returnMessages.UNAUTHORIZED };
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
			throw { status: friendshipReturn.FRIEND_001.http, code: friendshipReturn.FRIEND_001.code, message: friendshipReturn.FRIEND_001.message };
		}
		return friendship;
	},
	getFriendshipFromUser1Username: (userId, friendId) => {
		const friendship = getFriendshipByUser1UsernameStmt.get(friendId, userId);
		if (!friendship) {
			throw { status: friendshipReturn.FRIEND_001.http, code: friendshipReturn.FRIEND_001.code, message: friendshipReturn.FRIEND_001.message };
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
			throw { status: friendshipReturn.FRIEND_002.http, code: friendshipReturn.FRIEND_002.code, message: friendshipReturn.FRIEND_002.message };
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
			throw { status: friendshipReturn.FRIEND_019.http, code: friendshipReturn.FRIEND_019.code, message: friendshipReturn.FRIEND_019.message };
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
			throw { status: userReturn.USER_001.http, code: userReturn.USER_001.code, message: userReturn.USER_001.message };
		}
		return userInfo;
	},
	getFriendlist: (userId) => {
		const friendlist = getFriendlistStmt.all(userId, userId, userId, userId);
		if (friendlist.length === 0) {
			throw { status: friendshipReturn.FRIEND_020.http, code: friendshipReturn.FRIEND_020.code, message: friendshipReturn.FRIEND_020.message };
		}
		return friendlist;
	},
	getUserForFriendResearch: (username) => {
		const user = getUserForFriendResearchStmt.get(username);
		if (!user) {
			throw { status: userReturn.USER_001.http, code: userReturn.USER_001.code, message: userReturn.USER_001.message };
		}
		return user;
	},
	getUserStatus: (userId) => {
		const status = getUserStatusStmt.get(userId);
		// if (!status) {
		// 	throw { status: statusCode.NOT_FOUND, message: returnMessages.PLAYER_INACTIVE };
		// }
		return status;
	},
	getAllUsers: () => {
		const users = getAllUsersStmt.all();
		if (users.length === 0) {
			throw { status: statusCode.NOT_FOUND, message: returnMessages.NO_USERS_FOUND };
		}
		return users;
	},
	addUserStatus: (userId, status) => {
		const validStatuses = ['online', 'offline', 'in_lobby', 'in_game', 'in_tournament'];
		if (!validStatuses.includes(status)) {
			throw { status: statusReturn.STATUS_003.http, code: statusReturn.STATUS_003.code, message: statusReturn.STATUS_003.message };
		}
		addUserStatusStmt.run(userId, status);
	},
	updateStatus: (userId, status, lobby_gameId) => {
		const validStatuses = ['online', 'offline', 'in_lobby', 'in_game', 'in_tournament'];
		if (status && !validStatuses.includes(status)) {
			throw { status: statusReturn.STATUS_003.http, code: statusReturn.STATUS_003.code, message: statusReturn.STATUS_003.message };
		}
		updateStatusStmt.run(status, lobby_gameId, userId);
	},
	getAvatarFromUsername: (username) => {
		const avatar = getAvatarFromUsernameStmt.get(username);
		if (!avatar) {
			throw { status: userReturn.USER_001.http, code: userReturn.USER_001.code, message: userReturn.USER_001.message };
		}
		return avatar;
	},
	getAvatarFromUUID: (uuid) => {
		const avatar = getAvatarFromUUIDStmt.get(uuid);
		if (!avatar) {
			throw { status: userReturn.USER_001.http, code: userReturn.USER_001.code, message: userReturn.USER_001.message };
		}
		return avatar;
	}

};

export default userService;