import { statusCode, returnMessages } from "./returnValues.mjs";

const handleErrorsValid = (fn) => async (req, res) => {
	try {
		await fn(req, res);
	} catch (error) {
		console.error(`Error in ${req.method} ${req.url}:`, error);
		const status = error.status || statusCode.BAD_REQUEST;
		const message = error.message || "Bad Request";
		const code = error.code || 400;
		const valid = error.valid || false;
		res.code(status).send({ message, valid, code });
	}
};

const handleErrors = (fn) => async (req, res) => {
	try {
		await fn(req, res);
	} catch (error) {
		console.error(`Error in ${req.method} ${req.url}:`, error);
		const status = error.status || statusCode.BAD_REQUEST;
		const message = error.message || "Bad Request";
		const code = error.code || 400;
		res.code(status).send({ message, code });
	}
};

const handleErrorsNats = (fn) => async (msg) => {
	try {
		await fn(msg);
	} catch (error) {
		console.error(`Error in NATS message:`, error);
		const status = error.status || statusCode.BAD_REQUEST;
		const message = error.message || "Bad Request";
		const code = error.code || 400;
		nats.publish(msg.reply, jc.encode({ status, message, code }));
	}
};

const handleErrors42 = (fn) => async (req, res) => {
	try {
		await fn(req, res);
	} catch (error) {
		console.error(`Error in ${req.method} ${req.url}:`, error);
		const status = error.status || statusCode.BAD_REQUEST;
		const message = error.message || "Bad Request";
		const code = error.code || 400;
		res.header("Content-Type", "text/html");
		res.send(`
			<!DOCTYPE html>
			<html>
				<head><title>Connexion 42</title></head>
				<body>
				<script>
					window.opener.postMessage({ type: "ft_login_error", status: ${status}, message: "${message}", code: ${code} }, "*");
					window.close();
				</script>
				</body>
			</html>
		`);
	}
};

export { handleErrors, handleErrorsValid, handleErrorsNats, handleErrors42 };