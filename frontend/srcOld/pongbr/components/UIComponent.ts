import { Vector2 } from "@babylonImport";
import { Component } from "../ecs/Component.js";
import GameUI from "../../spa/GameUI.js";

export class UIComponent implements Component {
	public score: Vector2;
	public static key = "UIComponent";
	public gameUI: GameUI;

	constructor(gameUI: GameUI) {
		this.score = new Vector2(0, 0);
		this.gameUI = gameUI;
	}
}
