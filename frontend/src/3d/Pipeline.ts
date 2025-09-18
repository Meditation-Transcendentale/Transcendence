import { Camera, Color3, Engine, FxaaPostProcess, Matrix, PostProcess, ProceduralTexture, RenderTargetTexture, Scene, Texture, UniformBuffer, Vector2, Vector3 } from "@babylonImport";
import { UIaddColor, UIaddDetails, UIaddNumber, UIaddSlider, UIaddSliderVec3, UIaddToggle, UIaddVec3 } from "./UtilsUI";


export class Pipeline {
	private scene: Scene;
	private camera: Camera;

	private enabled: boolean;

	private fogPostProcess: PostProcess;
	private fxaaPostProcess: PostProcess;
	private colorCorrectionPostProcess: PostProcess;

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
		this.fogPostProcess = new PostProcess("fogApply", "fogApply", {
			uniforms: ["fogAbsorption"],
			samplers: ["fogTexture"],
			size: 1.,
			camera: this.camera,
			samplingMode: Engine.TEXTURE_BILINEAR_SAMPLINGMODE,
			reusable: true
		});

		this.fogAbsorption = new Vector3(0.1, 0.1, 0.1);
		this.fogPostProcess.onApply = (effect) => {
			effect.setVector3("fogAbsorption", this.fogAbsorption)
			effect.setTexture("fogTexture", this.fogTexture);
		}

		this.fxaaPostProcess = new FxaaPostProcess("fxaa", 1.0, this.camera);

		this.colorCorrectionPostProcess = new PostProcess("colorCorrection", "colorCorrection", {
			uniforms: ["contrast", "brightness", "gamma"],
			size: 1.,
			camera: this.camera,
			samplingMode: Engine.TEXTURE_BILINEAR_SAMPLINGMODE,
			reusable: true
		})
		this.contrast = 1.;
		this.brightness = 0.;
		this.gamma = 1.;

		this.colorCorrectionPostProcess.onApply = (effect) => {
			effect.setFloat("contrast", this.contrast);
			effect.setFloat("brightness", this.brightness);
			effect.setFloat("gamma", this.gamma);
		}

		this.initUI();
	}

	public setEnable(status: boolean) {
		if (status && !this.enabled) {
			this.camera.attachPostProcess(this.fogPostProcess);
			this.camera.attachPostProcess(this.fxaaPostProcess);
			this.camera.attachPostProcess(this.colorCorrectionPostProcess);
			this.enabled = true;
		} else if (!status && this.enabled) {
			this.camera.detachPostProcess(this.colorCorrectionPostProcess);
			this.camera.detachPostProcess(this.fxaaPostProcess);
			this.camera.detachPostProcess(this.fogPostProcess);
			this.enabled = false;
		}
	}

	public initUI() {
		const details = UIaddDetails("PIPELINE");
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
	}

	public setFogEnable(status: boolean) {
		if (!status) {
			this.camera.detachPostProcess(this.fogPostProcess)
		} else {
			this.camera.attachPostProcess(this.fogPostProcess, 0)
		};
	}

	public dispose() {
		this.setEnable(false);
		this.fogPostProcess.dispose();
		this.fxaaPostProcess.dispose();
		this.colorCorrectionPostProcess.dispose();
	}
}
