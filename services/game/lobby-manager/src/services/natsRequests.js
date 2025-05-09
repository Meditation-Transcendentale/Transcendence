// services/natsRequests.js
import natsClient from '../natsClient.js';
import * as protobuf from '../message.js';  // your generated file
export async function requestNewMatch(mode, players = [], options = {}, opts = {}) {
	const subject = `games.${mode}.match.create`;

	// 1) Build the Protobuf request
	const reqBuffer = protobuf.encodeMatchCreateRequest({ mode, players, options });
	const resp1 = protobuf.decodeMatchCreateResponse(reqBuffer);

	console.log(resp1);
	// 2) Send it as a NATS req/rep
	const msg = await natsClient.request(subject, reqBuffer, { timeout: 5_000 });

	// 3) Decode the Protobuf response
	const resp = protobuf.decodeMatchCreateResponse(msg.data);
	console.log(resp);
	if (resp.error && resp.error.length) {
		throw new Error(resp.error);
	}
	return resp.gameId;
}

