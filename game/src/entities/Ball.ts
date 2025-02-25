import { MeshBuilder, Scene, Vector3, Mesh, StandardMaterial } from "@babylonjs/core";

export class Ball {
	public ball: Mesh;
	private targetPosition: Vector3 = new Vector3(0, 0, 0);
	public velocity: Vector3 = new Vector3(0, 0, 0);

	constructor(scene: Scene, material: StandardMaterial) {
		this.ball = MeshBuilder.CreateSphere("ball", { diameter: 0.5 }, scene);
		this.ball.position = new Vector3(0, 0.25, 0);
		this.ball.material = material;
	}

	public updatePosition(x: number, z: number, vx: number, vz: number): void {
		this.targetPosition.set(x, 0.25, z);
		this.velocity.set(vx, 0, vz);
	}

	public update(serverState: any): void {
		if (serverState) {
			//const now = performance.now();
			//let elapsed = (now - serverState.timestamp) / 1000;
			//elapsed = Math.max(0, Math.min(elapsed, 0.02));

			//console.log("velocity = " + serverState.velocity.x + " " + serverState.velocity.y);
			//const predictedX = Math.max(-4.5, Math.min(serverState.position.x + serverState.velocity.x * elapsed, 4.5));
			//const predictedY = Math.max(-10, Math.min(serverState.position.y + serverState.velocity.y * elapsed, 10));
			const predictedX = Math.max(-4.65, Math.min(this.ball.position.x + serverState.velocity.x, 4.65));
			const predictedY = Math.max(-9, Math.min(this.ball.position.z + serverState.velocity.y, 9));
			//console.log("x=" + predictedX + "y=" + predictedY);
			let interpolationFactor = 0.2;

			//const velocityChangeThreshold = 0.05;
			//if (Math.abs(serverState.velocity.x - this.velocity.x) > velocityChangeThreshold ||
			//	Math.abs(serverState.velocity.y - this.velocity.y) > velocityChangeThreshold) {
			//	this.velocity.x = serverState.velocity.x;
			//	this.velocity.y = serverState.velocity.y;
			//	this.ball.position.x = serverState.position.x;
			//	this.ball.position.z = serverState.position.y;
			//	interpolationFactor = 0.1;
			//}

			//this.ball.position.x = this.lerp(this.ball.position.x, predictedX, interpolationFactor);
			//this.ball.position.z = this.lerp(this.ball.position.z, predictedY, interpolationFactor);
			this.ball.position.x = predictedX;
			this.ball.position.z = predictedY;
			//this.ball.position.x = this.kalmanFilter(this.ball.position.x, predictedX, 0.01, 0.015, 1);
			//this.ball.position.z = this.kalmanFilter(this.ball.position.z, predictedY, 0.01, 0.015, 1);
			//this.ball.position.x = this.smoothstep(this.ball.position.x, predictedX, 0.8);
			//this.ball.position.z = this.smoothstep(this.ball.position.z, predictedY, 0.8);


		}
	}
	private smoothstep(start: number, end: number, t: number): number {
		t = Math.max(0, Math.min(1, t)); // Clamp t between 0 and 1
		t = t * t * (3 - 2 * t); // Smoothstep function
		return start + (end - start) * t;
	}
	private kalmanFilter(
		previousEstimate: number,
		measurement: number,
		errorEstimate: number,
		errorMeasure: number,
		gainFactor: number
	): number {
		const kalmanGain = errorEstimate / (errorEstimate + errorMeasure); // Compute Kalman Gain
		const newEstimate = previousEstimate + kalmanGain * (measurement - previousEstimate); // Update Estimate
		return newEstimate * gainFactor + previousEstimate * (1 - gainFactor); // Apply gain factor
	}

	private lerp(start: number, end: number, t: number): number {
		const distance = Math.abs(end - start);
		const adaptiveFactor = distance > 0.3 ? 0.15 : 0.03;
		t = Math.max(0, Math.min(1, adaptiveFactor));
		return start + (end - start) * t;
	}

	public getMesh(): Mesh {
		return this.ball;
	}
	public getPosition(): Vector3 {
		return this.ball.position;
	}
	public getVelocity(): Vector3 {
		return this.velocity;
	}
	public setPosition(position: Vector3): void {
		this.ball.position.x = position.x;
		this.ball.position.z = position.z;
	}

	public setVelocity(velocity: Vector3): void {
		this.velocity.copyFrom(velocity);
	}

	public interpolatePosition(targetPosition: Vector3, interpolationFactor: number): void {
		this.ball.position.x = this.lerp(this.ball.position.x, targetPosition.x, interpolationFactor);
		this.ball.position.z = this.lerp(this.ball.position.z, targetPosition.z, interpolationFactor);
	}

