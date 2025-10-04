import { Vector3, ArcRotateCamera, Scalar } from "@babylonImport";
import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { InputComponent } from "../components/InputComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { InputManager } from "../input/InputManager.js";

export class CameraFollowSystem extends System {
	private camera: ArcRotateCamera;
	private inputManager: InputManager;
	private arenaCenter: Vector3 = Vector3.Zero();
	private baseAngle: number | null = null;
	private followDistance: number = 150;
	private height: number = 10;
	private rotationOffset: number = 0;
	private maxRotationOffset: number = Math.PI / 6;
	private rotationSpeed: number = 0.00005;
	private decayRate: number = 0.05;

	constructor(camera: ArcRotateCamera, inputManager: InputManager) {
		super();
		this.camera = camera;
		this.inputManager = inputManager;
	}

	update(entities: Entity[], deltaTime: number): void {
		const now = performance.now();
		// console.log("camera: ", now);
		const localPaddle = entities.find(entity => {
			const input = entity.getComponent(InputComponent);
			return input && input.isLocal;
		});
		if (!localPaddle) { return; }
		const transform = localPaddle.getComponent(TransformComponent);
		if (!transform) { return; }

		if (this.baseAngle === null) {
			const diff = transform.position.subtract(this.arenaCenter);
			this.baseAngle = Math.atan2(diff.z, diff.x);
			console.log("Base angle set to:", this.baseAngle);
		}

		if (this.inputManager.isKeyPressed("ArrowLeft")) {
			this.rotationOffset += this.rotationSpeed * deltaTime;
			if (this.rotationOffset > this.maxRotationOffset) {
				this.rotationOffset = this.maxRotationOffset;
			}
		} else if (this.inputManager.isKeyPressed("ArrowRight")) {
			this.rotationOffset -= this.rotationSpeed * deltaTime;
			if (this.rotationOffset < -this.maxRotationOffset) {
				this.rotationOffset = -this.maxRotationOffset;
			}
		} else {
			this.rotationOffset = Scalar.Lerp(this.rotationOffset, 0, this.decayRate);
		}

		const finalAngle = this.baseAngle + this.rotationOffset;

		const desiredPos = new Vector3(
			this.arenaCenter.x + this.followDistance * Math.cos(finalAngle),
			this.arenaCenter.y + this.height,
			this.arenaCenter.z + this.followDistance * Math.sin(finalAngle)
		);

		this.camera.target.copyFrom(this.arenaCenter);
		this.camera.setPosition(desiredPos);
	}
}
