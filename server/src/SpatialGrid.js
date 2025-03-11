class SpatialGrid {
    constructor(width, height, cellSize) {
        this.cellSize = cellSize;
        this.cols = Math.ceil(width / cellSize);
        this.rows = Math.ceil(height / cellSize);
        this.grid = Array.from({ length: this.cols * this.rows }, () => []);
    }

    getIndex(x, y) {
        const col = Math.floor(x / this.cellSize);
        const row = Math.floor(y / this.cellSize);
        return row * this.cols + col;
    }

    insert(obj) {
        const index = this.getIndex(obj.x, obj.y);
        if (index >= 0 && index < this.grid.length) {
            this.grid[index].push(obj);
        }
    }

    retrieve(obj) {
        const col = Math.floor(obj.x / this.cellSize);
        const row = Math.floor(obj.y / this.cellSize);
        let objects = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const neighborCol = col + i;
                const neighborRow = row + j;
                if (
                    neighborCol >= 0 && neighborCol < this.cols &&
                    neighborRow >= 0 && neighborRow < this.rows
                ) {
                    const index = neighborRow * this.cols + neighborCol;
                    objects = objects.concat(this.grid[index]);
                }
            }
        }
        return objects;
    }
}

export default SpatialGrid;
