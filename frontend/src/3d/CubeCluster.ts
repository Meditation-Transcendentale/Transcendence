import {
	BoundingBox,
	Color3,
	Light,
	Material,
	Matrix,
	Mesh,
	MeshBuilder,
	PBRMaterial,
	PBRSpecularGlossinessMaterial,
	PointLight,
	Scene,
	ShadowGenerator,
	StandardMaterial,
	Texture,
	Vector3,
	VolumetricLightScatteringPostProcess,
} from "@babylonjs/core";
import { parse } from "path";

interface options {
	radius?: number;
	quantity?: number;
	maxSize?: number;
	minSize?: number;
	rotation?: number;
	expendX?: number;
	expendY?: number;
	expendZ?: number;
	centerLayer?: number;
	orbitLayer?: number;
}

interface optionsCubeCluster {
	radius: number;
	quantity: number;
	maxSize: number;
	minSize: number;
	rotation: number;
	expendX: number;
	expendY: number;
	expendZ: number;
	centerLayer: number;
	orbitLayer: number;
}

export class CubeCluster {
	private center: Mesh;
	private centerMaterial: PBRMaterial;
	private orbit: Mesh;
	private orbitMaterial: PBRMaterial;

	private centerMatrixBuffer: Float32Array;
	private centerMatrixes: Matrix[];
	private centerRotations: Float32Array;
	private orbitMatrixBuffer: Float32Array;
	private orbitMatrixes: Matrix[];
	private orbitRotations: Float32Array;

	private centerBounding: Vector3[];
	private orbitBounding: Vector3[];

	private light: PointLight;
	private shadow: ShadowGenerator;

	private options: optionsCubeCluster;
	private scene: Scene;

	private frame: HTMLDivElement;
	private window: HTMLDivElement;
	private hover: HTMLDivElement;

	private rot: number = 1;
	private ontop: boolean = false;

	private sub: Mesh;
	//private vls: VolumetricLightScatteringPostProcess;

