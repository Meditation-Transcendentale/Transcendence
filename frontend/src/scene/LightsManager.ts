import { Assets } from "./Assets";

export class LightManager {
	private assets: Assets;

	private _enable: boolean;
	constructor(assets: Assets) {
		this.assets = assets;
		this.assets.flashLight.direction.copyFrom(this.assets.camera.getForwardRay().direction);

		this._enable = true;
	}

	public update() {
		if (this.assets.camera.hasMoved && this.assets.flashLight.isEnabled(true)) {
			this.assets.flashLight.direction.copyFrom(this.assets.camera.getForwardRay().direction);
		}
	}

	public set enable(value: boolean) {
		this._enable = value;
	}
}
