import { weightsProfiles } from './weightsProfiles.js';
import { GameStateNode } from './GameStateNode.js';
import { predictBallState } from './physics.js';
import { runMinmax } from './minmax.js';

export let i = 0;

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
    const futureBallState = predictBallState(initialBallState.ballPos, initialBallState.ballVel);
    console.log(`Future Ball Pos: ${futureBallState.ballPos}`);
    weightsProfiles.forEach((weights, profileIndex) => {

      const root = new GameStateNode(
        initialBallState,
        0, // AI paddle position
        0, // Player paddle position
        futureBallState
      );
      root.i = 0;
      console.log(`\nProfile=${profileIndex}`);

      const best = runMinmax(root, 2, initialBallState.ballVel[0] >= 0, profileIndex);

      console.log(`--- Decision ---`);
      console.log(`Best Value: ${best.value}`);
      console.log(`Chosen Next Node:`);
      console.log(`Ball Pos: ${best.node.ballState.ballPos}`);
      console.log(`Ball Vel: ${best.node.ballState.ballVel}`);
      console.log(`AI Paddle: ${best.node.aiPaddlePos}`);
      console.log(`Player Paddle: ${best.node.playerPaddlePos}`);
      console.log(`Ball Pos: ${best.node.futureBallState.ballPos}`);
      console.log(`Ball Vel: ${best.node.futureBallState.ballVel}`);


      console.log(`Number of node: ${root.i}`);
    });
    console.log("\n");
});
