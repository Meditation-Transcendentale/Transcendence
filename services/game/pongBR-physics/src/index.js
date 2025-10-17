// services/game/pong-physics/src/index.js
import { connect } from 'nats';
import dotenv from 'dotenv';
dotenv.config();
import { Physics } from './Physics.js';
import {
	decodePhysicsRequest,
	decodePhysicsResponse,
	encodePhysicsResponse,
} from './proto/helper.js';

const SERVICE_NAME = process.env.SERVICE_NAME || 'pongbr-physics';
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

const handlePlayerEliminate = async (sub) => {
	for await (const msg of sub) {
		const [, , gameId] = msg.subject.split('.');
		const { uuid } = JSON.parse(new TextDecoder().decode(msg.data));

		if (endedGames.has(gameId)) {
			console.log(`[${SERVICE_NAME}] Ignoring elimination for ended game ${gameId}`);
			continue;
		}

		const gameEngine = Physics.games.get(gameId);
		if (gameEngine) {
			// Find player by checking the players array from game manager
			// Since we don't have direct access here, we'll need to find by paddle index
			// For now, we'll eliminate by player ID directly
			const playerId = parseInt(uuid); // Assuming uuid maps to player ID
			console.log(`[${SERVICE_NAME}] Manually eliminating player ${playerId} from game ${gameId}`);
			gameEngine.gameState.eliminatePlayer(playerId, -1); // -1 indicates manual elimination
			gameEngine.convertPaddleToWall(playerId);
		}
	}
}

const handlePhysicsRequest = async (sub) => {
	for await (const msg of sub) {
		const data = decodePhysicsRequest(msg.data);

		if (endedGames.has(data.gameId)) {
			console.log(`[${SERVICE_NAME}] Ignoring tick ${data.tick} for ended game ${data.gameId}`);
			continue;
		}

		const { gameId, tick, balls, paddles, stage, ranks, end, events, gameState } = Physics.processTick({ gameId: data.gameId, tick: data.tick, inputs: data.input });
		let goal = null;
		const buffer = encodePhysicsResponse({ gameId, tick, balls, paddles, goal, ranks, stage, end, events, gameState });
		msg.respond(buffer);
	}
};

async function start() {
	const nc = await connect({
		servers: NATS_URL,
		token: process.env.NATS_GAME_TOKEN,
		tls: { rejectUnauthorized: false }
	});
	console.log(`[${SERVICE_NAME}] connected to NATS`);

	const endBr = nc.subscribe('games.br.*.match.end');
	handleEnd(endBr);

	const eliminateBr = nc.subscribe('games.br.*.player.eliminate');
	handlePlayerEliminate(eliminateBr);

	const subBr = nc.subscribe("games.br.*.physics.request");

	handlePhysicsRequest(subBr);
}

start();



