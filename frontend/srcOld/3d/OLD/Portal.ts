import { Color3, Material, Mesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from "@babylonImport";

export class Portal {
	public mesh: Mesh;
	private material: StandardMaterial;

	constructor(scene: Scene) {
		this.mesh = MeshBuilder.CreatePlane("portal", {
			width: 5,
			height: 3
		}, scene);
		this.material = new StandardMaterial("portal", scene);
		this.material.diffuseColor = Color3.Black();
		this.material.specularColor = Color3.Black();
		this.material.specularPower = 0;
		this.material.disableColorWrite = false;
		this.material.forceDepthWrite = true;
		this.material.fogEnabled = false;
		this.mesh.material = this.material;
		this.mesh.position.y = 3;
		this.mesh.position.set(0, 5, -40);
		this.mesh.rotation = new Vector3(0, Math.PI, 0);
	}
}
