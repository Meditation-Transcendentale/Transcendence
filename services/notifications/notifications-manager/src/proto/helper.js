import * as Proto from './message.js';

export function encodeFriend(payload) {
    const err = Proto.notif.Friend.verify(payload);
    if (err) throw new Error(err);
    return Proto.notif.Friend
        .encode(Proto.notif.Friend.create(payload))
        .finish();
}

export function decodeFriend(buffer) {
    return Proto.notif.Friend.decode(buffer);
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