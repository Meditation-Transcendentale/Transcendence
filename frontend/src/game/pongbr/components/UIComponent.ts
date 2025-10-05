import { Vector2 } from "../../../babylon";
import GameUI from "../../GameUI";
import { Component } from "../ecs/Component.js";

export class UIComponent implements Component {
	public score: Vector2;
	public static key = "UIComponent";
	public gameUI: GameUI;

	constructor(gameUI: GameUI) {
		this.score = new Vector2(0, 0);
		this.gameUI = gameUI;
	}
}
