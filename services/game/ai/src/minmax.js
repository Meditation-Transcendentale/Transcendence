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
  // console.log(isAtPaddle, Math.abs(Math.abs(node.ballState.ballPos[0]) - expectedX), diff, PADDLE_HEIGHT * 0.5);
  return isAtPaddle && diff > PADDLE_HEIGHT * 0.5;
}

export function runMinmax(rootNode, depth, maximizingPlayer, weightIndex) {
  return minmax(rootNode, depth, -999, 999, maximizingPlayer, weightIndex, depth);
}

function minmax(node, depth, alpha, beta, maximizingPlayer, weightIndex, originalDepth) {
  const losing = isLosing(node);
  const terminal = depth === 0 || (depth !== originalDepth && losing);

  if (terminal) {
    const val = losing
      ? (maximizingPlayer ? 999 : -999)
      : evaluateNode(node, weightIndex);
    console.log("Leaf Node Evaluation:", val);
    console.log("Ball X at leaf:", node.futureBallState.ballPos[0]);
    return { value: val, node };
  }
  
  const children = expand(node);
  console.log("Depth:", depth, "| Children:", children.length, "| Maximizing:", maximizingPlayer);
    
  if (maximizingPlayer) {
    let best = { value: -999, node: null };
    for (const child of children) {
      const result = minmax(child, depth - 1, alpha, beta, false, weightIndex, originalDepth);
      if (Math.abs(result.value) != 999)
          console.log(`Value: ${result.value}`);
      best = max(best, { value: result.value, node: child });
      alpha = Math.max(alpha, best.value);
      console.log("Child Value:", result.value, "| Current Best:", best.value, "| Paddle:", best.node.playerPaddlePos, "|Paddle:", best.node.aiPaddlePos);
      if (alpha >= beta) {
        break;
      }
    }
    return best;
  } else {
    let best = { value: 999, node: null };
    for (const child of children) {
      const result = minmax(child, depth - 1, alpha, beta, true, weightIndex, originalDepth);
      best = min(best, { value: result.value, node: child });
      beta = Math.min(beta, best.value);
      console.log("Child Value:", result.value, "| Current Best:", best.value, "| Paddle:", best.node.playerPaddlePos, "|Paddle:", best.node.aiPaddlePos);
      if (beta <= alpha) {
        break;
      }
    }
    return best;
  }
}
