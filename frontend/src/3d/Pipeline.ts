import { BloomEffect, Camera, Engine, PostProcess, PostProcessRenderEffect, PostProcessRenderPipeline, RenderTargetTexture, Scene, Vector3 } from "@babylonImport";
import { UIaddDetails, UIaddSlider, UIaddSliderVec3, UIaddToggle } from "./UtilsUI";


export class Pipeline {
	private scene: Scene;
	private camera: Camera;

	private renderingPipeline: PostProcessRenderPipeline;
	private enabled: boolean;

	private fogPostProcess: PostProcess;
	private colorCorrectionPostProcess: PostProcess;

	private fogEffect: PostProcessRenderEffect;
	private colorCorrectionEffect: PostProcessRenderEffect;
	private bloomEffect: BloomEffect;

	private fogTexture: RenderTargetTexture;

	private fogAbsorption: Vector3;

	private contrast: number;
	private brightness: number;
	private gamma: number;

	constructor(scene: Scene, camera: Camera, fogRt: RenderTargetTexture) {
		this.scene = scene;
		this.camera = camera;
		this.fogTexture = fogRt;

		this.enabled = true;

		this.renderingPipeline = new PostProcessRenderPipeline(this.scene.getEngine(), "pipeline");

		this.fogPostProcess = new PostProcess("fogApply", "fogApply", {
			uniforms: ["fogAbsorption"],
			samplers: ["fogTexture"],
			size: 1.,
			camera: this.camera,
			samplingMode: Engine.TEXTURE_BILINEAR_SAMPLINGMODE,
			textureType: Engine.TEXTURETYPE_HALF_FLOAT,
			reusable: false
		});

		this.fogAbsorption = new Vector3(0.1, 0.1, 0.1);
		this.fogPostProcess.onApply = (effect) => {
			effect.setVector3("fogAbsorption", this.fogAbsorption)
			effect.setTexture("fogTexture", this.fogTexture);
		}


		this.colorCorrectionPostProcess = new PostProcess("colorCorrection", "colorCorrection", {
			uniforms: ["contrast", "brightness", "gamma", "tonemapping"],
			size: 1.,
			camera: this.camera,
			samplingMode: Engine.TEXTURE_BILINEAR_SAMPLINGMODE,
			textureType: Engine.TEXTURETYPE_HALF_FLOAT,
			reusable: false
		})
		this.contrast = 1.;
		this.brightness = 0.;
		this.gamma = 2.2;
		this.tonemapping = 0;

		this.colorCorrectionPostProcess.onApply = (effect) => {
			effect.setFloat("contrast", this.contrast);
			effect.setFloat("brightness", this.brightness);
			effect.setFloat("gamma", this.gamma);
			effect.setInt("tonemapping", this.tonemapping);
		}

		this.camera.detachPostProcess(this.colorCorrectionPostProcess);
		this.camera.detachPostProcess(this.fogPostProcess);





		this.fogEffect = new PostProcessRenderEffect(this.scene.getEngine(), "fogEffect", () => {
			return [this.fogPostProcess];
		});
		this.colorCorrectionEffect = new PostProcessRenderEffect(this.scene.getEngine(), "colorCorrectionEffect", () => {
			return [this.colorCorrectionPostProcess];
		});
		this.bloomEffect = new BloomEffect(this.scene.getEngine(), 0.25, 0.1, 32., Engine.TEXTURETYPE_HALF_FLOAT);

		this.renderingPipeline.addEffect(this.fogEffect);
		this.renderingPipeline.addEffect(this.bloomEffect);
		this.renderingPipeline.addEffect(this.colorCorrectionEffect);

		this.scene.postProcessRenderPipelineManager.addPipeline(this.renderingPipeline);
		this.scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("pipeline", this.camera);

		this.initUI();
	}

	public setEnable(status: boolean) {
		if (status && !this.enabled) {
			this.scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("pipeline", this.camera);
			this.enabled = true;
		} else if (!status && this.enabled) {
			this.scene.postProcessRenderPipelineManager.detachCamerasFromRenderPipeline("pipeline", this.camera);
			this.enabled = false;
		}
	}

	public initUI() {
		const details = UIaddDetails("--PIPELINE");
		UIaddToggle("color correction", true, { div: details }, (n: boolean) => {
			if (n) {
				this.scene.postProcessRenderPipelineManager.enableEffectInPipeline("pipeline", "colorCorrectionEffect", this.camera);
			} else {
				this.scene.postProcessRenderPipelineManager.disableEffectInPipeline("pipeline", "colorCorrectionEffect", this.camera);
			}
		})
		UIaddToggle("bloom", true, { div: details }, (n: boolean) => {
			if (n) {
				this.scene.postProcessRenderPipelineManager.enableEffectInPipeline("pipeline", this.bloomEffect._name, this.camera);
			} else {
				this.scene.postProcessRenderPipelineManager.disableEffectInPipeline("pipeline", this.bloomEffect._name, this.camera);
			}
		})

		UIaddSliderVec3("fog asborption", this.fogAbsorption, {
			step: 0.05,
			min: 0,
			max: 1,
			div: details
		});

		UIaddSlider("contrast", this.contrast, {
			step: 0.01,
			min: 0,
			max: 3,
			div: details
		}, (n: number) => { this.contrast = n });
		UIaddSlider("brightness", this.brightness, {
			step: 0.01,
			min: -1,
			max: 1,
			div: details
		}, (n: number) => { this.brightness = n });
		UIaddSlider("gamma", this.gamma, {
			step: 0.01,
			min: 0,
			max: 3,
			div: details
		}, (n: number) => { this.gamma = n });
		UIaddSlider("tonemap", this.tonemapping, {
			step: 1.,
			min: 0,
			max: 7,
			div: details
		}, (n: number) => { this.tonemapping = n });

		UIaddSlider("bloom weight", this.bloomEffect.weight, {
			step: 0.1,
			min: 0,
			max: 10,
			div: details
		}, (n: number) => { this.bloomEffect.weight = n });
		UIaddSlider("bloom kernel", this.bloomEffect.kernel, {
			step: 2,
			min: 0,
			max: 128,
			div: details
		}, (n: number) => { this.bloomEffect.kernel = n });
		UIaddSlider("bloom threshold", this.bloomEffect.threshold, {
			step: 0.01,
			min: 0,
			max: 1,
			div: details
		}, (n: number) => { this.bloomEffect.threshold = n });
	}

	public setFogEnable(status: boolean) {
		if (status) {
			this.scene.postProcessRenderPipelineManager.enableEffectInPipeline("pipeline", "fogEffect", this.camera);
		} else {
			this.scene.postProcessRenderPipelineManager.disableEffectInPipeline("pipeline", "fogEffect", this.camera);
		}
	}

	public dispose() {
		this.setEnable(false);
		this.fogPostProcess.dispose();
		// this.fxaaPostProcess.dispose();
		this.colorCorrectionPostProcess.dispose();
	}
}
