// spatial-grid.js

export class UniformGrid {
	constructor(cellSize, maxItemsPerCell = 64) {
		this.cellSize = cellSize;
		this.maxItemsPerCell = maxItemsPerCell;
		this.invCellSize = 1.0 / cellSize;
		this.buckets = new Map();
	}

	reset() {
		this.buckets.clear();
	}

	getKey(gx, gy) {
		return (gx << 16) | (gy & 0xFFFF);
	}

	add(id, x, y, radius = 0) {
		const minGx = Math.floor((x - radius) * this.invCellSize);
		const maxGx = Math.floor((x + radius) * this.invCellSize);
		const minGy = Math.floor((y - radius) * this.invCellSize);
		const maxGy = Math.floor((y + radius) * this.invCellSize);

		for (let gx = minGx; gx <= maxGx; gx++) {
			for (let gy = minGy; gy <= maxGy; gy++) {
				const key = this.getKey(gx, gy);
				let bucket = this.buckets.get(key);
				if (!bucket) {
					bucket = [];
					this.buckets.set(key, bucket);
				}
				if (bucket.length < this.maxItemsPerCell) {
					bucket.push(id);
				}
			}
		}
	}

	addBulk(entities) {
		for (const entity of entities) {
			this.add(entity.id, entity.x, entity.y, entity.radius);
		}
	}

	getPotentialPairs() {
		const pairs = new Set();
		for (const bucket of this.buckets.values()) {
			if (bucket.length < 2) continue;

			for (let i = 0; i < bucket.length; i++) {
				for (let j = i + 1; j < bucket.length; j++) {
					const idA = bucket[i];
					const idB = bucket[j];
					const pairKey = idA < idB ? `${idA},${idB}` : `${idB},${idA}`;
					pairs.add(pairKey);
				}
			}
		}
		return pairs;
	}

	getStats() {
		let totalItems = 0;
		let maxBucketSize = 0;
		let bucketsUsed = 0;

		for (const bucket of this.buckets.values()) {
			bucketsUsed++;
			totalItems += bucket.length;
			maxBucketSize = Math.max(maxBucketSize, bucket.length);
		}

		return {
			bucketsUsed,
			totalItems,
			maxBucketSize,
			averageItemsPerBucket: bucketsUsed > 0 ? totalItems / bucketsUsed : 0
		};
	}
}
