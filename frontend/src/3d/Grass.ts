
// import { Tile } from "./Tile";

import { Camera, Color3, Color4, LoadAssetContainerAsync, Matrix, Mesh, ProceduralTexture, Scene, Vector3 } from "@babylonImport";
import { Tile } from "./Tile";
import { GrassShader } from "./Shader/Shader";



type _thinInstancesOptions = {
	density: number; //number of blade for 1x1 square
	stiffness: number; //how much wind is effectiv 0.0: not 1.0: full
	rotation: number; //blade rotation percent of M_PI * 0.5
	size: number; //min size a blade can get
	scale: Vector3; //scaling of the blade x y z
};

const optionsA: _thinInstancesOptions = {
	density: 4,
	stiffness: 0.4,
	rotation: 0.2,
	size: 0.5,
	scale: new Vector3(1.5, 1.5, 1.5)
};

const optionsB: _thinInstancesOptions = {
	density: optionsA.density * 1,
	stiffness: 0.4,
	rotation: 0.2,
	size: 1,
	scale: new Vector3(1, .8, 1)
};

const optionsC: _thinInstancesOptions = {
	density: optionsA.density * 1,
	stiffness: 0.4,
	rotation: 0.2,
	size: 1,
	scale: new Vector3(1, .8, 1)
};

const optionsD: _thinInstancesOptions = {
	density: optionsA.density * 1,
	stiffness: 0.4,
	rotation: 0.2,
	size: 1,
	scale: new Vector3(1.4, 0.9, 1.4)
};

const optionsE: _thinInstancesOptions = {
	density: optionsA.density * 0.5,
	stiffness: 0.4,
	rotation: 0.2,
	size: 1,
	scale: new Vector3(1.5, 0.9, 1.5)
};

// const _midOptions: _thinInstancesOptions = {
// 	density: 10,
// 	stiffness: 0.4,
// 	rotation: 0.2,
// 	size: 0.7,
// 	scale: new Vector3(0.5, 1.0, 0.5)
// }
//
// const _farOptions: _thinInstancesOptions = {
// 	density: 4,
// 	stiffness: 1.0,
// 	rotation: 0.1,
// 	size: 1.0,
// 	scale: new Vector3(1.5, 1.0, 1.5)
// }

// const _far2Options: _thinInstancesOptions = {
// 	density: 1.5,
// 	stiffness: 1.0,
// 	rotation: 0.0,
// 	size: 1.0,
// 	scale: new Vector3(5.0, 1.0, 5.0)
// }

export class Grass {
	public scene: Scene;
	public _tiles: Tile[];

	private _size: number;

	private _grassShader!: GrassShader;

	private noiseTexture!: ProceduralTexture;

	private meshA!: Mesh;
	private meshB!: Mesh;
	private meshC!: Mesh;
	private meshD!: Mesh;
	private meshD1!: Mesh;
	private meshE!: Mesh;
	//private _noiseTex!: Texture;

	public COLOR_A = new Color3(0.1, 0.1, 0.1);
	public COLOR_B = new Color3(0.9, 0.9, 0.9);

	private _pastTime = 0.0;
	public cursor!: Vector3;

	public depth = 50.;

	constructor(scene: Scene, size: number, cursor: Vector3) {
		this._size = size;
		this._tiles = [];
		this.scene = scene;
		this.cursor = cursor;

	}

