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

	private camera: FreeCamera;
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

		this.camera = new FreeCamera("fieldCamera", new Vector3(-2, 4, 3), this.scene, true);
		this.camera.rotation.y = Math.PI;
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
		m.specularColor = Color3.Black();
		this.ground.material = m;
		this.ground.layerMask = 0x10000000;

		this.rt = new RenderTargetTexture("grass", { ratio: 0.5 }, this.scene);
		this.rt.activeCamera = this.camera;
		// this.rt.skipInitialClear = true;
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
	}

	public update(time: number, deltaTime: number) {
		this.grass.update(time, this.scene.activeCamera as Camera);
		this.butterfly.update(time, deltaTime);
		this.pipeline.update(time);
	}

	public setVue(vue: string): Vue {
		const final = new Vue();
		switch (vue) {
			// case 'play': {
			// 	final.init(this.scene.getCameraByName('fieldCam') as Camera);
			// 	final.addWindow('create', this.cube0, this.vueBounding, Matrix.Identity());
			// 	final.addWindow('join', this.cube1, this.vueBounding, Matrix.Identity());
			// 	break;
			// }
			case 'home': {
				final.init(this.camera);
				// final.addWindow('play', {
				// 	face: face,
				// 	div: playdiv,
				// 	matrix: this.test.getWorldMatrix(),
				// 	onHoverCallback: (status: boolean) => { console.log("Hover:", status) }
				//
				// });
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
			// case 'login': {
			// 	final.init(this.scene.getCameraByName('fieldCam') as Camera);
			// 	final.addWindow('register', this.cube1, this.vueBounding, Matrix.Identity());
			// 	break;
			// }
			// case 'register': {
			// 	final.init(this.scene.getCameraByName('fieldCam') as Camera);
			// 	final.addWindow('login', this.cube0, this.vueBounding, Matrix.Identity());
			//
			// 	break;
			// }
			// case 'test': {
			// 	final.init(this.scene.getCameraByName('br') as Camera);
			//
			// 	break;
			// }
			// case 'lobby': {
			// 	final.init(this.scene.getCameraByName('fieldCam') as Camera);
			// 	final.addWindow('back', this.cube1, this.vueBounding, Matrix.Identity());
			//
			// 	break;
			// }
			// case 'info': {
			// 	final.init(this.scene.getCameraByName("fieldCam") as Camera);
			// 	final.addWindow('user', this.cube0, this.vueBounding, Matrix.Identity());
			// 	final.addWindow('security', this.cube1, this.vueBounding, Matrix.Identity());
			//
			// 	break;
			// }
			// case 'game': {
			// 	final.init(this.scene.getCameraByName('pong') as Camera);
			// 	break;
			// }

		}
		return final;
	}

}

