import {
  MAP_HEIGHT,
  MAX_PADDLE_SPEED,
  PADDLE_HALF_HEIGHT,
  STEP_SIZE,
  FPS
} from './constants.js';

export function heuristic_time_to_intercept(node, paddleY) {
  const targetY = node.nextBallPos[1];
  const dist = Math.abs(targetY - paddleY);
  const frames = dist / MAX_PADDLE_SPEED;
  const maxFrames = MAP_HEIGHT / MAX_PADDLE_SPEED;
  const score = frames / maxFrames;
  return [score, score];
}

export function heuristic_return_angle_variability(node) {
  try {
    const xDist = Math.abs(node.nextBallPos[0] - node.ballPos[0]);
    const time = xDist / Math.abs(node.ballVel[0]);
    const frames = time * FPS;
    const maxReach = Math.min(MAX_PADDLE_SPEED * frames + PADDLE_HALF_HEIGHT, 7.5);
    const dist = Math.abs(node.nextBallPos[1] - node.player_paddle_pos);
    const actualReach = Math.min(dist, maxReach);
    const maxReturns = maxReach / STEP_SIZE;
    const numReturns = actualReach / STEP_SIZE;
    const variability = Math.min(numReturns / maxReturns, 1.0);
    return [1 - variability, 1 - variability];
  } catch {
    return [0, 0];
  }
}

export function heuristic_opponent_disruption(node, paddleY) {
  try {
    const xDist = Math.abs(node.nextBallPos[0] - node.ballPos[0]);
    const time = xDist / Math.abs(node.ballVel[0]);
    const frames = time * FPS;
    const rawReach = MAX_PADDLE_SPEED * frames + PADDLE_HALF_HEIGHT;
    const maxReach = Math.min(rawReach, 7.5);
    const targetY = node.nextBallPos[1];
    const dist = Math.abs(targetY - paddleY);
    const disruption = Math.min(dist / maxReach, 1.0);
    return [disruption, 0.0];
  } catch {
    return [0, 0];
  }
}

export function heuristic_center_bias_correction(node) {
  const [vx, vy] = node.ballVel;
  const angle = Math.abs(Math.atan2(vy, vx));
  const ideal = Math.PI / 6;
  const max = Math.PI * 5 / 12;
  const dev = Math.abs(angle - ideal);
  const score = Math.max(0.0, Math.min(1 - (dev / max), 1.0));
  return [score, score];
}

export function heuristic_entropy_reaction(node, paddleY) {
  try {
    const xDist = Math.abs(node.nextBallPos[0] - node.ballPos[0]);
    const time = xDist / Math.abs(node.ballVel[0]);
    const frames = time * FPS;
    const maxMove = Math.min(MAX_PADDLE_SPEED * frames, 7.5);
    const targetY = node.nextBallPos[1];
    const dist = Math.abs(targetY - paddleY);
    const move = Math.min(dist, maxMove);
    const dir = targetY > paddleY ? 1 : -1;
    const predY = paddleY + dir * move;
    const offset = Math.abs(predY - targetY);
    const ratio = Math.max(0.0, (PADDLE_HALF_HEIGHT - offset) / PADDLE_HALF_HEIGHT);
    const entropy = ratio ** 2;
    return [1 - entropy, 1 - entropy];
  } catch {
    return [0, 0];
  }
}

export function heuristic_consistency(node) {
  const [vx, vy] = node.ballVel;
  const angle = Math.abs(Math.atan2(vy, vx));
  const max = Math.PI * 17 / 36;
  const raw = 1 - (angle / max);
  const score = Math.max(0.0, Math.min(raw, 1.0));
  return [score, score];
}

export function heuristic_distance_to_predicted_return(node, predictedY) {
  const dist = Math.abs(predictedY - node.aiPaddlePos);
  const norm = Math.min(dist / MAX_PADDLE_SPEED, 1.0);
  const score = 1.0 - norm;
  return [score, score];
}
