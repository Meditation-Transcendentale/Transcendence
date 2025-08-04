// physics-data.js

import { ENTITY_MASKS } from './physics-config.js';

export class PhysicsData {
	constructor(maxEntities) {
		this.maxEntities = maxEntities;
		this.count = 0;

		// Position and velocity arrays
		this.posX = new Float32Array(maxEntities);
		this.posY = new Float32Array(maxEntities);
		this.velX = new Float32Array(maxEntities);
		this.velY = new Float32Array(maxEntities);

		// Collision data
		this.radius = new Float32Array(maxEntities);
		this.mask = new Uint8Array(maxEntities);
		this.isEliminated = new Uint8Array(maxEntities);

		// Transform data for rectangles
		this.halfW = new Float32Array(maxEntities);
		this.halfH = new Float32Array(maxEntities);
		this.rot = new Float32Array(maxEntities);

		// Entity recycling
		this.freeList = [];
		this.generation = new Uint16Array(maxEntities);
	}

	create(mask) {
		let id;
		if (this.freeList.length > 0) {
			id = this.freeList.pop();
			this.generation[id]++;
		} else {
			if (this.count >= this.maxEntities) {
				throw new Error('Maximum entities exceeded');
			}
			id = this.count++;
			this.generation[id] = 0;
		}

		this.mask[id] = mask;
		this.posX[id] = this.posY[id] = 0;
		this.velX[id] = this.velY[id] = 0;
		this.radius[id] = this.halfW[id] = this.halfH[id] = 1;
		this.rot[id] = 0;
		this.isEliminated[id] = 0;

		return id;
	}

	destroy(id) {
		if (id < 0 || id >= this.count) return;
		this.mask[id] = ENTITY_MASKS.NONE;
		this.freeList.push(id);
	}

	isActive(id) {
		return id >= 0 && id < this.count && this.mask[id] !== ENTITY_MASKS.NONE;
	}

	eliminateEntity(id) {
		if (this.isActive(id)) {
			this.isEliminated[id] = 1;
		}
	}

	moveEntityAway(id, distance) {
		if (this.isActive(id)) {
			this.posX[id] = distance;
			this.posY[id] = distance;
			this.velX[id] = 0;
			this.velY[id] = 0;
		}
	}

	getEntityCountByMask(mask) {
		let count = 0;
		for (let i = 0; i < this.count; i++) {
			if ((this.mask[i] & mask) !== 0 && this.isEliminated[i] === 0) {
				count++;
			}
		}
		return count;
	}

	reset() {
		this.count = 0;
		this.freeList.length = 0;
	}

	getStats() {
		return {
			totalEntities: this.count,
			freeEntities: this.freeList.length,
			activeEntities: this.count - this.freeList.length,
			ballCount: this.getEntityCountByMask(ENTITY_MASKS.BALL),
			paddleCount: this.getEntityCountByMask(ENTITY_MASKS.PADDLE),
			pillarCount: this.getEntityCountByMask(ENTITY_MASKS.PILLAR)
		};
	}
}
