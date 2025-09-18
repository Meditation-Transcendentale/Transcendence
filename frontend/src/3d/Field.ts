import {
	Camera, Mesh, MeshBuilder, Scene,
	StandardMaterial, Vector3, FreeCamera,
	Color3,
	HemisphericLight,
	ShaderMaterial,
	EffectRenderer,
	Vector2,
} from "@babylonImport";
import "./Shader/Shader.ts";
import { Grass } from "./Grass";
import { Pipeline } from "./Pipeline";
import { Monolith } from "./Monolith";
import { createTempleMonolith } from "./Builder";
import { Fog } from "./Fog";
import { Picker } from "./Picker";
import { UIaddToggle } from "./UtilsUI.js";

export class Field {
	private scene: Scene;

	private camera: FreeCamera;

	private effectRenderer: EffectRenderer;

	private grass: Grass;
	private fog: Fog;
	private monolith: Monolith;
	private pipeline: Pipeline;
	private picker: Picker;

	private cursor: Vector3;
	private cursorMonolith: Vector3;

	public fieldDepth = 0;

	private active: boolean;

	private ground: Mesh;

	private defaultDepthMaterial: ShaderMaterial;

	constructor(scene: Scene, camera: FreeCamera) {
		this.scene = scene;
		this.camera = camera;

		this.effectRenderer = new EffectRenderer(this.scene.getEngine());

		this.cursor = new Vector3();
		this.cursorMonolith = new Vector3();


		this.grass = new Grass(this.scene, 20, this.cursor);
		this.fog = new Fog(this.scene, this.camera, this.effectRenderer, 0.5);
		this.picker = new Picker(this.scene, this.camera, this.effectRenderer, new Vector3(0, 1, 0), new Vector2(80, 80));

		this.camera.setTarget(new Vector3(0, 6, 30))
		this.camera.rotation.y = Math.PI;
		this.camera.attachControl();
		this.camera.minZ = 0.01;
		let hemish = new HemisphericLight("hemish", new Vector3(0, 1, 0), this.scene);
		hemish.intensity = 2.5;


		this.monolith = createTempleMonolith(scene, 10, this.cursorMonolith);
		this.monolith.enableShaderAnimation(true);
		this.monolith.setAnimationSpeed(4.);
		this.monolith.setAnimationIntensity(0.5);
		this.monolith.addText('play', "PLAY", 0, 7.1, 1.7, 2.0);
		this.monolith.addText('create', "CREATE", 2., 7.5, 0., 2.0);
		this.monolith.addText('join', "JOIN", -1.9, 5.5, 0., 2.0);
		this.monolith.setTextFace('create', 'left');
		this.monolith.setTextFace('join', 'left');
		this.monolith.setTextFace('play', 'front');

		this.active = true;

		this.grass.depth = this.fieldDepth;

		this.pipeline = new Pipeline(this.scene, this.camera, this.fog.texture);


		this.ground = MeshBuilder.CreateGround("ground", { width: 300, height: 300 }, this.scene);
		const m = new StandardMaterial("ground", this.scene);
		m.diffuseColor = Color3.Black();
		m.specularColor = Color3.Black();
		this.ground.material = m;

		this.defaultDepthMaterial = new ShaderMaterial("defaultDepth", this.scene, "defaultDepth", {
			attributes: ['position'],
			uniforms: ["world", "viewProjection", "depthValues"]
		})

	}

	public async load() {
		await this.grass.init();
		await this.monolith.init();

		window.addEventListener("mousemove", (ev) => {
			const ray = this.scene.createPickingRay(ev.clientX, ev.clientY).direction;
			let delta = Math.abs(this.camera.position.y + this.fieldDepth - 1) / ray.y;

			this.cursor.x = this.camera.position.x - ray.x * delta;
			this.cursor.y = this.camera.position.z - ray.z * delta;
			this.cursor.z = performance.now() * 0.001;
		})

		for (let i = 0; i < this.grass._tiles.length; i++) {
			this.fog.addMeshToDepth(this.grass._tiles[i]._mesh, this.grass.grassDepthMaterial);
		}

		this.fog.addMeshToDepth(this.monolith.getMesh() as Mesh, this.monolith.depthMaterial);

		this.fog.addMeshToDepth(this.ground, this.defaultDepthMaterial);
		this.fog.addMeshToDepth(this.picker.mesh, this.defaultDepthMaterial);

		UIaddToggle("fog", true, {}, (n: boolean) => {
			this.fog.setEnabled(n);
			this.pipeline.setFogEnable(n);
		})
		UIaddToggle("reduce grass", false, {}, (n: boolean) => {
			this.grass.reduceGrass(n);
		})
	}

	public update(time: number, deltaTime: number) {
		if (this.active) {
			this.picker.render();
			this.grass.update(time, this.scene.activeCamera as Camera, this.picker.texture);
			this.fog.render();
			this.monolith.update(time, this.camera);
		}
	}

	public setEnable(status: boolean) {
		this.active = status;
	}

	public resize() {
		this.fog.resize();
	}

	public setVue(vue: string) {
		switch (vue) {
			case 'play': {
				this.camera.position.set(-13, 4, -7);
				this.camera.setTarget(new Vector3(20, 11, -8));
				this.monolith.setPicking(true);
				this.setEnable(true);
				break;
			}
			case 'home': {
				this.camera.position.set(0, 5, 15);
				this.camera.setTarget(new Vector3(0, 7, 0));
				this.active = true;
				this.monolith.setPicking(true);
				this.setEnable(true);
				break;
			}
			case 'login': {
				this.camera.position.set(0, 4, 40);
				this.camera.setTarget(new Vector3(0, 6, 30));
				this.setEnable(true);
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
				this.active = false;
				this.setEnable(false);
				break;
			}
			case 'lobby': {
				this.camera.position.set(0, 4, -30);
				this.camera.setTarget(new Vector3(0, 9, -40));

				break;
			}
			case 'game': {
				this.camera.detachControl();
				this.camera.position.set(0, 50, 0);
				this.camera.setTarget(new Vector3(0, 0, 0));
				this.active = false;
				this.setEnable(false);
				break;
			}
			case 'brick': {
				this.camera.position.set(0, 30, 0);
				this.camera.setTarget(new Vector3(0, 0, 0));
				this.setEnable(false);
				this.monolith.setPicking(false);
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
			case 'tournament': {
				this.camera.position.set(-13, 4, -7);
				this.camera.setTarget(new Vector3(20, 11, -8));
				this.monolith.setPicking(true);
				//this.setEnable(true);
				break;
			}
		}
	}

	public lowPerf() {
		this.fog.setEnabled(false);
		this.pipeline.setFogEnable(false);
		this.grass.reduceGrass(true);
	}


	public dispose() {
		this.effectRenderer.dispose();
		this.fog.dispose();
		this.pipeline.dispose();
		this.grass.dispose();
		this.picker.dispose();
	}
}
