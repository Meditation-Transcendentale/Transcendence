import { LoadAssetContainerAsync, Matrix, Mesh, Scene, TransformNode, Vector3, Vector4 } from "@babylonImport";
import { ButterflyMaterial } from "./Shader";
import { Noise } from "./Noise";

export class Butterfly {

	private root: TransformNode;

	private mesh!: Mesh;
	private material: ButterflyMaterial;
	private scene: Scene;

	private oldTime: number = 0;

	private position: Vector3;
	private oldPosition: Vector3;

	private angleVariance = Math.PI * 0.5 * 0.1;
	private alpha: number = 0;
	private beta: number = 0;
	private dir!: Vector3;

	private once = 0;

	private moves!: Float32Array;
	private deltas!: Float32Array;
	private n: number = 10;

	private speed = 0.01;

	private octree: OctreeBlock;


	constructor(scene: Scene) {
		this.scene = scene;

		this.material = new ButterflyMaterial("butterfly", this.scene);

		this.position = new Vector3(0, 0, 0);
		this.oldPosition = new Vector3(0, 0, 0);
		this.angles = new Float32Array(2);

		this.root = new TransformNode("butterflyRoot", this.scene);
		this.root.position = new Vector3(0, 2, -10);

		this.dir = new Vector3(0, 0, 0);

		this.octree = new OctreeBlock(6, new Vector3(0, 5, 0), 5);

	}

	public async init() {
		const loaded = await LoadAssetContainerAsync("/assets/butterfly.glb", this.scene);
		this.mesh = loaded.meshes[1] as Mesh;
		this.mesh.name = 'butterfly';
		this.mesh.optimizeIndices();
		this.mesh.parent = this.root;

		this.mesh.position.set(0, 0, 0);
		this.mesh.scaling.set(0.1, 0.1, 0.1);
		this.mesh.material = this.material
		this.mesh.alwaysSelectAsActiveMesh = true;

		this.thinInstance(this.n, 1);
		// this.octree.print();
		this.octree.printRoot();


		loaded.addAllToScene();
	}

	public update(time: number) {
		if (this.once == 0) {
			setTimeout(() => { this.newDeltas() }, 500);
			this.once = 1;
		}
		this.material.setFloat("time", time);
		this.material.setFloat("alpha", this.alpha)
		// this.material.setFloat("oldTime", this.oldTime);
		// this.updatePosition();
		this.newDirection();
	}

	private newDeltas() {
		for (let i = 1; i < this.n; i++) {
			this.deltas[i * 3] = Math.random() * 2 - 1;
			this.deltas[i * 3 + 1] = Math.random() * 2 - 1;
			this.deltas[i * 3 + 2] = Math.random() * 2 - 1;
		}


		setTimeout(() => { this.newDeltas() }, 500);


	}

	private newDirection() {
		let alpha = (betaRandom() * 2. - 1.) * this.angleVariance + this.alpha;
		let beta = (betaRandom() * 2. - 1.) * this.angleVariance * 0.2 + this.beta;


		//
		const f = 0.02;

		this.oldTime = performance.now() * 0.001;
		// const cb = Math.cos(this.beta);
		// let x = Math.cos(this.alpha) * cb * f;
		// let y = Math.sin(this.beta) * f;
		// let z = Math.sin(this.alpha) * cb * f;
		let ca = Math.cos(this.alpha);
		let x = -Math.sin(this.alpha) * f;
		let y = Math.sin(this.beta) * ca * f;
		let z = Math.cos(this.beta) * ca * f;
		// while (Math.abs(this.moves[0] + x) > 5 || Math.abs(this.moves[0] + x) > 5 || Math.abs(this.moves[1] + y - 2.5) > 2.5) {
		// 	alpha = (betaRandom() * 2. - 1.) * this.angleVariance + this.alpha;
		// 	ca = Math.cos(alpha);
		// 	while (Math.abs(this.moves[1] + y - 2.5) > 2.5) {
		// 		beta = (betaRandom() * 2. - 1.) * this.angleVariance * 0.2 + this.beta;
		// 		x = -Math.sin(alpha) * f;
		// 		y = Math.sin(beta) * ca * f;
		// 		z = Math.cos(beta) * ca * f;
		// 	}
		// }

		this.alpha = alpha % (Math.PI * 2.);
		this.beta = beta % (Math.PI * 2.);


		//
		if (Math.abs(this.moves[0] + x) > 5) {
			x *= -1;
			// this.alpha = -(this.alpha + Math.PI);
			this.alpha *= -1;
		}
		if (Math.abs(this.moves[1] + y - 2.5) > 2.5) {
			y *= -1;
			this.beta *= -1;
		}
		if (Math.abs(this.moves[2] + z) > 5) {
			z *= -1;
			this.alpha = -(this.alpha + Math.PI);
			// this.alpha;
		}
		this.dir.set(
			x, y, z);
		// for (let i = 0; i < this.n; i++) {
		// 	this.moves[3 * i] += this.dir.x * this.deltas[i * 3]; //(Math.random() * 0.5 + 0.5);
		// 	this.moves[3 * i + 1] += this.dir.y * this.deltas[i * 3 + 1];//(Math.random() * 0.5 + 0.5);
		// 	this.moves[3 * i + 2] += this.dir.z * this.deltas[i * 3 + 2];//(Math.random() * 0.5 + 0.5);
		// }
		//
		// this.moves[0] += this.dir.x;
		// this.moves[1] += this.dir.y;
		// this.moves[2] += this.dir.z;

		for (let i = 1; i < this.n; i++) {
			x = this.moves[0] - this.moves[3 * i] + this.deltas[i * 3];
			y = this.moves[1] - this.moves[3 * i + 1] + this.deltas[i * 3 + 1];
			z = this.moves[2] - this.moves[3 * i + 2] + this.deltas[i * 3 + 2];
			let s = Math.sqrt(x * x + y * y + z * z);
			// this.moves[3 * i] += (this.moves[0] - this.moves[3 * i]) * s * this.deltas[i];
			// this.moves[3 * i + 1] += (this.moves[1] - this.moves[3 * i + 1]) * s * this.deltas[i];
			// this.moves[3 * i + 2] += (this.moves[2] - this.moves[3 * i + 2]) * s * this.deltas[i];

			this.moves[3 * i] += (x / s) * f;
			this.moves[3 * i + 1] += (y / s) * f;
			this.moves[3 * i + 2] += (z / s) * f;
		}
		this.mesh.thinInstanceBufferUpdated("move");
		this.moves[0] += this.dir.x;
		this.moves[1] += this.dir.y;
		this.moves[2] += this.dir.z;

		// for (let i = 1; i < this.n; i++) {
		// 	this.deltas[i * 3] = Math.random() * 0.5 + 0.5;
		// 	this.deltas[i * 3 + 1] = Math.random() * 0.5 + 0.5;
		// 	this.deltas[i * 3 + 2] = Math.random() * 0.5 + 0.5;
		// }

		// setTimeout(() => { this.newDirection() }, 500);
	}

