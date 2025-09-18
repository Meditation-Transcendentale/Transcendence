

import { Camera, Color3, Color4, LoadAssetContainerAsync, Matrix, Mesh, RenderTargetTexture, Scene, ShaderMaterial, Vector3 } from "@babylonImport";
import { Tile } from "./Tile";
import { GrassShader } from "./Shader/Shader";
import "./Shader/depthShaders";



type _thinInstancesOptions = {
	density: number; //number of blade for 1x1 square
	stiffness: number; //how much wind is effectiv 0.0: not 1.0: full
	rotation: number; //blade rotation percent of M_PI * 0.5
	size: number; //min size a blade can get
	scale: Vector3; //scaling of the blade x y z
};

const optionsA: _thinInstancesOptions = {
	density: 5,
	stiffness: 0.4,
	rotation: 0.2,
	size: 0.5,
	scale: new Vector3(1.5, 2.5, 1.5)
};

const optionsB: _thinInstancesOptions = {
	density: optionsA.density * 0.8,
	stiffness: 0.4,
	rotation: 0.2,
	size: 1,
	scale: new Vector3(2., 2.2, 2.)
};



export class Grass {
	public scene: Scene;
	public _tiles: Tile[];

	private _size: number;

	private _grassShader!: GrassShader;
	public grassDepthMaterial: ShaderMaterial;


	private meshA!: Mesh;
	private meshB!: Mesh;

	public COLOR_A = new Color3(0.1, 0.1, 0.1);
	public COLOR_B = new Color3(0.9, 0.9, 0.9);

	private _pastTime = 0.0;
	public cursor!: Vector3;

	public depth = 50.;
	private enabled: boolean;
	private reduced: boolean;

	constructor(scene: Scene, size: number) {
		this._size = size;
		this._tiles = [];
		this.scene = scene;

		this.enabled = true;
		this.reduced = false;

		this.grassDepthMaterial = new ShaderMaterial("grassDepth", scene, "grassDepth", {
			attributes: ["position", "world0", "world1", "world2", "world3", "baseColor"],
			uniforms: ["world", "viewProjection", "depthValues", "time"],
			samplers: ["textureSampler"]
		})
		this.grassDepthMaterial.backFaceCulling = false;

	}

	public async init() {
		await this.loadAssests(this.scene);

		this.setThinInstances(this.meshA, this._size, this._size, optionsA);
		this.setThinInstances(this.meshB, this._size * 2, this._size * 2, optionsB);

		this._grassShader = new GrassShader("grass", this.scene);

		/////////////////////////////
		//
		/////////////////////////////
		const o = new Vector3(0, -0.5, 0);
		const size = this._size * 0.5
		this._tiles.push(new Tile(this.meshA, this._grassShader, o.add(new Vector3(size, -this.depth, size)), this._size, this._size));
		this._tiles.push(new Tile(this.meshA, this._grassShader, o.add(new Vector3(-size, -this.depth, size)), this._size, this._size));
		this._tiles.push(new Tile(this.meshA, this._grassShader, o.add(new Vector3(size, -this.depth, -size)), this._size, this._size));
		this._tiles.push(new Tile(this.meshA, this._grassShader, o.add(new Vector3(-size, -this.depth, -size)), this._size, this._size));

		this._tiles.push(new Tile(this.meshB, this._grassShader, o.add(new Vector3(size * 4, -this.depth, 0)), this._size * 2, this._size * 2));
		this._tiles.push(new Tile(this.meshB, this._grassShader, o.add(new Vector3(-size * 4, -this.depth, 0)), this._size * 2, this._size * 2));
		this._tiles.push(new Tile(this.meshB, this._grassShader, o.add(new Vector3(size * 4, -this.depth, -size * 4)), this._size * 2, this._size * 2));
		this._tiles.push(new Tile(this.meshB, this._grassShader, o.add(new Vector3(-size * 4, -this.depth, -size * 4)), this._size * 2, this._size * 2));
		this._tiles.push(new Tile(this.meshB, this._grassShader, o.add(new Vector3(0, -this.depth, -size * 4)), this._size * 2, this._size * 2));
		this._tiles.push(new Tile(this.meshB, this._grassShader, o.add(new Vector3(size * 4, -this.depth, -size * 8)), this._size * 2, this._size * 2));
		this._tiles.push(new Tile(this.meshB, this._grassShader, o.add(new Vector3(-size * 4, -this.depth, -size * 8)), this._size * 2, this._size * 2));
		this._tiles.push(new Tile(this.meshB, this._grassShader, o.add(new Vector3(0, -this.depth, -size * 8)), this._size * 2, this._size * 2));

	}

