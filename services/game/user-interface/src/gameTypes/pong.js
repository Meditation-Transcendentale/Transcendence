// src/gameTypes/pong.js
import { JSONCodec } from 'nats';
import { decodeStateUpdate, encodeStateUpdate } from '../binary.js';

const jc = JSONCodec();

export class Handler {
	constructor() {
		this.inputSubject = 'game.input.pong';
		this.updateSubject = 'game.update.pong';
	}

	decodeUpdate(rawBytes) {
		// your existing binary decode:
		return decodeStateUpdate(rawBytes);
	}

	encodeInput({ gameId, playerId, input }) {
		// mirror your old nc.publish payload
		return jc.encode({ ...input, gameId, playerId });
	}

	normalizeUiEvent(rawEvent) {
		// rawEvent: { type: 'paddleUpdate', data: {...} }
		if (rawEvent.type !== 'paddleUpdate') {
			throw new Error('unsupported event');
		}
		return { type: 'paddleUpdate', input: rawEvent.data };
	}
}

