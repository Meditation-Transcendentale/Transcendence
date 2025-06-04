// services/user-interface/src/proto/helpers.ts

import * as Proto from './message.js';
import type { userinterface, shared } from './message.js';

/**
 * ----------------------------
 * Game Client Helpers (TypeScript)
 * ----------------------------
 * This file provides strongly‐typed encode/decode functions
 * for all messages defined in `user_interface.proto` (package “userinterface”)
 * and `shared.proto` (for MatchState).
 */

/**
 * ClientMessage (Client → Server)
 */
export function encodeClientMessage(
	payload: userinterface.IClientMessage
): Uint8Array {
	const err = Proto.userinterface.ClientMessage.verify(payload);
	if (err) throw new Error(err);
	return Proto.userinterface.ClientMessage
		.encode(Proto.userinterface.ClientMessage.create(payload))
		.finish();
}

export function decodeClientMessage(
	buffer: Uint8Array
): userinterface.ClientMessage {
	return Proto.userinterface.ClientMessage.decode(buffer);
}

/**
 * WelcomeMessage (Server → Client)
 */
export function encodeWelcomeMessage(
	payload: userinterface.IWelcomeMessage
): Uint8Array {
	const err = Proto.userinterface.WelcomeMessage.verify(payload);
	if (err) throw new Error(err);
	return Proto.userinterface.WelcomeMessage
		.encode(Proto.userinterface.WelcomeMessage.create(payload))
		.finish();
}

/**
 * GameStartMessage (Server → Client)
 */
export function encodeGameStartMessage(
	payload: userinterface.IGameStartMessage
): Uint8Array {
	const err = Proto.userinterface.GameStartMessage.verify(payload);
	if (err) throw new Error(err);
	return Proto.userinterface.GameStartMessage
		.encode(Proto.userinterface.GameStartMessage.create(payload))
		.finish();
}

/**
 * GameEndMessage (Server → Client)
 */
export function encodeGameEndMessage(
	payload: userinterface.IGameEndMessage
): Uint8Array {
	const err = Proto.userinterface.GameEndMessage.verify(payload);
	if (err) throw new Error(err);
	return Proto.userinterface.GameEndMessage
		.encode(Proto.userinterface.GameEndMessage.create(payload))
		.finish();
}

/**
 * ServerMessage (Server → Client)
 */
export function encodeServerMessage(
	payload: userinterface.IServerMessage
): Uint8Array {
	const err = Proto.userinterface.ServerMessage.verify(payload);
	if (err) throw new Error(err);
	return Proto.userinterface.ServerMessage
		.encode(Proto.userinterface.ServerMessage.create(payload))
		.finish();
}

export function decodeServerMessage(
	buffer: Uint8Array
): userinterface.ServerMessage {
	return Proto.userinterface.ServerMessage.decode(buffer);
}

/**
 * StateMessage (NATS or WebSocket → update UI)
 *
 * Note: The buffer contains a bare shared.MatchState, so we decode as MatchState.
 */
export function decodeStateMessage(
	buffer: Uint8Array
): shared.MatchState {
	return Proto.shared.MatchState.decode(buffer);
}

/**
 * Match lifecycle over NATS
 */
export function decodeMatchSetup(
	buffer: Uint8Array
): userinterface.MatchSetup {
	return Proto.userinterface.MatchSetup.decode(buffer);
}

export function encodeMatchInput(
	payload: userinterface.IMatchInput
): Uint8Array {
	const err = Proto.userinterface.MatchInput.verify(payload);
	if (err) throw new Error(err);
	return Proto.userinterface.MatchInput
		.encode(Proto.userinterface.MatchInput.create(payload))
		.finish();
}

export function encodeMatchQuit(
	payload: userinterface.IMatchQuit
): Uint8Array {
	const err = Proto.userinterface.MatchQuit.verify(payload);
	if (err) throw new Error(err);
	return Proto.userinterface.MatchQuit
		.encode(Proto.userinterface.MatchQuit.create(payload))
		.finish();
}

export function encodeMatchStart(
	payload: userinterface.IMatchStart
): Uint8Array {
	const err = Proto.userinterface.MatchStart.verify(payload);
	if (err) throw new Error(err);
	return Proto.userinterface.MatchStart
		.encode(Proto.userinterface.MatchStart.create(payload))
		.finish();
}

export function decodeMatchEnd(
	buffer: Uint8Array
): userinterface.MatchEnd {
	return Proto.userinterface.MatchEnd.decode(buffer);
}

