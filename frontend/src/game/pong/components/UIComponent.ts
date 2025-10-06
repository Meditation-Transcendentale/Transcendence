import { Vector2, } from "../../../babylon"
import GameUI from "../../GameUI";
import { Component } from "../ecs/Component.js";

export class UIComponent implements Component {
	public score: Vector2;
	public gameMode: string;
	public gameUI: GameUI;

	constructor(gameMode: string, gameUI: GameUI) {
		this.score = new Vector2(0, 0);
		this.gameMode = gameMode;
		this.gameUI = gameUI;
	}
}
