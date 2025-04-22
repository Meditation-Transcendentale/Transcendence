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
export let localPaddleId: number | null = null;

export class NetworkingSystem extends System {
	private wsManager: WebSocketManager;
	private uiid: string;

	constructor(wsManager: WebSocketManager, uiid: string) {
		super();
		this.wsManager = wsManager;
		this.uiid = uiid;
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
			if (msg.type === "stateUpdate") {
				if (Array.isArray(msg.balls)) {
					msg.balls.forEach((ballState: any) => {
						const { id, x, y, vx, vy } = ballState;
						const entity = entities.find(e => {
							const ball = e.getComponent(BallComponent);
							return ball && ball.id === id;
						});
						if (entity && entity.hasComponent(BallComponent)) {
							const ball = entity.getComponent(BallComponent)!;
							ball.position.set(x, 0.5, y);
							ball.velocity.set(vx, 0, vy);
						}
					});
				}
				if (msg.paddles) {
					for (const key of Object.keys(msg.paddles)) {
						const paddleState = msg.paddles[key];
						const entity = entities.find(e => {
							const paddle = e.getComponent(PaddleComponent);
							return paddle && paddle.id === paddleState.id;
						});
						if (!entity) continue;
						const input = entity.getComponent(InputComponent);
						if (input && input.isLocal) {
							continue;
						}
						if (entity.hasComponent(PaddleComponent) && entity.hasComponent(TransformComponent)) {
							const paddle = entity.getComponent(PaddleComponent)!;
							paddle.offset = paddleState.offset;
							const transform = entity.getComponent(TransformComponent)!;
							const rotationMatrix = Matrix.RotationYawPitchRoll(
								transform.rotation.y,
								transform.rotation.x,
								transform.rotation.z
							);
							const localRight = Vector3.TransformCoordinates(new Vector3(1, 0, 0), rotationMatrix);
							transform.position.copyFrom(transform.basePosition.add(localRight.scale(paddle.offset)));
						}
					}
				}
			}

			if (msg.type === "welcome") {
				console.log("Received welcome:", msg);
				if (msg.uiid === this.uiid) {
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
		});
	}
}
// update(entities: Entity[], deltaTime: number): void {
// 	const messages = this.wsManager.getMessages();
// 	messages.forEach(msg => {
// 		if (msg.type === "stateUpdate" && msg.state) {
// 			// console.log(msg.state);
// 			if (Array.isArray(msg.state.balls)) {
// 				msg.state.balls.forEach((ballState: any) => {
// 					const [id, x, y, vx, vy] = ballState;
// 					const entity = entities.find(e => {
// 						const ball = e.getComponent(BallComponent);
// 						return ball && ball.id === id;
// 					});
// 					if (entity && entity.hasComponent(BallComponent)) {
// 						const ball = entity.getComponent(BallComponent)!;
// 						ball.position.set(x, 0.5, y);
// 						ball.velocity.set(vx, 0, vy);
// 					}
// 				});
// 			}
// 			if (msg.state.paddles) {
// 				for (const key of Object.keys(msg.state.paddles)) {
// 					const paddleState = msg.state.paddles[key];
// 					const entity = entities.find(e => {
// 						const paddle = e.getComponent(PaddleComponent);
// 						return paddle && paddle.id === paddleState.id;
// 					});
//
// 					if (!entity) continue;
// 					const input = entity.getComponent(InputComponent);
// 					if (input && input.isLocal) {
// 						continue;
// 					}
// 					if (entity.hasComponent(PaddleComponent) && entity.hasComponent(TransformComponent)) {
// 						const paddle = entity.getComponent(PaddleComponent)!;
// 						paddle.offset = paddleState.offset;
// 						const transform = entity.getComponent(TransformComponent)!;
// 						const rotationMatrix = Matrix.RotationYawPitchRoll(
// 							transform.rotation.y,
// 							transform.rotation.x,
// 							transform.rotation.z
// 						);
// 						const localRight = Vector3.TransformCoordinates(new Vector3(1, 0, 0), rotationMatrix);
// 						transform.position.copyFrom(transform.basePosition.add(localRight.scale(paddle.offset)));
// 					}
// 				}
// 			}
// 		}
// 		if (msg.type === "welcome") {
// 			console.log("Received welcome:", msg);
// 			if (msg.uiid === this.uiid) {
// 				localPaddleId = msg.paddleId;
// 				console.log("Local paddleId set to:", msg.paddleId);
// 			}
// 		}
// 		if (msg.type === "updateBall") {
// 			const entity = entities.find(e => {
// 				const ball = e.getComponent(BallComponent);
// 				return ball && ball.id === msg.ballId;
// 			});
// 			if (entity && entity.hasComponent(BallComponent)) {
// 				const ball = entity.getComponent(BallComponent)!;
// 				ball.position.set(msg.x, 0.5, msg.y);
// 				ball.velocity.set(msg.vx, 0, msg.vy);
// 			}
// 		}
// 	});
// }
//}
