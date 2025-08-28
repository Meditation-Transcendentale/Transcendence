import { GameStateNode } from './GameStateNode.js';
import { predictBallState } from './physics.js';
import { BALL_ACCELERATION, STEP_SIZE, PADDLE_HEIGHT, MAP_HEIGHT, PADDLE_HALF_HEIGHT, PADDLE_AI_X, PADDLE_WIDTH, BALL_DIAM } from './constants.js';
import { evaluateNode } from './evaluate.js';


/**
 * Generate a range of Y positions around the position where the ball should cross the goal
 * @returns the range of Y positions
 */
function generateFullRange() {
	const lower = -(MAP_HEIGHT - PADDLE_HEIGHT) * 0.5;
	const upper = (MAP_HEIGHT - PADDLE_HEIGHT) * 0.5;
	const range = [];
	for (let y = lower; y <= upper; y += STEP_SIZE) {
		range.push(Math.round(y * 100) / 100);
	}
	return range;
}

/**
 * Expands the current node by simulating ball travel until it reaches AI or Opponent.
 * Each child represents a possible final position where the ball is received.
 * @param {*} node to expand
 */
export function expand(node) {
    const isAIMove = node.futureBallState.ballVel[0] <= 0;
    const paddlePositions = generateFullRange();
    
    for (const paddlePos of paddlePositions) {
        const relativeIntersectY = node.futureBallState.ballPos[1] - paddlePos;
        
        let rawNormY = relativeIntersectY / PADDLE_HALF_HEIGHT;
        rawNormY = Math.max(-1, Math.min(1, rawNormY));
        
        const deadZone = 0.0;
        let mappedY;
        if (Math.abs(rawNormY) < deadZone) {
            mappedY = 0;
        } else {
            mappedY = rawNormY > 0
                ? (rawNormY - deadZone) / (1 - deadZone)
                : (rawNormY + deadZone) / (1 - deadZone);
        }
        
        const maxBounceAngle = (75 * Math.PI) / 180;
        const bounceAngle = mappedY * maxBounceAngle;
        
        const speed = Math.hypot(node.ballState.ballVel[0], node.ballState.ballVel[1]);
        
        const directionX = isAIMove ? -BALL_ACCELERATION : +BALL_ACCELERATION
        const newVelX = speed * Math.cos(-bounceAngle) * directionX;
        const newVelY = speed * -Math.sin(-bounceAngle);
        
        const newBallVel = [newVelX, newVelY];
        const futureBallState = predictBallState(node.futureBallState.ballPos, newBallVel);
        
        let newNode;
        if (isAIMove)
            newNode = new GameStateNode(node.futureBallState, paddlePos, node.playerPaddlePos, futureBallState);
        else
            newNode = new GameStateNode(node.futureBallState, node.aiPaddlePos, paddlePos, futureBallState);
        
        newNode.evaluation = evaluateNode(newNode);
        node.children.push(newNode);
        newNode.parent = node;
        // console.log(`isAIMove:${isAIMove}|paddlePos${paddlePos}|${relativeIntersectY}|`)
    }
}

// export function expand(node) {
// 	const isAIMove = node.futureBallState.ballVel[0] >= 0;
// 	const paddlePositions = generateFullRange();
// 	for (const paddlePos of paddlePositions) {
// 		const distanceToBall = Math.abs(paddlePos - node.futureBallState.ballPos[1]);
// 		const newVelY = node.ballState.ballVel[1] * ((paddlePos - node.futureBallState.ballPos[1] >= 0) == (node.ballState.ballVel[1] >= 0) ? -BALL_ACCELERATION : BALL_ACCELERATION) * distanceToBall;
// 		const newVelX = node.ballState.ballVel[0] * -BALL_ACCELERATION;
// 		const newBallVel = [newVelX, newVelY];
// 		const futureBallState = predictBallState(node.futureBallState.ballPos, newBallVel);
// 		let newNode;
// 		if (isAIMove)
// 			newNode = new GameStateNode(node.futureBallState, paddlePos, node.playerPaddlePos, futureBallState);
// 		else
// 			newNode = new GameStateNode(node.futureBallState, node.aiPaddlePos, paddlePos, futureBallState);
// 		newNode.evaluation = evaluateNode(newNode);
// 		node.children.push(newNode);
// 		newNode.parent = node;
// 	}
// }