	constructor(name: string, position: Vector3, scene: Scene, options?: options) {
		this.options = {
			radius: options?.radius ? options.radius : 2.5,
			quantity: options?.quantity ? options.quantity : 1000,
			maxSize: options?.maxSize ? options.maxSize : 0.5,
			minSize: options?.minSize ? options.minSize : 0.1,
			rotation: options?.rotation ? options.rotation : 0.08,
			expendX: options?.expendX ? options.expendX : 1,
			expendY: options?.expendY ? options.expendY : 1.5,
			expendZ: options?.expendZ ? options.expendZ : 1,
			centerLayer: options?.centerLayer ? options.centerLayer : 10,
			orbitLayer: options?.orbitLayer ? options.orbitLayer : 2,
		}

		this.scene = scene;


		const pbr = new PBRSpecularGlossinessMaterial("pbr", scene);
		pbr.diffuseColor = Color3.Black();
		pbr.specularColor = new Color3(0.7, 0.4, 0.7);
		pbr.glossiness = 0.4;

		this.orbitBounding = [];
		this.centerBounding = [];

		this.center = MeshBuilder.CreateBox("center", { size: 1 }, scene);
		this.orbit = MeshBuilder.CreateBox("orbit", { size: 1 }, scene);
		this.center.position = position;
		this.orbit.parent = this.center;

		this.centerMaterial = new PBRMaterial('center', scene);
		this.centerMaterial.metallic = 1;
		this.centerMaterial.roughness = 1.;
		this.centerMaterial.albedoColor = new Color3(0.7, 0.5, 0.5);
		this.centerMaterial.emissiveColor = new Color3(0.5, 0.3, 0.3);
		this.center.material = this.centerMaterial;

		this.orbitMaterial = new PBRMaterial('orbit', scene);
		this.orbitMaterial.metallic = 1.;
		this.orbitMaterial.roughness = 0.;
		this.orbitMaterial.albedoColor = new Color3(0.7, 0.7, 0.7);
		this.orbitMaterial.reflectionColor = new Color3(0.8, 0., 0.);
		this.orbitMaterial.directIntensity = 10;
		this.orbit.material = this.orbitMaterial;

		//Ratio Center Orbit: 60 / 40
		this.centerMatrixes = new Array(this.options.quantity * 0.6);
		this.centerMatrixBuffer = new Float32Array(this.centerMatrixes.length * 16);
		this.centerRotations = new Float32Array(this.centerMatrixes.length);

		this.orbitMatrixes = new Array(this.options.quantity * 0.4);
		this.orbitMatrixBuffer = new Float32Array(this.orbitMatrixes.length * 16);
		this.orbitRotations = new Float32Array(this.orbitMatrixes.length);

		this.light = new PointLight("light", this.center.position);
		this.light.diffuse = this.centerMaterial.albedoColor;
		this.light.intensity = .3;
		this.light.falloffType = Light.FALLOFF_GLTF;
		this.light.radius = this.options.radius * 0.2;
		this.light.shadowMinZ = 0.1;
		this.light.parent = this.orbit;

		this.shadow = new ShadowGenerator(2048, this.light);
		this.shadow.getShadowMap()!.renderList!.push(this.orbit);
		this.orbit.receiveShadows = true;

		this.shadow.setDarkness(0.3);
		//this.shadow.usePoissonSampling = true;
		this.shadow.bias = 0.000001;
		//this.shadow.normalBias = 0.1;
		this.shadow.usePercentageCloserFiltering = true;
		this.shadow.filteringQuality = ShadowGenerator.QUALITY_MEDIUM;

		this.frame = document.querySelector(`#${name}-frame`) as HTMLDivElement;
		this.window = document.querySelector(`#${name}-window`) as HTMLDivElement;

		this.hover = this.window.querySelector(".header")!.cloneNode(true) as HTMLDivElement;
		this.hover.className = "header glitch";

		this.window.addEventListener('mouseover', () => {
			this.hoverEffect();
			this.ontop = true;
		})

		this.sub = MeshBuilder.CreateBox("sub", { size: this.options.maxSize * 0.3 }, this.scene);
		const m = new StandardMaterial("e", this.scene);
		m.diffuseColor = Color3.Blue();
		m.emissiveColor = new Color3(0.01, 0.01, 0.9);
		this.sub.material = m;
		this.sub.parent = this.center;
		//
		//this.orbitMaterial.disableDepthWrite = true;
		//this.centerMaterial.disableDepthWrite = true;

	}

	public async init() {
		this.initCenter();
		this.initOrbit();

		const r = this.options.radius * 0.6;
		const theta = (Math.random() * 0.5 - 0.25) * Math.PI;
		const phi = (Math.random() * 0.3 + 0.35) * Math.PI;
		this.sub.position.set(
			r * Math.sin(phi) * Math.cos(theta),
			r * Math.cos(phi),
			r * Math.sin(phi) * Math.sin(theta)

		)

		this.update(0);

		this.orbit.thinInstanceRefreshBoundingInfo(true);
		this.center.thinInstanceRefreshBoundingInfo(true);
		this.orbit.getBoundingInfo().boundingBox.vectors.forEach((v: any) => {
			this.orbitBounding.push(new Vector3(v._x * 0.8, v._y * 0.8, v._z * 0.8));
		});
		this.center.getBoundingInfo().boundingBox.vectors.forEach((v: any) => {
			this.centerBounding.push(new Vector3(v._x * 0.7, v._y * 0.8, v._z * 0.7));
		});
		console.log(window.innerWidth, window.innerHeight)
	}

