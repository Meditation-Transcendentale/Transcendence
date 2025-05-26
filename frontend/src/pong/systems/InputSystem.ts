import { Matrix, Scalar, Vector3 } from "@babylonjs/core";
import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { InputComponent } from "../components/InputComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { InputManager } from "../input/InputManager.js";
import { WebSocketManager } from "../network/WebSocketManager.js";
import { localPaddleId } from "../Pong.js";

export class InputSystem extends System {
	private inputManager: InputManager;
	private wsManager: WebSocketManager;
	private localPaddleId: number | null = null;
	private readonly MAX_OFFSET: number = 8.4;
	private move: boolean;

	constructor(inputManager: InputManager, wsManager: WebSocketManager) {
		super();
		this.inputManager = inputManager;
		this.wsManager = wsManager;
		this.localPaddleId = localPaddleId;
		this.move = false;
	}

	update(entities: Entity[], deltaTime: number): void {
		for (const entity of entities) {
			if (
				!entity.hasComponent(InputComponent) ||
				!entity.hasComponent(PaddleComponent) ||
				!entity.hasComponent(TransformComponent)
			) {
				continue;
			}

			const input = entity.getComponent(InputComponent)!;
			if (input.isLocal != true) continue;

			const paddle = entity.getComponent(PaddleComponent)!;
			const transform = entity.getComponent(TransformComponent)!;

			let offsetChange = 0;
			const leftPressed = this.inputManager.isKeyPressed("KeyA");
			const rightPressed = this.inputManager.isKeyPressed("KeyD");

			this.move = leftPressed || rightPressed;

			if (this.move) {
				offsetChange = leftPressed ? 0.4 : -0.4;
			}
			paddle.offset = Scalar.Clamp(paddle.offset, -this.MAX_OFFSET, this.MAX_OFFSET);

			if (this.move) {
				paddle.offset += offsetChange;

				const rotationMatrix = Matrix.RotationYawPitchRoll(
					transform.rotation.y,
					transform.rotation.x,
					transform.rotation.z
				);
				const localRight = Vector3.TransformCoordinates(new Vector3(1, 0, 0), rotationMatrix);
				transform.position.copyFrom(transform.basePosition.add(localRight.scale(paddle.offset)));

				this.wsManager.send({
					type: "paddleUpdate",
					data: {
						paddleId: localPaddleId,
						move: this.move,
						offset: paddle.offset,
					}
				});
				console.log("playerId =" + localPaddleId);
			}
		}
	}
}
