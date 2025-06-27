import {
  heuristic_time_to_intercept,
  heuristic_return_angle_variability,
  heuristic_opponent_disruption,
  heuristic_center_bias_correction,
  heuristic_entropy_reaction,
  heuristic_consistency,
  heuristic_distance_to_predicted_return
} from './heuristics.js';

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

  const tti = heuristic_time_to_intercept(node, myPaddleY);
  const variability = heuristic_return_angle_variability(node);
  const disruption = heuristic_opponent_disruption(node, oppPaddleY);
  const centerBias = heuristic_center_bias_correction(node);
  const entropy = heuristic_entropy_reaction(node, oppPaddleY);
  const consistency = heuristic_consistency(node);

  let returnDist = 0;
  if (phase === "defense" && predictedReturnY !== null) {
    returnDist = heuristic_distance_to_predicted_return(node, predictedReturnY);
  }

  const score =
    w.tti * tti +
    w.var * variability +
    w.disrupt * disruption +
    w.center * centerBias +
    w.entropy * entropy +
    w.consistency * consistency +
    (w.returnDist || 0) * returnDist;

  if (!Number.isFinite(score)) {
    console.warn("NaN in evaluateNode", {
      node,
      ballPos: node.ballPos,
      ballVel: node.ballVel,
      futureBallState: node.futureBallState
    });
  }
  return score;
}