	public interpolateVelocity(targetVelocity: Vector3, interpolationFactor: number): void {
		this.velocity.x = this.lerp(this.velocity.x, targetVelocity.x, interpolationFactor);
		this.velocity.y = this.lerp(this.velocity.y, targetVelocity.y, interpolationFactor);
	}
}


//import { MeshBuilder, Scene, Vector3, Mesh, StandardMaterial } from "@babylonjs/core";
//
//export class Ball {
//	public ball: Mesh;
//	private lastServerPosition: Vector3 = new Vector3(0, 0, 0);
//	private targetPosition: Vector3 = new Vector3(0, 0, 0);
//	public velocity: Vector3 = new Vector3(0, 0, 0);
//	private interpolationFactor: number = 0.6; // Adjust for smoothness
//
//	constructor(scene: Scene, material: StandardMaterial) {
//		this.ball = MeshBuilder.CreateSphere("ball", { diameter: 0.5 }, scene);
//		this.ball.position = new Vector3(0, 0.25, 0);
//		this.ball.material = material;
//	}
//
//	public updatePosition(x: number, z: number, vx: number, vz: number): void {
//		this.lastServerPosition.copyFrom(this.targetPosition);
//		this.targetPosition.set(x, 0.25, z);
//		this.velocity.set(vx, 0, vz);
//	}
//	public update(serverState: any): void {
//		if (serverState) {
//			const now = performance.now();
//			let elapsed = (now - serverState.timestamp) / 1000;
//			elapsed = Math.max(0, Math.min(elapsed, 0.02));
//
//			const predictedX = Math.max(-4.74, Math.min(serverState.position.x + serverState.velocity.x * elapsed, 4.74));
//			const predictedY = Math.max(-9.74, Math.min(serverState.position.y + serverState.velocity.y * elapsed, 9.74));
//			let interpolationFactor = 0.15; // Less aggressive smoothing
//
//			// ✅ Detect sudden velocity changes (bounce event)
//			const velocityChangeThreshold = 0.05;
//			if (Math.abs(serverState.velocity.x - this.velocity.x) > velocityChangeThreshold ||
//				Math.abs(serverState.velocity.y - this.velocity.y) > velocityChangeThreshold) {
//				this.velocity.x = serverState.velocity.x;
//				this.velocity.y = serverState.velocity.y;
//				this.ball.position.x = serverState.position.x;
//				this.ball.position.z = serverState.position.y;
//
//				interpolationFactor = 0.4;
//			}
//
//			// Apply interpolation for smoother correction
//			this.ball.position.x = this.lerp(this.ball.position.x, predictedX, interpolationFactor);
//			this.ball.position.z = this.lerp(this.ball.position.z, predictedY, interpolationFactor);
//		}
//	}
//
//	//public update(serverState: any): void {
//	//	if (serverState) {
//	//		// Use `performance.now()` for better timing accuracy
//	//		const now = performance.now();
//	//		let elapsed = (now - serverState.timestamp) / 1000; // Clamp to prevent overshooting
//	//		elapsed = Math.max(0, Math.min(elapsed, 0.02));
//	//		// Predict position based on velocity
//	//		const predictedX = serverState.position.x + serverState.velocity.x * elapsed;
//	//		const predictedY = serverState.position.y + serverState.velocity.y * elapsed;
//	//
//	//		// Log for debugging
//	//		//console.log(`Predicted Ball: x=${predictedX}, y=${predictedY}, elapsed=${elapsed}s`);
//	//
//	//		// Smoothly interpolate towards the predicted position to prevent snapping
//	//		const interpolationFactor = 0.9; // Adjust for smoother movement
//	//		this.ball.position.x = this.lerp(this.ball.position.x, predictedX, interpolationFactor);
//	//		this.ball.position.z = this.lerp(this.ball.position.z, predictedY, interpolationFactor);
//	//	}
//	//}
//	private lerp(start: number, end: number, t: number): number {
//		const distance = Math.abs(end - start);
//
//		// Adaptive interpolation: Large corrections = faster smoothing, Small corrections = slower smoothing
//		const adaptiveFactor = distance > 0.3 ? 0.15 : 0.03; // Adjust for jitter smoothing
//		t = Math.max(0, Math.min(1, adaptiveFactor));
//
//		return start + (end - start) * t;
//	}
//
//	public update2(): void {
//		// Predict ball movement
//		//this.targetPosition.x += this.velocity.x * 0.016; // Predict next 16ms
//		//this.targetPosition.z += this.velocity.z * 0.016;
//
//		// Smoothly interpolate towards target position
//		//this.ball.position = Vector3.Lerp(this.ball.position, this.targetPosition, this.interpolationFactor);
//		this.ball.position.x += this.velocity.x;
//		this.ball.position.z += this.velocity.z;
//	}
//
//	public getMesh(): Mesh {
//		return this.ball;
//	}
//	public getPosition(): Vector3 {
//		return this.ball.position;
//	}
//	public getVelocity(): Vector3 {
//		return this.velocity;
//	}
//}
//
