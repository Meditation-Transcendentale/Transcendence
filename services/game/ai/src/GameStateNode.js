export class GameStateNode {
  constructor(ballPos, ballVel, aiPaddlePos, playerPaddlePos, nextBallPos) {
    this.ballPos = ballPos;
    this.ballVel = ballVel;
    this.aiPaddlePos = aiPaddlePos;
    this.playerPaddlePos = playerPaddlePos;
    this.nextBallPos = nextBallPos;
    this.children = [];
    this.parent = null;
    this.alpha = 0;
    this.beta = 0;
  }
}