import { Camera, Color3, Engine, Matrix, PostProcess, ProceduralTexture, RenderTargetTexture, Scene, Texture, UniformBuffer, Vector2, Vector3 } from "@babylonImport";
import { UIaddColor, UIaddNumber, UIaddSlider, UIaddSliderVec3, UIaddVec3 } from "./UtilsUI";

export class Pipeline {
	private scene: Scene;
	private camera: Camera;
	private enabled: boolean;

	private copyPostProcess: PostProcess;
	private underwaterPostProcess: PostProcess;
	private underwaterApplyPostProcess: PostProcess;
	private underwaterRatio = 0.25;

	private depthRT: RenderTargetTexture;
	private waveRT: RenderTargetTexture;
	private causticRT: RenderTargetTexture;

	private cameraUBO: UniformBuffer;
	private dataUBO: UniformBuffer;

	constructor(scene: Scene, camera: Camera, depth: RenderTargetTexture, wave: RenderTargetTexture, caustic: RenderTargetTexture) {
		this.scene = scene;
		this.camera = camera;
		this.depthRT = depth;
		this.waveRT = wave;
		this.causticRT = caustic;
		this.enabled = true;

		this.copyPostProcess = new PostProcess("copy", "copy", { size: 1., camera: this.camera });

		this.underwaterPostProcess = new PostProcess("underwater", "underwater", {
			uniformBuffers: ["camera", "data"],
			samplers: ["depthTexture", "waveTexture", "causticTexture"],
			uniforms: ["resolution", "time"],
			size: 1.,
			camera: this.camera,
			samplingMode: Engine.TEXTURE_BILINEAR_SAMPLINGMODE
		});

		this.cameraUBO = new UniformBuffer(this.scene.getEngine());

		this.cameraUBO.addUniform("maxZ", 1);
		// this.cameraUBO.addUniform("direction", 3);
		this.cameraUBO.addUniform("position", 3);
		this.cameraUBO.addUniform("projection", 16);
		this.cameraUBO.addUniform("iprojection", 16);
		this.cameraUBO.addUniform("iview", 16);
		this.cameraUBO.addUniform("world", 16);

		const iproj = new Matrix();
		this.cameraUBO.updateFloat("maxZ", this.camera.maxZ);
		this.cameraUBO.updateMatrix("projection", this.camera.getProjectionMatrix());
		this.cameraUBO.updateMatrix("iprojection", this.camera.getProjectionMatrix().invertToRef(iproj));

		let resize = false;
		window.addEventListener('resize', () => {
			resize = true;
		})


		this.dataUBO = new UniformBuffer(this.scene.getEngine());

		this.dataUBO.addUniform("noiseOffset", 1);
		this.dataUBO.addUniform("stepSize", 1);
		this.dataUBO.addUniform("maxDistance", 1);
		this.dataUBO.addUniform("worldSize", 1);
		this.dataUBO.addUniform("waterHeight", 1);
		this.dataUBO.addUniform("waveMaxDisplacement", 1);
		this.dataUBO.addUniform("density", 1);
		this.dataUBO.addUniform("lightScattering", 1);
		this.dataUBO.addUniform("ambientMultiplier", 1);
		this.dataUBO.addUniform("waterAbsorption", 3);

		const noiseOffsetDefault = 0.5;
		const stepSizeDefault = 0.5;
		const maxDistanceDefault = 50.;
		const worldSizeDefault = 40.;
		const waterHeightDefault = 20;
		const waveMaxDisplacementDefault = 1;
		const densityDefault = 0.1;
		const lightScatteringDefault = 0.2;
		const ambientMultiplierDefault = 4;
		const waterAbsorptionDefault = new Vector3(0.35, 0.07, 0.03);
		this.dataUBO.updateFloat("noiseOffset", noiseOffsetDefault);
		this.dataUBO.updateFloat("stepSize", stepSizeDefault);
		this.dataUBO.updateFloat("maxDistance", maxDistanceDefault);
		this.dataUBO.updateFloat("worldSize", worldSizeDefault);
		this.dataUBO.updateFloat("waterHeight", waterHeightDefault);
		this.dataUBO.updateFloat("waveMaxDisplacement", waveMaxDisplacementDefault);
		this.dataUBO.updateFloat("density", densityDefault);
		this.dataUBO.updateFloat("lightScattering", lightScatteringDefault);
		this.dataUBO.updateFloat("ambientMultiplier", ambientMultiplierDefault);
		this.dataUBO.updateVector3("waterAbsorption", waterAbsorptionDefault);

		UIaddSlider("noiseOffset", noiseOffsetDefault, (n: number) => { this.dataUBO.updateFloat("noiseOffset", n) }, 0.1, 0, 2);
		UIaddSlider("stepSize", stepSizeDefault, (n: number) => { this.dataUBO.updateFloat("stepSize", n) }, 0.05, 0.01, 2);
		UIaddSlider("maxDistance", maxDistanceDefault, (n: number) => { this.dataUBO.updateFloat("maxDistance", n) }, 1, 0, 100);
		UIaddSlider("worldSize", worldSizeDefault, (n: number) => { this.dataUBO.updateFloat("worldSize", n) }, 1, 0, 100);
		UIaddSlider("waterHeight", waterHeightDefault, (n: number) => { this.dataUBO.updateFloat("waterHeight", n) }, 1, 0, 100);
		UIaddSlider("waveMaxDisplacement", waveMaxDisplacementDefault, (n: number) => { this.dataUBO.updateFloat("waveMaxDisplacement", n) }, 0.5, 0, 20);
		UIaddSlider("density", densityDefault, (n: number) => { this.dataUBO.updateFloat("density", n) }, 0.05, 0, 2);
		UIaddSlider("lightScattering", lightScatteringDefault, (n: number) => { this.dataUBO.updateFloat("lightScattering", n) }, 0.01, 0, 1);
		UIaddSlider("ambientMultiplier", ambientMultiplierDefault, (n: number) => { this.dataUBO.updateFloat("ambientMultiplier", n) }, 0.1, 0, 10);
		//UIaddVec3("waterAbsorption", waterAbsorptionDefault, () => { this.dataUBO.updateVector3("waterAbsorption", waterAbsorptionDefault) })
		UIaddSliderVec3("water absorption", waterAbsorptionDefault, () => { this.dataUBO.updateVector3("waterAbsorption", waterAbsorptionDefault) }, 0.05, 0., 1.);

		const iview = new Matrix();
		let binded = false;
		let inputTexture: any;
		this.underwaterPostProcess.onApply = (effect) => {
			inputTexture = this.underwaterPostProcess.inputTexture;
			this.cameraUBO.updateVector3("position", this.camera.position);
			this.cameraUBO.updateMatrix("iview", this.camera.getViewMatrix().invertToRef(iview));
			this.cameraUBO.updateMatrix("world", this.camera.worldMatrixFromCache);
			this.cameraUBO.update();
			this.dataUBO.update();

			if (!binded) {
				this.cameraUBO.bindToEffect(effect, "camera");
				this.dataUBO.bindToEffect(effect, "data");
				binded = true;
			}
			if (resize) {
				this.cameraUBO.updateMatrix("projection", this.camera.getProjectionMatrix());
				this.cameraUBO.updateMatrix("iprojection", this.camera.getProjectionMatrix().invertToRef(iproj));
			}


			effect.setFloat("time", performance.now() * 0.001);
			effect.setFloat2("resolution", window.innerWidth, window.innerHeight);
			effect.setTexture("depthTexture", this.depthRT);
			effect.setTexture("waveTexture", this.waveRT);
			effect.setTexture("causticTexture", this.causticRT);
		}

		this.underwaterApplyPostProcess = new PostProcess("underwater", "underwaterApply", {
			uniforms: ["waterAbsorption"],
			samplers: ["sceneTexture"],
			size: this.underwaterRatio,
			camera: this.camera,
			samplingMode: Engine.TEXTURE_BILINEAR_SAMPLINGMODE
		});


		this.underwaterApplyPostProcess.onApply = (effect) => {
			effect.setVector3("waterAbsorption", waterAbsorptionDefault);
			effect.setTextureFromPostProcess("sceneTexture", this.copyPostProcess);
		}




		//this.camera.detachPostProcess(this.underwaterPostProcess);

	}

	public update(time: number) {

	}

	public setEnable(status: boolean) {
		if (status && !this.enabled) {
			this.camera.attachPostProcess(this.underwaterPostProcess);
			this.enabled = true;
		} else if (!status && this.enabled) {
			this.camera.detachPostProcess(this.underwaterPostProcess);
			this.enabled = false;
		}
	}

}
