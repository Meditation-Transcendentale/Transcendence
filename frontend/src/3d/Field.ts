import {
	Camera, Mesh, MeshBuilder, Scene,
	StandardMaterial, Vector3, FreeCamera,
	Color3,
	HemisphericLight,
	ShaderMaterial,
	EffectRenderer,
	Vector2,
	GlowLayer,
	DirectionalLight,
	SpotLight,
	RawTexture3D,
	Engine,
} from "@babylonImport";
import "./Shader/Shader.ts";
import { Grass } from "./Grass";
import { Pipeline } from "./Pipeline";
import { Monolith } from "./Monolith";
import { createTempleMonolith } from "./Builder";
import { Fog } from "./Fog";
import { Picker } from "./Picker";
import { UIaddDetails, UIaddSlider, UIaddToggle } from "./UtilsUI.js";
import { CameraUtils } from "./CameraUtils.js";
import { gTrackManager, SectionBezier, SectionManual, SectionStatic, Track } from "./TrackManager.js";
import { PelinWorley3D } from "./PerlinWorley.js";

export class Field {
	private scene: Scene;

	private camera: FreeCamera;

	private effectRenderer: EffectRenderer;
	private light: HemisphericLight;

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

	private toogleFog!: HTMLElement;
	private toogleGrass!: HTMLElement;

	private lowPerf: boolean;

	private trackTarget!: Track;
	private trackCamera!: Track;


	private spotLight: SpotLight;

	constructor(scene: Scene, camera: FreeCamera) {
		this.scene = scene;
		this.camera = camera;

		this.lowPerf = true;
		this.effectRenderer = new EffectRenderer(this.scene.getEngine());

		this.cursor = new Vector3();
		this.cursorMonolith = new Vector3();

		this.initUI();

		this.grass = new Grass(this.scene, 20);
		this.fog = new Fog(this.scene, this.camera, this.effectRenderer, 0.5);
		this.picker = new Picker(this.scene, this.camera, this.effectRenderer, new Vector3(0, 0.5, 0), new Vector2(40, 40));

		this.grass.ballPosition = this.picker.position;

		this.camera.setTarget(new Vector3(0, 6, 30))
		this.camera.rotation.y = Math.PI;
		this.camera.attachControl();
		this.camera.minZ = 0.01;
		// const light2 = new DirectionalLight("direclight", new Vector3(0, -0.2, -1), this.scene);
		this.light = new HemisphericLight("hemish", new Vector3(0, 1, 0), this.scene);
		this.light.intensity = 0.7;

		this.spotLight = new SpotLight("torche", this.camera.position, new Vector3(0, 0, -1), Math.PI * 0.3, 33, this.scene);

		UIaddSlider("light intensity", this.spotLight.intensity, {
			step: 0.1,
			min: 0.,
			max: 100
		}, (n: number) => { this.spotLight.intensity = n });
		UIaddSlider("hemis intensity", this.light.intensity, {
			step: 0.01,
			min: 0.,
			max: 1
		}, (n: number) => { this.light.intensity = n });

		UIaddSlider("light exponent", this.spotLight.exponent, {
			step: 0.1,
			min: 0.,
			max: 100
		}, (n: number) => { this.spotLight.exponent = n });

		// this.light.specular = Color3.Black();


		this.monolith = createTempleMonolith(scene, 15, this.cursorMonolith);
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

		for (let i = 0; i < this.grass._tiles.length; i++) {
			this.fog.addMeshToDepth(this.grass._tiles[i]._mesh, this.grass.grassDepthMaterial);
		}

		this.fog.addMeshToDepth(this.monolith.getMesh() as Mesh, this.monolith.depthMaterial);

		this.fog.addMeshToDepth(this.ground, this.defaultDepthMaterial);
		this.fog.addMeshToDepth(this.picker.mesh, this.defaultDepthMaterial);


		this.trackTarget = new Track(1.);
		this.trackTarget.addSection(new SectionStatic(3., new Vector3(0., 4, 0.)));


		this.trackCamera = new Track(1.);
		this.trackCamera.addSection(new SectionBezier(20, {
			origin: new Vector3(0, 2, 40),
			destination: new Vector3(10, 7, 18),
			control: new Vector3(-20, 0, 20),
			segments: 1000
		}))

		const data = PelinWorley3D(64);
		const tt = new RawTexture3D(
			data,
			64,
			64,
			64,
			Engine.TEXTUREFORMAT_R,
			this.scene,
			false,
			false,
			Engine.TEXTURE_NEAREST_SAMPLINGMODE,
			Engine.TEXTURETYPE_FLOAT
		);
		const b = MeshBuilder.CreateBox("test", { size: 2 });
		const m = new ShaderMaterial("test", this.scene, "texture3DCheck", {
			attributes: ["position", "normal", "uv"],
			uniforms: ["world", "viewProjection", "depth"],
			samplers: ["textureSampler"]
		})

		m.setTexture("textureSampler", tt);
		b.material = m;
		b.position.set(-5, 3, 0);

		UIaddSlider("depth", 0, {
			step: 0.01,
			min: 0,
			max: 1,
		}, (n: number) => { m.setFloat("depth", n) })
		const b2 = b.clone();
		b2.position.set(-7, 3, 0);
		b2.material = m;

	}

