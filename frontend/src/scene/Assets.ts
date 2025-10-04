import { Color3, Color4, EffectRenderer, Engine, FreeCamera, HemisphericLight, LoadAssetContainerAsync, Matrix, Mesh, MeshBuilder, PointLight, RawTexture3D, RenderTargetTexture, Scene, ShaderMaterial, SpotLight, StandardMaterial, TransformNode, UniformBuffer, Vector2, Vector3, Vector4 } from "../babylon";
import { stateManager } from "../state/StateManager";
import { perlinWorley3D } from "./PerlinWorley";
import { sceneManager } from "./SceneManager";
import { ButterflyMaterial } from "./Shader/ButterflyMaterial";
import { GrassMaterial } from "./Shader/GrassMaterial";
import { MonolithMaterial } from "./Shader/MonolithMaterial";
import { voxelData as templeMedium } from './temple-medium';

const monolithOption = {
	animationSpeed: 1.0,
	animationIntensity: 0.1,
	baseWaveIntensity: 0.02,
	mouseInfluenceRadius: 0.8,
	amplitude: 0.5,
};


export class Assets {
	public engine: Engine;
	public scene: Scene;
	public camera: FreeCamera;
	public effectRenderer: EffectRenderer;

	public grassLowMesh!: Mesh;
	public grassHighMesh!: Mesh;
	public ballMesh!: Mesh;
	public butterflyMesh!: Mesh;
	public groundMesh!: Mesh;
	public cubeMesh!: Mesh;
	public monolithMesh!: Mesh;

	public flashLight!: SpotLight;
	public hemisphericLight!: HemisphericLight;
	public cubeLight!: PointLight;
	public ballLight!: PointLight;

	public fogDepthTexture!: RenderTargetTexture;
	public fogDensityTexture!: RawTexture3D;
	public fogRenderTexture!: RenderTargetTexture;
	public ballGrassTextureA!: RenderTargetTexture;
	public ballGrassTextureB!: RenderTargetTexture;

	public fogUBO!: UniformBuffer;
	public monolithUBO!: UniformBuffer;

	public ballRoot!: TransformNode;
	public monolithRoot!: TransformNode;
	public butterflyRoot!: TransformNode;

	public ballMaterial!: ShaderMaterial;
	public cubeMaterial!: ShaderMaterial;
	public butterflyMaterial!: ButterflyMaterial;
	public grassMaterial!: GrassMaterial;
	public monolithMaterial!: MonolithMaterial;

	public depthMaterial!: ShaderMaterial;
	public grassDepthMaterial!: ShaderMaterial;
	public monolithDepthMaterial!: ShaderMaterial;

	public ballPicker!: Vector3;
	public monolithMovement!: any;

	public monolithVoxelPositions!: Array<Vector3>;
	public monolithAnimationIntensity: number;
	public monolithOrigin: Vector3;
	public monolithOldOrigin: Vector3;

	constructor(engine: Engine) {
		this.engine = engine;
		this.scene = new Scene(engine);
		this.scene.autoClear = true; // Color buffer
		this.scene.clearColor = new Color4(0., 0., 0., 1);

		this.scene.setRenderingAutoClearDepthStencil(0, true);


		this.camera = new FreeCamera("camera", new Vector3(0, 6, 40), this.scene, true);
		this.camera.updateUpVectorFromRotation = true;

		this.effectRenderer = new EffectRenderer(this.engine);

		this.monolithAnimationIntensity = monolithOption.animationIntensity;
		this.monolithOrigin = new Vector3(0, -10, 0);
		this.monolithOldOrigin = new Vector3(0, -10, 0);
	}

	public async loadMandatory() {
		await this.loadMeshMandatory();
		this.loadLightsMandatory();
		this.loadTextureMandatory();
		this.loadUBOMandatory();
		this.loadMaterialMandatory();
		this.loadRootMandatory();

		this.ballPicker = new Vector3();
		this.monolithMovement = () => {
			this.monolithRoot.position.set(
				Math.sin(sceneManager.time * 0.8) * monolithOption.amplitude * 0.5,
				Math.sin(sceneManager.time * 0.6) * monolithOption.amplitude + 1,
				Math.cos(sceneManager.time * 0.4) * monolithOption.amplitude * 0.5
			)
		}
	}

	public async loadAssetsAsync() {

	}

