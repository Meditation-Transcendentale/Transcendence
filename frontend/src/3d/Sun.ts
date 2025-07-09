import { CascadedShadowGenerator, Color3, DirectionalLight, Engine, Light, Mesh, MeshBuilder, PointLight, Scene, ShaderMaterial, ShadowDepthWrapper, ShadowGenerator, StandardMaterial, TransformNode, Vector3 } from "@babylonImport";


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

	private shadow: ShadowGenerator;

	// private glowLayer: GlowLayer;

	constructor(scene: Scene) {
		this.scene = scene;

		this.root = new TransformNode("sunRoot", this.scene, true);
		this.center = MeshBuilder.CreateSphere("sunCenter", {
			segments: 10,
			diameter: 1
		}, this.scene);

		this.shell = MeshBuilder.CreateSphere("sunShell", {
			segments: 100,
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
		});
		this.shellMat.backFaceCulling = false;


		this.center.material = this.centerMat;
		this.shell.material = this.shellMat;

		this.center.parent = this.root;
		this.shell.parent = this.root;
		// this.shell.setEnabled(false);
		this.root.position.set(50, 50, 100);
		this.root.scaling.setAll(50);

		this.light = new PointLight("light", Vector3.Zero(), this.scene);
		const l = new DirectionalLight("light2", new Vector3(0, -1, 0), this.scene);
		this.light.parent = this.root;

		this.shadow = new ShadowGenerator(1024, this.light);
		this.shadow.transparencyShadow = true;


		this.shadow.setDarkness(0.1);
		this.shadow.usePoissonSampling = true;
		this.shadow.bias = 0.003;
		//this.shadow.normalBias = 0.1;
		// this.shadow.usePercentageCloserFiltering = true;
		// this.shadow.filteringQuality = CascadedShadowGenerator.QUALITY_LOW;
		// this.shadow.getShadowMap()!.renderList?.push(this.shell);
		this.shadow.addShadowCaster(this.shell);
		// this.shadow.useAlphaTesting = true;


		this.shellMat.shadowDepthWrapper = new ShadowDepthWrapper(this.shellMat, this.scene, {
			remappedVariables: ["worldPos", "p", "vNormalW", "normalW"]
		});


	}

	public update(time: number) {
		this.shellMat.setFloat("time", time);
		this.shellMat.setFloat("rand", Math.random() * 0.005)
	}
}
