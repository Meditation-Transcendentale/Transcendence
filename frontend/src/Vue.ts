import { AbstractMesh, Camera, Matrix, PostProcess, Quaternion, ShaderMaterial, Vector3, Vector4 } from "@babylonImport";
import { DitherMaterial } from "./3d/Shader";


interface vueOptions {
	mesh: AbstractMesh;
	matrix: Matrix;
	bounding: Vector3[];
}

function signRandom() {
	return Math.random() * 2. - 1.;
}

interface cssWindowOptions {
	div: HTMLDivElement,
	face: Vector3[],
	matrix: Matrix,
	onHoverCallback: any
}

class cssWindow {
	public readonly name: string;

	public readonly div: HTMLDivElement;
	private face: Vector3[];
	private matrix: Matrix;
	private onHoverCallback: any;

	public _enable: boolean;
	private hover: boolean;

	private camera!: Camera;

	private pos: Float32Array;

	constructor(name: string, camera: Camera, options: cssWindowOptions) {
		this.name = name;
		this.camera = camera;

		this.div = options.div;
		this.face = options.face;
		this.matrix = options.matrix;
		this.onHoverCallback = options.onHoverCallback;

		this._enable = false;
		this.hover = false;

		this.div.addEventListener('mouseover', () => {
			this.onHover();
		})

		this.pos = new Float32Array(6);

		// this.div.style.perspective = document.body.style.perspective;
	}

	private epsilon(value: number) {
		return Math.abs(value) < 1e-10 ? 0 : value;
	}

	private quaternionToAxisAngle(q: Quaternion) {
		const angle = 2 * Math.acos(q.w);
		const s = Math.sqrt(1 - q.w * q.w);

		let axis: Vector3;
		if (s < 0.000001) {
			// If s is close to zero, direction of axis is not important
			axis = new Vector3(1, 0, 0); // Arbitrary
		} else {
			axis = new Vector3(q.x / s, q.y / s, q.z / s);
		}
		return { axis, angle };
	}
	// public update() {
	// 	//console.log(this.matrix);
	// 	const scene = this.camera._scene.getTransformMatrix();
	// 	const viewport = this.camera.viewport;
	//
	// 	const rotation = this.matrix.multiply(this.camera.getViewMatrix()).getRotationMatrix();
	// 	const quat = Quaternion.FromRotationMatrix(rotation);
	// 	let { axis, angle } = this.quaternionToAxisAngle(quat);
	//
	// 	//if (frame % this.frameUpdateCount == 0) {
	// 	// this.pos[0] = 2;
	// 	// this.pos[1] = 2;
	// 	// this.pos[2] = -1;
	// 	// this.pos[3] = -1;
	// 	// this.pos[4] = -100;
	// 	// this.pos[5] = 100;
	// 	for (let i = 0; i < 2; i++) {
	// 		const p = Vector3.Project(
	// 			this.face[i],
	// 			this.matrix,
	// 			scene,
	// 			viewport
	// 		);
	// 		this.pos[i * 3] = p.x;
	// 		this.pos[i * 3 + 1] = p.y;
	// 		this.pos[i * 3 + 2] = p.z;
	// 	}
	// 	this.div.style.top = `${this.pos[1] * 100}%`;
	// 	this.div.style.left = `${this.pos[0] * 100}%`;
	//
	// 	// axis.negateInPlace();
	// 	this.div.style.transform = `rotate3d(${axis.x}, ${-axis.y}, ${-axis.z}, ${angle}rad)`;
	//
	// 	// this.div.style.width = `${10}%`;
	// 	this.div.style.width = `${Math.abs((this.pos[3] - this.pos[0]) * 100)}%`;
	// 	this.div.style.height = `${Math.abs((this.pos[4] - this.pos[1]) * 100)}%`;
	// 	// this.div.style.height = this.div.style.width;
	// }

