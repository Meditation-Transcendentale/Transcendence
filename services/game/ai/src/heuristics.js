import {
  MAP_HEIGHT,
  MAX_PADDLE_SPEED,
  STEP_SIZE,
} from './constants.js';

// Normalize distance to [0,1]
function normDist(a, b) {
  return Math.abs(a - b) / MAP_HEIGHT;
}

export function h_distanceToBall(me, collisionY) {
  return 1 - normDist(me, collisionY);
}

export function h_opponentMisalign(opponent, collisionY) {
  return normDist(opponent, collisionY);
}

export function h_ballDirectionFavor(ballDirX) {
  return ballDirX > 0 ? 1 : 0;
}

export function h_centering(me) {
  return 1 - Math.abs(me - MAP_HEIGHT / 2) / (MAP_HEIGHT / 2);
}

export function h_timeToCollision(framesToCollision) {
  return 1 / (1 + framesToCollision * STEP_SIZE);
}


