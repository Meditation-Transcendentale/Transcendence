import {
	BoundingBox,
	Color3,
	Light,
	Matrix,
	Mesh,
	MeshBuilder,
	PBRMaterial,
	PBRSpecularGlossinessMaterial,
	PointLight,
	Scene,
	ShadowGenerator,
	Texture,
	Vector3,
	VolumetricLightScatteringPostProcess,
} from "@babylonjs/core";

interface options {
	radius?: number;
	quantity?: number;
	maxSize?: number;
	minSize?: number;
	rotation?: number;
	expendX?: number;
	expendY?: number;
	expendZ?: number;
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

}

export class CubeCluster {
	private boundingBox: Vector3[];

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
	private hover: HTMLSpanElement;
	//private vls: VolumetricLightScatteringPostProcess;

	constructor(name: string, scene: Scene, options?: options) {
		this.options = {
			radius: options?.radius ? options.radius : 2.5,
			quantity: options?.quantity ? options.quantity : 1000,
			maxSize: options?.maxSize ? options.maxSize : 0.5,
			minSize: options?.minSize ? options.minSize : 0.1,
			rotation: options?.rotation ? options.rotation : 0.05,
			expendX: options?.expendX ? options.expendX : 1,
			expendY: options?.expendY ? options.expendY : 1.5,
			expendZ: options?.expendZ ? options.expendZ : 1,
		}

		this.scene = scene;


		const pbr = new PBRSpecularGlossinessMaterial("pbr", scene);
		pbr.diffuseColor = Color3.Black();
		pbr.specularColor = new Color3(0.7, 0.4, 0.7);
		pbr.glossiness = 0.4;

		this.boundingBox = [];
		this.orbitBounding = [];
		this.centerBounding = [];

		this.boundingBox.push(new Vector3(this.options.radius * this.options.expendX * 0.5, this.options.radius * this.options.expendY * 0.9, this.options.radius * this.options.expendZ * 0.5));
		this.boundingBox.push(new Vector3(this.options.radius * this.options.expendX * 0.5, -this.options.radius * this.options.expendY * 0.9, this.options.radius * this.options.expendZ * 0.5));
		this.boundingBox.push(new Vector3(this.options.radius * this.options.expendX * 0.5, this.options.radius * this.options.expendY * 0.9, -this.options.radius * this.options.expendZ * 0.5));
		this.boundingBox.push(new Vector3(this.options.radius * this.options.expendX * 0.5, -this.options.radius * this.options.expendY * 0.9, -this.options.radius * this.options.expendZ * 0.5));
		this.boundingBox.push(new Vector3(-this.options.radius * this.options.expendX * 0.5, this.options.radius * this.options.expendY * 0.9, this.options.radius * this.options.expendZ * 0.5));
		this.boundingBox.push(new Vector3(-this.options.radius * this.options.expendX * 0.5, -this.options.radius * this.options.expendY * 0.9, this.options.radius * this.options.expendZ * 0.5));
		this.boundingBox.push(new Vector3(-this.options.radius * this.options.expendX * 0.5, this.options.radius * this.options.expendY * 0.9, -this.options.radius * this.options.expendZ * 0.5));
		this.boundingBox.push(new Vector3(-this.options.radius * this.options.expendX * 0.5, -this.options.radius * this.options.expendY * 0.9, -this.options.radius * this.options.expendZ * 0.5));


		this.center = MeshBuilder.CreateBox("center", { size: 1 }, scene);
		this.orbit = MeshBuilder.CreateBox("orbit", { size: 1 }, scene);


		this.centerMaterial = new PBRMaterial('center', scene);
		this.centerMaterial.metallic = 1;
		this.centerMaterial.roughness = 1.;
		this.centerMaterial.albedoColor = new Color3(0.7, 0.5, 0.5);
		this.centerMaterial.emissiveColor = new Color3(0.7, 0.5, 0.5);
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

		this.hover = this.window.querySelector(".header")!.cloneNode(true) as HTMLSpanElement;
		//this.hover.appendChild(this.window.querySelector(".header")!.cloneNode(false));


		this.window.addEventListener('mouseover', () => {
			console.log('e');
			this.hoverEffect();
		})
	}

