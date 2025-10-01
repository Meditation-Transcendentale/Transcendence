import { Color4, Engine, FreeCamera, Scene, Vector3 } from "../babylon";

class SceneManager {
	public engine: Engine;
	public scene: Scene;
	public css3dRenderer: any;

	private canvas: HTMLCanvasElement;
	private fps: HTMLElement;

	public camera: FreeCamera;

	public beforeRender: Set<any>;
	public time!: number;

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

		this.camera = new FreeCamera("camera", new Vector3(0, 6, 40), this.scene, true);
		this.camera.updateUpVectorFromRotation = true;

		this.beforeRender = new Set<any>;
		this.scene.onBeforeCameraRenderObservable.add(() => {
			this.update();
		});


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
	}

	public reset() { }

	public dispose() { }

	public async loadMandatory() {
	}

	private async loadAssets() { }
}

export const sceneManager = new SceneManager();
