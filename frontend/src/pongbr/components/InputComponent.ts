import { Component } from "../ecs/Component.js";

export class InputComponent implements Component {
	public isLocal: boolean = false;
	constructor(isLocal: boolean = false) {
		this.isLocal = isLocal;
	}
}
