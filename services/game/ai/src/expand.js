import { GameStateNode } from './GameStateNode.js';
import { predictBallPosition } from './physics.js';
import { BALL_ACCELERATION, STEP_SIZE, PADDLE_HEIGHT, MAP_HEIGHT, WALL_SIZE } from './constants.js';
import { evaluateNode } from './evaluate.js';

function generateFullRange(predictedY) {
  const lower = -(MAP_HEIGHT + PADDLE_HEIGHT + WALL_SIZE) * 0.5;
  const upper = (MAP_HEIGHT - PADDLE_HEIGHT - WALL_SIZE) * 0.5;
  const range = [];
  for (let y = lower; y <= upper; y += STEP_SIZE) {
    range.push(Math.round(y * 100) / 100);
  }
  return range;
}

export function expand(node) {
  const paddlePositions = generateFullRange(node.nextBallPos[1]);
  for (const paddlePos of paddlePositions) {
    const inRange = Math.abs(paddlePos - node.nextBallPos[1]) <= PADDLE_HEIGHT / 2;

    if (!inRange) continue;

    const distance = Math.abs(paddlePos - node.nextBallPos[1]);
    const newVelY = node.ballVel[1] * (Math.sign(paddlePos - node.nextBallPos[1]) === Math.sign(node.ballVel[1]) ? -BALL_ACCELERATION : BALL_ACCELERATION) * distance;
    const newBallVel = [node.ballVel[0] * -BALL_ACCELERATION, newVelY];
    const [futureBallPos, newVel] = predictBallPosition(node.nextBallPos, newBallVel);

    const newNode = (node.ballVel[0] < 0)
      ? new GameStateNode(node.nextBallPos, newVel, paddlePos, node.playerPaddlePos, futureBallPos)
      : new GameStateNode(node.nextBallPos, newVel, node.aiPaddlePos, paddlePos, futureBallPos);

    [newNode.alpha, newNode.beta] = evaluateNode(newNode);
    newNode.parent = node;
    node.children.push(newNode);
  }
}