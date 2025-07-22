import { AbstractMesh, Camera, Matrix, ShaderMaterial, Vector3 } from "@babylonImport";
import { DitherMaterial } from "./3d/Shader";


interface vueOptions {
	mesh: AbstractMesh;
	matrix: Matrix;
	bounding: Vector3[];
}

class cssWindow {
	public readonly name: string;
	public readonly div: HTMLDivElement;
	private bounding: Vector3[];
	private header: HTMLDivElement;
	private pos: Float32Array;
	private hover: boolean;
	private matrix!: Matrix;
	private mesh!: AbstractMesh;

	public _enable: boolean;

	private frameUpdateCount: number;

	private static butterflies: Array<Vector3>;
	private static butterflyBounding: Array<Vector3>;
	private static currentButterfly: number = 0;
	private static butterflyDiv: Array<HTMLDivElement>;
	private matrixId: Matrix = Matrix.Identity();

	private camera!: Camera;


	constructor(name: string, options: vueOptions) {
		console.log(`Creating window: ${name} with options : `, options);
		this.name = name;
		this.div = document.createElement('div');
		this.div.id = `${name}-frame`;
		this.div.className = `frame`;

		this.header = document.createElement('div');
		this.header.className = 'frame-text';
		this.header.innerText = name.toUpperCase();

		this.div.appendChild(this.header.cloneNode(true));
		this.header.className = 'frame-hover';

		this.pos = new Float32Array(4);
		this.bounding = [];
		this.hover = false;
		this._enable = false;


		this.matrix = options.matrix;

		this.mesh = options.mesh;

		options.bounding.forEach((v: any) => {
			this.bounding.push(new Vector3(v._x, v._y, v._z));
		});

		this.div.addEventListener('mouseover', () => {
			this.onHoverButterfly();
		})

		this.frameUpdateCount = Math.floor(Math.random() * 16 + 10);

	}

	public static addButterfly(positions: Array<Vector3>, quantity: number, boudingBox: Array<Vector3>) {
		cssWindow.butterflies = new Array<Vector3>(quantity);
		cssWindow.butterflyDiv = new Array<HTMLDivElement>(quantity);
		for (let i = 0; i < quantity; i++) {
			cssWindow.butterflies[i] = positions[i];
			cssWindow.butterflyDiv[i] = document.createElement("div") as HTMLDivElement;
			cssWindow.butterflyDiv[i].className = "frame-butterfly";
			cssWindow.butterflyDiv[i].style.borderColor = "blue";
			cssWindow.butterflyDiv[i].style.zIndex = "0";
		}
		cssWindow.butterflyBounding = new Array<Vector3>(8);
		for (let i = 0; i < boudingBox.length; i++) {
			cssWindow.butterflyBounding[i] = boudingBox[i].clone();
		}

	}

	public update(camera: Camera, frame: number) {
		if (!this._enable) { return; }
		this.camera = camera;
		//console.log(this.matrix);
		const model = this.matrix.multiply(this.mesh.worldMatrixFromCache);
		const scene = camera._scene.getTransformMatrix();
		const viewport = camera.viewport;

		//if (frame % this.frameUpdateCount == 0) {
		this.pos[0] = 2;
		this.pos[1] = 2;
		this.pos[2] = -1;
		this.pos[3] = -1;
		for (let i = 0; i < this.bounding.length; i++) {
			const p = Vector3.Project(
				this.bounding[i],
				model,
				scene,
				viewport
			);
			this.pos[0] = Math.min(this.pos[0], p.x);
			this.pos[1] = Math.min(this.pos[1], p.y);
			this.pos[2] = Math.max(this.pos[2], p.x);
			this.pos[3] = Math.max(this.pos[3], p.y);
		}
		//}
		this.div.style.top = `${this.pos[1] * 100 - 3 + (true ? Math.random() * 0.1 : 0)}%`;
		this.div.style.left = `${this.pos[0] * 100 + (true ? Math.random() * 0.1 : 0)}%`;
		this.div.style.width = `${(this.pos[2] - this.pos[0]) * 100 + (true ? Math.random() * 0.1 : 0)}%`;
		this.div.style.height = `${(this.pos[3] - this.pos[1]) * 100 + 3 + (true ? Math.random() * 0.1 : 0)}%`;
	}

