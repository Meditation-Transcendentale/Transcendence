import { MeshBuilder, Scene, Vector3, Mesh, StandardMaterial, Color3 } from "@babylonjs/core";

export class Paddle {
	private paddle: Mesh;
	private isPlayer: boolean;
	private material!: StandardMaterial;


	constructor(scene: Scene, position: Vector3, isPlayer: boolean) {
		this.isPlayer = isPlayer;
		this.paddle = MeshBuilder.CreateBox("paddle", { width: 2, height: 0.5, depth: 0.5 }, scene);
		this.material = new StandardMaterial("paddleMaterial", scene);
		this.material.diffuseColor = new Color3(0, 0, 1);
		this.paddle.material = this.material;
		this.paddle.position = position;
	}

	public move(x: number): void {
		if (this.isPlayer) {
			const minX = -4; // Left wall
			const maxX = 4;  // Right wall

			this.paddle.position.x = Math.max(minX, Math.min(maxX, this.paddle.position.x + x));
		}
	}


	public updatePosition(x: number): void {
		this.paddle.position.x = x; // Server-synced movement
	}

	public getMesh(): Mesh {
		return this.paddle;
	}
}