	public async init() {
		await this.loadAssests(this.scene);

		this.noiseTexture = new ProceduralTexture("noise", 1024, "WindHeight", this.scene);
		this.noiseTexture.refreshRate = 0;

		this.setThinInstances(this.meshA, this._size, this._size, optionsA);
		//this.setThinInstances(this.meshB, this._size, this._size, optionsB);
		//this.setThinInstances(this.meshC, this._size, this._size, optionsC);
		//this.setThinInstances(this.meshD, this._size * 2, this._size * 2, optionsD);
		//this.setThinInstances(this.meshD1, this._size, this._size, optionsD);
		//this.setThinInstances(this.meshE, this._size * 4, this._size * 4, optionsE);

		console.log("NB GRASS:", this.meshA.thinInstanceCount * 2 + this.meshB.thinInstanceCount * 4 + this.meshC.thinInstanceCount * 6 + this.meshD.thinInstanceCount * 4 + this.meshD1.thinInstanceCount * 4 + this.meshE.thinInstanceCount * 4)


		// this._grassShader = new ShaderMaterial(
		// 	'grass',
		// 	scene,
		// 	'grass',
		// 	{
		// 		attributes: ["position", "uv", 'color', 'normal', "world0", "world1", "world2", "world3"],
		// 		uniforms: ["world", "viewProjection", "vEyePosition", "time", "oldTime"],
		// 		//samplers: ["noise"],
		// 		defines: ["#define INSTANCES", "#define THIN_INSTANCES", "#define INSTANCESCOLOR"]
		// 	}
		// );

		this._grassShader = new GrassShader("grass", this.scene, this.noiseTexture);

		/////////////////////////////
		//
		/////////////////////////////
		const o = new Vector3(0, -0.5, 0);
		const size = this._size * 0.5
		this._tiles.push(new Tile(this.meshA, this._grassShader, o.add(new Vector3(size, -this.depth, size)), this._size, this._size));
		this._tiles.push(new Tile(this.meshA, this._grassShader, o.add(new Vector3(-size, -this.depth, size)), this._size, this._size));
		this._tiles.push(new Tile(this.meshA, this._grassShader, o.add(new Vector3(size, -this.depth, -size)), this._size, this._size));
		this._tiles.push(new Tile(this.meshA, this._grassShader, o.add(new Vector3(-size, -this.depth, -size)), this._size, this._size));


		//this._tiles.push(new Tile(this.meshB, this._grassShader, o.add(new Vector3(size * 3, 0, 0)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshB, this._grassShader, o.add(new Vector3(-size * 3, 0, 0)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshB, this._grassShader, o.add(new Vector3(size, 0, -size * 2)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshB, this._grassShader, o.add(new Vector3(-size, 0, -size * 2)), this._size, this._size));
		////
		////
		//this._tiles.push(new Tile(this.meshC, this._grassShader, o.add(new Vector3(size * 3, 0, -size * 2)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshC, this._grassShader, o.add(new Vector3(-size * 3, 0, -size * 2)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshC, this._grassShader, o.add(new Vector3(size * 5, 0, 0)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshC, this._grassShader, o.add(new Vector3(-size * 5, 0, 0)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshC, this._grassShader, o.add(new Vector3(size * 5, 0, -size * 2)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshC, this._grassShader, o.add(new Vector3(-size * 5, 0, -size * 2)), this._size, this._size));
		//
		//this._tiles.push(new Tile(this.meshD1, this._grassShader, o.add(new Vector3(size * 7, 0, 0)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshD1, this._grassShader, o.add(new Vector3(-size * 7, 0, 0)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshD1, this._grassShader, o.add(new Vector3(size * 7, 0, -size * 2)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshD1, this._grassShader, o.add(new Vector3(-size * 7, 0, -size * 2)), this._size, this._size));
		//
		////
		//this._tiles.push(new Tile(this.meshD, this._grassShader, o.add(new Vector3(size * 2, 0, -size * 5)), this._size * 2, this._size * 2));
		//this._tiles.push(new Tile(this.meshD, this._grassShader, o.add(new Vector3(-size * 2, 0, -size * 5)), this._size * 2, this._size * 2));
		//this._tiles.push(new Tile(this.meshD, this._grassShader, o.add(new Vector3(size * 6, 0, -size * 5)), this._size * 2, this._size * 2));
		//this._tiles.push(new Tile(this.meshD, this._grassShader, o.add(new Vector3(-size * 6, 0, -size * 5)), this._size * 2, this._size * 2));
		//
		//
		//this._tiles.push(new Tile(this.meshE, this._grassShader, o.add(new Vector3(size * 12, 0, -size * 3)), this._size * 4, this._size * 4));
		//this._tiles.push(new Tile(this.meshE, this._grassShader, o.add(new Vector3(-size * 12, 0, -size * 3)), this._size * 4, this._size * 4));
		//this._tiles.push(new Tile(this.meshE, this._grassShader, o.add(new Vector3(size * 4, 0, -size * 11)), this._size * 4, this._size * 4));
		//this._tiles.push(new Tile(this.meshE, this._grassShader, o.add(new Vector3(-size * 4, 0, -size * 11)), this._size * 4, this._size * 4));
		//this._tiles.push(new Tile(this.meshE, this._grassShader, o.add(new Vector3(size * 12, 0, -size * 11)), this._size * 4, this._size * 4));
		//this._tiles.push(new Tile(this.meshE, this._grassShader, o.add(new Vector3(-size * 12, 0, -size * 11)), this._size * 4, this._size * 4));
		////
		////
		//this._tiles.push(new Tile(this.meshA, this._grassShader, o.add(new Vector3(size, 0, 20)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshA, this._grassShader, o.add(new Vector3(-size, 0, 20)), this._size, this._size));
		//
		//this._tiles.push(new Tile(this.meshB, this._grassShader, o.add(new Vector3(size * 3, 0, 20)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshB, this._grassShader, o.add(new Vector3(-size * 3, 0, 20)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshB, this._grassShader, o.add(new Vector3(size, 0, size * 2 + 20)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshB, this._grassShader, o.add(new Vector3(-size, 0, size * 2 + 20)), this._size, this._size));
		////
		////
		//this._tiles.push(new Tile(this.meshC, this._grassShader, o.add(new Vector3(size * 3, 0, 20 + size * 2)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshC, this._grassShader, o.add(new Vector3(-size * 3, 0, 20 + size * 2)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshC, this._grassShader, o.add(new Vector3(size * 5, 0, 20)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshC, this._grassShader, o.add(new Vector3(-size * 5, 0, 20)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshC, this._grassShader, o.add(new Vector3(size * 5, 0, 20 + size * 2)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshC, this._grassShader, o.add(new Vector3(-size * 5, 0, 20 + size * 2)), this._size, this._size));
		//
		//this._tiles.push(new Tile(this.meshD1, this._grassShader, o.add(new Vector3(size * 7, 0, 20)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshD1, this._grassShader, o.add(new Vector3(-size * 7, 0, 20)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshD1, this._grassShader, o.add(new Vector3(size * 7, 0, 20 + size * 2)), this._size, this._size));
		//this._tiles.push(new Tile(this.meshD1, this._grassShader, o.add(new Vector3(-size * 7, 0, 20 + size * 2)), this._size, this._size));
		//
		////
		//this._tiles.push(new Tile(this.meshD, this._grassShader, o.add(new Vector3(size * 2, 0, 20 + size * 5)), this._size * 2, this._size * 2));
		//this._tiles.push(new Tile(this.meshD, this._grassShader, o.add(new Vector3(-size * 2, 0, 20 + size * 5)), this._size * 2, this._size * 2));
		//this._tiles.push(new Tile(this.meshD, this._grassShader, o.add(new Vector3(size * 6, 0, 20 + size * 5)), this._size * 2, this._size * 2));
		//this._tiles.push(new Tile(this.meshD, this._grassShader, o.add(new Vector3(-size * 6, 0, 20 + size * 5)), this._size * 2, this._size * 2));
		//
		//this._tiles.push(new Tile(this.meshE, this._grassShader, o.add(new Vector3(size * 12, 0, 20 + size * 3)), this._size * 4, this._size * 4));
		//this._tiles.push(new Tile(this.meshE, this._grassShader, o.add(new Vector3(-size * 12, 0, 20 + size * 3)), this._size * 4, this._size * 4));
		//this._tiles.push(new Tile(this.meshE, this._grassShader, o.add(new Vector3(size * 4, 0, 20 + size * 11)), this._size * 4, this._size * 4));
		//this._tiles.push(new Tile(this.meshE, this._grassShader, o.add(new Vector3(-size * 4, 0, 20 + size * 11)), this._size * 4, this._size * 4));
		//this._tiles.push(new Tile(this.meshE, this._grassShader, o.add(new Vector3(size * 12, 0, 20 + size * 11)), this._size * 4, this._size * 4));
		//this._tiles.push(new Tile(this.meshE, this._grassShader, o.add(new Vector3(-size * 12, 0, 20 + size * 11)), this._size * 4, this._size * 4));
		//


	}

