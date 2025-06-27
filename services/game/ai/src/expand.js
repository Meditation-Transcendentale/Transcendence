import { GameStateNode } from './GameStateNode.js';
import { predictBallState } from './physics.js';
import { BALL_ACCELERATION, STEP_SIZE, PADDLE_HEIGHT, MAP_HEIGHT, WALL_SIZE } from './constants.js';
import { evaluateNode } from './evaluate.js';

function generateFullRange() {
  const lower = -(MAP_HEIGHT + PADDLE_HEIGHT + WALL_SIZE) * 0.5;
  const upper = (MAP_HEIGHT - PADDLE_HEIGHT - WALL_SIZE) * 0.5;
  const range = [];
  for (let y = lower; y <= upper; y += STEP_SIZE) {
    range.push(Math.round(y * 100) / 100);
  }
  return range;
}

export function expand(node) {
  const children = [];
  const isAIMove = node.ballVel[0] > 0;
  const targetY = node.futureBallState[1];
  const newVelX = node.ballVel[0] * -BALL_ACCELERATION;
  const paddlePositions = generateFullRange();
  for (const paddlePos of paddlePositions) {
    const dy = paddlePos - targetY;
    const directionMatch = Math.sign(dy) === Math.sign(node.ballVel[1]);
    const newVelY = node.ballVel[1] * (directionMatch ? -BALL_ACCELERATION : BALL_ACCELERATION) * Math.abs(dy);
    if (!Number.isFinite(newVelY)) {
      console.warn("Invalid newVelY", {
        paddlePos,
        targetY,
        dy,
        ballVelY: node.ballVel[1],
        directionMatch
      });
    }
    const newBallVel = [newVelX, newVelY];
    if (!Number.isFinite(newBallVel[0]) || !Number.isFinite(newBallVel[1])) {
      console.warn("Invalid newBallVel", newBallVel);
    }

    const futureBallState = predictBallState(node.futureBallState, newBallVel);

    const aiPaddle = isAIMove ? paddlePos : node.aiPaddlePos;
    const playerPaddle = isAIMove ? node.playerPaddlePos : paddlePos;

    const child = new GameStateNode(
      node.futureBallState,
      aiPaddle,
      playerPaddle,
      futureBallState
    );

    children.push(child);
  }
  return children;
}