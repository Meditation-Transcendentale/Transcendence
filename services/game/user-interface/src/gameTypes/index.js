// src/gameTypes/index.js
export class GameTypeHandler {
	/** NATS subject wildcard for inputs, e.g. "game.input.pong" */
	inputSubject;
	/** NATS subject wildcard for updates, e.g. "game.update.pong" */
	updateSubject;

	/** decode raw update → structured state */
	decodeUpdate(rawBytes) {
		throw new Error('must implement');
	}
	/** encode structured input → raw bytes */
	encodeInput(payload) {
		throw new Error('must implement');
	}
	/** normalize a raw UI event (type+data) → payload.input */
	normalizeUiEvent(rawEvent) {
		throw new Error('must implement');
	}
}

import * as Pong from './pong.js';
import * as PongBR from './pongBR.js';
import * as PongIO from './pongIO.js';

export const GameTypes = {
	pong: new Pong.Handler(),
	pongBR: new PongBR.Handler(),
	pongIO: new PongIO.Handler(),
};

