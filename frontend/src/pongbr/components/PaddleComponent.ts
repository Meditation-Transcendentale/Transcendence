import { Vector3 } from "@babylonImport";
import { Component } from "../ecs/Component.js";

export class PaddleComponent implements Component {
	public position: Vector3;
	public id: number;
	public offset: number;
	public maxoffset: number;
	public baseRotation: number   // <— new
	public speed: number   // <— new
	public static key = "PaddleComponent";
	// public displayAsWall: boolean;

	constructor(id: number, position: Vector3, offset: number = 0, maxoffset: number, baseRotation: number, speed: number) {
		this.id = id;
		this.offset = offset;
		this.maxoffset = maxoffset;
		this.position = position;
		this.baseRotation = baseRotation;
		this.speed = speed;
		// this.displayAsWall = displayAsWall;
	}
}
