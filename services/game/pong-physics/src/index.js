// services/game/pong-physics/src/index.js
import { connect } from 'nats';
import dotenv from 'dotenv';
dotenv.config();
import { Physics } from './Physics.js';
import {
	decodePhysicsRequest,
	encodePhysicsResponse,
} from './proto/helper.js';

const SERVICE_NAME = process.env.SERVICE_NAME || 'pong-physics';
const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';
const endedGames = new Set();

const handleEnd = async (sub) => {
	for await (const msg of sub) {
		const [, , gameId] = msg.subject.split('.');
		endedGames.add(gameId);
		Physics.removeGame(gameId);
		console.log(`[${SERVICE_NAME}] Stopped processing for game ${gameId}`);
	}
}

const handlePhysicsRequest = async (sub) => {
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
		let goal = null;
		if (goalScored)
			goal = { scorerId };
		const buffer = encodePhysicsResponse({ gameId, tick, balls, paddles, goal });
		msg.respond(buffer);
	}
};

async function start() {
	const nc = await connect({ servers: NATS_URL });
	console.log(`[${SERVICE_NAME}] connected to NATS`);

	/**
	   * Handle game end events by tearing down state
	   * @param {import('nats').Msg} msg
	   */

	const endLocal = nc.subscribe('games.local.*.match.end');
	const endIa = nc.subscribe('games.ia.*.match.end');
	const endOnline = nc.subscribe('games.online.*.match.end');
	handleEnd(endLocal);
	handleEnd(endIa);
	handleEnd(endOnline);

	const subLocal = nc.subscribe("games.local.*.physics.request");
	const subIA = nc.subscribe("games.ia.*.physics.request");
	const subOnline = nc.subscribe("games.online.*.physics.request");

	handlePhysicsRequest(subLocal);
	handlePhysicsRequest(subIA);
	handlePhysicsRequest(subOnline);
}

start();