	private onHover() {
		const fn = () => {
			if (inn > 40 || !this.hover) { return; }
			const style = window.getComputedStyle(this.div);
			const e = this.header.cloneNode(true) as HTMLDivElement;

			const winH = parseInt(style.height);
			const winW = parseInt(style.width);
			const winT = parseInt(style.top);
			const winL = parseInt(style.left);

			const height = Math.max(30, (Math.random() * 0.5 + 0.5) * 0.15 * winH);
			const offsetX = (Math.random() - 0.3) * winW;
			const offsetY = (Math.random() * 1.1 - 0.1) * winH;
			const padding = (Math.random() * 0.3 + 0.2) * height * 2;

			let top = Math.max(winT + offsetY, 0);
			top = top > window.innerHeight ? window.innerHeight - height : top;
			let left = Math.max(winL + offsetX - padding * 0.5, 0);
			left = left > window.innerWidth ? winL : left;
			e.classList.add(`gl${g % 4}`);

			e.style.position = 'absolute';
			e.style.top = `${top}px`;
			e.style.left = `${left}px`;
			e.style.paddingLeft = `${padding * 0.2}px`;
			e.style.paddingRight = `${padding * 0.8}px`;

			e.style.height = `${height}px`;
			e.style.fontSize = `${height}px`;

			document.body.appendChild(e);
			inn++;
			g++;
			setTimeout(() => { inn--; e.remove(); }, 400);
			setTimeout(() => { fn() }, 10);
		}

		let inn = 1;
		let g = 0;
		this.hover = true;
		this.div.addEventListener('mouseleave', () => { this.hover = false; }, { once: true });
		fn();
	}

	private onHoverButterfly() {
		const scene = this.camera._scene.getTransformMatrix();
		const viewport = this.camera.viewport;

		const fn = () => {
			if (!this.hover) { return; }
			const final = new Float32Array(4);

			final[0] = 2;
			final[1] = 2;
			final[2] = -1;
			final[3] = -1;
			for (let i = 0; i < 8; i++) {
				const p = Vector3.Project(
					cssWindow.butterflyBounding[i].add(cssWindow.butterflies[cssWindow.currentButterfly]),
					this.matrixId,
					scene,
					viewport
				);
				final[0] = Math.min(final[0], p.x);
				final[1] = Math.min(final[1], p.y);
				final[2] = Math.max(final[2], p.x);
				final[3] = Math.max(final[3], p.y);
			}

			const div = cssWindow.butterflyDiv[cssWindow.currentButterfly];
			div.style.top = `${final[1] * 100}%`;
			div.style.left = `${final[0] * 100}%`;
			div.style.width = `${(final[2] - final[0]) * 100}%`;
			div.style.height = `${(final[3] - final[1]) * 100}%`;
			document.body.appendChild(div);
			cssWindow.currentButterfly = (cssWindow.currentButterfly + Math.ceil(Math.random() * 10)) % cssWindow.butterflies.length;
			setTimeout(() => { div.remove(); }, 99);
			setTimeout(() => { fn() }, 1);
		}
		this.hover = true;
		(this.mesh.material as DitherMaterial).setFloat('on', 1.);
		this.div.addEventListener('mouseleave', () => {
			this.hover = false;
			(this.mesh.material as DitherMaterial).setFloat('on', 0.);
		}, { once: true });
		fn();
	}

	public enable() {
		this._enable = true;
		document.body.appendChild(this.div);
	}

	public disable() {
		this._enable = false;
		this.hover = false;
		(this.mesh.material as DitherMaterial).setFloat('on', 0.);
		this.div.remove();
	}
}

export class Vue {
	public windows: cssWindow[];
	public camera!: Camera;
	private _enable: boolean;

	constructor() {
		this.windows = [];
		this._enable = false;
	}

	init(camera: Camera) {
		this.camera = camera;
	}

	addWindow(name: string, mesh: AbstractMesh, bounding: Vector3[], matrix: Matrix) {
		this.windows.push(new cssWindow(name, {
			mesh: mesh,
			matrix: matrix,
			bounding: bounding
		}));
	}

	public update(frame: number) {
		if (!this._enable) { return; }
		for (let i = 0; i < this.windows.length; i++) {
			this.windows[i].update(this.camera, frame);
		}
	}

	public enable() {
		this._enable = true;
		this.camera._scene.switchActiveCamera(this.camera);
		for (let i = 0; i < this.windows.length; i++) {
			this.windows[i].enable();
		}
	}

	public windowAddEvent(name: string, event: string, callback: any) {
		for (let i = 0; i < this.windows.length; i++) {
			if (this.windows[i].name == name) {
				console.log(`Adding event ${event} to window ${name}`);
				this.windows[i].div.addEventListener(event, callback);
			}
		}
	}

	public disable() {
		this._enable = false;
		this.camera._scene.switchActiveCamera(this.camera);
		for (let i = 0; i < this.windows.length; i++) {
			this.windows[i].disable();
		}
	}

	public static addButterfly(positions: Array<Vector3>, quantity: number, boudingBox: Array<Vector3>) {
		cssWindow.addButterfly(positions, quantity, boudingBox);
	}
}

