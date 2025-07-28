
import { Engine, Matrix } from "@babylonImport";

import { Environment } from "./Environment";
import { Vue } from "../Vue";

const handleSubmit = function(e: Event) {
	e.preventDefault();
	console.log(e.type);
}

class app3d {
	private canvas: HTMLCanvasElement;

	private engine: Engine;
	public environment: Environment;

	private fps: HTMLElement;

	private vues: Map<string, Vue>;
	private frame: number = 0;

	constructor() {
		console.log("eeeeee");

		this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
		this.canvas.focus();
		//
		this.engine = new Engine(this.canvas, true, {
			useHighPrecisionFloats: true,
			useHighPrecisionMatrix: true
		}, true); //antial, option, adpatToDeviceRAtio
		this.engine.setDepthBuffer(true);
		this.engine.setHardwareScalingLevel(1.0);
		//this.engine.useReverseDepthBuffee = true;
		//console.log(this.engine.getRenderWidth(), this.engine.getRenderHeight());
		//
		window.addEventListener('resize', () => {
			this.engine.resize(true);
		})

		this.environment = new Environment(this.engine, this.canvas);
		//
		this.fps = document.getElementById('fps') as HTMLElement;

		this.vues = new Map<string, Vue>;

	}


	public async init() {
		await this.environment.init();
	}


	public run() {
		this.engine.runRenderLoop(() => {
			this.environment.render();
			this.updateVues();

			this.fps.innerHTML = this.engine.getFps().toFixed();
			this.frame += 1;
		})
	}

	private updateVues() {
		for (let vue of this.vues.values()) {
			vue.update(this.frame);
		}
	}

	public dispose() {
		this.environment?.dispose();
		this.engine?.dispose();
	}

	public enableHome() {
		this.environment.enableHome();
	}

	public disableHome() {
		this.environment.disableHome();
	}


	public loadVue(vue: string) {
		this.vues.get(vue)?.enable();
	}


	public unloadVue(vue: string) {
		this.vues.get(vue)?.disable();
	}

	public setVue(vue: string) {
		if (!this.vues.has(vue)) {
			this.vues.set(vue, this.environment.setVue(vue));
		}
	}

	public getVue(vue: string): Vue | undefined {
		return this.vues.get(vue);
	}

	public get scene() {
		return this.environment.scene;
	}
}

export const App3D = new app3d();
