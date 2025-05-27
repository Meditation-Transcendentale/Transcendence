import {
	ArcRotateCamera,
	Color4,
	DirectionalLight,
	Engine,
	HemisphericLight,
	Matrix,
	Scene,
	Vector3
} from "@babylonjs/core";
import { CubeCluster } from "./CubeCluster";


export class Environment {
	private canvas: HTMLCanvasElement;
	private scene!: Scene;

	private camera!: ArcRotateCamera;

	private cubeCluster!: CubeCluster;
	private lastTime: number;
	private deltaTime: number;
	private frame: number;


	private play: HTMLElement;


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
		this.lastTime = performance.now() * 0.001;
		this.deltaTime = 0;
		this.play = document.querySelector("#play") as HTMLElement;
		this.frame = 0;
	}

	public async init() {
		await this.cubeCluster.init();

		//this.camera = new FreeCamera("camera", new Vector3(20, 3, 0), this.scene);
		this.camera = new ArcRotateCamera("camera", -Math.PI * 0.8, Math.PI * 0.4, 10, Vector3.Zero(), this.scene);
		this.camera.inertia = 0.1;
		this.camera.rotation.set(0, Math.PI * 1.5, 0);
		this.camera.attachControl(this.canvas, true);
		const l = new DirectionalLight("light", new Vector3(0, 1, 0), this.scene);
		const hl = new HemisphericLight("hlight", new Vector3(1, 0, 0), this.scene);
		hl.intensity = 0.5;

	}

	public render() {
		if (!this.frame) { this.updateCss(); }
		const time = performance.now() * 0.001;
		this.deltaTime = time - this.lastTime;
		this.lastTime = time;
		this.cubeCluster.update(this.deltaTime);
		this.scene.render();
		this.frame += 1;
		this.frame %= 2;
	}

	private updateCss() {
		const proj = this.cubeCluster.getSPC();

		this.play.style.top = `${proj[1] * 100}%`;
		this.play.style.left = `${proj[0] * 100}%`;
		this.play.style.width = `${(proj[2] - proj[0]) * 100}%`;
		this.play.style.height = `${(proj[3] - proj[1]) * 100}%`;
	}

	private async load() {

	}

	private initSky() {

	}
}
