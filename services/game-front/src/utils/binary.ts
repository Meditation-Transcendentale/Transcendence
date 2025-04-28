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
	const mt = buffer.readUInt8(off); off += 1;
	if (mt !== 1) throw new Error(`Invalid messageType ${mt}`);

	const gameId = buffer.readUInt32LE(off); off += 4;
	const tick = buffer.readUInt32LE(off); off += 4;

	// ── balls ─────────────────────────────────────────────────────────
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

	// ── paddles ───────────────────────────────────────────────────────
	const paddleCount = buffer.readUInt16LE(off); off += 2;
	const paddles = [];
	for (let i = 0; i < paddleCount; i++) {
		const id = buffer.readUInt16LE(off); off += 2;
		const offsetVal = fixedToFloat(buffer.readInt16LE(off)); off += 2;
		const isConnected = !!buffer.readUInt8(off); off += 1;
		off += 1; // padding
		paddles.push({ id, offset: offsetVal, isConnected });
	}

	// ── flags ──────────────────────────────────────────────────────────
	const isPaused = !!buffer.readUInt8(off); off += 1;
	const isGameOver = !!buffer.readUInt8(off); off += 1;

	// ── score table ──────────────────────────────────────────────────
	const scoreCount = buffer.readUInt16LE(off); off += 2;
	const score: any = {};
	for (let i = 0; i < scoreCount; i++) {
		const pid = buffer.readUInt16LE(off); off += 2;
		const sc = buffer.readUInt16LE(off); off += 2;
		score[pid] = sc;
	}

	return { gameId, tick, balls, paddles, isPaused, isGameOver, score };
}

