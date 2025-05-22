// src/message.js
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import protobuf from 'protobufjs';

// emulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const root = protobuf.loadSync(resolve(__dirname, 'lobby.proto'));

// Lookup each type
const UserStatus = root.lookupType('lobby.UserStatus');
const MatchCreateRequest = root.lookupType('lobby.MatchCreateRequest');
const MatchCreateResponse = root.lookupType('lobby.MatchCreateResponse');
const ClientMessage = root.lookupType('lobby.ClientMessage');
const ErrorMessage = root.lookupType('lobby.ErrorMessage');
const StartMessage = root.lookupType('lobby.StartMessage');
const UpdateMessage = root.lookupType('lobby.UpdateMessage');

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

export function decodeClient(buffer) {
	const msg = ClientMessage.decode(buffer);
	return ClientMessage.toObject(msg, { enums: String });
}

export function encodeError(message) {
	const msg = ErrorMessage.create({ message });
	return ErrorMessage.encode(msg).finish();
}

export function encodeStart({ lobbyId, gameId, map }) {
	const msg = StartMessage.create({ lobbyId, gameId, map });
	return StartMessage.encode(msg).finish();
}

export function encodeUpdate({ lobbyId, players, status }) {
	// players: array of { uuid, ready }
	const msg = UpdateMessage.create({ lobbyId, players, status });
	return UpdateMessage.encode(msg).finish();
}

