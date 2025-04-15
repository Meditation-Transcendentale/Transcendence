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
	UNAUTHORIZED: 'Unauthorized',
	INTERNAL_SERVER_ERROR: 'Internal server error',
	
	
}

export { statusCode, returnMessages };