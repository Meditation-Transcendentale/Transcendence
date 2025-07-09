import { evaluateNode } from './evaluate.js';
import { expand } from './expand.js';
import { PADDLE_HEIGHT, PADDLE_AI_X, PADDLE_PLAYER_X, PADDLE_WIDTH, BALL_DIAM } from './constants.js';

function max(a, b) {
  return (a.value > b.value) ? a : b;
}

function min(a, b) {
  return (a.value < b.value) ? a : b;
}

function isLosing(node) {
  const isAIMove = node.ballState.ballVel[0] > 0;
  const receiverY = isAIMove ? node.aiPaddlePos : node.playerPaddlePos;
  const impactY = node.ballState.ballPos[1];
  const diff = Math.abs(impactY - receiverY);
  const expectedX = Math.abs(PADDLE_PLAYER_X + (PADDLE_WIDTH + BALL_DIAM) * 0.5);
  const isAtPaddle = Math.abs(Math.abs(node.ballState.ballPos[0]) - expectedX) < 0.01;
  // console.log(node.ballState.ballVel[0], isAtPaddle, Math.abs(Math.abs(node.ballState.ballPos[0]) - expectedX), diff, PADDLE_HEIGHT * 0.5);
  return isAtPaddle && diff > PADDLE_HEIGHT * 0.5;
}

export function runMinmax(rootNode, depth, maximizingPlayer, weightIndex) {
  return minmax(rootNode, depth, maximizingPlayer, weightIndex, depth);
}

function minmax(node, depth, maximizingPlayer, weightIndex, originalDepth) {
  const losing = isLosing(node);
  const terminal = depth === 0 || (depth !== originalDepth && losing);

  if (terminal) {
    const val = losing
      ? (maximizingPlayer ? -999 : 999)
      : evaluateNode(node, weightIndex);
    return { value: val, node };
  }
  
  const children = expand(node);
    
  if (maximizingPlayer) {
    let best = { value: -999, node: null };
    for (const child of children) {
      const result = minmax(child, depth - 1, false, weightIndex, originalDepth);
      const value = -result.value;
      // console.log (`MAX: ${best.value}| ${value}`);
      best = max(best, { value, node: child });
    }
    return best;
  } else {
    let best = { value: 999, node: null };
    for (const child of children) {
      const result = minmax(child, depth - 1, true, weightIndex, originalDepth);
      const value = -result.value;
      // console.log (`MIN: ${best.value}| ${value}`);
      best = min(best, { value, node: child });
    }
    return best;
  }
}
