// src/utils/binary.js
import { Buffer } from 'buffer';

const SCALE = 100;

// Float ↔ fixed‐point helpers
function floatToFixed(n: any) { return Math.round(n * SCALE); }
function fixedToFloat(f: any) { return f / SCALE; }

/**
 * decodeStateUpdate(buffer)
 *
 * Unpack the *full* packet that the GameManager now sends:
 * { gameId, tick, balls, paddles, isPaused, isGameOver, score }
 */
export function decodeStateUpdate(buffer: any) {
	let off = 0;

	const msgType = buffer.readUInt8(off); off += 1;
	if (msgType !== 1) {
		throw new Error(`Invalid messageType ${msgType}`);
	}

	const gameId = buffer.readUInt32LE(off); off += 4;
	const tick = buffer.readUInt32LE(off); off += 4;

	// ── balls ─────────────────────────────────────────────────────
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

	// ── paddles ───────────────────────────────────────────────────
	const paddleCount = buffer.readUInt16LE(off); off += 2;
	const paddles = [];
	for (let i = 0; i < paddleCount; i++) {
		const id = buffer.readUInt16LE(off); off += 2;
		const offsetVal = fixedToFloat(buffer.readInt16LE(off)); off += 2;
		const isConnected = !!buffer.readUInt8(off); off += 1;
		off += 1; // padding byte
		paddles.push({ id, offset: offsetVal, isConnected });
	}

	// ── flags ─────────────────────────────────────────────────────
	const isPaused = !!buffer.readUInt8(off); off += 1;
	const isGameOver = !!buffer.readUInt8(off); off += 1;

	// ── score table ───────────────────────────────────────────────
	const scoreCount = buffer.readUInt16LE(off); off += 2;
	const score: any = {};
	for (let i = 0; i < scoreCount; i++) {
		const pid = buffer.readUInt16LE(off); off += 2;
		const sc = buffer.readUInt16LE(off); off += 2;
		score[pid] = sc;
	}

	return { gameId, tick, balls, paddles, isPaused, isGameOver, score };
}

// const SCALE = 100;
// function floatToFixed(num: number) {
// 	return Math.round(num * SCALE);
// }
// function fixedToFloat(fixed: number) {
// 	return fixed / SCALE;
// }
//
// export function encodeStateUpdate(gameId: number, tick: number, balls: any, paddles: any) {
// 	const messageType = 1;
// 	const ballCount = balls.length;
// 	const paddleCount = paddles.length;
//
// 	// Header: messageType (1 byte) + gameId (4 bytes) + tick (4 bytes)
// 	const headerSize = 1 + 4 + 4;
// 	const ballCountSize = 2;
// 	const ballEntrySize = 10;
// 	const paddleCountSize = 2;
// 	const paddleEntrySize = 6;
//
// 	const totalSize = headerSize + ballCountSize + (ballCount * ballEntrySize)
// 		+ paddleCountSize + (paddleCount * paddleEntrySize);
//
// 	const buffer = Buffer.alloc(totalSize);
// 	let offset = 0;
//
// 	// Write header
// 	buffer.writeUInt8(messageType, offset);
// 	offset += 1;
// 	buffer.writeUInt32LE(gameId, offset);
// 	offset += 4;
// 	buffer.writeUInt32LE(tick, offset);
// 	offset += 4;
//
// 	// Ball count
// 	buffer.writeUInt16LE(ballCount, offset);
// 	offset += 2;
//
// 	// Write each ball update
// 	for (const ball of balls) {
// 		buffer.writeUInt16LE(ball.id, offset);
// 		offset += 2;
// 		buffer.writeInt16LE(floatToFixed(ball.x), offset);
// 		offset += 2;
// 		buffer.writeInt16LE(floatToFixed(ball.y), offset);
// 		offset += 2;
// 		buffer.writeInt16LE(floatToFixed(ball.vx), offset);
// 		offset += 2;
// 		buffer.writeInt16LE(floatToFixed(ball.vy), offset);
// 		offset += 2;
// 	}
//
// 	// Paddle count
// 	buffer.writeUInt16LE(paddleCount, offset); // Fix: Use paddleCount, not ballCount
// 	offset += 2;
//
// 	// Write each paddle update
// 	for (const paddle of paddles) {
// 		buffer.writeUInt16LE(paddle.id, offset);
// 		offset += 2;
// 		const paddleOffsetVal = floatToFixed(paddle.offset);
// 		buffer.writeInt16LE(paddleOffsetVal, offset);
// 		offset += 2;
// 		buffer.writeInt16LE(floatToFixed(paddle.isConnected), offset);
// 		offset += 2;
// 	}
//
// 	return buffer;
// }
//
// export function decodeStateUpdate(buffer: any) {
// 	let offset = 0;
// 	const messageType = buffer.readUInt8(offset);
// 	offset += 1;
//
// 	if (messageType !== 1) {
// 		throw new Error("Invalid message type: Expected 1 for state update");
// 	}
//
// 	const gameId = buffer.readUInt32LE(offset);
// 	offset += 4;
// 	const tick = buffer.readUInt32LE(offset);
// 	offset += 4;
//
// 	const ballCount = buffer.readUInt16LE(offset);
// 	offset += 2;
// 	const balls = [];
// 	for (let i = 0; i < ballCount; i++) {
// 		const id = buffer.readUInt16LE(offset);
// 		offset += 2;
// 		const x = fixedToFloat(buffer.readInt16LE(offset));
// 		offset += 2;
// 		const y = fixedToFloat(buffer.readInt16LE(offset));
// 		offset += 2;
// 		const vx = fixedToFloat(buffer.readInt16LE(offset));
// 		offset += 2;
// 		const vy = fixedToFloat(buffer.readInt16LE(offset));
// 		offset += 2;
// 		balls.push({ id, x, y, vx, vy });
// 	}
//
// 	const paddleCount = buffer.readUInt16LE(offset);
// 	offset += 2;
// 	const paddles = [];
// 	for (let j = 0; j < paddleCount; j++) {
// 		const id = buffer.readUInt16LE(offset);
// 		offset += 2;
// 		const paddleOffsetVal = fixedToFloat(buffer.readInt16LE(offset));
// 		offset += 2;
// 		const isConnected = fixedToFloat(buffer.readInt16LE(offset));
// 		offset += 2;
// 		paddles.push({ id, offset: paddleOffsetVal, isConnected });
// 	}
//
// 	return { type: "stateUpdate", gameId, tick, balls, paddles };
// }
