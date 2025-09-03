import dotenv from 'dotenv';
import { connect, JSONCodec } from 'nats';

import { statusCode, returnMessages, statusReturn, userReturn } from "../../shared/returnValues.mjs";
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

	app.patch('/update-status', handleErrors(async (req, res) => {

		if (!req.body) {
			throw { status: userReturn.USER_021.http, code: userReturn.USER_021.code, message: userReturn.USER_021.message };
		}

		let { status, lobby_gameId } = req.body;

		if (!status && !lobby_gameId) {
			throw { status: userReturn.USER_021.http, code: userReturn.USER_021.code, message: userReturn.USER_021.message };
		}

		const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });

		const existingStatus = await natsRequest(nats, jc, 'user.getUserStatus', { userId: user.id });
		if (!existingStatus) {
			throw { status: statusReturn.STATUS_006.http, code: statusReturn.STATUS_006.code, message: statusReturn.STATUS_006.message };
		}

		if (!status) {
			status = existingStatus.status;
		}
		if (!lobby_gameId) {
			lobby_gameId = existingStatus.lobby_gameId;
		}

		await natsRequest(nats, jc, 'status.updateUserStatus', { userId: user.id, status, lobby_gameId });

		res.code(statusCode.SUCCESS).send({ message: returnMessages.STATUS_UPDATED });
	}));

	app.patch('/clear-game-id', handleErrors(async (req, res) => {

		const user = await natsRequest(nats, jc, 'user.getUserFromHeader', { headers: req.headers });
		
		const existingStatus = await natsRequest(nats, jc, 'user.getUserStatus', { userId: user.id });
		if (!existingStatus) {
			throw { status: statusReturn.STATUS_006.http, code: statusReturn.STATUS_006.code, message: statusReturn.STATUS_006.message };
		}

		await natsRequest(nats, jc, 'status.updateUserStatus', { userId: user.id, status: existingStatus.status, lobby_gameId: null });

		res.code(statusCode.SUCCESS).send({ message: returnMessages.STATUS_UPDATED });
	}));
};

export { statusRoutes };