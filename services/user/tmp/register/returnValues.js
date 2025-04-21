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

	USERNAME_ALREADY_USED: 'Username is already in use',
	USERNAME_PASSWORD_REQUIRED: 'Username and password are required',
	USERNAME_INVALID: 'Username must be between 3 and 20 characters',
	PASSWORD_INVALID: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number',
	USER_CREATED: 'User registered successfully',
	INTERNAL_SERVER_ERROR: 'Internal server error',
	UNAUTHORIZED: 'Unauthorized',

}

export { statusCode, returnMessages };