	public initCenter() {
		for (let i = 0; i < this.centerMatrixes.length; i++) {
			const r = betaLeft() * this.options.radius * 0.6;
			const pxyz = orbitP(r, this.options.centerLayer);
			const b = (r / this.options.radius);
			const sx = Math.max(this.options.minSize, randomBorn(b) * this.options.maxSize);
			const sy = Math.max(this.options.minSize, randomBorn(b) * this.options.maxSize);
			const sz = Math.max(this.options.minSize, randomBorn(b) * this.options.maxSize);
			const matS = Matrix.Scaling(
				sx,
				sy,
				sz
			)
			const matT = Matrix.Translation(
				pxyz[0] * this.options.expendX,
				pxyz[1] * this.options.expendY * this.options.radius * 0.6,
				pxyz[2] * this.options.expendZ
			)
			this.centerMatrixes[i] = matS.multiply(matT);
			this.centerRotations[i] = Math.max(betaLeft() * (this.options.radius - r) * this.options.rotation, this.options.rotation * 0.01);
		}

	}

	public initOrbit() {
		for (let i = 0; i < this.orbitMatrixes.length; i++) {
			const r = (betaRight() + 1) * this.options.radius * 0.5;
			const pxyz = orbitP(r, this.options.orbitLayer);
			const b = (r / this.options.radius);
			const sx = Math.max(this.options.minSize, randomBorn(b) * this.options.maxSize);
			const sy = Math.max(this.options.minSize, randomBorn(b) * this.options.maxSize);
			const sz = Math.max(this.options.minSize, randomBorn(b) * this.options.maxSize);
			const matS = Matrix.Scaling(
				sx,
				sy,
				sz
			)
			const matT = Matrix.Translation(
				pxyz[0] * this.options.expendX,
				pxyz[1] * this.options.expendY * this.options.radius,
				pxyz[2] * this.options.expendZ
			)
			this.orbitMatrixes[i] = matS.multiply(matT);
			this.orbitRotations[i] = Math.max(betaRight() * r * this.options.rotation, this.options.rotation * 0.05);
		}
	}

	public update(time: number): void {

		for (let i = 0; i < this.centerMatrixes.length; i++) {
			this.centerMatrixes[i].multiplyToRef(
				Matrix.RotationY(time * this.centerRotations[i] * Math.PI * 2 * this.rot * 2), this.centerMatrixes[i]);
			this.centerMatrixes[i].toArray(this.centerMatrixBuffer, i * 16);
		}
		for (let i = 0; i < this.orbitMatrixes.length; i++) {
			this.orbitMatrixes[i].multiplyToRef(Matrix.RotationY(time * this.orbitRotations[i] * Math.PI * 2 / this.rot), this.orbitMatrixes[i]);
			this.orbitMatrixes[i].toArray(this.orbitMatrixBuffer, i * 16);
		}
		this.center.thinInstanceSetBuffer('matrix', this.centerMatrixBuffer, 16, true);
		this.orbit.thinInstanceSetBuffer('matrix', this.orbitMatrixBuffer, 16, true);
	}

	public updateCSS() {
		//const id = Matrix.Identity();
		const model = this.center.worldMatrixFromCache;
		const scene = this.scene.getTransformMatrix();
		const viewport = this.scene.activeCamera!.viewport;

		const pp = new Float32Array(4);

		pp[0] = 2;
		pp[1] = 2;
		pp[2] = -1;
		pp[3] = -1;
		for (let i = 0; i < this.orbitBounding.length; i++) {
			const p = Vector3.Project(
				this.orbitBounding[i],
				model,
				scene,
				viewport
			);
			pp[0] = Math.min(pp[0], p.x);
			pp[1] = Math.min(pp[1], p.y);
			pp[2] = Math.max(pp[2], p.x);
			pp[3] = Math.max(pp[3], p.y);
		}
		this.frame.style.top = `${pp[1] * 100}%`;
		this.frame.style.left = `${pp[0] * 100}%`;
		this.frame.style.width = `${(pp[2] - pp[0]) * 100}%`;
		this.frame.style.height = `${(pp[3] - pp[1]) * 100}%`;

		pp[0] = 2;
		pp[1] = 2;
		pp[2] = -1;
		pp[3] = -1;
		for (let i = 0; i < this.centerBounding.length; i++) {
			const p = Vector3.Project(
				this.centerBounding[i],
				model,
				scene,
				viewport
			);
			pp[0] = Math.min(pp[0], p.x);
			pp[1] = Math.min(pp[1], p.y);
			pp[2] = Math.max(pp[2], p.x);
			pp[3] = Math.max(pp[3], p.y);
		}
		this.window.style.top = `${pp[1] * 100 + (this.ontop ? Math.random() * 0.5 : 0)}%`;
		this.window.style.left = `${pp[0] * 100 + (this.ontop ? Math.random() * 0.5 : 0)}%`;
		this.window.style.width = `${(pp[2] - pp[0]) * 100 + (this.ontop ? Math.random() * 0.5 : 0)}%`;
		this.window.style.height = `${(pp[3] - pp[1]) * 100 + (this.ontop ? Math.random() * 0.5 : 0)}%`;
	}

