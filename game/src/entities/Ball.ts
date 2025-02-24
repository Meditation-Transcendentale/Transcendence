import { MeshBuilder, Scene, Vector3, Mesh, StandardMaterial } from "@babylonjs/core";

export class Ball {
	private ball: Mesh;
	private lastServerPosition: Vector3 = new Vector3(0, 0, 0);
	private targetPosition: Vector3 = new Vector3(0, 0, 0);
	private velocity: Vector3 = new Vector3(0, 0, 0);
	private interpolationFactor: number = 1; // Adjust for smoothness

	constructor(scene: Scene, material: StandardMaterial) {
		this.ball = MeshBuilder.CreateSphere("ball", { diameter: 0.5 }, scene);
		this.ball.position = new Vector3(0, 0.25, 0);
		this.ball.material = material;
	}

	public updatePosition(x: number, z: number, vx: number, vz: number): void {
		this.lastServerPosition.copyFrom(this.targetPosition);
		this.targetPosition.set(x, 0.25, z);
		this.velocity.set(vx, 0, vz);
	}

	public update(serverState: any): void {
		// Predict ball movement
		//
		//this.targetPosition.x += this.velocity.x * deltatime / 1000 * 60; // Predict next 16ms
		//this.targetPosition.z += this.velocity.z * deltatime / 1000 * 60;
		//
		//// Smoothly interpolate towards target position
		////this.ball.position = Vector3.Lerp(this.ball.position, this.targetPosition, this.interpolationFactor);
		//this.ball.position.x = this.targetPosition.x;
		//this.ball.position.z = this.targetPosition.z;
		if (serverState) {
			// Calculate the time passed since the server update
			const now = Date.now();
			const elapsed = (now - serverState.timestamp) / 1000; // in seconds

			// Predict position based on velocity
			const predictedX = serverState.position.x + serverState.velocity.x * elapsed;
			const predictedY = serverState.position.y + serverState.velocity.y * elapsed;

			console.log(`Predicted Ball: x=${predictedX}, y=${predictedY}`);
			// Optionally, interpolate towards this predicted position using a factor
			this.ball.position.x = this.lerp(this.ball.position.x, predictedX, this.interpolationFactor);
			this.ball.position.z = this.lerp(this.ball.position.z, predictedY, this.interpolationFactor);
			//this.ball.position.x = predictedX;
			//this.ball.position.z = predictedY;
		}
	}
	private lerp(start: number, end: number, t: number): number {
		return start + (end - start) * t;
	}
	public update2(): void {
		// Predict ball movement
		//this.targetPosition.x += this.velocity.x * 0.016; // Predict next 16ms
		//this.targetPosition.z += this.velocity.z * 0.016;

		// Smoothly interpolate towards target position
		//this.ball.position = Vector3.Lerp(this.ball.position, this.targetPosition, this.interpolationFactor);
		this.ball.position.x += this.velocity.x;
		this.ball.position.z += this.velocity.z;
	}

	public getMesh(): Mesh {
		return this.ball;
	}
}

