import { Camera, Color3, Color4, EffectRenderer, Engine, FreeCamera, HemisphericLight, Light, LoadAssetContainerAsync, Mesh, MeshBuilder, RawTexture3D, RenderTargetTexture, Scene, ShaderMaterial, SpotLight, StandardMaterial, Texture, UniformBuffer, Vector2, Vector3, Vector4 } from "../babylon";
import { stateManager } from "../state/StateManager";
import { CameraManager } from "./CameraManager";
import { perlinWorley3D } from "./PerlinWorley";
import { Tracker } from "./Tracker";
import "./Shader/Shader.ts";
import { UBOManager } from "./UBOManager";
import { Butterfly } from "./Butterfly";
import { Grass } from "./Grass";
import { Fog } from "./Fog";
import { Css3dRenderer } from "./css3dRenderer";
import { LightManager } from "./LightsManager";

class SceneManager {
	public engine: Engine;
	public scene: Scene;
	public css3dRenderer!: Css3dRenderer;
	public effectRenderer: EffectRenderer;
	public camera: FreeCamera;

	private canvas: HTMLCanvasElement;
	private fps: HTMLElement;

	public beforeRender: Set<any>;
	public time!: number;

	public meshes: Map<string, Mesh>;
	public lights: Map<string, Light>;
	public textures: Map<string, Texture>;
	public ubos: Map<string, UniformBuffer>;

	public tracker: Tracker;

	public cameraManager!: CameraManager;
	public uboManager!: UBOManager;
	public lightsManager!: LightManager;

	private butterfly!: Butterfly;
	private grass!: Grass;
	private fog!: Fog;

	private depthMaterial!: ShaderMaterial;

	constructor() {
		console.log("%c SCENE Manager", "color: white; background-color: red");

		this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
		this.canvas.focus();


		this.engine = new Engine(this.canvas, true, {
			useHighPrecisionFloats: true,
			useHighPrecisionMatrix: true,
			antialias: true,
		}, true); //antial, option, adpatToDeviceRAtio
		this.engine.setDepthBuffer(true);
		// this.engine.setHardwareScalingLevel(2.0);
		this.engine.getCaps().textureFloatRender = true;

		window.addEventListener('resize', () => {
			this.engine.resize(true);
			// this.environment.resize();
			// this.cssRenderer.resize(window.innerWidth, window.innerHeight)
		})

		this.fps = document.getElementById('fps') as HTMLElement;

		this.scene = new Scene(this.engine);
		this.scene.autoClear = true; // Color buffer
		this.scene.clearColor = new Color4(0., 0., 0., 1);

		this.scene.setRenderingAutoClearDepthStencil(0, true);


		this.beforeRender = new Set<any>;
		this.scene.onBeforeCameraRenderObservable.add(() => {
			this.update();
		});

		this.meshes = new Map<string, Mesh>;
		this.lights = new Map<string, Light>;
		this.textures = new Map<string, Texture>;

		this.tracker = new Tracker();

		this.ubos = new Map<string, UniformBuffer>;

		this.effectRenderer = new EffectRenderer(this.engine);

		this.camera = new FreeCamera("camera", new Vector3(0, 6, 40), this.scene, true);
		this.camera.updateUpVectorFromRotation = true;
	}

	public run() {
		this.engine.runRenderLoop(() => {
			this.time = performance.now() * 0.001;
			this.scene.render();
		})
	}

	public update() {
		for (let i of this.beforeRender) {
			i();
		}
		this.lightsManager.update();
		this.tracker.update(this.time, this.scene.deltaTime * 0.001);

		this.css3dRenderer.update();
		this.grass.update(this.time);
		this.butterfly.update(this.time, this.scene.deltaTime * 0.001);
		this.fps.innerHTML = this.engine.getFps().toFixed();
		this.fog.render();
	}

	public reset() { }



	public async loadMandatory() {
		await this.loadAssets();

		this.cameraManager = new CameraManager();
		this.css3dRenderer = new Css3dRenderer();
		this.uboManager = new UBOManager();
		this.lightsManager = new LightManager();

		this.butterfly = new Butterfly();
		this.grass = new Grass();
		this.grass.reduceGrass(true);
		this.fog = new Fog();

		this.initFogDepthTexture();


		window.addEventListener("resize", () => { this.resize() })

	}

