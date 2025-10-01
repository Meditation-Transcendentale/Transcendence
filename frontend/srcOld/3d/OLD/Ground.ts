import { Camera, Color3, Mesh, MeshBuilder, Scene, Vector3 } from "@babylonImport";
import { PuddleMaterial } from "./Shader";

export class Puddle {
	private mesh!: Mesh;
	private material!: PuddleMaterial;
	private scene: Scene;

	public origins!: number[];
	private index = 0;
	private width: number;

	private numOrigin = 1;
	private rayO!: Vector3;
	private lastO = { 'x': 0, 'z': 0, 't': 0 };
	private deltaTime = 0.02;
	private deltaPos = 0.1;
	private change = false;
	public origin: Vector3;
	public originGrass: Vector3;

	constructor(scene: Scene, width: number, subdivision: number) {

		this.width = width;
		this.scene = scene;

		this.mesh = MeshBuilder.CreateGround("ground",
			{
				width: this.width,
				height: this.width,
				subdivisions: subdivision,
			}, scene);

		this.mesh.position.z = -25;
		this.mesh.position.y = 0;

		this.origin = new Vector3();
		this.originGrass = new Vector3();



		//const g = MeshBuilder.CreateDisc("ground", { radius: 350, tessellation: 20 }, scene);
		//g.rotation.x = Math.PI * 0.5;
		//g.optimizeIndices();


	}

	public init() {
		this.initOrigins();


		this.material = new PuddleMaterial("puddle", this.scene, this.origins);
		this.material.diffuseColor = new Color3(.00, .00, .00);
		this.material.maxSimultaneousLights = 8;
		//this.meshes[0].visibility = 0.9999;
		this.material.specularPower = 16;
		this.material.specularColor = new Color3(0., 0., 0.);

		this.mesh.material = this.material;

		// this.mesh.receiveShadows = true;
		// this.material.wireframe = true;

		this.rayO = (this.scene.activeCamera as Camera).position;

		window.addEventListener("mousemove", (ev) => {
			const ray = this.scene.createPickingRay(ev.clientX, ev.clientY).direction;
			let delta = Math.abs(this.rayO.y - 0.5) / ray.y;
			//let dd = Math.abs(this.rayO.y - 0.5) / ray.y;

			this.origin.x = this.rayO.x - ray.x * delta;
			this.origin.y = 0;
			this.origin.z = this.rayO.z - ray.z * delta + 20;

			this.originGrass.x = this.rayO.x - ray.x * delta;
			this.originGrass.y = this.rayO.z - ray.z * delta;
			this.originGrass.z = performance.now() * 0.001;

			// console.log(ray);

			//this.spawnWave(this.rayO.x - ray.x * delta, this.rayO.z - ray.z * delta);
		})
	}

	public update(time: number) {
		this.material.setFloat("time", time);

		// if (this.change) {
		// this.material.setFloatArray3("origins", this.origins);
		// }
		// this.change = false;
	}

	public spawnWave(x: number, z: number) {
		// if (Math.abs(x) < this.width * 0.4 && Math.abs(z) < this.width * 0.4) {
		const t = performance.now() * 0.001;
		// if (t - this.lastO.t < this.deltaTime && Math.abs(x - this.lastO.x) < this.deltaPos && Math.abs(z - this.lastO.z) < this.deltaPos) {
		// 	return;
		// }

		this.lastO.x = x;
		this.lastO.z = z;
		this.lastO.t = t;

		// this.origin.x = x;
		// this.origin.y = 0;
		// this.origin.z = z + 10;
		// console.log(this.origin);
		this.origins[this.index * 3] = x;
		this.origins[this.index * 3 + 1] = z;
		this.origins[this.index * 3 + 2] = t;
		this.index = (this.index + 1) % this.numOrigin;
		this.change = true;

		// }

	}

	private initOrigins() {
		this.origins = [];
		for (let i = 0; i < this.numOrigin; i++) {
			//this.origins.push(new Vector3(0.0, 0.0, 0.0));
			this.origins.push(1);
			this.origins.push(-1);
			this.origins.push(-10);
		}
		console.log(this.origins.length);
	}
}
