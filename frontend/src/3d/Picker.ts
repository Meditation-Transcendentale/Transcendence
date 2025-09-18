import { Camera, Color3, EffectRenderer, EffectWrapper, Engine, Mesh, MeshBuilder, PBRMaterial, RenderTargetTexture, Scene, ShaderMaterial, StandardMaterial, Vector2, Vector3, Vector4 } from "@babylonImport";
import { UIaddDetails, UIaddSlider } from "./UtilsUI";

export class Picker {
	private scene: Scene;
	private camera: Camera;
	private effectRenderer: EffectRenderer;

	private groundPosition: Vector3;
	private groundSize: Vector2;

	private pickerEffect: EffectWrapper;
	private rtA: RenderTargetTexture;
	private rtB: RenderTargetTexture;

	private cursor: Vector2;
	private attenuation: number;
	private radius: number;
	private pick: number;

	private oldTime: number;
	private deltaTime!: number;

	private meshBall!: Mesh;
	private material!: ShaderMaterial;

	private ballDiameter = 1.5;
	private ballHit!: boolean;

	constructor(scene: Scene, camera: Camera, effectRenderer: EffectRenderer, position: Vector3, size: Vector2) {
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
		this.radius = 1.6 / this.groundSize.x;
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

		this.initMesh();
		this.setEvent();
		this.initUI();

		this.cursor.x = (this.meshBall.position.x / this.groundSize.x) + 0.5;
		this.cursor.y = (this.meshBall.position.z / this.groundSize.y) + 0.5;
		this.pick = 1;

	}

	public render() {
		this.swapRT();
		this.effectRenderer.render(this.pickerEffect, this.rtB);
	}

	private setEvent() {
		window.addEventListener("click", (ev) => {
			if (this.ballHit) {
				this.ballHit = false;
				return;
			}
			const ray = this.scene.createPickingRay(ev.clientX, ev.clientY).direction;
			let delta = Math.abs(this.camera.position.y - this.groundPosition.y) / ray.y;

			let x = (this.camera.position.x - ray.x * delta) - this.meshBall.position.x;
			let y = (this.camera.position.z - ray.z * delta) - this.meshBall.position.z;
			this.ballHit = (Math.sqrt(x * x + y * y) < this.ballDiameter * 0.5); // NEED to be better, MAYBE USE tec from VUe: BOUNDING BOX
		})
		window.addEventListener("mousemove", (ev) => {
			if (!this.ballHit) {
				return;
			}
			const ray = this.scene.createPickingRay(ev.clientX, ev.clientY).direction;
			let delta = Math.abs(this.camera.position.y - this.groundPosition.y) / ray.y;

			let x = this.camera.position.x - ray.x * delta;
			let y = this.camera.position.z - ray.z * delta;
			this.cursor.x = (x / (this.groundSize.x)) + 0.5;
			this.cursor.y = (y / (this.groundSize.y)) + 0.5;
			this.pick = ray.y < 0. && Math.abs(this.cursor.x) < 1. && Math.abs(this.cursor.y) < 1. ? 1 : 0;
			this.meshBall.position.set(
				x, this.groundPosition.y, y
			)
		})
	}

	private initMesh() {
		this.meshBall = MeshBuilder.CreateSphere("picker ball", {
			diameter: this.ballDiameter
		}, this.scene)
		// this.material = new StandardMaterial("picker ball", this.scene);
		// this.material.emissiveColor = new Color3(1000., 0., 0.);
		// this.material.disableLighting = true;
		// this.material.diffuseColor = Color3.Black();
		// this.material.specularColor = Color3.Black();
		// this.meshBall.visibility = 0.2;
		// this.material.alphaMode = Engine.ALPHA_DISABLE;
		// this.meshBall.position.set(0, this.groundPosition.y, 4);
		//
		// const mat = new PBRMaterial("pbr", this.scene);
		// mat.emissiveColor = new Color3(1, 0, 0);
		// mat.emissiveIntensity = 1000;
		// mat.disableLighting = true;
		// mat.alphaMode = Engine.ALPHA_DISABLE;
		//
		this.material = new ShaderMaterial("picker ball", this.scene, "oneColor", {
			attributes: ["position"],
			uniforms: ["world", "viewProjection", "color"]
		})

		this.material.setVector4("color", new Vector4(8., 0., 0., 0.2));
		this.material.alphaMode = Engine.ALPHA_DISABLE;

		this.material.onBindObservable.add

		this.meshBall.material = this.material;
		this.meshBall.position.set(0, this.groundPosition.y, 4);

		this.ballHit = false;
	}

	private initUI() {
		const details = UIaddDetails('PICKER');

		UIaddSlider("attenuation", this.attenuation, {
			step: 0.01,
			min: 0.,
			max: 1.,
			div: details
		}, (n: number) => { this.attenuation = n });
		UIaddSlider("radius", this.radius * this.groundSize.x, {
			step: 0.1,
			min: 0,
			max: this.groundSize.x,
			div: details
		}, (n: number) => { this.radius = n / this.groundSize.x });
	}


	private swapRT() {
		let a = this.rtA;
		this.rtA = this.rtB;
		this.rtB = a;
	}

	public get texture(): RenderTargetTexture {
		return this.rtB;
	}

	public get mesh(): Mesh {
		return this.meshBall;
	}

	public dispose() {
		this.pickerEffect.dispose();
		this.rtA.dispose();
		this.rtB.dispose();
		this.meshBall.dispose();
		this.material.dispose();
	}
}
