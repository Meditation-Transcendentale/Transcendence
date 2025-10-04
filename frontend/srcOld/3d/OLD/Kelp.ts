import { LoadAssetContainerAsync, Mesh, Scene, ShaderMaterial } from "@babylonImport";

export class Kelp {
	private scene: Scene;

	private mesh!: Mesh;
	private material: ShaderMaterial;

	public depth = 50;

	constructor(scene: Scene) {
		this.scene = scene;
		this.material = new ShaderMaterial("kelp", this.scene, "kelp", {
			attributes: ["position", "normal", "uv", "worl0", "world1", "world2", "world3"],
			uniforms: ["world", "view", "projection"],
			needAlphaBlending: false,
			needAlphaTesting: false,
		})
		this.material.backFaceCulling = false;
	}

	public async init() {

	}

	public async loadAssets() {
		const loaded = await LoadAssetContainerAsync("/assets/grassLOD.glb", this.scene);
	}
}