	private updatePosition() {
		for (let i = 0; i < this.n; i++) {
			this.moves[3 * i] += this.dir.x * this.deltas[3 * i];
			this.moves[3 * i + 1] += this.dir.y * this.deltas[3 * i + 1];
			this.moves[3 * i + 2] += this.dir.z * this.deltas[3 * i + 2];
		}

		this.mesh.thinInstanceBufferUpdated("move");
		// this.mesh.thinInstanceSetBuffer('move', this.moves, 3, false);
	}

	private move() {
		const alpha = (betaRandom() * 2. - 1.) * this.angleVariance + this.alpha;
		const beta = (betaRandom() * 2. - 1.) * this.angleVariance + this.beta;

		this.alpha = alpha % (Math.PI * 2.);
		this.beta = beta % (Math.PI * 2.);

		//
		const f = 0.1;

		this.oldTime = performance.now() * 0.001;
		this.oldPosition.set(this.position.x, this.position.y, this.position.z);
		const cb = Math.cos(this.beta);

		let x = Math.cos(this.alpha) * cb * f;
		let y = Math.sin(this.beta) * f;
		let z = Math.sin(this.alpha) * cb * f;

		if (Math.abs(this.mesh.position.x + x) > 5) {
			x *= -1;
			this.alpha = -(this.alpha + Math.PI);
		}
		if (Math.abs(this.mesh.position.z + z) > 5) {
			z *= -1;
			this.alpha *= -1;
		}
		if (Math.abs(this.mesh.position.y + y - 2.5) > 2.5) {
			y *= -1;
			this.beta *= -1;
		}

		this.dir.addInPlaceFromFloats(
			x, y, z);
		// console.log(Math.cos(this.alpha) * f, Math.sin(this.alpha) * f);

		setTimeout(() => { this.move() }, 100);
	}

	private lerpPos(a: number) {
		// this.mesh.position.set(
		// 	this.oldPosition.x * (1 - a) + this.position.x * a,
		// 	this.oldPosition.y * (1 - a) + this.position.y * a,
		// 	this.oldPosition.z * (1 - a) + this.position.z * a
		// )
	}

