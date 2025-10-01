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
import { DefaultRenderingPipeline, DirectionalLight, DynamicTexture, Material, PBRMaterial, PointLight, ShadowGenerator, SpotLight, Texture } from "@babylonjs/core";
import { gTrackManager } from "./TrackManager";
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

	private lastTime: number;
	private deltaTime: number;
	private frame: number;
	private pongRoot!: TransformNode;

	private fCamera: FreeCamera;
	private field: Field;

	private updateHome: boolean = true;

	private perspective!: number;

	private width: number;
	private height: number;

	private gameMeshes: Array<Mesh>;



	constructor(engine: Engine, canvas: HTMLCanvasElement) {
		this.canvas = canvas;

		this.scene = new Scene(engine);
		this.scene.autoClear = true; // Color buffer
		// this.scene.clearColor = new Color4(0., 0., 0., 1);
		this.scene.clearColor = new Color4(158. / 256, 176. / 256, 188. / 256, 1.);

		this.scene.setRenderingAutoClearDepthStencil(0, true);

		this.lastTime = performance.now() * 0.001;
		this.deltaTime = 0;
		this.frame = 0;

		this.fCamera = new FreeCamera("fieldCamera", new Vector3(0, 6, 40), this.scene, true);
		this.fCamera.updateUpVectorFromRotation = true;

		this.field = new Field(this.scene, this.fCamera);

		this.width = engine.getRenderWidth();
		this.height = engine.getRenderHeight();

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
		this.pongRoot.position.set(0, -100, 0);

		// this.pongRoot.rotation.z -= 30.9000;
		this.pongRoot.scaling.set(0.1, 0.1, 0.1);
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
		const loaded = await LoadAssetContainerAsync("/assets/PongStatutTextured.glb", this.scene);
		loaded.addAllToScene();
		loaded.meshes[0].parent = this.pongRoot;
		this.gameMeshes.push(loaded.meshes[0] as Mesh);

		const headMesh = this.scene.getMeshByName('Head.001') as Mesh;
		const headmat = new StandardMaterial('headmat', this.scene);
		headmat.diffuseColor = new Color3(1., 1, 1);
		// headMesh.material = headmat;


		const material = headMesh.material as PBRMaterial;
		material.usePhysicalLightFalloff = false;
		material.invertNormalMapX = true;
		material.invertNormalMapY = true;

		const mouthMesh = this.scene.getMeshByName('Mouth.001') as Mesh;
		const eyeMesh = this.scene.getMeshByName('Eyes.001') as Mesh;
		const eyemat = new StandardMaterial('eyemat', this.scene);
		eyemat.diffuseColor = new Color3(1., 0, 0);
		eyemat.emissiveColor = new Color3(1, 1, 1);
		eyeMesh.material = eyemat;

		if (mouthMesh && mouthMesh.morphTargetManager) {
			const smileTarget = mouthMesh.morphTargetManager.getTarget(0);

			smileTarget.influence = 0.;

			console.log("Statue is now smiling!");
		}

		if (headMesh && headMesh.morphTargetManager) {
			const smileTarget = headMesh.morphTargetManager.getTarget(0);

			smileTarget.influence = 1.;

			console.log("Statue is now smiling!");
		}
		const redlight = new SpotLight(
			"redlight",
			new Vector3(-1200, 200, 0),
			new Vector3(1, -1, 0),
			160.8,
			2,
			this.scene
		);
		redlight.diffuse = Color3.Red();
		redlight.intensity = 100;
		redlight.parent = this.pongRoot;
		const whitelight = new SpotLight(
			"whitelight",
			new Vector3(-500, 220, 0),
			new Vector3(-1, -1, 0),
			2 * Math.PI,
			2,
			this.scene
		);
		const whitelight2 = new SpotLight(
			"whitelight2",
			new Vector3(0, 400, 0),
			new Vector3(0, -1, 0),
			Math.PI,
			2,
			this.scene
		);

		whitelight.parent = this.pongRoot;
		whitelight2.parent = this.pongRoot;
		whitelight.shadowMinZ = 1;
		whitelight.intensity = 8;
		whitelight2.intensity = 1;
		whitelight.shadowMaxZ = 10;
		redlight.shadowMinZ = 1;
		redlight.shadowMaxZ = 80;
		const shadowGenerator1 = new ShadowGenerator(2048, redlight);
		const shadowGenerator2 = new ShadowGenerator(2048, whitelight);
		shadowGenerator1.useBlurCloseExponentialShadowMap = true;
		shadowGenerator2.useBlurCloseExponentialShadowMap = true;
		shadowGenerator1.addShadowCaster(headMesh);
		shadowGenerator2.addShadowCaster(headMesh);

		await this.field.load();

		this.scene.meshes.forEach((mesh) => {
			mesh.receiveShadows = true;
		})


		// this.scene.clearColor = new Color4(0., 0., 0., 0.);



		this.pongRoot.isEnabled(false);
		// this.scene.debugLayer.show();

		this.scene.imageProcessingConfiguration.toneMappingEnabled = false;
		this.scene.imageProcessingConfiguration.applyByPostProcess = false;
		this.scene.imageProcessingConfiguration.exposure = 1.;
		this.scene.imageProcessingConfiguration.contrast = 1.;

		whitelight.setEnabled(false);
		redlight.setEnabled(false);
		whitelight2.setEnabled(false);


		for (let i = 0; i < this.gameMeshes.length; i++) {
			this.gameMeshes[i].setEnabled(false);
		}

		////////////////////////////////////////
		//
		//COMMENT IF YOU WANT TO HAVE FULL GRASS ON LOAD
		//
		////////////////////////////////////////
		this.field.setLowPerf();


		this.scene.onBeforeCameraRenderObservable.add(() => {
			this.update();
		});
	}


	public render(time: number) {
		this.deltaTime = time - this.lastTime;
		this.lastTime = time;
		this.scene.render();
		this.frame += 1;
	}

	private update() {
		gTrackManager.update(this.lastTime);
		this.field.update(this.lastTime, this.deltaTime);
	}

	public enableBr(value: boolean) {
		this.pongRoot.isEnabled(value);
	}

	public enableHome() {
		this.updateHome = true;
		this.scene.activeCamera = this.fieldCamera;
		for (let i = 0; i < this.gameMeshes.length; i++) {
			this.gameMeshes[i].setEnabled(false);
		}

	}

	public disableHome() {
		//this.updateHome = false;
		for (let i = 0; i < this.gameMeshes.length; i++) {
			this.gameMeshes[i].setEnabled(true);
		}

	}

	public setVue(vue: string) {
		this.field.setVue(vue);
	}

	public get fieldCamera(): Camera {
		return this.fCamera;
	}

	public resize() {
		this.field.resize();
	}


	public setCube(name: string, clickEv: any = null, hoverEv: any = null) {
		this.field.cubeEvent.enable = clickEv != null || hoverEv != null;
		this.field.cubeEvent.name = name;
		this.field.cubeEvent.clickEvent = clickEv;
		this.field.cubeEvent.hoverEvent = hoverEv;
	}

	public dispose() {
		this.field?.dispose();
		this.camera?.dispose();
		this.scene?.dispose();
	}
}
