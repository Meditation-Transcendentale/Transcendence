
import { expand } from "./expand.js";

const Strategy   = { PROVEBEST: 0, DISPROVEBEST: 1 };
const EPS        = 1e-6;
const EPS_SCORE  = 1e-9;

const MAX_DEPTH      = 4;
const MAX_ITERS      = 32;
const MAX_EXPANSIONS = 300;
const TIME_BUDGET_MS = 12;

function nowMs() { return (typeof performance !== "undefined" ? performance.now() : Date.now()); }
function makeBudget() { return { expansions: 0, maxExp: MAX_EXPANSIONS, deadline: nowMs() + TIME_BUDGET_MS }; }
function overBudget(b) { return b.expansions >= b.maxExp || nowMs() >= b.deadline; }
function maxFinite(arr) { let m = -Infinity; for (const v of arr) if (Number.isFinite(v) && v > m) m = v; return m; }

/**
 * Negamax B* backup from children with monotone convergence and β ≤ α.
 * Parent optimistic bound α := −max(child β); pessimistic bound β := −max(child α).
 * Enforce α non-increasing, β non-decreasing, then clamp β ≤ α.
 */
function backupFromChildren(node) {
  const kids = node.children;
  if (!Array.isArray(kids) || kids.length === 0) return { ok: false };

  const maxBeta  = maxFinite(kids.map(c => c?.evaluation?.beta));
  const maxAlpha = maxFinite(kids.map(c => c?.evaluation?.alpha));
  if (!Number.isFinite(maxBeta) || !Number.isFinite(maxAlpha)) return { ok: false };

  let newA = -maxBeta;  
  let newB = -maxAlpha; 

  const prevA = node.evaluation.alpha;
  const prevB = node.evaluation.beta;
  if (Number.isFinite(prevA)) newA = Math.min(prevA, newA);
  if (Number.isFinite(prevB)) newB = Math.max(prevB, newB);
  if (newB > newA) newA = newB;                            

  return { ok: true, newA, newB };
}

/**
 * Remove all the nodes that are already not relevant (best case is already worse than worst from others)
 * @param {*} root 
 */
function topLevelSelectRelevantNodes(root) {
  const nodes = Array.isArray(root?.children) ? root.children : [];
  if (!nodes.length) return [];

  let bestPess = -Infinity;
  for (const n of nodes) {
    const b = n?.evaluation?.beta;
    if (Number.isFinite(b) && b > bestPess) bestPess = b;
  }
  if (!Number.isFinite(bestPess)) return [];


  const indexed = [];
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    const a = n?.evaluation?.alpha;
    if (Number.isFinite(a) && a > bestPess) indexed.push({ n, i });
  }
  indexed.sort((x, y) => {
    const ax = x.n.evaluation.alpha, ay = y.n.evaluation.alpha;
    if (ay !== ax) return ay - ax;
    const bx = x.n.evaluation.beta,  by = y.n.evaluation.beta;
    if (bx !== by) return bx - by;
    return x.i - y.i;
  });

  return indexed.map(e => e.n);
}

/**
 * Palay (two relevant nodes) — interval nomenclature:
 *   Node 1: [b1, a1], Node 2: [b2, a2], with a1 ≥ a2 (we sort by descending α).
 *
 * Core choices:
 *   • If a1 > a2 and b1 ≤ b2 → PROVEBEST(Node 1).  Node 1 dominates or embeds Node 2.
 *   • If a1 > a2 and b1  > b2 → ambiguous (intervals “cross”).
 *       Compare failure probabilities and pick the lower-risk strategy:
 *         P_fail(PROVEBEST)    = (a2 − b1) / (a1 − b1)
 *         P_fail(DISPROVEBEST) = (a2 − b1) / (a2 − b2)
 *       If P_fail(PROVEBEST) < P_fail(DISPROVEBEST) → PROVEBEST(Node 1), else DISPROVEBEST(Node 2).
 *   • If a1 = a2:
 *       – If b1 = b2 → indistinguishable; pick a deterministic default (here: PROVEBEST(Node 1)).
 *       – If b1 ≠ b2 → prefer DISPROVEBEST to separate the tied optimists.
 */
