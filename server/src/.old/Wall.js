
export default class Wall {
    constructor(id, arenaRadius, grid) {
        this.id = id;
        this.arenaRadius = arenaRadius;
        this.grid = grid;
        this.width = 2;
        this.height = 1;
        this.radius = this.width / 2; // Used for collision detection

        let angle = (id / 100) * Math.PI * 2;
        this.position = {
            x: Math.cos(angle) * arenaRadius,
            y: Math.sin(angle) * arenaRadius
        };

        this.grid.addObject(this); // Add wall to spatial grid
    }
}
