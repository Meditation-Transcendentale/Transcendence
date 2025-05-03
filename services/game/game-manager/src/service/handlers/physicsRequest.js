// services/natsRequests.js
import natsClient from './natsClient.js';
import {
	encodePhysicsRequest,
	decodePhysicsResponse
} from '../schema/message.js';

export async function physicsRequest(mode, gameId, inputs, lastState, opts = {}) {
	const subject = `games.${mode}.${gameId}.physics.request`;

	const reqBuf = encodePhysicsRequest({ gameId, inputs, lastState });

	const msg = await natsClient.request(subject, reqBuf, opts);

	const resp = decodePhysicsResponse(msg.data);
	if (resp.error) throw new Error(resp.error);

	return resp.newState;
}
