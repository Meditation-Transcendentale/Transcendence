import { EffectWrapper, Vector2, Vector3 } from "../babylon";
import { Assets } from "./Assets";

export class BallGrass {
	private assets: Assets;

	public oldPosition: Vector3;
	public position: Vector3;
	public movement: Vector2;

	public ballGrassEffect: EffectWrapper;

	private needReset = true;
	private _enable: boolean;
	private _update: string;

	private maxDist = 60;
	private maxSpeed = 100;
	private deceleration = 0.9;
	private attenuation = 0.1;

	public ballOrigin: Vector3;


	private tempVector3: Vector3;
	constructor(assets: Assets) {
		this.assets = assets;

		this.oldPosition = this.assets.ballRoot.position.clone();
		this.position = new Vector3();
		this.tempVector3 = new Vector3();

		this.movement = new Vector2();

		this.ballGrassEffect = new EffectWrapper({
			name: "picker",
			engine: this.assets.scene.getEngine(),
			useShaderStore: true,
			fragmentShader: "picker",
			samplers: ["textureSampler"],
			uniforms: ["attenuation", "radius", "origin"]
		});

		this.ballGrassEffect.onApplyObservable.add(() => {
			this.ballGrassEffect.effect.setTexture("textureSampler", this.assets.ballGrassTextureA);
			this.ballGrassEffect.effect.setFloat("attenuation", Math.pow(this.attenuation, this.assets.scene.deltaTime * 0.001));
			this.ballGrassEffect.effect.setFloat("radius", this.assets.ballRoot.scalingDeterminant * 0.75 / this.maxDist);
			this.ballGrassEffect.effect.setFloat2("origin",
				(this.assets.ballMesh.position.x + this.assets.ballRoot.position.x) * this.assets.ballRoot.scalingDeterminant / this.maxDist + 0.5,
				(this.assets.ballMesh.position.z + this.assets.ballRoot.position.z) * this.assets.ballRoot.scalingDeterminant / this.maxDist + 0.5
			);

		})

		this.ballOrigin = new Vector3();

		this._enable = false;
		this._update = "home";
	}

	public update(time: number, deltaTime: number) {
		if (this._update == "none")
			return;

		if (this._update == "home")
			this.moveBall(deltaTime);
		this.swapRt();
		this.assets.effectRenderer.render(this.ballGrassEffect, this.assets.ballGrassTextureB);
	}


	public moveBall(deltaTime: number) {
		if (this.assets.ballPicker.z < 1) {
			this.needReset = true;
			this.assets.ballMesh.position.addInPlaceFromFloats(
				(this.ballOrigin.x - this.assets.ballMesh.position.x) * 0.01 + this.movement.x,
				0,
				(this.ballOrigin.z - this.assets.ballMesh.position.z) * 0.01 + this.movement.y,
			)
			this.movement.scaleInPlace(this.deceleration);

		} else {
			if (this.needReset && this.assets.ballPicker.z > 0) {
				// this.position.copyFrom(this.assets.ballRoot.position);
				this.position.copyFrom(this.assets.ballMesh.absolutePosition);
				// this.assets.ballMesh.position.addToRef(this.assets.ballRoot.position, this.position);
				this.needReset = false;
			}
			const ray = this.assets.scene.createPickingRay(this.assets.ballPicker.x, this.assets.ballPicker.y).direction;
			let delta = Math.abs(this.assets.camera.position.y - this.assets.ballRoot.scalingDeterminant) / ray.y;

			let x = this.assets.camera.position.x - ray.x * delta;
			let z = this.assets.camera.position.z - ray.z * delta;
			// if (Math.abs(x) < this.maxDist * 0.5 && Math.abs(z) < this.maxDist * 0.5) {
			this.movement.set(
				(x - this.position.x),
				(z - this.position.z)
			)
			this.assets.ballMesh.position.addInPlaceFromFloats(this.movement.x / this.assets.ballRoot.scalingDeterminant, 0, this.movement.y / this.assets.ballRoot.scalingDeterminant)
			this.position.set(x, 0, z);
			// this.assets.ballMesh.position.set(x, 0, z);
			// } else {
			if (Math.abs(x) > this.maxDist * 0.5 && Math.abs(z) > this.maxDist * 0.5) {
				this.assets.ballPicker.z = 0;
				this.assets.camera.attachControl();
			}
		}
	}

	private swapRt() {
		let a = this.assets.ballGrassTextureA;
		this.assets.ballGrassTextureA = this.assets.ballGrassTextureB;
		this.assets.ballGrassTextureB = a;
	}

	public set enable(value: boolean) {
		this._enable = value;
	}

	public set updateType(value: string) {
		this._update = value;
	}
}
