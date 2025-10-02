import { Vector3 } from "@babylonjs/core"
import { Assets } from "./Assets";

interface ICameraVue {
	position: Vector3,
	target: Vector3
}

export class CameraManager {
	public assets: Assets;
	private vues: Map<string, ICameraVue>;

	constructor(assets: Assets) {
		this.assets = assets;

		this.vues = new Map<string, ICameraVue>;
		this.vues.set("home", {
			position: new Vector3(-2.7, 4.5, 22),
			target: new Vector3(-2.7, 4.5, 22).addInPlaceFromFloats(0.075, 0.07, -0.99),
		})
	}

	public set vue(key: string) {
		const vue = this.vues.get(key);
		if (!vue)
			return;
		this.assets.camera.position.copyFrom(vue.position);
		this.assets.camera.setTarget(vue.target);
	}
}
