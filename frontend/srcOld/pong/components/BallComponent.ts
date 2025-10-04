import { Vector3, } from "@babylonImport";
import { Component } from "../ecs/Component.js";

export class BallComponent implements Component {
	public id: number;
	public serverPosition: Vector3 = Vector3.Zero();
	public lastServerUpdate: number = performance.now();
	public position: Vector3;
	public previousPosition: Vector3 = Vector3.Zero();
	public velocity: Vector3;
	// public destroy: boolean;

	constructor(id: number, position: Vector3, velocity: Vector3) {
		this.id = id;
		this.position = position;
		this.velocity = velocity;
		// this.destroy = false;
	}
}
