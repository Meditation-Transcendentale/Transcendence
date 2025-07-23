// src/systems/NetworkingSystem.ts
import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { BallComponent } from "../components/BallComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { WebSocketManager } from "../network/WebSocketManager.js";
import { decodeServerMessage } from "../utils/proto/helper.js";
import { userinterface } from "../utils/proto/message.js";
import { WallComponent } from "../components/WallComponent.js";
import { PongBR } from "../PongBR.js";

export class NetworkingSystem extends System {
	private wsManager: WebSocketManager;
	private uuid: string;
	private scoreUI: any;
	private myScore: number;
	private opponentScore: number;
	private stage: number;
	private game: PongBR;
	// private endUI = globalEndUI;


	constructor(wsManager: WebSocketManager, uuid: string, scoreUI: any, game: PongBR) {
		super();
		this.wsManager = wsManager;
		this.uuid = uuid;
		this.scoreUI = scoreUI;
		this.myScore = 0;
		this.opponentScore = 0;
		this.stage = 1;
		this.game = game;
	}

	update(entities: Entity[], deltaTime: number): void {
		const messages = this.wsManager.getMessages();

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
				const stage = state.stage;
				console.log(`Stage= ${stage}`)
				if (stage != this.stage) {
					console.log(`Stage changed to ${stage}`)
					switch (stage) {
						case 2:
							this.game.transitionToRound(50);
							break;
						case 3:
							this.game.transitionToRound(25);
							break;
						case 4:
							this.game.transitionToRound(12);
							break;
						case 5:
							this.game.transitionToRound(3);
							break;
					}
					this.stage = stage as number;

				}
				// 1. Ball updates
				balls.forEach(b => {
					const e = entities.find(e =>
						e.hasComponent(BallComponent) &&
						e.getComponent(BallComponent)!.id === b.id
					);
					if (!e) return;
					const transform = e.getComponent(TransformComponent);
					if (b.disabled == true)
						transform?.disable();
					else {
						const ball = e.getComponent(BallComponent)!;
						transform?.enable();
						ball.position.set(b.x, 0.5, b.y);
						ball.velocity.set(b.vx, 0, b.vy);
					}
				});

				// 2. Paddle updates
				paddles.forEach(p => {
					//if (p.id === localPaddleId) return;

					const e = entities.find(e =>
						e.hasComponent(PaddleComponent) &&
						e.getComponent(PaddleComponent)!.id === p.id
					);
					const w = entities.find(e =>
						e.hasComponent(WallComponent) &&
						e.getComponent(WallComponent)!.id === p.id
					);

					if (!e) return;
					if (p.dead) {
						if (!w)
							return;
						const paddle = e.getComponent(TransformComponent);
						const wall = w.getComponent(TransformComponent);
						paddle?.disable();
						wall?.enable();

					}
					else {

						const paddleComp = e.getComponent(PaddleComponent)!;
						paddleComp.offset = p.offset as number; // update direction

						const transform = e.getComponent(TransformComponent)!;
						transform.rotation.y = paddleComp.baseRotation + p.offset;
					}
				});
			}

			// === Game End ===
			if (serverMsg.end) {
				console.log("Received GameEndMessage");
				// const scores = serverMsg.end.score as number[];
				// const myScore = scores[localPaddleId] ?? 0;
				// const other = scores.find((_, i) => i !== localPaddleId) ?? 0;
				// global.endUI = gameEndUI(myScore < other);
			}
		});
	}
}
