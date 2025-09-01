import { Camera, Color3, Engine, Matrix, PostProcess, ProceduralTexture, RenderTargetTexture, Scene, Texture, UniformBuffer, Vector2, Vector3 } from "@babylonImport";
import { UIaddColor, UIaddNumber, UIaddSlider, UIaddVec3 } from "./UtilsUI";

class PipelineOLD {
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

	constructor(scene: Scene, camera: Camera, depth: RenderTargetTexture, waterSurface: RenderTargetTexture, caustic: RenderTargetTexture) {
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
			"waterMaxDisplacement",
			"waterAbsorption",
			"density",
			"noiseOffset",
			"time",
			"lightScattering"
		], ["depthTexture", "surfaceTexture", "causticTexture"], 1., this.camera);

		let waterHeight = 20;
		let maxDist = 100;
		let stepLength = 1;
		let waterAbso = new Color3(0.35, 0.07, 0.03).scaleInPlace(0.1);
		let density = 1;
		let noiseOffset = 1;
		let waterMaxDisplacement = 1;
		let scatter = 0.2;
		UIaddNumber("water heigth", waterHeight, (n: number) => { waterHeight = n });
		UIaddNumber("max dist", maxDist, (n: number) => { maxDist = n });
		UIaddNumber("step length", stepLength, (n: number) => { stepLength = n });
		UIaddNumber("density", density, (n: number) => { density = n });
		UIaddNumber("noiseOffset", noiseOffset, (n: number) => { noiseOffset = n });
		UIaddNumber("waterMaxDisplacement", waterMaxDisplacement, (n: number) => { waterMaxDisplacement = n });
		UIaddColor("water abso", waterAbso, () => { });
		UIaddSlider("light scattering", scatter, (n: number) => {
			scatter = n;
		}, 0.01, 0, 1);

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
			effect.setFloat("waterMaxDisplacement", waterMaxDisplacement);

			effect.setFloat("time", performance.now() * 0.001);

			effect.setTexture("depthTexture", this.depth);
			effect.setTexture("surfaceTexture", waterSurface);
			effect.setTexture("causticTexture", caustic);
			effect.setFloat("lightScattering", scatter);
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


export class Pipeline {
	private scene: Scene;
	private camera: Camera;
	private enabled: boolean;

	private underwaterPostProcess: PostProcess;
	private underwaterRatio = 1.;

	private depthRT: RenderTargetTexture;
	private waveRT: RenderTargetTexture;
	private causticRT: RenderTargetTexture;

	private cameraUBO: UniformBuffer;
	private dataUBO: UniformBuffer;

