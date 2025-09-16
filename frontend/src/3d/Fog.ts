import { Camera, EffectRenderer, EffectWrapper, Engine, Matrix, RenderTargetTexture, Scene, UniformBuffer, Vector3 } from "@babylonImport";
import { UIaddSlider, UIaddSliderVec3 } from "./UtilsUI";

export class Fog {
	private scene: Scene;
	private camera: Camera;

	private effectRenderer: EffectRenderer;

	private depthTexture: RenderTargetTexture;
	private heightTexture: RenderTargetTexture;
	private surfaceTexture: RenderTargetTexture;
	private fogTexture: RenderTargetTexture;

	private heightEffect: EffectWrapper;
	private surfaceEffect: EffectWrapper;
	private fogEffect: EffectWrapper;

	private cameraUBO: UniformBuffer;
	private dataUBO: UniformBuffer;

	private noiseInitialSpeed!: number;
	private noiseSpeedRamp!: number;


	constructor(scene: Scene, camera: Camera, ratio: number) {
		this.scene = scene;
		this.camera = camera;

		this.effectRenderer = new EffectRenderer(scene.getEngine());

		this.depthTexture = new RenderTargetTexture("depth", { ratio: ratio }, scene, {
			format: Engine.TEXTUREFORMAT_R,
			type: Engine.TEXTURETYPE_HALF_FLOAT
		});

		this.heightTexture = new RenderTargetTexture("height", 256, scene, {
			format: Engine.TEXTUREFORMAT_RG,
			type: Engine.TEXTURETYPE_INT
		});

		this.surfaceTexture = new RenderTargetTexture("surface", 256, scene, {
			format: Engine.TEXTUREFORMAT_RG,
			type: Engine.TEXTURETYPE_INT
		});

		this.fogTexture = new RenderTargetTexture("fog", { ratio: ratio }, scene, {
			format: Engine.TEXTUREFORMAT_RGBA,
			type: Engine.TEXTURETYPE_INT
		})

		this.heightEffect = new EffectWrapper({
			name: "height",
			engine: scene.getEngine(),
			useShaderStore: true,
			fragmentShader: "height",
			uniforms: ["time", "worldSize", "initialSpeed", "speedRamp"]
		});

		this.surfaceEffect = new EffectWrapper({
			name: "surface",
			engine: scene.getEngine(),
			useShaderStore: true,
			fragmentShader: "surface",
			uniforms: ["delta"],
			samplers: ["heightTexture"]
		});

		this.fogEffect = new EffectWrapper({
			name: "fog",
			engine: scene.getEngine(),
			useShaderStore: true,
			fragmentShader: "fog",
			uniformBuffers: ["camera", "data"],
			samplers: ["depthTexture", "surfaceTexture"],
			uniforms: ["resolution", "time"],
		});


		this.cameraUBO = new UniformBuffer(scene.getEngine());
		this.dataUBO = new UniformBuffer(scene.getEngine());

		this.initUBO();
		this.initUI();

		this.initEffectObservable();
	}

	public render() {
		this.depthTexture.render();
		this.effectRenderer.render(this.heightEffect, this.heightTexture);
		this.effectRenderer.render(this.surfaceEffect, this.surfaceTexture);
		this.effectRenderer.render(this.fogEffect, this.fogTexture);
	}


	private initUBO() {
		this.cameraUBO.addUniform("maxZ", 1);
		this.cameraUBO.addUniform("position", 3);
		this.cameraUBO.addUniform("projection", 16);
		this.cameraUBO.addUniform("iprojection", 16);
		this.cameraUBO.addUniform("iview", 16);
		this.cameraUBO.addUniform("world", 16);
		const iproj = new Matrix();
		this.cameraUBO.updateFloat("maxZ", this.camera.maxZ);
		this.cameraUBO.updateMatrix("projection", this.camera.getProjectionMatrix());
		this.cameraUBO.updateMatrix("iprojection", this.camera.getProjectionMatrix().invertToRef(iproj));

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

		this.noiseInitialSpeed = 1.;
		this.noiseSpeedRamp = 1.07;
	}

