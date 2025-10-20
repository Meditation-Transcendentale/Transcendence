import { Camera, Color3, Color4, LoadAssetContainerAsync, Matrix, Mesh, RenderTargetTexture, Scene, ShaderMaterial, Vector2, Vector3 } from "../babylon";
import { Tile } from "./Tile";
import { GrassMaterial } from "./Shader/GrassMaterial";
import "./Shader/depthShaders";
import { sceneManager } from "./SceneManager";
import { Assets } from "./Assets";



type _thinInstancesOptions = {
	density: number; //number of blade for 1x1 square
	stiffness: number; //how much wind is effectiv 0.0: not 1.0: full
	rotation: number; //blade rotation percent of M_PI * 0.5
	size: number; //min size a blade can get
	scale: Vector3; //scaling of the blade x y z
};

const optionsHigh: _thinInstancesOptions = {
	density: 5,
	stiffness: 0.4,
	rotation: 0.2,
	size: 0.5,
	scale: new Vector3(1.5, 2.5, 1.5)
};

const optionsLow: _thinInstancesOptions = {
	density: optionsHigh.density * 0.8,
	stiffness: 0.4,
	rotation: 0.2,
	size: 1,
	scale: optionsHigh.scale
};



export class Grass {
	public assets: Assets;
	public tiles: Tile[];

	private size = 20;

	public COLOR_A = new Color3(0.1, 0.1, 0.1);
	public COLOR_B = new Color3(0.9, 0.9, 0.9);

	private reduced: boolean;

	private _enable: boolean;

	constructor(assets: Assets) {
		this.assets = assets;
		this.tiles = [];

		this._enable = false;
		this.reduced = false;


		this.assets.grassHighMesh.doNotSyncBoundingInfo = true;
		this.assets.grassLowMesh.doNotSyncBoundingInfo = true;
		// this.grassHigh.alwaysSelectAsActiveMesh = true;
		// this.grassLow.alwaysSelectAsActiveMesh = true;
		//

		this.setThinInstances(this.assets.grassHighMesh, this.size * 1.5, this.size, optionsHigh);
		this.setThinInstances(this.assets.grassLowMesh, this.size * 2, this.size * 2, optionsLow);

		const o = new Vector3(0, -0.5, 0);
		const size = this.size * 0.5
		this.tiles.push(new Tile(this.assets.grassHighMesh, this.assets.grassMaterial, o.add(new Vector3(size * 1.5, 0, size)), this.size, this.size));
		this.tiles.push(new Tile(this.assets.grassHighMesh, this.assets.grassMaterial, o.add(new Vector3(-size * 1.5, 0, size)), this.size, this.size));
		this.tiles.push(new Tile(this.assets.grassHighMesh, this.assets.grassMaterial, o.add(new Vector3(size * 1.5, 0, -size)), this.size, this.size));
		this.tiles.push(new Tile(this.assets.grassHighMesh, this.assets.grassMaterial, o.add(new Vector3(-size * 1.5, 0, -size)), this.size, this.size));

		this.tiles.push(new Tile(this.assets.grassLowMesh, this.assets.grassMaterial, o.add(new Vector3(size * 4, 0, 0)), this.size * 2, this.size * 2));
		this.tiles.push(new Tile(this.assets.grassLowMesh, this.assets.grassMaterial, o.add(new Vector3(-size * 4, 0, 0)), this.size * 2, this.size * 2));
		this.tiles.push(new Tile(this.assets.grassLowMesh, this.assets.grassMaterial, o.add(new Vector3(0, 0, -size * 4)), this.size * 2, this.size * 2));
		this.tiles.push(new Tile(this.assets.grassLowMesh, this.assets.grassMaterial, o.add(new Vector3(0, 0, size * 4)), this.size * 2, this.size * 2));

		this.reduceGrass(true);
	}


	public update(time: number) {
		if (!this._enable) { return; }
		this.assets.grassMaterial.setTexture("textureSampler", this.assets.ballGrassTextureB);
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
		for (let i = 4; i < this.tiles.length; i++) {
			this.tiles[i].enable = !status;
		}
	}

	public set enable(value: boolean) {
		this._enable = value;
		const n = this.reduced ? 4 : this.tiles.length;
		for (let i = 0; i < n; i++) {
			this.tiles[i].enable = value;
		}
	}

	public dispose() {
		this.tiles.forEach((tile) => {
			tile.dispose();
		});

	}
}
