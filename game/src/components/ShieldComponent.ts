import { Component } from "../ecs/Component.js";

export class ShieldComponent implements Component {
	public angleFactor: number;
	public oldAngleFactor: number;
	public angle: number;
	public shieldIsActivate: boolean;
	public lastInputDelay: number;

	constructor() {
		this.angleFactor = 0.5;
		this.oldAngleFactor = 0.5;
		this.angle = Math.PI * 0.5;
		this.shieldIsActivate = false;
		this.lastInputDelay = performance.now();
	}
}