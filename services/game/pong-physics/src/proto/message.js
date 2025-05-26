// src/proto/message_pong_physics.js
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import protobuf from 'protobufjs';

// emulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// load the pong-physics.proto schema
const root = protobuf.loadSync(resolve(__dirname, 'pong.proto'));

const Ball = root.lookupType('pongphysics.Ball');
const Paddle = root.lookupType('pongphysics.Paddle');
const PaddleInput = root.lookupType('pongphysics.PaddleInput');
const Goal = root.lookupType('pongphysics.Goal');

const MatchState = root.lookupType('pongphysics.MatchState');
const PhysicsRequest = root.lookupType('pongphysics.PhysicsRequest');
const PhysicsResponse = root.lookupType('pongphysics.PhysicsResponse');

const MatchEnd = root.lookupType('pongphysics.MatchEnd');
const MatchStart = root.lookupType('pongphysics.MatchStart');

// -----------------------------------------------------------------------------
// MatchState encode/decode
// -----------------------------------------------------------------------------
export function encodeMatchState({ gameId, tick, balls, paddles, score, ranks, stage }) {
	const msg = MatchState.create({ gameId, tick, balls, paddles, score, ranks, stage });
	return MatchState.encode(msg).finish();
}
export function decodeMatchState(buffer) {
	const msg = MatchState.decode(buffer);
	return MatchState.toObject(msg, { enums: String });
}

// -----------------------------------------------------------------------------
// PhysicsRequest encode/decode
// -----------------------------------------------------------------------------
export function encodePhysicsRequest({ gameId, tick, input, stage }) {
	const msg = PhysicsRequest.create({ gameId, tick, input, stage });
	return PhysicsRequest.encode(msg).finish();
}
export function decodePhysicsRequest(buffer) {
	const msg = PhysicsRequest.decode(buffer);
	return PhysicsRequest.toObject(msg, { enums: String });
}

// -----------------------------------------------------------------------------
// PhysicsResponse encode/decode
// -----------------------------------------------------------------------------
export function encodePhysicsResponse({ gameId, tick, balls, paddles, goal }) {
	const msg = PhysicsResponse.create({ gameId, tick, balls, paddles, goal });
	return PhysicsResponse.encode(msg).finish();
}
export function decodePhysicsResponse(buffer) {
	const msg = PhysicsResponse.decode(buffer);
	return PhysicsResponse.toObject(msg, { enums: String });
}

// -----------------------------------------------------------------------------
// Match lifecycle messages
// -----------------------------------------------------------------------------
export function encodeMatchStart() {
	const msg = MatchStart.create();
	return MatchStart.encode(msg).finish();
}
export function decodeMatchStart(buffer) {
	const msg = MatchStart.decode(buffer);
	return MatchStart.toObject(msg, { enums: String });
}

export function encodeMatchEnd() {
	const msg = MatchEnd.create();
	return MatchEnd.encode(msg).finish();
}
export function decodeMatchEnd(buffer) {
	const msg = MatchEnd.decode(buffer);
	return MatchEnd.toObject(msg, { enums: String });
}

