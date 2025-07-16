import { GameStateNode } from './GameStateNode.js';
import { predictBallState } from './physics.js';
import { BALL_ACCELERATION, STEP_SIZE, PADDLE_HEIGHT, MAP_HEIGHT, WALL_SIZE, PADDLE_AI_X, PADDLE_WIDTH, BALL_DIAM } from './constants.js';
import { evaluateNode } from './evaluate.js';
import { i } from './main.js';

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
  const newVelX = -node.futureBallState.ballVel[0] * BALL_ACCELERATION;
      
  const isAIMove = node.futureBallState.ballVel[0] >= 0;
  const targetY = node.futureBallState.ballPos[1];
  const paddlePositions = generateFullRange();
  
  const angleFactor = 0.5;

  for (const paddlePos of paddlePositions) {
    const offset = targetY - paddlePos;
    const newVelY = offset * angleFactor;

    const newBallVel = [newVelX, newVelY];
    const futureBallState = predictBallState(node.futureBallState.ballPos, newBallVel);
    const aiPaddle = isAIMove ? paddlePos : node.aiPaddlePos;
    const playerPaddle = isAIMove ? node.playerPaddlePos : paddlePos;

    const newBallState = {
      ballPos: [...node.futureBallState.ballPos],
      ballVel: [...node.futureBallState.ballVel]
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
