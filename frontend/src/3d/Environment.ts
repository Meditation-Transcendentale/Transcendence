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
	// Inspector,
	MeshBuilder,
	Scene,
	StandardMaterial,
	Vector3,
	UniversalCamera,
	TransformNode,
	LoadAssetContainerAsync,
	Mesh
} from "@babylonImport";
import { Field } from "./Field";
import { DynamicTexture, Material, PBRMaterial, Texture } from "@babylonjs/core";
// import { Inspector } from '@babylonjs/inspector';
// import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector";
// import * as BABYLON from 'babylonjs';
// import 'babylonjs-inspector';


export class Environment {
	private canvas: HTMLCanvasElement;
	public scene!: Scene;

	private camera!: ArcRotateCamera;
	private camera_br!: ArcRotateCamera;
	private camera_brick!: ArcRotateCamera;
	private camera_pong!: ArcRotateCamera;

	private lastTime: number;
	private deltaTime: number;
	private frame: number;
	private pongRoot: TransformNode;

	private gears!: Gears;

	private field: Field;

	private updateHome: boolean = true;

	//private cameraDiv: HTMLDivElement;
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

		// this.scene.useRightHandedSystem = true;


		this.lastTime = performance.now() * 0.001;
		this.deltaTime = 0;
		this.frame = 0;

		// this.gears = new Gears(this.scene);
		this.field = new Field(this.scene);
		this.width = engine.getRenderWidth();
		this.height = engine.getRenderHeight();

