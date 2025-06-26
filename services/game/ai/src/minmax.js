import { expand } from './expand.js';

export function minmax(node, depth, alpha, beta, maximizingPlayer) {
  if (depth === 0 || node.children.length === 0) {
    return node.alpha;  // or combine alpha/beta as score
  }

  expand(node);

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    for (const child of node.children) {
      const evalScore = minmax(child, depth - 1, alpha, beta, false);
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const child of node.children) {
      const evalScore = minmax(child, depth - 1, alpha, beta, true);
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}
