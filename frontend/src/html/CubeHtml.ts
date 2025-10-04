import { Camera, Mesh, Vector3 } from "../babylon";
import { sceneManager } from "../scene/SceneManager";

export class CubeHtml {
	private mesh!: Mesh;
	private boundingVec!: Array<Vector3>;
	private div: HTMLElement;
	private header: HTMLSpanElement;
	private _enable: boolean;

	public clickEvent: any | null;
	public hoverEvent: any | null;

	private pos: Float32Array;

	private created: boolean;

	constructor() {
		this.created = false;
		this._enable = false;

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

	private init() {
		this.mesh = sceneManager.assets.cubeMesh;
		this.boundingVec = this.mesh.getBoundingInfo().boundingBox.vectors;
		this.created = true;
	}

	public update() {
		if (!this._enable) { return; }
		const model = this.mesh.worldMatrixFromCache;
		const scene = sceneManager.camera._scene.getTransformMatrix();
		const viewport = sceneManager.camera.viewport;

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
		this.div.style.top = `${this.pos[1] * 100 - 3}%`;
		this.div.style.left = `${this.pos[0] * 100}%`;
		this.div.style.width = `${(this.pos[2] - this.pos[0]) * 100}%`;
		this.div.style.height = `${(this.pos[3] - this.pos[1]) * 100 + 3}%`;
	}

	public set name(name: string) {
		this.header.innerText = name.toUpperCase();
	}

	public set enable(state: boolean) {
		if (state && !this._enable) {
			if (!this.created)
				this.init();
			document.body.appendChild(this.div);
			sceneManager.beforeRender.add(() => { this.update() })
		} else if (!state) {
			this.div.remove();
			sceneManager.beforeRender.delete(() => { this.update() })
		}
		this._enable = state;
	}

}