	public update() {
		if (!this._enable) { return; }
		// const matrix = this.matrix.multiply(this.camera._scene.getTransformMatrix());
		// const elements = Matrix.GetFinalMatrix(this.camera.viewport, Matrix.Identity(), this.camera._scene.getViewMatrix(), this.camera._scene.getProjectionMatrix(), 0.1, 100).m;
		const matrix = this.matrix;
		const elements = matrix.m;

		const world = this.camera.getWorldMatrix().m;
		const m = this.matrix.m;
		const scaleX = 0.01 / (Math.abs(this.face[0].x - this.face[1].x));
		const scaleY = 0.01 / (Math.abs(this.face[0].y - this.face[1].y));


		this.div.style.transform = `translate(-50%, -50%) matrix3d(${m[0] * scaleX}, ${m[1]}, ${m[2] * scaleX}, ${m[3]}, ${-m[4]}, ${-m[5] * scaleY}, ${-m[6]}, ${-m[7]}, ${m[8]}, ${m[9]}, ${m[10]}, ${m[11]}, ${-world[12]}, ${-world[13] + 4}, ${world[14]}, ${world[15] * 0.00001})`;
		// const matrix = [
		// 	m[0], m[4], m[8], m[12],
		// 	m[1], m[5], m[9], m[13],
		// 	m[2], m[6], m[10], m[14],
		// 	m[3], m[7], m[11], m[15],
		// ];
		// if (this.hover) {
		// 	console.log(elements);
		// }
		// const m = 'matrix3d(' +
		// 	this.epsilon(elements[0]) + ',' +
		// 	this.epsilon(elements[1]) + ',' +
		// 	this.epsilon(elements[2]) + ',' +
		// 	this.epsilon(elements[3]) + ',' +
		// 	this.epsilon(elements[4]) + ',' +
		// 	this.epsilon(elements[5]) + ',' +
		// 	this.epsilon(elements[6]) + ',' +
		// 	this.epsilon(elements[7]) + ',' +
		// 	this.epsilon(elements[8]) + ',' +
		// 	this.epsilon(elements[9]) + ',' +
		// 	this.epsilon(elements[10]) + ',' +
		// 	this.epsilon(elements[11]) + ',' +
		// 	this.epsilon(elements[12]) + ',' +
		// 	this.epsilon(elements[13]) + ',' +
		// 	this.epsilon(elements[14]) + ',' +
		// 	this.epsilon(elements[15]) +
		// 	')'
		// // this.div.style.transform = `translate(-50%, -50%) matrix3d(${matrix[0]},${matrix[1]},${matrix[2]},${matrix[3]},${matrix[4]},${matrix[5]},${matrix[6]},${matrix[7]},${matrix[8]},${matrix[9]},${matrix[10]},${matrix[11]},${matrix[12]},${matrix[13]},${matrix[14]},${matrix[15]})`;
		// this.div.style.transform = `translate(-50%, -50%) ${m}`;
		// this.div.style.top = `${matrix[12] + 12}%`;
	}

	private onHover() {
		this.hover = true;
		this.onHoverCallback(true);
		this.div.addEventListener('mouseleave', () => {
			this.hover = false;
			this.onHoverCallback(false);
		}, { once: true });
	}

	public enable() {
		this._enable = true;
		document.querySelector("#camera")!.appendChild(this.div);
	}

