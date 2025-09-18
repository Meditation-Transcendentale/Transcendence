import {
	ArcRotateCamera,
	Camera,
	Color3,
	Color4,
	Engine,
	FresnelParameters,
	MeshBuilder,
	Scene,
	StandardMaterial,
	Vector3,
	TransformNode,
	LoadAssetContainerAsync,
	Mesh,
	FreeCamera,
} from "@babylonImport";
import { Field } from "./Field";


export class Environment {
	private canvas: HTMLCanvasElement;
	public scene!: Scene;

	private camera!: ArcRotateCamera;
	private camera_br!: ArcRotateCamera;

	private lastTime: number;
	private deltaTime: number;
	private frame: number;
	private pongRoot!: TransformNode;

	private fCamera: FreeCamera;
	private field: nField | Field;

	private updateHome: boolean = true;

	private perspective!: number;

	private width: number;
	private height: number;

	private gameMeshes: Array<Mesh>;



	constructor(engine: Engine, canvas: HTMLCanvasElement) {
		this.canvas = canvas;

		this.scene = new Scene(engine);
		this.scene.autoClear = true; // Color buffer
		this.scene.clearColor = new Color4(0., 0., 0., 1);

		this.scene.setRenderingAutoClearDepthStencil(0, true);

		this.lastTime = performance.now() * 0.001;
		this.deltaTime = 0;
		this.frame = 0;

		this.fCamera = new FreeCamera("fieldCamera", new Vector3(0, 6, 40), this.scene, true);

		this.field = new Field(this.scene, this.fCamera);

		this.width = engine.getRenderWidth();
		this.height = engine.getRenderHeight();

		this.gameMeshes = new Array<Mesh>;


	}

	private createMesh() {
		this.pongRoot = new TransformNode("pongbrRoot", this.scene);
		this.pongRoot.position.set(-2200, -3500, -3500);
		this.pongRoot.rotation.z -= 30.9000;
		this.pongRoot.scaling.set(1, 1, 1);
		const arenaMesh = MeshBuilder.CreateCylinder("arenaBox", { diameter: 400, height: 1, tessellation: 128 }, this.scene);
		arenaMesh.parent = this.pongRoot;

		const material = new StandardMaterial("arenaMaterial", this.scene);
		material.diffuseColor.set(0, 0, 0);
		material.specularColor.set(0, 0, 0);
		material.emissiveColor.set(1, 1, 1);
		material.disableLighting = true;
		const fresnel = new FresnelParameters();
		fresnel.isEnabled = true;
		fresnel.leftColor = new Color3(1, 1, 1);
		fresnel.rightColor = new Color3(0, 0, 0);
		fresnel.power = 15;
		material.emissiveFresnelParameters = fresnel;
		arenaMesh.material = material;

		this.gameMeshes.push(arenaMesh);

	}
	public async init() {

		this.createMesh();
		this.camera_br = new ArcRotateCamera('br', -Math.PI * 0.8, Math.PI * 0.4, 100, Vector3.Zero(), this.scene);
		const loaded = await LoadAssetContainerAsync("/assets/PongStatut.glb", this.scene);

		loaded.addAllToScene();
		loaded.meshes[1].parent = this.pongRoot;
		this.gameMeshes.push(loaded.meshes[1] as Mesh);


		// this.scene.debugLayer.show();

		await this.field.load();

		this.scene.meshes.forEach((mesh) => {
			mesh.receiveShadows = true;
		})

		this.scene.fogMode = Scene.FOGMODE_NONE;
		this.scene.fogDensity = 0.2;
		this.scene.fogStart = 100;
		this.scene.fogEnd = 120;
		this.scene.fogColor = new Color3(0., 0., 0.);
		this.scene.clearColor = new Color4(0., 0., 0., 0.);



		for (let i = 0; i < this.gameMeshes.length; i++) {
			this.gameMeshes[i].setEnabled(false);
		}


		this.scene.onBeforeRenderObservable.add(() => {
			this.update();
		})
	}

	public render(time: number) {
		this.deltaTime = time - this.lastTime;
		this.lastTime = time;
		// this.gears.update(this.deltaTime);
		this.scene.render();
		this.frame += 1;
		//this.updateCameraDiv();
	}

	private update() {
		if (this.updateHome) {
			this.field.update(this.lastTime, this.deltaTime);
		}
	}

	public enableHome() {
		this.updateHome = true;
		//this.scene.fogMode = Scene.FOGMODE_LINEAR;
		this.scene.activeCamera = this.fieldCamera;
		for (let i = 0; i < this.gameMeshes.length; i++) {
			this.gameMeshes[i].setEnabled(false);
		}
		//this.fieldCamera.setEnabled(true);

	}

	public disableHome() {
		//this.updateHome = false;
		this.scene.fogMode = Scene.FOGMODE_NONE;
		for (let i = 0; i < this.gameMeshes.length; i++) {
			this.gameMeshes[i].setEnabled(true);
		}
		//this.fieldCamera.setEnabled(false);

	}

	public setVue(vue: string) {
		this.field.setVue(vue);
	}

	public get fieldCamera(): Camera {
		return this.field.camera;
	}

	public onHover(status: number) {
		this.field.onHover(status);
	}

	public resize() {
		this.field.resize();
	}

	public dispose() {
		//this.gears?.dispose();
		this.field?.dispose();
		this.camera?.dispose();
		this.scene?.dispose();
	}
}
