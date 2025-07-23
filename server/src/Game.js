import { Ball } from './Ball.js';
import { Paddle } from './Paddle.js';
import { config } from './utils/config.js';

class Game {
    constructor() {
        this.arenaRadius = 120;
        this.balls = [];
        this.paddles = {};  // Key: playerId, Value: Paddle instance
        this.walls = {};
        this.init();
    }

    init() {
        let angle = Math.random() * Math.PI * 2;

        for (let i = 0; i < config.BALL_COUNT; i++) {
            const ball = new Ball(
                i,
                Math.random() * (this.arenaRadius * 0.8) * Math.cos(angle),
                Math.random() * (this.arenaRadius * 0.8) * Math.sin(angle),
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                config.BALL_RADIUS
            );
            //console.log("creating ball=" + i);
            this.balls.push(ball);
        }
        for (let i = 0; i < 100; i++) {
            this.walls[i] = {
                id: i,
                wall: true,
                dirty: true
            }
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

    setWallOff(playerId) {
        this.walls[playerId].wall = false;
        this.walls[playerId].dirty = true;
    }

    setWallOn(playerId) {
        this.walls[playerId].wall = true;
        this.walls[playerId].dirty = true;
    }

    clearDirty() {
        Object.values(this.walls).forEach(wall => { wall.dirty = false; });
    }
    setDirty() {
        Object.values(this.walls).forEach(wall => { wall.dirty = true; });
    }
    getFullState() {
        return {
            balls: this.balls.map(ball => ({ /* ball props */ })),
            walls: Object.values(this.walls).map(wall => ({
                id: wall.id,
                wall: wall.wall
            })),
            paddles: Object.keys(this.paddles).reduce((state, key) => {
                const paddle = this.paddles[key];
                state[key] = {
                    id: paddle.id,
                    offset: paddle.offset
                };
                return state;
            }, {})
        };
    }

    getState() {
        const dirtyWalls = Object.values(this.walls)
            .filter(wall => wall.dirty)
            .map(wall => ({
                id: wall.id,
                wall: wall.wall
            }));

        //console.log("Dirty walls to send:", dirtyWalls);

        const state = {
            balls: this.balls.map(ball => ({
                id: ball.id,
                x: ball.x,
                y: ball.y,
                vx: ball.vx,
                vy: ball.vy,
            })),
            walls: dirtyWalls,
            paddles: Object.keys(this.paddles).reduce((acc, key) => {
                const paddle = this.paddles[key];
                acc[key] = {
                    id: paddle.id,
                    offset: paddle.offset
                };
                return acc;
            }, {})
        };

        // Clear the dirty flag only after confirming state is built
        Object.values(this.walls).forEach(wall => { wall.dirty = false; });
        return state;
    }
}

export default new Game();