	private async loadMeshMandatory() {
		let loaded = await LoadAssetContainerAsync("/assets/grassLOD.glb", this.scene);
		loaded.meshes[2].name = "grassHigh";
		loaded.meshes[4].name = "grassLow";
		loaded.meshes[2].setEnabled(false);
		loaded.meshes[4].setEnabled(false);
		this.grassHighMesh = loaded.meshes[2] as Mesh;
		this.grassLowMesh = loaded.meshes[4] as Mesh;
		this.scene.addMesh(loaded.meshes[2]);
		this.scene.addMesh(loaded.meshes[4]);

		loaded = await LoadAssetContainerAsync("/assets/butterfly2.glb", this.scene);
		loaded.meshes[1].name = "butterfly";
		loaded.meshes[1].setEnabled(false);
		this.butterflyMesh = loaded.meshes[1] as Mesh;
		this.butterflyMesh.doNotSyncBoundingInfo = true;
		this.butterflyMesh.alwaysSelectAsActiveMesh = true;
		this.scene.addMesh(loaded.meshes[1]);

		this.ballMesh = MeshBuilder.CreateSphere("ball", { diameter: 1 }, this.scene);
		this.ballMesh.setEnabled(false);
		this.ballMesh.doNotSyncBoundingInfo = true;

		this.groundMesh = MeshBuilder.CreateGround("ground", { width: 200, height: 200 }, this.scene);
		this.groundMesh.setEnabled(false);
		this.groundMesh.doNotSyncBoundingInfo = true;

		this.cubeMesh = MeshBuilder.CreateBox("thecube", { size: 1 }, this.scene);
		this.cubeMesh.position = new Vector3(0, 4.5, 0);
		this.cubeMesh.doNotSyncBoundingInfo = true;
		this.cubeMesh.alwaysSelectAsActiveMesh = true;

		this.setupMonolithMesh();
		this.monolithMesh.setEnabled(false);
		this.monolithMesh.doNotSyncBoundingInfo = true;
		this.monolithMesh.alwaysSelectAsActiveMesh = true;
		this.monolithMesh.refreshBoundingInfo();
	}

	private loadLightsMandatory() {
		this.flashLight = new SpotLight("flashlight", this.camera.position, new Vector3(0, 0, -1), Math.PI * 0.5, 10, this.scene);
		this.flashLight.range = 30;
		this.flashLight.specular.scaleInPlace(6.);
		this.flashLight.intensity = 2.7;

		this.hemisphericLight = new HemisphericLight("sun", Vector3.Up(), this.scene);
		this.hemisphericLight.intensity = 0.2;

		this.ballLight = new PointLight("ball light", this.ballMesh.position, this.scene);
		this.ballLight.diffuse = Color3.FromHexString("#3b3d7d");
		this.ballLight.specular = this.ballLight.diffuse;
		this.ballLight.intensity = 2;
		this.ballLight.range = 3;

		this.cubeLight = new PointLight("cube light", this.cubeMesh.position, this.scene);
		this.cubeLight.range = 2;
		this.cubeLight.diffuse = Color3.Purple();
		this.cubeLight.intensity = 2;
	}

	private loadTextureMandatory() {
		const fogMaxResolution = 1080;
		const fogRatio = 0.5;
		stateManager.set("fogMaxResolution", fogMaxResolution);
		stateManager.set("fogRatio", fogRatio);
		this.fogDepthTexture = new RenderTargetTexture("fogDepth", { width: fogMaxResolution * fogRatio, height: fogMaxResolution * fogRatio * sceneManager.resolutionRatio }, this.scene, {
			type: Engine.TEXTURETYPE_FLOAT,
			samplingMode: Engine.TEXTURE_BILINEAR_SAMPLINGMODE
		});
		this.fogDepthTexture.activeCamera = this.camera;

		this.fogDepthTexture.renderList = [];
		this.fogDepthTexture.clearColor = new Color4(1., 0., 0., 1.);
		this.fogDensityTexture = new RawTexture3D(
			perlinWorley3D(64),
			64, 64, 64,
			Engine.TEXTUREFORMAT_R,
			this.scene,
			false,
			false,
			Engine.TEXTURE_BILINEAR_SAMPLINGMODE,
			Engine.TEXTURETYPE_FLOAT
		);

		this.fogRenderTexture = new RenderTargetTexture("fog", { width: fogMaxResolution * fogRatio, height: fogMaxResolution * fogRatio * sceneManager.resolutionRatio }, this.scene, {
			format: Engine.TEXTUREFORMAT_RGBA,
			type: Engine.TEXTURETYPE_HALF_FLOAT,
			samplingMode: Engine.TEXTURE_BILINEAR_SAMPLINGMODE
		});

		this.ballGrassTextureA = new RenderTargetTexture("ballGrass", { width: 256, height: 256 }, this.scene, {
			format: Engine.TEXTUREFORMAT_RGBA,
			type: Engine.TEXTURETYPE_HALF_FLOAT,
			samplingMode: Engine.TEXTURE_BILINEAR_SAMPLINGMODE
		})
		this.ballGrassTextureB = this.ballGrassTextureA.clone();
	}

