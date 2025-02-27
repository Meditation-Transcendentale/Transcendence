import { MeshBuilder, Scene, Vector3, Mesh, StandardMaterial, Color3, TransformNode } from "@babylonjs/core";

export class CollisionComponent {
	private leftCornerPos: Vector3;
	private rightCornerPos: Vector3;
	private leftCorner: Mesh;
	private rightCorner: Mesh;
	private paddleMesh: Mesh;
	private playerPos: Vector3;
	private material: StandardMaterial;


	constructor(scene: Scene, playerPos: Vector3, paddle: Mesh, angle: number, parent: TransformNode) {
		this.playerPos = playerPos;
		console.log("player pos =" + playerPos);
		this.leftCornerPos = playerPos;
		this.leftCornerPos.x -= 5;
		console.log("left corner pos =" + this.leftCornerPos);
		this.rightCornerPos = playerPos;
		this.rightCornerPos.x += 5;
		this.paddleMesh = paddle;
		this.leftCorner = MeshBuilder.CreateBox("leftcorner", { width: 0.5, height: 2, depth: 0.5 }, scene);
		this.leftCorner.parent = parent;
		this.leftCorner.setPivotPoint(playerPos);
		this.rightCorner = MeshBuilder.CreateBox("rightcorner", { width: 0.5, height: 2, depth: 0.5 }, scene);
		this.rightCorner.parent = parent;
		this.rightCorner.setPivotPoint(playerPos);
		this.material = new StandardMaterial("cornerMaterial", scene);
		this.material.diffuseColor = new Color3(0, 0, 0);
		this.leftCorner.material = this.material;
		this.rightCorner.material = this.material;
		this.leftCorner.position.x = playerPos.x - 5;
		this.leftCorner.position.y = playerPos.y + 0.5;
		this.leftCorner.position.z = playerPos.z;
		this.rightCorner.position.x = playerPos.x + 5;
		this.rightCorner.position.y = playerPos.y + 0.5;
		this.rightCorner.position.z = playerPos.z;
	}

}
