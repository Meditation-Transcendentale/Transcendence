import {
  MAP_HEIGHT,
  BALL_DIAM,
  WALL_SIZE,
  PADDLE_PLAYER_X,
  PADDLE_AI_X,
  PADDLE_WIDTH
} from './constants.js';

/**
 * Predicts the Y-position of the ball when it reaches a paddle.
 * @param {x_b, y_b} ballPos. Current position of the ball  
 * @param {*} ballVel. Velocity of the ball.
 * @returns ballState of the ball when it reaches the paddle. v_by is switched depending on the bounces.
 */
export function predictBallState(ballPos, ballVel) {
  const [x_b, y_b] = ballPos;
  let [v_bx, v_by] = ballVel;

  const mapMax = (MAP_HEIGHT - BALL_DIAM) * 0.5 - WALL_SIZE;

  let timeToPaddle, nextReceiverX, predictedY, yFromBottom, bounces, remainder;

  if (v_bx < 0) {
    timeToPaddle = (Math.abs(PADDLE_PLAYER_X - x_b) - (PADDLE_WIDTH + BALL_DIAM) * 0.5) / Math.abs(v_bx);
    nextReceiverX = PADDLE_PLAYER_X + (PADDLE_WIDTH + BALL_DIAM) * 0.5;
  } else {
    timeToPaddle = (Math.abs(PADDLE_AI_X - x_b) - (PADDLE_WIDTH + BALL_DIAM) * 0.5) / Math.abs(v_bx);
    nextReceiverX = PADDLE_AI_X - (PADDLE_WIDTH + BALL_DIAM) * 0.5;
  }

  predictedY = y_b + v_by * timeToPaddle;

  yFromBottom = predictedY - mapMax;

  bounces = Math.floor(yFromBottom, (MAP_HEIGHT - BALL_DIAM - WALL_SIZE)); 
  
  remainder = yFromBottom % (MAP_HEIGHT - BALL_DIAM - WALL_SIZE);

  if (bounces % 2 == 1) {
    const finalY = -mapMax + remainder;
  } else {
    const finalY = mapMax - remainder;
    v_by = -v_by;
  }

  return {
    ballPos: [nextReceiverX, Math.round(finalY * 100) / 100],
    ballVel: [v_bx, v_by]
  };
}