	private loadUBOMandatory() {
		this.fogUBO = new UniformBuffer(this.engine);
		this.fogUBO.addUniform("maxZ", 1);
		this.fogUBO.addUniform("noiseOffset", 1);
		this.fogUBO.addUniform("stepSize", 1);
		this.fogUBO.addUniform("maxDistance", 1);
		this.fogUBO.addUniform("densityMultiplier", 1);
		this.fogUBO.addUniform("lightScattering", 1);
		this.fogUBO.addUniform("spotIntensity", 1);
		this.fogUBO.addUniform("spotRange", 1);
		this.fogUBO.addUniform("spotAngle", 1);
		this.fogUBO.addUniform("spotExp", 1);
		this.fogUBO.addUniform("pointAIntensity", 1);
		this.fogUBO.addUniform("pointARange", 1);
		this.fogUBO.addUniform("pointBIntensity", 1);
		this.fogUBO.addUniform("pointBRange", 1);
		this.fogUBO.addUniform("fogScale", 3);
		this.fogUBO.addUniform("fogAbsorption", 3);
		this.fogUBO.addUniform("position", 3);
		this.fogUBO.addUniform("spotColor", 3);
		this.fogUBO.addUniform("spotPosition", 3);
		this.fogUBO.addUniform("spotDirection", 3);
		this.fogUBO.addUniform("pointAColor", 3);
		this.fogUBO.addUniform("pointAPosition", 3);
		this.fogUBO.addUniform("pointBColor", 3);
		this.fogUBO.addUniform("pointBPosition", 3);
		this.fogUBO.addUniform("projection", 16);
		this.fogUBO.addUniform("iprojection", 16);
		this.fogUBO.addUniform("iview", 16);
		this.fogUBO.addUniform("world", 16);


		this.monolithUBO = new UniformBuffer(this.engine);
	}

