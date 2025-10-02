import { Vector2, Vector3 } from "@babylonjs/core";
import { sceneManager } from "./SceneManager";

export class Picker {
	public cursor: Vector2;

	private _enabled: boolean;


	constructor() {
		sceneManager.tracker.add("ballPosition", new Vector3(0, 0, 0));
		this.cursor = new Vector2();

		this._enabled = false;
	}

	public set enable(value: boolean) {
		if (!this._enabled && value) {
			window.addEventListener("click", (ev) => this.clickEvent(ev));
			window.addEventListener("mousemove", (ev) => this.moveEvent(ev));
			window.addEventListener("mouseout", (ev) => this.outEvent(ev));
		} else if (this._enabled && !value) {
			window.removeEventListener("click", (ev) => this.clickEvent(ev));
			window.removeEventListener("mousemove", (ev) => this.moveEvent(ev));
			window.removeEventListener("mouseout", (ev) => this.outEvent(ev));
		}
		this._enabled = value;
	}

	private clickEvent(ev: MouseEvent) { }

	private moveEvent(ev: MouseEvent) { }

	private outEvent(ev: MouseEvent) { }
}
