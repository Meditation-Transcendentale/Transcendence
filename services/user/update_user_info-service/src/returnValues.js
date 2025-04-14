const statusCode = {
	SUCCESS: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
	CONFLICT: 409,
	INTERNAL_SERVER_ERROR: 500,
};

const returnMessages = {
	USER_NOT_FOUND: 'User not found',
	FRIENDSHIP_NOT_FOUND: 'Friendship not found',
	FRIEND_REQUEST_NOT_FOUND: 'Friend request not found',
	UNAUTHORIZED: 'Unauthorized',
	INTERNAL_SERVER_ERROR: 'Internal server error',
	USERNAME_REQUIRED: 'Player username is required',
	FRIEND_REQUEST_SENT: 'Friend request sent',
	FRIEND_REQUEST_ACCEPTED: 'Friend request accepted',
	FRIEND_REQUEST_DECLINED: 'Friend request declined',
	AUTO_FRIEND_REQUEST: 'You cannot add yourself as a friend',
	AUTO_DELETE_REQUEST: 'You cannot delete yourself as a friend',
	AUTO_DECLINE_REQUEST: 'You cannot decline yourself as a friend',
	AUTO_BLOCK_REQUEST: 'You cannot block yourself',
	AUTO_UNBLOCK_REQUEST: 'You cannot unblock yourself',
	FRIEND_DELETED: 'Friendship deleted',
	ALREADY_FRIEND: 'You are already friends with this user',
	ALREADY_FRIEND_REQUEST: 'Friend request already sent',
	ALREADY_RECEIVED: 'This user has already sent you a friend request',
	ALREADY_BLOCKED: 'You have already blocked this user',
	USER_BLOCKED: 'User blocked',
	USER_BLOCKED_SUCCESS: 'User blocked successfully',
	USER_BLOCKED_YOU: 'This user has blocked you',
	USER_UNBLOCKED: 'User unblocked successfully',
	NOT_BLOCKED: 'You cannot unblock a user that you have not blocked',
	ADD_BLOCKED_USER: 'You cannot add a blocked user as a friend',
	NO_BLOCKED_USERS: 'You have no blocked users',
	NOTHING_TO_UPDATE: 'Nothing to update',
	INFO_UPDATED: 'User info updated',
	PASSWORD_UPDATED: 'Password updated successfully',
	PASSWORD_REQUIRED: 'Password is required',
	NEW_PASSWORD_REQUIRED: 'New password is required',
	BAD_PASSWORD: 'Invalid password',
	MISSING_TOKEN: 'Token is required',
	TWO_FA_ALREADY_ENABLED: '2FA is already enabled',
	TWO_FA_ENABLED: '2FA is enabled',
	TWO_FA_NOT_ENABLED: '2FA is not enabled',
	TWO_FA_VERIFIED: '2FA verified',
	INVALID_CODE: 'Invalid code',

}

export { statusCode, returnMessages };