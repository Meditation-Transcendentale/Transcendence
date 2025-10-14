import { Engine, FreeCamera, Scene } from "../babylon";
import { stateManager } from "../state/StateManager";
import { CameraManager } from "./CameraManager";
import { Tracker } from "./Tracker";
import "./Shader/Shader.ts";
import { UBOManager } from "./UBOManager";
import { Butterfly } from "./Butterfly";
import { Grass } from "./Grass";
import { Fog } from "./Fog";
import { Css3dRenderer } from "./css3dRenderer";
import { LightManager } from "./LightsManager";
import { Assets } from "./Assets";
import { Picker } from "./Picker";
import { BallGrass } from "./BallGrass";

class SceneManager {
	public engine: Engine;
	public css3dRenderer!: Css3dRenderer;

	public canvas: HTMLCanvasElement;
	private fps: HTMLElement;

	public beforeRender: Set<any>;
	public time!: number;

	public assets: Assets;
	public tracker: Tracker;

	public cameraManager!: CameraManager;
	public uboManager!: UBOManager;
	public lightsManager!: LightManager;

	private butterfly!: Butterfly;
	private grass!: Grass;
	private fog!: Fog;
	private picker!: Picker;
	public ballGrass!: BallGrass;

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
		this.updateResolution();
		// this.engine.setHardwareScalingLevel(2.0);
		this.engine.getCaps().textureFloatRender = true;

		window.addEventListener('resize', () => {
			this.updateResolution();
			this.engine.resize(true);
			// this.environment.resize();
			// this.cssRenderer.resize(window.innerWidth, window.innerHeight)
		})

		this.fps = document.getElementById('fps') as HTMLElement;


		this.beforeRender = new Set<any>;


		this.assets = new Assets(this.engine);
		this.tracker = new Tracker();

