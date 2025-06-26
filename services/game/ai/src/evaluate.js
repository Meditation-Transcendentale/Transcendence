import {
  heuristic_time_to_intercept,
  heuristic_return_angle_variability,
  heuristic_opponent_disruption,
  heuristic_center_bias_correction,
  heuristic_entropy_reaction,
  heuristic_consistency,
  heuristic_distance_to_predicted_return
} from './heuristics.js';

import { PADDLE_HALF_HEIGHT } from './constants.js';

export function evaluateNode(node, phase = "offense", predictedReturnY = null) {
  const myPaddleY = node.ballVel[0] > 0 ? node.aiPaddlePos : node.playerPaddlePos;
  const oppPaddleY = node.ballVel[0] < 0 ? node.playerPaddlePos : node.aiPaddlePos;

  const offenseWeights = {
    tti: 0.2,
    var: 0.3,
    disrupt: 0.25,
    center: 0.15,
    entropy: 0.25,
    consistency: 0.1
  };

  const defenseWeights = {
    tti: 0.4,
    var: 0.0,
    disrupt: 0.0,
    center: 0.3,
    entropy: 0.3,
    consistency: 0.1,
    returnDist: 0.5
  };

  const w = phase === "offense" ? offenseWeights : defenseWeights;

  const [ttiOpt, ttiPess] = heuristic_time_to_intercept(node, myPaddleY);
  const [varOpt, varPess] = heuristic_return_angle_variability(node);
  const [disruptOpt, disruptPess] = heuristic_opponent_disruption(node, oppPaddleY);
  const [centerOpt, centerPess] = heuristic_center_bias_correction(node);
  const [entropyOpt, entropyPess] = heuristic_entropy_reaction(node, oppPaddleY);
  const [consistencyOpt, consistencyPess] = heuristic_consistency(node);

  let returnDistOpt = 0, returnDistPess = 0;
  if (phase === "defense" && predictedReturnY !== null) {
    [returnDistOpt, returnDistPess] = heuristic_distance_to_predicted_return(node, predictedReturnY);
  }

  const optimistic =
    w.tti * ttiOpt +
    w.var * varOpt +
    w.disrupt * disruptOpt +
    w.center * centerOpt +
    w.entropy * entropyOpt +
    w.consistency * consistencyOpt +
    (w.returnDist || 0) * returnDistOpt;

  const pessimistic =
    w.tti * ttiPess +
    w.var * varPess +
    w.disrupt * disruptPess +
    w.center * centerPess +
    w.entropy * entropyPess +
    w.consistency * consistencyPess +
    (w.returnDist || 0) * returnDistPess;

  return [optimistic, pessimistic];
}
