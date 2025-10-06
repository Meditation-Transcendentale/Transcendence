import { Vector3, } from "../../../babylon"
import { Component } from "../ecs/Component.js";

export class PaddleComponent implements Component {
	public position: Vector3;
	public id: number;
	public offset: number;
	public serverOffset: number;
	public move: number;
	public lastMove: number;
	// public displayAsWall: boolean;

	constructor(id: number, position: Vector3, offset: number = 0, /*displayAsWall: boolean = true*/) {
		this.id = id;
		this.offset = offset;
		this.move = 0;
		this.lastMove = 0;
		this.position = position;
		this.serverOffset = 0;
		// this.displayAsWall = displayAsWall;
	}
}
