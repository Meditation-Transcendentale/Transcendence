import { EffectWrapper } from "../babylon";
import { Assets } from "./Assets";
import { sceneManager } from "./SceneManager";
// import { UIaddDetails, UIaddSlider, UIaddSliderVec3, UIaddToggle } from "./UtilsUI";

export class Fog {
	private assets: Assets;

	private fogEffect: EffectWrapper;

	private _enable: boolean;

	constructor(assets: Assets) {
		this.assets = assets;

		this._enable = false;

		this.fogEffect = new EffectWrapper({
			name: "fog",
			engine: sceneManager.engine,
			useShaderStore: true,
			fragmentShader: "fog3D",
			uniformBuffers: ["data"],
			samplers: ["depthTexture", "densityTexture"],
			uniforms: ["resolution", "time"],
		});


		let binded = false;
		this.fogEffect.onApplyObservable.add(() => {
			if (!binded) {
				this.assets.fogUBO.bindToEffect(this.fogEffect.effect, "data");
				binded = true;
			}
			this.fogEffect.effect.setFloat("time", performance.now() * 0.001);
			this.fogEffect.effect.setFloat2("resolution", window.innerWidth, window.innerHeight);
			this.fogEffect.effect.setTexture("depthTexture", this.assets.fogDepthTexture);
			this.fogEffect.effect.setTexture("densityTexture", this.assets.fogDensityTexture);
		});
	}

	public render() {
		if (!this._enable) { return }
		this.assets.fogDepthTexture.render(false, false);
		this.assets.effectRenderer.render(this.fogEffect, this.assets.fogRenderTexture);
	}


	public set enable(value: boolean) {
		this._enable = value;
	}
}
