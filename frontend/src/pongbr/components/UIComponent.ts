import { Vector2 } from "@babylonImport";
import { Component } from "../ecs/Component.js";

export class UIComponent implements Component {
	public score: Vector2;
	public static key = "UIComponent";

	constructor() {
		this.score = new Vector2(0, 0);
	}
}
