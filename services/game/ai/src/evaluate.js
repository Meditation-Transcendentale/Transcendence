import { MAP_HEIGHT, PADDLE_HEIGHT, BALL_DIAM } from './constants.js';

function nz(x, eps = 1e-9) { return Math.abs(x) < eps ? (x < 0 ? -eps : eps) : x; }

export function evaluateNode(node) {
  const ballY = node.ballState.ballPos[1];
  const futureBallY = node.futureBallState.ballPos[1];
  const vx = node.ballState.ballVel[0];
  const vy = node.ballState.ballVel[1];
  const meY = node.aiPaddlePos;
  const oppY = node.playerPaddlePos;

  const VSPAN = MAP_HEIGHT - PADDLE_HEIGHT;

  const d_me = (ballY - meY) / VSPAN;
  if (Math.abs(d_me) > (PADDLE_HEIGHT + BALL_DIAM) / 2) {
    return {
      alpha: -999,
      beta: -999
    }
  }
  const ang = vy / nz(vx);
  
  const d_opp = (futureBallY - oppY) / VSPAN;

  const f_align = -Math.tanh(Math.abs(d_me));
  const f_opp = Math.tanh(Math.abs(d_opp));
  const f_angle = -Math.tanh(Math.abs(ang));
  const f_center = -Math.tanh(Math.abs(meY / VSPAN));
  const f_speed = Math.log1p(Math.hypot(vx, vy));
  
  const base =
    20 * f_align +
    50 * f_opp +
    30 * f_angle +
    15 * f_center +
    8 * f_speed;

  const sens_align = 1 - Math.tanh(Math.abs(d_me)) ** 2;
  const sens_angle = 1 - Math.tanh(Math.abs(ang)) ** 2;
  const sens_speed = 1 / (1 + Math.hypot(vx, vy));

  const width =
    4 +
    22 * sens_align +
    12 * sens_angle +
    6 * sens_speed;

  let alpha = base + width;
  let beta = base - width;

  if (!Number.isFinite(alpha)) alpha = 0;
  if (!Number.isFinite(beta)) beta = 0;
  if (beta > alpha) { const m = (alpha + beta) / 2; alpha = m; beta = m; }

  return { alpha, beta };
}
