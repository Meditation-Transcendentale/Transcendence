
import { Engine, Vector3 } from "@babylonImport";

import { Environment } from "./Environment";
import { Vue } from "../Vue";
import { css3dObject, CSSRenderer } from "./CSSRenderer";
import { Interpolator } from "./Interpolator";

import { UIaddDetails, UIaddVec3 } from "./UtilsUI";

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

	private cssRenderer!: CSSRenderer;

	constructor() {

		this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
		this.canvas.focus();


		this.engine = new Engine(this.canvas, true, {
			useHighPrecisionFloats: true,
			useHighPrecisionMatrix: true,
			antialias: true,
		}, true); //antial, option, adpatToDeviceRAtio
		this.engine.setDepthBuffer(true);
		this.engine.setHardwareScalingLevel(1.0);
		this.engine.getCaps().textureFloatRender = true;

		window.addEventListener('resize', () => {
			this.engine.resize(true);
			this.environment.resize();
			this.cssRenderer.resize(window.innerWidth, window.innerHeight)
		})

		this.environment = new Environment(this.engine, this.canvas);
		this.fps = document.getElementById('fps') as HTMLElement;

		this.vues = new Map<string, Vue>;

		this.cssRenderer = new CSSRenderer(this.environment.fieldCamera, window.innerWidth, window.innerHeight);

	}


	public async init() {
		await this.environment.init();

		// document.querySelector("#utils-details")?.remove();
	}


	public run() {
		this.engine.runRenderLoop(() => {
			const time = performance.now() * 0.001;
			this.environment.render(time);
			this.cssRenderer.update();
			Interpolator.update(time);
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

	public enableBr(value: boolean) {
		this.environment.enableBr(value);
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
		this.cssRenderer.dirty = true;
		this.environment.setVue(vue);
	}

	public getVue(vue: string): Vue | undefined {
		return this.vues.get(vue);
	}

	public get scene() {
		return this.environment.scene;
	}

	public addCSS3dObject(obj: css3dObject): number {
		return this.cssRenderer.addObject(obj);
	}

	public setCSS3dObjectEnable(index: number, status: boolean) {
		this.cssRenderer.setObjectEnable(index, status);
	}

	public onHoverEffect(status: number) {
		this.environment.onHover(status);
	}
}

export const App3D = new app3d();
