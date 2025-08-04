import { Vector2, } from "@babylonImport";
import { Component } from "../ecs/Component.js";

export class UIComponent implements Component {
	public score: Vector2;
	public gameMode: string;

	constructor(gameMode: string) {
		this.score = new Vector2(0, 0);
		this.gameMode = gameMode;
	}
}
