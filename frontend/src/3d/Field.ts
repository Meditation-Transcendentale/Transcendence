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
import { UIaddColor, UIaddDetails, UIaddSlider, UIaddToggle } from "./UtilsUI.js";
import { CameraUtils } from "./CameraUtils.js";
import { gTrackManager, SectionBezier, SectionManual, SectionStatic, Track } from "./TrackManager.js";
import { PelinWorley3D } from "./PerlinWorley.js";
import { Butterfly } from "./Butterfly.js";
import { SpaceSkybox } from "../pongbr/templates/skybox.js";

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
	private butterfly: Butterfly;

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


		this.grass = new Grass(this.scene, 20);
		this.fog = new Fog(this.scene, this.camera, this.effectRenderer, 0.5);
		this.picker = new Picker(this.scene, this.camera, this.effectRenderer, new Vector3(0, 0.5, 0), new Vector2(40, 40));

		this.grass.ballPosition = this.picker.position;
		this.grass.ballLightColor = this.picker.ballLightColor;

		this.camera.setTarget(new Vector3(0, 6, 30))
		this.camera.rotation.y = Math.PI;
		this.camera.attachControl();
		this.camera.minZ = 0.1;
		// this.camera.maxZ = 100;
		// const light2 = new DirectionalLight("direclight", new Vector3(0, -0.2, -1), this.scene);
		this.light = new HemisphericLight("hemish", new Vector3(0, 1, 0), this.scene);
		this.light.intensity = 0.1;

		this.spotLight = new SpotLight("torche", this.camera.position, new Vector3(0, 0, -1), Math.PI * 0.5, 10, this.scene);
		// this.spotLight = new SpotLight("torche", new Vector3(), new Vector3(0, 0, -1), Math.PI * 0.5, 10, this.scene);
		this.spotLight.range = 30.;
		this.spotLight.specular.scaleInPlace(6.);
		this.spotLight.intensity = 2.7;


		// this.light.specular = Color3.Black();



		this.monolith = createTempleMonolith(scene, 15, this.cursorMonolith);
		this.monolith.enableShaderAnimation(true);
		this.monolith.setAnimationSpeed(4.);
		this.monolith.setAnimationIntensity(0.5);
		this.active = true;

		this.grass.depth = this.fieldDepth;

		this.pipeline = new Pipeline(this.scene, this.camera, this.fog.texture);


		this.ground = MeshBuilder.CreateGround("ground", { width: 300, height: 300 }, this.scene);
		const m = new StandardMaterial("ground", this.scene);
		m.diffuseColor = Color3.Black();
		m.specularColor = Color3.Black();
		this.ground.material = m;
		// this.ground.setEnabled(false);

		this.defaultDepthMaterial = new ShaderMaterial("defaultDepth", this.scene, "defaultDepth", {
			attributes: ['position'],
			uniforms: ["world", "viewProjection", "depthValues"]
		})

		this.butterfly = new Butterfly(this.scene);

		this.initUI();
		// this.skybox = new SpaceSkybox(this.scene);

	}

	public async load() {
		await this.grass.init();
		await this.monolith.init();
		await this.butterfly.init();

		// this.skybox.applyPreset("Classic");

		for (let i = 0; i < this.grass._tiles.length; i++) {
			this.fog.addMeshToDepth(this.grass._tiles[i]._mesh, this.grass.grassDepthMaterial);
		}

		this.fog.addMeshToDepth(this.monolith.getMesh() as Mesh, this.monolith.depthMaterial);
		this.fog.addMeshToDepth(this.monolith.getMeshCube() as Mesh, this.defaultDepthMaterial);


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

		// this.fog.ballLightRadius = this.picker.ballRadius;
		// this.fog.ballLightColor = this.picker.ballLightColor;
		// this.fog.ballPosition = this.picker.position;
		//
		// this.fog.setSpotLight(this.spotLight);

		// layout(std140) uniform lights {
		// 	float	spotIntensity;
		// 	float	spotRange;
		// 	float	spotAngle;
		// 	float	spotExp;
		// 	float	pointAIntensity;
		// 	float	pointARange;
		// 	float	pointBIntensity;
		// 	float	pointBRange;
		// 	vec3	spotColor;
		// 	vec3	spotPosition;
		// 	vec3	spotDirection;
		// 	vec3	pointAColor;
		// 	vec3	pointAPosition;
		// 	vec3	pointBColor;
		// 	vec3	pointBPosition;
		// };
		const ubo = this.fog.lightsUbo;
		ubo.updateFloat("spotIntensity", this.spotLight.intensity);
		ubo.updateFloat("spotRange", this.spotLight.range);
		ubo.updateFloat("spotAngle", Math.cos(this.spotLight.angle));
		ubo.updateFloat("spotExp", this.spotLight.exponent);
		ubo.updateFloat("pointAIntensity", this.picker.light.intensity);
		ubo.updateFloat("pointARange", this.picker.light.range);
		ubo.updateFloat("pointBIntensity", this.monolith.light.intensity);
		ubo.updateFloat("pointBRange", this.monolith.light.range);
		ubo.updateColor3("spotColor", this.spotLight.diffuse);
		ubo.updateVector3("spotPosition", this.spotLight.position);
		ubo.updateVector3("spotDirection", this.spotLight.direction);
		ubo.updateColor3("pointAColor", this.picker.ballLightColor);
		ubo.updateVector3("pointAPosition", this.picker.light.position);
		ubo.updateColor3("pointBColor", this.monolith.light.diffuse);
		ubo.updateVector3("pointBPosition", this.monolith.light.position);

	}

	public update(time: number, deltaTime: number) {
		if (this.active) {
			this.spotLight.direction = this.camera.getForwardRay().direction;
			this.spotLight.direction.normalize();
			// this.spotLight.position.copyFrom(this.camera.position).addInPlaceFromFloats(0, 5, 0);
			// this.spotLight.setDirectionToTarget(this.camera.getForwardRay().direction.scaleInPlace(3).addInPlace(this.camera.position))

			// console.log(this.spotLight.direction);
			// this.spotLight.setDirectionToTarget(this.camera.getTarget());
			this.picker.render(deltaTime);
			this.monolith.update(time, this.camera);
			this.grass.update(time, this.scene.activeCamera as Camera, this.picker.texture, this.picker.ballRadius);
			this.butterfly.update(time, deltaTime);

			this.fog.lightsUbo.updateVector3("pointAPosition", this.picker.position);
			this.fog.lightsUbo.updateVector3("pointBPosition", this.monolith.light.position);
			this.fog.lightsUbo.updateVector3("spotPosition", this.spotLight.position);
			this.fog.lightsUbo.updateVector3("spotDirection", this.spotLight.direction);
			this.fog.render();
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
				this.setLight(false)

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
				console.log("case grass");
				// this.camera.detachControl();
				this.camera.position.set(0, 50, 0);
				this.camera.setTarget(new Vector3(0, 0, 0));
				this.monolith.setPicking(false);
				this.picker.setEnable(false);
				this.setLight(true);
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
		this.setLight(true)
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
		const misc = document.querySelector("#misc-details");
		this.toogleFog = UIaddToggle("fog", true, { div: misc }, (n: boolean) => {
			this.fog.setEnabled(n);
			this.pipeline.setFogEnable(n);
		})
		this.toogleGrass = UIaddToggle("reduce grass", false, { div: misc }, (n: boolean) => {
			this.grass.reduceGrass(n);
		})
		const flashlight = UIaddDetails("flash light", document.querySelector("#lights-details"));
		UIaddSlider("intensity", this.spotLight.intensity, {
			step: 0.1,
			min: 0.,
			max: 30,
			div: flashlight
		}, (n: number) => {
			this.spotLight.intensity = n;
			this.fog.lightsUbo.updateFloat("spotIntensity", n)
		});
		UIaddSlider("exponent", this.spotLight.exponent, {
			step: 0.1,
			min: 0.,
			max: 100,
			div: flashlight
		}, (n: number) => {
			this.spotLight.exponent = n;
			this.fog.lightsUbo.updateFloat("spotExp", n);
		});
		UIaddColor("color", this.spotLight.diffuse, {
			div: flashlight
		}, () => {
			this.fog.lightsUbo.updateColor3("spotColor", this.spotLight.diffuse);
		})
		const balllight = UIaddDetails("ball light", document.querySelector("#lights-details"));
		UIaddSlider("intensity", this.picker.light.intensity, {
			step: 0.1,
			min: 0.,
			max: 10,
			div: balllight
		}, (n: number) => {
			this.picker.light.intensity = n;
			this.fog.lightsUbo.updateFloat("pointAIntensity", n)
		});
		UIaddSlider("range", this.picker.light.range, {
			step: 0.1,
			min: 0.,
			max: 10,
			div: balllight
		}, (n: number) => {
			this.picker.light.range = n;
			this.fog.lightsUbo.updateFloat("pointARange", n);
		});
		UIaddColor("color", this.picker.light.diffuse, {
			div: balllight
		}, () => {
			this.picker.updateBallColor();
			this.fog.lightsUbo.updateColor3("pointAColor", this.picker.light.diffuse);
		})

		const cubelight = UIaddDetails("cube light", document.querySelector("#lights-details"));
		UIaddSlider("intensity", this.monolith.light.intensity, {
			step: 0.1,
			min: 0.,
			max: 10,
			div: cubelight
		}, (n: number) => {
			this.monolith.light.intensity = n;
			this.fog.lightsUbo.updateFloat("pointBIntensity", n)
		});
		UIaddSlider("range", this.monolith.light.range, {
			step: 0.1,
			min: 0.,
			max: 10,
			div: cubelight
		}, (n: number) => {
			this.monolith.light.range = n;
			this.fog.lightsUbo.updateFloat("pointBRange", n);
		});
		UIaddColor("color", this.monolith.light.diffuse, {
			div: cubelight
		}, () => {
			this.fog.lightsUbo.updateColor3("pointBColor", this.monolith.light.diffuse);
		})

		UIaddSlider("hemis intensity", this.light.intensity, {
			step: 0.01,
			min: 0.,
			max: 1,
			div: document.querySelector("#lights-details")
		}, (n: number) => { this.light.intensity = n });
	}
}
