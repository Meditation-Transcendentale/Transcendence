import {
	Color3,
	Matrix,
	Mesh,
	MeshBuilder,
	PBRSpecularGlossinessMaterial,
	Scene,
	Vector3,
} from "@babylonjs/core";

interface options {
	radius?: number;
	quantity?: number;
	maxSize?: number;
	minSize?: number;
	rotation?: number;
}

interface optionsCubeCluster {
	radius: number;
	quantity: number;
	maxSize: number;
	minSize: number;
	rotation: number;
}

export class CubeCluster {
	public cluster: Mesh;
	private bufferMatrix: Matrix[];
	private bufferMatrixWrite: Float32Array;
	private rotationsSpeed: Float32Array;
	private boundingBox: Vector3[];

	private options: optionsCubeCluster;
	private scene: Scene;

	constructor(scene: Scene, options?: options) {
		this.options = {
			radius: options?.radius ? options.radius : 2.5,
			quantity: options?.quantity ? options.quantity : 1000,
			maxSize: options?.maxSize ? options.maxSize : 0.5,
			minSize: options?.minSize ? options.minSize : 0.1,
			rotation: options?.rotation ? options.rotation : 0.05
		}

		this.scene = scene;

		this.cluster = MeshBuilder.CreateBox("cube", { size: 1 }, scene);

		const pbr = new PBRSpecularGlossinessMaterial("pbr", scene);
		pbr.diffuseColor = Color3.Black();
		pbr.specularColor = new Color3(0.7, 0.4, 0.7);
		pbr.glossiness = 0.4;
		this.cluster.material = pbr;

		this.bufferMatrix = [];
		this.bufferMatrixWrite = new Float32Array(16 * this.options.quantity);
		this.rotationsSpeed = new Float32Array(this.options.quantity);

		this.boundingBox = [];
		//this.boundingBox.push(new Vector3(this.options.radius, this.options.radius * 2, this.options.radius));
		//this.boundingBox.push(new Vector3(this.options.radius, -this.options.radius * 2, this.options.radius));
		//this.boundingBox.push(new Vector3(this.options.radius, this.options.radius * 2, -this.options.radius));
		//this.boundingBox.push(new Vector3(this.options.radius, -this.options.radius * 2, -this.options.radius));
		//this.boundingBox.push(new Vector3(-this.options.radius, this.options.radius * 2, this.options.radius));
		//this.boundingBox.push(new Vector3(-this.options.radius, -this.options.radius * 2, this.options.radius));
		//this.boundingBox.push(new Vector3(-this.options.radius, this.options.radius * 2, -this.options.radius));
		//this.boundingBox.push(new Vector3(-this.options.radius, -this.options.radius * 2, -this.options.radius));

		this.boundingBox.push(new Vector3(this.options.radius * 0.5, this.options.radius * 0.9, this.options.radius * 0.5));
		this.boundingBox.push(new Vector3(this.options.radius * 0.5, -this.options.radius * 0.9, this.options.radius * 0.5));
		this.boundingBox.push(new Vector3(this.options.radius * 0.5, this.options.radius * 0.9, -this.options.radius * 0.5));
		this.boundingBox.push(new Vector3(this.options.radius * 0.5, -this.options.radius * 0.9, -this.options.radius * 0.5));
		this.boundingBox.push(new Vector3(-this.options.radius * 0.5, this.options.radius * 0.9, this.options.radius * 0.5));
		this.boundingBox.push(new Vector3(-this.options.radius * 0.5, -this.options.radius * 0.9, this.options.radius * 0.5));
		this.boundingBox.push(new Vector3(-this.options.radius * 0.5, this.options.radius * 0.9, -this.options.radius * 0.5));
		this.boundingBox.push(new Vector3(-this.options.radius * 0.5, -this.options.radius * 0.9, -this.options.radius * 0.5));

	}

	public async init() {
		for (let i = 0; i < this.options.quantity; i++) {
			const r = betaRandom() * this.options.radius;
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
				pxyz[0],
				pxyz[1],
				pxyz[2]
			)

			const matrix = matS.multiply(matT);
			this.bufferMatrix.push(matrix);
			this.rotationsSpeed[i] = Math.max(Math.random() * r * this.options.rotation, 0.01);
			matrix.copyToArray(this.bufferMatrixWrite, i * 16);
		}

		this.cluster.thinInstanceSetBuffer('matrix', this.bufferMatrixWrite, 16, true);
	}

	public update(time: number): void {
		for (let i = 0; i < this.bufferMatrix.length; i++) {
			this.bufferMatrix[i].multiplyToRef(Matrix.RotationY(time * this.rotationsSpeed[i] * Math.PI * 2), this.bufferMatrix[i]);
			this.bufferMatrix[i].toArray(this.bufferMatrixWrite, i * 16);
		}
		this.cluster.thinInstanceSetBuffer('matrix', this.bufferMatrixWrite, 16, true);
	}

	public getSPC(): Float32Array {
		const id = Matrix.Identity();
		const scene = this.scene.getTransformMatrix();
		const viewport = this.scene.activeCamera!.viewport;

		const result = new Float32Array(4);
		result[0] = 2;
		result[1] = 2;
		result[2] = -1;
		result[3] = -1;
		for (let i = 0; i < this.boundingBox.length; i++) {
			const p = Vector3.Project(
				this.boundingBox[i],
				id,
				scene,
				viewport
			);
			result[0] = Math.min(result[0], p.x);
			result[1] = Math.min(result[1], p.y);
			result[2] = Math.max(result[2], p.x);
			result[3] = Math.max(result[3], p.y);
		}
		return result;
	}

}



function betaRandom(): number {
	const unif = Math.random();
	return Math.pow(Math.sin(unif * Math.PI * 0.5), 2);
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

