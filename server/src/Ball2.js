import SpatialGrid from "./SpatialGrid.js";
import Player from "./Player.js";

export default class Ball {
    constructor(id, arenaRadius, grid) {
		this.speed = 20;
        this.id = id;
        this.arenaRadius = arenaRadius;
        this.grid = grid;
        this.position = this.getRandomSpawnPosition();
        this.velocity = {
            x: (Math.random() - 0.5) * this.speed,
            y: (Math.random() - 0.5) * this.speed
        };
        this.radius = 0.25;
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

    // update(deltaTime) {
    //     this.grid.removeObject(this);

    //     this.position.x += this.velocity.x * deltaTime;
    //     this.position.y += this.velocity.y * deltaTime;

    //     let distanceFromCenter = Math.sqrt(this.position.x ** 2 + this.position.y ** 2);
    //     if (distanceFromCenter > this.arenaRadius - this.radius) {
    //         let angle = Math.atan2(this.position.y, this.position.x);
    //         this.position.x = (this.arenaRadius - this.radius) * Math.cos(angle);
    //         this.position.y = (this.arenaRadius - this.radius) * Math.sin(angle);

    //         this.velocity.x *= -1;
    //         this.velocity.y *= -1;
    //     }

    //     this.handleCollisions();

    //     this.grid.addObject(this);
    // }

	update(deltaTime, player) {
		this.grid.removeObject(this);
		if (deltaTime) {
			const ballPosition = this.position;

			if (player.getAlive()){
				const playerPosition = player.position;
				const distanceBallPlayer = Math.sqrt(((playerPosition.x - ballPosition.x) * (playerPosition.x - ballPosition.x)) + ((playerPosition.y - ballPosition.y) * (playerPosition.y - ballPosition.y)));
				const collideGoal = distanceBallPlayer - this.radius < 0.5;
				const collideShield = this.detectCollisionShield(player);

				if (collideGoal) {
					player.die();
				}

				if (collideGoal || collideShield){
					let newOrientation = {
						x: ballPosition.x - playerPosition.x,
						y:ballPosition.y - playerPosition.y
					};
					const len = Math.sqrt((newOrientation.x * newOrientation.x) + (newOrientation.y * newOrientation.y));
					newOrientation.x /= len;
					newOrientation.y /= len;
					this.velocity.x = newOrientation.x * this.speed;
					this.velocity.y = newOrientation.y * this.speed;
				}
			}
			this.hitWall();
			ballPosition.x += this.velocity * deltaTime;
			ballPosition.y += this.velocity * deltaTime;
			this.grid.addObject(this);
		}
	}

	hitWall() {
		let distanceFromCenter = Math.sqrt(this.position.x ** 2 + this.position.y ** 2);
        if (distanceFromCenter > this.arenaRadius - this.radius) {
            let angle = Math.atan2(this.position.y, this.position.x);
            this.position.x = (this.arenaRadius - this.radius) * Math.cos(angle);
            this.position.y = (this.arenaRadius - this.radius) * Math.sin(angle);

            this.velocity.x *= -1;
            this.velocity.y *= -1;
        }
	}

	detectCollisionShield(player) {
		const ballPosition = this.position;
		const playerPosition = player.position;
		const shieldRotation = player.rotation; // value between PI and -PI
		const shieldAngle = player.shieldAngle;
		const shieldRadius = player.shieldRadius;

		const v1 = {
			x: ballPosition.x - playerPosition.x,
			y: ballPosition.y - playerPosition.y
		};
		const ballLen = Math.sqrt((v1.x * v1.x) + (v1.y * v1.y));
		v1.x /= ballLen;
		v1.y /= ballLen;
		const v2 = {
			x: Math.sin(shieldRotation),
			y: Math.cos(shieldRotation)
		};

		const dot = (v1.x * v2.x) + (v1.z * v2.z);
		const det = (v1.x * v2.z) - (v1.z * v2.x);
		const angle = Math.atan2(det, dot);

		return (Math.abs(angle) <= shieldAngle) && (shieldAngle > 0) && (ballLen - ballRadius <= shieldRadius) && (ballLen - ballRadius > 0.5) && (player.shieldVisibility == 1);
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
