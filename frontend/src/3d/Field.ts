import {
	Camera, Mesh, MeshBuilder, Scene,
	StandardMaterial, Vector3, FreeCamera,
	GlowLayer,
	Color4,
	Color3,
	RenderTargetTexture,
	Matrix,
	Quaternion,
	ArcRotateCamera,
	UniversalCamera,
} from "@babylonImport";
import { Vue } from "../Vue";
import "./Shader.ts";
import { Sun } from "./Sun";
import { Grass } from "./Grass";
import { Butterfly } from "./Butterfly";
import { Pipeline } from "./Pipeline";
import { DitherMaterial } from "./Shader.ts";
import { Interpolator } from "./Interpolator";
import { Monolith } from "./Monolith";
import { createFortressMonolith, createTempleMonolith } from "./Builder";


const playdiv = document.createElement("div");
playdiv.className = "frame-new";
playdiv.innerText = "PLAY";

const face = [
	new Vector3(-1, 1, 0),
	new Vector3(1, -1, 0),
	new Vector3(1, 1, 0),
	new Vector3(1, -1, 0),
]

export class Field {
	private scene: Scene;

	private sun: Sun;
	private grass: Grass;
	private butterfly: Butterfly;
	private ground: Mesh;

	public camera: FreeCamera;
	private glowLayer: GlowLayer;

	private cursor: Vector3;
	private cursorMonolith: Vector3;
	private cursorButterfly: Vector3;

	private pipeline: Pipeline;
	//////
	private test: Mesh;
	private test2: Mesh;
	private test22: Mesh;

	private rt: RenderTargetTexture;
	private rtRatio = 1;

	constructor(scene: Scene) {
		this.scene = scene;
		this.cursor = new Vector3();
		this.cursorMonolith = new Vector3();
		this.cursorButterfly = new Vector3();

		this.sun = new Sun(this.scene);
		this.grass = new Grass(this.scene, 20, this.cursor);
		this.butterfly = new Butterfly(this.scene, this.cursorButterfly);

		this.camera = new FreeCamera("fieldCamera", new Vector3(0, 6, 40), this.scene, true);
		//this.camera = new ArcRotateCamera("fieldCamera", 0, 0, 10, Vector3.Zero(), this.scene);
		//this.camera = new UniversalCamera("fieldCamera", Vector3.Zero(), this.scene);
		this.camera.setTarget(new Vector3(0, 6, 30))
		this.camera.rotation.y = Math.PI;
		this.camera.attachControl();
		this.camera.minZ = 0.01;
		this.glowLayer = new GlowLayer("glow", this.scene);
		this.glowLayer.intensity = 0.5;



		this.test = MeshBuilder.CreatePlane("test", { size: 2 }, this.scene);
		this.test.material = new StandardMaterial("test", this.scene);
		this.test.material.backFaceCulling = false;
		this.test.position.set(0, 4, 0);
		this.test.rotation.y = 1 * Math.PI;
		this.test.setEnabled(false);

		this.test2 = MeshBuilder.CreateBox("test2", { width: 50, depth: 10, height: 10 }, this.scene);
		this.test2.material = new DitherMaterial("test2", this.scene);
		this.test2.material.backFaceCulling = false;
		this.test2.position.set(10, 0, -20);
		this.test2.rotation.set(0.1 * Math.PI, 0.3 * Math.PI, 0.4 * Math.PI);

		this.test22 = MeshBuilder.CreateBox("test2", { width: 50, depth: 10, height: 10 }, this.scene);
		this.test22.material = new StandardMaterial("test2", this.scene);
		this.test22.material.backFaceCulling = false;
		this.test22.position.set(10, 0, -20);
		this.test22.rotation.set(0.1 * Math.PI, 0.3 * Math.PI, 0.4 * Math.PI);
		this.test22.material.disableColorWrite = true;
		this.test22.material.forceDepthWrite = true;
		this.test22.layerMask = 0x10000000;



		this.ground = MeshBuilder.CreateGround("ground", { size: 200. }, this.scene);
		const m = new StandardMaterial("ground", this.scene);
		m.diffuseColor = Color3.Black();
		// m.diffuseColor = new Color3(0.5, 0.5, 0.5);
		// m.specularColor = new Color3(0.5, 0.5, 0.5);
		m.specularColor = Color3.Black();
		this.ground.material = m;
		this.ground.layerMask = 0x10000000;

		this.rt = new RenderTargetTexture("grass", { width: this.scene.getEngine().getRenderWidth() * this.rtRatio, height: this.scene.getEngine().getRenderHeight() * this.rtRatio }, this.scene);
		console.log("GRASS RT SIZE", this.rt.getSize());
		this.rt.activeCamera = this.camera;
		//this.rt.skipInitialClear = true;
		this.camera.layerMask = 0x0000FFFF;
		this.scene.customRenderTargets = [];
		this.scene.customRenderTargets.push(this.rt);
		const monolith = createTempleMonolith(scene, 10, this.cursorMonolith);

		monolith.enableShaderAnimation(true);
		monolith.setAnimationSpeed(5.);
		monolith.setAnimationIntensity(0.5);
		//monolith.getPerformanceReport();

		// In render loop - minimal CPU work!
		scene.registerBeforeRender(() => {
			monolith.update(performance.now(), this.camera);
		});

		//fortress.setAnimationStyle('gentle');
		//scene.registerBeforeRender(() => {
		//	fortress.update(performance.now(), this.camera);
		//});

		this.pipeline = new Pipeline(this.scene, this.camera, this.rt);

		/////

	}

