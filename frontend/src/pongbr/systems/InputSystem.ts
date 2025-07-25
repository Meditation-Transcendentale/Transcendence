import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { InputComponent } from "../components/InputComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { InputManager } from "../input/InputManager.js";
import { WebSocketManager } from "../network/WebSocketManager.js";
import { localPaddleId } from "../PongBR.js";
import { userinterface } from "../utils/proto/message.js";
import { encodeClientMessage } from "../utils/proto/helper.js";
import { Scalar } from "@babylonImport";

export class InputSystem extends System {
	private inputManager: InputManager;
	private wsManager: WebSocketManager;
	private localPaddleId: number | null = null;
	private readonly MAX_OFFSET: number = 8.4;
	private move: number;
	private lastSentMove: number = 0;

	constructor(inputManager: InputManager, wsManager: WebSocketManager) {
		super();
		this.inputManager = inputManager;
		this.wsManager = wsManager;
		this.localPaddleId = localPaddleId;
		this.move = 0;
	}

	update(entities: Entity[], deltaTime: number): void {
		const dt = deltaTime;
		// console.log("Input system:", performance.now());
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

			this.move = 0;
			if (leftPressed && !rightPressed) this.move = 1;
			else if (rightPressed && !leftPressed) this.move = -1;

			//offsetChange = this.move * 1.2 / paddle.speed * dt;
			//paddle.offset = Scalar.Clamp(paddle.offset + offsetChange, -paddle.maxoffset, paddle.maxoffset);
			//transform.rotation.y = paddle.baseRotation + paddle.offset;
			if (this.move != this.lastSentMove) {
				const payload: userinterface.IClientMessage = {
					paddleUpdate: {
						paddleId: localPaddleId,
						move: this.move,
					}
				};

				const buffer = encodeClientMessage(payload);
				this.wsManager.socket.send(buffer);
				this.lastSentMove = this.move;

				//console.log("Sent move to server: move =", this.move, "offset = ", paddle.offset);
			}
		}
	}
}
