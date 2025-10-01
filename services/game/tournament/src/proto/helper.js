import * as Proto from './message.js';

/**
 * MatchCreateRequest ↔ MatchCreateResponse
 */
export function encodeMatchCreateRequest(payload) {
	const err = Proto.shared.MatchCreateRequest.verify(payload);
	if (err) throw new Error(err);
	return Proto.shared.MatchCreateRequest
		.encode(Proto.shared.MatchCreateRequest.create(payload))
		.finish();
}

export function decodeMatchCreateRequest(buffer) {
	return Proto.shared.MatchCreateRequest.decode(buffer);
}

export function encodeMatchCreateResponse(payload) {
	const err = Proto.shared.MatchCreateResponse.verify(payload);
	if (err) throw new Error(err);
	return Proto.shared.MatchCreateResponse
		.encode(Proto.shared.MatchCreateResponse.create(payload))
		.finish();
}

export function decodeMatchCreateResponse(buffer) {
	return Proto.shared.MatchCreateResponse.decode(buffer);
}

export function decodeMatchQuit(buffer) {
	return Proto.shared.MatchQuit.decode(buffer);
}

/**
 * MatchInput
 */
export function decodeMatchInput(buffer) {
	return Proto.shared.MatchInput.decode(buffer);
}

/**
 * PhysicsRequest ↔ PhysicsResponse
 */
export function encodePhysicsRequest(payload) {
	const err = Proto.shared.PhysicsRequest.verify(payload);
	if (err) throw new Error(err);
	return Proto.shared.PhysicsRequest
		.encode(Proto.shared.PhysicsRequest.create(payload))
		.finish();
}


/**
 * MatchState (for sending state updates)
 */
export function encodeStateUpdate(payload) {
	const err = Proto.shared.MatchState.verify(payload);
	if (err) throw new Error(err);
	return Proto.shared.MatchState
		.encode(Proto.shared.MatchState.create(payload))
		.finish();
}

export function decodeStateUpdate(buffer) {
	return Proto.shared.MatchState.decode(buffer);
}

/**
 * MatchSetup (NATS lifecycle)
 */
export function encodeMatchSetup(payload) {
	const err = Proto.shared.MatchSetup.verify(payload);
	if (err) throw new Error(err);
	return Proto.shared.MatchSetup
		.encode(Proto.shared.MatchSetup.create(payload))
		.finish();
}

export function decodeMatchSetup(buffer) {
	return Proto.shared.MatchSetup.decode(buffer);
}

/**
 * MatchEnd (NATS lifecycle)
 */
export function encodeMatchEnd(payload) {
	const err = Proto.shared.MatchEnd.verify(payload);
	if (err) throw new Error(err);
	return Proto.shared.MatchEnd
		.encode(Proto.shared.MatchEnd.create(payload))
		.finish();
}

export function decodeMatchEnd(buffer) {
	return Proto.shared.MatchEnd.decode(buffer);
}

export function encodeTournamentCreateRequest(payload) {
	const err = Proto.tournament.TournamentCreateRequest.verify(payload);
	if (err) throw new Error(err);
	return Proto.tournament.TournamentCreateRequest
		.encode(Proto.tournament.TournamentCreateRequest.create(payload))
		.finish();
}

export function decodeTournamentCreateRequest(buffer) {
	return Proto.tournament.TournamentCreateRequest.decode(buffer);
}

export function encodeTournamentCreateResponse(payload) {
	const err = Proto.tournament.TournamentCreateResponse.verify(payload);
	if (err) throw new Error(err);
	return Proto.tournament.TournamentCreateResponse
		.encode(Proto.tournament.TournamentCreateResponse.create(payload))
		.finish();
}

export function decodeTournamentCreateResponse(buffer) {
	return Proto.tournament.TournamentCreateResponse.decode(buffer);
}

export function encodeTournamentServerMessage(payload) {
	const err = Proto.tournament.TournamentServerMessage.verify(payload);
	if (err) throw new Error(err);
	return Proto.tournament.TournamentServerMessage
		.encode(Proto.tournament.TournamentServerMessage.create(payload))
		.finish();
}

export function decodeTournamentServerMessage(buffer) {
	return Proto.tournament.TournamentServerMessage.decode(buffer);
}

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

export function encodeStatusUpdate(payload) {
	const err = Proto.notif.StatusUpdate.verify(payload);
	if (err) throw new Error(err);
	return Proto.notif.StatusUpdate
		.encode(Proto.notif.StatusUpdate.create(payload))
		.finish();
}

export function encodeTournamentClientMessage(payload) {
	const err = Proto.tournament.TournamentClientMessage.verify(payload);
	if (err) throw new Error(err);
	return Proto.tournament.TournamentClientMessage
		.encode(Proto.tournament.TournamentClientMessage.create(payload))
		.finish();
}

export function decodeTournamentClientMessage(buffer) {
	return Proto.tournament.TournamentClientMessage.decode(buffer);
}

export function decodeMatchScoreUpdate(buffer) {
	return Proto.shared.MatchScoreUpdate.decode(buffer);
}
