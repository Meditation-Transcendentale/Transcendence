import {
  MAP_HEIGHT,
  BALL_DIAM,
  WALL_SIZE,
  PADDLE_PLAYER_X,
  PADDLE_AI_X,
  PADDLE_WIDTH
} from './constants.js';

export function predictBallState(ballPos, ballVel) {
  const [x_b, y_b] = ballPos;
  let [v_bx, v_by] = ballVel;

  const mapMax = (MAP_HEIGHT - BALL_DIAM) * 0.5 - WALL_SIZE;

  let timeToPaddle, nextReceiverX;

  if (v_bx < 0) {
    timeToPaddle = (Math.abs(PADDLE_PLAYER_X - x_b) - (PADDLE_WIDTH + BALL_DIAM) * 0.5) / Math.abs(v_bx);
    nextReceiverX = PADDLE_PLAYER_X + (PADDLE_WIDTH + BALL_DIAM) * 0.5;
  } else {
    timeToPaddle = (Math.abs(PADDLE_AI_X - x_b) - (PADDLE_WIDTH + BALL_DIAM) * 0.5) / Math.abs(v_bx);
    nextReceiverX = PADDLE_AI_X - (PADDLE_WIDTH + BALL_DIAM) * 0.5;
  }

  let predictedY = y_b + v_by * timeToPaddle;

  while (predictedY > mapMax || predictedY < -mapMax) {
    if (predictedY > mapMax) {
      predictedY = 2 * mapMax - predictedY;
    } else if (predictedY < -mapMax) {
      predictedY = -2 * mapMax - predictedY;
    }
    v_by = -v_by;
  }

  return {
    ballPos: [nextReceiverX, Math.round(predictedY * 1000) / 1000],
    ballVel: [v_bx, v_by]
  };
}
