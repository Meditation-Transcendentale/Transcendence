import {
	Engine,
} from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

import { Environment } from "./Environment";

const handleSubmit = function(e: Event) {
	e.preventDefault();
	console.log(e.type);
}

export class App {
	private canvas: HTMLCanvasElement;

	private engine: Engine;
	private environment: Environment;

	private fps: HTMLElement;



	constructor() {
		this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
		this.canvas.focus();
		//
		this.engine = new Engine(this.canvas, false); //antial, option, adpatToDeviceRAtio
		this.engine.setDepthBuffer(true);
		this.engine.setHardwareScalingLevel(1.0);
		//console.log(this.engine.getRenderWidth(), this.engine.getRenderHeight());
		//
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
	}
}