	public update(time: number, deltaTime: number) {
		if (this.active) {
			this.spotLight.direction = this.camera.getForwardRay().direction;
			// console.log(this.spotLight.direction);
			// this.spotLight.setDirectionToTarget(this.camera.getTarget());
			this.picker.render(deltaTime);
			this.grass.update(time, this.scene.activeCamera as Camera, this.picker.texture, this.picker.ballRadius);
			this.fog.render();
			this.monolith.update(time, this.camera);
		}
	}

	public setEnable(status: boolean) {
		//this.active = status;
	}

	public resize() {
		this.fog.resize();
	}

	public setVue(vue: string) {
		switch (vue) {
			case 'play': {
				this.camera.position.set(-13, 4, -7);
				this.camera.setTarget(new Vector3(20, 11, -8));
				this.setAllEnable(true);
				break;
			}
			case 'home': {
				this.camera.position.set(0, 5, 15);
				this.camera.setTarget(new Vector3(0, 7, 0));
				// gTrackManager.addTrack(this.trackCamera, (point: Vector3) => { this.camera.position.copyFrom(point); });
				// gTrackManager.addTrack(this.trackTarget, (point: Vector3) => { this.camera.setTarget(point) });
				// this.camera.update();
				this.light.isEnabled(true);
				// this.camera.getViewMatrix().fromArray(CameraUtils.LookAt(new Vector3(0, 5, 15), new Vector3(0, 7, 0), Vector3.Up()));
				this.setAllEnable(true);
				break;
			}
			case 'login': {
				this.camera.position.set(0, 4, 40);
				this.camera.setTarget(new Vector3(0, 6, 30));
				this.setAllEnable(true);
				break;
			}
			case 'register': {
				this.camera.position.set(0, 4, 40);
				this.camera.setTarget(new Vector3(0, 4, 30))
				this.setAllEnable(true);
				break;
			}
			case 'pongBR': {
				this.scene.activeCamera = this.scene.getCameraByName('br');
				this.scene.activeCamera?.attachControl();
				this.setAllEnable(false);

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
				this.setEnable(false);
				break;
			}
			case 'brick': {
				this.camera.position.set(0, 30, 0);
				this.camera.setTarget(new Vector3(0, 0, 0));
				this.setAllEnable(false);
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
			case 'monolith': {
				this.camera.detachControl();
				this.camera.position.set(0, 50, 0);
				this.camera.setTarget(new Vector3(0, 0, 0));
				this.grass.setEnable(false);
				this.setFogEnable(false);
				break;
			}
			case 'grass': {
				this.camera.detachControl();
				this.camera.position.set(0, 50, 0);
				this.camera.setTarget(new Vector3(0, 0, 0));
				this.monolith.setPicking(false);
				this.picker.setEnable(false);
				break;
			}
			case 'void': {
				this.camera.detachControl();
				this.camera.position.set(0, 50, 0);
				this.camera.setTarget(new Vector3(0, 0, 0));
				this.setAllEnable(false);
				break;
			}

		}
	}

	public setLowPerf() {
		this.toogleGrass.querySelector("input")!.checked = true;
		// this.toogleFog.querySelector("input")!.checked = false;
		// this.setFogEnable(false);
		this.grass.reduceGrass(true);
	}

	public setFogEnable(status: boolean) {
		this.fog.setEnabled(status);
		this.pipeline.setFogEnable(status);
	}

	public setLight(status: boolean) {
		// if (status == true)
		// this.light.intensity = 2.5;
		// else
		// this.light.intensity = 0;
	}

	public setAllEnable(status: boolean) {
		this.camera.attachControl();
		this.setFogEnable(status && this.toogleFog.querySelector("input")!.checked);
		this.picker.setEnable(status);
		this.monolith.setPicking(status);
		this.grass.setEnable(status);
		this.setLight(status)
		this.active = status;
	}

	public dispose() {
		this.effectRenderer.dispose();
		this.fog.dispose();
		this.pipeline.dispose();
		this.grass.dispose();
		this.picker.dispose();
	}

	private initUI() {
		// const details = UIaddDetails("--GENERAL");
		this.toogleFog = UIaddToggle("fog", true, {}, (n: boolean) => {
			this.fog.setEnabled(n);
			this.pipeline.setFogEnable(n);
		})
		this.toogleGrass = UIaddToggle("reduce grass", false, {}, (n: boolean) => {
			this.grass.reduceGrass(n);
		})

	}
}
