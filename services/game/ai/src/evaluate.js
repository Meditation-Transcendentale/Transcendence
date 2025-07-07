import {
  h_alignment,
  h_straightness,
  h_stability,
  h_curvature,
  h_marginToWall
} from './heuristics.js';
import { weightsProfiles } from './weightsProfiles.js';

export function evaluateNode(stateNode, weightsIndex) {
  const myPaddle = stateNode.ballState.ballVel[0] > 0 ? stateNode.aiPaddlePos : stateNode.playerPaddlePos;
  const targetY = stateNode.ballState.ballPos[1];
  const velY = stateNode.futureBallState.ballVel[1];

  const w = weightsProfiles[weightsIndex];

  const h1 = h_alignment(myPaddle, targetY);
  const h2 = h_straightness(velY);
  const h3 = h_stability(myPaddle);
  const h4 = h_curvature(velY);
  const h5 = h_marginToWall(myPaddle);

  console.log(`${stateNode.ballState.ballPos[0]}|${stateNode.ballState.ballPos[1]}|${stateNode.ballState.ballVel[0]}|${stateNode.ballState.ballVel[1]}|${stateNode.aiPaddlePos}|${stateNode.playerPaddlePos}`)
  // console.log()
  return (
    w.h1 * h1 +
    w.h2 * h2 +
    w.h3 * h3 +
    w.h4 * h4 +
    w.h5 * h5
  );
}