function topLevelTwoRelevantNodes(rs) {
  const n1 = rs[0], n2 = rs[1];
  const a1 = n1.evaluation.alpha, b1 = n1.evaluation.beta;
  const a2 = n2.evaluation.alpha, b2 = n2.evaluation.beta;

  if (a1 > a2) {
    if (b1 > b2) {
      const d1 = Math.max(EPS, a1 - b1);
      const d2 = Math.max(EPS, a2 - b2);
      const fp = (a2 - b1) / d1; // fail prob if we try to prove Node 1 best
      const fd = (a2 - b1) / d2; // fail prob if we try to disprove Node 1 via Node 2
      return (fp < fd)
        ? { strategy: Strategy.PROVEBEST,    nodeToExplore: n1 }
        : { strategy: Strategy.DISPROVEBEST, nodeToExplore: n2 };
    }
    // b1 ≤ b2: Node 1 dominates / contains Node 2
    return { strategy: Strategy.PROVEBEST, nodeToExplore: n1 };
  }

  // a1 === a2
  if (b1 === b2) return { strategy: Strategy.PROVEBEST, nodeToExplore: n1 };
  return { strategy: Strategy.DISPROVEBEST, nodeToExplore: n2 };
}

/**
 * "If the bests nodes have the same top optimistic value, we need to separate them." ~ Palay
 * Multi-node heuristic consistent with Palay:
 *   • If several nodes share the top α, pick the one with the lowest β and DISPROVEBEST.
 *     Rationale: identical optimistic ceilings; attack the most vulnerable worst case to split them.
 *   • Otherwise, if the best node’s β is not decisively better than others, PROVEBEST the best node.
 *   • Else, compare aggregate failure for DISPROVEBEST against fail for PROVEBEST and choose the lower risk.
 */
function topLevelMultipleRelevantNodes(rs) {
  const topAlpha = Math.max(...rs.map(n => n.evaluation.alpha));
  const tied = rs.filter(n => n.evaluation.alpha === topAlpha);
  if (tied.length > 1) {
    const pick = tied.reduce((m, n) => n.evaluation.beta < m.evaluation.beta ? n : m);
    return { strategy: Strategy.DISPROVEBEST, nodeToExplore: pick };
  }

  const topBeta = Math.max(...rs.map(n => n.evaluation.beta));
  const best = rs[0];
  if (best.evaluation.beta <= topBeta) return { strategy: Strategy.PROVEBEST, nodeToExplore: best };

  const denomBest = Math.max(EPS, best.evaluation.alpha - best.evaluation.beta);
  const failPProve = (rs[1].evaluation.alpha - best.evaluation.beta) / denomBest;

  let failPDis = 0;
  for (const n of rs) {
    const d = Math.max(EPS, n.evaluation.alpha - n.evaluation.beta);
    failPDis += (n.evaluation.alpha - best.evaluation.beta) / d;
  }
  return (failPDis < failPProve)
    ? { strategy: Strategy.DISPROVEBEST, nodeToExplore: rs[1] }
    : { strategy: Strategy.PROVEBEST,    nodeToExplore: best };
}

function computeThreshold(strategy, isAITurn, lambda, gamma) {
  return strategy === Strategy.PROVEBEST
    ? (isAITurn ?  lambda : -(lambda + gamma) / 2)
    : (isAITurn ? (lambda + gamma) / 2 : -gamma);
}

function tieBreak(a, b, idxA, idxB) {
  if (!b) return true;
  const ba = a.evaluation.beta, bb = b.evaluation.beta;
  if (ba !== bb) return ba < bb;           
  const aa = a.evaluation.alpha, ab = b.evaluation.alpha;
  if (aa !== ab) return aa > ab;           
  return idxA < idxB;                      
}

