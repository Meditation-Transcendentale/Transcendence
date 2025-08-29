import dotenv from 'dotenv';
import { connect, JSONCodec } from 'nats';

import { statusCode, returnMessages } from "../../shared/returnValues.mjs";
import { handleErrors } from "../../shared/handleErrors.mjs";
import { natsRequest } from '../../shared/natsRequest.mjs';

dotenv.config({ path: "../../../.env" });

const nats = await connect({ 
	servers: process.env.NATS_URL,
	token: process.env.NATS_TOKEN,
	tls: { rejectUnauthorized: false }
});
const jc = JSONCodec();

const statusRoutes = (app) => {
	app.post('/add-user-status', handleErrors(async (req, res) => {

		const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

		const existingStatus = await natsRequest(nats, jc, 'user.getUserStatus', { userId: user.id });
		if (existingStatus) {
			throw { status: statusCode.BAD_REQUEST, message: returnMessages.STATUS_ALREADY_EXISTS };
		}

		await natsRequest(nats, jc, 'status.addUserStatus', { userId: user.id, status: "registered" });

		res.code(statusCode.CREATED).send({ message: returnMessages.STATUS_ADDED });
	}));

	app.patch('/update-status', handleErrors(async (req, res) => {

		if (!req.body) {
			throw { status: statusCode.BAD_REQUEST, message: returnMessages.NOTHING_TO_UPDATE };
		}

		const { status, lobby_gameId } = req.body;

		if (!status && !lobby_gameId) {
			throw { status: statusCode.BAD_REQUEST, message: returnMessages.NOTHING_TO_UPDATE };
		}

		const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

		const existingStatus = await natsRequest(nats, jc, 'user.getUserStatus', { userId: user.id });
		if (!existingStatus) {
			throw { status: statusCode.BAD_REQUEST, message: returnMessages.STATUS_NOT_FOUND };
		}

		await natsRequest(nats, jc, 'status.updateUserStatus', { userId: user.id, status: req.body.status, lobby_gameId: req.body.lobby_gameId });

		res.code(statusCode.SUCCESS).send({ message: returnMessages.STATUS_UPDATED });
	}));
};

export { statusRoutes };