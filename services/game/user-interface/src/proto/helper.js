import * as Proto from './message.js';

/**
 * ClientMessage (Client → Server)
 */
export function encodeClientMessage(payload) {
	const err = Proto.userinterface.ClientMessage.verify(payload);
	if (err) throw new Error(err);
	return Proto.userinterface.ClientMessage
		.encode(Proto.userinterface.ClientMessage.create(payload))
		.finish();
}

export function decodeClientMessage(buffer) {
	return Proto.userinterface.ClientMessage.decode(buffer);
}

/**
 * WelcomeMessage (Server → Client)
 */
export function encodeWelcomeMessage(payload) {
	const err = Proto.userinterface.WelcomeMessage.verify(payload);
	if (err) throw new Error(err);
	return Proto.userinterface.WelcomeMessage
		.encode(Proto.userinterface.WelcomeMessage.create(payload))
		.finish();
}

/**
 * GameStartMessage (Server → Client)
 */
export function encodeGameStartMessage(payload) {
	const err = Proto.userinterface.GameStartMessage.verify(payload);
	if (err) throw new Error(err);
	return Proto.userinterface.GameStartMessage
		.encode(Proto.userinterface.GameStartMessage.create(payload))
		.finish();
}

/**
 * GameEndMessage (Server → Client)
 */
export function encodeGameEndMessage(payload) {
	const err = Proto.userinterface.GameEndMessage.verify(payload);
	if (err) throw new Error(err);
	return Proto.userinterface.GameEndMessage
		.encode(Proto.userinterface.GameEndMessage.create(payload))
		.finish();
}

/**
 * ServerMessage (Server → Client)
 */
export function encodeServerMessage(payload) {
	const err = Proto.userinterface.ServerMessage.verify(payload);
	if (err) throw new Error(err);
	return Proto.userinterface.ServerMessage
		.encode(Proto.userinterface.ServerMessage.create(payload))
		.finish();
}

export function decodeServerMessage(buffer) {
	return Proto.userinterface.ServerMessage.decode(buffer);
}

/**
 * StateMessage (NATS or WebSocket → update UI)
 */
export function decodeStateMessage(buffer) {
	return Proto.shared.MatchState.decode(buffer);
}

/**
 * Match lifecycle over NATS
 */
export function decodeMatchSetup(buffer) {
	return Proto.userinterface.MatchSetup.decode(buffer);
}

export function encodeMatchInput(payload) {
	const err = Proto.userinterface.MatchInput.verify(payload);
	if (err) throw new Error(err);
	return Proto.userinterface.MatchInput
		.encode(Proto.userinterface.MatchInput.create(payload))
		.finish();
}

export function encodeMatchQuit(payload) {
	const err = Proto.userinterface.MatchQuit.verify(payload);
	if (err) throw new Error(err);
	return Proto.userinterface.MatchQuit
		.encode(Proto.userinterface.MatchQuit.create(payload))
		.finish();
}

export function encodeMatchStart(payload) {
	const err = Proto.userinterface.MatchStart.verify(payload);
	if (err) throw new Error(err);
	return Proto.userinterface.MatchStart
		.encode(Proto.userinterface.MatchStart.create(payload))
		.finish();
}

export function decodeMatchEnd(buffer) {
	return Proto.userinterface.MatchEnd.decode(buffer);
}

export function encodeErrorMessage(payload) {
	const err = Proto.userinterface.ErrorMessage.verify(payload);
	if (err) throw new Error(err);
	return Proto.userinterface.ErrorMessage
		.encode(Proto.userinterface.ErrorMessage.create(payload))
		.finish();
}