	public async load() {
		await this.butterfly.init();
		await this.grass.init();

		this.glowLayer.addIncludedOnlyMesh(this.butterfly.mesh);
		this.glowLayer.setMaterialForRendering(this.butterfly.mesh, this.butterfly.glowMat);

		window.addEventListener("mousemove", (ev) => {
			const ray = this.scene.createPickingRay(ev.clientX, ev.clientY).direction;
			let delta = Math.abs(this.camera.position.y - 1) / ray.y;

			this.cursorButterfly.x = this.camera.position.x - ray.x * delta;
			this.cursorButterfly.y = 0;
			this.cursorButterfly.z = this.camera.position.z - ray.z * delta + 20;

			this.cursor.x = this.camera.position.x - ray.x * delta;
			this.cursor.y = this.camera.position.z - ray.z * delta;
			this.cursor.z = performance.now() * 0.001;

			//const pick = this.scene.pick(ev.clientX, ev.clientY);
			//if (pick?.hit)
			//	this.cursorMonolith.copyFrom(pick.pickedPoint!);
		})

		this.rt.renderList = [];
		this.rt.renderList.push(this.test22);
		this.rt.renderList.push(this.ground);
		for (let i = 0; i < this.grass._tiles.length; i++) {
			this.rt.renderList.push(this.grass._tiles[i]._mesh);
		}

		this.glowLayer.dispose();
	}

	public update(time: number, deltaTime: number) {
		this.grass.update(time, this.scene.activeCamera as Camera);
		this.butterfly.update(time, deltaTime);
		this.pipeline.update(time);
	}

	public onHover(status: number) {
		//this.rt.skipInitialClear = status;
		this.pipeline.hover = status;
	}

	public setEnable(status: boolean) {
		if (status) {
			this.camera.attachControl();
		} else {
			this.camera.detachControl();
		}

		this.pipeline.setEnable(status);
	}

	public resize() {
		this.rt.resize({ width: this.scene.getEngine().getRenderWidth() * this.rtRatio, height: this.scene.getEngine().getRenderHeight() * this.rtRatio })
	}

	public setVue(vue: string) {
		//const final = new Vue();
		switch (vue) {
			case 'play': {
				this.camera.position.set(-20, 1, 30);
				this.camera.setTarget(new Vector3(-20, 4, 20));
				break;
			}
			case 'home': {
				this.camera.position.set(0, 2, 10);
				this.camera.setTarget(new Vector3(0, 3, -10));
				//Interpolator.addElem({
				//	start: this.camera.position,
				//	end: new Vector3(0, 2, 10),
				//	duration: 0.5,
				//	callback: () => { }
				//})
				//Interpolator.addElem({
				//	start: this.camera.target,
				//	end: new Vector3(0, 3, -10),
				//	duration: 0.4,
				//	callback: () => { this.camera.setTarget(this.camera.target) }
				//})
				break;
			}
			// case 'stats': {
			// 	final.init(this.scene.getCameraByName('fieldCam') as Camera);
			// 	final.addWindow('pong', this.cube0, this.vueBounding, Matrix.Identity());
			// 	final.addWindow('br', this.cube1, this.vueBounding, Matrix.Identity());
			// 	break;
			// }
			case 'login': {
				this.camera.position.set(0, 4, 40);
				this.camera.setTarget(new Vector3(0, 6, 30));
				break;
			}
			case 'register': {
				this.camera.position.set(0, 4, 40);
				this.camera.setTarget(new Vector3(0, 4, 30))
				break;
			}
			case 'pongBR': {
				this.scene.activeCamera = this.scene.getCameraByName('br');
				this.scene.activeCamera?.attachControl();

				break;
			}
			case 'lobby': {
				this.camera.position.set(0, 4, -30);
				this.camera.setTarget(new Vector3(0, 9, -40));

				break;
			}
			case 'game': {
				this.scene.activeCamera = this.scene.getCameraByName("pong");
				break;
			}
			case 'brick': {
				this.scene.activeCamera = this.scene.getCameraByName("brick");
				break;
			}
			case 'exemple1': {
				this.camera.position.set(0, 6, 40);
				this.camera.setTarget(new Vector3(0, 6, 30));
				break;
			}
			case 'exemple2': {
				this.camera.position.set(0, 6, 40);
				this.camera.setTarget(new Vector3(0, 6, 30));
				break;
			}
		}
	}

}
