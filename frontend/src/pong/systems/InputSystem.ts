import { Vector3, Scalar, Matrix } from "@babylonImport";
import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { InputComponent } from "../components/InputComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { InputManager } from "../input/InputManager.js";
import { WebSocketManager } from "../network/WebSocketManager.js";
import { localPaddleId } from "../Pong.js";
import { userinterface } from "../utils/proto/message.js";
import { encodeClientMessage } from "../utils/proto/helper.js";

export class InputSystem extends System {
	private inputManager: InputManager;
	private wsManager: WebSocketManager;
	private localPaddleId: number | null = null;
	private readonly MAX_OFFSET: number = 8.4;
	private move: number;

	constructor(inputManager: InputManager, wsManager: WebSocketManager) {
		super();
		this.inputManager = inputManager;
		this.wsManager = wsManager;
		this.localPaddleId = localPaddleId;
		this.move = 0;
	}

	update(entities: Entity[], deltaTime: number): void {
		const now = performance.now();
		const dt = deltaTime / 1000;
		for (const entity of entities) {
			if (
				!entity.hasComponent(InputComponent) ||
				!entity.hasComponent(PaddleComponent) ||
				!entity.hasComponent(TransformComponent)
			) {
				continue;
			}

			const input = entity.getComponent(InputComponent)!;
			const paddle = entity.getComponent(PaddleComponent)!;
			const transform = entity.getComponent(TransformComponent)!;
			if (!input.isLocal) continue;

			let offsetChange = 0;
			let upKeys = [];
			let downKeys = [];
			console.log(input.gameMode);
			if ((input.gameMode === "online" || input.gameMode === "ai") && paddle.id == localPaddleId) {
				if (paddle.id == 0){
					upKeys = ["KeyW", "ArrowUp"];
					downKeys = ["KeyS", "ArrowDown"];
				} else {
					downKeys = ["KeyW", "ArrowUp"];
					upKeys = ["KeyS", "ArrowDown"];
				}
			} else if (input.gameMode === "local"){
				if (paddle.id == localPaddleId) {
					upKeys = ["KeyW"];
					downKeys = ["KeyS"];
				} else {
					upKeys = ["ArrowDown"];
					downKeys = ["ArrowUp"];
				}
			}

			let UpPressed = upKeys.some(key => this.inputManager.isKeyPressed(key));
			let DownPressed = downKeys.some(key => this.inputManager.isKeyPressed(key));

			paddle.move = 0;
			if (UpPressed && !DownPressed) {
				console.log("UP");
				paddle.move = 1;
			}
			else if (DownPressed && !UpPressed) {
				console.log("DOWN");
				paddle.move = -1;
			}

			offsetChange = paddle.move * 10 * dt;
			paddle.offset = Scalar.Clamp(paddle.offset + offsetChange, -this.MAX_OFFSET, this.MAX_OFFSET);

			const rotationMatrix = Matrix.RotationYawPitchRoll(
				transform.rotation.y,
				transform.rotation.x,
				transform.rotation.z
			);
			const localRight = Vector3.TransformCoordinates(
				Vector3.Right(),
				rotationMatrix
			);
			const displacement = localRight.clone().scale(paddle.offset);
			transform.position.copyFrom(
				transform.basePosition.add(displacement)
			);
			if (paddle.move != paddle.lastMove) {
				const payload: userinterface.IClientMessage = {
					paddleUpdate: {
						paddleId: paddle.id,
						move: paddle.move
					}
				};

				const buffer = encodeClientMessage(payload);
				this.wsManager.socket.send(buffer);
				paddle.lastMove = paddle.move;

			}
		}
	}
}
