import { config } from './utils/config.js';
import SpatialGrid from './SpatialGrid.js';
import Game from './Game.js';

const Physics = {
    update(deltaTime) {
        Game.balls.forEach(ball => ball.update(deltaTime));

        Object.values(Game.paddles).forEach(paddle => {
            if (!paddle.isStatic && typeof paddle.update === 'function') {
                paddle.update(deltaTime);
            }
        });

        const grid = new SpatialGrid(config.ARENA_WIDTH, config.ARENA_HEIGHT, 150);
        Game.balls.forEach(ball => grid.insert(ball));

        Game.balls.forEach(ball => {
            const nearbyBalls = grid.retrieve(ball);
            nearbyBalls.forEach(otherBall => {
                if (ball.id !== otherBall.id && Physics.detectBallCollision(ball, otherBall)) {
                    Physics.resolveBallCollision(ball, otherBall);
                }
            });
        });

        Game.balls.forEach(ball => {
            ball.checkWallCollision(config.ARENA_WIDTH, config.ARENA_HEIGHT, config.COLLISION_RESTITUTION);
        });

        // TODO: Integrate ball-to-paddle collision handling if needed.
    },

    detectBallCollision(ballA, ballB) {
        const dx = ballA.x - ballB.x;
        const dy = ballA.y - ballB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (ballA.radius + ballB.radius);
    },

    resolveBallCollision(ballA, ballB) {
        const dx = ballA.x - ballB.x;
        const dy = ballA.y - ballB.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = dx / distance;
        const ny = dy / distance;
        const dvx = ballA.vx - ballB.vx;
        const dvy = ballA.vy - ballB.vy;
        const velocityAlongNormal = dvx * nx + dvy * ny;
        if (velocityAlongNormal > 0) return;
        const restitution = config.COLLISION_RESTITUTION;
        const impulse = -(1 + restitution) * velocityAlongNormal / 2; // assume equal mass
        ballA.vx += impulse * nx;
        ballA.vy += impulse * ny;
        ballB.vx -= impulse * nx;
        ballB.vy -= impulse * ny;
    },

    getState() {
        return Game.getState();
    },
    clearDirty() {
        Game.clearDirty();
    }
};

export default Physics;

