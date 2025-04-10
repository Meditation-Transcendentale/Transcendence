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
	FRIEND_DELETED: 'Friendship deleted',

}

export { statusCode, returnMessages };