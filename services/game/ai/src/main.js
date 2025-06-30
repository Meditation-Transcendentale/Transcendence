import { weightsProfiles } from './weightsProfiles.js';
import { GameStateNode } from './GameStateNode.js';
import { predictBallState } from './physics.js';
import { expand } from './expand.js';
import { minmax } from './minmax.js';
import { evaluateNode } from './evaluate.js';

const initialBallState = {
  ballPos: [0, 0],
  ballVel: [0.2, 0.5]
};

const futureBallState = predictBallState(initialBallState.ballPos, initialBallState.ballVel);

const root = new GameStateNode(
  initialBallState,
  0, // AI paddle position
  0, // Player paddle position
  futureBallState
);

weightsProfiles.forEach((_, profileIndex) => {
  console.log(`\n--- PROFILE ${profileIndex} ---`);

  const result = minmax(root, 2, -Infinity, Infinity, true, profileIndex);

  console.log(`Best Score:    ${result.value.toFixed(3)}`);
  console.log(`AI Paddle:     ${result.node.aiPaddlePos.toFixed(2)}`);
  console.log(`Ball Pos:      [${result.node.ballState.ballPos.map(n => n.toFixed(2)).join(', ')}]`);
  console.log(`Ball Vel:      [${result.node.ballState.ballVel.map(n => n.toFixed(2)).join(', ')}]`);
  console.log(`Future Pos:    [${result.node.futureBallState.ballPos.map(n => n.toFixed(2)).join(', ')}]`);
  console.log(`Future Vel:    [${result.node.futureBallState.ballVel.map(n => n.toFixed(2)).join(', ')}]`);
});
