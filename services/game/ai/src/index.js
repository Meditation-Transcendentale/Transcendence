import dotenv from 'dotenv';
import natsClient from '../../game-manager/src/natsClient';
import { decodeStateUpdate } from './proto/helper';
import GameStateNode from './GameStateNode';
import topLevelSearch from './bstar';

dotenv.config();

const SERVICE_NAME = process.env.SERVICE_NAME || 'service';
const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';

async function main() {
	console.log (`[${SERVICE_NAME}]: started`);
	const nc = await natsClient.connect(NATS_URL);

	const subGetState = nc.subscribe(`games.ia.*.match.state`);
	(async () => {
		for await (const msg of subGetState) {
			const [, , gameId] = msg.subject.split('.');
			const state = decodeStateUpdate(msg.data);
			const nextPosition = processState(state);
			processMove(nextPosition);
		}
	})();
	console.log(`[${SERVICE_NAME}] NATS subscriptions established`);
}

// async function processState (state) {
// 	const ballState = {	
// 		ballPos: { x_b: state.ball.x, y_b: state.ball.y },
// 		ballVel: { vx_b: state.ball.vx, vy_b: state.ball.vy}
// 	};
// 	const aiPaddlePos = state.paddles[0].move
// 	const playerPaddlePos = 
// 	const root = GameStateNode(ballState, )
// }

async function start() {
	const nc = await connect({ servers: NATS_URL });
	console.log(`[${SERVICE_NAME}] connected to NATS`);

	const sub = nc.subscribe(`${SERVICE_NAME}.ping`);
	for await (const msg of sub) {
		console.log(`${SERVICE_NAME} received:`, msg.data.toString());
		nc.publish(`${SERVICE_NAME}.pong`, Buffer.from(`pong from ${SERVICE_NAME}`));
	}
}

start();
