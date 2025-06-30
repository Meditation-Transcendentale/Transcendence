import { evaluateNode } from './evaluate.js';
import { expand } from './expand.js';
import { PADDLE_HEIGHT } from './constants.js';

function max(a, b) {
  return (a.value > b.value) ? a : b;
}

function min(a, b) {
  return (a.value < b.value) ? a : b;
}

function isLosing(node) {
  const isAIMove = node.ballState.ballVel[0] > 0;
  const receiverY = isAIMove ? node.playerPaddlePos : node.aiPaddlePos;
  const impactY = node.ballState.ballPos[1];
  const diff = Math.abs(impactY - receiverY);

  console.log(`[isLosing] ImpactY=${impactY.toFixed(2)} ReceiverY=${receiverY.toFixed(2)} Δ=${diff.toFixed(2)} Limit=${(PADDLE_HEIGHT * 0.5).toFixed(2)}`);

  return diff > PADDLE_HEIGHT * 0.5;
}


export function minmax(node, depth, alpha, beta, maximizingPlayer, weightIndex) {
  if (depth === 0 || isLosing(node)) {
    const val = isLosing(node) ? -9999 : evaluateNode(node, weightIndex);
    console.log(
      `[Eval] Score=${val.toFixed(3)} | BallPos=[${node.ballState.ballPos.map(n => n.toFixed(2))}] | BallVel=[${node.ballState.ballVel.map(n => n.toFixed(2))}] | AI=${node.aiPaddlePos.toFixed(2)} | Player=${node.playerPaddlePos.toFixed(2)} | FuturePos=[${node.futureBallState.ballPos.map(n => n.toFixed(2))}] | FutureVel=[${node.futureBallState.ballVel.map(n => n.toFixed(2))}] | Δ=${Math.abs(node.ballState.ballPos[1] - (node.ballState.ballVel[0] > 0 ? node.playerPaddlePos : node.aiPaddlePos)).toFixed(2)} | Threshold=${(PADDLE_HEIGHT * 0.5).toFixed(2)}`
    );
    return { value: val, node };
  }

  const children = expand(node);

  if (maximizingPlayer) {
    let best = { value: -Infinity, node: null };
    for (const child of children) {
      const result = minmax(child, depth - 1, alpha, beta, false, weightIndex);
      best = max(best, { value: result.value, node: child });
      alpha = Math.max(alpha, best.value);
      if (alpha >= beta) break;
    }
    return best;
  } else {
    let best = { value: Infinity, node: null };
    for (const child of children) {
      const result = minmax(child, depth - 1, alpha, beta, true, weightIndex);
      best = min(best, { value: result.value, node: child });
      beta = Math.min(beta, best.value);
      if (beta <= alpha) break;
    }
    return best;
  }
}
