import { GameStateNode } from './GameStateNode.js';
import { predictBallState } from './physics.js';
import { BALL_ACCELERATION, STEP_SIZE, PADDLE_HEIGHT, MAP_HEIGHT, WALL_SIZE } from './constants.js';
import { evaluateNode } from './evaluate.js';

function generateFullRange() {
  const lower = -(MAP_HEIGHT - PADDLE_HEIGHT - WALL_SIZE) * 0.5;
  const upper =  (MAP_HEIGHT - PADDLE_HEIGHT - WALL_SIZE) * 0.5;
  const range = [];
  for (let y = lower; y <= upper; y += STEP_SIZE) {
    range.push(Math.round(y * 100) / 100);
  }
  console.log ("LOWER:", lower, "UPPER:", upper)
  return range;
}

export function expand(node) {
  const children = [];
  const isAIMove = node.ballState.ballVel[0] > 0;

  const targetY = node.futureBallState.ballPos[1];
  const newVelX = node.ballState.ballVel[0] * -BALL_ACCELERATION;
  const paddlePositions = generateFullRange();

  for (const paddlePos of paddlePositions) {
    const offset = paddlePos - targetY;

    const angleFactor = 0.05;
    const newVelY = node.ballState.ballVel[1] + offset * angleFactor;

    const newBallVel = [newVelX, newVelY];
    const futureBallState = predictBallState(node.futureBallState.ballPos, newBallVel);

    const aiPaddle = isAIMove ? paddlePos : node.aiPaddlePos;
    const playerPaddle = isAIMove ? node.playerPaddlePos : paddlePos;

    const newBallState = {
      ballPos: [...node.futureBallState.ballPos],
      ballVel: [newVelX, newVelY]
    };

    const child = new GameStateNode(
      newBallState,
      aiPaddle,
      playerPaddle,
      futureBallState
    );

    children.push(child);
  }

  return children;
}