import { evaluateNode } from './evaluate.js';
import { expand } from './expand.js';

function max(a, b) {
  return (a.value > b.value) ? a : b;
}

function min(a, b) {
  return (a.value < b.value) ? a : b;
}

function isLosing(node) {
  return false; //for now
}

export function minmax(node, depth, alpha, beta, maximizingPlayer) {
  if (depth === 0 || isLosing(node)) {
    let val = evaluateNode(node);
    if (!Number.isFinite(val)) {
      console.warn("evaluateNode returned NaN", node);
      val = -9999;
    }
    return { value: val, node };
  }

  const children = expand(node);

  if (maximizingPlayer) {
    let best = { value: -Infinity, node: null };
    for (const child of children) {
      const result = minmax(child, depth - 1, alpha, beta, false);
      best = max(best, { value: result.value, node: child });
      alpha = Math.max(alpha, best.value);
      if (alpha >= beta) break;
    }
    return best;
  } else {
    let best = { value: Infinity, node: null };
    for (const child of children) {
      const result = minmax(child, depth - 1, alpha, beta, true);
      best = min(best, { value: result.value, node: child });
      beta = Math.min(beta, best.value);
      if (beta <= alpha) break;
    }
    return best;
  }
}