	public update(time: number, camera: Camera, texture: RenderTargetTexture) {
		if (!this.enabled) { return; }
		this._grassShader.setFloat("time", time);
		this._grassShader.setFloat("oldTime", this._pastTime);
		this._grassShader.setTexture("textureSampler", texture);

		this._pastTime = time;

		this.grassDepthMaterial.setFloat("time", time);
		this.grassDepthMaterial.setTexture("textureSampler", texture);


		// camera._updateFrustumPlanes();
		// for (let i = 0; i < this._tiles.length; i++) {
		// 	this._tiles[i].isInFrustrum(camera._frustumPlanes);
		// }
	}

	public getMesh(): Mesh {
		return this._tiles[0]._mesh;
	}

	private async loadAssests(scene: Scene) {
		const loaded = await LoadAssetContainerAsync("/assets/grassLOD.glb", scene);
		this.meshA = loaded.meshes[2] as Mesh;
		this.meshA.setEnabled(false);
		this.meshA.name = 'nearGrass';
		this.meshA.doNotSyncBoundingInfo = true;
		this.meshA.alwaysSelectAsActiveMesh = true;

		loaded.meshes[1].setEnabled(false);
		loaded.meshes[3].setEnabled(false);


		this.meshB = loaded.meshes[4] as Mesh;
		this.meshA.setEnabled(false);
		this.meshB.setEnabled(false);

		this.scene.addMesh(this.meshA);
		this.scene.addMesh(this.meshB);
	}

	private setThinInstances(mesh: Mesh, width: number, depth: number, options: _thinInstancesOptions) {
		const NUM_X = Math.floor(options.density * width);
		const NUM_Z = Math.floor(options.density * depth);
		const CLUSTER_X = width / NUM_X;
		const CLUSTER_Z = depth / NUM_Z;


		const bufferMatrix = new Float32Array(16 * NUM_X * NUM_Z);
		const bufferColor = new Float32Array(4 * NUM_X * NUM_Z);

		for (let i = 0; i < NUM_X * NUM_Z; i++) {
			const offsetX = (Math.random() - 0.5) * CLUSTER_X;
			const offsetZ = (Math.random() - 0.5) * CLUSTER_Z;

			const posX = ((i % NUM_X) + 0.5) * CLUSTER_X - width * 0.5 + offsetX;
			const posZ = (Math.floor(i / NUM_X) + 0.5) * CLUSTER_Z - depth * 0.5 + offsetZ;

			const size = Math.random() * (1 - options.size) + options.size;
			const rotation = Math.random() * Math.PI * 2.;

			const matR = Matrix.RotationY(0);
			const matS = Matrix.Scaling(
				size * options.scale.x,
				size * options.scale.y,
				size * options.scale.z
			);
			const matT = Matrix.Translation(
				posX,
				0.5,
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

			matrix.copyToArray(bufferMatrix, i * 16);
			color.toArray(bufferColor, i * 4);
		}
		mesh.thinInstanceSetBuffer('matrix', bufferMatrix, 16, true);
		mesh.thinInstanceSetBuffer('baseColor', bufferColor, 4, true);
	}

	public reduceGrass(status: boolean) {
		this.reduced = status;
		for (let i = 4; i < this._tiles.length; i++) {
			this._tiles[i]._mesh.setEnabled(!status);
		}
	}

	public setEnable(status: boolean) {
		this.enabled = status;
		const n = this.reduced ? 4 : this._tiles.length;
		for (let i = 0; i < n; i++) {
			this._tiles[i]._mesh.setEnabled(status);
		}
	}

	public dispose() {
		this._tiles.forEach((tile) => {
			tile.dispose();
		});

		this._grassShader.dispose();
		this.meshA.dispose();
		this.meshB.dispose();
		this.grassDepthMaterial.dispose();
	}
}