// export class Field {
// 	private scene: Scene;
// 	private sunL!: DirectionalLight;
// 	private plane!: Mesh;
// 	private clouds: Mesh[];
//
// 	private sun: Sun;
// 	private grass: Grass;
// 	private ground: Puddle;
// 	private butterfly: Butterfly;
// 	private portal: Portal;
//
// 	private ditherMat!: DitherMaterial;
// 	private vueBounding!: Array<Vector3>;
//
// 	private cube0!: Mesh;
// 	private cube1!: Mesh;
// 	private cube2!: Mesh;
//
// 	public glitchPost!: PostProcess;
// 	public glitchOrigin: Vector3;
//
// 	public test!: Mesh;
//
//
// 	constructor(scene: Scene) {
// 		this.scene = scene;
// 		this.sun = new Sun(scene);
// 		this.grass = new Grass(20, scene);
// 		this.ground = new Puddle(scene, 100, 1);
// 		this.butterfly = new Butterfly(scene, this.ground.origin);
// 		this.portal = new Portal(scene);
//
// 		this.initVueBounding();
// 		this.glitchOrigin = new Vector3(0.);
//
// 		this.clouds = [];
// 	}
//
// 	public async load() {
// 		const mat = new StandardMaterial("white", this.scene);
// 		mat.wireframe = false;
// 		mat.diffuseColor = new Color3(1., 1, 1);
//
// 		this.ditherMat = new DitherMaterial("dither", this.scene);
//
//
//
// 		const loaded = await LoadAssetContainerAsync("/assets/field.glb", this.scene);
// 		loaded.addAllToScene();
// 		loaded.meshes.forEach((mesh) => {
// 			mesh.material = this.ditherMat;
// 			if (mesh.name === 'Cube' || mesh.name === "Cube.001" || mesh.name === "Cube.002") {
// 				mesh.material = new DitherMaterial("dither", this.scene);
// 			}
// 			// mesh.receiveShadows = true;
// 			// this.sun.shadow.addShadowCaster(mesh);
// 		})
// 		this.scene.setActiveCameraByName("fieldCam");
// 		let cam = this.scene.getCameraByName("fieldCam");
// 		cam?.position.set(-2, 4, 3);
// 		this.scene.activeCamera.parent = undefined;
//
// 		this.cube0 = this.scene.getMeshByName("Cube") as Mesh;
// 		this.cube1 = this.scene.getMeshByName("Cube.001") as Mesh;
// 		this.cube2 = this.scene.getMeshByName("Cube.002") as Mesh;
//
// 		this.ground.init();
// 		await this.butterfly.init();
// 		await this.grass.init(this.scene, this.ground.originGrass, this.butterfly.glowLayer);
//
// 		///////
// 		//
// 		///////
// 		const cub = MeshBuilder.CreateBox("tempo", { size: 2 });
// 		cub.refreshBoundingInfo();
// 		const bounding = new Array<Vector3>(8);
// 		const b = cub.getBoundingInfo().boundingBox.vectors;
// 		for (let i = 0; i < b.length; i++) {
// 			bounding[i] = b[i].clone().add(new Vector3(0, 1, -20));
// 		}
// 		console.log("bouding:", b);
// 		cub.dispose();
//
// 		// Vue.addButterfly(this.butterfly.positions, 300, bounding);
//
// 		this.glitchPost = new PostProcess("glitch", "glitch", ["origin", "time", "ratio"], null, 1., cam);
// 		this.glitchPost.autoClear = true;
// 		this.glitchPost.renderTargetSamplingMode = Engine.TEXTURE_TRILINEAR_SAMPLINGMODE;
// 		// Vue.refGlitch(this.glitchPost, this.glitchOrigin);
// 		this.glitchPost.onApply = (effect) => {
// 			effect.setVector3("origin", this.glitchOrigin);
// 			effect.setFloat("time", performance.now() * 0.001);
// 			effect.setFloat("ratio", window.innerWidth / window.innerHeight);
// 		}
//
// 		this.test = MeshBuilder.CreatePlane("test", { size: 2 }, this.scene);
// 		this.test.material = new StandardMaterial("test", this.scene);
// 		this.test.material.backFaceCulling = false;
// 		// this.test.setEnabled(false);
// 		this.test.position.set(0, 4, 0);
// 		this.test.rotation.y = 1 * Math.PI;
// 		// console.log("perspective", (2 * Math.tan(cam.fov * 0.2)));
// 		const perspec = this.scene.getEngine().getRenderHeight() * 0.5 * cam!.getProjectionMatrix().m[5];
// 		// document.body.style.perspective = `${perspec}px`
// 		// document.body.style.transform = `translateZ(${perspec}px)`;
// 	}
//
// 	private initVueBounding() {
// 		const cub = MeshBuilder.CreateBox("tempo", { size: 1 });
// 		cub.refreshBoundingInfo();
// 		this.vueBounding = new Array<Vector3>(8);
// 		const b = cub.getBoundingInfo().boundingBox.vectors;
// 		for (let i = 0; i < b.length; i++) {
// 			this.vueBounding[i] = (b[i].clone());
// 		}
// 		cub.dispose();
// 	}
//
// 	public update(time: number, deltaTime: number) {
// 		this.sun.update(time);
// 		this.grass.update(time, this.scene.activeCamera as Camera);
// 		this.ground.update(time);
// 		this.ditherMat.setFloat("time", time);
// 		(this.cube0.material as DitherMaterial).setFloat('time', time);
// 		(this.cube1.material as DitherMaterial).setFloat('time', time);
// 		(this.cube2.material as DitherMaterial).setFloat('time', time);
// 		this.butterfly.update(time, deltaTime);
// 	}
//
// 	public setVue(vue: string): Vue {
// 		const final = new Vue();
// 		switch (vue) {
// 			// case 'play': {
// 			// 	final.init(this.scene.getCameraByName('fieldCam') as Camera);
// 			// 	final.addWindow('create', this.cube0, this.vueBounding, Matrix.Identity());
// 			// 	final.addWindow('join', this.cube1, this.vueBounding, Matrix.Identity());
// 			// 	break;
// 			// }
// 			case 'home': {
// 				final.init(this.scene.getCameraByName('fieldCam') as Camera);
// 				final.addWindow('play', {
// 					face: face,
// 					div: playdiv,
// 					matrix: this.test.getWorldMatrix(),
// 					onHoverCallback: (status: boolean) => { console.log("Hover:", status) }
//
// 				});
// 				// final.addWindow('info', this.cube1, this.vueBounding, Matrix.Identity());
// 				// final.addWindow('stats', this.cube2, this.vueBounding, Matrix.Identity());
// 				break;
// 			}
// 			// case 'stats': {
// 			// 	final.init(this.scene.getCameraByName('fieldCam') as Camera);
// 			// 	final.addWindow('pong', this.cube0, this.vueBounding, Matrix.Identity());
// 			// 	final.addWindow('br', this.cube1, this.vueBounding, Matrix.Identity());
// 			// 	break;
// 			// }
// 			// case 'login': {
// 			// 	final.init(this.scene.getCameraByName('fieldCam') as Camera);
// 			// 	final.addWindow('register', this.cube1, this.vueBounding, Matrix.Identity());
// 			// 	break;
// 			// }
// 			// case 'register': {
// 			// 	final.init(this.scene.getCameraByName('fieldCam') as Camera);
// 			// 	final.addWindow('login', this.cube0, this.vueBounding, Matrix.Identity());
// 			//
// 			// 	break;
// 			// }
// 			// case 'test': {
// 			// 	final.init(this.scene.getCameraByName('br') as Camera);
// 			//
// 			// 	break;
// 			// }
// 			// case 'lobby': {
// 			// 	final.init(this.scene.getCameraByName('fieldCam') as Camera);
// 			// 	final.addWindow('back', this.cube1, this.vueBounding, Matrix.Identity());
// 			//
// 			// 	break;
// 			// }
// 			// case 'info': {
// 			// 	final.init(this.scene.getCameraByName("fieldCam") as Camera);
// 			// 	final.addWindow('user', this.cube0, this.vueBounding, Matrix.Identity());
// 			// 	final.addWindow('security', this.cube1, this.vueBounding, Matrix.Identity());
// 			//
// 			// 	break;
// 			// }
// 			// case 'game': {
// 			// 	final.init(this.scene.getCameraByName('pong') as Camera);
// 			// 	break;
// 			// }
//
// 		}
// 		return final;
// 	}
//
// 	private initCloudMaterial(ceil: number, dir: Vector2, size: number): ShaderMaterial {
// 		const mat = new ShaderMaterial("cloud", this.scene, 'cloud', {
// 			attributes: ["position", "uv"],
// 			uniforms: ["world", "worldView", "worldViewProjection", "view", "projection", "time", "direction", "ceil", "dir"],
// 			defines: [`#define SIZE ${size}.`]
// 		});
// 		mat.setFloat("ceil", ceil);
// 		mat.setVector2("dir", dir);
// 		return mat;
// 	}
//
// }
