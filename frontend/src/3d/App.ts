
import { Engine } from "@babylonImport";

import { Environment } from "./Environment";
import { homeVue, lobbyVue, loginVue, playVue, registerVue, statsVue, testVue, Vue } from "../Vue";

const handleSubmit = function(e: Event) {
	e.preventDefault();
	console.log(e.type);
}

class app3d {
	private canvas: HTMLCanvasElement;

	private engine: Engine;
	public environment: Environment;

	private fps: HTMLElement;



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

	}


	public async init() {
		await this.environment.init();
	}


	public run() {
		this.engine.runRenderLoop(() => {
			this.environment.render();

			this.fps.innerHTML = this.engine.getFps().toFixed();//(this.instru.gpuFrameTimeCounter.current * 0.000001).toFixed(2);
		})
	}

	public dispose() {
		this.environment?.dispose();
		this.engine?.dispose();
	}

	public loadVue(vue: string): void {
		this.environment.loadVue(vue);
	}

	public unloadVue(vue: string): void {
		this.environment.unloadVue(vue);
	}

	public setVue(vue: string) {
		this.environment.setVue(vue);
	}

	public getVue(vue: string): Vue {
		switch (vue) {
			case 'play': {
				return playVue;
			}
			case 'home': {
				return homeVue;
			}
			case 'stats': {
				return statsVue;
			}
			case 'login': {
				return loginVue;
			}
			case 'register': {
				return registerVue;
			}
			case 'test': {
				return testVue;
			}
			case 'lobby': {
				return lobbyVue;
			}
		}
		return homeVue;
	}

	public get scene() {
		return this.environment.scene;
	}
}

export const App3D = new app3d();
