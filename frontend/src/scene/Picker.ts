import { Matrix, Vector3, GPUPicker, Vector2 } from "../babylon";
import { sceneManager } from "./SceneManager";
import { Assets } from "./Assets";
import { stateManager } from "../state/StateManager";

export class Picker {
	public assets: Assets;

	public ballPicker: Vector3;

	private _enabled: boolean;


	public tempVector3: Vector3 = new Vector3();
	private mId = Matrix.Identity();

	public gpuPicker: GPUPicker;

	private moved: boolean;

	private cursor: Vector2;

	constructor(assets: Assets) {
		this.assets = assets;

		this.ballPicker = this.assets.ballPicker;

		this._enabled = false;
		this.moved = false;

		this.gpuPicker = new GPUPicker();
		this.gpuPicker.setPickingList([this.assets.monolithMesh]);

		this.cursor = new Vector2();
		window.addEventListener("pointerdown", (ev) => { this.clickEvent(ev) });
		window.addEventListener("pointermove", (ev) => { this.moveEvent(ev) });
		window.addEventListener("pointerout", (ev) => { this.outEvent(ev) });
		window.addEventListener("pointerup", (ev) => { this.upEvent(ev) })

	}

	public update(time: number) {
		if (!this._enabled || !this.moved || this.gpuPicker.pickingInProgress)
			return;

		this.gpuPicker.pickAsync(this.cursor.x, this.cursor.y, false).then((pickInfo) => {
			let newOrigin = new Vector3(0, -10, 0);
			let isOnMonolith = false;

			if (!this.assets.monolithHoverEnabled) {
				this.assets.monolithOrigin.set(0, -10, 0);
				this.assets.monolithOldOrigin.set(0, -10, 0);
				for (let i = 0; i < this.assets.monolithTrail.length; i++) {
					this.assets.monolithTrail[i].set(0, -10, 0);
				}
				this.assets.monolithMouseSpeed = 0.0;
				this.moved = false;
				return;
			}

			if (pickInfo && pickInfo.thinInstanceIndex != null) {
				this.assets.monolithAnimationIntensity = 0.1;
				if (pickInfo.thinInstanceIndex < this.assets.monolithVoxelPositions.length) {
					const voxelPosition = this.assets.monolithVoxelPositions[pickInfo.thinInstanceIndex];
					this.assets.monolithOldOrigin.copyFrom(this.assets.monolithOrigin);
					newOrigin.copyFrom(voxelPosition).addInPlace(this.assets.monolithRoot.position);
					this.assets.monolithOrigin.copyFrom(newOrigin);
					isOnMonolith = true;
				}
			} else {
				this.assets.monolithAnimationIntensity = 0.1;
				this.assets.monolithOldOrigin.copyFrom(this.assets.monolithOrigin);
				this.assets.monolithOrigin.copyFrom(newOrigin);
				for (let i = 0; i < this.assets.monolithTrail.length; i++) {
					this.assets.monolithTrail[i].set(0, -10, 0);
				}
				this.assets.monolithMouseSpeed = 0.0;
			}

			if (isOnMonolith) {
				const moveDistance = newOrigin.subtract(this.assets.monolithOldOrigin).length();
				this.assets.monolithMouseSpeed = Math.min(moveDistance * 50.0, 5.0);

				const distanceFromLastTrail = newOrigin.subtract(this.assets.monolithTrail[0]).length();
				if (distanceFromLastTrail > 0.1) {
					for (let i = this.assets.monolithTrail.length - 1; i > 0; i--) {
						this.assets.monolithTrail[i].copyFrom(this.assets.monolithTrail[i - 1]);
					}
					this.assets.monolithTrail[0].copyFrom(newOrigin);
				}
			}
		});
		this.moved = false;

	}

	public set enable(value: boolean) {
		// if (!this._enabled && value) {
		// 	window.addEventListener("pointerdown", (ev) => this.clickEvent(ev));
		// 	window.addEventListener("pointermove", (ev) => this.moveEvent(ev));
		// 	window.addEventListener("pointerout", (ev) => this.outEvent(ev));
		// 	window.addEventListener("pointerup", (ev) => this.upEvent(ev))
		// } else if (this._enabled && !value) {
		// 	window.removeEventListener("pointerdown", (ev) => this.clickEvent(ev));
		// 	window.removeEventListener("pointermove", (ev) => this.moveEvent(ev));
		// 	window.removeEventListener("pointerout", (ev) => this.outEvent(ev));
		// 	window.removeEventListener("pointerup", (ev) => this.upEvent(ev))
		// }
		this._enabled = value;
	}

	private clickEvent(ev: MouseEvent) {
		if (!this._enabled)
			return;
		if (this.ballIsHit(ev.clientX, ev.clientY)) {
			this.ballPicker.x = ev.clientX;
			this.ballPicker.y = ev.clientY;
			this.ballPicker.z = 1.;
			// this.assets.camera.detachControl();
			return;
		}
		this.ballPicker.z = 0.;
	}

	private moveEvent(ev: MouseEvent) {
		if (!this._enabled)
			return;
		if (this.ballPicker.z > 0) {
			this.ballPicker.x = ev.clientX;
			this.ballPicker.y = ev.clientY;
		}
		this.cursor.x = ev.clientX;
		this.cursor.y = ev.clientY;
		this.moved = true;
	}

	private outEvent(ev: MouseEvent) {
		if (!this._enabled)
			return;
		this.ballPicker.z = 0;
		// this.assets.camera.attachControl();
	}

	private upEvent(ev: MouseEvent) {
		if (!this._enabled)
			return;
		this.ballPicker.z = 0;
		// this.assets.camera.attachControl();
	}

	private ballIsHit(x: number, y: number): boolean {
		// this.assets.ballMesh.position.addToRef(this.assets.ballRoot.position, this.tempVector3);
		this.tempVector3.copyFrom(this.assets.ballMesh.absolutePosition)
		const p = Vector3.Project(
			this.tempVector3,
			this.mId,
			this.assets.scene.getTransformMatrix(),
			this.assets.camera.viewport
		)
		const res = sceneManager.resolution;
		x = (x / window.innerWidth) * res.width;
		y = (y / window.innerHeight) * res.height;
		const px = (this.assets.ballRoot.scalingDeterminant / Vector3.Distance(this.assets.camera.position, this.tempVector3)) * (res.height / (2 * Math.tan(this.assets.camera.fov * 0.5)))

		const xx = p.x * res.width - x;
		const yy = p.y * res.height - y;

		return Math.sqrt(xx * xx + yy * yy) < px * 0.5;
	}
}
