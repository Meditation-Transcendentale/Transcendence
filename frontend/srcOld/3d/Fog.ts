import { Camera, Color3, Color4, EffectRenderer, EffectWrapper, Engine, Material, Matrix, Mesh, RawTexture3D, RenderTargetTexture, Scene, ShaderMaterial, SpotLight, UniformBuffer, Vector2, Vector3 } from "@babylonImport";
import { UIaddDetails, UIaddSlider, UIaddSliderVec3, UIaddToggle } from "./UtilsUI";
import { PelinWorley3D } from "./PerlinWorley";

export class Fog {
	private scene: Scene;
	private camera: Camera;

	private effectRenderer: EffectRenderer;

	private densityTexture: RawTexture3D;
	private depthTexture: RenderTargetTexture;
	private fogTexture: RenderTargetTexture;
	private blurTexture: RenderTargetTexture;

	private fogEffect: EffectWrapper;
	private gaussBlurVEffect: EffectWrapper;
	private gaussBlurHEffect: EffectWrapper;

	private cameraUBO: UniformBuffer;
	private dataUBO: UniformBuffer;
	private lightsUBO: UniformBuffer;

	private ratio: number;
	private delta: Vector2;
	private blur: boolean;

	private enabled: boolean;

	constructor(scene: Scene, camera: Camera, effectRenderer: EffectRenderer, ratio: number) {
		this.scene = scene;
		this.camera = camera;
		this.ratio = ratio;

		this.blur = false;

		this.effectRenderer = effectRenderer;

		this.depthTexture = new RenderTargetTexture("depth", { width: this.scene.getEngine().getRenderWidth() * this.ratio, height: this.scene.getEngine().getRenderHeight() * this.ratio }, scene, {
			type: Engine.TEXTURETYPE_FLOAT,
			samplingMode: Engine.TEXTURE_BILINEAR_SAMPLINGMODE
		});
		this.depthTexture.activeCamera = camera;
		this.depthTexture.renderList = [];
		this.depthTexture.clearColor = new Color4(1, 0, 0, 1);

		const data = PelinWorley3D(64);
		this.densityTexture = new RawTexture3D(
			data,
			64,
			64,
			64,
			Engine.TEXTUREFORMAT_R,
			this.scene,
			false,
			false,
			Engine.TEXTURE_BILINEAR_SAMPLINGMODE,
			Engine.TEXTURETYPE_FLOAT
		);

		const ro = this.scene.getEngine().getRenderHeight() / this.scene.getEngine().getRenderWidth();
		this.fogTexture = new RenderTargetTexture("fog", { width: 1080 * this.ratio, height: 1080 * this.ratio * ro }, scene, {
			format: Engine.TEXTUREFORMAT_RGBA,
			type: Engine.TEXTURETYPE_HALF_FLOAT,
			samplingMode: Engine.TEXTURE_BILINEAR_SAMPLINGMODE
		})
		this.blurTexture = this.fogTexture.clone();

		this.delta = new Vector2(
			1. / this.fogTexture.getRenderWidth(),
			1. / this.fogTexture.getRenderHeight()
		);

		this.fogEffect = new EffectWrapper({
			name: "fog",
			engine: scene.getEngine(),
			useShaderStore: true,
			fragmentShader: "fog3D",
			uniformBuffers: ["camera", "data", "lights"],
			samplers: ["depthTexture", "densityTexture"],
			uniforms: ["resolution", "time"],
		});

		this.gaussBlurHEffect = new EffectWrapper({
			name: "gaussH",
			engine: scene.getEngine(),
			useShaderStore: true,
			fragmentShader: "gaussianBlurHorizontal",
			samplers: ["textureSampler"],
			uniforms: ["delta"],
		});
		this.gaussBlurVEffect = new EffectWrapper({
			name: "gaussH",
			engine: scene.getEngine(),
			useShaderStore: true,
			fragmentShader: "gaussianBlurVertical",
			samplers: ["textureSampler"],
			uniforms: ["delta"],
		});


		this.cameraUBO = new UniformBuffer(scene.getEngine());
		this.dataUBO = new UniformBuffer(scene.getEngine());
		this.lightsUBO = new UniformBuffer(scene.getEngine());

		this.enabled = true;

		this.initUBO();
		this.initUI();

		this.initEffectObservable();

	}