	constructor(scene: Scene, camera: Camera, depth: RenderTargetTexture, wave: RenderTargetTexture, caustic: RenderTargetTexture) {
		this.scene = scene;
		this.camera = camera;
		this.depthRT = depth;
		this.waveRT = wave;
		this.causticRT = caustic;

		this.enabled = true;

		this.underwaterPostProcess = new PostProcess("underwater", "TESTunderwater", {
			uniformBuffers: ["camera", "data"],
			samplers: ["depthTexture", "waveTexture", "causticTexture"],
			uniforms: ["resolution", "time"],
			size: this.underwaterRatio,
			camera: this.camera
		});

		this.cameraUBO = new UniformBuffer(this.scene.getEngine());

		this.cameraUBO.addUniform("maxZ", 1);
		// this.cameraUBO.addUniform("direction", 3);
		this.cameraUBO.addUniform("position", 3);
		this.cameraUBO.addUniform("projection", 16);
		this.cameraUBO.addUniform("iprojection", 16);
		this.cameraUBO.addUniform("iview", 16);
		this.cameraUBO.addUniform("world", 16);

		this.cameraUBO.updateFloat("maxZ", this.camera.maxZ);
		this.cameraUBO.updateMatrix("projection", this.camera.getProjectionMatrix());
		const iproj = new Matrix();
		this.cameraUBO.updateMatrix("iprojection", this.camera.getProjectionMatrix().invertToRef(iproj));

		this.dataUBO = new UniformBuffer(this.scene.getEngine());

		this.dataUBO.addUniform("noiseOffset", 1);
		this.dataUBO.addUniform("stepSize", 1);
		this.dataUBO.addUniform("maxDistance", 1);
		this.dataUBO.addUniform("worldSize", 1);
		this.dataUBO.addUniform("waterHeight", 1);
		this.dataUBO.addUniform("waveMaxDisplacement", 1);
		this.dataUBO.addUniform("density", 1);
		this.dataUBO.addUniform("lightScattering", 1);
		this.dataUBO.addUniform("waterAbsorption", 3);

		const noiseOffsetDefault = 1.;
		const stepSizeDefault = 1.;
		const maxDistanceDefault = 100.;
		const worldSizeDefault = 40.;
		const waterHeightDefault = 20;
		const waveMaxDisplacementDefault = 1;
		const densityDefault = 1;
		const lightScatteringDefault = 0.2;
		const waterAbsorptionDefault = new Vector3(0.35, 0.07, 0.03);
		this.dataUBO.updateFloat("noiseOffset", noiseOffsetDefault);
		this.dataUBO.updateFloat("stepSize", stepSizeDefault);
		this.dataUBO.updateFloat("maxDistance", maxDistanceDefault);
		this.dataUBO.updateFloat("worldSize", worldSizeDefault);
		this.dataUBO.updateFloat("waterHeight", waterHeightDefault);
		this.dataUBO.updateFloat("waveMaxDisplacement", waveMaxDisplacementDefault);
		this.dataUBO.updateFloat("density", densityDefault);
		this.dataUBO.updateFloat("lightScattering", lightScatteringDefault);
		this.dataUBO.updateVector3("waterAbsorption", waterAbsorptionDefault);

		UIaddSlider("noiseOffset", noiseOffsetDefault, (n: number) => { this.dataUBO.updateFloat("noiseOffset", n) }, 0.1, 0, 2);
		UIaddSlider("stepSize", stepSizeDefault, (n: number) => { this.dataUBO.updateFloat("stepSize", n) }, 0.05, 0.01, 2);
		UIaddSlider("maxDistance", maxDistanceDefault, (n: number) => { this.dataUBO.updateFloat("maxDistance", n) }, 1, 0, 100);
		UIaddSlider("worldSize", worldSizeDefault, (n: number) => { this.dataUBO.updateFloat("worldSize", n) }, 1, 0, 100);
		UIaddSlider("waterHeight", waterHeightDefault, (n: number) => { this.dataUBO.updateFloat("waterHeight", n) }, 1, 0, 100);
		UIaddSlider("waveMaxDisplacement", waveMaxDisplacementDefault, (n: number) => { this.dataUBO.updateFloat("waveMaxDisplacement", n) }, 0.5, 0, 20);
		UIaddSlider("density", densityDefault, (n: number) => { this.dataUBO.updateFloat("density", n) }, 0.1, 0, 20);
		UIaddSlider("lightScattering", lightScatteringDefault, (n: number) => { this.dataUBO.updateFloat("lightScattering", n) }, 0.01, 0, 1);
		UIaddVec3("waterAbsorption", waterAbsorptionDefault, () => { this.dataUBO.updateVector3("waterAbsorption", waterAbsorptionDefault) })

		const iview = new Matrix();
		let binded = false;
		this.underwaterPostProcess.onApply = (effect) => {
			this.cameraUBO.updateVector3("position", this.camera.position);
			this.cameraUBO.updateMatrix("iview", this.camera.getViewMatrix().invertToRef(iview));
			this.cameraUBO.updateMatrix("world", this.camera.worldMatrixFromCache);
			this.cameraUBO.update();
			this.dataUBO.update();

			// if (!binded) {
			this.cameraUBO.bindToEffect(effect, "camera");
			this.dataUBO.bindToEffect(effect, "data");
			binded = true;
			// }


			effect.setFloat("time", performance.now() * 0.001);
			effect.setFloat2("resolution", window.innerWidth, window.innerHeight);
			effect.setTexture("depthTexture", this.depthRT);
			effect.setTexture("waveTexture", this.waveRT);
			effect.setTexture("causticTexture", this.causticRT);
		}
	}

	public update(time: number) {

	}

	public setEnable(status: boolean) {
		if (status && !this.enabled) {
			this.camera.attachPostProcess(this.underwaterPostProcess);
			this.enabled = true;
		} else if (!status && this.enabled) {
			this.camera.detachPostProcess(this.underwaterPostProcess);
			this.enabled = false;
		}
	}

}
