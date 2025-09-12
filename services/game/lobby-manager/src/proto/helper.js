import * as Proto from './message.js';

/**
 * ClientMessage (Client → Server: Quit / Ready)
 */
export function encodeClientMessage(payload) {
	const err = Proto.lobby.ClientMessage.verify(payload);
	if (err) throw new Error(err);
	return Proto.lobby.ClientMessage
		.encode(Proto.lobby.ClientMessage.create(payload))
		.finish();
}

export function decodeClientMessage(buffer) {
	return Proto.lobby.ClientMessage.decode(buffer);
}

/**
 * ServerMessage (Server → Client: Start / Update / Error)
 */
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

/**
 * UserStatus (NATS publish)
 */
export function encodeUserStatus(payload) {
	const err = Proto.lobby.UserStatus.verify(payload);
	if (err) throw new Error(err);
	return Proto.lobby.UserStatus
		.encode(Proto.lobby.UserStatus.create(payload))
		.finish();
}

export function decodeUserStatus(buffer) {
	return Proto.lobby.UserStatus.decode(buffer);
}

/**
 * MatchCreateRequest / MatchCreateResponse (NATS)
 */
export function encodeMatchCreateRequest(payload) {
	const err = Proto.lobby.MatchCreateRequest.verify(payload);
	if (err) throw new Error(err);
	return Proto.lobby.MatchCreateRequest
		.encode(Proto.lobby.MatchCreateRequest.create(payload))
		.finish();
}

export function decodeMatchCreateResponse(buffer) {
	return Proto.lobby.MatchCreateResponse.decode(buffer);
}

export function encodeFriendUpdate(payload) {
	const err = Proto.notif.FriendUpdate.verify(payload);
	if (err) throw new Error(err);
	return Proto.notif.FriendUpdate
		.encode(Proto.notif.FriendUpdate.create(payload))
		.finish();
}

export function decodeFriendUpdate(buffer) {
	return Proto.notif.FriendUpdate.decode(buffer);
}

export function encodeGameInvite(payload) {
	const err = Proto.notif.GameInvite.verify(payload);
	if (err) throw new Error(err);
	return Proto.notif.GameInvite
		.encode(Proto.notif.GameInvite.create(payload))
		.finish();
}

export function decodeGameInvite(buffer) {
	return Proto.notif.GameInvite.decode(buffer);
}

export function encodeStatusUpdate(payload) {
	const err = Proto.notif.StatusUpdate.verify(payload);
	if (err) throw new Error(err);
	return Proto.notif.StatusUpdate
		.encode(Proto.notif.StatusUpdate.create(payload))
		.finish();
}

export function decodeStatusUpdate(buffer) {
	return Proto.notif.StatusUpdate.decode(buffer);
}

export function encodeNotificationMessage(payload) {
		const err = Proto.notif.NotificationMessage.verify(payload);
	if (err) throw new Error(err);
	return Proto.notif.NotificationMessage
		.encode(Proto.notif.NotificationMessage.create(payload))
		.finish();
}

export function decodeNotificationMessage(buffer) {
	return Proto.notif.NotificationMessage.decode(buffer);
}

/**
 * MatchStartTournament
 */
export function encodeMatchStartTournament(payload) {
	const err = Proto.lobby.MatchStartTournament.verify(payload);
	if (err) throw new Error(err);
	return Proto.lobby.MatchStartTournament
		.encode(Proto.lobby.MatchStartTournament.create(payload))
		.finish();
}

export function decodeMatchStartTournament(buffer) {
	return Proto.lobby.MatchStartTournament.decode(buffer);
}

export function encodeTournamentCreateRequest(payload) {
	const err = Proto.tournament.TournamentCreateRequest.verify(payload);
	if (err) throw new Error(err);
	return Proto.shared.MatchEnd
		.encode(Proto.tournament.TournamentCreateRequest.create(payload))
		.finish();
}

export function decodeTournamentCreateRequest(buffer) {
	return Proto.tournament.TournamentCreateRequest.decode(buffer);
}

export function encodeTournamentCreateResponse(payload) {
	const err = Proto.tournament.TournamentCreateResponse.verify(payload);
	if (err) throw new Error(err);
	return Proto.shared.MatchEnd
		.encode(Proto.tournament.TournamentCreateResponse.create(payload))
		.finish();
}

export function decodeTournamentCreateResponse(buffer) {
	return Proto.tournament.TournamentCreateResponse.decode(buffer);
}