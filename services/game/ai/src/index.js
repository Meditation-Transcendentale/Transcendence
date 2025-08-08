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

	const am = new AiManager();
	await am.init(NATS_URL);

	am.start();

	console.log(`[${SERVICE_NAME}] NATS subscriptions established`);
}

main().catch(err => {
	console.error (`[${SERVICE_NAME}] fatal error: ${err}.`);
	process.exit(1);
})

// async function processState (state) {
// 	const ballState = {	
// 		ballPos: { x_b: state.ball.x, y_b: state.ball.y },
// 		ballVel: { vx_b: state.ball.vx, vy_b: state.ball.vy}
// 	};
// 	const aiPaddlePos = state.paddles[0].move
// 	const playerPaddlePos = 
// 	const root = GameStateNode(ballState, )
// }
