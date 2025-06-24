import { Component } from "../ecs/Component.js";

export class InputComponent implements Component {
	public isLocal: boolean = false;
	public gameMode: string;
	constructor(isLocal: boolean = false, gameMode: string) {
		this.isLocal = isLocal;
		this.gameMode = gameMode;
	}
}
