import { MeshBuilder, Scene, Vector3, Mesh, StandardMaterial, Color3, TransformNode } from "@babylonjs/core";

export class Paddle {
	private paddle: Mesh;
	private material!: StandardMaterial;


	constructor(scene: Scene, playerPos: Vector3, angle: number, parent: TransformNode) {
		this.paddle = MeshBuilder.CreateBox("paddle", { width: 2, height: 0.5, depth: 0.5 }, scene);
		this.paddle.parent = parent;
		this.paddle.setPivotPoint(playerPos);
		this.material = new StandardMaterial("paddleMaterial", scene);
		this.material.diffuseColor = new Color3(0, 0, 1);
		this.paddle.material = this.material;
		this.paddle.setAbsolutePosition(playerPos);
	}

	public move(x: number): void {
		const minX = -4; // Left wall
		const maxX = 4;  // Right wall

		this.paddle.position.x = Math.max(minX, Math.min(maxX, this.paddle.position.x + x));
	}


	public updatePosition(x: number): void {
		this.paddle.position.x = x; // Server-synced movement
	}

	public getMesh(): Mesh {
		return this.paddle;
	}
}
