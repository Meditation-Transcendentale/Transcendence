import { statusCode, returnMessages } from "./returnValues.js";

const handleErrors = (fn) => async (req, res) => {
	try {
		await fn(req, res);
	} catch (error) {
		console.error(`Error in ${req.method} ${req.url}:`, error);
		const status = error.status || statusCode.INTERNAL_SERVER_ERROR;
		const message = error.message || returnMessages.INTERNAL_SERVER_ERROR;
		res.code(status).send({ message });
	}
};

export default handleErrors;