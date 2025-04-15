import Fastify from "fastify";
import dotenv from "dotenv";
import fs from "fs";
import bcrypt from "bcrypt";
import axios from "axios";
import https from "https";

import { twoFARoutes } from "./2FA.js";
import addFriendRoute from "./friendship.js";
import { statusCode, returnMessages } from "./returnValues.js";
import handleErrors from "./handleErrors.js";
import userService from "./userService.js";

dotenv.config({ path: "../../../../.env" });

const app = Fastify({
	logger: true,
	https: {
		key: fs.readFileSync(process.env.SSL_KEY),
		cert: fs.readFileSync(process.env.SSL_CERT)
	}
});

const verifyApiKey = (req, res, done) => {
	const apiKey = req.headers['x-api-key'];
	if (apiKey !== process.env.API_GATEWAY_KEY) {
		return res.code(statusCode.UNAUTHORIZED).send({ message: returnMessages.UNAUTHORIZED });
	}
	done();
}

app.addHook('onRequest', verifyApiKey);

app.patch('/', handleErrors(async (req, res) => {

	const user = userService.getUserFromHeader(req);
		
	if (!req.body) {
		throw { status: statusCode.BAD_REQUEST, message: returnMessages.NOTHING_TO_UPDATE };
	}

	const { username, avatar,} = req.body;

	if (username) {
		userService.updateUsername(username, user.id);
	}

	if (avatar) {
		userService.updateAvatar(avatar, user.id);
	}

	res.code(statusCode.SUCCESS).send({ message: returnMessages.INFO_UPDATED });

}));

app.patch('/password', handleErrors(async (req, res) => {

	const user = userService.getUserFromHeader(req);

	if (!req.body) {
		throw { status: statusCode.BAD_REQUEST, message: returnMessages.NOTHING_TO_UPDATE };
	}

	const { password, newPassword, token } = req.body;

	if (!password) {
		throw { status: statusCode.BAD_REQUEST, message: returnMessages.PASSWORD_REQUIRED };
	}
	
	if (!newPassword) {
		throw { status: statusCode.BAD_REQUEST, message: returnMessages.NEW_PASSWORD_REQUIRED };
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		throw { status: statusCode.UNAUTHORIZED, message: returnMessages.BAD_PASSWORD };
	}

	if (user.two_fa_enabled) {

		const agent = new https.Agent({
			rejectUnauthorized: false
		});
		if (!token) {
			throw { status: statusCode.BAD_REQUEST, message: returnMessages.MISSING_TOKEN };
		}

		try {
			const response = await axios.post('https://update_user_info-service:4003/verify-2fa', { token }, { headers: {'user': JSON.stringify({ id: user.id }), 'x-api-key': process.env.API_GATEWAY_KEY } , httpsAgent: agent });
			if (response.data.valid == false) {
				throw { status: statusCode.UNAUTHORIZED, message: response.data.message };
			}
		} catch (error) {
			throw { status: statusCode.UNAUTHORIZED, message: error.response.data.message };
		}
	}

	const hashedPassword = await bcrypt.hash(newPassword, 10);

	userService.updatePassword(hashedPassword, user.id);

	res.code(statusCode.SUCCESS).send({ message: returnMessages.PASSWORD_UPDATED });

}));

addFriendRoute(app);
twoFARoutes(app);

const start = async () => {
	try {
		await app.listen({ port: 4003, host: '0.0.0.0' });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();






