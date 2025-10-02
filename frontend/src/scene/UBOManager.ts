import { Color3, Matrix, SpotLight, UniformBuffer, Vector3 } from "@babylonjs/core";
import { sceneManager } from "./SceneManager";

export class UBOManager {
	public cameraUBO: UniformBuffer;
	public fogDataUBO: UniformBuffer;
	public fogLightsUBO: UniformBuffer;

	private tempMatrix = new Matrix();

	constructor() {
		this.cameraUBO = sceneManager.ubos.get("camera") as UniformBuffer;
		this.fogDataUBO = sceneManager.ubos.get("fogData") as UniformBuffer;
		this.fogLightsUBO = sceneManager.ubos.get("fogLights") as UniformBuffer;

		this.cameraUBO.addUniform("maxZ", 1);
		this.cameraUBO.addUniform("position", 3);
		this.cameraUBO.addUniform("projection", 16);
		this.cameraUBO.addUniform("iprojection", 16);
		this.cameraUBO.addUniform("iview", 16);
		this.cameraUBO.addUniform("world", 16);

		const iproj = new Matrix();
		this.cameraUBO.updateFloat("maxZ", sceneManager.camera.maxZ);
		this.cameraUBO.updateMatrix("projection", sceneManager.camera.getProjectionMatrix());
		this.cameraUBO.updateMatrix("iprojection", sceneManager.camera.getProjectionMatrix().invertToRef(iproj));


		this.fogDataUBO.addUniform("noiseOffset", 1);
		this.fogDataUBO.addUniform("stepSize", 1);
		this.fogDataUBO.addUniform("maxDistance", 1);
		this.fogDataUBO.addUniform("densityMultiplier", 1);
		this.fogDataUBO.addUniform("lightScattering", 1);
		this.fogDataUBO.addUniform("fogAbsorption", 3);
		this.fogDataUBO.addUniform("fogScale", 3);
		this.fogDataUBO.addUniform("dummyToTakePlace", 16);

		const noiseOffsetDefault = 0.5;
		const stepSizeDefault = 0.5;
		const maxDistanceDefault = 50.;
		const densityMultiplierDefault = 2.5;
		const lightScatteringDefault = 0.2;
		const fogAbsorptionDefault = new Vector3(0.1, 0.1, 0.1);
		const fogScaleDefault = new Vector3(40, 40, 40);
		this.fogDataUBO.updateFloat("noiseOffset", noiseOffsetDefault);
		this.fogDataUBO.updateFloat("stepSize", stepSizeDefault);
		this.fogDataUBO.updateFloat("maxDistance", maxDistanceDefault);
		this.fogDataUBO.updateFloat("densityMultiplier", densityMultiplierDefault);
		this.fogDataUBO.updateFloat("lightScattering", lightScatteringDefault);
		this.fogDataUBO.updateVector3("fogAbsorption", fogAbsorptionDefault);
		this.fogDataUBO.updateVector3("fogScale", fogScaleDefault);

		this.fogLightsUBO.addUniform("spotIntensity", 1);
		this.fogLightsUBO.addUniform("spotRange", 1);
		this.fogLightsUBO.addUniform("spotAngle", 1);
		this.fogLightsUBO.addUniform("spotExp", 1);
		this.fogLightsUBO.addUniform("pointAIntensity", 1);
		this.fogLightsUBO.addUniform("pointARange", 1);
		this.fogLightsUBO.addUniform("pointBIntensity", 1);
		this.fogLightsUBO.addUniform("pointBRange", 1);
		this.fogLightsUBO.addUniform("spotColor", 3);
		this.fogLightsUBO.addUniform("spotPosition", 3);
		this.fogLightsUBO.addUniform("spotDirection", 3);
		this.fogLightsUBO.addUniform("pointAColor", 3);
		this.fogLightsUBO.addUniform("pointAPosition", 3);
		this.fogLightsUBO.addUniform("pointBColor", 3);
		this.fogLightsUBO.addUniform("pointBPosition", 3);

		this.fogLightsUBO.updateFloat("spotIntensity", 0);
		this.fogLightsUBO.updateFloat("spotRange", 0);
		this.fogLightsUBO.updateFloat("spotAngle", 0);
		this.fogLightsUBO.updateFloat("spotExp", 0);
		this.fogLightsUBO.updateFloat("pointAIntensity", 0);
		this.fogLightsUBO.updateFloat("pointARange", 0);
		this.fogLightsUBO.updateFloat("pointBIntensity", 0);
		this.fogLightsUBO.updateFloat("pointBRange", 0);
		this.fogLightsUBO.updateColor3("spotColor", Color3.Black())
		this.fogLightsUBO.updateVector3("spotPosition", (sceneManager.lights.get("torche") as SpotLight).position);
		this.fogLightsUBO.updateVector3("spotDirection", Vector3.Zero());
		this.fogLightsUBO.updateColor3("pointAColor", Color3.Black());
		this.fogLightsUBO.updateVector3("pointAPosition", Vector3.Zero());
		this.fogLightsUBO.updateColor3("pointBColor", Color3.Black());
		this.fogLightsUBO.updateVector3("pointBPosition", Vector3.Zero());

		sceneManager.tracker.track("torchePosition", (position: Vector3) => {
			if (!position._isDirty)
				return;
			this.fogLightsUBO.updateVector3("spotPosition", position);
			position._isDirty = false;
		})
	}

	public update() {
		this.cameraUBO.updateVector3("position", sceneManager.camera.position);
		this.cameraUBO.updateMatrix("iview", sceneManager.camera.getViewMatrix().invertToRef(this.tempMatrix));
		this.cameraUBO.updateMatrix("world", sceneManager.camera.worldMatrixFromCache);

		this.cameraUBO.update();
		this.fogDataUBO.update();
		this.fogLightsUBO.update();
	}

	public resize() {
		this.cameraUBO.updateMatrix("projection", sceneManager.camera.getProjectionMatrix());
		this.cameraUBO.updateMatrix("iprojection", sceneManager.camera.getProjectionMatrix().invertToRef(this.tempMatrix));
	}
}
