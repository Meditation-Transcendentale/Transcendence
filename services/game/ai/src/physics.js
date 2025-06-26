import {
  MAP_HEIGHT,
  BALL_DIAM,
  WALL_SIZE,
  PADDLE_PLAYER_X,
  PADDLE_AI_X,
  PADDLE_WIDTH
} from './constants.js';

export function predictBallPosition(ballPos, ballVel) {
  const [x_b, y_b] = ballPos;
  let [v_bx, v_by] = ballVel;

  const mapMax = (MAP_HEIGHT - BALL_DIAM) * 0.5 - WALL_SIZE;
  const bounceHeight = 2 * mapMax;

  let timeToPaddle, nextReceiverX;

  if (v_bx < 0) {
    timeToPaddle = (Math.abs(PADDLE_PLAYER_X - x_b) - (PADDLE_WIDTH + BALL_DIAM) * 0.5) / Math.abs(v_bx);
    nextReceiverX = PADDLE_PLAYER_X + (PADDLE_WIDTH + BALL_DIAM) * 0.5;
  } else {
    timeToPaddle = (Math.abs(PADDLE_AI_X - x_b) - (PADDLE_WIDTH + BALL_DIAM) * 0.5) / Math.abs(v_bx);
    nextReceiverX = PADDLE_AI_X - (PADDLE_WIDTH + BALL_DIAM) * 0.5;
  }

  const predictedY = y_b + v_by * timeToPaddle;
  const yFromBottom = predictedY - mapMax;
  const bounces = Math.floor(Math.abs(yFromBottom) / bounceHeight);
  const remainder = Math.abs(yFromBottom) % bounceHeight;

  let finalY;
  if (yFromBottom >= 0) {
    finalY = (bounces % 2 === 0) ? mapMax - remainder : -mapMax + remainder;
  } else {
    finalY = (bounces % 2 === 0) ? mapMax + remainder : -mapMax - remainder;
  }

  if (bounces % 2 !== 0) {
    v_by = -v_by;
  }

  return [
    [Math.round(nextReceiverX * 1000) / 1000, Math.round(finalY * 1000) / 1000],
    [v_bx, v_by]
  ];
}
