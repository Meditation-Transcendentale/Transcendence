import { Gears } from "./Gears";
import { Vue } from "../Vue";
import {
	ArcRotateCamera,
	Camera,
	Color3,
	Color4,
	DefaultRenderingPipeline,
	Engine,
	FresnelParameters,
	//Inspector,
	MeshBuilder,
	Scene,
	StandardMaterial,
	Vector3,
	Inspector,
	LoadAssetContainerAsync
} from "@babylonImport";
import { Field } from "./Field";


export class Environment {
	private canvas: HTMLCanvasElement;
	public scene!: Scene;

	private camera!: ArcRotateCamera;
	private camera_br!: ArcRotateCamera;
	private camera_pong!: ArcRotateCamera;

	private lastTime: number;
	private deltaTime: number;
	private frame: number;

	private gears!: Gears;

	private field: Field;

	private updateHome: boolean = true;



	constructor(engine: Engine, canvas: HTMLCanvasElement) {
		this.canvas = canvas;

		this.scene = new Scene(engine);
		this.scene.autoClear = true; // Color buffer
		this.scene.clearColor = new Color4(0., 0., 0., 1);

		this.scene.setRenderingAutoClearDepthStencil(0, true);


		window.addEventListener("keydown", (ev) => {
			// Alt+I
			//if (ev.altKey && (ev.key === "I" || ev.key === "i")) {
			//	if (this.scene.debugLayer.isVisible()) {
			//		//this.scene.debugLayer.hide();
			//	} else {
			//		this.scene.debugLayer.show();
			//	}
			//}

			//if (ev.key == 'Escape') {
			//	this.scene.setActiveCameraByName('home');
			//}
			//
			if (ev.key == ' ') {

				this.scene.setActiveCameraByName('menu');
			}
		});


		this.lastTime = performance.now() * 0.001;
		this.deltaTime = 0;
		this.frame = 0;

		// this.gears = new Gears(this.scene);
		this.field = new Field(this.scene);

	}

	private createMesh() {
		const arenaMesh = MeshBuilder.CreateCylinder("arenaBox", { diameter: 400, height: 1, tessellation: 128 }, this.scene);
		arenaMesh.position = new Vector3(-2200, -3500, -3500);
		//arenaMesh.rotation.x += Math.PI / 2;
		arenaMesh.rotation.z -= 30.9000;
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
	}
	public async init() {

		this.createMesh();
		this.camera_br = new ArcRotateCamera('br', -Math.PI * 0.8, Math.PI * 0.4, 100, Vector3.Zero(), this.scene);
		this.camera_br.attachControl(this.canvas, true);
		this.camera_pong = new ArcRotateCamera('pong', -Math.PI * 0.8, Math.PI * 0.4, 100, Vector3.Zero(), this.scene);
		const loaded = await LoadAssetContainerAsync("/assets/PongStatut.glb", this.scene);
		loaded.addAllToScene();
		loaded.meshes[1].setEnabled(false);


		//this.scene.debugLayer.show();

		// await this.gears.load();
		//
		await this.field.load();

		this.scene.meshes.forEach((mesh) => {
			mesh.receiveShadows = true;
		})

		this.scene.fogMode = Scene.FOGMODE_LINEAR;
		this.scene.fogDensity = 0.2;
		this.scene.fogStart = 100;
		this.scene.fogEnd = 120;
		this.scene.fogColor = new Color3(.4, .43, .45);
		this.scene.clearColor = this.scene.fogColor.toColor4();

		// const pp = new DefaultRenderingPipeline("default", true, this.scene, [this.scene.activeCamera as Camera]);
		// pp.bloomEnabled = true;
		// pp.bloomWeight = 0.5;
		// pp.bloomKernel = 16;
		// pp.bloomScale = 0.25;

		//Inspector.Show(this.scene, {});

	}

	public render() {
		const time = performance.now() * 0.001;
		this.deltaTime = time - this.lastTime;
		this.lastTime = time;
		if (this.updateHome) {
			this.field.update(time, this.deltaTime);
		}
		// this.gears.update(this.deltaTime);
		this.scene.render();
		this.frame += 1;
	}

	public enableHome() {
		this.updateHome = true;
		this.scene.fogMode = Scene.FOGMODE_LINEAR;

	}

	public disableHome() {
		this.updateHome = false;
		this.scene.fogMode = Scene.FOGMODE_NONE;
	}

	public setVue(vue: string): Vue {
		// return this.gears.setVue(vue);
		return this.field.setVue(vue);
	}

	public dispose() {
		//this.gears?.dispose();
		this.camera?.dispose();
		this.scene?.dispose();
	}
}
