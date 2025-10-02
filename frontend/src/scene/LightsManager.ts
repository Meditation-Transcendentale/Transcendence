import { FreeCamera, SpotLight } from "../babylon";
import { sceneManager } from "./SceneManager";

export class LightManager {
	private camera: FreeCamera;
	private torche: SpotLight;

	private _enable: boolean;
	constructor() {
		this.camera = sceneManager.camera;
		this.torche = sceneManager.lights.get("torche") as SpotLight;

		sceneManager.tracker.add("torchePosition", this.torche.position);
		sceneManager.tracker.add("torcheDirection", this.torche.direction);

		this.torche.direction.copyFrom(this.camera.getForwardRay().direction);

		this._enable = true;
	}

	public update() {
		if (!this.camera.hasMoved)
			return
		this.torche.direction.copyFrom(this.camera.getForwardRay().direction);
	}

	public set enable(value: boolean) {
		this._enable = value;
	}
}