	private loadMaterialMandatory() {
		this.ballMaterial = new ShaderMaterial("picker ball", this.scene, "oneColor", {
			attributes: ["position"],
			uniforms: ["world", "viewProjection", "color"]
		})
		this.ballMaterial.setVector4("color", new Vector4(this.ballLight.diffuse.r * this.ballLight.intensity * 2.,
			this.ballLight.diffuse.g * this.ballLight.intensity * 2.,
			this.ballLight.diffuse.b * this.ballLight.intensity * 2.,
			0.2));
		this.ballMaterial.alphaMode = Engine.ALPHA_DISABLE;
		this.ballMesh.material = this.ballMaterial;

		this.cubeMaterial = new ShaderMaterial("picker ball", this.scene, "oneColor", {
			attributes: ["position"],
			uniforms: ["world", "viewProjection", "color"]
		})
		this.cubeMaterial.setVector4("color", new Vector4(this.cubeLight.diffuse.r * this.cubeLight.intensity * 2.,
			this.cubeLight.diffuse.g * this.cubeLight.intensity * 2.,
			this.cubeLight.diffuse.b * this.cubeLight.intensity * 2.,
			0.2));
		this.cubeMaterial.alphaMode = Engine.ALPHA_DISABLE;
		this.cubeMesh.material = this.cubeMaterial;

		this.grassMaterial = new GrassMaterial("grass", this.scene);
		this.butterflyMaterial = new ButterflyMaterial("butterfly", this.scene);
		this.butterflyMesh.material = this.butterflyMaterial;
		this.monolithMaterial = new MonolithMaterial("monolith", this.scene, monolithOption);
		this.monolithMesh.material = this.monolithMaterial;

		this.grassMaterial.onBindObservable.add(() => {
			this.grassMaterial.getEffect().setFloat("time", sceneManager.time);
			this.grassMaterial.getEffect().setFloat("ballRadius", this.ballLight.range)
			this.grassMaterial.getEffect().setVector3("ballPosition", this.ballMesh.getAbsolutePosition()) //Maybe compute it directly;
			this.grassMaterial.getEffect().setColor3("ballLightColor", this.ballLight.diffuse);
			this.grassMaterial.getEffect().setTexture("textureSampler", this.ballGrassTextureB);
		})

		this.monolithMaterial.onBindObservable.add(() => {
			const effect = this.monolithMaterial.getEffect();
			effect.setFloat("time", sceneManager.time);
			effect.setFloat("animationIntensity", this.monolithAnimationIntensity);
			effect.setVector3("origin", this.monolithOrigin);
			effect.setVector3("oldOrigin", this.monolithOldOrigin);

		})


		const m = new StandardMaterial("ground", this.scene);
		m.diffuseColor = Color3.Black();
		m.disableLighting = true;
		this.groundMesh.material = m;

		this.depthMaterial = new ShaderMaterial("defaultDepth", this.scene, "defaultDepth", {
			attributes: ['position'],
			uniforms: ["world", "viewProjection", "depthValues"]
		})
		this.grassDepthMaterial = new ShaderMaterial("grassDepth", this.scene, "grassDepth", {
			attributes: ["position", "world0", "world1", "world2", "world3", "baseColor"],
			uniforms: ["world", "viewProjection", "depthValues", "time"],
			samplers: ["textureSampler"]
		})
		this.grassDepthMaterial.backFaceCulling = false;
		this.monolithDepthMaterial = new ShaderMaterial("monolithDepth", this.scene, "monolithDepth", {
			attributes: ["position", "world0", "world1", "world2", "world3", "instanceID"],
			uniforms: ["world", "viewProjection", "depthValues", "time", "animationSpeed", "animationIntensity", "baseWaveIntensity", "mouseInfluenceRadius", "origin",
				"oldOrigin", "textGlow", "floatingOffset"]
		});
		this.monolithDepthMaterial.setFloat('animationSpeed', monolithOption.animationSpeed);
		this.monolithDepthMaterial.setFloat('animationIntensity', monolithOption.animationIntensity);
		this.monolithDepthMaterial.setFloat('baseWaveIntensity', monolithOption.baseWaveIntensity);
		this.monolithDepthMaterial.setFloat('mouseInfluenceRadius', monolithOption.mouseInfluenceRadius);

		this.depthMaterial.onBindObservable.add(() => {
			this.depthMaterial.setVector2("depthValues", new Vector2(this.camera.minZ, this.camera.maxZ));
			this.depthMaterial.setFloat("time", sceneManager.time);
		})
		this.grassDepthMaterial.onBindObservable.add(() => {
			this.grassDepthMaterial.setVector2("depthValues", new Vector2(this.camera.minZ, this.camera.maxZ));
			this.grassDepthMaterial.setFloat("time", sceneManager.time);
			this.grassDepthMaterial.setTexture("textureSampler", this.ballGrassTextureB);
		})
		this.monolithDepthMaterial.onBindObservable.add(() => {
			this.monolithDepthMaterial.setVector2("depthValues", new Vector2(this.camera.minZ, this.camera.maxZ));
			this.monolithDepthMaterial.setFloat("time", sceneManager.time);
			this.monolithDepthMaterial.setFloat("animationIntensity", this.monolithAnimationIntensity);
			this.monolithDepthMaterial.setVector3("origin", this.monolithOrigin);
			this.monolithDepthMaterial.setVector3("oldOrigin", this.monolithOldOrigin);
		})
	}

	private loadRootMandatory() {
		this.ballRoot = new TransformNode("ballRoot", this.scene);
		this.ballRoot.position.set(0, 0.75, 0);
		this.ballRoot.scalingDeterminant = 1.5;
		this.ballMesh.parent = this.ballRoot;
		this.ballLight.parent = this.ballRoot;

		this.monolithRoot = new TransformNode("monolithRoot", this.scene);
		this.cubeMesh.parent = this.monolithRoot;
		this.cubeLight.parent = this.monolithRoot;
		this.monolithMesh.parent = this.monolithRoot;

		this.butterflyRoot = new TransformNode("butterflyRoot", sceneManager.scene);
		this.butterflyRoot.position = new Vector3(0, 1.5, 0);
		this.butterflyRoot.scaling = new Vector3(0.5, 0.5, 0.5);
		this.butterflyMesh.parent = this.butterflyRoot;
	}

	private setupMonolithMesh() {
		this.monolithVoxelPositions = templeMedium.positions.map(([x, y, z]) =>
			new Vector3(x, y, z))

		const matrixes = new Float32Array(this.monolithVoxelPositions.length * 16);

		this.monolithMesh = MeshBuilder.CreateBox('voxel', {
			size: templeMedium.voxelSize,
			updatable: false
		}, this.scene);

		const tempMatrix = new Matrix();

		for (let i = 0; i < this.monolithVoxelPositions.length; i++) {
			const p = this.monolithVoxelPositions[i];
			Matrix.TranslationToRef(p.x, p.y, p.z, tempMatrix);
			tempMatrix.toArray(matrixes, i * 16);
		}

		this.monolithMesh.thinInstanceSetBuffer("matrix", matrixes, 16, true);
		this.monolithMesh.thinInstanceCount = this.monolithVoxelPositions.length;

		// this.monolithMesh.freezeWorldMatrix();
	}


}
