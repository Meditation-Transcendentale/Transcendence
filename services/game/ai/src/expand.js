import { GameStateNode } from './GameStateNode.js';
import { predictBallState } from './physics.js';
import { BALL_ACCELERATION, STEP_SIZE, PADDLE_HEIGHT, MAP_HEIGHT, WALL_SIZE, PADDLE_AI_X, PADDLE_WIDTH, BALL_DIAM } from './constants.js';
import { evaluateNode } from './evaluate.js';


/**
 * Generate a range of Y positions around the position where the ball should cross the goal
 * @returns the range of Y positions
 */
function generateFullRange() {
  const lower = -(MAP_HEIGHT - PADDLE_HEIGHT - WALL_SIZE) * 0.5;
  const upper = (MAP_HEIGHT - PADDLE_HEIGHT - WALL_SIZE) * 0.5;
  const range = [];
  for (let y = lower; y <= upper; y += STEP_SIZE) {
    range.push(Math.round(y * 100) / 100);
  }
  return range;
}

/**
 * Expands the current node by simulating ball travel until it reaches AI or Opponent.
 * Each child represents a possible final position where the ball is received.
 * @param {*} node to expand
 */
export function expand(node) {    
  const isAIMove = node.futureBallState.ballVel[0] >= 0;
  const paddlePositions = generateFullRange();
  
  for (const paddlePos of paddlePositions) {
    const distanceToBall = Math.abs(paddlePos - node.futureBallState.ballPos[1]);
    const newVelY = node.ballState.ballVel[1] * ((paddlePos - node.futureBallState.ballPos[1] >= 0) == (node.ballState.ballVel[1] >= 0) ? -BALL_ACCELERATION : BALL_ACCELERATION) * distanceToBall;
    const newVelX = node.ballstate.ballVel[0] * -BALL_ACCELERATION;
    const newBallVel = [newVelX, newVelY];
    const futureBallState = predictBallState(node.futureBallState.ballPos, newBallVel);
    
    let newNode;
    if (isAIMove)
      newNode = GameStateNode(node.futureBallState, paddlePos, node.playerPaddle, futureBallState);
    else
      newNode = GameStateNode(node.futureBallState, node.aiPaddle, paddlePos, futureBallState);
    newNode.evaluation = evaluateNode(newNode);
  }
  node.children.push(newNode);
  newNode.parent = node;
}
