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
  const isAIMove = node.ballState.ballVel[0] <= 0;
  const receiverY = isAIMove ? node.aiPaddlePos : node.playerPaddlePos;
  const impactY = node.ballState.ballPos[1];
  const diff = Math.abs(impactY - receiverY);
  // console.log(`[isLosing] ImpactY=${impactY.toFixed(2)}|${node.ballState.ballVel[0]} ReceiverY=${receiverY.toFixed(2)}|${node.aiPaddlePos}|${node.playerPaddlePos}| Δ=${diff.toFixed(2)} Limit=${(PADDLE_HEIGHT * 0.5).toFixed(2)}`);
  return diff > PADDLE_HEIGHT * 0.5;
}

export function runMinmax(rootNode, depth, maximizingPlayer, weightIndex) {
  return minmax(rootNode, depth, -999, 999, maximizingPlayer, weightIndex, depth);
}

function minmax(node, depth, alpha, beta, maximizingPlayer, weightIndex, originalDepth) {
  const losing = isLosing(node);
  // if (losing)
  // console.log(`LOSING`)
  const terminal = depth === 0 || (depth !== originalDepth && losing);

  if (terminal) {
    const val = losing
      ? (maximizingPlayer ? 999 : -999)
      : evaluateNode(node, weightIndex);
    if (val !== 999 && val !== -999)
      console.log(`${depth}|val:${val}`);
    // console.log(`[minmax] Depth=${depth} | Losing=${losing} | MaxPlayer=${maximizingPlayer} | Eval=${losing ? (maximizingPlayer ? 999 : -999) : "?"}`);
    return { value: val, node };
  }

  const children = expand(node);
  // console.log(`[expand] Generated ${children.length} children`);

  if (maximizingPlayer) {
    let best = { value: -999, node: null };
    for (const child of children) {
      const result = minmax(child, depth - 1, alpha, beta, false, weightIndex, originalDepth);
      best = max(best, { value: result.value, node: child });
      // console.log(`Max:${best.value}|${result.value}`);
      alpha = Math.max(alpha, best.value);
      // console.log(`${alpha}|${beta}`)
      if (alpha >= beta) {
        console.log(`${depth}|MAX PRUNING: ${alpha}|${beta}`);
        break;
      }
    }
    console.log(`${depth}|MAX Sending best: ${best.value}`);
    return best;
  } else {
    let best = { value: 999, node: null };
    for (const child of children) {
      const result = minmax(child, depth - 1, alpha, beta, true, weightIndex, originalDepth);
      best = min(best, { value: result.value, node: child });
      // console.log(`Min:${best.value}|${result.value}`);
      beta = Math.min(beta, best.value);
      // console.log(`${alpha}|${beta}`)
      if (beta <= alpha) {
        console.log(`${depth}|MIN PRUNING: ${beta}|${alpha}`);
        break;
      }
    }
    console.log(`${depth}|MIN Sending best: ${best.value}`);
    return best;
  }
}
