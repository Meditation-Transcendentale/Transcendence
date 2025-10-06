import { Vector3 } from "../../../babylon";
import { Component } from "../ecs/Component.js";

// export class PaddleComponent implements Component {
// 	public position: Vector3;
// 	public id: number;          // Original player ID (stays constant)
// 	public paddleIndex: number; // Current paddle index from physics (changes after rebuild)
// 	public offset: number;
// 	public serverOffset: number;
// 	public maxoffset: number;
// 	public baseRotation: number   // <— new
// 	public speed: number   // <— new
// 	public lastServerOffset!: number;
// 	public static key = "PaddleComponent";
// 	// public displayAsWall: boolean;
//
// 	constructor(id: number, position: Vector3, offset: number = 0, maxoffset: number, baseRotation: number, speed: number) {
// 		this.id = id;
// 		this.paddleIndex = id; // Initially same as ID, will change after rebuilds
// 		this.offset = offset;
// 		this.serverOffset = offset;
// 		this.maxoffset = maxoffset;
// 		this.position = position;
// 		this.baseRotation = baseRotation;
// 		this.speed = speed;
// 		// this.displayAsWall = displayAsWall;
// 	}
// }

export class PaddleComponent implements Component {
	public paddleIndex: number;
	public offset: number;
	public serverOffset: number;
	public maxoffset: number;
	public baseRotation: number;
	public speed: number;
	public isLocal: boolean;

	public static key = "PaddleComponent";

	constructor(
		paddleIndex: number,
		offset: number,
		maxoffset: number,
		baseRotation: number,
		speed: number,
		isLocal: boolean
	) {
		this.paddleIndex = paddleIndex;
		this.offset = offset;
		this.serverOffset = offset;
		this.maxoffset = maxoffset;
		this.baseRotation = baseRotation;
		this.speed = speed;
		this.isLocal = isLocal;
	}
}