	private thinInstance(n: number, radius: number) {


		const bufferMatrix = new Float32Array(16 * n);
		this.moves = new Float32Array(3 * n);
		this.deltas = new Float32Array(3 * n);
		this.deltas[0] = .75;
		this.deltas[1] = .75;
		this.deltas[2] = .75;


		for (let i = 0; i < n; i++) {
			const alpha = Math.random() * Math.PI * 2.;
			const beta = Math.random() * Math.PI * 2.;

			// const matT = Matrix.Translation(
			// 	Math.cos(alpha) * Math.cos(beta) * radius,
			// 	Math.sin(beta) * radius,
			// 	Math.sin(alpha) * Math.cos(beta) * radius
			// );

			const matT = Matrix.Identity();

			const matrix = matT;

			let parameter: Vector3;
			if (i == 0) {
				parameter = new Vector3();
			}
			else {
				parameter = new Vector3(
					Math.cos(alpha) * Math.cos(beta) * radius,
					Math.sin(beta) * radius,
					Math.sin(alpha) * Math.cos(beta) * radius
				)
			}

			matrix.copyToArray(bufferMatrix, i * 16);
			parameter.toArray(this.moves, i * 3);
			this.octree.add(i, parameter);
		}

		this.mesh.thinInstanceSetBuffer('matrix', bufferMatrix, 16, true);
		this.mesh.thinInstanceSetBuffer('move', this.moves, 3, false);
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

// function curlNoise(x: number, y: number, delta: number, noise: Noise): [number, number] {
// 	const dX = noise.simplex2(x + delta, y) - noise.simplex2(x - delta, y);
// 	const dY = noise.simplex2(x, y + delta) - noise.simplex2(x, y - delta);
//
// 	return [
// 		dY / (1),
// 		-dX / (1)
// 	];
// }
//
//
//
//



class OctreeBlock {
	public entries: Map<number, Vector3>;
	public blocks: Array<OctreeBlock>;
	public depth: number;

	public center: Vector3;
	public radius: number;


	constructor(depth: number, center: Vector3, radius: number) {
		this.entries = new Map();
		this.depth = depth;
		this.blocks = new Array();
		this.radius = radius;
		this.center = center;
	}

	public add(key: number, value: Vector3): boolean {
		if (!this.in(value)) {
			this.remove(key);
			return false;
		}

		// if (this.entries.size > 1) { this.split() }
		this.entries.set(key, value);
		// if (this.depth == 0 || this.entries.size == 1) { return true; }
		// if (this.split()) {
		// 	for (let k of this.entries.keys()) {
		// 		let v = this.entries.get(k) as Vector3;
		// 		for (let j = 0; j < 8; j++) {
		// 			this.blocks[j].add(k, v);
		// 		}
		// 	}
		// 	return true;
		// }
		// for (let i = 0; i < 8; i++) {
		// 	this.blocks[i].add(key, value);
		// }
		return true;
	}

	public remove(key: number): boolean {
		if (!this.entries.has(key)) { return false; }
		this.entries.delete(key);
		let br: boolean = true;
		for (let i = 0; i < this.blocks.length; i++) {
			br = br && this.blocks[i].remove(key);
		}
		if (br || this.entries.size == 1) {
			this.blocks = [];
		}
		return this.entries.size == 0;
	}

	public split(): boolean {
		if (this.depth == 0 || this.blocks.length > 0) { return false; }
		const radius = this.radius * 0.5;
		this.blocks.push(
			new OctreeBlock(this.depth - 1,
				new Vector3(
					this.center.x - radius,
					this.center.y - radius,
					this.center.z - radius,
				), radius));
		this.blocks.push(
			new OctreeBlock(this.depth - 1,
				new Vector3(
					this.center.x - radius,
					this.center.y - radius,
					this.center.z + radius,
				), radius));
		this.blocks.push(
			new OctreeBlock(this.depth - 1,
				new Vector3(
					this.center.x + radius,
					this.center.y - radius,
					this.center.z + radius,
				), radius));
		this.blocks.push(
			new OctreeBlock(this.depth - 1,
				new Vector3(
					this.center.x + radius,
					this.center.y - radius,
					this.center.z - radius,
				), radius));
		this.blocks.push(
			new OctreeBlock(this.depth - 1,
				new Vector3(
					this.center.x - radius,
					this.center.y + radius,
					this.center.z - radius,
				), radius));
		this.blocks.push(
			new OctreeBlock(this.depth - 1,
				new Vector3(
					this.center.x - radius,
					this.center.y + radius,
					this.center.z + radius,
				), radius));
		this.blocks.push(
			new OctreeBlock(this.depth - 1,
				new Vector3(
					this.center.x + radius,
					this.center.y + radius,
					this.center.z + radius,
				), radius));
		this.blocks.push(
			new OctreeBlock(this.depth - 1,
				new Vector3(
					this.center.x + radius,
					this.center.y + radius,
					this.center.z - radius,
				), radius));
		return true;
	}

	public in(v: Vector3): boolean {
		const b = Math.abs(v.z - this.center.z) < this.radius &&
			Math.abs(v.y - this.center.y) < this.radius &&
			Math.abs(v.z - this.center.z) < this.radius;
		console.log('inn', b);
		return b;
	}

	public print() {
		if (this.blocks.length > 0) {
			for (let i = 0; i < 8; i++) {
				this.blocks[i].print();
			}
		} else if (this.entries.size > 0) {
			console.log(`depth: ${this.depth}::
				-center: ${this.center}, radius: ${this.radius}
				-entries: ${this.entries.size}`)
		}
	}

	public printRoot() {
		console.log(this.entries);
	}

}

// class Octree {
// 	private entries:
// }
