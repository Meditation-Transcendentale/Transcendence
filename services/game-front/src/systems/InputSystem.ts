import { Matrix, Scalar, Vector3 } from "@babylonjs/core";
import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { InputComponent } from "../components/InputComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { InputManager } from "../input/InputManager.js";
import { WebSocketManager } from "../network/WebSocketManager.js";
import { localPaddleId } from "../main.js";

export class InputSystem extends System {
	private inputManager: InputManager;
	private wsManager: WebSocketManager;
	private localPaddleId: number | null = null;
	private readonly MAX_OFFSET: number = 8.4;

	constructor(inputManager: InputManager, wsManager: WebSocketManager) {
		super();
		this.inputManager = inputManager;
		this.wsManager = wsManager;
		this.localPaddleId = localPaddleId;
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
			let move = false;
			if (this.inputManager.isKeyPressed("KeyA")) {
				offsetChange += 0.1;
				move = true;
			}
			if (this.inputManager.isKeyPressed("KeyD")) {
				offsetChange -= 0.1;
				move = true;
			}
			paddle.offset = Scalar.Clamp(paddle.offset, -this.MAX_OFFSET, this.MAX_OFFSET);

			if (move == true) {
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
						x: transform.position.x,
						y: transform.position.z,
						offset: paddle.offset,
					}
				});
				console.log("playerId =" + localPaddleId);
			}
		}
	}
}