	public disable() {
		this._enable = false;
		this.div.remove();
		this.hover = false;
		this.onHoverCallback(false);
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

	addWindow(name: string, options: cssWindowOptions) {
		this.windows.push(new cssWindow(name, this.camera, options));
	}

	public update(frame: number) {
		if (!this._enable) { return; }
		for (let i = 0; i < this.windows.length; i++) {
			this.windows[i].update();
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
}

// class cssWindow2 {
// 	public readonly name: string;
// 	public readonly div: HTMLDivElement;
// 	private bounding: Vector3[];
// 	private header: HTMLDivElement;
// 	private pos: Float32Array;
// 	private hover: boolean;
// 	private matrix!: Matrix;
// 	private mesh!: AbstractMesh;
//
// 	public _enable: boolean;
//
// 	private frameUpdateCount: number;
//
// 	private static butterflies: Array<Vector3>;
// 	private static butterflyBounding: Array<Vector3>;
// 	private static currentButterfly: number = 0;
// 	private static butterflyDiv: Array<HTMLDivElement>;
// 	private static butterflyLine: Array<HTMLDivElement>;
// 	private matrixId: Matrix = Matrix.Identity();
//
//
// 	public static glitchOrigin: Vector3;
// 	public static glitchPost: PostProcess;
//
// 	private lastPos: Float32Array;
// 	private framePos: Float32Array;
//
// 	private camera!: Camera;
//
// 	private spawnDelay: number = 100;
//
// 	private div2: HTMLDivElement;
//
//
// 	constructor(name: string, options: vueOptions) {
// 		console.log(`Creating window: ${name} with options : `, options);
// 		this.name = name;
// 		this.div = document.createElement('div');
// 		this.div.id = `${name}-frame`;
// 		this.div.className = `frame`;
// 		this.div2 = document.createElement('div');
// 		this.div2.id = `${name}-frame-clone`;
// 		this.div2.className = `frame`;
// 		this.div2.style.zIndex = "0";
//
// 		this.header = document.createElement('div');
// 		this.header.className = 'frame-text';
// 		this.header.innerText = name.toUpperCase();
//
// 		this.div.appendChild(this.header.cloneNode(true));
// 		this.header.className = 'frame-hover';
//
// 		this.pos = new Float32Array(5);
// 		this.bounding = [];
// 		this.hover = false;
// 		this._enable = false;
//
//
// 		this.matrix = options.matrix;
//
// 		this.mesh = options.mesh;
//
// 		options.bounding.forEach((v: any) => {
// 			this.bounding.push(new Vector3(v._x, v._y, v._z));
// 		});
//
// 		this.div.addEventListener('mouseover', () => {
// 			this.onHoverButterfly();
// 		})
//
// 		this.frameUpdateCount = Math.floor(Math.random() * 16 + 10);
//
// 		this.lastPos = new Float32Array(2);
// 		this.framePos = new Float32Array(3);
//
// 	}
//
// 	public static addButterfly(positions: Array<Vector3>, quantity: number, boudingBox: Array<Vector3>) {
// 		cssWindow.butterflies = new Array<Vector3>(quantity);
// 		cssWindow.butterflyDiv = new Array<HTMLDivElement>(quantity);
// 		cssWindow.butterflyLine = new Array<HTMLDivElement>(quantity);
// 		for (let i = 0; i < quantity; i++) {
// 			cssWindow.butterflies[i] = positions[i];
// 			cssWindow.butterflyDiv[i] = document.createElement("div") as HTMLDivElement;
// 			cssWindow.butterflyDiv[i].className = "frame-butterfly";
// 			cssWindow.butterflyDiv[i].style.zIndex = "0";
// 			cssWindow.butterflyLine[i] = document.createElement("div") as HTMLDivElement;
// 			cssWindow.butterflyLine[i].className = "line";
// 		}
// 		cssWindow.butterflyBounding = new Array<Vector3>(8);
// 		for (let i = 0; i < boudingBox.length; i++) {
// 			cssWindow.butterflyBounding[i] = boudingBox[i].clone();
// 		}
//
// 	}
//
// 	public update(camera: Camera, frame: number) {
// 		if (!this._enable) { return; }
// 		this.camera = camera;
// 		//console.log(this.matrix);
// 		const model = this.matrix.multiply(this.mesh.worldMatrixFromCache);
// 		const scene = camera._scene.getTransformMatrix();
// 		const viewport = camera.viewport;
//
// 		//if (frame % this.frameUpdateCount == 0) {
// 		this.pos[0] = 2;
// 		this.pos[1] = 2;
// 		this.pos[2] = -1;
// 		this.pos[3] = -1;
// 		this.pos[4] = 100;
// 		for (let i = 0; i < this.bounding.length; i++) {
// 			const p = Vector3.Project(
// 				this.bounding[i],
// 				model,
// 				scene,
// 				viewport
// 			);
// 			this.pos[0] = Math.min(this.pos[0], p.x);
// 			this.pos[1] = Math.min(this.pos[1], p.y);
// 			this.pos[2] = Math.max(this.pos[2], p.x);
// 			this.pos[3] = Math.max(this.pos[3], p.y);
// 			this.pos[4] = Math.min(this.pos[4], p.z);
// 		}
// 		//}
// 		if (this.hover) {
// 			cssWindow.glitchOrigin.x = this.pos[0] + (this.pos[2] - this.pos[0]) * 0.5;
// 			cssWindow.glitchOrigin.y = 1. - (this.pos[1] + (this.pos[3] - this.pos[1]) * 0.5);
// 		}
// 		this.framePos[0] = this.pos[0] + ((this.pos[2] - this.pos[0]) * 0.5);
// 		this.framePos[1] = this.pos[1] + ((this.pos[3] - this.pos[1]) * 0.5);
// 		this.framePos[2] = Math.min(((this.pos[2] - this.pos[0])), 0.3);
// 		this.div.style.top = `${this.pos[1] * 100 - 3}%`;
// 		this.div.style.left = `${this.pos[0] * 100}%`;
// 		this.div.style.width = `${(this.pos[2] - this.pos[0]) * 100}%`;
// 		this.div.style.height = `${(this.pos[3] - this.pos[1]) * 100 + 3}%`;
// 		if (this.hover) {
// 			this.div.style.top = `${this.pos[1] * 100 - 3 + signRandom() * 1}%`;
// 			this.div.style.left = `${this.pos[0] * 100 + signRandom() * 1}%`;
// 			this.div.style.width = `${(this.pos[2] - this.pos[0]) * 100 + signRandom() * 1}%`;
// 			this.div.style.height = `${(this.pos[3] - this.pos[1]) * 100 + 3 + signRandom() * 1}%`;
// 		}
// 	}
//
// 	private onHover() {
// 		const fn = () => {
// 			if (inn > 40 || !this.hover) { return; }
// 			const style = window.getComputedStyle(this.div);
// 			const e = this.header.cloneNode(true) as HTMLDivElement;
//
// 			const winH = parseInt(style.height);
// 			const winW = parseInt(style.width);
// 			const winT = parseInt(style.top);
// 			const winL = parseInt(style.left);
//
// 			const height = Math.max(30, (Math.random() * 0.5 + 0.5) * 0.15 * winH);
// 			const offsetX = (Math.random() - 0.3) * winW;
// 			const offsetY = (Math.random() * 1.1 - 0.1) * winH;
// 			const padding = (Math.random() * 0.3 + 0.2) * height * 2;
//
// 			let top = Math.max(winT + offsetY, 0);
// 			top = top > window.innerHeight ? window.innerHeight - height : top;
// 			let left = Math.max(winL + offsetX - padding * 0.5, 0);
// 			left = left > window.innerWidth ? winL : left;
// 			e.classList.add(`gl${g % 4}`);
//
// 			e.style.position = 'absolute';
// 			e.style.top = `${top}px`;
// 			e.style.left = `${left}px`;
// 			e.style.paddingLeft = `${padding * 0.2}px`;
// 			e.style.paddingRight = `${padding * 0.8}px`;
//
// 			e.style.height = `${height}px`;
// 			e.style.fontSize = `${height}px`;
//
// 			document.body.appendChild(e);
// 			inn++;
// 			g++;
// 			setTimeout(() => { inn--; e.remove(); }, 400);
// 			setTimeout(() => { fn() }, 10);
// 		}
//
// 		let inn = 1;
// 		let g = 0;
// 		this.hover = true;
// 		this.div.addEventListener('mouseleave', () => { this.hover = false; }, { once: true });
// 		fn();
// 	}
//
// 	private onHoverButterfly() {
// 		const scene = this.camera._scene.getTransformMatrix();
// 		const viewport = this.camera.viewport;
//
// 		const fn = () => {
// 			if (!this.hover) { return; }
// 			const final = new Float32Array(5);
//
// 			final[0] = 2;
// 			final[1] = 2;
// 			final[2] = -1;
// 			final[3] = -1;
// 			final[4] = 0;
// 			for (let i = 0; i < 8; i++) {
// 				const p = Vector3.Project(
// 					cssWindow.butterflyBounding[i].add(cssWindow.butterflies[cssWindow.currentButterfly]),
// 					this.matrixId,
// 					scene,
// 					viewport
// 				);
// 				final[0] = Math.min(final[0], p.x);
// 				final[1] = Math.min(final[1], p.y);
// 				final[2] = Math.max(final[2], p.x);
// 				final[3] = Math.max(final[3], p.y);
// 				final[4] = Math.max(final[4], p.z);
// 			}
//
// 			if (Math.abs(final[0] - this.framePos[0]) > this.framePos[2] * 2 || Math.abs(final[1] - this.framePos[1]) > this.framePos[2] * 2
// 				|| ((Math.abs(final[0] - this.framePos[0]) < this.framePos[2] * 0.5 || Math.abs(final[1] - this.framePos[1]) < this.framePos[2] * 0.5)
// 					&& final[4] > this.pos[4])) {
// 				cssWindow.currentButterfly = (cssWindow.currentButterfly + 1) % cssWindow.butterflies.length;
// 				fn();
// 				return;
// 			}
// 			const div = cssWindow.butterflyDiv[cssWindow.currentButterfly];
// 			div.style.top = `${final[1] * 100}%`;
// 			div.style.left = `${final[0] * 100}%`;
// 			div.style.width = `${(final[2] - final[0]) * 100}%`;
// 			div.style.height = `${(final[3] - final[1]) * 100}%`;
//
// 			const line = cssWindow.butterflyLine[cssWindow.currentButterfly];
//
// 			const x = (final[0] < this.lastPos[0] ? final[0] : this.lastPos[0]);
// 			const y = (final[0] < this.lastPos[0] ? final[1] : this.lastPos[1]);
// 			const x1 = x;
// 			const y1 = y * (window.innerHeight / window.innerWidth);
// 			const x2 = (final[0] >= this.lastPos[0] ? final[0] : this.lastPos[0]);
// 			const y2 = (final[0] >= this.lastPos[0] ? final[1] : this.lastPos[1]) * (window.innerHeight / window.innerWidth);
// 			const len = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
// 			const angle = Math.atan2(y2 - y1, (x2 - x1)) * (180 / Math.PI);
// 			line.style.top = `${y * 100}%`;
// 			line.style.left = `${x * 100}%`;
// 			line.style.width = `${len * 100}%`;
// 			line.style.transformOrigin = `left center`
// 			line.style.transform = `rotate(${angle}deg)`;
//
//
// 			this.lastPos[0] = final[2];
// 			this.lastPos[1] = final[3];
//
// 			document.body.appendChild(div);
// 			if (g > 1) {
// 				document.body.appendChild(line);
// 			}
// 			g++;
// 			cssWindow.currentButterfly = (cssWindow.currentButterfly + Math.ceil(Math.random() * 10)) % cssWindow.butterflies.length;
// 			setTimeout(() => { div.remove(); line.remove(); }, 300 + this.spawnDelay);
// 			setTimeout(() => { fn() }, this.spawnDelay);
// 			this.spawnDelay = Math.max(20, this.spawnDelay * Math.pow(0.95, Math.min(g, 105)));
// 		}
// 		this.hover = true;
// 		cssWindow.glitchOrigin.z = performance.now() * 0.001;
// 		cssWindow.glitchPost.autoClear = false;
// 		let g = 1;
// 		this.spawnDelay = 50;
// 		(this.mesh.material as DitherMaterial).setFloat('on', 1.);
//
// 		// document.body.appendChild(this.div2);
// 		this.div.addEventListener('mouseleave', () => {
// 			this.div2.remove();
// 			this.hover = false;
// 			(this.mesh.material as DitherMaterial).setFloat('on', 0.);
// 			cssWindow.glitchOrigin.z = 0;
// 			cssWindow.glitchPost.autoClear = true;
// 		}, { once: true });
// 		// fn();
// 	}
//
// 	public enable() {
// 		this._enable = true;
// 		document.body.appendChild(this.div);
// 	}
//
// 	public disable() {
// 		this._enable = false;
// 		this.hover = false;
// 		(this.mesh.material as DitherMaterial).setFloat('on', 0.);
// 		this.div.remove();
// 	}
// }
//
// export class Vue2 {
// 	public windows: cssWindow[];
// 	public camera!: Camera;
// 	private _enable: boolean;
//
// 	constructor() {
// 		this.windows = [];
// 		this._enable = false;
// 	}
//
// 	init(camera: Camera) {
// 		this.camera = camera;
// 	}
//
// 	addWindow(name: string, mesh: AbstractMesh, bounding: Vector3[], matrix: Matrix) {
// 		this.windows.push(new cssWindow(name, {
// 			mesh: mesh,
// 			matrix: matrix,
// 			bounding: bounding
// 		}));
// 	}
//
// 	public update(frame: number) {
// 		if (!this._enable) { return; }
// 		for (let i = 0; i < this.windows.length; i++) {
// 			this.windows[i].update(this.camera, frame);
// 		}
// 	}
//
// 	public enable() {
// 		this._enable = true;
// 		this.camera._scene.switchActiveCamera(this.camera);
// 		for (let i = 0; i < this.windows.length; i++) {
// 			this.windows[i].enable();
// 		}
// 	}
//
// 	public windowAddEvent(name: string, event: string, callback: any) {
// 		for (let i = 0; i < this.windows.length; i++) {
// 			if (this.windows[i].name == name) {
// 				console.log(`Adding event ${event} to window ${name}`);
// 				this.windows[i].div.addEventListener(event, callback);
// 			}
// 		}
// 	}
//
// 	public disable() {
// 		this._enable = false;
// 		this.camera._scene.switchActiveCamera(this.camera);
// 		for (let i = 0; i < this.windows.length; i++) {
// 			this.windows[i].disable();
// 		}
// 	}
//
// 	public static addButterfly(positions: Array<Vector3>, quantity: number, boudingBox: Array<Vector3>) {
// 		cssWindow.addButterfly(positions, quantity, boudingBox);
// 	}
//
//
// 	public static refGlitch(process: PostProcess, origin: Vector3) {
// 		cssWindow.glitchPost = process;
// 		cssWindow.glitchOrigin = origin;
// 	}
// }

