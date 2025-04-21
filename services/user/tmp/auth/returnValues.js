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

	BAD_PASSWORD: 'Invalid password',
	MISSING_TOKEN: 'Token is required',
	LOGGED_IN: 'Logged in successfully',
	GOOGLE_LOGGED_IN: 'Logged in with Google successfully',
	GOOGLE_CREATED_LOGGED_IN: 'Registered and logged in with Google successfully',
	LOGGED_OUT: 'Logged out successfully',
	UNAUTHORIZED: 'Unauthorized',
	INTERNAL_SERVER_ERROR: 'Internal server error',
	USER_NOT_FOUND: 'User not found'

}

export { statusCode, returnMessages };