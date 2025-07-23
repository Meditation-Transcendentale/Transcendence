import { MeshBuilder, Scene, Vector3, Mesh, StandardMaterial } from "@babylonjs/core";
import { Player } from "../.oldPongIO/Player";

export class Ball {
	public ball: Mesh;
	private targetPosition: Vector3 = new Vector3(0, 0, 0);
	public velocity: Vector3 = new Vector3(0, 0, 0);
	private speed: number = 20;

	constructor(scene: Scene, material: StandardMaterial) {
		this.ball = MeshBuilder.CreateSphere("ball", { diameter: 0.5 }, scene);
		this.ball.position = new Vector3(0, 0.25, 0);
		this.ball.material = material;
	}

	public updatePosition(x: number, z: number, vx: number, vz: number): void {
		this.targetPosition.set(x, 0.25, z);
		this.velocity.set(vx, 0, vz);
	}

	public update(delta: number, player: Player): void {
		if (delta) {
			const ballPosition = this.ball.position;

			if (player.getAlive()){
				const playerGoalPos = player.getPlayerGoal().position;
				const collideGoal = Vector3.Distance(playerGoalPos, ballPosition) - 0.25 < 0.5;
				const collideShield = this.detectCollisionShield(player);

				if (collideGoal) {
					player.die();
				}

				if (collideGoal || collideShield){
					const newOrientation = new Vector3(ballPosition.x - playerGoalPos.x , 0, ballPosition.z - playerGoalPos.z).normalize();
					this.velocity.set(newOrientation.x * this.speed, 0, newOrientation.z * this.speed);
				}
			}
			this.hitWall();
			ballPosition.addInPlace(this.velocity.scale(delta));
		}
	}

	private hitWall(): void {
		const arenaRadius = 10;
		const ballRadius = 0.25;
		const pos = this.ball.position;

		const dist = Math.sqrt(pos.x * pos.x + pos.z * pos.z);

		if (dist + ballRadius >= arenaRadius) {
			const normal = new Vector3(pos.x, 0, pos.z).normalize();
			const dot = this.velocity.dot(normal);
			const reflect = this.velocity.subtract(normal.scale(2 * dot));
			this.velocity.copyFrom(reflect);
			
			// reposition juste à l’intérieur pour éviter stuck
			const insidePos = normal.scale(arenaRadius - ballRadius - 0.001);
			pos.x = insidePos.x;
			pos.z = insidePos.z;
		}
	}

	private detectCollisionShield(player: Player): boolean {
		const ballPosition = this.ball.position;
		const shieldPosition = player.getPlayerGoal().position;
		const shieldRotation = player.getPlayerGoal().rotation.y; // value between PI and -PI
		const shieldAngle = player.getShieldAngle();

		const shieldRadius = 0.825;
		const ballRadius = 0.25;

		const v1 = new Vector3(ballPosition.x-shieldPosition.x, 0, ballPosition.z-shieldPosition.z);
		const ballLen = v1.length();
		v1.normalize();
		const v2 = new Vector3(Math.sin(shieldRotation), 0, Math.cos(shieldRotation));

		const dot = (v1.x * v2.x) + (v1.z * v2.z);
		const det = (v1.x * v2.z) - (v1.z * v2.x);
		const angle = Math.atan2(det, dot);

		return (Math.abs(angle) <= shieldAngle) && (shieldAngle > 0) && (ballLen - ballRadius <= shieldRadius) && (ballLen - ballRadius > 0.5) && (player.getPlayerShield().visibility == 1);
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
		this.ball.position.z = position.y;
	}
	public setVelocity(velocity: Vector3): void {
		this.velocity.copyFrom(velocity);
	}
}