	public async init() {
		this.initCenter();
		this.initOrbit();

		this.update(0);

		this.orbit.thinInstanceRefreshBoundingInfo(true);
		this.center.thinInstanceRefreshBoundingInfo(true);
		this.orbit.getBoundingInfo().boundingBox.vectors.forEach((v) => {
			this.orbitBounding.push(new Vector3(v._x * 0.5, v._y, v._z * 0.5));
		});
		this.center.getBoundingInfo().boundingBox.vectors.forEach((v) => {
			this.centerBounding.push(new Vector3(v._x * 0.3, v._y * 0.5, v._z * 0.3));
		});

	}

	public initCenter() {
		for (let i = 0; i < this.centerMatrixes.length; i++) {
			const r = betaLeft() * this.options.radius * 0.6;
			const pxyz = pos(r);
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
				pxyz[1] * this.options.expendY,
				pxyz[2] * this.options.expendZ
			)
			this.centerMatrixes[i] = matS.multiply(matT);
			this.centerRotations[i] = Math.max(Math.random() * r * this.options.rotation, this.options.rotation * 0.1);
		}

	}

	public initOrbit() {
		for (let i = 0; i < this.orbitMatrixes.length; i++) {
			const r = (betaRight() + 1) * this.options.radius * 0.5;
			const pxyz = pos(r);
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
				pxyz[1] * this.options.expendY,
				pxyz[2] * this.options.expendZ
			)
			this.orbitMatrixes[i] = matS.multiply(matT);
			this.orbitRotations[i] = Math.max(r * this.options.rotation, this.options.rotation * 0.1);
		}
	}

	public update(time: number): void {

		for (let i = 0; i < this.centerMatrixes.length; i++) {
			this.centerMatrixes[i].multiplyToRef(Matrix.RotationY(time * this.centerRotations[i] * Math.PI * 2), this.centerMatrixes[i]);
			this.centerMatrixes[i].toArray(this.centerMatrixBuffer, i * 16);
		}
		for (let i = 0; i < this.orbitMatrixes.length; i++) {
			this.orbitMatrixes[i].multiplyToRef(Matrix.RotationY(time * this.orbitRotations[i] * Math.PI * 2), this.orbitMatrixes[i]);
			this.orbitMatrixes[i].toArray(this.orbitMatrixBuffer, i * 16);
		}
		this.center.thinInstanceSetBuffer('matrix', this.centerMatrixBuffer, 16, true);
		this.orbit.thinInstanceSetBuffer('matrix', this.orbitMatrixBuffer, 16, true);
	}

	public updateCSS() {
		const id = Matrix.Identity();
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
				id,
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
				id,
				scene,
				viewport
			);
			pp[0] = Math.min(pp[0], p.x);
			pp[1] = Math.min(pp[1], p.y);
			pp[2] = Math.max(pp[2], p.x);
			pp[3] = Math.max(pp[3], p.y);
		}
		this.window.style.top = `${pp[1] * 100}%`;
		this.window.style.left = `${pp[0] * 100}%`;
		this.window.style.width = `${(pp[2] - pp[0]) * 100}%`;
		this.window.style.height = `${(pp[3] - pp[1]) * 100}%`;
	}

	private hoverEffect() {
		const fn = () => {
			if (!inn || inn > 50) { return; }
			const style = window.getComputedStyle(this.window);
			const offsetX = (Math.random() * 2 - 1) * parseInt(style.width);
			const offsetY = (Math.random() * 1.4 - 0.2) * parseInt(style.height);

			const e = this.hover.cloneNode(true) as HTMLDivElement;

			e.style.position = 'absolute';
			e.style.top = `${parseInt(style.top) + offsetY}px`;
			e.style.left = `${parseInt(style.left) + offsetX}px`;
			e.style.width = `${parseInt(style.width)}px`;
			//e.style.height = '20px';

			//this.window.addEventListener('mouseleave', () => { e.remove() })
			document.body.appendChild(e);
			inn++;
			setTimeout(() => { inn--; e.remove(); }, 500);
			setTimeout(() => { fn() }, 10);
		}

		let inn = 1;
		this.window.addEventListener('mouseleave', () => { inn = 0; }, { once: true });
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

function pos(r: number): number[] {
	const theta = Math.random() * Math.PI * 2;
	const phi = Math.random() * Math.PI;

	return [
		r * Math.sin(phi) * Math.cos(theta),
		r * Math.cos(phi),
		r * Math.sin(phi) * Math.sin(theta)
	]



}

