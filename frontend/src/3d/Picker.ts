import { Camera, EffectRenderer, EffectWrapper, Engine, Matrix, Mesh, MeshBuilder, RenderTargetTexture, Scene, ShaderMaterial, Vector2, Vector3, Vector4 } from "@babylonImport";
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

	private enabled: boolean;

	private pointer: Vector2;

	constructor(scene: Scene, camera: Camera, effectRenderer: EffectRenderer, position: Vector3, size: Vector2) {
		this.scene = scene;
		this.camera = camera;
		this.groundPosition = position;
		this.groundSize = size;
		this.effectRenderer = effectRenderer;

		this.enabled = true;
		this.pointer = new Vector2();


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
		if (!this.enabled) { return; }
		this.moveBall();
		this.swapRT();
		this.effectRenderer.render(this.pickerEffect, this.rtB);
	}

	private setEvent() {
		window.addEventListener("click", (ev) => {

			if (this.ballHit || !this.enabled) {
				this.ballHit = false;
				return;
			}
			this.ballHit = this.pickBall(ev.clientX, ev.clientY);
		})
		window.addEventListener("mousemove", (ev) => {
			this.pointer.set(ev.clientX, ev.clientY);
		})
	}

	private initMesh() {
		this.meshBall = MeshBuilder.CreateSphere("picker ball", {
			diameter: this.ballDiameter
		}, this.scene)
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
		const details = UIaddDetails('--PICKER');

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

	private pickBall(x: number, y: number): boolean {
		const v = this.camera.viewport;
		const p = Vector3.Project(
			this.meshBall.position,
			Matrix.Identity(),
			this.scene.getTransformMatrix(),
			v
		)
		const px = (this.ballDiameter / Vector3.Distance(this.camera.position, this.meshBall.position)) * (this.scene.getEngine().getRenderHeight() / (2 * Math.tan(this.camera.fov * 0.5)))

		const xx = p.x * this.scene.getEngine().getRenderWidth() - x;
		const yy = p.y * this.scene.getEngine().getRenderHeight() - y;

		return Math.sqrt(xx * xx + yy * yy) < px * 0.5;
	}

	private moveBall() {
		if (!this.ballHit || !this.enabled) {
			return;
		}
		const ray = this.scene.createPickingRay(this.pointer.x, this.pointer.y).direction;
		let delta = Math.abs(this.camera.position.y - this.groundPosition.y) / ray.y;

		let x = this.camera.position.x - ray.x * delta;
		let y = this.camera.position.z - ray.z * delta;
		this.cursor.x = (x / (this.groundSize.x)) + 0.5;
		this.cursor.y = (y / (this.groundSize.y)) + 0.5;
		this.pick = ray.y < 0. && Math.abs(this.cursor.x - 0.5) < 0.5 && Math.abs(this.cursor.y - 0.5) < .5 ? 1 : 0;
		if (Math.abs(x) < this.groundSize.x * 0.6 && Math.abs(y) < this.groundSize.y * 0.6) {
			this.meshBall.position.set(
				x, this.groundPosition.y, y
			)
		} else {
			this.ballHit = false;
		}
	}

	public get texture(): RenderTargetTexture {
		return this.rtB;
	}

	public get mesh(): Mesh {
		return this.meshBall;
	}

	public setEnable(status: boolean) {
		this.enabled = status;
		this.mesh.setEnabled(status);
	}

	public dispose() {
		this.pickerEffect.dispose();
		this.rtA.dispose();
		this.rtB.dispose();
		this.meshBall.dispose();
		this.material.dispose();
	}
}
