// test_bstar_smoke.js
import { GameStateNode } from "./GameStateNode.js";
import { expand } from "./expand.js";
import { evaluateNode } from "./evaluate.js";

const Strategy = { PROVEBEST: 0, DISPROVEBEST: 1 };
const EPS = 1e-6;

function maxFinite(arr) { let m = -Infinity; for (const v of arr) if (Number.isFinite(v) && v > m) m = v; return m; }
function minFinite(arr) { let m =  Infinity; for (const v of arr) if (Number.isFinite(v) && v < m) m = v; return m; }
function computeThreshold(strategy, isAITurn, lambda, gamma) {
  return strategy === Strategy.PROVEBEST
    ? (isAITurn ? lambda : -(lambda + gamma) / 2)
    : (isAITurn ? (lambda + gamma) / 2 : -gamma);
}

function buildRoot() {
  const ball = { ballPos: [0, 0], ballVel: [10, 0] };
  const root = new GameStateNode(ball, 0, 0, ball);
  root.evaluation = evaluateNode(root);
  return root;
}

function printStats(tag, nodes) {
  const A = nodes.map(n => n?.evaluation?.alpha);
  const B = nodes.map(n => n?.evaluation?.beta);
  console.log(tag, {
    count: nodes.length,
    alphaMin: minFinite(A), alphaMax: maxFinite(A),
    betaMin:  minFinite(B), betaMax:  maxFinite(B),
    bad: nodes.filter(n => !Number.isFinite(n?.evaluation?.alpha) || !Number.isFinite(n?.evaluation?.beta) || (n.evaluation.alpha - n.evaluation.beta) <= EPS).length
  });
}

function selectRelevant(nodes) {
  const bestPess = maxFinite(nodes.map(n => n.evaluation.beta));
  const relevant = nodes.filter(n => Number.isFinite(n.evaluation.alpha) && n.evaluation.alpha > bestPess);
  relevant.sort((a, b) => b.evaluation.alpha - a.evaluation.alpha);
  return { bestPess, relevant };
}

function scoreChildren(nodes, strategy, isAITurn, lambda, gamma) {
  const T = computeThreshold(strategy, isAITurn, lambda, gamma);
  let best = null, bestScore = -Infinity;
  for (const n of nodes) {
    const a = n.evaluation.alpha, b = n.evaluation.beta, d = a - b;
    if (!Number.isFinite(a) || !Number.isFinite(b) || d <= EPS) continue;
    const s = (a - T) / d;
    if (s > bestScore) { bestScore = s; best = n; }
  }
  return { T, bestScore, chosen: best ? { a: best.evaluation.alpha, b: best.evaluation.beta } : null };
}

(async function main() {
  const root = buildRoot();

  expand(root);
  if (!Array.isArray(root.children) || root.children.length === 0) {
    console.log("EXPAND_EMPTY");
    return;
  }

  printStats("CHILDREN", root.children);

  const { bestPess, relevant } = selectRelevant(root.children);
  console.log("RELEVANT", { bestPess, count: relevant.length, top3: relevant.slice(0, 3).map(n => [n.evaluation.alpha, n.evaluation.beta]) });

  const pool = relevant.length ? relevant : [...root.children].sort((a, b) => b.evaluation.alpha - a.evaluation.alpha).slice(0, 3);
  const chosen = pool[0];
  const others = pool.slice(1);
  const lambda = maxFinite(others.map(n => n.evaluation.alpha));
  const gamma  = Math.max(chosen.evaluation.beta, maxFinite(others.map(n => n.evaluation.beta)));

  console.log("LAMGAM", { lambda, gamma });

  const vx = root.ballState.ballVel[0];
  const scenarios = [
    { strategy: Strategy.PROVEBEST,   isAITurn: vx <= 0,   tag: "PROVE@TURN" },
    { strategy: Strategy.PROVEBEST,   isAITurn: !(vx <= 0),tag: "PROVE@OPP"  },
    { strategy: Strategy.DISPROVEBEST,isAITurn: vx <= 0,   tag: "DISPROVE@TURN" },
    { strategy: Strategy.DISPROVEBEST,isAITurn: !(vx <= 0),tag: "DISPROVE@OPP"  },
  ];

  for (const sc of scenarios) {
    const r = scoreChildren(pool, sc.strategy, sc.isAITurn, lambda, gamma);
    console.log(sc.tag, r);
  }
})();
