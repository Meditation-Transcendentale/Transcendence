// src/message.js
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import protobuf from 'protobufjs';

// emulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// load your .proto
const root = protobuf.loadSync(resolve(__dirname, 'lobby.proto'));

// Lookup each type
const UserStatus = root.lookupType('lobby.UserStatus');
const MatchCreateRequest = root.lookupType('lobby.MatchCreateRequest');
const MatchCreateResponse = root.lookupType('lobby.MatchCreateResponse');
const ClientMessage = root.lookupType('lobby.ClientMessage');
const ErrorMessage = root.lookupType('lobby.ErrorMessage');
const StartMessage = root.lookupType('lobby.StartMessage');
const UpdateMessage = root.lookupType('lobby.UpdateMessage');
const ServerMessage = root.lookupType('lobby.ServerMessage');  // ← new

// ─── Client → Server ──────────────────────────────────────────────────────────

export function encodeUserStatus(obj) {
	const msg = UserStatus.create(obj);
	return UserStatus.encode(msg).finish();
}

export function encodeMatchCreateRequest({ players }) {
	const msg = MatchCreateRequest.create({ players });
	return MatchCreateRequest.encode(msg).finish();
}

export function decodeMatchCreateResponse(buffer) {
	const msg = MatchCreateResponse.decode(buffer);
	return MatchCreateResponse.toObject(msg, { enums: String });
}

export function decodeClientMessage(buffer) {
	const msg = ClientMessage.decode(buffer);
	return ClientMessage.toObject(msg, { enums: String });
}

// ─── Server → Client ──────────────────────────────────────────────────────────

export function encodeError(message) {
	const msg = ErrorMessage.create({ message });
	return ErrorMessage.encode(msg).finish();
}

export function decodeErrorMessage(buffer) {
	const msg = ErrorMessage.decode(buffer);
	return ErrorMessage.toObject(msg, { enums: String });
}

export function encodeStart({ lobbyId, gameId, map }) {
	const msg = StartMessage.create({ lobbyId, gameId, map });
	return StartMessage.encode(msg).finish();
}

export function decodeStartMessage(buffer) {
	const msg = StartMessage.decode(buffer);
	return StartMessage.toObject(msg, { enums: String });
}

export function encodeUpdate({ lobbyId, players, status }) {
	const msg = UpdateMessage.create({ lobbyId, players, status });
	return UpdateMessage.encode(msg).finish();
}

export function decodeUpdateMessage(buffer) {
	const msg = UpdateMessage.decode(buffer);
	return UpdateMessage.toObject(msg, { enums: String });
}
/**
 * Wraps any server payload into the ServerMessage envelope.
 *   { error: { message } }
 *   { start: { lobbyId, gameId, map } }
 *   { update: { lobbyId, players, status } }
 */
export function encodeServerMessage(payload) {
	// payload must be an object with exactly one of: error, start, update
	const msg = ServerMessage.create(payload);
	return ServerMessage.encode(msg).finish();
}
// ─── Combined Server Message Decoder ──────────────────────────────────────────

/**
 * Decodes *any* lobby.ServerMessage and returns:
 *   { type: 'error',  payload: ErrorMessage }
 *   { type: 'start',  payload: StartMessage }
 *   { type: 'update', payload: UpdateMessage }
 */
export function decodeServerMessage(buffer) {
	const msg = ServerMessage.decode(buffer);
	const obj = ServerMessage.toObject(msg, { enums: String });

	if (obj.error) {
		return { type: 'error', payload: obj.error };
	}
	if (obj.start) {
		return { type: 'start', payload: obj.start };
	}
	if (obj.update) {
		return { type: 'update', payload: obj.update };
	}

	throw new Error('Unknown ServerMessage payload');
}

