import {
  MAP_HEIGHT,
  BALL_DIAM,
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

  const mapMax = (MAP_HEIGHT - BALL_DIAM) * 0.5;

  let timeToPaddle, nextReceiverX;

  if (v_bx > 0) {
    timeToPaddle = (Math.abs(PADDLE_PLAYER_X - x_b) - (PADDLE_WIDTH + BALL_DIAM) * 0.5) / Math.abs(v_bx);
    nextReceiverX = PADDLE_PLAYER_X - (PADDLE_WIDTH + BALL_DIAM) * 0.5;
  } else {
    timeToPaddle = (Math.abs(PADDLE_AI_X - x_b) - (PADDLE_WIDTH + BALL_DIAM) * 0.5) / Math.abs(v_bx);
    nextReceiverX = PADDLE_AI_X + (PADDLE_WIDTH + BALL_DIAM) * 0.5;
  }

  const predictedY = y_b + v_by * timeToPaddle;

  const playableHeight = MAP_HEIGHT - BALL_DIAM;
  let yInPlayable = predictedY + mapMax;

  let currentVy = v_by;
  if (yInPlayable < 0 || yInPlayable > playableHeight) {
    const bounces = Math.floor(Math.abs(yInPlayable) / playableHeight);
    const remainder = Math.abs(yInPlayable) % playableHeight;

    if (yInPlayable < 0) {
      yInPlayable = bounces % 2 === 0 ? remainder : playableHeight - remainder;
    } else {
      yInPlayable = bounces % 2 === 0 ? playableHeight - remainder : remainder;
    }

    if (bounces % 2 === 1) {
      currentVy = -currentVy;
    }
  }

  const finalY = yInPlayable - mapMax;

  // console.log(`${yInPlayable}|${finalY}`);
  // console.log(`${v_bx}|${ballVel[1]}|${v_by}/${x_b}|${y_b}/${mapMax}/${timeToPaddle}/${nextReceiverX}/${predictedY}/${yFromBottom}/${bounces}/${remainder}/${finalY}`)

  return {
    ballPos: [nextReceiverX, Math.round(finalY * 100) / 100],
    ballVel: [v_bx, v_by]
  };
}

// export function predictBallState(ballPos, ballVel) {
//   const [x_b, y_b] = ballPos;
//   let [v_bx, v_by] = ballVel;

//   const mapMax = (MAP_HEIGHT - BALL_DIAM) * 0.5;

//   let timeToPaddle, nextReceiverX, predictedY, yFromBottom, bounces, remainder;

//   if (v_bx < 0) {
//     timeToPaddle = (Math.abs(PADDLE_PLAYER_X - x_b) - (PADDLE_WIDTH + BALL_DIAM) * 0.5) / Math.abs(v_bx);
//     nextReceiverX = PADDLE_PLAYER_X + (PADDLE_WIDTH + BALL_DIAM) * 0.5;
//   } else {
//     timeToPaddle = (Math.abs(PADDLE_AI_X - x_b) - (PADDLE_WIDTH + BALL_DIAM) * 0.5) / Math.abs(v_bx);
//     nextReceiverX = PADDLE_AI_X - (PADDLE_WIDTH + BALL_DIAM) * 0.5;
//   }

//   predictedY = y_b + v_by * timeToPaddle;

//   yFromBottom = predictedY - mapMax;

//   bounces = Math.floor(yFromBottom, (MAP_HEIGHT - BALL_DIAM));

//   remainder = yFromBottom % (MAP_HEIGHT - BALL_DIAM);

//   let finalY;
//   if (bounces % 2 == 1) {
//     finalY = -mapMax + remainder;
//   } else {
//     finalY = mapMax - remainder;
//     v_by = -v_by;
//   }

//   console.log(`${v_bx}|${ballVel[1]}|${v_by}/${x_b}|${y_b}/${mapMax}/${timeToPaddle}/${nextReceiverX}/${predictedY}/${yFromBottom}/${bounces}/${remainder}/${finalY}`)

//   return {
//     ballPos: [nextReceiverX, Math.round(finalY * 100) / 100],
//     ballVel: [v_bx, v_by]
//   };
// }