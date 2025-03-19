import { Vector3 } from "@babylonjs/core";
import { Component } from "../ecs/Component.js";

export class ShieldComponent implements Component {
	public angleFactor: number;
	public oldAngleFactor: number;
	public angle: number;
	public isActive: boolean;
	public lastInputDelay: number;

	public shieldAngle: number;
	public baseAngle: number;
	public cylinderCenter: Vector3;
	public cylinderAxis: Vector3;
	public intensity: number;

	constructor() {
		this.angleFactor = 0.5;
		this.oldAngleFactor = 0.5;
		this.angle = Math.PI * 0.5;
		this.isActive = false;
		this.lastInputDelay = performance.now();

		this.shieldAngle = Math.PI * 0.5;
		this.baseAngle = 0;
		this.cylinderCenter = new Vector3(0,1,0);
		this.cylinderAxis = new Vector3(0,1,0);
		this.intensity = 1;
	}
}