import { MeshBuilder, Scene, Vector3, Mesh, StandardMaterial, Color3, GlowLayer, ShadowGenerator, DirectionalLight } from "@babylonjs/core";
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

    public update(delta: number): void {

        // Linear interpolation for smooth movement
        this.ball.position.x += (this.targetPosition.x - this.ball.position.x) * 0.1;
        this.ball.position.z += (this.targetPosition.z - this.ball.position.z) * 0.1;

        // Simulate real movement based on velocity
        this.ball.position.x += this.velocity.x * delta;
        this.ball.position.z += this.velocity.z * delta;
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
}
//import { MeshBuilder, Scene, Vector3, Mesh, StandardMaterial } from "@babylonjs/core";
//
//export class Ball {
//	public ball: Mesh;
//	private targetPosition: Vector3 = new Vector3(0, 0, 0);
//	public velocity: Vector3 = new Vector3(0, 0, 0);
//
//	constructor(scene: Scene, material: StandardMaterial) {
//		this.ball = MeshBuilder.CreateSphere("ball", { diameter: 0.5 }, scene);
//		this.ball.position = new Vector3(0, 0.25, 0);
//		this.ball.material = material;
//	}
//
//	public updatePosition(x: number, z: number, vx: number, vz: number): void {
//		this.targetPosition.set(x, 0.25, z);
//		this.velocity.set(vx, 0, vz);
//	}
//
//	public update(delta: number): void {
//		if (delta) {
//			const predictedX = Math.max(-4.65, Math.min(this.ball.position.x + this.velocity.x * delta, 4.65));
//			const predictedY = Math.max(-9, Math.min(this.ball.position.z + this.velocity.y * delta, 9));
//
//			this.ball.position.x = predictedX;
//			this.ball.position.z = predictedY;
//		}
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
//	public setPosition(position: Vector3): void {
//		this.ball.position.x = position.x;
//		this.ball.position.z = position.y;
//	}
//	public setVelocity(velocity: Vector3): void {
//		this.velocity.copyFrom(velocity);
//	}
//}
