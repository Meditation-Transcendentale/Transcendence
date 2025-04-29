// services/game/game-manager/src/binary.js
import { flatbuffers } from 'flatbuffers';
import {
	FullState,
	Ball,
	Paddle,
	ScoreEntry
} from 'serialization-game';

const SCALE = 100;

/** Helpers: float ↔ fixed-point */
function floatToFixed(num) {
	return Math.round(num * SCALE);
}
function fixedToFloat(fixed) {
	return fixed / SCALE;
}


/**
 * decodeRaw(buffer)
 *
 * Unpack exactly what the physics service sent:
 *   { gameId, tick, balls, paddles }
 *
 * Layout:
 * 1 byte   messageType (must be 1)
 * 4 bytes  gameId
 * 4 bytes  tick
 * 2 bytes  ballCount
 *   per ball: 2 id, 2 x, 2 y, 2 vx, 2 vy
 * 2 bytes  paddleCount
 *   per paddle: 2 id, 2 offset, 2 isConnected
 */
export function decodeRaw(buffer) {
	let off = 0;

	const messageType = buffer.readUInt8(off); off += 1;
	if (messageType !== 1) {
		throw new Error(`Invalid messageType ${messageType}`);
	}

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
		const offset = fixedToFloat(buffer.readInt16LE(off)); off += 2;
		const isConnected = !!buffer.readUInt16LE(off); off += 2;
		paddles.push({ id, offset, isConnected });
	}

	return { gameId, tick, balls, paddles };
}


/**
 * encodeFull(gameId, tick, balls, paddles, score, isPaused, isGameOver)
 *
 * Package the full state for clients:
 *   { gameId, tick, balls, paddles, score, isPaused, isGameOver }
 *
 * Layout extends raw by adding:
 * 1 byte   isPaused (0/1)
 * 1 byte   isGameOver (0/1)
 * 2 bytes  scoreCount
 *   per entry: 2 playerId, 2 score
 */
export function encodeFull(
	gameId,
	tick,
	balls,
	paddles,
	score,
	isPaused,
	isGameOver
) {
	const messageType = 1;
	const ballCount = balls.length;
	const paddleCount = paddles.length;

	const scoreEntries = Object.entries(score)
		.filter(([pid]) => pid !== 'undefined')
		.map(([pid, sc]) => [Number(pid), sc])
		.sort((a, b) => a[0] - b[0]);

	const scoreCount = scoreEntries.length;

	const headerSize = 1 + 4 + 4;
	const ballSectionSize = 2 + ballCount * (2 + 2 + 2 + 2 + 2);
	const paddleSectionSize = 2 + paddleCount * (2 + 2 + 1 + 1);
	const flagsSize = 1 + 1;
	const scoreSectionSize = 2 + scoreCount * (2 + 2);
	const totalSize = headerSize
		+ ballSectionSize
		+ paddleSectionSize
		+ flagsSize
		+ scoreSectionSize;

	const buf = Buffer.alloc(totalSize);
	let off = 0;

	// ─── HEADER ─────────────────────────────────────────────────────
	buf.writeUInt8(messageType, off); off += 1;
	buf.writeUInt32LE(gameId, off); off += 4;
	buf.writeUInt32LE(tick, off); off += 4;

	// ─── BALLS ──────────────────────────────────────────────────────
	buf.writeUInt16LE(ballCount, off); off += 2;
	for (const b of balls) {
		buf.writeUInt16LE(b.id, off); off += 2;
		buf.writeInt16LE(floatToFixed(b.x), off); off += 2;
		buf.writeInt16LE(floatToFixed(b.y), off); off += 2;
		buf.writeInt16LE(floatToFixed(b.vx), off); off += 2;
		buf.writeInt16LE(floatToFixed(b.vy), off); off += 2;
	}

	// ─── PADDLES ────────────────────────────────────────────────────
	buf.writeUInt16LE(paddleCount, off); off += 2;
	for (const p of paddles) {
		buf.writeUInt16LE(p.id, off); off += 2;
		buf.writeInt16LE(floatToFixed(p.offset), off); off += 2;
		buf.writeUInt8(p.isConnected ? 1 : 0, off); off += 1;
		buf.writeUInt8(0, off); off += 1; // padding
	}

	// ─── FLAGS ──────────────────────────────────────────────────────
	buf.writeUInt8(isPaused ? 1 : 0, off); off += 1;
	buf.writeUInt8(isGameOver ? 1 : 0, off); off += 1;

	// ─── SCORE TABLE ────────────────────────────────────────────────
	buf.writeUInt16LE(scoreCount, off); off += 2;
	for (const [pid, sc] of scoreEntries) {
		buf.writeUInt16LE(pid, off); off += 2;
		buf.writeUInt16LE(sc, off); off += 2;
	}

	return buf;
}
// 1) BUILD / ENCODE
export function makeFullessage(
	gameId,
	tick,
	balls,
	paddles,
	isPaused,
	isGameOver,
	scores,
) {
	const builder = new flatbuffers.Builder(1024);

	// Balls
	const ballOffs = balls.map(b =>
		Ball.createBall(builder, b.id, b.x, b.y, b.vx, b.vy)
	);
	const ballsVec = FullcreateBallsVector(builder, ballOffs);

	// Paddles
	const paddleOffs = paddles.map(p =>
		Paddle.createPaddle(builder, p.id, p.offset, p.isConnected)
	);
	const paddlesVec = FullcreatePaddlesVector(builder, paddleOffs);

	// Scores
	const scoreOffs = scores.map(s =>
		ScoreEntry.createScoreEntry(builder, s.playerId, s.score)
	);
	const scoresVec = FullcreateScoresVector(builder, scoreOffs);

	// Fulltable
	FullstartFullbuilderState();
	FulladdGameId(builder, gameId);
	FulladdTick(builder, tick);
	FulladdBalls(builder, ballsVec);
	FulladdPaddles(builder, paddlesVec);
	FulladdIsPaused(builder, isPaused);
	FulladdIsGameOver(builder, isGameOver);
	FulladdScores(builder, scoresVec);
	const root = FullendFullbuilderState();

	builder.finish(root);
	return builder.asUint8Array();
}

// 2) PARSE / DECODE
export function parseFullessage(buffer) {
	const bb = new flatbuffers.ByteBuffer(buffer);
	const msg = FullgetRootAsFull(bb);

	return {
		gameId: msg.gameId(),
		tick: msg.tick(),
		isPaused: msg.isPaused(),
		isGameOver: msg.isGameOver(),
		balls: Array.from({ length: msg.ballsLength() }, (_, i) => {
			const b = msg.balls(i);
			return { id: b.id(), x: b.x(), y: b.y(), vx: b.vx(), vy: b.vy() };
		}),
		paddles: Array.from({ length: msg.paddlesLength() }, (_, i) => {
			const p = msg.paddles(i);
			return { id: p.id(), offset: p.offset(), isConnected: p.isConnected() };
		}),
		scores: Array.from({ length: msg.scoresLength() }, (_, i) => {
			const s = msg.scores(i);
			return { playerId: s.playerid(), score: s.score() };
		})
	};
}