	public render() {
		if (!this.enabled) { return }
		this.depthTexture.render();
		this.effectRenderer.render(this.fogEffect, this.fogTexture);
		if (this.blur) {
			this.effectRenderer.render(this.gaussBlurHEffect, this.blurTexture);
			this.effectRenderer.render(this.gaussBlurVEffect, this.fogTexture);
		}
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
		this.dataUBO.addUniform("densityMultiplier", 1);
		this.dataUBO.addUniform("lightScattering", 1);
		this.dataUBO.addUniform("fogAbsorption", 3);
		this.dataUBO.addUniform("fogScale", 3);
		this.dataUBO.addUniform("dummyToTakePlace", 16);

		const noiseOffsetDefault = 0.5;
		const stepSizeDefault = 0.5;
		const maxDistanceDefault = 50.;
		const densityMultiplierDefault = 2.5;
		const lightScatteringDefault = 0.2;
		const fogAbsorptionDefault = new Vector3(0.1, 0.1, 0.1);
		const fogScaleDefault = new Vector3(40, 40, 40);
		this.dataUBO.updateFloat("noiseOffset", noiseOffsetDefault);
		this.dataUBO.updateFloat("stepSize", stepSizeDefault);
		this.dataUBO.updateFloat("maxDistance", maxDistanceDefault);
		this.dataUBO.updateFloat("densityMultiplier", densityMultiplierDefault);
		this.dataUBO.updateFloat("lightScattering", lightScatteringDefault);
		this.dataUBO.updateVector3("fogAbsorption", fogAbsorptionDefault);
		this.dataUBO.updateVector3("fogScale", fogScaleDefault);



		this.lightsUBO.addUniform("spotIntensity", 1);
		this.lightsUBO.addUniform("spotRange", 1);
		this.lightsUBO.addUniform("spotAngle", 1);
		this.lightsUBO.addUniform("spotExp", 1);
		this.lightsUBO.addUniform("pointAIntensity", 1);
		this.lightsUBO.addUniform("pointARange", 1);
		this.lightsUBO.addUniform("pointBIntensity", 1);
		this.lightsUBO.addUniform("pointBRange", 1);
		this.lightsUBO.addUniform("spotColor", 3);
		this.lightsUBO.addUniform("spotPosition", 3);
		this.lightsUBO.addUniform("spotDirection", 3);
		this.lightsUBO.addUniform("pointAColor", 3);
		this.lightsUBO.addUniform("pointAPosition", 3);
		this.lightsUBO.addUniform("pointBColor", 3);
		this.lightsUBO.addUniform("pointBPosition", 3);

		this.lightsUBO.updateFloat("spotIntensity", 0);
		this.lightsUBO.updateFloat("spotRange", 0);
		this.lightsUBO.updateFloat("spotAngle", 0);
		this.lightsUBO.updateFloat("spotExp", 0);
		this.lightsUBO.updateFloat("pointAIntensity", 0);
		this.lightsUBO.updateFloat("pointARange", 0);
		this.lightsUBO.updateFloat("pointBIntensity", 0);
		this.lightsUBO.updateFloat("pointBRange", 0);
		this.lightsUBO.updateColor3("spotColor", Color3.Black())
		this.lightsUBO.updateVector3("spotPosition", Vector3.Zero());
		this.lightsUBO.updateVector3("spotDirection", Vector3.Zero());
		this.lightsUBO.updateColor3("pointAColor", Color3.Black());
		this.lightsUBO.updateVector3("pointAPosition", Vector3.Zero());
		this.lightsUBO.updateColor3("pointBColor", Color3.Black());
		this.lightsUBO.updateVector3("pointBPosition", Vector3.Zero());





	}

	private initUI() {
		const details = UIaddDetails("--FOG");


		const noiseOffsetDefault = 0.5;
		const stepSizeDefault = 0.5;
		const maxDistanceDefault = 50.;
		const densityMultiplierDefault = 2.5;
		const lightScatteringDefault = 0.2;
		const fogAbsorptionDefault = new Vector3(0.1, 0.1, 0.1);
		const fogScaleDefault = new Vector3(40, 40, 40);
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
		UIaddSlider("densityMultiplier", densityMultiplierDefault, {
			step: 0.01,
			min: 0,
			max: 5,
			div: details
		}, (n: number) => { this.dataUBO.updateFloat("densityMultiplier", n) });
		UIaddSlider("lightScattering", lightScatteringDefault, {
			step: 0.01,
			min: 0,
			max: 1,
			div: details
		}, (n: number) => { this.dataUBO.updateFloat("lightScattering", n) });
		UIaddSliderVec3("fog absorption", fogAbsorptionDefault, {
			step: 0.05,
			min: 0.,
			max: 1,
			div: details
		}, () => { this.dataUBO.updateVector3("fogAbsorption", fogAbsorptionDefault) });
		UIaddSliderVec3("fog scale", fogScaleDefault, {
			step: 0.5,
			min: 1,
			max: 40,
			div: details
		}, () => { this.dataUBO.updateVector3("fogScale", fogScaleDefault) });

		UIaddToggle("blur", this.blur, { div: details }, (n: boolean) => { this.blur = n });

	}