		this.scene.onBeforeCameraRenderObservable.add(() => {
			this.update();
		});

	}

	public run() {
		this.engine.runRenderLoop(() => {
			this.scene.render();
		})
	}

	public update() {
		this.time = performance.now() * 0.001;
		this.fps.innerHTML = this.engine.getFps().toFixed();
		for (let i of this.beforeRender) {
			i();
		}
		this.lightsManager.update();
		// this.tracker.update(this.time, this.scene.deltaTime * 0.001);
		this.picker.update(this.time);
		this.ballGrass.update(this.time, this.scene.deltaTime * 0.001);
		this.css3dRenderer.update();
		this.grass.update(this.time);
		this.butterfly.update(this.time, this.scene.deltaTime * 0.001);

		this.uboManager.update();
		this.fog.render();
	}

	public reset() { }



	public async loadMandatory() {

		await this.assets.loadMandatory()
		this.cameraManager = new CameraManager(this.assets);
		this.css3dRenderer = new Css3dRenderer(this.assets);
		this.uboManager = new UBOManager(this.assets);
		this.lightsManager = new LightManager(this.assets);

		this.butterfly = new Butterfly(this.assets);
		this.grass = new Grass(this.assets);
		this.fog = new Fog(this.assets);
		this.picker = new Picker(this.assets);
		this.ballGrass = new BallGrass(this.assets);

		this.initFogDepthTexture();


		window.addEventListener("resize", () => { this.resize() })
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

	public get scene(): Scene {
		return this.assets.scene;
	}

	public get camera(): FreeCamera {
		return this.assets.camera;
	}

	public resize() {
		this.engine.resize(true);
		const fogMaxResolution = Math.min(1080, this.resolution.width);
		const fogRatio = stateManager.get("fogRatio");
		this.assets.fogRenderTexture.resize({
			width: fogMaxResolution * fogRatio,
			height: fogMaxResolution * fogRatio * this.resolutionRatio
		});
		this.assets.fogDepthTexture.resize({
			width: fogMaxResolution * fogRatio,
			height: fogMaxResolution * fogRatio * this.resolutionRatio
		});
		this.uboManager?.resize();
		this.css3dRenderer.resize();
	}

	public load(key: string) {
		switch (key) {
			case "auth": {
				this.grass.enable = false;
				this.butterfly.enable = false;
				this.butterfly.enable = false;
				this.ballGrass.updateType = "none";
				break;
			}
			case "home": {
				this.assets.grassRoot.scaling.y = 1;
				this.camera.attachControl();
				this.assets.ballRoot.setEnabled(true);
				this.assets.ballRoot.position.set(0, 0.25, 0);
				this.assets.hemisphericLight.setEnabled(true);
				this.assets.flashLight.range = 30;
				this.assets.hemisphericLight.intensity = 0.1;
				// this.assets.ballMesh.position.set(0, 0, 0);
				this.assets.ballRoot.scalingDeterminant = 1.5;
				this.picker.enable = true;
				this.grass.enable = true;
				this.assets.ballMesh.setEnabled(true);
				this.assets.groundMesh.setEnabled(true);
				this.butterfly.enable = true;
				this.ballGrass.updateType = "home";
				this.fog.enable = true;
				this.assets.monolithMesh.setEnabled(true);

				this.assets.monolithRoot.setEnabled(true);

				this.beforeRender.add(this.assets.monolithMovement);
				this.cameraManager.fogEnabled = true;
				this.assets.brRoot.setEnabled(false);
				this.assets.brickRoot.setEnabled(false);
				break;
			}
			case "void": {
				// this.camera.detachControl();
				this.picker.enable = false;
				this.grass.enable = false;
				this.assets.hemisphericLight.setEnabled(true);
				this.assets.ballMesh.setEnabled(true);
				this.assets.groundMesh.setEnabled(false);
				this.butterfly.enable = false;
				this.ballGrass.updateType = "none";
				this.fog.enable = false;
				this.assets.monolithRoot.setEnabled(false);
				this.assets.monolithRoot.position.set(0, 0, 0);
				this.beforeRender.delete(this.assets.monolithMovement);
				this.cameraManager.fogEnabled = false;
				this.assets.brRoot.setEnabled(false);
				this.assets.brickRoot.setEnabled(false);
				break;
			}
			case "grass": {
				// this.camera.detachControl();
				this.assets.grassRoot.scaling.y = 0.8;
				this.picker.enable = false;
				this.assets.flashLight.intensity = 1;
				this.assets.hemisphericLight.intensity = 1.5;
				this.assets.flashLight.range = 100;
				this.assets.hemisphericLight.setEnabled(true);
				this.assets.grassMaterial.specularColor.scaleInPlace(0.5)
				this.grass.enable = true;
				this.assets.ballMesh.setEnabled(true);
				this.assets.groundMesh.setEnabled(true);
				this.butterfly.enable = false;
				this.ballGrass.updateType = "pong";
				this.fog.enable = false;
				this.cameraManager.fogEnabled = false;
				this.assets.monolithRoot.setEnabled(false);
				this.assets.monolithRoot.position.set(0, 0, 0);
				this.beforeRender.delete(this.assets.monolithMovement);
				this.assets.brRoot.setEnabled(false);
				this.assets.brickRoot.setEnabled(false);
				break;
			}
			case "monolith": {
				// this.camera.detachControl();
				this.picker.enable = true;
				this.grass.enable = false;
				this.assets.ballMesh.setEnabled(true);
				this.assets.groundMesh.setEnabled(true);
				this.butterfly.enable = false;
				this.ballGrass.updateType = "none";
				this.fog.enable = false;
				this.assets.monolithMesh.setEnabled(true);
				this.assets.monolithRoot.setEnabled(true);
				this.beforeRender.delete(this.assets.monolithMovement);
				this.assets.monolithRoot.position.set(0, 0, 0);
				this.assets.hemisphericLight.setEnabled(true);
				// this.beforeRender.add(this.assets.monolithMovement);
				this.cameraManager.fogEnabled = false;
				this.assets.brRoot.setEnabled(false);
				this.assets.brickRoot.setEnabled(false);
				break;
			}
			case "brick": {
				// this.camera.detachControl();
				this.picker.enable = false;
				this.assets.hemisphericLight.setEnabled(true);
				this.grass.enable = false;
				this.assets.ballMesh.setEnabled(false);
				this.assets.groundMesh.setEnabled(false);
				this.butterfly.enable = false;
				this.ballGrass.updateType = "none";
				this.fog.enable = false;
				this.assets.monolithRoot.setEnabled(false);
				this.beforeRender.delete(this.assets.monolithMovement);
				this.assets.monolithRoot.position.set(0, 0, 0);
				this.cameraManager.fogEnabled = false;
				this.assets.brRoot.setEnabled(false);
				this.assets.brickRoot.setEnabled(true);
				break;
			}
			case "br": {
				// this.camera.detachControl();
				this.picker.enable = false;
				this.grass.enable = false;
				this.assets.ballMesh.setEnabled(false);
				this.assets.groundMesh.setEnabled(false);
				this.assets.hemisphericLight.setEnabled(false);
				this.butterfly.enable = false;
				this.ballGrass.updateType = "none";
				this.fog.enable = false;
				this.assets.monolithRoot.setEnabled(false);
				this.beforeRender.delete(this.assets.monolithMovement);
				this.assets.monolithRoot.position.set(0, 0, 0);
				this.cameraManager.fogEnabled = false;
				this.assets.brRoot.setEnabled(true);
				this.assets.brickRoot.setEnabled(false);
				break;
			}


		}
	}

	private initFogDepthTexture() {
		this.assets.fogDepthTexture.renderList!.push(this.assets.ballMesh);
		this.assets.fogDepthTexture.setMaterialForRendering(this.assets.ballMesh, this.assets.depthMaterial);

		this.assets.fogDepthTexture.renderList!.push(this.assets.groundMesh);
		this.assets.fogDepthTexture.setMaterialForRendering(this.assets.groundMesh, this.assets.depthMaterial);

		this.assets.fogDepthTexture.renderList!.push(this.assets.cubeMesh);
		this.assets.fogDepthTexture.setMaterialForRendering(this.assets.cubeMesh, this.assets.depthMaterial);

		this.assets.fogDepthTexture.renderList!.push(this.assets.monolithMesh);
		this.assets.fogDepthTexture.setMaterialForRendering(this.assets.monolithMesh, this.assets.monolithDepthMaterial)

		for (let i = 0; i < this.grass.tiles.length; i++) {
			const m = this.grass.tiles[i]._mesh;
			this.assets.fogDepthTexture.renderList!.push(m);
			this.assets.fogDepthTexture.setMaterialForRendering(m, this.assets.grassDepthMaterial);
		}
	}

	private updateResolution() {
		const scaleX = this.canvas.width / 1920;
		const scaleY = this.canvas.height / 1080;
		const scale = Math.max(scaleX, scaleY, 1);

		if (scale > 1)
			this.engine.setHardwareScalingLevel(scale);
	}
}

export const sceneManager = new SceneManager();
