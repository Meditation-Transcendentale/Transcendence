import { weightsProfiles } from './weightsProfiles.js';
import {
  heuristic_time_to_intercept,
  heuristic_return_angle_variability,
  heuristic_opponent_disruption,
  heuristic_center_bias_correction,
  heuristic_entropy_reaction,
  heuristic_consistency
} from './heuristics.js';

export function evaluateNode(node, weightIndex) {
  const [ttiW, varW, disruptW, centerW, entropyW, consistencyW] = weightsProfiles[weightIndex];

  const isAIMove = node.ballState.ballVel[0] >= 0;
  const myPaddleY = isAIMove ? node.aiPaddlePos : node.playerPaddlePos;
  const oppPaddleY = isAIMove ? node.playerPaddlePos : node.aiPaddlePos;

  const tti = heuristic_time_to_intercept(node, myPaddleY);
  const variability = heuristic_return_angle_variability(node);
  const disruption = heuristic_opponent_disruption(node, oppPaddleY);
  const center = heuristic_center_bias_correction(node);
  const entropy = heuristic_entropy_reaction(node, oppPaddleY);
  const consistency = heuristic_consistency(node);

  // console.log(`Score:${ttiW * tti +
  //   varW * variability +
  //   disruptW * disruption +
  //   centerW * center +
  //   entropyW * entropy +
  //   consistencyW * consistency}`);

  return (
    ttiW * tti +
    varW * variability +
    disruptW * disruption +
    centerW * center +
    entropyW * entropy +
    consistencyW * consistency
  );
}
