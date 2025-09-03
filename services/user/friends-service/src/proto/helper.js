import * as Proto from './message.js';

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