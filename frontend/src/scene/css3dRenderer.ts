import { Camera, Matrix } from "../babylon";
import { Assets } from "./Assets";
import { sceneManager } from "./SceneManager";

export interface ICss3dObject {
	html: HTMLElement,
	world: Matrix, //rotation + translation
	width: number,
	height: number,
	enable: boolean
}

export class Css3dRenderer {
	public camera: Camera;
	public width: number;
	public height: number;
	public dirty: boolean;

	private cameraDiv: HTMLDivElement;
	private perspective: number;
	private objects: Map<string, ICss3dObject>;



	constructor(assets: Assets) {
		this.camera = assets.camera;
		this.width = sceneManager.resolution.width;
		this.height = sceneManager.resolution.height;

		this.objects = new Map<string, ICss3dObject>();

		this.cameraDiv = document.querySelector("#camera") as HTMLDivElement;
		this.cameraDiv.style.width = `${this.width}px`;
		this.cameraDiv.style.height = `${this.height}px`;
		this.cameraDiv.style.backfaceVisibility = 'hidden';
		this.cameraDiv.style.transform = 'translateZ(0)';

		this.cameraDiv.style.willChange = 'transform';


		this.perspective = this.height * 0.5 * this.camera.getProjectionMatrix().m[5];
		document.body.style.perspective = `${this.perspective}px`;
		this.dirty = true;
	}

	public addObject(name: string, obj: ICss3dObject) {
		this.objects.set(name, obj);
		obj.html.style.backfaceVisibility = 'hidden';
		obj.html.style.willChange = 'transform';
		obj.html.style.transformStyle = 'preserve-3d';
	}

	public update() {
		if (!this.camera.hasMoved && !this.dirty) { return; }
		this.updateCameraDiv();
		this.objects.forEach((obj) => {
			if (obj.enable)
				this.updateObject(obj);
		})
		this.dirty = false;
	}

	private updateCameraDiv() {
		const world = this.camera.getWorldMatrix();
		const r = world!.getRotationMatrix().transpose().m;
		const m = world!.m;
		this.cameraDiv.style.transform = `translateZ(${this.perspective}px) matrix3d(${m[0]},${-r[1]},${-r[2]},${m[3]},${-r[4]},${-m[5]},${-r[6]},${m[7]},${-r[8]},${r[9]},${m[10]},${m[11]},${m[12]},${-m[13]},${m[14]},${m[15]}) translate(${this.width * 0.5}px, ${this.height * 0.5}px)`;
	}

	private updateObject(obj: ICss3dObject) {
		const world = this.camera.getWorldMatrix().m;
		const m = obj.world.m;
		const scaleX = 0.01 / obj.height;
		const scaleY = 0.01 / obj.width;

		obj.html.style.transform = `translate(-50%, -50%) matrix3d(${m[0] * scaleX}, ${m[1]}, ${m[2] * scaleX}, ${m[3]}, ${-m[4]}, ${-m[5] * scaleY}, ${-m[6]}, ${-m[7]}, ${m[8]}, ${m[9]}, ${m[10]}, ${m[11]}, ${-world[12] + m[12]}, ${-world[13] + m[13]}, ${world[14] - m[14]}, ${world[15] * 0.00001})`;
	}

	public setObjectEnable(name: string, value: boolean) {
		if (!this.objects.has(name))
			return;
		const obj = this.objects.get(name) as ICss3dObject;
		if (!obj.enable && value) {
			this.cameraDiv.appendChild(obj.html);
			this.dirty = true;
		} else if (obj.enable && !value) {
			obj.html.remove();
		}
		obj.enable = value;
	}

	public getObjectEnable(name: string): boolean {
		if (!this.objects.has(name))
			return false;
		const obj = this.objects.get(name) as ICss3dObject;
		return obj.enable;
	}

	public resize(width: number, height: number) {
		this.width = width;
		this.height = height;
		this.perspective = this.height * 0.5 * this.camera.getProjectionMatrix().m[5];
		document.body.style.perspective = `${this.perspective}px`;
		this.dirty = true;
	}
}
