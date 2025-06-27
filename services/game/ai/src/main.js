import { GameStateNode } from './GameStateNode.js';
import { minmax } from './minmax.js';
import { expand } from './expand.js';
import { predictBallState } from './physics.js';
import { STEP_SIZE } from './constants.js';

const initialBallPos = [0, 0];
const initialBallVel = [5, 5];
const futureBallState = predictBallState(initialBallPos, initialBallVel);

console.log("Initial futureBallState:", futureBallState);

const initialBallState = [initialBallPos[0], initialBallPos[1], initialBallVel[0], initialBallVel[1]];

const root = new GameStateNode(
  initialBallState,
  0, // ai paddle
  0, // player paddle
  futureBallState
);

const result = minmax(root, 2, -Infinity, Infinity, true);

console.log("Best score:", result.value);
console.log("Chosen impact Y:", result.node.futureBallState[1]);
console.log("AI paddle pos:", result.node.aiPaddlePos);
console.log("Player paddle pos:", result.node.playerPaddlePos);