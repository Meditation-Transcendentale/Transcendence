import { MAP_HEIGHT, PADDLE_HEIGHT } from './constants.js';

function nz(x, eps = 1e-9) { return Math.abs(x) < eps ? (x < 0 ? -eps : eps) : x; }

export function evaluateNode(node) {
  const ballY = node.ballState.ballPos[1];
  const vx    = node.ballState.ballVel[0];
  const vy    = node.ballState.ballVel[1];
  const aiY   = node.aiPaddlePos;
  const plY   = node.playerPaddlePos;

  const VSPAN = MAP_HEIGHT - PADDLE_HEIGHT;

  const d_ai  = (ballY - aiY) / VSPAN;
  const d_pl  = (ballY - plY) / VSPAN;
  const ang   = vy / nz(vx);

  //heuristics
  const f_align  = -Math.tanh(Math.abs(d_ai));            // better when AI aligned to ball line
  const f_opp    =  Math.tanh(Math.abs(d_pl));            // harder opponent when close to ball line
  const f_angle  = -Math.tanh(Math.abs(ang));             // prefer controlled return angles
  const f_center = -Math.tanh(Math.abs(aiY / VSPAN));     // keep paddle near center for agility
  const f_speed  =  Math.log1p(Math.hypot(vx, vy));       // acknowledge rally speed without domination

  const base =
      50 * f_align +
      35 * f_opp +
      30 * f_angle +
      15 * f_center +
       8 * f_speed;

  const sens_align = 1 - Math.tanh(Math.abs(d_ai))**2;
  const sens_angle = 1 - Math.tanh(Math.abs(ang))**2;
  const sens_speed = 1 / (1 + Math.hypot(vx, vy));

  const width =
      4 +
      22 * sens_align +
      12 * sens_angle +
       6 * sens_speed;

  let alpha = base + width;
  let beta  = base - width;

  if (!Number.isFinite(alpha)) alpha = 0;
  if (!Number.isFinite(beta))  beta  = 0;
  if (beta > alpha) { const m = (alpha + beta) / 2; alpha = m; beta = m; }

  return { alpha, beta };
}
