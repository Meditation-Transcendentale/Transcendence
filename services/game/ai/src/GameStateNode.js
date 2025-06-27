export class GameStateNode {
  constructor(newBallState, aiPaddlePos, playerPaddlePos, futureBallState) {
    this.ballPos = [newBallState[0], newBallState[1]];
    this.ballVel = [newBallState[2], newBallState[3]];
    this.aiPaddlePos = aiPaddlePos;
    this.playerPaddlePos = playerPaddlePos;
    this.futureBallState = futureBallState;
  }
}