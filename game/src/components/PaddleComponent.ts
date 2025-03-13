import { Vector, Vector3 } from "@babylonjs/core";
import { Component } from "../ecs/Component.js";

export class PaddleComponent implements Component {
	public position: Vector3;
	public rotation: Vector3;
	public angleFactor: number;

	constructor(position: Vector3) {
		this.position = position;
		this.rotation = new Vector3(0, 0, 0);
		this.angleFactor = 0.5;
	}
}
