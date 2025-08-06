import { MeshBuilder, Scene, Vector3, Mesh, StandardMaterial, Vector2, TransformNode } from "@babylonImport";
import { Player } from "./Player";
import { BrickBreaker } from "./brickbreaker";


export class Ball {
	public ball: Mesh;
	public velocity: Vector3 = new Vector3(0, 0, 0);
	private speed: number = 10;
	private speedScale: number = 1;
	private touched: boolean = false;
	private scene: Scene;
	private matUntouched: StandardMaterial;
	private matTouched: StandardMaterial;
	private game: BrickBreaker;
	private delta: number;
	private newposition: Vector3 = new Vector3(0, 0.25, 0);
	private bricksLeft: number;
	private isDirty: boolean = false;

	constructor(scene: Scene, material: StandardMaterial, root: TransformNode, bricksNumber: number, game: BrickBreaker) {
		this.ball = MeshBuilder.CreateSphere("ball", { diameter: 0.5 }, scene);
		this.ball.parent = root;
		this.ball.position = new Vector3(0, 0.25, 0);
		this.ball.material = material;
		this.scene = scene;
		this.game = game;

		this.matTouched = new StandardMaterial("touchedMat", this.scene);
		this.matTouched.diffuseColor.set(0, 0, 1);
		this.matUntouched = new StandardMaterial("untouchedMat", this.scene);
		this.matUntouched.diffuseColor.set(1, 0, 0);
		this.bricksLeft = bricksNumber;
	}

	public updatePosition(x: number, z: number): void {
		this.ball.position.set(x, 0.25, z);
		this.newposition.set(x, 0.25, z);
	}

	public update(delta: number, player: Player, cols: number, layers: number, bricks: Mesh[][]): void {
		if (delta) {
			this.delta = delta;
			this.newposition.addInPlace(this.velocity.scale(this.delta));

			if (player.getAlive()) {
				const playerGoalPos = player.getPlayerGoal().position;
				const collideGoal = Math.sqrt((playerGoalPos.x - this.newposition.x)*(playerGoalPos.x - this.newposition.x)+(playerGoalPos.z - this.newposition.z)*(playerGoalPos.z - this.newposition.z)) - 0.25 < 0.35;
				const collideShield = this.detectCollisionShield(player);

				if (collideShield) {
					this.touched = true;
					this.ball.material = this.matTouched;
					const newOrientation = new Vector3(this.newposition.x - playerGoalPos.x, 0, this.newposition.z - playerGoalPos.z).normalize();
					this.velocity.set(newOrientation.x * this.speed * this.speedScale, 0, newOrientation.z * this.speed * this.speedScale);
					this.speedScale = Math.min(this.speedScale * 1.1, 5);
				} else if (collideGoal && this.isDirty) {
					this.touched = false;
					this.ball.material = this.matUntouched;
					player.die();
					const newOrientation = new Vector3(this.newposition.x - playerGoalPos.x, 0, this.newposition.z - playerGoalPos.z).normalize();
					this.velocity.set(newOrientation.x * this.speed * this.speedScale, 0, newOrientation.z * this.speed * this.speedScale);
				}
			}
			this.hitBrick(10, cols, layers, bricks);
			this.hitWall();
			this.updatePosition(this.newposition.x, this.newposition.z);
		}
	}

	private hitBrick(radius: number, cols: number, layers: number, bricks: Mesh[][]) {
		const dx = this.newposition.x;
		const dz = this.newposition.z;
		const distance = Math.sqrt(dx * dx + dz * dz);
		const angle = Math.atan2(dz, dx);
		const anglePositive = (angle + 2 * Math.PI) % (2 * Math.PI);

		const sectorAngle = 2 * Math.PI / cols;
		const colIndex = Math.floor(anglePositive / sectorAngle);

		const brickThickness = 0.8;
		const layerIndex = Math.floor((radius - (distance + 0.25)) / brickThickness);

		const radIn = radius - (brickThickness * layerIndex) - brickThickness;

		if (
			layerIndex >= 0 && layerIndex < layers &&
			colIndex >= 0 && colIndex < cols &&
			distance + 0.25 >= radIn
		) {
			const target = bricks[colIndex][layerIndex];
			if (target && target.isEnabled()) {
				if (this.touched) {
					target.setEnabled(false);
					this.bricksLeft--;
					this.ball.material = this.matUntouched;
					this.touched = false;
					this.isDirty = true;
				}
				if (this.bricksLeft == 0)
					this.endGame();
				const normal = new Vector3(this.newposition.x, 0, this.newposition.z).normalize();
				const dot = this.velocity.dot(normal);
				const reflect = this.velocity.subtract(normal.scale(2 * dot));
				this.velocity.copyFrom(reflect);

				const insidePos = normal.scale(radIn - 0.25 - 0.001);
				this.newposition.x = insidePos.x;
				this.newposition.z = insidePos.z;
			}
		}
	}

	private hitWall(): void {
		const arenaRadius = 10;
		const ballRadius = 0.25;
		const pos = this.newposition;

		const dist = Math.sqrt(pos.x * pos.x + pos.z * pos.z);

		if (dist + ballRadius >= arenaRadius) {
			if (this.touched) {
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
			this.isDirty = true;
		}
	}

	private detectCollisionShield(player: Player): boolean {
		const ballPosition = this.newposition;
		const shieldPosition = player.getPlayerGoal().position;
		const shieldRotation = player.getPlayerGoal().rotation.y; // value between PI and -PI
		const shieldAngle = player.getShieldAngle();
		if (player.getShieldActive() == 0)
			return false;

		const shieldRadius = 0.9;
		const ballRadius = 0.25;

		const v1 = new Vector3(ballPosition.x - shieldPosition.x, 0, ballPosition.z - shieldPosition.z);
		const len = Math.sqrt(v1.x * v1.x + v1.z * v1.z);
		const ballAngle = Math.atan2(v1.z, v1.x);
		const v2 = new Vector3(Math.cos(shieldRotation + ballAngle) * len, 0, Math.sin(shieldRotation + ballAngle) * len);
		const c = new Vector2(Math.sin(shieldAngle / 2 * Math.PI), Math.cos(shieldAngle / 2 * Math.PI));
		const bx = Math.abs(v2.x);
		const l = Math.sqrt((bx * bx) + (v2.z * v2.z)) - shieldRadius;
		const clamp = Math.min(Math.max((bx * c.x) + (v2.z * c.y), 0), shieldRadius);
		const m = Math.sqrt((bx - (c.x * clamp)) * (bx - (c.x * clamp)) + (v2.z - (c.y * clamp)) * (v2.z - (c.y * clamp)));
		const distance = Math.max(l, m * Math.sign((c.y * bx) - (c.x * v2.z)));

		return distance <= ballRadius;
	}

	private endGame(){
		// end screen UI
		this.game.dispose();
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