		//const perspec = this.scene.getEngine().getRenderHeight() * 0.5 * cam!.getProjectionMatrix().m[5];
		//this.cameraDiv = document.querySelector("#camera") as HTMLDivElement;
		//this.cameraDiv.style.width = `${this.width}px`;
		//this.cameraDiv.style.height = `${this.height}px`;
		//
		this.gameMeshes = new Array<Mesh>;
	}

	private creatMaterial() {
		// const concreteMaterial = new BABYLON.PBRMaterial("concreteMaterial", scene);
		//
		// concreteMaterial.baseTexture = new Texture("textures/brushed_concrete_diff_1k.jpg", this.scene);
		// concreteMaterial.normalTexture = new Texture("textures/brushed_concrete_nor_gl_1k.jpg", this.scene);
		// concreteMaterial.metallicRoughnessTexture = new Texture("textures/brushed_concrete_rough_1k.jpg", this.scene);
		// concreteMaterial.ambientTexture = new Texture("textures/brushed_concrete_ao_1k.jpg", this.scene);
		//
		// concreteMaterial.metallicFactor = 0.0; 
		// concreteMaterial.roughnessFactor = 1.0; 
		// concreteMaterial.baseColor = new Color3(1, 1, 1); 
		//
		// concreteMaterial.ambientTextureStrength = 1.0;
	}

	private createMesh() {
		this.pongRoot = new TransformNode("pongbrRoot", this.scene);
		this.pongRoot.position.set(-2200, -3500, -3500);
		this.pongRoot.rotation.z -= 30.9000;
		this.pongRoot.scaling.set(1, 1, 1);
		const arenaMesh = MeshBuilder.CreateCylinder("arenaBox", { diameter: 400, height: 5, tessellation: 128 }, this.scene);
		arenaMesh.parent = this.pongRoot;
		const arenaMaterial = new PBRMaterial("gameplayArena", this.scene);
		arenaMaterial.albedoColor = new Color3(0.08, 0.10, 0.12);
		arenaMaterial.emissiveColor = new Color3(0.01, 0.03, 0.05);
		arenaMaterial.roughness = 0.95;
		arenaMaterial.metallic = 0.02;

		this.gameMeshes.push(arenaMesh);

	}
	public async init() {

		this.createMesh();
		this.camera_br = new ArcRotateCamera('br', -Math.PI * 0.8, Math.PI * 0.4, 100, Vector3.Zero(), this.scene);
		//this.camera_br = new UniversalCamera('br', Vector3.Zero(), this.scene);
		this.camera_brick = new ArcRotateCamera("brick", Math.PI / 2, 0, 30, Vector3.Zero(), this.scene);
		this.camera_pong = new ArcRotateCamera('pong', Math.PI / 2., 0, 50, Vector3.Zero(), this.scene);
		// const loaded = await LoadAssetContainerAsync("/assets/PongStatutTextured.glb", this.scene);
		// loaded.addAllToScene();
		// loaded.meshes[0].parent = this.pongRoot;
		// this.gameMeshes.push(loaded.meshes[0] as Mesh);

		// const headMesh = this.scene.getMeshByName('Head.001') as Mesh;
		// const headmat = new StandardMaterial('headmat', this.scene);
		// headmat.diffuseColor = new Color3(1., 1, 1);
		// // headMesh.material = headmat;

		// headMesh.material.usePhysicalLightFalloff = false;
		// headMesh.material.invertNormalMapX = true;
		// headMesh.material.invertNormalMapY = true;


		// const mouthMesh = this.scene.getMeshByName('Mouth.001') as Mesh;
		// const eyeMesh = this.scene.getMeshByName('Eyes.001') as Mesh;
		// const eyemat = new StandardMaterial('eyemat', this.scene);
		// eyemat.diffuseColor = new Color3(1., 0, 0);
		// eyeMesh.material = eyemat;

		// if (mouthMesh && mouthMesh.morphTargetManager) {
		// 	const smileTarget = mouthMesh.morphTargetManager.getTarget(0);

		// 	smileTarget.influence = 0.;

		// 	console.log("Statue is now smiling!");
		// }

		// if (headMesh && headMesh.morphTargetManager) {
		// 	const smileTarget = headMesh.morphTargetManager.getTarget(0);

		// 	smileTarget.influence = 0.;

		// 	console.log("Statue is now smiling!");
		// }


		// this.scene.meshes.forEach((mesh) => {
		// 	mesh.receiveShadows = true;
		// })

		await this.field.load();
		this.scene.fogMode = Scene.FOGMODE_NONE;
		this.scene.fogDensity = 0.2;
		this.scene.fogStart = 100;
		this.scene.fogEnd = 120;
		this.scene.fogColor = new Color3(0., 0., 0.);
		this.scene.clearColor = new Color4(0., 0., 0., 0.);

		// const pp = new DefaultRenderingPipeline("default", true, this.scene, [this.scene.activeCamera as Camera]);
		// pp.bloomEnabled = true;
		// pp.bloomWeight = 0.5;
		// pp.bloomKernel = 16;
		// pp.bloomScale = 0.25;

		// this.scene.debugLayer.show();
		// Inspector.Show(this.scene, {});
		//this.perspective = this.scene.getEngine().getRenderHeight() * 0.5 * this.scene.activeCamera!.getProjectionMatrix().m[5];
		//document.body.style.perspective = `${this.perspective}px`;
		//

		for (let i = 0; i < this.gameMeshes.length; i++) {
			this.gameMeshes[i].setEnabled(false);
		}
	}

	public render(time: number) {
		this.deltaTime = time - this.lastTime;
		this.lastTime = time;
		if (this.updateHome) {
			this.field.update(time, this.deltaTime);
		}
		// this.gears.update(this.deltaTime);
		this.scene.render();
		this.frame += 1;
		//this.updateCameraDiv();
	}

	private updateCameraDiv() {
		const world = this.scene.activeCamera?.getWorldMatrix();
		const r = world!.getRotationMatrix().transpose().m;
		const m = world!.m;
		this.cameraDiv.style.transform = `translateZ(${this.perspective}px) matrix3d(${m[0]},${-r[1]},${-r[2]},${m[3]},${-r[4]},${-m[5]},${-r[6]},${m[7]},${-r[8]},${r[9]},${m[10]},${m[11]},${m[12]},${-m[13]},${m[14]},${m[15]}) translate(${this.width * 0.5}px, ${this.height * 0.5}px)`;
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
		this.camera?.dispose();
		this.scene?.dispose();
	}
}
