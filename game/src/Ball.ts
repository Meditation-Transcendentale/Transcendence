import { MeshBuilder, Scene, Vector3, Vector2, Mesh, StandardMaterial } from "@babylonjs/core";
import { Player } from "../.oldPongIO/Player";


export class Ball {
	public ball: Mesh;
	public velocity: Vector3 = new Vector3(0, 0, 0);
	private speed: number = 10;
	private speedScale: number = 1;
	private touched: boolean = false;
	private scene: Scene;
	private matUntouched: StandardMaterial;
	private matTouched: StandardMaterial;

	constructor(scene: Scene, material: StandardMaterial) {
		this.ball = MeshBuilder.CreateSphere("ball", { diameter: 0.5 }, scene);
		this.ball.position = new Vector3(0, 0.25, 0);
		this.ball.material = material;
		this.scene = scene;

		this.matTouched = new StandardMaterial("touchedMat", this.scene);
		this.matTouched.diffuseColor.set(0, 0, 1);
		this.matUntouched = new StandardMaterial("untouchedMat", this.scene);
		this.matUntouched.diffuseColor.set(1, 0, 0);
	}

	public updatePosition(x: number, z: number, vx: number, vz: number): void {
		this.ball.position.set(x, 0.25, z);
		this.velocity.set(vx, 0, vz);
	}

	public update(delta: number, player: Player, cols: number, layers: number, bricks: Mesh[][]): void {
		if (delta) {
			const ballPosition = this.ball.position;

			if (player.getAlive()){
				const playerGoalPos = player.getPlayerGoal().position;
				const collideGoal = Vector3.Distance(playerGoalPos, ballPosition) - 0.25 < 0.5;
				const collideShield = this.detectCollisionShield(player);

				if (collideShield){
					this.touched = true;
					this.ball.material = this.matTouched;
					const newOrientation = new Vector3(ballPosition.x - playerGoalPos.x , 0, ballPosition.z - playerGoalPos.z).normalize();
					this.velocity.set(newOrientation.x * this.speed * this.speedScale, 0, newOrientation.z * this.speed * this.speedScale);
					this.speedScale = Math.min(this.speedScale * 1.1, 5);
					console.log(this.speedScale);
				} else if (collideGoal) {
					this.touched = false;
					this.ball.material = this.matUntouched;
					player.die();
					const newOrientation = new Vector3(ballPosition.x - playerGoalPos.x , 0, ballPosition.z - playerGoalPos.z).normalize();
					this.velocity.set(newOrientation.x * this.speed * this.speedScale, 0, newOrientation.z * this.speed * this.speedScale);
				}
			}
			this.hitBrick(10, cols, layers, bricks);
			this.hitWall();
			ballPosition.addInPlace(this.velocity.scale(delta));
		}
	}

	private hitBrick(radius: number, cols: number, layers: number, bricks: Mesh[][]){

		const dx = this.ball.position.x;
		const dz = this.ball.position.z;
		const distance = Math.sqrt(dx * dx + dz * dz);
		const angle = Math.atan2(dz, dx);
		const anglePositive = (angle + 2 * Math.PI) % (2 * Math.PI);

		const sectorAngle = 2 * Math.PI / cols;
		const colIndex = Math.floor(anglePositive / sectorAngle);

		const brickThickness  = 0.4 * 2;
		const layerIndex = Math.floor((radius - (distance + 0.25)) / brickThickness );

		const radOut = radius - (brickThickness * layerIndex);
		const radIn = radOut - brickThickness ;

		if (
			layerIndex >= 0 && layerIndex < layers &&
			colIndex >= 0 && colIndex < cols &&
			distance + 0.5 >= radIn && distance - 0.5 <= radOut
		) {
			const target = bricks[colIndex][layerIndex];
			if (target && target.isEnabled()) {
				console.log(target.isEnabled())
				if (this.touched){
					target.setEnabled(false); 
					this.ball.material = this.matUntouched; 
					this.touched = false;
				}
				const normal = new Vector3(this.ball.position.x, 0, this.ball.position.z).normalize();
				const dot = this.velocity.dot(normal);
				const reflect = this.velocity.subtract(normal.scale(2 * dot));
				this.velocity.copyFrom(reflect);
	
				const insidePos = normal.scale(radIn - 0.25 - 0.001);
				this.ball.position.x = insidePos.x;
				this.ball.position.z = insidePos.z;
			}
		}
	}

	private hitWall(): void {
		const arenaRadius = 10;
		const ballRadius = 0.25;
		const pos = this.ball.position;

		const dist = Math.sqrt(pos.x * pos.x + pos.z * pos.z);

		if (dist + ballRadius >= arenaRadius) {
			if (this.touched){
				this.ball.material = this.matUntouched;
				this.touched = false;
			}
			const normal = new Vector3(pos.x, 0, pos.z).normalize();
			const dot = this.velocity.dot(normal);
			const reflect = this.velocity.subtract(normal.scale(2 * dot));
			this.velocity.copyFrom(reflect);
  
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
		if (player.getShieldActive() == 0)
			return false;

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
