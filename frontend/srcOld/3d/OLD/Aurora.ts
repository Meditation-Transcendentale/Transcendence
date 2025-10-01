import { Camera, Color4, EffectRenderer, EffectWrapper, Engine, Material, Matrix, Mesh, RenderTargetTexture, Scene, UniformBuffer, Vector3 } from "@babylonImport";
import { UIaddDetails, UIaddSlider, UIaddSliderVec3 } from "./UtilsUI";

export class Aurora {
	private scene: Scene;
	private camera: Camera;

	private effectRenderer: EffectRenderer;

	private depthTexture: RenderTargetTexture;
	private heightTexture: RenderTargetTexture;
	private surfaceTexture: RenderTargetTexture;
	private auroraTexture: RenderTargetTexture;

	private heightEffect: EffectWrapper;
	private surfaceEffect: EffectWrapper;
	private auroraEffect: EffectWrapper;

	private cameraUBO: UniformBuffer;
	private dataUBO: UniformBuffer;

	private noiseInitialSpeed!: number;
	private noiseSpeedRamp!: number;

	private ratio: number;

	constructor(scene: Scene, camera: Camera, ratio: number) {
		this.scene = scene;
		this.camera = camera;
		this.ratio = ratio;

		this.effectRenderer = new EffectRenderer(scene.getEngine());

		this.depthTexture = new RenderTargetTexture("depth", { ratio: ratio }, scene, {
			format: Engine.TEXTUREFORMAT_RED,
			type: Engine.TEXTURETYPE_HALF_FLOAT
		});
		// this.depthTexture.activeCamera = camera;

		this.heightTexture = new RenderTargetTexture("height", { width: 256, height: 256 }, scene, {
			// format: Engine.TEXTUREFORMAT_RG,
			// type: Engine.TEXTURETYPE_INT
			format: Engine.TEXTUREFORMAT_RG,
			type: Engine.TEXTURETYPE_HALF_FLOAT

		});

		this.surfaceTexture = new RenderTargetTexture("surface", { width: 256, height: 256 }, scene, {
			format: Engine.TEXTUREFORMAT_RG,
			type: Engine.TEXTURETYPE_HALF_FLOAT
			// type: Engine.TEXTURETYPE_INT
		});

		this.auroraTexture = new RenderTargetTexture("aurora", { ratio: ratio }, scene, {
			format: Engine.TEXTUREFORMAT_RGBA,
			type: Engine.TEXTURETYPE_HALF_FLOAT
			// type: Engine.TEXTURETYPE_INT
			// type: Engine.TEXTURETYPE_UNSIGNED_INTEGER
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

		this.auroraEffect = new EffectWrapper({
			name: "fog",
			engine: scene.getEngine(),
			useShaderStore: true,
			fragmentShader: "aurora",
			uniformBuffers: ["camera", "data"],
			samplers: ["surfaceTexture", "depthTexture"],
			uniforms: ["resolution", "time"],
		});


		this.cameraUBO = new UniformBuffer(scene.getEngine());
		this.dataUBO = new UniformBuffer(scene.getEngine());

		this.depthTexture.clearColor = new Color4(1, 0, 0, 1);
		this.initUBO();
		this.initUI();

		this.initEffectObservable();
	}

	public render() {
		this.depthTexture.render();
		this.effectRenderer.render(this.heightEffect, this.heightTexture);
		this.effectRenderer.render(this.surfaceEffect, this.surfaceTexture);
		this.effectRenderer.render(this.auroraEffect, this.auroraTexture);
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
		this.dataUBO.addUniform("lightScattering", 1);
		this.dataUBO.addUniform("ambientMultiplier", 1);
		this.dataUBO.addUniform("auroraHeight", 1);
		this.dataUBO.addUniform("auroraSize", 3);
		this.dataUBO.addUniform("auroraColorBottom", 3);
		this.dataUBO.addUniform("auroraColorTop", 3);

		const noiseOffsetDefault = 0.5;
		const stepSizeDefault = 0.5;
		const maxDistanceDefault = 50.;
		const lightScatteringDefault = 0.2;
		const ambientMultiplierDefault = 1;
		const auroraHeightDefault = 40;
		const auroraSizeDefault = new Vector3(40, 20, 40);
		const auroraColorBottomDefault = new Vector3(0.35, 0.07, 0.03);
		const auroraColorTopDefault = new Vector3(0.35, 0.07, 0.53);
		this.dataUBO.updateFloat("noiseOffset", noiseOffsetDefault);
		this.dataUBO.updateFloat("stepSize", stepSizeDefault);
		this.dataUBO.updateFloat("maxDistance", maxDistanceDefault);
		this.dataUBO.updateFloat("lightScattering", lightScatteringDefault);
		this.dataUBO.updateFloat("ambientMultiplier", ambientMultiplierDefault);
		this.dataUBO.updateFloat("auroraHeight", auroraHeightDefault);
		this.dataUBO.updateVector3("auroraSize", auroraSizeDefault);
		this.dataUBO.updateVector3("auroraColorBottom", auroraColorBottomDefault);
		this.dataUBO.updateVector3("auroraColorTop", auroraColorTopDefault);

		this.noiseInitialSpeed = 1.;
		this.noiseSpeedRamp = 1.07;
	}

	private initUI() {
		const details = UIaddDetails("--AURORA--");

		UIaddSlider("wave initial speed", this.noiseInitialSpeed, {
			step: 0.05,
			min: 0,
			max: 2,
			div: details
		}, (n: number) => { this.noiseInitialSpeed = n });
		UIaddSlider("wave speed ramp", this.noiseSpeedRamp, {
			step: 0.05,
			min: 0,
			max: 2,
			div: details
		}, (n: number) => { this.noiseSpeedRamp = n })


		const noiseOffsetDefault = 0.5;
		const stepSizeDefault = 0.5;
		const maxDistanceDefault = 50.;
		const lightScatteringDefault = 0.2;
		const ambientMultiplierDefault = 1;
		const auroraHeightDefault = 40;
		const auroraSizeDefault = new Vector3(40, 20, 40);
		const auroraColorBottomDefault = new Vector3(0.35, 0.07, 0.03);
		const auroraColorTopDefault = new Vector3(0.35, 0.07, 0.53);
		UIaddSlider("noiseOffset", noiseOffsetDefault, {
			step: 0.1,
			min: 0,
			max: 2,
			div: details
		}, (n: number) => { this.dataUBO.updateFloat("noiseOffset", n) });
		UIaddSlider("stepSize", stepSizeDefault, {
			step: 0.05,
			min: 0.01,
			max: 1,
			div: details
		}, (n: number) => { this.dataUBO.updateFloat("stepSize", n) });
		UIaddSlider("maxDistance", maxDistanceDefault, {
			min: 0,
			div: details
		}, (n: number) => { this.dataUBO.updateFloat("maxDistance", n) });
		UIaddSlider("lightScattering", lightScatteringDefault, {
			step: 0.01,
			min: 0,
			max: 1,
			div: details
		}, (n: number) => { this.dataUBO.updateFloat("lightScattering", n) });
		UIaddSlider("ambientMultiplier", ambientMultiplierDefault, {
			step: 0.05,
			min: 0,
			max: 2,
			div: details
		}, (n: number) => { this.dataUBO.updateFloat("ambientMultiplier", n) });
		UIaddSlider("auroraHieght", auroraHeightDefault, {
			step: 1,
			min: 0,
			max: 100,
			div: details
		}, (n: number) => { this.dataUBO.updateFloat("auroraHeight", n) });
		UIaddSliderVec3("auroraSize", auroraSizeDefault, {
			step: 1,
			min: 1,
			max: 500,
			div: details
		}, () => { this.dataUBO.updateVector3("auroraSize", auroraSizeDefault) });
		UIaddSliderVec3("auroraColorBottom", auroraColorBottomDefault, {
			step: 0.01,
			min: 0,
			max: 1,
			div: details
		}, () => { this.dataUBO.updateVector3("auroraColorBottom", auroraColorBottomDefault) });
		UIaddSliderVec3("auroraColorTop", auroraColorTopDefault, {
			step: 0.01,
			min: 0,
			max: 1,
			div: details
		}, () => { this.dataUBO.updateVector3("auroraColorTop", auroraColorTopDefault) });
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
		this.auroraEffect.onApplyObservable.add(() => {
			this.cameraUBO.updateVector3("position", this.camera.position);
			this.cameraUBO.updateMatrix("iview", this.camera.getViewMatrix().invertToRef(iview));
			this.cameraUBO.updateMatrix("world", this.camera.worldMatrixFromCache);
			this.cameraUBO.update();
			this.dataUBO.update();

			if (!binded) {
				this.cameraUBO.bindToEffect(this.auroraEffect.effect, "camera");
				this.dataUBO.bindToEffect(this.auroraEffect.effect, "data");
				binded = true;
			}

			this.auroraEffect.effect.setFloat("time", performance.now() * 0.001);
			this.auroraEffect.effect.setFloat2("resolution", window.innerWidth, window.innerHeight);
			this.auroraEffect.effect.setTexture("depthTexture", this.depthTexture);
			this.auroraEffect.effect.setTexture("surfaceTexture", this.surfaceTexture);
		})
	}

	public resize() {
		const iproj = new Matrix();
		this.cameraUBO.updateMatrix("projection", this.camera.getProjectionMatrix());
		this.cameraUBO.updateMatrix("iprojection", this.camera.getProjectionMatrix().invertToRef(iproj));
		this.depthTexture.resize({ width: this.scene.getEngine().getRenderWidth() * this.ratio, height: this.scene.getEngine().getRenderHeight() * this.ratio })
		this.auroraTexture.resize({ width: this.scene.getEngine().getRenderWidth() * this.ratio, height: this.scene.getEngine().getRenderHeight() * this.ratio })


	}

	public addMeshToDepth(mesh: Mesh, material: Material) {
		this.depthTexture.renderList = [];
		this.depthTexture.renderList.push(mesh);
		this.depthTexture.setMaterialForRendering(mesh, material);
	}

	public get texture() {
		return this.auroraTexture;
	}
}
