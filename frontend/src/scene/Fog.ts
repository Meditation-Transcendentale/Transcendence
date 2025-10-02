import { Camera, Color3, Color4, EffectRenderer, EffectWrapper, Engine, Material, Matrix, Mesh, RawTexture3D, RenderTargetTexture, Scene, ShaderMaterial, SpotLight, UniformBuffer, Vector2, Vector3 } from "../babylon";
import { sceneManager } from "./SceneManager";
// import { UIaddDetails, UIaddSlider, UIaddSliderVec3, UIaddToggle } from "./UtilsUI";

export class Fog {
	private densityTexture: RawTexture3D;
	private depthTexture: RenderTargetTexture;
	private fogTexture: RenderTargetTexture;

	private fogEffect: EffectWrapper;

	private _enable: boolean;

	constructor() {
		this.depthTexture = sceneManager.textures.get("fogDepth") as RenderTargetTexture;
		this.densityTexture = sceneManager.textures.get("fogDensity") as RawTexture3D;
		this.fogTexture = sceneManager.textures.get("fog") as RenderTargetTexture;

		this._enable = false;

		this.fogEffect = new EffectWrapper({
			name: "fog",
			engine: sceneManager.engine,
			useShaderStore: true,
			fragmentShader: "fog3D",
			uniformBuffers: ["camera", "data", "lights"],
			samplers: ["depthTexture", "densityTexture"],
			uniforms: ["resolution", "time"],
		});


		let binded = false;
		this.fogEffect.onApplyObservable.add(() => {
			if (!binded) {
				(sceneManager.ubos.get("camera") as UniformBuffer).bindToEffect(this.fogEffect.effect, "camera");
				(sceneManager.ubos.get("fogData") as UniformBuffer).bindToEffect(this.fogEffect.effect, "data");
				(sceneManager.ubos.get("fogLights") as UniformBuffer).bindToEffect(this.fogEffect.effect, "lights");
				binded = true;
			}
			this.fogEffect.effect.setFloat("time", performance.now() * 0.001);
			this.fogEffect.effect.setFloat2("resolution", window.innerWidth, window.innerHeight);
			this.fogEffect.effect.setTexture("depthTexture", this.depthTexture);
			this.fogEffect.effect.setTexture("densityTexture", this.densityTexture);
		});
	}

	public render() {
		if (!this._enable) { return }
		this.depthTexture.render();
		//sceneManager.effectRenderer.render(this.fogEffect, this.fogTexture);
	}


	public set enable(value: boolean) {
		this._enable = value;
	}
}
