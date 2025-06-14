// services/user-interface/src/proto/lobby_helpers.ts

import * as Proto from './message.js';
import type { lobby } from './message';

/**
 * ----------------------------
 * Lobby Client ↔ Server Helpers
 * ----------------------------
 *
 * These functions allow the front‐end (UI) to encode/decode messages
 * defined in `lobby.proto` (package “lobby”), compiled into `message.js`.
 *
 * Lobby.proto defines:
 *   - lobby.ClientMessage      // client→server (Quit / Ready)
 *   - lobby.ServerMessage      // server→client (Start / Update / Error)
 *   - lobby.UserStatus         // NATS: user status publish/subscribe
 *   - lobby.MatchCreateRequest  // NATS: create match
 *   - lobby.MatchCreateResponse // NATS: create match response
 */

/**
 * Encode a Lobby ClientMessage (quit or ready) for sending over WebSocket.
 * @param payload - a valid `lobby.IClientMessage`
 * @returns `Uint8Array` (the protobuf‐encoded bytes)
 */
export function encodeClientMessage(
	payload: lobby.IClientMessage
): Uint8Array {
	const err = Proto.lobby.ClientMessage.verify(payload);
	if (err) throw new Error(err);
	return Proto.lobby.ClientMessage
		.encode(Proto.lobby.ClientMessage.create(payload))
		.finish();
}

/**
 * Decode a Lobby ClientMessage (if you ever receive one back on the front-end).
 * @param buffer - protobuf‐encoded bytes
 * @returns a `lobby.ClientMessage` instance
 */
export function decodeClientMessage(
	buffer: Uint8Array
): lobby.ClientMessage {
	return Proto.lobby.ClientMessage.decode(buffer);
}

/**
 * Encode a Lobby ServerMessage (start / update / error) for sending to front-end.
 * @param payload - a valid `lobby.IServerMessage`
 * @returns `Uint8Array`
 */
export function encodeServerMessage(
	payload: lobby.IServerMessage
): Uint8Array {
	const err = Proto.lobby.ServerMessage.verify(payload);
	if (err) throw new Error(err);
	return Proto.lobby.ServerMessage
		.encode(Proto.lobby.ServerMessage.create(payload))
		.finish();
}

/**
 * Decode a Lobby ServerMessage received by the front-end.
 * @param buffer - protobuf‐encoded bytes
 * @returns a `lobby.ServerMessage` instance
 */
export function decodeServerMessage(
	buffer: Uint8Array
): lobby.ServerMessage {
	return Proto.lobby.ServerMessage.decode(buffer);
}

/**
 * Encode a UserStatus for NATS publish (if front-end ever sends status).
 * @param payload - a valid `lobby.IUserStatus`
 * @returns `Uint8Array`
 */
export function encodeUserStatus(
	payload: lobby.IUserStatus
): Uint8Array {
	const err = Proto.lobby.UserStatus.verify(payload);
	if (err) throw new Error(err);
	return Proto.lobby.UserStatus
		.encode(Proto.lobby.UserStatus.create(payload))
		.finish();
}

/**
 * Decode a UserStatus from NATS (front-end subscription).
 * @param buffer - protobuf‐encoded bytes
 * @returns a `lobby.UserStatus` instance
 */
export function decodeUserStatus(
	buffer: Uint8Array
): lobby.UserStatus {
	return Proto.lobby.UserStatus.decode(buffer);
}

/**
 * Encode a MatchCreateRequest for NATS (front-end → lobby-manager).
 * @param payload - a valid `lobby.IMatchCreateRequest`
 * @returns `Uint8Array`
 */
export function encodeMatchCreateRequest(
	payload: lobby.IMatchCreateRequest
): Uint8Array {
	const err = Proto.lobby.MatchCreateRequest.verify(payload);
	if (err) throw new Error(err);
	return Proto.lobby.MatchCreateRequest
		.encode(Proto.lobby.MatchCreateRequest.create(payload))
		.finish();
}

/**
 * Decode a MatchCreateResponse from NATS (lobby-manager → front-end).
 * @param buffer - protobuf‐encoded bytes
 * @returns a `lobby.MatchCreateResponse` instance
 */
export function decodeMatchCreateResponse(
	buffer: Uint8Array
): lobby.MatchCreateResponse {
	return Proto.lobby.MatchCreateResponse.decode(buffer);
}

