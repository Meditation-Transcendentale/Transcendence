import { Color3, Matrix, SpotLight, UniformBuffer, Vector3 } from "../babylon";
import { sceneManager } from "./SceneManager";
import { Assets } from "./Assets";

export class UBOManager {
	private assets: Assets;

	private tempMatrix = new Matrix();
	private tempVector3 = new Vector3();
	constructor(assets: Assets) {
		this.assets = assets;

		this.assets.fogUBO.updateFloat("maxZ", this.assets.camera.maxZ);
		this.assets.fogUBO.updateMatrix("projection", this.assets.camera.getProjectionMatrix());
		this.assets.fogUBO.updateMatrix("iprojection", this.assets.camera.getProjectionMatrix().invertToRef(this.tempMatrix));


		const noiseOffsetDefault = 0.5;
		const stepSizeDefault = 0.5;
		const maxDistanceDefault = 50.;
		const densityMultiplierDefault = 2.5;
		const lightScatteringDefault = 0.2;
		const fogAbsorptionDefault = new Vector3(0.1, 0.1, 0.1);
		const fogScaleDefault = new Vector3(40, 40, 40);
		this.assets.fogUBO.updateFloat("noiseOffset", noiseOffsetDefault);
		this.assets.fogUBO.updateFloat("stepSize", stepSizeDefault);
		this.assets.fogUBO.updateFloat("maxDistance", maxDistanceDefault);
		this.assets.fogUBO.updateFloat("densityMultiplier", densityMultiplierDefault);
		this.assets.fogUBO.updateFloat("lightScattering", lightScatteringDefault);
		this.assets.fogUBO.updateVector3("fogAbsorption", fogAbsorptionDefault);
		this.assets.fogUBO.updateVector3("fogScale", fogScaleDefault);


		this.assets.fogUBO.updateFloat("spotIntensity", this.assets.flashLight.intensity);
		this.assets.fogUBO.updateFloat("spotRange", this.assets.flashLight.range);
		this.assets.fogUBO.updateFloat("spotAngle", Math.cos(this.assets.flashLight.angle));
		this.assets.fogUBO.updateFloat("spotExp", this.assets.flashLight.exponent);
		this.assets.fogUBO.updateFloat("pointAIntensity", this.assets.ballLight.intensity);
		this.assets.fogUBO.updateFloat("pointARange", this.assets.ballLight.range);
		this.assets.fogUBO.updateFloat("pointBIntensity", this.assets.cubeLight.intensity);
		this.assets.fogUBO.updateFloat("pointBRange", this.assets.cubeLight.range);
		this.assets.fogUBO.updateColor3("spotColor", this.assets.flashLight.diffuse)
		this.assets.fogUBO.updateVector3("spotPosition", this.assets.flashLight.position);
		this.assets.fogUBO.updateVector3("spotDirection", this.assets.flashLight.direction);
		this.assets.fogUBO.updateColor3("pointAColor", this.assets.ballLight.diffuse);
		this.assets.fogUBO.updateVector3("pointAPosition", this.assets.ballLight.position);
		this.assets.fogUBO.updateColor3("pointBColor", this.assets.cubeLight.diffuse);
		this.assets.fogUBO.updateVector3("pointBPosition", this.assets.cubeLight.position);
	}

	public update() {
		this.assets.fogUBO.updateVector3("position", sceneManager.camera.position);
		this.assets.fogUBO.updateMatrix("iview", sceneManager.camera.getViewMatrix().invertToRef(this.tempMatrix));
		this.assets.fogUBO.updateMatrix("world", sceneManager.camera.worldMatrixFromCache);

		this.assets.fogUBO.updateVector3("spotPosition", this.assets.flashLight.position);
		this.assets.fogUBO.updateVector3("spotDirection", this.assets.flashLight.direction);
		this.assets.fogUBO.updateVector3("pointAPosition", this.assets.ballMesh.position.addToRef(this.assets.ballRoot.position, this.tempVector3).scaleInPlace(this.assets.ballRoot.scalingDeterminant));
		this.assets.fogUBO.updateVector3("pointBPosition", this.assets.cubeMesh.position.addToRef(this.assets.monolithRoot.position, this.tempVector3).scaleInPlace(this.assets.monolithRoot.scalingDeterminant));

		this.assets.fogUBO.update();
	}

	public resize() {
		this.assets.fogUBO.updateMatrix("projection", sceneManager.camera.getProjectionMatrix());
		this.assets.fogUBO.updateMatrix("iprojection", sceneManager.camera.getProjectionMatrix().invertToRef(this.tempMatrix));
	}
}
