import { weightsProfiles } from './weightsProfiles.js';
import { GameStateNode } from './GameStateNode.js';
import { predictBallState } from './physics.js';
import { expand } from './expand.js';
import { runMinmax } from './minmax.js';
import { evaluateNode } from './evaluate.js';

const initialBallStates = [
  { ballPos: [-2, 3], ballVel: [0.15, 0.1] },
  { ballPos: [2, -4], ballVel: [-0.12, 0.2] },
  { ballPos: [0, 0], ballVel: [0.2, 0] },
  { ballPos: [-1, 4.5], ballVel: [0.1, -0.3] },
  { ballPos: [-2, 4.7], ballVel: [0.12, -0.05] },
  { ballPos: [-3, -1], ballVel: [0.1, 0.5] }
];

initialBallStates.forEach((initialBallState, ballIndex) => {
    console.log(`\n--- Test #${ballIndex} | Depth=${2} | ---`);
    console.log(`Initial Ball Pos: ${initialBallState.ballPos}`);
    console.log(`Initial Ball Vel: ${initialBallState.ballVel}\n`);
    weightsProfiles.forEach((weights, profileIndex) => {
      const futureBallState = predictBallState(initialBallState.ballPos, initialBallState.ballVel);

      const root = new GameStateNode(
        initialBallState,
        0, // AI paddle position
        0, // Player paddle position
        futureBallState
      );

      console.log(`\nProfile=${profileIndex}`);

      const best = runMinmax(root, 2, true, profileIndex);

      console.log(`--- Decision ---`);
      console.log(`Best Value: ${best.value}`);
      console.log(`Chosen Next Node:`);
      console.log(`Ball Pos: ${best.node.ballState.ballPos}`);
      console.log(`Ball Vel: ${best.node.ballState.ballVel}`);
      console.log(`AI Paddle: ${best.node.aiPaddlePos}`);
      console.log(`Player Paddle: ${best.node.playerPaddlePos}`);
    });
    console.log("\n");
});
