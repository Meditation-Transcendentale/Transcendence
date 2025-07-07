import { MAP_HEIGHT, PADDLE_HEIGHT, WALL_SIZE } from './constants.js';

// How close paddle is to expected impact
export function h_alignment(paddleY, targetY) {
  return 1 - Math.abs(paddleY - targetY) / MAP_HEIGHT;
}

// Prefers straight returns
export function h_straightness(velY) {
  const maxY = 1.5;
  return 1 - Math.min(Math.abs(velY) / maxY, 1);
}

// Prefers central paddle positions
export function h_stability(paddleY) {
  return 1 - Math.abs(paddleY) / (MAP_HEIGHT / 2);
}

// Prefers high vertical velocity
export function h_curvature(velY) {
  return Math.min(Math.abs(velY) / 1.5, 1);
}

// Measures distance from wall
export function h_marginToWall(paddleY) {
  const limit = (MAP_HEIGHT - PADDLE_HEIGHT - WALL_SIZE) / 2;
  return Math.abs(paddleY) / limit;
}

// Signed directional movement pressure
export function h_momentum(paddleY, targetY) {
  return (targetY - paddleY) / MAP_HEIGHT;
}