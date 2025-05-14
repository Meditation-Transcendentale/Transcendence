import { Matrix, Vector3 } from "@babylonjs/core";
// src/systems/NetworkingSystem.ts
import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { InputComponent } from "../components/InputComponent.js";
import { BallComponent } from "../components/BallComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { WebSocketManager } from "../network/WebSocketManager.js";
import { gameEndUI } from "../utils/displayGameInfo.js";
import { global } from "../main";
import { decodeWsMessage } from "../utils/message.js";
export let localPaddleId: number | 0;

export class NetworkingSystem extends System {
	private wsManager: WebSocketManager;
	private uuid: string;
	private scoreUI: any;
	private myScore: number;
	private opponentScore: number;
	// private endUI = globalEndUI;


	constructor(wsManager: WebSocketManager, uuid: string, scoreUI: any) {
		super();
		this.wsManager = wsManager;
		this.uuid = uuid;
		this.scoreUI = scoreUI;
		this.myScore = 0;
		this.opponentScore = 0;
	}

	update(entities: Entity[], deltaTime: number): void {
		const messages = this.wsManager.getMessages();

		messages.forEach((raw: ArrayBuffer) => {

			let event;
			try {
				event = decodeWsMessage(new Uint8Array(raw));
			} catch (err) {
				console.error("Failed to decode GameEvent:", err);
				return;
			}

			// === GameState tick (binary state snapshot) ===
			if (event.state) {
				const state = event.state;

				// 1. Ball updates
				state.balls.forEach((b: any) => {
					const e = entities.find(e =>
						e.hasComponent(BallComponent) &&
						e.getComponent(BallComponent)!.id === b.id
					);
					if (!e) return;
					const ball = e.getComponent(BallComponent)!;
					ball.position.set(b.x, 0.5, b.y);
					ball.velocity.set(b.vx, 0, b.vy);
				});

				// 2. Paddle updates
				state.paddles.forEach((p: any) => {
					const e = entities.find(e =>
						e.hasComponent(PaddleComponent) &&
						e.getComponent(PaddleComponent)!.id === p.id
					);
					if (!e || e.getComponent(InputComponent)?.isLocal) return;

					const paddle = e.getComponent(PaddleComponent)!;
					paddle.offset = p.offset;

					const tf = e.getComponent(TransformComponent)!;
					const rotMat = Matrix.RotationYawPitchRoll(
						tf.rotation.y,
						tf.rotation.x,
						tf.rotation.z
					);
					const localRight = Vector3.TransformCoordinates(
						new Vector3(1, 0, 0),
						rotMat
					);
					tf.position.copyFrom(
						tf.basePosition.add(localRight.scale(paddle.offset))
					);
				});

				// 3. Score update
				if (state.scores && localPaddleId !== undefined) {
					const myScore = state.scores[localPaddleId] || 0;
					const otherId = Object.keys(state.scores)
						.map(id => Number(id))
						.find(id => id !== localPaddleId)!;
					const theirScore = state.scores[otherId] || 0;
					this.scoreUI.update(myScore, theirScore);
				}
			}

			// === GameEnd ===
			if (event.gameOver) {
				console.log("Game Over event received");
				global.endUI = gameEndUI(this.myScore < this.opponentScore);
			}
		});
	}
}
