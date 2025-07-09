import {
  h_alignment,
  h_return_quality,
  h_opponent_difficulty,
  h_centering,
  h_corner_target
} from './heuristics.js';
import { weightsProfiles } from './weightsProfiles.js';

export function evaluateNode(stateNode, weightsIndex) {
  const myPaddle = stateNode.ballState.ballVel[0] >= 0 ? stateNode.aiPaddlePos : stateNode.playerPaddlePos;
  const opponentPaddle = stateNode.ballState.ballVel[0] >= 0 ? stateNode.playerPaddlePos : stateNode.aiPaddlePos;
  const receiveY = stateNode.ballState.ballPos[1];
  const targetY = stateNode.futureBallState.ballPos[1];
  const velY = stateNode.futureBallState.ballVel[1];

  const w = weightsProfiles[weightsIndex];

  const h1 = h_alignment(myPaddle, receiveY);
  const h2 = h_return_quality(velY);
  const h3 = h_opponent_difficulty(targetY, opponentPaddle);
  const h4 = h_centering(myPaddle);
  const h5 = h_corner_target(targetY);

  return (
    w.h1 * h1 +
    w.h2 * h2 +
    w.h3 * h3 +
    w.h4 * h4 +
    w.h5 * h5
  );
}