export default class SpatialGrid {
    constructor(cellSize) {
        this.cellSize = cellSize;
        this.grid = new Map();
    }

    getCellKey(x, y) {
        const cellX = Math.floor(x / this.cellSize);
        const cellY = Math.floor(y / this.cellSize);
        return `${cellX},${cellY}`;
    }

    addObject(id, x, y) {
        const key = this.getCellKey(x, y);
        if (!this.grid.has(key)) {
            this.grid.set(key, new Set());
        }
        this.grid.get(key).add(id);
    }

    removeObject(id, x, y) {
        const key = this.getCellKey(x, y);
        if (this.grid.has(key)) {
            this.grid.get(key).delete(id);
            if (this.grid.get(key).size === 0) {
                this.grid.delete(key);
            }
        }
    }

    getNearbyObjects(x, y) {
        const objects = new Set();
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const key = this.getCellKey(x + dx * this.cellSize, y + dy * this.cellSize);
                if (this.grid.has(key)) {
                    for (const id of this.grid.get(key)) {
                        objects.add(id);
                    }
                }
            }
        }
        return objects;
    }
}
