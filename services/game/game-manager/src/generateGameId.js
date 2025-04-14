import crypto from 'crypto';

const existingGameIds = new Set();

export function generateGameId() {
	let id;
	do {
		const buf = crypto.randomBytes(4);
		id = buf.readUInt32LE(0);
	} while (existingGameIds.has(id));

	existingGameIds.add(id);
	return id;
}

export function releaseGameId(id) {
	existingGameIds.delete(id);
}
