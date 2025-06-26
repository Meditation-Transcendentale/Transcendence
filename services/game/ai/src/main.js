import { GameStateNode } from './GameStateNode.js';
import { minmax } from './minmax.js';
import { expand } from './expand.js';
import { predictBallPosition } from './physics.js';
import { STEP_SIZE } from './constants.js';

const ballPos = [0, 1];
const ballVel = [-1, 0.5];
const aiPaddlePos = 2;
const playerPaddlePos = 0;

const isAITurn = ballVel[0] < 0;
const phase = isAITurn ? "offense" : "defense";
const [predictedPos] = predictBallPosition(ballPos, ballVel);

console.log(predictedPos);

// const root = new GameStateNode(ballPos, ballVel, aiPaddlePos, playerPaddlePos, predictedPos);
// root.depth = 0;

// expand(root);

// let bestScore = -Infinity;
// let bestNode = null;

// for (const child of root.children) {
//   const score = minmax(child, 1, -Infinity, Infinity, !isAITurn);
//   if (score > bestScore) {
//     bestScore = score;
//     bestNode = child;
//   }
// }

// const finalTargetY = bestNode.aiPaddlePos;

// console.log("Best Node Target Y:", finalTargetY.toFixed(2));
// console.log("Current Y:", aiPaddlePos.toFixed(2));
// console.log("Delta Y:", (finalTargetY - aiPaddlePos).toFixed(2));