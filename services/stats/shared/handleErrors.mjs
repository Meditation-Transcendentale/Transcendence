import { statusCode, returnMessages } from "./returnValues.mjs";

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

const handleErrorsNats = (fn) => async (msg) => {
	try {
		await fn(msg);
	} catch (error) {
		console.error(`Error in NATS message:`, error);
		const status = error.status || statusCode.INTERNAL_SERVER_ERROR;
		const message = error.message || returnMessages.INTERNAL_SERVER_ERROR;
		nats.publish(msg.reply, jc.encode({ status, message }));
	}
};

export { handleErrors, handleErrorsNats };