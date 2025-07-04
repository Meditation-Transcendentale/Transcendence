import { weightsProfiles } from './weightsProfiles.js';

import {
  h_distanceToBall,
  h_opponentMisalign,
  h_ballDirectionFavor,
  h_centering,
  h_timeToCollision
} from './heuristics.js';

export function evaluateNode(stateNode, weightsIndex) {
  const aiY = stateNode.aiPaddlePos;
  const playerY = stateNode.playerPaddlePos;
  const collisionY = stateNode.ballState.ballPos[1];
  const ballDirX = stateNode.ballState.ballVel[0];
  const framesToCollision = stateNode.framesToCollision ?? 0;

  const h1 = h_distanceToBall(aiY, collisionY);
  const h2 = h_opponentMisalign(playerY, collisionY);
  const h3 = h_ballDirectionFavor(ballDirX);
  const h4 = h_centering(aiY);
  const h5 = h_timeToCollision(framesToCollision);

  return (
    weightsProfiles[weightsIndex].h1 * h1 +
    weightsProfiles[weightsIndex].h2 * h2 +
    weightsProfiles[weightsIndex].h3 * h3 +
    weightsProfiles[weightsIndex].h4 * h4 +
    weightsProfiles[weightsIndex].h5 * h5
  );
}