	public update(time: number, camera: Camera) {
		this._grassShader.setFloat("time", time);
		this._grassShader.setFloat("oldTime", this._pastTime);
		this._grassShader.setVec3("origin", this.cursor);
		// this._grassShader.setVector3("vEyePosition", camera.position);

		this._pastTime = time;


		camera._updateFrustumPlanes();
		for (let i = 0; i < this._tiles.length; i++) {
			this._tiles[i].isInFrustrum(camera._frustumPlanes);
		}
	}

	public getMesh(): Mesh {
		return this._tiles[0]._mesh;
	}

	private async loadAssests(scene: Scene) {
		const loaded = await LoadAssetContainerAsync("/assets/grassLOD.glb", scene);
		this.meshA = loaded.meshes[2] as Mesh;
		this.meshA.setEnabled(false);
		console.log(this.meshA);
		this.meshA.name = 'nearGrass';
		this.meshA.doNotSyncBoundingInfo = true;
		this.meshA.alwaysSelectAsActiveMesh = true;

		console.log("VERT:", this.meshA.getTotalIndices());
		// loaded.meshes[0].setEnabled(false);
		//
		loaded.meshes[1].setEnabled(false);
		loaded.meshes[3].setEnabled(false);


		this.meshD = loaded.meshes[4] as Mesh;
		//this.meshB = loaded.meshes[2] as Mesh;

		//this.meshC = loaded.meshes[3] as Mesh;
		this.meshC = this.meshD.clone();
		this.meshB = this.meshD.clone();
		this.meshD1 = this.meshD.clone();
		this.meshE = this.meshD.clone();

		this.meshD1.makeGeometryUnique();
		this.meshB.makeGeometryUnique();
		this.meshC.makeGeometryUnique();
		this.meshE.makeGeometryUnique();
		this.meshA.setEnabled(false);
		this.meshB.setEnabled(false);
		this.meshC.setEnabled(false);
		this.meshD.setEnabled(false);
		this.meshD1.setEnabled(false);
		this.meshE.setEnabled(false);
		// this.meshA.position.set(0, 1, -10);
		loaded.meshes.forEach((mesh) => {
			// mesh.setEnabled(true);
		})

		loaded.addAllToScene();
		// this.meshA.setEnabled(true);
	}