	private initEffectObservable() {
		const iview = new Matrix();
		let binded = false;
		this.fogEffect.onApplyObservable.add(() => {
			this.cameraUBO.updateVector3("position", this.camera.position);
			this.cameraUBO.updateMatrix("iview", this.camera.getViewMatrix().invertToRef(iview));
			this.cameraUBO.updateMatrix("world", this.camera.worldMatrixFromCache);
			this.cameraUBO.update();
			this.dataUBO.update();
			this.lightsUBO.update();

			if (!binded) {
				this.cameraUBO.bindToEffect(this.fogEffect.effect, "camera");
				this.dataUBO.bindToEffect(this.fogEffect.effect, "data");
				this.lightsUBO.bindToEffect(this.fogEffect.effect, "lights");
				binded = true;
			}

			this.fogEffect.effect.setFloat("time", performance.now() * 0.001);
			this.fogEffect.effect.setFloat2("resolution", window.innerWidth, window.innerHeight);
			this.fogEffect.effect.setTexture("depthTexture", this.depthTexture);
			this.fogEffect.effect.setTexture("densityTexture", this.densityTexture);
		});

		this.gaussBlurHEffect.onApplyObservable.add(() => {
			this.gaussBlurHEffect.effect.setTexture("textureSampler", this.fogTexture);
			this.gaussBlurHEffect.effect.setVector2("delta", this.delta);

		})

		this.gaussBlurVEffect.onApplyObservable.add(() => {
			this.gaussBlurVEffect.effect.setTexture("textureSampler", this.blurTexture);
			this.gaussBlurVEffect.effect.setVector2("delta", this.delta);
		})
	}

	public resize() {
		const iproj = new Matrix();
		const ro = this.scene.getEngine().getRenderHeight() / this.scene.getEngine().getRenderWidth();
		this.cameraUBO.updateMatrix("projection", this.camera.getProjectionMatrix());
		this.cameraUBO.updateMatrix("iprojection", this.camera.getProjectionMatrix().invertToRef(iproj));
		this.depthTexture.resize({ width: this.scene.getEngine().getRenderWidth() * this.ratio, height: this.scene.getEngine().getRenderHeight() * this.ratio })
		this.fogTexture.resize({ width: 1080 * this.ratio, height: 1080 * this.ratio * ro });
		this.blurTexture.resize({ width: this.scene.getEngine().getRenderWidth() * this.ratio, height: this.scene.getEngine().getRenderHeight() * this.ratio })
		this.delta.set(1. / this.fogTexture.getRenderWidth(), 1. / this.fogTexture.getRenderHeight())
	}
	public addMeshToDepth(mesh: Mesh, material: Material) {
		this.depthTexture.renderList!.push(mesh);
		this.depthTexture.setMaterialForRendering(mesh, material);
		material.onBindObservable.add(() => {
			(material as ShaderMaterial).setVector2("depthValues", new Vector2(this.camera.minZ, this.camera.maxZ));
		})
	}


	public get texture() {
		return this.fogTexture;
	}

	public setEnabled(status: boolean) {
		this.enabled = status;
	}

	// public set ballPosition(position: Vector3) {
	// 	// this._ballPosition = position;
	// 	this.dataUBO.updateVector3("ballPosition", position);
	// }
	//
	// public set ballLightColor(color: Color3) {
	// 	// this._ballLightColor = color;
	// 	this.dataUBO.updateColor3("ballLightColor", color);
	// }
	//
	// public set ballLightRadius(radius: number) {
	// 	// this.ballLightRadius = radius;
	// 	this.dataUBO.updateFloat("ballLightRadius", radius);
	// }

	// public setSpotLight(light: SpotLight) {
	// 	this.dataUBO.updateFloat("spotLightExp", light.exponent);
	// 	this.dataUBO.updateFloat("spotLightAngle", Math.cos(light.angle));
	// 	this.dataUBO.updateFloat("spotLightRange", light.range);
	// 	this.dataUBO.updateColor3("spotLightColor", light.diffuse);
	// }
	//
	// public set spotLightPosition(position: Vector3) {
	// 	this.dataUBO.updateVector3("spotLightPosition", position);
	// }
	// public set spotLightDirection(direction: Vector3) {
	// 	this.dataUBO.updateVector3("spotLightDirection", direction);
	// }
	//
	// public set spotLightExponent(exp: number) {
	// 	this.dataUBO.updateFloat("spotLightExp", exp);
	// }

	public get lightsUbo(): UniformBuffer {
		return this.lightsUBO;
	}

	public dispose() {
		this.fogTexture.dispose();
		this.blurTexture.dispose();
		this.densityTexture.dispose();
		this.depthTexture.dispose();

		this.fogEffect.dispose();
		this.gaussBlurHEffect.dispose();
		this.gaussBlurVEffect.dispose();

		this.dataUBO.dispose();
		this.cameraUBO.dispose();
	}



}
