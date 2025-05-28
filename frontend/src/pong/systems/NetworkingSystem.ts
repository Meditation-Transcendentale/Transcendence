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
import { global } from "../Pong";
import * as UI from "../utils/proto/message.js";
import { UIComponent } from "../components/UIComponent.js";
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
		// this.scoreUI = scoreUI;
		this.myScore = 0;
		this.opponentScore = 0;
	}

	update(entities: Entity[], deltaTime: number): void {
		const messages = this.wsManager.getMessages();

		messages.forEach((raw: ArrayBuffer) => {
			let event;
			try {
				event = UI.game.ServerMessage.decode(new Uint8Array(raw));
			} catch (err) {
				console.error("Failed to decode protobuf ServerMessage:", err);
				return;
			}

			// === State update ===
			if (event.state?.state) {
				const state = event.state.state;  // MatchState
				console.log(state);

				const balls = state.balls ?? [];
				const paddles = state.paddles ?? [];
				const scores = state.score ?? [];
				// 1. Ball updates
				balls.forEach(b => {
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
				paddles.forEach(p => {
					// skip local paddle
					// if (p.id === localPaddleId) return;

					const e = entities.find(e =>
						e.hasComponent(PaddleComponent) &&
						e.getComponent(PaddleComponent)!.id === p.id
					);
					if (!e) return;

					const paddleComp = e.getComponent(PaddleComponent)!;
					paddleComp.offset += p.move * 0.4;  // update direction

					const tf = e.getComponent(TransformComponent)!;
					const rot = tf.rotation;
					const right = Vector3.TransformCoordinates(
						new Vector3(1, 0, 0),
						Matrix.RotationYawPitchRoll(rot.y, rot.x, rot.z)
					);
					tf.position.copyFrom(tf.basePosition.add(right.scale(paddleComp.offset)));
				});

				// 3. Score update
				if (scores && localPaddleId != null) {
					const myScore = scores[localPaddleId] ?? 0;
					const otherId = scores
						.map((_, i) => i)
						.find(i => i !== localPaddleId)!;
					const theirScore = scores[otherId] ?? 0;
					this.scoreUI.update(myScore, theirScore);
				}
			}

			// === Game End ===
			if (event.end && event.end.score) {
				console.log("Received GameEndMessage");
				const scores = event.end.score as number[];
				const myScore = scores[localPaddleId] ?? 0;
				const other = scores.find((_, i) => i !== localPaddleId) ?? 0;
				global.endUI = gameEndUI(myScore < other);
			}
		});
	}
}
