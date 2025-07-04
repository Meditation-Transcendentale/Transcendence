import { GameStateNode } from './GameStateNode.js';
import { predictBallState } from './physics.js';
import { BALL_ACCELERATION, STEP_SIZE, PADDLE_HEIGHT, MAP_HEIGHT, WALL_SIZE, PADDLE_AI_X } from './constants.js';
import { evaluateNode } from './evaluate.js';

function generateFullRange() {
  const lower = -(MAP_HEIGHT - PADDLE_HEIGHT - WALL_SIZE) * 0.5;
  const upper = (MAP_HEIGHT - PADDLE_HEIGHT - WALL_SIZE) * 0.5;
  const range = [];
  for (let y = lower; y <= upper; y += STEP_SIZE) {
    range.push(Math.round(y * 100) / 100);
  }
  return range;
}

export function expand(node) {
  const children = [];
  const isAIMove = node.ballState.ballVel[0] >= 0;

  let newVelX;
  const targetY = node.futureBallState.ballPos[1];
  if (Math.abs(node.ballState.ballPos[0]) !== PADDLE_AI_X)
    newVelX = node.ballState.ballVel[0];
  else
    newVelX = -node.ballState.ballVel[0] * BALL_ACCELERATION;
  const paddlePositions = generateFullRange();

  for (const paddlePos of paddlePositions) {
    const offset = targetY - paddlePos;

    const angleFactor = 0.5;
    const newVelY = offset * angleFactor;

    const newBallVel = [newVelX, newVelY];
    const futureBallState = predictBallState(node.futureBallState.ballPos, newBallVel);

    const aiPaddle = isAIMove ? paddlePos : node.aiPaddlePos;
    const playerPaddle = isAIMove ? node.playerPaddlePos : paddlePos;

    const newBallState = {
      ballPos: [...node.futureBallState.ballPos],
      ballVel: [newVelX, newVelY]
    };

    const dx = Math.abs(futureBallState.ballPos[0] - node.futureBallState.ballPos[0]);
    const vx = Math.abs(newBallVel[0]);
    const framesToCollision = vx > 0 ? dx / vx : 0;

    const child = new GameStateNode(
      newBallState,
      aiPaddle,
      playerPaddle,
      futureBallState
    );
    child.framesToCollision = framesToCollision;
    children.push(child);
  }

  return children;
}