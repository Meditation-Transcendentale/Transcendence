// src/message.js
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import protobuf from 'protobufjs';

// emulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// load your .proto
const root = protobuf.loadSync(resolve(__dirname, 'ui.proto'));
const ns = root.lookup('userinterface');

// ─── Protobuf Types ────────────────────────────────────────────────────────────
// Client → Server envelope & payloads
const ClientMessage = ns.lookupType('ClientMessage');
const PaddleUpdate = ns.lookupType('PaddleUpdate');
const QuitMessage = ns.lookupType('QuitMessage');
const ReadyMessage = ns.lookupType('ReadyMessage');
const SpectateMessage = ns.lookupType('SpectateMessage');

// Server → Client envelope & payloads
const ServerMessage = ns.lookupType('ServerMessage');
const ErrorMessage = ns.lookupType('ErrorMessage');
const WelcomeMessage = ns.lookupType('WelcomeMessage');
const GameStartMessage = ns.lookupType('GameStartMessage');
const StateMessage = ns.lookupType('StateMessage');
const GameEndMessage = ns.lookupType('GameEndMessage');

// Match lifecycle (NATS)
const MatchSetup = ns.lookupType('MatchSetup');
const MatchStart = ns.lookupType('MatchStart');
const MatchInput = ns.lookupType('MatchInput');
const MatchQuit = ns.lookupType('MatchQuit');
const MatchEnd = ns.lookupType('MatchEnd');

// ─── Client → Server ──────────────────────────────────────────────────────────

export function encodeClientMessage(payload) {
	const msg = ClientMessage.create(payload);
	return ClientMessage.encode(msg).finish();
}

export function decodeClientMessage(buffer) {
	const msg = ClientMessage.decode(buffer);
	return ClientMessage.toObject(msg, { enums: String });
}

export function encodePaddleUpdate({ paddleId, move }) {
	const msg = PaddleUpdate.create({ paddleId, move });
	return PaddleUpdate.encode(msg).finish();
}

export function decodePaddleUpdate(buffer) {
	const msg = PaddleUpdate.decode(buffer);
	return PaddleUpdate.toObject(msg, { enums: String });
}

export function encodeQuitMessage() {
	const msg = QuitMessage.create({});
	return QuitMessage.encode(msg).finish();
}

export function decodeQuitMessage(buffer) {
	const msg = QuitMessage.decode(buffer);
	return QuitMessage.toObject(msg, { enums: String });
}

export function encodeReadyMessage() {
	const msg = ReadyMessage.create({});
	return ReadyMessage.encode(msg).finish();
}

export function decodeReadyMessage(buffer) {
	const msg = ReadyMessage.decode(buffer);
	return ReadyMessage.toObject(msg, { enums: String });
}

export function encodeSpectateMessage() {
	const msg = SpectateMessage.create({});
	return SpectateMessage.encode(msg).finish();
}

export function decodeSpectateMessage(buffer) {
	const msg = SpectateMessage.decode(buffer);
	return SpectateMessage.toObject(msg, { enums: String });
}

// ─── Server → Client ──────────────────────────────────────────────────────────

export function encodeServerMessage(payload) {
	const msg = ServerMessage.create(payload);
	return ServerMessage.encode(msg).finish();
}

export function decodeServerMessage(buffer) {
	const msg = ServerMessage.decode(buffer);
	const obj = ServerMessage.toObject(msg, { enums: String });
	if (obj.error) return { type: 'error', payload: obj.error };
	if (obj.welcome) return { type: 'welcome', payload: obj.welcome };
	if (obj.start) return { type: 'start', payload: obj.start };
	if (obj.state) return { type: 'state', payload: obj.state };
	if (obj.end) return { type: 'end', payload: obj.end };
	throw new Error('Unknown ServerMessage payload');
}

export function encodeErrorMessage(message) {
	const msg = ErrorMessage.create({ message });
	return ErrorMessage.encode(msg).finish();
}

export function decodeErrorMessage(buffer) {
	const msg = ErrorMessage.decode(buffer);
	return ErrorMessage.toObject(msg, { enums: String });
}

export function encodeWelcomeMessage({ paddleId }) {
	const msg = WelcomeMessage.create({ paddleId });
	return WelcomeMessage.encode(msg).finish();
}

export function decodeWelcomeMessage(buffer) {
	const msg = WelcomeMessage.decode(buffer);
	return WelcomeMessage.toObject(msg, { enums: String });
}

export function encodeGameStartMessage() {
	const msg = GameStartMessage.create({});
	return GameStartMessage.encode(msg).finish();
}

export function decodeGameStartMessage(buffer) {
	const msg = GameStartMessage.decode(buffer);
	return GameStartMessage.toObject(msg, { enums: String });
}

export function encodeStateMessage({ state }) {
	const msg = StateMessage.create({ state });
	return StateMessage.encode(msg).finish();
}

export function decodeStateMessage(buffer) {
	const msg = StateMessage.decode(buffer);
	return StateMessage.toObject(msg, { enums: String });
}

export function encodeGameEndMessage({ score }) {
	const msg = GameEndMessage.create({ score });
	return GameEndMessage.encode(msg).finish();
}

export function decodeGameEndMessage(buffer) {
	const msg = GameEndMessage.decode(buffer);
	return GameEndMessage.toObject(msg, { enums: String });
}

// ─── NATS Match lifecycle ─────────────────────────────────────────────────────

export function encodeMatchSetup({ players }) {
	const msg = MatchSetup.create({ players });
	return MatchSetup.encode(msg).finish();
}

export function decodeMatchSetup(buffer) {
	const msg = MatchSetup.decode(buffer);
	return MatchSetup.toObject(msg, { enums: String });
}

export function encodeMatchStart() {
	const msg = MatchStart.create({});
	return MatchStart.encode(msg).finish();
}

export function decodeMatchStart(buffer) {
	const msg = MatchStart.decode(buffer);
	return MatchStart.toObject(msg, { enums: String });
}

export function encodeMatchInput({ paddleId, move }) {
	const msg = MatchInput.create({ paddleId, move });
	return MatchInput.encode(msg).finish();
}

export function decodeMatchInput(buffer) {
	const msg = MatchInput.decode(buffer);
	return MatchInput.toObject(msg, { enums: String });
}

export function encodeMatchQuit({ uuid }) {
	const msg = MatchQuit.create({ uuid });
	return MatchQuit.encode(msg).finish();
}

export function decodeMatchQuit(buffer) {
	const msg = MatchQuit.decode(buffer);
	return MatchQuit.toObject(msg, { enums: String });
}

export function encodeMatchEnd({ winner }) {
	const msg = MatchEnd.create({ winner });
	return MatchEnd.encode(msg).finish();
}

export function decodeMatchEnd(buffer) {
	const msg = MatchEnd.decode(buffer);
	return MatchEnd.toObject(msg, { enums: String });
}

