import { Camera, EffectRenderer, EffectWrapper, Engine, RenderTargetTexture, Scene, Vector2, Vector3 } from "@babylonImport";

export class Picker {
	private scene: Scene;
	private camera: Camera;
	private effectRenderer: EffectRenderer;

	private groundPosition: Vector3;
	private groundSize: Vector3;

	private pickerEffect: EffectWrapper;
	private rtA: RenderTargetTexture;
	private rtB: RenderTargetTexture;

	private cursor: Vector2;
	private attenuation: number;
	private radius: number;
	private pick: number;

	private oldTime: number;
	private deltaTime!: number;

	constructor(scene: Scene, camera: Camera, effectRenderer: EffectRenderer, position: Vector3, size: Vector3) {
		this.scene = scene;
		this.camera = camera;
		this.groundPosition = position;
		this.groundSize = size;
		this.effectRenderer = effectRenderer;


		this.rtA = new RenderTargetTexture("picker", { width: 256, height: 256 }, scene, {
			format: Engine.TEXTUREFORMAT_RGBA,
			type: Engine.TEXTURETYPE_HALF_FLOAT,
			samplingMode: Engine.TEXTURE_BILINEAR_SAMPLINGMODE
		})
		this.rtB = this.rtA.clone();
		this.pickerEffect = new EffectWrapper({
			name: "picker",
			engine: scene.getEngine(),
			useShaderStore: true,
			fragmentShader: "picker",
			samplers: ["textureSampler"],
			uniforms: ["pick", "attenuation", "radius", "origin"]
		});

		this.cursor = new Vector2();
		this.pick = 0;
		this.attenuation = 0.5;
		this.radius = 0.1;
		this.oldTime = 0.;

		this.pickerEffect.onApplyObservable.add(() => {
			let t = performance.now() * 0.001;
			this.deltaTime = t - this.oldTime;
			this.oldTime = t;
			this.pickerEffect.effect.setTexture("textureSampler", this.rtA);
			this.pickerEffect.effect.setFloat("pick", this.pick);
			this.pickerEffect.effect.setFloat("attenuation", Math.pow(this.attenuation, this.deltaTime));
			this.pickerEffect.effect.setFloat("radius", this.radius);
			this.pickerEffect.effect.setVector2("origin", this.cursor);
		})

		this.setEvent();
	}

	public render() {
		this.swapRT();
		this.effectRenderer.render(this.pickerEffect, this.rtB);
	}

	private setEvent() {
		window.addEventListener("mousemove", (ev) => {
			const ray = this.scene.createPickingRay(ev.clientX, ev.clientY).direction;
			let delta = Math.abs(this.camera.position.y - this.groundPosition.y) / ray.y;

			this.cursor.x = this.camera.position.x - ray.x * delta;
			this.cursor.y = this.camera.position.z - ray.z * delta;
			this.cursor.x = (this.cursor.x / (this.groundSize.x * 0.5)) + 0.5;
			this.cursor.y = (this.cursor.y / (this.groundSize.y * 0.5)) + 0.5;
			this.pick = ray.y < 0. && Math.abs(this.cursor.x) < 1. && Math.abs(this.cursor.y) < 1. ? 1 : 0;
		})
	}

	private swapRT() {
		let a = this.rtA;
		this.rtA = this.rtB;
		this.rtB = a;
	}

	public get texture(): RenderTargetTexture {
		return this.rtB;
	}
}