	private setThinInstances(mesh: Mesh, width: number, depth: number, options: _thinInstancesOptions) {
		const NUM_X = Math.floor(options.density * width);
		const NUM_Z = Math.floor(options.density * depth);
		const CLUSTER_X = width / NUM_X;
		const CLUSTER_Z = depth / NUM_Z;


		const bufferMatrix = new Float32Array(16 * NUM_X * NUM_Z);
		const bufferColor = new Float32Array(4 * NUM_X * NUM_Z);

		//const c = Color3.Random();
		console.log(NUM_X, NUM_Z, CLUSTER_Z, CLUSTER_X);

		for (let i = 0; i < NUM_X * NUM_Z; i++) {
			const offsetX = (Math.random() - 0.5) * CLUSTER_X;
			const offsetZ = (Math.random() - 0.5) * CLUSTER_Z;

			const posX = ((i % NUM_X) + 0.5) * CLUSTER_X - width * 0.5 + offsetX;
			const posZ = (Math.floor(i / NUM_X) + 0.5) * CLUSTER_Z - depth * 0.5 + offsetZ;

			const size = Math.random() * (1 - options.size) + options.size;
			// const rotation = Math.random() * Math.PI * 0.5 - Math.PI * 0.25;
			const rotation = Math.random() * Math.PI * 2.;

			const matR = Matrix.RotationY(0);
			const matS = Matrix.Scaling(
				size * options.scale.x,
				size * options.scale.y,
				size * options.scale.z
			);
			const matT = Matrix.Translation(
				posX,
				0,
				posZ
			);

			const matrix = matR.multiply(matS.multiply(matT));

			const stiffness = Math.random() * (1 - options.stiffness) + options.stiffness;
			const color = Color4.FromColor3(Color3.Lerp(
				this.COLOR_A,
				this.COLOR_B,
				Math.random()
			), stiffness);
			color.r = rotation;
			//const color = Color4.FromColor3(this.COLOR_A, stiffness);


			matrix.copyToArray(bufferMatrix, i * 16);
			color.toArray(bufferColor, i * 4);
		}

		mesh.thinInstanceSetBuffer('matrix', bufferMatrix, 16, true);
		mesh.thinInstanceSetBuffer('baseColor', bufferColor, 4, true);
	}

