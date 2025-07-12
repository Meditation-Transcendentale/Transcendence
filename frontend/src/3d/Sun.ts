import { CascadedShadowGenerator, Color3, DirectionalLight, Engine, HemisphericLight, Light, Mesh, MeshBuilder, PointLight, Scene, ShaderMaterial, ShadowDepthWrapper, ShadowGenerator, SpotLight, StandardMaterial, Texture, TransformNode, Vector3 } from "@babylonImport";


export class Sun {
	private root: TransformNode;

	private center: Mesh;
	private shell: Mesh;
	//private layers: Mesh;
	//
	private centerMat: StandardMaterial;
	private shellMat: ShaderMaterial;

	private scene: Scene;

	private light: Light;
	private hemish: HemisphericLight;
	private sunShadow: ShadowGenerator;
	public shadow: ShadowGenerator;

	// private glowLayer: GlowLayer;

	constructor(scene: Scene) {
		this.scene = scene;

		this.root = new TransformNode("sunRoot", this.scene, true);
		this.center = MeshBuilder.CreateSphere("sunCenter", {
			segments: 10,
			diameter: 1
		}, this.scene);

		this.shell = MeshBuilder.CreateSphere("sunShell", {
			segments: 20,
			diameter: 1.01
		}, this.scene);

		this.centerMat = new StandardMaterial("sunCenter", this.scene);
		this.centerMat.emissiveColor = Color3.White();
		this.centerMat.diffuseColor = Color3.Black();

		this.shellMat = new ShaderMaterial("cloud", this.scene, 'shell', {
			attributes: ["position", "uv", "normal"],
			uniforms: ["world", "worldView", "worldViewProjection", "view", "projection", "time", "direction"],
			defines: [`#define CEIL ${0.7}`, `#define SIZE ${10}.`, `#define DIR vec2(${0}., ${0.02})`],
			needAlphaTesting: true,
			needAlphaBlending: true
		});
		this.shellMat.backFaceCulling = false;


		this.center.material = this.centerMat;
		this.shell.material = this.shellMat;

		this.center.parent = this.root;
		this.shell.parent = this.root;
		// this.shell.setEnabled(false);
		this.root.position.set(0, 50, -10);
		this.root.scaling.setAll(50);

		// this.light = new PointLight("light", Vector3.Zero(), this.scene);
		this.light = new SpotLight("light", Vector3.Zero(), new Vector3(-0, -50, 0).normalize(), Math.PI * 0.2, 0, this.scene);
		const li = new SpotLight("fake light", Vector3.Zero(), new Vector3(-0, -50, 0).normalize(), Math.PI * 0.2, 0, this.scene);
		li.parent = this.root;
		li.intensity = 0.5;
		this.light.parent = this.root;
		this.light.intensity = 1.;
		// const l = new DirectionalLight("light2", new Vector3(0, -1, 0), this.scene);
		// this.light.parent = this.root;
		// //
		this.hemish = new HemisphericLight("hemish", new Vector3(1, 1, 1), this.scene);
		this.hemish.intensity = 0.2;

		this.shadow = new ShadowGenerator(1024, this.light);

		this.shadow.transparencyShadow = true;
		// this.shadow.enableSoftTransparentShadow = true;
		// this.shadow.useBlurExponentialShadowMap = true;
		// this.shadow.blurKernel = 2;

		this.shadow.setDarkness(0.);
		this.shadow.bias = 0.0003;

		// this.shadow.useAlphaTest = true;
		// this.shadow.usePoissonSampling = true;
		// this.shadow.normalBias = 0.1;
		this.shadow.usePercentageCloserFiltering = true;
		// this.shadow.filteringQuality = CascadedShadowGenerator.QUALITY_LOW;
		// this.shadow.getShadowMap()!.renderList?.push(this.shell);
		// this.shadow.useAlphaTesting = true;
		// this.sunShadow = new ShadowGenerator(720, li);
		// this.sunShadow.transparencyShadow = true;
		// this.sunShadow.setDarkness(0.2);
		// this.sunShadow.bias = 0.0003;
		// this.shadow.addShadowCaster(this.shell);


		this.shellMat.shadowDepthWrapper = new ShadowDepthWrapper(this.shellMat, this.scene, {
			remappedVariables: ["worldPos", "p", "vNormalW", "normalW"]
		});

		// const vls = new VolumetricLightScatteringPostProcess("vls",
		// 	{ postProcessRatio: 1, passRatio: 0.5 },
		// 	this.scene.getCameraByName("fieldCam"),
		// 	this.scene.getMeshByName("sunShell") as Mesh,
		// 	40,
		// 	Texture.NEAREST_SAMPLINGMODE,
		// 	this.scene.getEngine(),
		// 	false);
		// vls.exposure = 0.2;
		// vls.decay = 0.91815;
		// vls.weight = 0.88767;
		// vls.density = 0.926;


	}

	public update(time: number) {
		this.shellMat.setFloat("time", time);
		this.shellMat.setFloat("rand", Math.random() * 0.005)
	}
}
