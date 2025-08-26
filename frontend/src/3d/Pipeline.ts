import { Camera, Color3, Engine, Matrix, PostProcess, ProceduralTexture, RenderTargetTexture, Scene, Texture, Vector2 } from "@babylonImport";
import { UIaddColor, UIaddNumber } from "./UtilsUI";

export class Pipeline {
	private scene: Scene;
	private camera: Camera;

	private combine: PostProcess;
	private sharpen: PostProcess;
	private glitch: PostProcess;

	private underwater: PostProcess;


	private depth: RenderTargetTexture;

	private ray: Vector2;

	public hover: number;

	private enable: boolean;

	constructor(scene: Scene, camera: Camera, depth: RenderTargetTexture) {
		this.scene = scene;
		this.camera = camera;
		this.ray = new Vector2(0, 0);
		this.depth = depth;
		this.hover = 0;

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
		//
		//	

		this.underwater = new PostProcess("underwater", "underwater", [
			"projection",
			"iprojection",
			"iview",
			"maxZ",
			"cameraDirection",
			"cameraPosition",
			"resolution",
			"maxDistance",
			"stepLength",
			"cameraWorld",
			"resolution",
			"waterHeigth",
			"waterAbsorption",
			"density",
			"noiseOffset",
			"time"
		], ["depthTexture"], 1., this.camera);

		let waterHeight = 20;
		let maxDist = 50;
		let stepLength = 1;
		let waterAbso = new Color3(0.35, 0.07, 0.03).scaleInPlace(0.1);
		let density = 1;
		let noiseOffset = 0.1;
		UIaddNumber("water heigth", waterHeight, (n: number) => { waterHeight = n });
		UIaddNumber("max dist", maxDist, (n: number) => { maxDist = n });
		UIaddNumber("step length", stepLength, (n: number) => { stepLength = n });
		UIaddNumber("density", density, (n: number) => { density = n });
		UIaddNumber("noiseOffset", noiseOffset, (n: number) => { noiseOffset = n });
		UIaddColor("water abso", waterAbso, () => { });

		const ipro = new Matrix();
		const iview = new Matrix();

		this.underwater.onApply = (effect) => {
			const pro = this.camera.getProjectionMatrix();
			effect.setMatrix("projection", pro);
			effect.setMatrix("iprojection", pro.invertToRef(ipro));
			effect.setMatrix("iview", this.camera.getViewMatrix().invertToRef(iview));
			effect.setFloat("maxZ", this.camera.maxZ);
			effect.setVector3("cameraDirection", this.camera.getForwardRay(0).direction);
			effect.setFloat("noiseOffset", noiseOffset);

			effect.setFloat("waterHeigth", waterHeight);
			effect.setFloat2("resolution", window.innerWidth, window.innerHeight);
			effect.setFloat("maxDistance", maxDist);
			effect.setFloat("stepLength", Math.max(stepLength, 0.1));
			effect.setColor3("waterAbsorption", waterAbso);
			effect.setVector3("cameraPosition", this.camera.position);
			effect.setMatrix("cameraWorld", this.camera.worldMatrixFromCache);
			effect.setFloat("density", density);

			effect.setFloat("time", performance.now() * 0.001);

			effect.setTexture("depthTexture", this.depth);
		}

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
		//
	}

	public setEnable(status: boolean) {
		if (status && !this.enable) {
			this.camera.attachPostProcess(this.underwater);
			//	this.cloudTexture.refreshRate = 1;
			//	this.grassTexture.refreshRate = 1;
			//	this.camera.attachPostProcess(this.combine);
			//	this.camera.attachPostProcess(this.sharpen);
			//	this.camera.attachPostProcess(this.glitch);
			//	this.enable = true;
		} else if (!status && this.enable) {
			this.camera.detachPostProcess(this.underwater);
			//	this.cloudTexture.refreshRate = 0;
			//	this.grassTexture.refreshRate = 0;
			//	this.camera.detachPostProcess(this.glitch);
			//	this.camera.detachPostProcess(this.sharpen);
			//	this.camera.detachPostProcess(this.combine);
			//	this.enable = false;
		}
	}
}
