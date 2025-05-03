// services/handlers/matchInput.js
import { decodeMatchCreateRequest, encodeMatchCreateResponse } from '../schema/message.js';
import gameManager from './gameManager.js';

export const subject = 'games.*.*.match.input';

/**
 * @param {import('nats').Msg} msg
 * @param {import('nats').NatsConnection} nc
 */
export async function handle(msg, nc) {
	const [, mode] = msg.subject.split('.');

	let req;
	try {
		req = decodeMatchCreateRequest(msg.data);
	} catch {
		return msg.respond(
			encodeMatchCreateResponse({ gameId: '', error: 'invalid request' })
		);
	}

	let resp;
	try {
		const gameId = gameManager.createMatch({
			mode,
			players: req.players,
			options: req.options
		});
		resp = { gameId, error: '' };
	} catch (err) {
		resp = { gameId: '', error: err.message };
	}

	msg.respond(encodeMatchCreateResponse(resp));
}

