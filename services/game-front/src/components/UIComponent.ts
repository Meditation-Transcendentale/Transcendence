import { Vector2 } from "@babylonjs/core";
import { Component } from "../ecs/Component.js";

export class UIComponent implements Component {
	public score: Vector2;

	constructor() {
		this.score = new Vector2(0, 0);
	}
}