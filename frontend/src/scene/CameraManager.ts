import { BloomEffect, Engine, FxaaPostProcess, PostProcess, PostProcessRenderEffect, PostProcessRenderPipeline, Vector3 } from "../babylon"
import { UIaddSlider } from "../UIUtils";
import { Assets } from "./Assets";

interface ICameraVue {
	position: Vector3,
	target: Vector3
}

export class CameraManager {
	public assets: Assets;
	private vues: Map<string, ICameraVue>;

	private renderingPipeline: PostProcessRenderPipeline;

	private fogPostProcess: PostProcess;
	private colorCorrectionPostProcess: PostProcess;
	private fxaaPostProcess: FxaaPostProcess;

	private colorCorrectionEffect: PostProcessRenderEffect;
	private fogEffect: PostProcessRenderEffect;
	private bloomEffect: BloomEffect;
	private fxaaEffect: PostProcessRenderEffect;


	private fogAbsorption: Vector3;
	private contrast: number;
	private brightness: number;
	private gamma: number;
	private tonemapping: number;


	constructor(assets: Assets) {
		this.assets = assets;

		this.vues = new Map<string, ICameraVue>;
		this.vues.set("home", {
			position: new Vector3(2.7, 4.5, -22),
			target: new Vector3(2.7, 4.5, -22).addInPlaceFromFloats(-0.075, 0.07, 0.99),
		})
		this.vues.set("create", {
			position: new Vector3(-10, 3.5, -18),
			target: new Vector3(-10, 3.5, -18).addInPlaceFromFloats(0.86, 0.14, 0.5),
		})
		// this.vues.set("join", {
		// 	position: new Vector3(6.4, 3, 16.9),
		// 	target: new Vector3(6.4, 3, 16.9).addInPlaceFromFloats(-0.8, 0.2, -0.6)
		// })
		this.vues.set("join", {
			position: new Vector3(6.9, 5.6, 18.6),
			target: new Vector3(6.9, 5.6, 18.6).addInPlaceFromFloats(-0.666, -0.105, -0.74)
		})
		this.vues.set("lobby", {
			position: new Vector3(-1.88, 5.1, -4.96),
			target: new Vector3(-1.88, 5.1, -4.96).addInPlaceFromFloats(0.75, 0.03, 0.65),
		})
		this.vues.set("tournament", {
			position: new Vector3(-2.7, 4.5, 22),
			target: new Vector3(-2.7, 4.5, 22).addInPlaceFromFloats(0.075, 0.07, -0.99),
		})
		this.vues.set("monolith", {
			position: new Vector3(0, 50, 0),
			target: new Vector3(0, 0, 0),
		})
		this.vues.set("grass", {
			position: new Vector3(0, 50, 0),
			target: new Vector3(0, 0, 0),
		})
		this.vues.set("void", {
			position: new Vector3(0, 50, 0),
			target: new Vector3(0, 0, 0),
		})
		this.vues.set("brick", {
			position: new Vector3(0, 30, 0),
			target: new Vector3(0, 0, 0)
		})
		this.vues.set("tournament", {
			position: new Vector3(-13, 4, -7),
			target: new Vector3(20, 11, -8)
		})



		this.renderingPipeline = new PostProcessRenderPipeline(this.assets.engine, "pipeline");

		this.fogPostProcess = new PostProcess("fogApply", "fogApply3D", {
			uniforms: ["fogAbsorption"],
			samplers: ["fogTexture"],
			size: 1.,
			camera: this.assets.camera,
			samplingMode: Engine.TEXTURE_BILINEAR_SAMPLINGMODE,
			textureType: Engine.TEXTURETYPE_HALF_FLOAT,
			reusable: false
		});

		this.fogAbsorption = new Vector3(0.1, 0.1, 0.1);
		this.fogPostProcess.onApply = (effect) => {
			effect.setVector3("fogAbsorption", this.fogAbsorption)
			effect.setTexture("fogTexture", this.assets.fogRenderTexture);
		}


		this.colorCorrectionPostProcess = new PostProcess("colorCorrection", "colorCorrection", {
			uniforms: ["contrast", "brightness", "gamma", "tonemapping"],
			size: 1.,
			camera: this.assets.camera,
			samplingMode: Engine.TEXTURE_BILINEAR_SAMPLINGMODE,
			textureType: Engine.TEXTURETYPE_HALF_FLOAT,
			reusable: false
		})
		this.contrast = 1.;
		this.brightness = 0.;
		this.gamma = 1;
		this.tonemapping = 0;

		UIaddSlider("contrast", this.contrast, { step: 0.05, min: 0, max: 4 }, (n: number) => { this.contrast = n });
		UIaddSlider("brightness", this.brightness, { step: 0.05, min: 0, max: 4 }, (n: number) => { this.brightness = n });
		UIaddSlider("gamma", this.gamma, { step: 0.05, min: 0, max: 4 }, (n: number) => { this.gamma = n });
		UIaddSlider("tonemapping", this.tonemapping, { step: 1, min: 0, max: 8 }, (n: number) => { this.tonemapping = n });

		this.colorCorrectionPostProcess.onApply = (effect) => {
			effect.setFloat("contrast", this.contrast);
			effect.setFloat("brightness", this.brightness);
			effect.setFloat("gamma", this.gamma);
			effect.setInt("tonemapping", this.tonemapping);
		}

		this.fxaaPostProcess = new FxaaPostProcess("fxaa", {
			size: 1.,
			samplingMode: Engine.TEXTURE_BILINEAR_SAMPLINGMODE,
			textureType: Engine.TEXTURETYPE_HALF_FLOAT,
			camera: this.assets.camera,
			reusable: false
		})

		this.assets.camera.detachPostProcess(this.colorCorrectionPostProcess);
		this.assets.camera.detachPostProcess(this.fogPostProcess);
		this.assets.camera.detachPostProcess(this.fxaaPostProcess);

		this.fogEffect = new PostProcessRenderEffect(this.assets.engine, "fogEffect", () => {
			return [this.fogPostProcess];
		});
		this.colorCorrectionEffect = new PostProcessRenderEffect(this.assets.engine, "colorCorrectionEffect", () => {
			return [this.colorCorrectionPostProcess];
		});
		this.bloomEffect = new BloomEffect(this.assets.engine, 0.25, 0.8, 32., Engine.TEXTURETYPE_HALF_FLOAT);

		this.fxaaEffect = new PostProcessRenderEffect(this.assets.engine, "fxaaEffect", () => {
			return [this.fxaaPostProcess];
		})

		this.renderingPipeline.addEffect(this.fogEffect);
		this.renderingPipeline.addEffect(this.fxaaEffect);
		this.renderingPipeline.addEffect(this.bloomEffect);
		this.renderingPipeline.addEffect(this.colorCorrectionEffect);

		this.assets.scene.postProcessRenderPipelineManager.addPipeline(this.renderingPipeline);
		this.assets.scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("pipeline", this.assets.camera);
	}

	public set fogEnabled(value: boolean) {
		if (value)
			this.assets.scene.postProcessRenderPipelineManager.enableEffectInPipeline("pipeline", "fogEffect", this.assets.camera);
		else
			this.assets.scene.postProcessRenderPipelineManager.disableEffectInPipeline("pipeline", "fogEffect", this.assets.camera);
	}

	public set vue(key: string) {
		const vue = this.vues.get(key);
		if (!vue)
			return;
		this.assets.camera.position.copyFrom(vue.position);
		this.assets.camera.setTarget(vue.target);
	}
}
