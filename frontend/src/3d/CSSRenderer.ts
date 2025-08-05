import { Camera, Matrix } from "@babylonImport";

export interface css3dObject {
	html: HTMLElement,
	world: Matrix, //rotation + translation
	width: number,
	height: number,
	enable: boolean
}

export class CSSRenderer {
	public camera: Camera;
	public width: number;
	public height: number;
	public dirty: boolean;

	private cameraDiv: HTMLDivElement;
	private perspective: number;
	private objects: Array<css3dObject>;


	constructor(camera: Camera, width: number, height: number) {
		this.camera = camera;
		this.width = width;
		this.height = height;

		this.objects = new Array<css3dObject>();

		this.cameraDiv = document.querySelector("#camera") as HTMLDivElement;
		this.cameraDiv.style.width = `${this.width}px`;
		this.cameraDiv.style.height = `${this.height}px`;

		this.perspective = this.height * 0.5 * this.camera.getProjectionMatrix().m[5];
		document.body.style.perspective = `${this.perspective}px`;
		this.dirty = true;
	}

	public addObject(obj: css3dObject): number {
		this.objects.push({
			html: obj.html,
			world: obj.world,
			width: obj.width,
			height: obj.height,
			enable: false
		});
		return this.objects.length - 1;
	}

	public update() {
		if (!this.camera.hasMoved && !this.dirty) { return; }
		this.updateCameraDiv();
		for (let i = 0; i < this.objects.length; i++) {
			if (this.objects[i].enable) {
				this.updateObject(this.objects[i]);
			}
		}
		this.dirty = false;
		//console.log("cssRender");
	}

	private updateCameraDiv() {
		const world = this.camera.getWorldMatrix();
		const r = world!.getRotationMatrix().transpose().m;
		const m = world!.m;
		this.cameraDiv.style.transform = `translateZ(${this.perspective}px) matrix3d(${m[0]},${-r[1]},${-r[2]},${m[3]},${-r[4]},${-m[5]},${-r[6]},${m[7]},${-r[8]},${r[9]},${m[10]},${m[11]},${m[12]},${-m[13]},${m[14]},${m[15]}) translate(${this.width * 0.5}px, ${this.height * 0.5}px)`;
	}

	private updateObject(obj: css3dObject) {
		const world = this.camera.getWorldMatrix().m;
		const m = obj.world.m;
		const scaleX = 0.01 / obj.height;
		const scaleY = 0.01 / obj.width;

		obj.html.style.transform = `translate(-50%, -50%) matrix3d(${m[0] * scaleX}, ${m[1]}, ${m[2] * scaleX}, ${m[3]}, ${-m[4]}, ${-m[5] * scaleY}, ${-m[6]}, ${-m[7]}, ${m[8]}, ${m[9]}, ${m[10]}, ${m[11]}, ${-world[12] + m[12]}, ${-world[13] + m[13]}, ${world[14] - m[14]}, ${world[15] * 0.00001})`;
	}

	public setObjectEnable(index: number, status: boolean) {
		if (index < 0 || index > this.objects.length) { return; }
		if (!this.objects[index].enable && status) {
			this.cameraDiv.appendChild(this.objects[index].html);
			this.dirty = true;
		} else if (this.objects[index].enable && !status) {
			this.objects[index].html.remove();
		}
		this.objects[index].enable = status;
	}

	public resize(width: number, height: number) {
		this.width = width;
		this.height = height;
		this.perspective = this.height * 0.5 * this.camera.getProjectionMatrix().m[5];
		document.body.style.perspective = `${this.perspective}px`;
		this.dirty = true;
	}
}
