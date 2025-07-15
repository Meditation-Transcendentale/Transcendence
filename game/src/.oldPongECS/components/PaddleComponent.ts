import { Vector3 } from "@babylonjs/core";
import { Component } from "../ecs/Component.js";

export class PaddleComponent implements Component {
	public position: Vector3;
	public rotation: Vector3;
	public velocity: Vector3;
	public isAlive: boolean;

	constructor(position: Vector3) {
		this.position = position;
		this.velocity = new Vector3(0, 0, 0);
		this.rotation = new Vector3(0, 0, 0);
		this.isAlive = true;
	}
}
