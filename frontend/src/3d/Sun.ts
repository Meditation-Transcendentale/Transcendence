import { Color3, GlowLayer, Mesh, MeshBuilder, Scene, ShaderMaterial, StandardMaterial, TransformNode } from "@babylonImport";

export class Sun {
	private root: TransformNode;

	private center: Mesh;
	private shell: Mesh;
	//private layers: Mesh;
	//
	private centerMat: StandardMaterial;
	private shellMat: ShaderMaterial;

	private scene: Scene;

	private glowLayer: GlowLayer;

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
			attributes: ["position", "uv"],
			uniforms: ["world", "worldView", "worldViewProjection", "view", "projection", "time", "direction"],
			defines: [`#define CEIL ${0.7}`, `#define SIZE ${10}.`, `#define DIR vec2(${0.}, ${0.2})`],
			needAlphaBlending: true
		});


		this.center.material = this.centerMat;
		this.shell.material = this.shellMat;

		this.center.parent = this.root;
		this.shell.parent = this.root;
		// this.shell.setEnabled(false);
		this.root.position.set(50, 50, -100);
		this.root.scaling.setAll(50);

		// this.glowLayer = new GlowLayer("glow", this.scene);
		// this.glowLayer.intensity = 10.;
		// this.glowLayer.blurKernelSize = 64;

		// this.shellMat.emmisiveColor = new Color3(1, 1, 1);
		// this.glowLayer.addExcludedMesh(this.shell);
		// this.glowLayer.customEmissiveColorSelector = (mesh, subMesh, material, result) => {
		// 	if (material === this.shellMat) {
		// 		result.set(0, 0, 0, 1);
		// 	} else {
		// 		result.set(
		// 			material.emissiveColor.r,
		// 			material.emissiveColor.g,
		// 			material.emissiveColor.b,
		// 			material.alpha
		// 		)
		// 	}
		// }

	}

	public update(time: number) {
		this.shellMat.setFloat("time", time);
		this.shellMat.setFloat("rand", Math.random() * 0.005)
	}
}
