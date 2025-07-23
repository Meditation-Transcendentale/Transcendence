import SpatialGrid from "./SpatialGrid.js";

export default class Ball {
    constructor(id, arenaRadius, grid) {
        this.id = id;
        this.arenaRadius = arenaRadius;
        this.grid = grid;
        this.position = this.getRandomSpawnPosition();
        this.velocity = {
            x: (Math.random() - 0.5) * 50,
            y: (Math.random() - 0.5) * 50
        };
        this.radius = 0.75;
        this.grid.addObject(this);
    }

    getRandomSpawnPosition() {
        let angle = Math.random() * Math.PI * 2;
        let spawnRadius = Math.random() * (this.arenaRadius * 0.8); // 80% inside the arena
        return {
            x: spawnRadius * Math.cos(angle),
            y: spawnRadius * Math.sin(angle)
        };
    }

    update(deltaTime) {
        this.grid.removeObject(this);

        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;

        let distanceFromCenter = Math.sqrt(this.position.x ** 2 + this.position.y ** 2);
        if (distanceFromCenter > this.arenaRadius - this.radius) {
            let angle = Math.atan2(this.position.y, this.position.x);
            this.position.x = (this.arenaRadius - this.radius) * Math.cos(angle);
            this.position.y = (this.arenaRadius - this.radius) * Math.sin(angle);

            this.velocity.x *= -1;
            this.velocity.y *= -1;
        }

        this.handleCollisions();

        this.grid.addObject(this);
    }

    handleCollisions() {
        const nearbyBalls = this.grid.getNearbyObjects(this);
        for (const otherBall of nearbyBalls) {
            if (otherBall.id !== this.id) {
                const dx = otherBall.position.x - this.position.x;
                const dy = otherBall.position.y - this.position.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.radius * 2) {
                    const tempVx = this.velocity.x;
                    const tempVy = this.velocity.y;
                    this.velocity.x = otherBall.velocity.x;
                    this.velocity.y = otherBall.velocity.y;
                    otherBall.velocity.x = tempVx;
                    otherBall.velocity.y = tempVy;

                    const overlap = (this.radius * 2 - distance) / 2;
                    const angle = Math.atan2(dy, dx);
                    this.position.x -= Math.cos(angle) * overlap;
                    this.position.y -= Math.sin(angle) * overlap;
                    otherBall.position.x += Math.cos(angle) * overlap;
                    otherBall.position.y += Math.sin(angle) * overlap;
                }
            }
        }
    }
}
