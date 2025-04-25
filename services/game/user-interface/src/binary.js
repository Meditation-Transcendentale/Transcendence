// services/game/user-interface/src/binary.js
const SCALE = 100;

/** Helpers: fixed-point ↔ float */
function floatToFixed(n) { return Math.round(n * SCALE); }
function fixedToFloat(n) { return n / SCALE; }

/**
 * decodeStateUpdate(buffer)
 *
 * Unpack the full  binary message that GameManager sends out:
 *   { gameId, tick, balls, paddles, isPaused, isGameOver, score }
 *
 * Layout:
 * 1 byte   messageType (must be 1)
 * 4 bytes  gameId
 * 4 bytes  tick
 *
 * 2 bytes  ballCount
 *   for each ball:
 *     2 id, 2 x, 2 y, 2 vx, 2 vy
 *
 * 2 bytes  paddleCount
 *   for each paddle:
 *     2 id, 2 offset, 1 isConnected, 1 padding
 *
 * 1 byte   isPaused
 * 1 byte   isGameOver
 *
 * 2 bytes  scoreCount
 *   for each entry:
 *     2 playerId, 2 score
 */
export function decodeStateUpdate(buffer) {
	let off = 0;
	const mt = buffer.readUInt8(off); off += 1;
	if (mt !== 1) throw new Error(`Invalid messageType ${mt}`);

	const gameId = buffer.readUInt32LE(off); off += 4;
	const tick = buffer.readUInt32LE(off); off += 4;

	// balls
	const ballCount = buffer.readUInt16LE(off); off += 2;
	const balls = [];
	for (let i = 0; i < ballCount; i++) {
		const id = buffer.readUInt16LE(off); off += 2;
		const x = fixedToFloat(buffer.readInt16LE(off)); off += 2;
		const y = fixedToFloat(buffer.readInt16LE(off)); off += 2;
		const vx = fixedToFloat(buffer.readInt16LE(off)); off += 2;
		const vy = fixedToFloat(buffer.readInt16LE(off)); off += 2;
		balls.push({ id, x, y, vx, vy });
	}

	// paddles
	const paddleCount = buffer.readUInt16LE(off); off += 2;
	const paddles = [];
	for (let i = 0; i < paddleCount; i++) {
		const id = buffer.readUInt16LE(off); off += 2;
		const offsetVal = fixedToFloat(buffer.readInt16LE(off)); off += 2;
		const isConnected = !!buffer.readUInt8(off); off += 1;
		off += 1; // padding
		paddles.push({ id, offset: offsetVal, isConnected });
	}

	// flags
	const isPaused = !!buffer.readUInt8(off); off += 1;
	const isGameOver = !!buffer.readUInt8(off); off += 1;

	// score table
	const scoreCount = buffer.readUInt16LE(off); off += 2;
	const score = {};
	for (let i = 0; i < scoreCount; i++) {
		const pid = buffer.readUInt16LE(off); off += 2;
		const sc = buffer.readUInt16LE(off); off += 2;
		score[pid] = sc;
	}

	return { gameId, tick, balls, paddles, isPaused, isGameOver, score };
}

