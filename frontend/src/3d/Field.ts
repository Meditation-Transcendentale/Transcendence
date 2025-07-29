import {
	Camera, Mesh, MeshBuilder, Scene,
	StandardMaterial, Vector3, FreeCamera,
	GlowLayer,
	Color4,
	Color3,
	RenderTargetTexture,
} from "@babylonImport";
import { Vue } from "../Vue";
import "./Shader.ts";
import { Sun } from "./Sun";
import { Grass } from "./Grass";
import { Butterfly } from "./Butterfly";
import { Pipeline } from "./Pipeline";
import { DitherMaterial } from "./Shader.ts";


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
	private cursorButterfly: Vector3;

	private pipeline: Pipeline;
	//////
	private test: Mesh;
	private test2: Mesh;
	private test22: Mesh;

	private rt: RenderTargetTexture;

	constructor(scene: Scene) {
		this.scene = scene;
		this.cursor = new Vector3();
		this.cursorButterfly = new Vector3();

		this.sun = new Sun(this.scene);
		this.grass = new Grass(this.scene, 20, this.cursor);
		this.butterfly = new Butterfly(this.scene, this.cursorButterfly);

		this.camera = new FreeCamera("fieldCamera", new Vector3(0, 4, 40), this.scene, true);
		this.camera.setTarget(new Vector3(0., 6, 30))
		this.camera.rotation.y = Math.PI;
		this.camera.attachControl();
		this.glowLayer = new GlowLayer("glow", this.scene);
		this.glowLayer.intensity = 0.5;



		//////
		this.test = MeshBuilder.CreatePlane("test", { size: 2 }, this.scene);
		this.test.material = new StandardMaterial("test", this.scene);
		this.test.material.backFaceCulling = false;
		this.test.position.set(0, 4, 0);
		this.test.rotation.y = 1 * Math.PI;
		this.test.setEnabled(false);

		this.test2 = MeshBuilder.CreateBox("test2", { size: 10 }, this.scene);
		this.test2.material = new DitherMaterial("test2", this.scene);
		this.test2.material.backFaceCulling = false;
		this.test2.position.set(10, 0, -20);
		this.test2.rotation.set(0.1 * Math.PI, 0.3 * Math.PI, 0.4 * Math.PI);

		this.test22 = MeshBuilder.CreateBox("test2", { size: 10 }, this.scene);
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

		this.rt = new RenderTargetTexture("grass", { ratio: 0.5 }, this.scene);
		this.rt.activeCamera = this.camera;
		//this.rt.skipInitialClear = true;
		this.camera.layerMask = 0x0000FFFF;
		this.scene.customRenderTargets = [];
		this.scene.customRenderTargets.push(this.rt);

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
			let delta = Math.abs(this.camera.position.y - 0.5) / ray.y;

			this.cursorButterfly.x = this.camera.position.x - ray.x * delta;
			this.cursorButterfly.y = 0;
			this.cursorButterfly.z = this.camera.position.z - ray.z * delta + 20;

			this.cursor.x = this.camera.position.x - ray.x * delta;
			this.cursor.y = this.camera.position.z - ray.z * delta;
			this.cursor.z = performance.now() * 0.001;
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
		this.pipeline.setEnable(status);
	}

	public setVue(vue: string) {
		//const final = new Vue();
		switch (vue) {
			case 'play': {
				this.camera.position.set(-20, 1, 30);
				this.camera.setTarget(new Vector3(-20, 3, 20));
				//console.log("TARGET", this.camera.target);

				//final.init(this.scene.getCameraByName('fieldCam') as Camera);
				//final.addWindow('create', this.cube0, this.vueBounding, Matrix.Identity());
				//final.addWindow('join', this.cube1, this.vueBounding, Matrix.Identity());
				break;
			}
			case 'home': {
				this.camera.position.set(0, 2, 10);
				this.camera.setTarget(new Vector3(0, 3, -10));
				//final.init(this.camera);
				//final.addWindow('play', {
				//	face: face,
				//	div: playdiv,
				//	matrix: this.test.getWorldMatrix(),
				//	onHoverCallback: (status: boolean) => { console.log("Hover:", status) }
				//
				//});
				// final.addWindow('info', this.cube1, this.vueBounding, Matrix.Identity());
				// final.addWindow('stats', this.cube2, this.vueBounding, Matrix.Identity());
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
				//final.init(this.camera);
				// 	final.init(this.scene.getCameraByName('fieldCam') as Camera);
				// 	final.addWindow('register', this.cube1, this.vueBounding, Matrix.Identity());
				break;
			}
			case 'register': {
				this.camera.position.set(0, 4, 40);
				this.camera.setTarget(new Vector3(0, 4, 30))
				//final.init(this.scene.getCameraByName('fieldCam') as Camera);
				//final.addWindow('login', this.cube0, this.vueBounding, Matrix.Identity());

				break;
			}
			case 'pongBR': {
				//final.init(this.scene.getCameraByName('br') as Camera);
				this.scene.activeCamera = this.scene.getCameraById('br');
				this.scene.activeCamera?.attachControl();

				break;
			}
			case 'lobby': {
				this.camera.position.set(0, 4, -30);
				this.camera.setTarget(new Vector3(0, 9, -40));

				break;
			}
			//case 'info': {
			//	final.init(this.scene.getCameraByName("fieldCam") as Camera);
			//	final.addWindow('user', this.cube0, this.vueBounding, Matrix.Identity());
			//	final.addWindow('security', this.cube1, this.vueBounding, Matrix.Identity());
			//
			//	break;
			//}
			//case 'game': {
			//	final.init(this.scene.getCameraByName('pong') as Camera);
			//	break;
			//}
			//case 'brick': {
			//	final.init(this.scene.getCameraByName('brick') as Camera);
			//	break;
			//}
		}
		//return final;
	}

}
