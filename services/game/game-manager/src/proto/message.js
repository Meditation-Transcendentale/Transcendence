// src/proto/message_gamemanager.js
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import protobuf from 'protobufjs';

// emulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// load your updated game‐manager.proto
const root = protobuf.loadSync(resolve(__dirname, 'gamemanager.proto'));

// look up all the types
const Ball = root.lookupType('gamemanager.Ball');
const Paddle = root.lookupType('gamemanager.Paddle');
const PaddleInput = root.lookupType('gamemanager.PaddleInput');
const Goal = root.lookupType('gamemanager.Goal');

const MatchState = root.lookupType('gamemanager.MatchState');
const PhysicsRequest = root.lookupType('gamemanager.PhysicsRequest');
const PhysicsResponse = root.lookupType('gamemanager.PhysicsResponse');

const MatchCreateRequest = root.lookupType('gamemanager.MatchCreateRequest');
const MatchCreateResponse = root.lookupType('gamemanager.MatchCreateResponse');

const MatchEnd = root.lookupType('gamemanager.MatchEnd');
const MatchSetup = root.lookupType('gamemanager.MatchSetup');
const MatchInput = root.lookupType('gamemanager.MatchInput');
const MatchQuit = root.lookupType('gamemanager.MatchQuit');
const MatchStart = root.lookupType('gamemanager.MatchStart');


// -----------------------------------------------------------------------------
// NATS request → game.${mode}.match.create
// -----------------------------------------------------------------------------
export function encodeMatchCreateRequest({ players }) {
	const msg = MatchCreateRequest.create({ players });
	return MatchCreateRequest.encode(msg).finish();
}
export function encodeMatchCreateResponse({ gameId }) {
	const msg = MatchCreateResponse.encode({ gameId });
	return MatchCreateResponse.encode(msg).finish();
}


// -----------------------------------------------------------------------------
// Unified physics request/response
// -----------------------------------------------------------------------------
export function encodePhysicsRequest({ gameId, tick, input, stage }) {
	const msg = PhysicsRequest.create({ gameId, tick, input, stage });
	return PhysicsRequest.encode(msg).finish();
}
export function decodePhysicsResponse(buffer) {
	const msg = PhysicsResponse.decode(buffer);
	return PhysicsResponse.toObject(msg, { enums: String });
}


// -----------------------------------------------------------------------------
// Match lifecycle messages
// -----------------------------------------------------------------------------
export function encodeMatchSetup({ players }) {
	const msg = MatchSetup.create({ players });
	return MatchSetup.encode(msg).finish();
}

export function encodeMatchInput({ paddleId, move }) {
	const msg = MatchInput.create({ paddleId, move });
	return MatchInput.encode(msg).finish();
}

export function encodeMatchQuit({ uuid }) {
	const msg = MatchQuit.create({ uuid });
	return MatchQuit.encode(msg).finish();
}

export function encodeMatchStart() {
	const msg = MatchStart.create();
	return MatchStart.encode(msg).finish();
}


// -----------------------------------------------------------------------------
// Unified state update
// -----------------------------------------------------------------------------
export function encodeStateUpdate({ gameId, tick, balls, paddles, score, ranks, stage }) {
	const msg = MatchState.create({ gameId, tick, balls, paddles, score, ranks, stage });
	return MatchState.encode(msg).finish();
}


// -----------------------------------------------------------------------------
// decode helpers for MatchInput and MatchCreate if needed
// -----------------------------------------------------------------------------
export function decodeMatchCreateRequest(buffer) {
	const msg = MatchCreateRequest.decode(buffer);
	return MatchCreateRequest.toObject(msg, { enums: String });
}

export function decodeMatchInput(buffer) {
	const msg = MatchInput.decode(buffer);
	return MatchInput.toObject(msg, { enums: String });
}

