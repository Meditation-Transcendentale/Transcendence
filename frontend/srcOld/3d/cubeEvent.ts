import { Camera, Mesh, Vector3 } from "@babylonImport";

export class cubeEvent {
	private mesh: Mesh;
	private boundingVec: Array<Vector3>;
	private div: HTMLElement;
	private header: HTMLSpanElement;
	private enabled: boolean;

	public clickEvent: any | null;
	public hoverEvent: any | null;

	private pos: Float32Array;

	constructor(mesh: Mesh) {
		this.mesh = mesh;
		this.boundingVec = mesh.getBoundingInfo().boundingBox.vectors;
		console.log("BOUNDING", this.boundingVec);
		this.enabled = false;

		this.clickEvent = null;
		this.hoverEvent = null;

		this.div = document.createElement('div');
		this.div.id = `${name}-frame`;
		this.div.className = `frame`;

		this.header = document.createElement('div');
		this.header.className = 'frame-text';
		this.header.className = 'frame-hover';

		this.div.appendChild(this.header);
		this.div.addEventListener("click", () => {
			if (this.clickEvent)
				this.clickEvent();
		})

		this.div.addEventListener("mouseover", () => {
			if (this.hoverEvent)
				this.hoverEvent();
		})

		this.pos = new Float32Array(5);
	}

	public update(camera: Camera, time: number, deltaTime: number) {
		if (!this.enabled) { return; }
		//console.log(this.matrix);
		const model = this.mesh.worldMatrixFromCache;
		const scene = camera._scene.getTransformMatrix();
		const viewport = camera.viewport;

		//if (frame % this.frameUpdateCount == 0) {
		this.pos[0] = 2;
		this.pos[1] = 2;
		this.pos[2] = -1;
		this.pos[3] = -1;
		this.pos[4] = 100;
		for (let i = 0; i < this.boundingVec.length; i++) {
			const p = Vector3.Project(
				this.boundingVec[i],
				model,
				scene,
				viewport
			);
			this.pos[0] = Math.min(this.pos[0], p.x);
			this.pos[1] = Math.min(this.pos[1], p.y);
			this.pos[2] = Math.max(this.pos[2], p.x);
			this.pos[3] = Math.max(this.pos[3], p.y);
			this.pos[4] = Math.min(this.pos[4], p.z);
		}
		//}
		// if (this.hover) {
		// 	cssWindow.glitchOrigin.x = this.pos[0] + (this.pos[2] - this.pos[0]) * 0.5;
		// 	cssWindow.glitchOrigin.y = 1. - (this.pos[1] + (this.pos[3] - this.pos[1]) * 0.5);
		// }
		// this.framePos[0] = this.pos[0] + ((this.pos[2] - this.pos[0]) * 0.5);
		// this.framePos[1] = this.pos[1] + ((this.pos[3] - this.pos[1]) * 0.5);
		// this.framePos[2] = Math.min(((this.pos[2] - this.pos[0])), 0.3);
		this.div.style.top = `${this.pos[1] * 100 - 3}%`;
		this.div.style.left = `${this.pos[0] * 100}%`;
		this.div.style.width = `${(this.pos[2] - this.pos[0]) * 100}%`;
		this.div.style.height = `${(this.pos[3] - this.pos[1]) * 100 + 3}%`;
		// if (this.hover) {
		// 	this.div.style.top = `${this.pos[1] * 100 - 3 + signRandom() * 1}%`;
		// 	this.div.style.left = `${this.pos[0] * 100 + signRandom() * 1}%`;
		// 	this.div.style.width = `${(this.pos[2] - this.pos[0]) * 100 + signRandom() * 1}%`;
		// 	this.div.style.height = `${(this.pos[3] - this.pos[1]) * 100 + 3 + signRandom() * 1}%`;
		// }
	}

	public set name(name: string) {
		this.header.innerText = name.toUpperCase();
	}

	public set enable(state: boolean) {
		if (state && !this.enabled) {
			document.body.appendChild(this.div);
		} else if (!state) {
			this.div.remove();
		}
		this.enabled = state;
	}
}
