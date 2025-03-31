export class Wall {
	constructor(id, x, y, rotation) {
		this.id = id;
		this.type = "wall";
		this.x = x;
		this.y = y;
		this.width = 7;
		this.height = 1;
		this.rotation = rotation;
		this.arenaRadius = 118;
	}

	update(deltaTime) {
		this.x += this.vx;
		this.y += this.vy;
	}

}
