import {
	Camera, Color3, DirectionalLight, Texture,
	LoadAssetContainerAsync, Mesh, MeshBuilder, Scene, ShaderMaterial, StandardMaterial, Vector2, Vector3,
	VolumetricLightScatteringPostProcess,
} from "@babylonImport";
import { Vue } from "../Vue";
import "./Shader.ts";
import { Sun } from "./Sun";
import { Grass } from "./Grass";



export class Field {
	private scene: Scene;
	private sunL!: DirectionalLight;
	private plane!: Mesh;
	private clouds: Mesh[];

	private sun: Sun;
	private grass: Grass;

	constructor(scene: Scene) {
		this.scene = scene;
		this.sun = new Sun(scene);
		this.grass = new Grass(10);

		this.clouds = [];
	}

	public async load() {
		const loaded = await LoadAssetContainerAsync("/assets/field.glb", this.scene);
		loaded.addAllToScene();
		this.scene.setActiveCameraByName("fieldCam");

		this.sunL = new DirectionalLight('sun', new Vector3(-1, -1, -1), this.scene);
		this.sunL.intensity = 5;

		this.plane = MeshBuilder.CreateGround("plane", {
			width: 20,
			height: 20,
			subdivisions: 100
		}, this.scene)
		this.plane.position.z = -10;

		const mat = new StandardMaterial("plane", this.scene);
		mat.wireframe = true;
		mat.diffuseColor = new Color3(0.3, 0.3, 0.3);
		this.plane.material = mat;

		await this.grass.init(this.scene);

		// const vls = new VolumetricLightScatteringPostProcess("vls",
		// 	{ postProcessRatio: 1, passRatio: 0.5 },
		// 	this.scene.getCameraByName("fieldCam"),
		// 	this.scene.getMeshByName("sunShell") as Mesh,
		// 	40,
		// 	Texture.NEAREST_SAMPLINGMODE,
		// 	this.scene.getEngine(),
		// 	false);
		// vls.exposure = 0.2;
		// vls.decay = 0.91815;
		// vls.weight = 0.88767;
		// vls.density = 0.926;

	}

	public update(time: number) {
		this.sun.update(time);
		this.grass.update(time, this.scene.activeCamera as Camera)
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
