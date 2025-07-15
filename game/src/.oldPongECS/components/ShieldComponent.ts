import { Vector3 } from "@babylonjs/core";
import { Component } from "../ecs/Component.js";

export class ShieldComponent implements Component {
	public angleFactor: number; // 0 = 180d arc cylinder, 1 = 0d arc cylinder
	public oldAngleFactor: number;
	public isActive: number;
	public lastInputDelay: number;

	constructor() {
		this.angleFactor = 0.5;
		this.oldAngleFactor = 0.5;
		this.isActive = 0.0;
		this.lastInputDelay = performance.now();
	}
}