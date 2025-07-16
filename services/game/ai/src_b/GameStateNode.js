export class GameStateNode {
  constructor(ballState, aiPaddlePos, playerPaddlePos, futureBallState) {
    this.ballState = {
      ballPos: [...ballState.ballPos],
      ballVel: [...ballState.ballVel]
    };
    this.aiPaddlePos = aiPaddlePos;
    this.playerPaddlePos = playerPaddlePos;
    this.futureBallState = {
      ballPos: [...futureBallState.ballPos],
      ballVel: [...futureBallState.ballVel]
    };
    this.children = [];
    this.parent = null;
    this.alpha = 0;
    this.beta = 0;
  }
}