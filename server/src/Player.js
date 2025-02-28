import { Paddle } from "./Paddle";

export class Player {

	id;
	paddle;

	constructor(id, pos, rotation) {
		this.id = id;
		this.paddle = new Paddle(pos, rotation);
	}

	init(pos, rotation) {
		this.paddle.setPosition(pos.x, pos.y);
		this.paddle.setRotation(rotation.x, rotation.y);
	}
}
