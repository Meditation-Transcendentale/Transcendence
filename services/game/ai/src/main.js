import { weightsProfiles } from './weightsProfiles.js';
import { GameStateNode } from './GameStateNode.js';
import { predictBallState } from './physics.js';
import { expand } from './expand.js';
import { runMinmax } from './minmax.js';
import { evaluateNode } from './evaluate.js';
import {
  heuristic_time_to_intercept,
  heuristic_return_angle_variability,
  heuristic_opponent_disruption,
  heuristic_center_bias_correction,
  heuristic_entropy_reaction,
  heuristic_consistency
} from './heuristics.js';

function logHeuristics(node) {
  const isAIMove = node.ballState.ballVel[0] > 0;
  const myPaddleY = isAIMove ? node.aiPaddlePos : node.playerPaddlePos;
  const oppPaddleY = isAIMove ? node.playerPaddlePos : node.aiPaddlePos;
  const predictedY = node.futureBallState.ballPos[1];

  const log = (name, val) => console.log(`${name.padEnd(30)}: ${val.toFixed(3)}`);

  console.log(`\n--- HEURISTICS FOR BEST NODE ---`);
  log("time_to_intercept", heuristic_time_to_intercept(node, myPaddleY));
  log("return_angle_variability", heuristic_return_angle_variability(node));
  log("opponent_disruption", heuristic_opponent_disruption(node, oppPaddleY));
  log("center_bias_correction", heuristic_center_bias_correction(node));
  log("entropy_reaction", heuristic_entropy_reaction(node, oppPaddleY));
  log("consistency", heuristic_consistency(node));
  // log("distance_to_return", heuristic_distance_to_predicted_return(node, predictedY));
}


const initialBallState = {
  ballPos: [-2, -3],
  ballVel: [0.12, 0.3]
};

const futureBallState = predictBallState(initialBallState.ballPos, initialBallState.ballVel);

const root = new GameStateNode(
  initialBallState,
  0, // AI paddle position
  0, // Player paddle position
  futureBallState
);

console.log(`Initial state:${root.ballState.ballPos}|${root.ballState.ballVel}|${root.futureBallState.ballPos}|${root.futureBallState.ballVel}`)

// weightsProfiles.forEach((_, profileIndex) => {
  // console.log(`\n--- PROFILE ${profileIndex} ---`);

  const result = runMinmax(root, 3, true, 0);

  console.log(`Best Score:    ${result.value}`);
  console.log(`AI Paddle:     ${result.node.aiPaddlePos.toFixed(2)}`);
  console.log(`Ball Pos:      [${result.node.ballState.ballPos.map(n => n.toFixed(2)).join(', ')}]`);
  console.log(`Ball Vel:      [${result.node.ballState.ballVel.map(n => n.toFixed(2)).join(', ')}]`);
  console.log(`Future Pos:    [${result.node.futureBallState.ballPos.map(n => n.toFixed(2)).join(', ')}]`);
  console.log(`Future Vel:    [${result.node.futureBallState.ballVel.map(n => n.toFixed(2)).join(', ')}]`);

  logHeuristics(result.node);
// });