/**
 * 
 * @param {*} strategy PROVEBEST/DISPROVEBEST
 * @param {*} currentNode parent node to choose from
 * @param {*} lambda 
 * @param {*} gamma 
 */
function lowLevelNextNodeSelection(strategy, currentNode, lambda, gamma) {
  const nodes = Array.isArray(currentNode?.children) ? currentNode.children : [];
  if (!nodes.length) return null;

  const vx = currentNode?.ballState?.ballVel?.[0] ?? 0;
  const isAITurn = vx <= 0;
  const T = computeThreshold(strategy, isAITurn, lambda, gamma);

  let best = null, bestScore = -Infinity, bestIdx = -1;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const a = node?.evaluation?.alpha, b = node?.evaluation?.beta;
    if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
    const d = a - b;
    if (d <= EPS) continue;

    const s = (a - T) / d;
    if (s > bestScore + EPS_SCORE || (Math.abs(s - bestScore) <= EPS_SCORE && tieBreak(node, best, i, bestIdx))) {
      best = node; bestScore = s; bestIdx = i;
    }
  }

  return best ?? null;
}

/**
 * 
 * @param {*} strategy PROVEBEST/DISPROVEBEST
 * @param {*} currentNode maybe the one...
 * @param {*} lambda 
 * @param {*} gamma 
 */
function lowLevelSearch(strategy, currentNode, lambda, gamma, budget, depth = 0) {
  if (overBudget(budget)) return;

  if (!Array.isArray(currentNode.children) || !currentNode.children.length) {
    const before = currentNode.children?.length || 0;
    expand(currentNode);
    const after = currentNode.children?.length || 0;
    budget.expansions += Math.max(0, after - before);
    if (!Array.isArray(currentNode.children) || !currentNode.children.length) return;
  }

  let prevA = currentNode.evaluation.alpha;
  let prevB = currentNode.evaluation.beta;
  let r = backupFromChildren(currentNode);
  if (!r.ok) return;
  let { newA, newB } = r;

  for (let iter = 0; iter < MAX_ITERS; iter++) {
    if (overBudget(budget)) break;
    if (depth >= MAX_DEPTH) break;
    if (Math.abs(newA - prevA) <= EPS && Math.abs(newB - prevB) <= EPS) break;

    const nextNode = lowLevelNextNodeSelection(strategy, currentNode, lambda, gamma);
    if (!nextNode) break;

    lowLevelSearch(strategy, nextNode, lambda, gamma, budget, depth + 1);

    r = backupFromChildren(currentNode);
    if (!r.ok) break;
    ({ newA, newB } = r);
    currentNode.evaluation.alpha = prevA = newA;
    currentNode.evaluation.beta  = prevB = newB;
  }

  currentNode.evaluation.alpha = newA;
  currentNode.evaluation.beta  = newB;
}

/**
 * Top-level B* step: pick relevant set, choose PROVEBEST/DISPROVEBEST, improve one child under budgets, return best.
 */
export function topLevelSearch(root) {
  const budget = makeBudget();

  if (!Array.isArray(root.children) || !root.children.length) {
    const before = root.children?.length || 0;
    expand(root);
    const after = root.children?.length || 0;
    budget.expansions += Math.max(0, after - before);
  }

  const rs = topLevelSelectRelevantNodes(root);
  if (!rs.length) return null;
  if (rs.length === 1) return rs[0];

  const nextMove = (rs.length === 2) ? topLevelTwoRelevantNodes(rs) : topLevelMultipleRelevantNodes(rs);
  const others = rs.filter(n => n !== nextMove.nodeToExplore);

  const lambda = maxFinite(others.map(n => n?.evaluation?.alpha));
  const gamma  = Math.max(nextMove.nodeToExplore?.evaluation?.beta ?? -Infinity,
                          maxFinite(others.map(n => n?.evaluation?.beta)));

  lowLevelSearch(nextMove.strategy, nextMove.nodeToExplore, lambda, gamma, budget, 0);

  const finalPool = topLevelSelectRelevantNodes(root);
  if (!finalPool.length) return null;
  return finalPool[0];
}
