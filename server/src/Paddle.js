import { Vector } from "./Vector";

export class Paddle {
	position = new Vector();
	rotation = new Vector();

	constructor(position, rotation) {
		this.position.set(position);
		this.rotation.set(rotation);
	}

	setPosition(x, y) {
		this.position.x = x;
		this.position.x = y;
	}

	setRotation(x, y) {
		this.rotation.x = x;
		this.rotation.x = y;
	}
}
