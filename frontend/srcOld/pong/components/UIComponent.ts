import { Vector2, } from "@babylonImport";
import { Component } from "../ecs/Component.js";
import GameUI from "../../spa/GameUI.js";

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
