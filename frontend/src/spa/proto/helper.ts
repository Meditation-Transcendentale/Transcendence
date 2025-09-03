import * as Proto from './message.js';
import type { notif } from './message.js';

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

export function decodeNotificationMessage(
    buffer: Uint8Array
): notif.NotificationMessage {
    return Proto.notif.NotificationMessage.decode(buffer);
}