	public async loadAssets() {
		let loaded = await LoadAssetContainerAsync("/assets/grassLOD.glb", this.scene);
		loaded.meshes[2].name = "grassHigh";
		loaded.meshes[4].name = "grassLow";
		loaded.meshes[2].setEnabled(false);
		loaded.meshes[4].setEnabled(false);
		this.meshes.set("grassHigh", loaded.meshes[2] as Mesh);
		this.meshes.set("grassLow", loaded.meshes[4] as Mesh);
		this.scene.addMesh(loaded.meshes[2]);
		this.scene.addMesh(loaded.meshes[4]);

		loaded = await LoadAssetContainerAsync("/assets/butterfly2.glb", this.scene);
		loaded.meshes[1].name = "butterfly";
		loaded.meshes[1].setEnabled(false);
		this.meshes.set("butterfly", loaded.meshes[1] as Mesh);
		this.scene.addMesh(loaded.meshes[1]);

		const fogMaxResolution = 1080;
		const fogRatio = 0.5;
		stateManager.set("fogMaxResolution", fogMaxResolution);
		stateManager.set("fogRatio", fogRatio);
		{
			const text = new RenderTargetTexture("fogDepth", { width: fogMaxResolution * fogRatio, height: fogMaxResolution * fogRatio * this.resolutionRatio }, this.scene, {
				type: Engine.TEXTURETYPE_FLOAT,
				samplingMode: Engine.TEXTURE_BILINEAR_SAMPLINGMODE
			});
			text.renderList = [];
			text.clearColor = new Color4(1., 0., 0., 1.);
			this.textures.set("fogDepth", text);
		}
		{
			const text = new RawTexture3D(
				perlinWorley3D(64),
				64, 64, 64,
				Engine.TEXTUREFORMAT_R,
				this.scene,
				false,
				false,
				Engine.TEXTURE_BILINEAR_SAMPLINGMODE,
				Engine.TEXTURETYPE_FLOAT)
			this.textures.set("fogDensity", text);
		}
		{
			const text = new RenderTargetTexture("fog", { width: fogMaxResolution * fogRatio, height: fogMaxResolution * fogRatio * this.resolutionRatio }, this.scene, {
				format: Engine.TEXTUREFORMAT_RGBA,
				type: Engine.TEXTURETYPE_HALF_FLOAT,
				samplingMode: Engine.TEXTURE_BILINEAR_SAMPLINGMODE
			})
			this.textures.set("fog", text);
		}

		this.ubos.set("camera", new UniformBuffer(this.engine));
		this.ubos.set("fogData", new UniformBuffer(this.engine));
		this.ubos.set("fogLights", new UniformBuffer(this.engine));

		{
			const b = MeshBuilder.CreateSphere("ball", { diameter: 1 }, this.scene);
			b.setEnabled(false);
			const m = new ShaderMaterial("picker ball", this.scene, "oneColor", {
				attributes: ["position"],
				uniforms: ["world", "viewProjection", "color"]
			})
			b.material = m;
			m.alphaMode = Engine.ALPHA_DISABLE;
			this.meshes.set("ball", b);
			const c = Color3.FromHexString("#3b3d7d");
			const v = new Vector3(c.r, c.g, c.b);
			v._isDirty = true;
			this.tracker.add("ballColor", v);
			this.tracker.track("ballColor", (color: Vector3) => {
				if (!color._isDirty)
					return;
				(b.material as ShaderMaterial).setVector4("color", new Vector4(color.x, color.y, color.z, 0.2));
				color._isDirty = false;
			});
		}

		{
			const b = MeshBuilder.CreateGround("ground", { width: 200, height: 200 }, this.scene);
			const m = new StandardMaterial("ground", this.scene);
			m.diffuseColor = Color3.Black();
			m.disableLighting = true;
			b.setEnabled(false);
			b.material = m;
			this.meshes.set("ground", b);
		}

		this.depthMaterial = new ShaderMaterial("defaultDepth", this.scene, "defaultDepth", {
			attributes: ['position'],
			uniforms: ["world", "viewProjection", "depthValues"]
		})
		this.depthMaterial.onBindObservable.add(() => {
			this.depthMaterial.setVector2("depthValues", new Vector2(this.camera.minZ, this.camera.maxZ));
		})

		{
			const l = new SpotLight("torche", this.camera.position, new Vector3(0, 0, -1), Math.PI * 0.5, 10, this.scene);
			l.range = 30.;
			l.specular.scaleInPlace(6.);
			l.intensity = 2.7;
			this.lights.set("torche", l);
		}


	}

	public async loadAssetsAsync() { }

	public dispose() { }

	public get resolution(): { width: number, height: number } {
		return {
			width: this.engine.getRenderWidth(),
			height: this.engine.getRenderHeight()
		};
	}

	public get resolutionRatio(): number {
		return this.engine.getRenderHeight() / this.engine.getRenderWidth();
	}

	public resize() {
		this.engine.resize(true);
		const fogMaxResolution = stateManager.get("fogMaxResolution") as number;
		const fogRatio = stateManager.get("fogRatio") as number;
		(this.textures.get("fog") as RenderTargetTexture)?.resize({
			width: fogMaxResolution * fogRatio * this.resolutionRatio,
			height: fogMaxResolution * fogRatio
		});
		(this.textures.get("fogDepth") as RenderTargetTexture)?.resize({
			width: fogMaxResolution * fogRatio * this.resolutionRatio,
			height: fogMaxResolution * fogRatio
		});
		this.uboManager?.resize();
	}

	public load(key: string) {
		switch (key) {
			case "auth": {
				this.grass.enable = false;
				this.butterfly.enable = false;
				this.butterfly.enable = false;
				break;
			}
			case "home": {
				this.camera.attachControl();
				this.grass.enable = true;
				this.meshes.get("ball")?.setEnabled(true);
				this.meshes.get("ground")?.setEnabled(true);
				this.butterfly.enable = true;
				this.fog.enable = true;
				break;
			}
		}
	}

	private initFogDepthTexture() {
		const depth = this.textures.get("fogDepth") as RenderTargetTexture;
		{
			const m = this.meshes.get("ball") as Mesh;
			depth.renderList!.push(m);
			depth.setMaterialForRendering(m, this.depthMaterial);
		}
		{
			const m = this.meshes.get("ground") as Mesh;
			depth.renderList!.push(m);
			depth.setMaterialForRendering(m, this.depthMaterial);
		}
		for (let i = 0; i < this.grass.tiles.length; i++) {
			const m = this.grass.tiles[i]._mesh;
			depth.renderList!.push(m);
			depth.setMaterialForRendering(m, this.grass.depthMaterial);
		}

	}

}

export const sceneManager = new SceneManager();
