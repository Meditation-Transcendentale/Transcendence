import { Matrix, Vector2, Vector3 } from "../babylon";
import { sceneManager } from "./SceneManager";
import { Assets } from "./Assets";
import { stateManager } from "../state/StateManager";

export class Picker {
	public assets: Assets;

	public ballPicker: Vector3;

	private _enabled: boolean;


	public tempVector3: Vector3 = new Vector3();
	private mId = Matrix.Identity();
	constructor(assets: Assets) {
		this.assets = assets;

		this.ballPicker = this.assets.ballPicker;

		this._enabled = false;
	}

	public set enable(value: boolean) {
		if (!this._enabled && value) {
			window.addEventListener("pointerdown", (ev) => this.clickEvent(ev));
			window.addEventListener("pointermove", (ev) => this.moveEvent(ev));
			window.addEventListener("pointerout", (ev) => this.outEvent(ev));
			window.addEventListener("pointerup", (ev) => this.upEvent(ev))
		} else if (this._enabled && !value) {
			window.removeEventListener("pointerdown", (ev) => this.clickEvent(ev));
			window.removeEventListener("pointermove", (ev) => this.moveEvent(ev));
			window.removeEventListener("pointerout", (ev) => this.outEvent(ev));
			window.removeEventListener("pointerup", (ev) => this.upEvent(ev))
		}
		this._enabled = value;
	}

	private clickEvent(ev: MouseEvent) {
		if (this.ballIsHit(ev.clientX, ev.clientY)) {
			this.ballPicker.x = ev.clientX;
			this.ballPicker.y = ev.clientY;
			this.ballPicker.z = 1.;
			this.assets.camera.detachControl();
			return;
		}
		this.ballPicker.z = 0.;
	}

	private moveEvent(ev: MouseEvent) {
		if (this.ballPicker.z > 0) {
			this.ballPicker.x = ev.clientX;
			this.ballPicker.y = ev.clientY;
		}
	}

	private outEvent(ev: MouseEvent) {
		this.ballPicker.z = 0;
		this.assets.camera.attachControl();
	}

	private upEvent(ev: MouseEvent) {
		this.ballPicker.z = 0;
		this.assets.camera.attachControl();
	}

	private ballIsHit(x: number, y: number): boolean {
		this.assets.ballMesh.position.addToRef(this.assets.ballRoot.position, this.tempVector3);
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
