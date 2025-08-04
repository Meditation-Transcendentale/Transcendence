import {
    h_alignment,
    h_return_quality,
    h_opponent_difficulty,
    h_centering,
    h_corner_target
} from './heuristics.js'

export function evaluateNode(gameStateNode) {
  const targetY = gameStateNode.ballState.ballPos[1];
  const velY = gameStateNode.ballState.ballVel[1];
  const myPaddleY = gameStateNode.aiPaddlePos;
  const opponentPaddleY = gameStateNode.playerPaddlePos;
  
  const base_score = (
    h_alignment(myPaddleY, targetY) * 2.0 +
    h_return_quality(velY) * 1.5 +
    h_opponent_difficulty(targetY, opponentPaddleY) * 1.8 +
    h_centering(myPaddleY) * 0.8 +
    h_corner_target(targetY) * 1.2
  );
  
  const uncertainty = calculate_uncertainty(gameStateNode);
  
  gameStateNode.evaluation.alpha = base_score - uncertainty;
  gameStateNode.evaluation.beta = base_score + uncertainty;
  
  return {
    optimistic: gameStateNode.evaluation.beta,
    pessimistic: gameStateNode.evaluation.alpha,
  };
}

function calculate_uncertainty(gameStateNode) {
  let uncertainty = 5;
  
  const targetY = gameStateNode.ballState.ballPos[1];
  const velY = gameStateNode.ballState.ballVel[1];
  const myPaddleY = gameStateNode.aiPaddlePos;
  const opponentPaddleY = gameStateNode.playerPaddlePos;
  
  uncertainty += Math.abs(targetY - myPaddleY) * 0.1;
  
  uncertainty += Math.abs(velY) * 0.5;
  
  if (Math.abs(targetY - opponentPaddleY) > 20) {
    uncertainty *= 0.7;
  }
  
  const ballSpeed = Math.sqrt(
    gameStateNode.ballState.ballVel[0] ** 2 + 
    gameStateNode.ballState.ballVel[1] ** 2
  );
  if (ballSpeed > 15) {
    uncertainty *= 1.3;
  }
  
  return uncertainty;
}