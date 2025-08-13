import { MAP_HEIGHT, PADDLE_HEIGHT, WALL_SIZE } from './constants.js';

function nz(x, eps = 1e-9) { return Math.abs(x) < eps ? (x < 0 ? -eps : eps) : x; }

/**
 * Scale-invariant, smooth evaluation.
 * - All features are normalized by vertical span.
 * - Magnitudes compressed by tanh/log1p (no hard caps).
 * - Uncertainty uses local sensitivity (derivatives), shrinks near good alignment.
 * - Ensures beta <= alpha with finite values.
 */
export function evaluateNode(node) {
  const ballY = node.ballState.ballPos[1];
  const vx    = node.ballState.ballVel[0];
  const vy    = node.ballState.ballVel[1];
  const aiY   = node.aiPaddlePos;
  const plY   = node.playerPaddlePos;

  // Natural vertical scale
  const VSPAN = Math.max(1e-6, MAP_HEIGHT - PADDLE_HEIGHT - WALL_SIZE);

  // Normalized offsets
  const d_ai  = (ballY - aiY) / VSPAN;         // how far the AI is from the ball line
  const d_pl  = (ballY - plY) / VSPAN;         // how far the player is from the ball line
  const ang   = vy / nz(vx);                   // slope-like; sign preserved

  // Smooth, bounded feature transforms
  // Alignment (best when |d_ai| -> 0): in [-1, 0], approaches 0 as alignment improves
  const f_align = -Math.tanh(Math.abs(d_ai));

  // Opponent difficulty (easier when |d_pl| large): in [0, 1]
  const f_opp = Math.tanh(Math.abs(d_pl));

  // Angle control (prefer moderate |ang|): high |ang| penalized, in [-1, 0]
  const f_angle = -Math.tanh(Math.abs(ang));

  // Speed awareness (scale-free): grows slowly with total speed
  const speed = Math.hypot(vx, vy);
  const f_speed = Math.log1p(speed); // unbounded but slow-growing

  // Centering preference (keeps paddle agile): in [-1, 0]
  const f_center = -Math.tanh(Math.abs(aiY / VSPAN));

  // Weighted sum (weights moderate; overall score is naturally bounded by construction except f_speed)
  // Keep f_speed as a mild additive bias so faster rallies don’t dominate numerically.
  const base =
      50 * f_align   +   // dominate by alignment
      35 * f_opp     +
      30 * f_angle   +
      15 * f_center  +
       8 * f_speed;

  // Local sensitivity → uncertainty.
  // Derivative of tanh(x) is sech^2(x) = 1 - tanh^2(x). Use it around the decision-relevant terms.
  const sens_align = 1 - Math.tanh(Math.abs(d_ai))**2;             // high when misaligned ~0
  const sens_angle = 1 - Math.tanh(Math.abs(ang))**2;               // high when angle moderate
  const sens_speed = 1 / (1 + speed);                               // decays with speed
  // Combine into a strictly-positive width. No hard caps; all terms are bounded by design.
  const width =
      4
    + 22 * sens_align
    + 12 * sens_angle
    +  6 * sens_speed;

  // Interval with invariant beta <= alpha
  let alpha = base + width;
  let beta  = base - width;

  // Finite safety (no clipping): replace non-finite with zeros, then re-enforce ordering
  if (!Number.isFinite(alpha)) alpha = 0;
  if (!Number.isFinite(beta))  beta  = 0;
  if (beta > alpha) { const m = (alpha + beta) / 2; alpha = m; beta = m; }

  return { alpha, beta };
}
