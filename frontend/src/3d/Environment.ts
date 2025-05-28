import {
	ArcRotateCamera,
	Color3,
	Color4,
	DirectionalLight,
	Engine,
	GlowLayer,
	HemisphericLight,
	Matrix,
	Mesh,
	MeshBuilder,
	Scene,
	StandardMaterial,
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

	private glow: GlowLayer;
	private play: HTMLElement;


	constructor(engine: Engine, canvas: HTMLCanvasElement) {
		this.canvas = canvas;

		this.scene = new Scene(engine);
		this.scene.autoClear = true; // Color buffer
		this.scene.clearColor = new Color4(0.1, 0., 0.2, 1);

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

		this.cubeCluster = new CubeCluster("play", this.scene);
		this.lastTime = performance.now() * 0.001;
		this.deltaTime = 0;
		this.play = document.querySelector("#play") as HTMLElement;
		this.frame = 0;

		this.glow = new GlowLayer("glow", this.scene, {
			mainTextureSamples: 4,
		});
		this.glow.intensity = 0.4;

	}

	public async init() {

		//this.camera = new FreeCamera("camera", new Vector3(20, 3, 0), this.scene);
		this.camera = new ArcRotateCamera("camera", -Math.PI * 0.8, Math.PI * 0.4, 10, Vector3.Zero(), this.scene);
		this.camera.inertia = 0.1;
		this.camera.rotation.set(0, Math.PI * 1.5, 0);
		this.camera.attachControl(this.canvas, true);
		this.camera.minZ = 0.1;

		//const cube = MeshBuilder.CreateBox('box', { size: 10, sideOrientation: Mesh.BACKSIDE }, this.scene);
		//const m = new StandardMaterial('mat', this.scene);
		//m.diffuseColor = Color3.White();
		//m.specularColor = Color3.Black();
		////m.cullBackFaces = false;
		////m.backFaceCulling = false;
		////m.twoSidedLighting = true;
		//cube.material = m;
		//cube.receiveShadows = true;



		await this.cubeCluster.init();
		//const l = new DirectionalLight("light", new Vector3(0, 1, 0), this.scene);
		//const hl = new HemisphericLight("hlight", new Vector3(1, 0, 0), this.scene);
		//hl.intensity = 0.5;

	}

	public render() {
		if (!this.frame) { this.updateCss(); }
		const time = performance.now() * 0.001;
		this.deltaTime = time - this.lastTime;
		this.lastTime = time;
		this.cubeCluster.update(this.deltaTime);
		this.scene.render();
		this.frame += 1;
		this.frame %= 1;
	}

	private updateCss() {
		this.cubeCluster.updateCSS();
	}

	private async load() {

	}

	private initSky() {

	}

	public dispose() {
		this.cubeCluster.dispose();
		this.glow.dispose();
		this.camera.dispose();
		this.scene.dispose();
	}
}
