import { Camera, Engine, PostProcess, ProceduralTexture, RenderTargetTexture, Scene, Texture, Vector2 } from "@babylonImport";

export class Pipeline {
	private scene: Scene;
	private camera: Camera;

	private combine: PostProcess;
	private sharpen: PostProcess;
	private glitch: PostProcess;

	private cloudTexture: ProceduralTexture;
	private grassTexture: RenderTargetTexture;

	private ray: Vector2;

	public hover: number;

	private enable: boolean;

	constructor(scene: Scene, camera: Camera, grassTexture: RenderTargetTexture) {
		this.scene = scene;
		this.camera = camera;
		this.grassTexture = grassTexture;
		this.ray = new Vector2(0, 0);
		this.hover = 0;

<<<<<<< HEAD
		//this.combine = new PostProcess("cloud", "combine", ["resolution", "worldPos", "time", "noise"], ["cloudSampler", "grassSampler"], 1., this.camera);
		////this.combine.autoClear = false;
		//this.cloudTexture = new ProceduralTexture("cloud", 256, "cloud", this.scene);
		//this.cloudTexture.onBeforeGenerationObservable.add(() => {
		//	const ray = this.camera.getForwardRay().direction;
		//	// console.log(ray);
		//	this.ray.x = Math.acos(ray.y);
		//	this.ray.y = Math.atan2(ray.z, ray.x)
		//
		//	this.cloudTexture.setFloat('time', performance.now() * 0.001);
		//	this.cloudTexture.setFloat('ratio', window.innerWidth / window.innerHeight);
		//	this.cloudTexture.setVector2("coord", this.ray);
		//	this.cloudTexture.setVector3("worldPos", this.camera.position);
		//})
		//this.combine.onApply = (effect) => {
		//	effect.setTexture("cloudSampler", this.cloudTexture);
		//	effect.setTexture("grassSampler", this.grassTexture)
		//	effect.setFloat2("resolution", window.innerWidth, window.innerHeight);
		//	effect.setFloat("time", performance.now() * 0.001)
		//	effect.setFloat("noise", this.hover);
		//	// effect.setTextureFromPostProcess("combineSampler", this.cloudTexture);
		//}
		//
		//this.sharpen = new PostProcess("sharpen", "sharpen", ["resolution"], null, 1., this.camera);
		////console.log("SHARPEN SIZE:", this.sharpen.texelSize)
		//this.sharpen.autoClear = false;
		//this.sharpen.onApply = (effect) => {
		//	effect.setFloat2("resolution", window.innerWidth, window.innerHeight);
		//}
		//
		//this.glitch = new PostProcess("glitch", "glitch", ["origin", "time", "ratio"], null, 1., this.camera);
		//this.glitch.autoClear = false;
		//this.glitch.renderTargetSamplingMode = Engine.TEXTURE_TRILINEAR_SAMPLINGMODE;
		//// Vue.refGlitch(this.glitch, this.glitchOrigin);
		//this.glitch.onApply = (effect) => {
		//	// effect.setFloat3("origin", 0.5, 0.5, 0.1;
		//	effect.setFloat("time", performance.now() * 0.001);
		//	effect.setFloat("ratio", window.innerWidth / window.innerHeight);
		//}
		//
		console.log("FOV", this.camera.fov);
		this.enable = true;
	}

	public update(time: number) {
		const ray = this.camera.getForwardRay().direction;
		// console.log(ray);
		this.ray.x = Math.acos(ray.y);
		this.ray.y = Math.atan2(ray.z, ray.x)
		//
		//this.cloudTexture.setFloat('time', time);
		//this.cloudTexture.setFloat('ratio', window.innerWidth / window.innerHeight);
		//this.cloudTexture.setVector2("coord", this.ray);
		//this.cloudTexture.setVector3("worldPos", this.camera.position);
	}

	public setEnable(status: boolean) {
		//if (status && !this.enable) {
		//	this.cloudTexture.refreshRate = 1;
		//	this.grassTexture.refreshRate = 1;
		//	this.camera.attachPostProcess(this.combine);
		//	this.camera.attachPostProcess(this.sharpen);
		//	this.camera.attachPostProcess(this.glitch);
		//	this.enable = true;
		//} else if (!status && this.enable) {
		//	this.cloudTexture.refreshRate = 0;
		//	this.grassTexture.refreshRate = 0;
		//	this.camera.detachPostProcess(this.glitch);
		//	this.camera.detachPostProcess(this.sharpen);
		//	this.camera.detachPostProcess(this.combine);
		//	this.enable = false;
		//}
	}
}
