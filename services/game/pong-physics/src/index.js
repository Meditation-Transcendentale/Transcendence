// services/game/pong-physics/src/index.js
import { connect, JSONCodec } from 'nats';
import dotenv from 'dotenv';
dotenv.config();
import { Physics } from './Physics.js';
import {
	decodePhysicsRequest,
	encodePhysicsResponse,
} from './message.js';

const SERVICE_NAME = process.env.SERVICE_NAME || 'pong-physics';
const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';
const jc = JSONCodec();
const endedGames = new Set();

/**
 * Start the Pong‐physics service:
 *  1. Connect to NATS
 *  2. Subscribe to end, input, and tick subjects
 *  3. Dispatch messages into the Physics engine
 */

async function start() {
	const nc = await connect({ servers: NATS_URL });
	console.log(`[${SERVICE_NAME}] connected to NATS`);

	/**
	   * Handle game end events by tearing down state
	   * @param {import('nats').Msg} msg
	   */

	const endSub = nc.subscribe('game.pong.end');
	(async () => {
		for await (const msg of endSub) {
			const { gameId } = jc.decode(msg.data);
			endedGames.add(gameId);
			Physics.removeGame(gameId);
			console.log(`[${SERVICE_NAME}] Stopped processing for game ${gameId}`);
		}
	})();

	/**
	  * Handle incoming player inputs immediately
	  * @param {import('nats').Msg} msg
	  */
	const inputSub = nc.subscribe('game.pong.input');
	(async () => {
		for await (const msg of inputSub) {
			// console.log(`[${SERVICE_NAME}] Received input message`);
			const { gameId, inputs } = jc.decode(msg.data);

			if (endedGames.has(gameId)) continue;

			for (const entry of inputs) {
				const playerId = entry.playerId;
				const actualInput = entry.input ?? { type: entry.type };

				Physics.handleImmediateInput({
					gameId,
					inputs: [{ playerId, input: actualInput }]
				});
			}
		}
	})();

	/**
	   * Process each tick: run physics and publish new state
	   * @param {import('nats').Msg} msg
	   */

	// message FullState {
	//   uint32            gameId     = 1;
	//   uint32            tick       = 2;
	//   repeated Ball     balls      = 3;
	//   repeated Paddle   paddles    = 4;
	//   bool              isPaused   = 5;
	//   bool              isGameOver = 6;
	//   repeated ScoreEntry scores   = 7;
	// }
	// message PhysicsResponse {
	//   FullState newState = 1;
	//   string    error    = 2;                  // optional error
	//   bool      goalScored = 3;    // true if a goal happened this tick
	//   string    scorerId   = 4;    // which player scored
	// }
	// 							events.push({ type: 'goal', gameId, playerId: scorer });

	const sub = nc.subscribe('games.*.*.physics.request');
	for await (const msg of sub) {
		const data = decodePhysicsRequest(msg.data);

		if (endedGames.has(data.gameId)) {
			console.log(`[${SERVICE_NAME}] Ignoring tick ${data.tick} for ended game ${data.gameId}`);
			continue;
		}

		const { gameId, tick, balls, paddles, events } = Physics.processTick(data);
		let scorerId = null;
		let goalScored = false;
		if (events && events.length) {
			for (const ev of events) {
				if (ev.type === 'goal') {
					goalScored = true;
					scorerId = ev.playerId;
				}
			}
		}
		const buffer = encodePhysicsResponse({ gameId, tick, balls, paddles, isPaused: data.isPaused, isGameOver: data.isGameOver, scores: data.scores }, "", goalScored, scorerId);
		msg.respond(buffer);
	}
}

start();
