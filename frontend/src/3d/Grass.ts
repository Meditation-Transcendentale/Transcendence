
// import { Tile } from "./Tile";

import { Camera, Color3, Color4, CustomMaterial, LoadAssetContainerAsync, Matrix, Mesh, Scene, ShaderMaterial, Vector3 } from "@babylonImport";
import { Tile } from "./Tile";
import { GrassShader } from "./Shader";



type _thinInstancesOptions = {
	density: number; //number of blade for 1x1 square
	stiffness: number; //how much wind is effectiv 0.0: not 1.0: full
	rotation: number; //blade rotation percent of M_PI * 0.5
	size: number; //min size a blade can get
	scale: Vector3; //scaling of the blade x y z
};

const _nearOptions: _thinInstancesOptions = {
	density: 20,
	stiffness: 0.4,
	rotation: 0.2,
	size: 0.4,
	scale: new Vector3(0.2, .2, 0.2)
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
	private _tiles: Tile[];

	private _size: number;

	private _grassShader!: GrassShader;

	private _nearMesh!: Mesh;
	// private _midMeshR!: Mesh;
	// private _midMeshR2!: Mesh;
	// private _midMeshS!: Mesh;
	// private _farMesh!: Mesh;
	// private _far2Mesh!: Mesh;

	//private _noiseTex!: Texture;

	public COLOR_A = new Color3(0.1, 0.1, 0.1);
	public COLOR_B = new Color3(0.9, 0.9, 0.9);

	private _pastTime = 0.0;
	public origins!: number[];

	constructor(size: number) {
		this._size = size;
		this._tiles = [];

	}

	public async init(scene: Scene, origins: number[]) {
		await this.loadAssests(scene);

		this.origins = origins;

		this.setThinInstances(this._nearMesh, this._size, this._size, _nearOptions);
		// this.setThinInstances(this._midMeshR, this._size, this._size * 2, _midOptions);
		// this.setThinInstances(this._midMeshR2, this._size * 2, this._size, _midOptions);
		// this.setThinInstances(this._midMeshS, this._size * 2, this._size * 2, _midOptions);
		// this.setThinInstances(this._farMesh, this._size * 5, this._size * 5, _farOptions);
		// this.setThinInstances(this._far2Mesh, this._size * 15, this._size * 15, _far2Options);


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

		this._grassShader = new GrassShader("grass", scene);
		this._grassShader.specularPower = 64;

		this._grassShader.backFaceCulling = false;
		// this._grassShader.needDepthPrePass = false;
		//this._grassShader.setTexture("noise", this._noiseTex);

		this._tiles.push(new Tile(this._nearMesh, this._grassShader, new Vector3(0, 0, -10), this._size, this._size));


		// for (let i = -1; i < 2; i++) {
		// 	for (let j = -1; j < 2; j++) {
		// 		if (i != 0 || j != 0) {
		// 			this._tiles.push(new Tile(
		// 				(i != 0 && j != 0 ? this._midMeshS : (i == 0 ? this._midMeshR : this._midMeshR2)),
		// 				this._grassShader,
		// 				new Vector3(
		// 					i * this._size * 1.5,
		// 					0,
		// 					j * this._size * 1.5
		// 				),
		// 				this._size * (i != 0 ? 2 : 1),
		// 				this._size * (j != 0 ? 2 : 1)));
		// 			this._tiles.push(new Tile(
		// 				this._farMesh,
		// 				this._grassShader,
		// 				new Vector3(
		// 					i * this._size * 5.0,
		// 					0,
		// 					j * this._size * 5.0
		// 				),
		// 				this._size * 5,
		// 				this._size * 5));
		// 			this._tiles.push(new Tile(
		// 				this._far2Mesh,
		// 				this._grassShader,
		// 				new Vector3(
		// 					i * this._size * 15.0,
		// 					0,
		// 					j * this._size * 15.0
		// 				),
		// 				this._size * 15,
		// 				this._size * 15));
		//
		// 		}
		// 	}
		//}

		//scene.onBeforeRenderObservable.add(() => {
		//			});
	}

	public update(time: number, camera: Camera) {
		this._grassShader.setFloat("time", time);
		this._grassShader.setFloat("oldTime", this._pastTime);
		this._grassShader.setFloatArray3("origins", this.origins);
		// this._grassShader.setVector3("vEyePosition", camera.position);

		this._pastTime = time;

		// camera._updateFrustumPlanes();
		// for (let i = 0; i < this._tiles.length; i++) {
		// 	this._tiles[i].isInFrustrum(camera._frustumPlanes);
		// }
	}

	private async loadAssests(scene: Scene) {
		const loaded = await LoadAssetContainerAsync("/assets/grass.glb", scene);
		this._nearMesh = loaded.meshes[1] as Mesh;
		this._nearMesh.setEnabled(false);
		console.log(this._nearMesh);
		this._nearMesh.name = 'nearGrass';
		this._nearMesh.optimizeIndices();
		// this._nearMesh.position.set(0, 1, -10);
		loaded.meshes.forEach((mesh) => {
			// mesh.setEnabled(true);
		})

		loaded.addAllToScene();
		// this._nearMesh.setEnabled(true);
	}

	private setThinInstances(mesh: Mesh, width: number, depth: number, options: _thinInstancesOptions) {
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
			const rotation = Math.random() * Math.PI * 0.5 - Math.PI * 0.25;

			const matR = Matrix.RotationY(0);
			const matS = Matrix.Scaling(
				size * options.scale.x,
				options.scale.y,
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
		this._nearMesh.dispose();
		// this._farMesh.dispose();
		// this._midMeshR.dispose();
		// this._midMeshR2.dispose();
		// this._midMeshS.dispose();
	}
}
