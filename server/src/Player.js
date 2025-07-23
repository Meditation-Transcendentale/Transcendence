import Paddle from "./Paddle.js";

export default class Player {
    id;
    constructor(id) {
        this.id = id;
		this.isAlive = 1;

		this.velocity = {x:0, y:0};

		this.goalRadius = 0.5;
		this.shieldRadius = 0.825;
		this.shieldBaseScale = 0.5;
		this.oldShieldScale = shieldBaseScale;
		this.shieldScale = shieldBaseScale;
		this.shieldAngle = Math.PI * 0.5 * this.shieldScale;
		this.shieldVisibility = false;

		this.lastInputDelay = performance.now();

        this.dirty = false;
		this.position = this.getRandomSpawnPosition();
		this.rotation = 0;

		this.speed = 0.05;
		this.stopThreshold = 0.05;
    }

	getRandomSpawnPosition() {
        let angle = Math.random() * Math.PI * 2;
        let spawnRadius = ((Math.random() * (0.9 - 0.7)) + 0.7) * this.arenaRadius; // 20% from edge of the arena
        return {
            x: spawnRadius * Math.cos(angle),
            y: spawnRadius * Math.sin(angle)
        };
    }

    updateState(newPosition, newRotation) {
        this.paddle.update(newPosition, newRotation);
        this.dirty = true;
    }

    clearDirty() {
        this.dirty = false;
    }

    update(newPosition, newRotation) {
        this.position = newPosition;
        this.rotation = newRotation;
    }

	updateShield(visibility) {
		if (!this.isAlive) return;

		this.shieldVisibility = visibility;
		if (visibility === 1) {
			this.lastInputDelay = performance.now();
			this.shieldScale = Math.max(0, this.shieldScale - 0.01);
		} else if (performance.now() - this.lastInputDelay >= 500) {
			this.shieldScale = Math.min(this.shieldBaseScale, this.shieldScale + this.regenRate);
		}

		if (this.shieldScale == 0)
			this.shieldVisibility = 0;

		if (this.oldShieldScale != this.shieldScale)
			this.shieldAngle = Math.PI * 0.5 * this.shieldScale;

		this.oldShieldScale = this.shieldScale;
	}

	orientMesh(targetPos) {

		const direction = {
			x: targetPos.x - this.position.x,
			y: targetPos.y - this.position.y
		};

		const distance = Math.sqrt((direction.x * direction.x) + (direction.y * direction.y));
		if (distance >= this.stopThreshold)
			this.rotation = Math.atan2(direction.x, direction.y); //potential inversion between x and y

		if (distance < this.stopThreshold) { 
			this.velocity.x = 0;
			this.velocity.y = 0;
		} else {
			direction.x /= distance;
			direction.y /= distance;
			this.velocity.x += (direction.x * this.speed - this.velocity.x) * 0.5;
			this.velocity.y += (direction.y * this.speed - this.velocity.y) * 0.5;
		}
	}

	getAlive() {
		return this.isAlive;
	}

	die() {
		this.isAlive = false;
	}
}
