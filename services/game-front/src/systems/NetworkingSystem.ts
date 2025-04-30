import { Matrix, Vector3 } from "@babylonjs/core";
// src/systems/NetworkingSystem.ts
import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { InputComponent } from "../components/InputComponent.js";
import { BallComponent } from "../components/BallComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { WebSocketManager } from "../network/WebSocketManager.js";
import { decodeStateUpdate } from "../utils/binary.js";
import { Buffer } from 'buffer';
import { gameEndUI } from "../utils/displayGameInfo.js";
import { global } from "../main";
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
		const rawMessages = this.wsManager.getMessages();

		rawMessages.forEach((rawMsg: any) => {
			let msg: any;
			if (typeof rawMsg === 'string') {
				try {
					msg = JSON.parse(rawMsg);
				} catch (e) {
					console.error("Error parsing JSON message:", e);
					return;
				}
			}
			else if (rawMsg instanceof ArrayBuffer) {
				msg = decodeStateUpdate(Buffer.from(new Uint8Array(rawMsg)));
			}
			else if (Buffer.isBuffer(rawMsg)) {
				msg = decodeStateUpdate(rawMsg);
			}
			else {
				msg = rawMsg;
			}
			if (msg.type === "registered") {
				localPaddleId = msg.paddleId;
				return;
			}
			if (msg.balls && msg.paddles) {
				msg.balls.forEach((b: any) => {
					const e = entities.find(e =>
						e.hasComponent(BallComponent) &&
						e.getComponent(BallComponent)!.id === b.id
					);
					if (!e) return;
					const ball = e.getComponent(BallComponent)!;
					ball.position.set(b.x, 0.5, b.y);
					ball.velocity.set(b.vx, 0, b.vy);
				});

				msg.paddles.forEach((pState: any) => {
					const e = entities.find(e =>
						e.hasComponent(PaddleComponent) &&
						e.getComponent(PaddleComponent)!.id === pState.id
					);
					if (!e || e.getComponent(InputComponent)?.isLocal) return;

					const paddle = e.getComponent(PaddleComponent)!;
					paddle.offset = pState.offset;

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

			}
			// 3) update scoreboard UI
			if (msg.score) {
				const myScore = msg.score[localPaddleId] || 0;
				const otherId = Object.keys(msg.score)
					.map(id => Number(id))
					.find(id => id !== localPaddleId)!;
				const theirScore = msg.score[otherId] || 0;
				// console.log(myScore, theirScore);
				this.scoreUI.update(myScore, theirScore);
			}

			// 4) show/hide “paused” overlay on goal
			if (msg.isPaused) {
				// pause timer on
			} else {
				// pause timer off
			}

			if (msg.isGameOver) {
				console.log("GameOver");
				// pick winner by highest score
				global.endUI = gameEndUI(this.myScore < this.opponentScore);
			}

			if (msg.type === "welcome") {
				console.log("Received welcome:", msg);
				if (msg.uuid === this.uuid) {
					localPaddleId = msg.paddleId;
					console.log("Local paddleId set to:", msg.paddleId);
				}
			}

			if (msg.type === "updateBall") {
				const entity = entities.find(e => {
					const ball = e.getComponent(BallComponent);
					return ball && ball.id === msg.ballId;
				});
				if (entity && entity.hasComponent(BallComponent)) {
					const ball = entity.getComponent(BallComponent)!;
					ball.position.set(msg.x, 0.5, msg.y);
					ball.velocity.set(msg.vx, 0, msg.vy);
				}
			}
			// if (msg.type === "scoreUpdate") {
			// 	const scoreP1 = msg.score.player1;
			// 	const scoreP2 = msg.score.player2;
			// 	this.scoreUI.update(scoreP1, scoreP2);
			// }
			if (msg.type === "winUpdate") {

			}
		});
	}
}
