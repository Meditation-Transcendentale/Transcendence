import { FreeCamera, RenderTargetTexture, Vector3 } from "@babylonjs/core"
import { sceneManager } from "./SceneManager";

interface ICameraVue {
	position: Vector3,
	target: Vector3
}

export class CameraManager {
	public camera: FreeCamera;
	private vues: Map<string, ICameraVue>;

	constructor() {
		this.camera = sceneManager.camera;

		(sceneManager.textures.get("fogDepth") as RenderTargetTexture).activeCamera = this.camera;

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
		this.camera.position.copyFrom(vue.position);
		this.camera.setTarget(vue.target);
	}
}
