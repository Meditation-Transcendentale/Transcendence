import {
	Camera, Color3, DirectionalLight, Texture,
	LoadAssetContainerAsync, Mesh, MeshBuilder, Scene, ShaderMaterial, StandardMaterial, Vector2, Vector3,
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


	constructor(scene: Scene) {
		this.scene = scene;
		this.sun = new Sun(scene);
		this.grass = new Grass(20);
		this.ground = new Puddle(scene, 100, 1);
		this.butterfly = new Butterfly(scene, this.ground.origin);
		this.portal = new Portal(scene);


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
			// mesh.receiveShadows = true;
			// this.sun.shadow.addShadowCaster(mesh);
		})
		this.scene.setActiveCameraByName("fieldCam");
		this.scene.activeCamera.parent = undefined;

		// this.sunL = new DirectionalLight('sun', new Vector3(-1, -1, -1), this.scene);
		// this.sunL.intensity = 5;
		//
		// this.plane = MeshBuilder.CreateGround("plane", {
		// 	width: 500,
		// 	height: 500,
		// }, this.scene)
		// this.plane.position.z = -20;
		// this.plane.position.y = 0.1;


		this.ground.init();
		await this.butterfly.init();
		await this.grass.init(this.scene, this.ground.originGrass, this.butterfly.glowLayer);




	}

	public update(time: number, deltaTime: number) {
		this.sun.update(time);
		this.grass.update(time, this.scene.activeCamera as Camera);
		this.ground.update(time);
		this.ditherMat.setFloat("time", time);
		this.butterfly.update(time, deltaTime);
	}

	public setVue(vue: string): Vue {
		const final = new Vue();
		switch (vue) {
			case 'play': {
				final.init(this.scene.getCameraByName('fieldCam') as Camera);
				break;
			}
			case 'home': {
				final.init(this.scene.getCameraByName('fieldCam') as Camera);
				break;
			}
			case 'stats': {
				final.init(this.scene.getCameraByName('fieldCam') as Camera);
				break;
			}
			case 'login': {
				final.init(this.scene.getCameraByName('fieldCam') as Camera);
				break;
			}
			case 'register': {
				final.init(this.scene.getCameraByName('fieldCam') as Camera);
				break;
			}
			case 'test': {
				final.init(this.scene.getCameraByName('br') as Camera);
				break;
			}
			case 'lobby': {
				final.init(this.scene.getCameraByName('fieldCam') as Camera);
				break;
			}
			case 'info': {
				final.init(this.scene.getCameraByName("fieldCam") as Camera);
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
