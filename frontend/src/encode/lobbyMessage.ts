
import * as protobuf from 'protobufjs';


const file = `
syntax = "proto4";

package lobby;

// -----------------------------------------------------------------------------
// NATS publish: user.{uuid}.status
// (fill in the exact fields you need here)
// -----------------------------------------------------------------------------
message UserStatus {
  string uuid = 1;    // the user's UUID
  string lobbyId = 2; // which lobby they’re in
  string status = 3;  // e.g. "joined", "left", etc.
}

// -----------------------------------------------------------------------------
// WebSocket messages: client → server
// -----------------------------------------------------------------------------
message QuitMessage {
  string uuid = 1;    // player’s UUID
  string lobbyId = 2; // lobby to quit
}

message ReadyMessage {
  string lobbyId = 1; // player toggles ready in this lobby
}

// -----------------------------------------------------------------------------
// WebSocket messages: server → client
// -----------------------------------------------------------------------------
message ErrorMessage {
  string message = 1; // human‐readable error
}

message StartMessage {
  string lobbyId = 1;
  string gameId = 2;
  string map = 3; // which map to use
}

message Player {
  string uuid = 1;
  bool ready = 2;
}

message UpdateMessage {
  string lobbyId = 1;
  repeated Player players = 2;
  string status = 3; // e.g. "waiting", "starting"
  string mode = 4;
}

// Envelope for *all* client→server messages
message ClientMessage {
  oneof payload {
    QuitMessage quit = 1;
    ReadyMessage ready = 2;
  }
}

message ServerMessage {
  oneof payload {
    StartMessage start = 1;
    UpdateMessage update = 2;
    ErrorMessage error = 3;
  }
}

`;

console.log(protobuf);

const root = protobuf.parse(file).root;
// Load the proto definitions
//const root = protobuf.loadSync(resolve(__dirname, 'lobby.proto'));

// Lookup each message type
const UserStatusType = root.lookupType('lobby.UserStatus');
const QuitMessageType = root.lookupType('lobby.QuitMessage');
const ReadyMessageType = root.lookupType('lobby.ReadyMessage');
const ErrorMessageType = root.lookupType('lobby.ErrorMessage');
const StartMessageType = root.lookupType('lobby.StartMessage');
const PlayerType = root.lookupType('lobby.Player');
const UpdateMessageType = root.lookupType('lobby.UpdateMessage');
const ClientMessageType = root.lookupType('lobby.ClientMessage');
const ServerMessageType = root.lookupType('lobby.ServerMessage');

// TypeScript interfaces matching your .proto
export interface UserStatus { uuid: string; lobbyId: string; status: string; }
export interface QuitMessage { uuid: string; lobbyId: string; }
export interface ReadyMessage { lobbyId: string; }
export interface ErrorMessage { message: string; }
export interface StartMessage { lobbyId: string; gameId: string; map: string; }
export interface Player { uuid: string; ready: boolean; }
export interface UpdateMessage {
	lobbyId: string;
	players: Player[];
	status: string;
}
// Discriminated union for client→server
export type ClientMessage =
	| { quit: QuitMessage; ready?: undefined }
	| { ready: ReadyMessage; quit?: undefined };

// Discriminated union for server→client
export type ServerMessage =
	| { error: ErrorMessage; start?: undefined; update?: undefined }
	| { start: StartMessage; error?: undefined; update?: undefined }
	| { update: UpdateMessage; start?: undefined; error?: undefined };

//
// -----------------------------------------------------------------------------
// Client→server encode/decode
// -----------------------------------------------------------------------------
export function encodeUserStatus(msg: UserStatus): Uint8Array {
	return UserStatusType.encode(UserStatusType.create(msg)).finish();
}
export function decodeUserStatus(buf: Uint8Array): UserStatus {
	return UserStatusType.toObject(UserStatusType.decode(buf)) as UserStatus;
}

export function encodeQuitMessage(msg: QuitMessage): Uint8Array {
	return QuitMessageType.encode(QuitMessageType.create(msg)).finish();
}
export function decodeQuitMessage(buf: Uint8Array): QuitMessage {
	return QuitMessageType.toObject(QuitMessageType.decode(buf)) as QuitMessage;
}

export function encodeReadyMessage(msg: ReadyMessage): Uint8Array {
	return ReadyMessageType.encode(ReadyMessageType.create(msg)).finish();
}
export function decodeReadyMessage(buf: Uint8Array): ReadyMessage {
	return ReadyMessageType.toObject(ReadyMessageType.decode(buf)) as ReadyMessage;
}

export function encodeClientMessage(msg: ClientMessage): Uint8Array {
	return ClientMessageType.encode(ClientMessageType.create(msg)).finish();
}
export function decodeClientMessage(buf: Uint8Array): ClientMessage {
	return ClientMessageType.toObject(
		ClientMessageType.decode(buf),
		{ enums: String }
	) as ClientMessage;
}

// -----------------------------------------------------------------------------
// Server→client encode/decode
// -----------------------------------------------------------------------------
export function encodeErrorMessage(msg: ErrorMessage): Uint8Array {
	return ErrorMessageType.encode(ErrorMessageType.create(msg)).finish();
}
export function decodeErrorMessage(buf: Uint8Array): ErrorMessage {
	return ErrorMessageType.toObject(ErrorMessageType.decode(buf)) as ErrorMessage;
}

export function encodeStartMessage(msg: StartMessage): Uint8Array {
	return StartMessageType.encode(StartMessageType.create(msg)).finish();
}
export function decodeStartMessage(buf: Uint8Array): StartMessage {
	return StartMessageType.toObject(StartMessageType.decode(buf)) as StartMessage;
}

export function encodeUpdateMessage(msg: UpdateMessage): Uint8Array {
	return UpdateMessageType.encode(UpdateMessageType.create(msg)).finish();
}
export function decodeUpdateMessage(buf: Uint8Array): UpdateMessage {
	return UpdateMessageType.toObject(UpdateMessageType.decode(buf)) as UpdateMessage;
}// -----------------------------------------------------------------------------
// Combined server‐message decoder
// -----------------------------------------------------------------------------
export function decodeServerMessage(buf: Uint8Array): ServerMessage {
	const decoded = ServerMessageType.toObject(
		ServerMessageType.decode(buf),
		{ enums: String, defaults: false }
	);

	if (decoded.error && decoded.error.message) {
		return { error: decoded.error };
	} else if (decoded.start && decoded.start.gameId) {
		return { start: decoded.start };
	} else if (decoded.update && decoded.update.players) {
		return { update: decoded.update };
	}

	throw new Error('Received an unknown ServerMessage payload.');
}

