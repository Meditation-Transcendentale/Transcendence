import { MeshBuilder, Scene, Vector3, Mesh, StandardMaterial, Color3 } from "@babylonjs/core";

export class Corner {
	private cornerMesh: Mesh;
	private position: Vector3 = new Vector3(0, 0, 0);
	private material: StandardMaterial;


	constructor(scene: Scene, position: Vector3) {
		this.cornerMesh = MeshBuilder.CreateBox("corner", { width: 2, height: 0.5, depth: 0.5 }, scene);
		this.material = new StandardMaterial("cornermaterial", scene);
		this.material.diffuseColor = new Color3(1, 0, 0);
		this.cornerMesh.material = this.material;
		this.cornerMesh.position = position;
	}

	public getMesh(): Mesh {
		return this.cornerMesh;
	}
}
