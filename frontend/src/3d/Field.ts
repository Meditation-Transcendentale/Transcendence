import {
	Camera, Color3, DirectionalLight, Texture,
	LoadAssetContainerAsync, Mesh, MeshBuilder, Scene, ShaderMaterial, StandardMaterial, Vector2, Vector3, Matrix,
	PostProcess,
} from "@babylonImport";
import { Vue } from "../Vue";
import "./Shader.ts";
import { Sun } from "./Sun";
import { Grass } from "./Grass";
import { Puddle } from "./Ground";
import { DitherMaterial } from "./Shader";
import { Butterfly } from "./Butterfly";
import { Portal } from "./Portal";



export class Field {
	private scene: Scene;
	private sunL!: DirectionalLight;
	private plane!: Mesh;
	private clouds: Mesh[];

	private sun: Sun;
	private grass: Grass;
	private ground: Puddle;
	private butterfly: Butterfly;
	private portal: Portal;

	private ditherMat!: DitherMaterial;
	private vueBounding!: Array<Vector3>;

	private cube0!: Mesh;
	private cube1!: Mesh;
	private cube2!: Mesh;

	public glitchPost!: PostProcess;
	public glitchOrigin: Vector3;


	constructor(scene: Scene) {
		this.scene = scene;
		this.sun = new Sun(scene);
		this.grass = new Grass(20);
		this.ground = new Puddle(scene, 100, 1);
		this.butterfly = new Butterfly(scene, this.ground.origin);
		this.portal = new Portal(scene);

		this.initVueBounding();
		this.glitchOrigin = new Vector3(0.);

		this.clouds = [];
	}

	public async load() {
		const mat = new StandardMaterial("white", this.scene);
		mat.wireframe = false;
		mat.diffuseColor = new Color3(1., 1, 1);

		this.ditherMat = new DitherMaterial("dither", this.scene);



		const loaded = await LoadAssetContainerAsync("/assets/field.glb", this.scene);
		loaded.addAllToScene();
		loaded.meshes.forEach((mesh) => {
			mesh.material = this.ditherMat;
			if (mesh.name === 'Cube' || mesh.name === "Cube.001" || mesh.name === "Cube.002") {
				mesh.material = new DitherMaterial("dither", this.scene);
			}
			// mesh.receiveShadows = true;
			// this.sun.shadow.addShadowCaster(mesh);
		})
		this.scene.setActiveCameraByName("fieldCam");
		let cam = this.scene.getCameraByName("fieldCam");
		cam?.position.set(-2, 4, 3);
		this.scene.activeCamera.parent = undefined;

		this.cube0 = this.scene.getMeshByName("Cube") as Mesh;
		this.cube1 = this.scene.getMeshByName("Cube.001") as Mesh;
		this.cube2 = this.scene.getMeshByName("Cube.002") as Mesh;

		this.ground.init();
		await this.butterfly.init();
		await this.grass.init(this.scene, this.ground.originGrass, this.butterfly.glowLayer);

		///////
		//
		///////
		const cub = MeshBuilder.CreateBox("tempo", { size: 2 });
		cub.refreshBoundingInfo();
		const bounding = new Array<Vector3>(8);
		const b = cub.getBoundingInfo().boundingBox.vectors;
		for (let i = 0; i < b.length; i++) {
			bounding[i] = b[i].clone().add(new Vector3(0, 1, -20));
		}
		console.log("bouding:", b);
		cub.dispose();

		Vue.addButterfly(this.butterfly.positions, 300, bounding);

		this.glitchPost = new PostProcess("glitch", "glitch", ["origin", "time", "ratio"], null, 1., cam);
		this.glitchPost.autoClear = true;
		Vue.refGlitch(this.glitchPost, this.glitchOrigin);
		this.glitchPost.onApply = (effect) => {
			effect.setVector3("origin", this.glitchOrigin);
			effect.setFloat("time", performance.now() * 0.001);
			effect.setFloat("ratio", window.innerWidth / window.innerHeight);
		}
	}

	private initVueBounding() {
		const cub = MeshBuilder.CreateBox("tempo", { size: 1 });
		cub.refreshBoundingInfo();
		this.vueBounding = new Array<Vector3>(8);
		const b = cub.getBoundingInfo().boundingBox.vectors;
		for (let i = 0; i < b.length; i++) {
			this.vueBounding[i] = (b[i].clone());
		}
		cub.dispose();
	}

	public update(time: number, deltaTime: number) {
		this.sun.update(time);
		this.grass.update(time, this.scene.activeCamera as Camera);
		this.ground.update(time);
		this.ditherMat.setFloat("time", time);
		(this.cube0.material as DitherMaterial).setFloat('time', time);
		(this.cube1.material as DitherMaterial).setFloat('time', time);
		(this.cube2.material as DitherMaterial).setFloat('time', time);
		this.butterfly.update(time, deltaTime);
	}

	public setVue(vue: string): Vue {
		const final = new Vue();
		switch (vue) {
			case 'play': {
				final.init(this.scene.getCameraByName('fieldCam') as Camera);
				final.addWindow('create', this.cube0, this.vueBounding, Matrix.Identity());
				final.addWindow('join', this.cube1, this.vueBounding, Matrix.Identity());
				break;
			}
			case 'home': {
				final.init(this.scene.getCameraByName('fieldCam') as Camera);
				final.addWindow('play', this.cube0, this.vueBounding, Matrix.Identity());
				final.addWindow('info', this.cube1, this.vueBounding, Matrix.Identity());
				final.addWindow('stats', this.cube2, this.vueBounding, Matrix.Identity());
				break;
			}
			case 'stats': {
				final.init(this.scene.getCameraByName('fieldCam') as Camera);
				final.addWindow('pong', this.cube0, this.vueBounding, Matrix.Identity());
				final.addWindow('br', this.cube1, this.vueBounding, Matrix.Identity());
				break;
			}
			case 'login': {
				final.init(this.scene.getCameraByName('fieldCam') as Camera);
				final.addWindow('register', this.cube1, this.vueBounding, Matrix.Identity());
				break;
			}
			case 'register': {
				final.init(this.scene.getCameraByName('fieldCam') as Camera);
				final.addWindow('login', this.cube0, this.vueBounding, Matrix.Identity());

				break;
			}
			case 'test': {
				final.init(this.scene.getCameraByName('br') as Camera);

				break;
			}
			case 'lobby': {
				final.init(this.scene.getCameraByName('fieldCam') as Camera);
				final.addWindow('back', this.cube1, this.vueBounding, Matrix.Identity());

				break;
			}
			case 'info': {
				final.init(this.scene.getCameraByName("fieldCam") as Camera);
				final.addWindow('user', this.cube0, this.vueBounding, Matrix.Identity());
				final.addWindow('security', this.cube1, this.vueBounding, Matrix.Identity());

				break;
			}
			case 'game': {
				final.init(this.scene.getCameraByName('pong') as Camera);
				break;
			}

		}
		return final;
	}

	private initCloudMaterial(ceil: number, dir: Vector2, size: number): ShaderMaterial {
		const mat = new ShaderMaterial("cloud", this.scene, 'cloud', {
			attributes: ["position", "uv"],
			uniforms: ["world", "worldView", "worldViewProjection", "view", "projection", "time", "direction", "ceil", "dir"],
			defines: [`#define SIZE ${size}.`]
		});
		mat.setFloat("ceil", ceil);
		mat.setVector2("dir", dir);
		return mat;
	}

}
