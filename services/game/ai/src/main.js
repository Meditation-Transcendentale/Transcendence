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

const DEPTHS = [1, 2];

initialBallStates.forEach((initialBallState, ballIndex) => {
  DEPTHS.forEach((DEPTH) => {
    weightsProfiles.forEach((weights, profileIndex) => {
      const futureBallState = predictBallState(initialBallState.ballPos, initialBallState.ballVel);

      const root = new GameStateNode(
        initialBallState,
        0, // AI paddle position
        0, // Player paddle position
        futureBallState
      );

      console.log(`\n--- Test #${ballIndex} | Depth=${DEPTH} | Profile=${profileIndex} ---`);
      console.log(`Initial Ball Pos: ${root.ballState.ballPos}`);
      console.log(`Initial Ball Vel: ${root.ballState.ballVel}`);
      console.log(`AI Paddle: ${root.aiPaddlePos}`);
      console.log(`Player Paddle: ${root.playerPaddlePos}`);

      const best = runMinmax(root, DEPTH, true, profileIndex);

      console.log(`--- Decision ---`);
      console.log(`Best Value: ${best.value}`);
      console.log(`Chosen Next Node:`);
      console.log(`Ball Pos: ${best.node.ballState.ballPos}`);
      console.log(`Ball Vel: ${best.node.ballState.ballVel}`);
      console.log(`AI Paddle: ${best.node.aiPaddlePos}`);
      console.log(`Player Paddle: ${best.node.playerPaddlePos}`);
    });
  });
});