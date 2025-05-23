// src/proto/message_lobby.ts
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as protobuf from 'protobufjs/minimal';

// emulate __dirname in ESM + TS
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the proto definitions
const root = protobuf.loadSync(resolve(__dirname, 'lobby.proto'));

// Lookup each message type
const UserStatusType = root.lookupType('lobby.UserStatus');
const QuitMessageType = root.lookupType('lobby.QuitMessage');
const ReadyMessageType = root.lookupType('lobby.ReadyMessage');
const ErrorMessageType = root.lookupType('lobby.ErrorMessage');
const StartMessageType = root.lookupType('lobby.StartMessage');
const PlayerType = root.lookupType('lobby.Player');
const UpdateMessageType = root.lookupType('lobby.UpdateMessage');
const ClientMessageType = root.lookupType('lobby.ClientMessage');

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
// ClientMessage has a oneof payload:
export type ClientMessage =
	| { quit: QuitMessage; ready?: undefined }
	| { ready: ReadyMessage; quit?: undefined };

// Encode / decode helpers
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
}

export function encodeClientMessage(msg: ClientMessage): Uint8Array {
	// ClientMessageType.create accepts one of the payload keys
	return ClientMessageType.encode(ClientMessageType.create(msg)).finish();
}
export function decodeClientMessage(buf: Uint8Array): ClientMessage {
	// toObject() returns { quit?: {...}, ready?: {...} }
	return ClientMessageType.toObject(
		ClientMessageType.decode(buf),
		{ enums: String }
	) as ClientMessage;
}

