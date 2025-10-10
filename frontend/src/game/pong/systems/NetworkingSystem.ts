
import { Vector3, Matrix, Lerp } from "../../../babylon";
// src/systems/NetworkingSystem.ts
import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { InputComponent } from "../components/InputComponent.js";
import { BallComponent } from "../components/BallComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { WebSocketManager } from "../network/WebSocketManager.js";
// import { endUI } from "./UISystem.js";
// import { global } from "../Pong";
import { decodeServerMessage } from "../utils/proto/helper.js";
import { userinterface } from "../utils/proto/message.js";
import { UIComponent } from "../components/UIComponent.js";
import { localPaddleId } from "../Pong";
import { tournament } from "../../../networking/message.js";
import { routeManager } from "../../../route/RouteManager.js";

export class NetworkingSystem extends System {
	private wsManager: WebSocketManager;
	private oldVelX: number;
	private oldVelY: number;
	private myScore: number;
	private opponentScore: number;
	private mode: string;
	// private endUI = globalEndUI;


	constructor(wsManager: WebSocketManager, uuid: string, mode: string) {
		super();
		this.wsManager = wsManager;
		this.uuid = uuid;
		this.myScore = 0;
		this.opponentScore = 0;
		this.oldVelX = 0;
		this.oldVelY = 0;
		this.mode = mode;
	}

	update(entities: Entity[], deltaTime: number): void {
		const messages = this.wsManager.getMessages();

		const now = performance.now();

		// console.log("called");
		messages.forEach((raw: ArrayBuffer) => {
			let serverMsg: userinterface.ServerMessage;
			try {
				serverMsg = decodeServerMessage(new Uint8Array(raw));
			} catch (err) {
				console.error("Failed to decode protobuf ServerMessage:", err);
				return;
			}

			// === State update ===
			if (serverMsg.state != null) {
				const state = serverMsg.state;  // MatchState

				const balls = state.balls ?? [];
				const paddles = state.paddles ?? [];
				const score = state.score ?? [];
				// 1. Ball updates
				// console.log(balls);
				balls.forEach(b => {
					const e = entities.find(e =>
						e.hasComponent(BallComponent) &&
						e.getComponent(BallComponent)!.id === b.id
					);
					if (!e) return;
					const ball = e.getComponent(BallComponent)!;
					ball.serverPosition.set(b.x, 0.5, b.y);
					ball.lastServerUpdate = performance.now();
					if (b.vx != this.oldVelX || b.vy != this.oldVelY) {
						ball.velocity.set(b.vx, 0, b.vy);
						this.oldVelX = b.vx!;
						this.oldVelY = b.vy!;
					}
				});

				paddles.forEach(p => {

					const matchedEntities = entities.filter(e =>
						e.hasComponent(PaddleComponent) &&
						(e.getComponent(PaddleComponent)!.id === p.id)
					);
					if (!matchedEntities) return;

					matchedEntities.forEach(e => {
						const paddleComp = e.getComponent(PaddleComponent)!;
						const inputComp = e.getComponent(InputComponent)!;
						if ((inputComp.gameMode === "online" || inputComp.gameMode === "ai" || inputComp.gameMode === "tournament") && paddleComp.id != localPaddleId) {
							paddleComp.offset = p.offset;
						}

						paddleComp.serverOffset = p.offset;
						const tf = e.getComponent(TransformComponent)!;
						const rot = tf.rotation;
						const right = Vector3.TransformCoordinates(
							new Vector3(1, 0, 0),
							Matrix.RotationYawPitchRoll(rot.y, rot.x, rot.z)
						);
						tf.position.copyFrom(tf.basePosition.add(right.scale(paddleComp.offset)));
					});
				});

				// 3. Score update
				if (score) {
					const e = entities.find(e => e.hasComponent(UIComponent));
					let ui = e?.getComponent(UIComponent);
					this.myScore = score[localPaddleId] ?? 0;
					const otherId = score
						.map((_, i) => i)
						.find(i => i !== localPaddleId)!;
					this.opponentScore = score[otherId] ?? 0;
					if (ui) {
						if (localPaddleId != 0)
							ui.gameUI.updateScoreVersus(this.opponentScore, this.myScore);
						else
							ui.gameUI.updateScoreVersus(this.myScore, this.opponentScore);
					}
				}
			}

			if (serverMsg.start) {
				console.log("___________________________start MSG");
				const e = entities.find(e => e.hasComponent(UIComponent));
				let ui = e?.getComponent(UIComponent);
				ui?.gameUI.startCountdown(3);
			}

			// === Game End ===
			if (serverMsg.end) {
				if (this.mode == 'tournament')
					routeManager.comeback();
				const e = entities.find(e => e.hasComponent(UIComponent));
				let ui = e?.getComponent(UIComponent);

				let win = false;
				if (this.myScore == 5)
					win = true;

				ui?.gameUI.showEnd(ui.gameMode, win, this.myScore, this.opponentScore);
				console.log("Received GameEndMessage");
				// const scores = serverMsg.end.score as number[];
				// const myScore = scores[localPaddleId] ?? 0;
				// const other = scores.find((_, i) => i !== localPaddleId) ?? 0;
				// global.endUI = gameEndUI(myScore < other);
			}
		});
	}
}
