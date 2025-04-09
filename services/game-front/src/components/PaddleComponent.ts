import { Vector3 } from "@babylonjs/core";
import { Component } from "../ecs/Component.js";

export class PaddleComponent implements Component {
	public position: Vector3;
	public id: number;
	public offset: number;
	public displayAsWall: boolean;

	constructor(id: number, position: Vector3, offset: number = 0, displayAsWall: boolean = true) {
		this.id = id;
		this.offset = offset;
		this.position = position;
		this.displayAsWall = displayAsWall;
	}
}