	private setThinInstances2(mesh: Mesh, width: number, depth: number, options: _thinInstancesOptions) {
		const NUM_X = options.density * width;
		const NUM_Z = options.density * depth;
		const CLUSTER_X = width / NUM_X;
		const CLUSTER_Z = depth / NUM_Z;


		const bufferMatrix = new Float32Array(16 * NUM_X * NUM_Z);
		const bufferColor = new Float32Array(4 * NUM_X * NUM_Z);

		//const c = Color3.Random();
		console.log(NUM_X, NUM_Z, CLUSTER_Z, CLUSTER_X);

		for (let i = 0; i < NUM_X * NUM_Z; i++) {
			const offsetX = (Math.random() - 0.5) * CLUSTER_X;
			const offsetZ = (Math.random() - 0.5) * CLUSTER_Z;

			const posX = ((i % NUM_X) + 0.5) * CLUSTER_X - width * 0.5 + offsetX;
			const posZ = (Math.floor(i / NUM_X) + 0.5) * CLUSTER_Z - depth * 0.5 + offsetZ;

			const size = Math.random() * (1 - options.size) + options.size;
			// const rotation = Math.random() * Math.PI * 0.5 - Math.PI * 0.25;
			const rotation = Math.random() * Math.PI * 2.;

			const matR = Matrix.RotationY(0);
			const matS = Matrix.Scaling(
				size * options.scale.x,
				size * options.scale.y,
				size * options.scale.z
			);
			const matT = Matrix.Translation(
				posX,
				0,
				posZ
			);

			const matrix = matR.multiply(matS.multiply(matT));

			const stiffness = Math.random() * (1 - options.stiffness) + options.stiffness;
			const color = Color4.FromColor3(Color3.Lerp(
				this.COLOR_A,
				this.COLOR_B,
				Math.random()
			), stiffness);
			color.r = rotation;
			//const color = Color4.FromColor3(this.COLOR_A, stiffness);


			matrix.copyToArray(bufferMatrix, i * 16);
			color.toArray(bufferColor, i * 4);
		}

		mesh.thinInstanceSetBuffer('matrix', bufferMatrix, 16, true);
		mesh.thinInstanceSetBuffer('baseColor', bufferColor, 4, true);
	}


	public dispose() {
		this._tiles.forEach((tile) => {
			tile.dispose();
		});

		this._grassShader.dispose();
		this.meshA.dispose();
		// this._farMesh.dispose();
		// this._midMeshR.dispose();
		// this._midMeshR2.dispose();
		// this._midMeshS.dispose();
	}
}
