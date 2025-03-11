import { Ball } from './Ball.js';
import { Paddle } from './Paddle.js';
import { config } from './utils/config.js';

class Game {
    constructor() {
        this.arenaRadius = 120;
        this.balls = [];
        this.paddles = {};  // Key: playerId, Value: Paddle instance
        this.init();
    }

    init() {
        let angle = Math.random() * Math.PI * 2;

        // Create initial balls; for example, random positions
        for (let i = 0; i < config.BALL_COUNT; i++) {
            const ball = new Ball(
                i + 1,
                Math.random() * (this.arenaRadius * 0.8) * Math.cos(angle),
                Math.random() * (this.arenaRadius * 0.8) * Math.sin(angle),
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                config.BALL_RADIUS
            );
            //console.log("creating ball=" + i);
            this.balls.push(ball);
        }
    }

    updateBall() {
        for (id of this.balls)
            this.balls[id].updateBall(1);
    }
    updatePaddleInput(playerId, input) {
        const paddle = this.paddles[playerId];
        if (paddle) {
            paddle.move(input.direction, input.deltaTime || 16.67);
        }
    }
    addPaddle(playerId, startX, startY) {
        const paddle = new Paddle(
            playerId,
            config.PADDLE_SPEED
        );
        this.paddles[playerId] = paddle;
    }

    convertPaddleToWall(playerId) {
        const paddle = this.paddles[playerId];
        if (paddle) {
            paddle.isStatic = true;
        }
    }

    getState() {
        return {
            balls: this.balls.map(ball => ({
                id: ball.id,
                x: ball.x,
                y: ball.y,
                vx: ball.vx,
                vy: ball.vy,
            })),
            paddles: Object.keys(this.paddles).reduce((state, key) => {
                const paddle = this.paddles[key];
                state[key] = {
                    id: paddle.id,
                    offset: paddle.offset,
                    isStatic: !!paddle.isStatic
                };
                return state;
            }, {})
        };
    }
}

export default new Game();
