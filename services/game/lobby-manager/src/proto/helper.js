import * as Proto from './message.js';

/**
 * ClientMessage (Client → Server: Quit / Ready)
 */
export function encodeClientMessage(payload) {
	const err = Proto.lobby.ClientMessage.verify(payload);
	if (err) throw new Error(err);
	return Proto.lobby.ClientMessage
		.encode(Proto.lobby.ClientMessage.create(payload))
		.finish();
}

export function decodeClientMessage(buffer) {
	return Proto.lobby.ClientMessage.decode(buffer);
}

/**
 * ServerMessage (Server → Client: Start / Update / Error)
 */
export function encodeServerMessage(payload) {
	const err = Proto.lobby.ServerMessage.verify(payload);
	if (err) throw new Error(err);
	return Proto.lobby.ServerMessage
		.encode(Proto.lobby.ServerMessage.create(payload))
		.finish();
}

export function decodeServerMessage(buffer) {
	return Proto.lobby.ServerMessage.decode(buffer);
}

/**
 * UserStatus (NATS publish)
 */
export function encodeUserStatus(payload) {
	const err = Proto.lobby.UserStatus.verify(payload);
	if (err) throw new Error(err);
	return Proto.lobby.UserStatus
		.encode(Proto.lobby.UserStatus.create(payload))
		.finish();
}

export function decodeUserStatus(buffer) {
	return Proto.lobby.UserStatus.decode(buffer);
}

/**
 * MatchCreateRequest / MatchCreateResponse (NATS)
 */
export function encodeMatchCreateRequest(payload) {
	const err = Proto.lobby.MatchCreateRequest.verify(payload);
	if (err) throw new Error(err);
	return Proto.lobby.MatchCreateRequest
		.encode(Proto.lobby.MatchCreateRequest.create(payload))
		.finish();
}

export function decodeMatchCreateResponse(buffer) {
	return Proto.lobby.MatchCreateResponse.decode(buffer);
}

