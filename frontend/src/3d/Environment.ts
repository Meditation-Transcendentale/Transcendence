import { Scene } from "@babylonjs/core/scene"
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Gears } from "./Gears";
import { updateVues } from "../Vue";


export class Environment {
	private canvas: HTMLCanvasElement;
	private scene!: Scene;

	private camera!: ArcRotateCamera;

	private lastTime: number;
	private deltaTime: number;
	private frame: number;

	private gears!: Gears;

	constructor(engine: Engine, canvas: HTMLCanvasElement) {
		this.canvas = canvas;

		this.scene = new Scene(engine);
		this.scene.autoClear = true; // Color buffer
		this.scene.clearColor = new Color4(0., 0., 0., 1);

		this.scene.setRenderingAutoClearDepthStencil(0, true);


		window.addEventListener("keydown", (ev) => {
			// Alt+I
			//if (ev.altKey && (ev.key === "I" || ev.key === "i")) {
			//	if (this.scene.debugLayer.isVisible()) {
			//		//this.scene.debugLayer.hide();
			//	} else {
			//		this.scene.debugLayer.show();
			//	}
			//}

			//if (ev.key == 'Escape') {
			//	this.scene.setActiveCameraByName('home');
			//}
			//
			if (ev.key == ' ') {

				this.scene.setActiveCameraByName('menu');
			}
		});

		window.addEventListener('resize', () => {
			engine.resize();
		})

		this.lastTime = performance.now() * 0.001;
		this.deltaTime = 0;
		this.frame = 0;
		this.gears = new Gears(this.scene);

	}

	public async init() {

		this.camera = new ArcRotateCamera("camera", -Math.PI * 0.8, Math.PI * 0.4, 100, Vector3.Zero(), this.scene);
		this.camera.inertia = 0.8;
		this.camera.speed = 10;
		this.camera.rotation.set(0, Math.PI * 1.5, 0);
		this.camera.attachControl(this.canvas, true);
		this.camera.minZ = 0.1;

		await this.gears.load();

	}

	public render() {
		updateVues(frame);
		const time = performance.now() * 0.001;
		this.deltaTime = time - this.lastTime;
		this.lastTime = time;
		this.gears.update(this.deltaTime);
		this.scene.render();
		this.frame += 1;
	}

	public loadVue(vue: string): void {
		this.gears.loadVue(vue);
	}

	public unloadVue(vue: string): void {
		this.gears.unloadVue(vue);
	}

	public setVue(vue: string): void {
		this.gears.setVue(vue);
	}

	public dispose() {
		this.gears?.dispose();
		this.camera?.dispose();
		this.scene?.dispose();
	}
}
