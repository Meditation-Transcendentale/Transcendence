/*
	* ball data
	*
	* ID
	* Position X
	* Position Y
	* Velocity X
	* Velocity Y
	*
	* paddle data
	* 
	* ID
	* Offset
	* isConnected
*/
const SCALE = 10;
function floatToFixed(num) {
	// if (isNaN(num)) {
	// 	console.warn("Invalid numeric value in floatToFixed:", num);
	// }
	return Math.round(num * SCALE);
}
function fixedToFloat(fixed) {
	return fixed / SCALE;
}

export function encodeStateUpdate(gameId, tick, balls, paddles) {
	const messageType = 1;
	const ballCount = balls.length;
	const paddleCount = paddles.length;

	// Header: messageType (1 byte) + gameId (4 bytes) + tick (4 bytes)
	const headerSize = 1 + 4 + 4;
	const ballCountSize = 2;
	const ballEntrySize = 10;
	const paddleCountSize = 2;
	const paddleEntrySize = 6;

	const totalSize = headerSize + ballCountSize + (ballCount * ballEntrySize)
		+ paddleCountSize + (paddleCount * paddleEntrySize);

	const buffer = Buffer.alloc(totalSize);
	let offset = 0;

	// Write header
	buffer.writeUInt8(messageType, offset);
	offset += 1;
	buffer.writeUInt32LE(gameId, offset);
	offset += 4;
	buffer.writeUInt32LE(tick, offset);
	offset += 4;

	// Ball count
	buffer.writeUInt16LE(ballCount, offset);
	offset += 2;

	// Write each ball update
	for (const ball of balls) {
		buffer.writeUInt16LE(ball.id, offset);
		offset += 2;
		buffer.writeInt16LE(floatToFixed(ball.x), offset);
		offset += 2;
		buffer.writeInt16LE(floatToFixed(ball.y), offset);
		offset += 2;
		// console.log(ball.vx, ball.vx * 100);
		buffer.writeInt16LE(floatToFixed(ball.vx), offset);
		offset += 2;
		buffer.writeInt16LE(floatToFixed(ball.vy), offset);
		offset += 2;
	}

	// Paddle count
	buffer.writeUInt16LE(paddleCount, offset);
	offset += 2;

	// Write each paddle update
	for (const paddle of paddles) {
		buffer.writeUInt16LE(paddle.id, offset);
		offset += 2;
		const paddleOffsetVal = floatToFixed(paddle.offset);
		// console.log("here", paddle.offset);
		buffer.writeInt16LE(paddleOffsetVal, offset);
		offset += 2;
		buffer.writeInt16LE(floatToFixed(paddle.isConnected), offset);
		offset += 2;
	}

	return buffer;
}

export function decodeStateUpdate(buffer) {
	let offset = 0;
	const messageType = buffer.readUInt8(offset);
	offset += 1;

	if (messageType !== 1) {
		throw new Error("Invalid message type: Expected 1 for state update");
	}

	const gameId = buffer.readUInt32LE(offset);
	offset += 4;
	const tick = buffer.readUInt32LE(offset);
	offset += 4;

	const ballCount = buffer.readUInt16LE(offset);
	offset += 2;
	const balls = [];
	for (let i = 0; i < ballCount; i++) {
		const id = buffer.readUInt16LE(offset);
		offset += 2;
		const x = fixedToFloat(buffer.readInt16LE(offset));
		offset += 2;
		const y = fixedToFloat(buffer.readInt16LE(offset));
		offset += 2;
		const vx = fixedToFloat(buffer.readInt16LE(offset));
		offset += 2;
		const vy = fixedToFloat(buffer.readInt16LE(offset));
		offset += 2;
		balls.push({ id, x, y, vx, vy });
	}

	const paddleCount = buffer.readUInt16LE(offset);
	offset += 2;
	const paddles = [];
	for (let j = 0; j < paddleCount; j++) {
		const id = buffer.readUInt16LE(offset);
		offset += 2;
		const paddleOffsetVal = fixedToFloat(buffer.readInt16LE(offset));
		offset += 2;
		const isConnected = fixedToFloat(buffer.readInt16LE(offset));
		offset += 2;
		paddles.push({ id, offset: paddleOffsetVal, isConnected });
	}

	return { gameId, tick, balls, paddles };
}

// ws.binaryType = 'arraybuffer';
// ws.onmessage = (event) => {
//   const arrayBuffer = event.data;
//   // Convert ArrayBuffer to Buffer (if using a bundler or appropriate polyfill)
//   const buffer = Buffer.from(new Uint8Array(arrayBuffer));
//
//   // Decode the state update message.
//   const { balls, paddles } = decodeStateUpdate(buffer);
//   console.log("Balls:", balls);
//   console.log("Paddles:", paddles);
// };
//
