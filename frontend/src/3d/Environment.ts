import {
	ArcRotateCamera,
	Color4,
	DirectionalLight,
	Engine,
	HemisphericLight,
	Scene,
	Vector3
} from "@babylonjs/core";
import { CubeCluster } from "./CubeCluster";


export class Environment {
	private canvas: HTMLCanvasElement;
	private scene!: Scene;

	private camera!: ArcRotateCamera;

	private cubeCluster!: CubeCluster;


	constructor(engine: Engine, canvas: HTMLCanvasElement) {
		this.canvas = canvas;

		this.scene = new Scene(engine);
		this.scene.autoClear = true; // Color buffer
		this.scene.clearColor = new Color4(0.02, 0., 0.1, 1);

		this.scene.setRenderingAutoClearDepthStencil(0, true);


		window.addEventListener("keydown", (ev) => {
			// Alt+I
			if (ev.altKey && (ev.key === "I" || ev.key === "i")) {
				if (this.scene.debugLayer.isVisible()) {
					this.scene.debugLayer.hide();
				} else {
					this.scene.debugLayer.show();
				}
			}
		});

		this.cubeCluster = new CubeCluster(this.scene);
	}

	public async init() {
		await this.cubeCluster.init();

		//this.camera = new FreeCamera("camera", new Vector3(20, 3, 0), this.scene);
		this.camera = new ArcRotateCamera("camera", -Math.PI * 0.8, Math.PI * 0.4, 10, Vector3.Zero(), this.scene);
		this.camera.inertia = 0.1;
		this.camera.rotation.set(0, Math.PI * 1.5, 0);
		this.camera.attachControl(this.canvas, true);
		const l = new DirectionalLight("light", new Vector3(1, 0, 0), this.scene);
		const hl = new HemisphericLight("hlight", new Vector3(0, 1, 0), this.scene);
		hl.intensity = 10.5;

	}

	public render() {
		this.scene.render();
	}

	private async load() {

	}

	private initSky() {

	}
}