	private initUI() {
		UIaddSlider("wave initial speed", this.noiseInitialSpeed, (n: number) => { this.noiseInitialSpeed = n }, 0.05, 0, 2);
		UIaddSlider("wave speed ramp", this.noiseSpeedRamp, (n: number) => { this.noiseSpeedRamp = n }, 0.05, 0, 2)

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
		UIaddSlider("noiseOffset", noiseOffsetDefault, (n: number) => { this.dataUBO.updateFloat("noiseOffset", n) }, 0.1, 0, 2);
		UIaddSlider("stepSize", stepSizeDefault, (n: number) => { this.dataUBO.updateFloat("stepSize", n) }, 0.05, 0.01, 2);
		UIaddSlider("maxDistance", maxDistanceDefault, (n: number) => { this.dataUBO.updateFloat("maxDistance", n) }, 1, 0, 100);
		UIaddSlider("worldSize", worldSizeDefault, (n: number) => { this.dataUBO.updateFloat("worldSize", n) }, 1, 0, 300);
		UIaddSlider("waterHeight", waterHeightDefault, (n: number) => { this.dataUBO.updateFloat("waterHeight", n) }, 1, 0, 100);
		UIaddSlider("waveMaxDisplacement", waveMaxDisplacementDefault, (n: number) => { this.dataUBO.updateFloat("waveMaxDisplacement", n) }, 0.5, 0, 20);
		UIaddSlider("density", densityDefault, (n: number) => { this.dataUBO.updateFloat("density", n) }, 0.05, 0, 2);
		UIaddSlider("lightScattering", lightScatteringDefault, (n: number) => { this.dataUBO.updateFloat("lightScattering", n) }, 0.01, 0, 1);
		UIaddSlider("ambientMultiplier", ambientMultiplierDefault, (n: number) => { this.dataUBO.updateFloat("ambientMultiplier", n) }, 0.1, 0, 10);
		UIaddSliderVec3("water absorption", waterAbsorptionDefault, () => { this.dataUBO.updateVector3("waterAbsorption", waterAbsorptionDefault) }, 0.05, 0., 1.);
	}


	private initEffectObservable() {
		this.heightEffect.onApplyObservable.add(() => {
			this.heightEffect.effect.setFloat("time", performance.now() * 0.001);
			this.heightEffect.effect.setFloat("worldSize", 40);
			this.heightEffect.effect.setFloat("initialSpeed", this.noiseInitialSpeed);
			this.heightEffect.effect.setFloat("speedRamp", this.noiseSpeedRamp);
		})

		this.surfaceEffect.onApplyObservable.add(() => {
			this.surfaceEffect.effect.setFloat("delta", 1. / 256.);
			this.surfaceEffect.effect.setTexture("heightTexture", this.heightTexture);
		})

		const iview = new Matrix();
		let binded = false;
		this.fogEffect.onApplyObservable.add(() => {
			this.cameraUBO.updateVector3("position", this.camera.position);
			this.cameraUBO.updateMatrix("iview", this.camera.getViewMatrix().invertToRef(iview));
			this.cameraUBO.updateMatrix("world", this.camera.worldMatrixFromCache);
			this.cameraUBO.update();
			this.dataUBO.update();

			if (!binded) {
				this.cameraUBO.bindToEffect(this.fogEffect.effect, "camera");
				this.dataUBO.bindToEffect(this.fogEffect.effect, "data");
				binded = true;
			}

			this.fogEffect.effect.setFloat("time", performance.now() * 0.001);
			this.fogEffect.effect.setFloat2("resolution", window.innerWidth, window.innerHeight);
			this.fogEffect.effect.setTexture("depthTexture", this.depthTexture);
			this.fogEffect.effect.setTexture("surfaceTexture", this.surfaceTexture);
		})
	}

	public resize() {
		const iproj = new Matrix();
		this.cameraUBO.updateMatrix("projection", this.camera.getProjectionMatrix());
		this.cameraUBO.updateMatrix("iprojection", this.camera.getProjectionMatrix().invertToRef(iproj));
	}

}