	private hoverEffect() {
		const fn = () => {
			if (!hover || inn > 40) { return; }
			const style = window.getComputedStyle(this.window);
			const e = this.hover.cloneNode(true) as HTMLDivElement;

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
		let hover = true;
		this.rot = (Math.random() * 0.5 + 0.5) * 6;
		this.window.addEventListener('mouseleave', () => { hover = false; this.rot = 1; this.ontop = false; }, { once: true });
		fn();

	}

	public dispose() {
		this.center.dispose();
		this.orbit.dispose();
		this.centerMaterial.dispose();
		this.orbitMaterial.dispose();

		this.light.dispose();
		this.shadow.dispose();
	}

}


function betaRandom(): number {
	const unif = Math.random();
	return Math.pow(Math.sin(unif * Math.PI * 0.5), 2);
}

function betaLeft(): number {
	const beta = betaRandom();
	return (beta < 0.5 ? (2 * beta) : 2 * (1 - beta))
}

function betaRight(): number {
	const beta = betaRandom();
	return (beta > 0.5 ? (2 * beta - 1) : (2 * (1 - beta) - 1))
}

function randomBorn(b: number) {
	return Math.pow(Math.random() * (1 - b), 2);
}

function randomBorn2(b: number) {
	return Math.pow(Math.random() * (b), 2);
}

function pos(r: number): number[] {
	const theta = Math.random() * Math.PI * 2;
	const phi = Math.random() * Math.PI * 2;

	return [
		r * Math.sin(phi) * Math.cos(theta),
		r * Math.cos(phi),
		r * Math.sin(phi) * Math.sin(theta)
	]
}

function orbitP(r: number, layer: number = 10): number[] {
	const theta = Math.random() * Math.PI * 2;
	const phi = sinRandom(layer) * 2 - 1;

	return [
		r * Math.cos(theta) * Math.sqrt(1 - (phi * phi)),
		phi,
		r * Math.sin(theta) * Math.sqrt(1 - (phi * phi))
	]

}
// function orbitP(r: number, layer: number = 10): number[] {
// 	const theta = sinRandom(layer) * 2 - 1;
// 	const phi = sinRandom(layer) * 2 - 1;
//
// 	return [
// 		r * Math.sqrt(1 - (theta * theta)) * Math.sqrt(1 - (phi * phi)),
// 		phi,
// 		r * theta * Math.sqrt(1 - (phi * phi))
// 	]
//
// }

function sinRandom(layer: number = 10) {
	let final = 0;

	final = Math.random();
	let u = 0, v = 0;
	while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
	while (v === 0) v = Math.random();
	let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
	num = num / 10.0 + 0.5; // Translate to 0 -> 1
	// if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1


	num = num * (0.5 / layer) - (0.25 / layer);

	final *= layer;
	final = Math.round(final) / layer;

	final += num;
	// final = final * 0.8 + 0.1
	if (final > 1 || final < 0) return sinRandom();
	return final;
	// return Math.min(Math.max(final + num, 0), 1);
}


