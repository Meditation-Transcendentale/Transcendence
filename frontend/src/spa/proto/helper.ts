import * as Proto from './message.js';
import type { notif, lobby, tournament } from './message.js';

export function encodeFriendUpdate(
    payload: notif.IFriendUpdate
): Uint8Array {
    const err = Proto.notif.FriendUpdate.verify(payload);
    if (err) throw new Error(err);
    return Proto.notif.FriendUpdate
        .encode(Proto.notif.FriendUpdate.create(payload))
        .finish();
}

export function decodeFriendUpdate(
    buffer: Uint8Array
): notif.FriendUpdate {
    return Proto.notif.FriendUpdate.decode(buffer);
}

export function encodeGameInvite(
    payload: notif.IGameInvite
): Uint8Array {
    const err = Proto.notif.GameInvite.verify(payload);
    if (err) throw new Error(err);
    return Proto.notif.GameInvite
        .encode(Proto.notif.GameInvite.create(payload))
        .finish();
}

export function decodeGameInvite(
    buffer: Uint8Array
): notif.GameInvite {
    return Proto.notif.GameInvite.decode(buffer);
}

export function encodeStatusUpdate(
    payload: notif.IStatusUpdate
): Uint8Array {
    const err = Proto.notif.StatusUpdate.verify(payload);
    if (err) throw new Error(err);
    return Proto.notif.StatusUpdate
        .encode(Proto.notif.StatusUpdate.create(payload))
        .finish();
}

export function decodeStatusUpdate(
    buffer: Uint8Array
): notif.StatusUpdate {
    return Proto.notif.StatusUpdate.decode(buffer);
}

export function encodeNotificationMessage(
    payload: notif.INotificationMessage
): Uint8Array {
    const err = Proto.notif.NotificationMessage.verify(payload);
    if (err) throw new Error(err);
    return Proto.notif.NotificationMessage
        .encode(Proto.notif.NotificationMessage.create(payload))
        .finish();
}

/**
 * Decode a Lobby ServerMessage received by the front-end.
 * @param buffer - protobuf‐encoded bytes
 * @returns a `lobby.ServerMessage` instance
 */
export function decodeNotificationMessage(
    buffer: Uint8Array
): notif.NotificationMessage{
    return Proto.notif.NotificationMessage.decode(buffer);
}

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

export function encodeTournamentServerMessage(
    payload: tournament.ITournamentServerMessage
): Uint8Array {
    const err = Proto.tournament.TournamentServerMessage.verify(payload);
    if (err) throw new Error(err);
    return Proto.tournament.TournamentServerMessage
        .encode(Proto.tournament.TournamentServerMessage.create(payload))
        .finish();
}

export function decodeTournamentServerMessage(
    buffer: Uint8Array
): tournament.TournamentServerMessage {
    return Proto.tournament.TournamentServerMessage.decode(buffer);
}

export function encodeTournamentClientMessage(
    payload: tournament.ITournamentClientMessage
): Uint8Array {
    const err = Proto.tournament.TournamentClientMessage.verify(payload);
    if (err) throw new Error(err);
    return Proto.tournament.TournamentClientMessage
        .encode(Proto.tournament.TournamentClientMessage.create(payload))
        .finish();
}

=
export function decodeTournamentClientMessage(
    buffer: Uint8Array
): tournament.TournamentClientMessage {
    return Proto.tournament.TournamentClientMessage.decode(buffer);
}