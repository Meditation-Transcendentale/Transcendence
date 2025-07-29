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
import { PhaseState, PhaseTransitionEvent, RebuildCompleteEvent, GameStateInfo } from "../state/PhaseState.js";

export class NetworkingSystem extends System {
	private wsManager: WebSocketManager;
	private uuid: string;
	private scoreUI: any;
	private myScore: number;
	private opponentScore: number;
	private game: PongBR;
	private phaseState: PhaseState;
	private currentPhysicsState: any = null;
	// private endUI = globalEndUI;

	constructor(wsManager: WebSocketManager, uuid: string, scoreUI: any, game: PongBR) {
		super();
		this.wsManager = wsManager;
		this.uuid = uuid;
		this.scoreUI = scoreUI;
		this.myScore = 0;
		this.opponentScore = 0;
		this.game = game;
		this.phaseState = new PhaseState();
	}

	resetPhaseState(): void {
		this.phaseState.reset();
		this.currentPhysicsState = null;
		console.log('🔄 NetworkingSystem: Phase state reset for new game');
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
				const events = state.events ?? [];
				const gameState = state.gameState as GameStateInfo;

				this.currentPhysicsState = { balls, paddles, stage, events, gameState };

				if (gameState) {
					this.phaseState.updateGameState(gameState);
				}

				events.forEach((event: any) => {
					if (event.type === 'PHASE_TRANSITION') {
						this.phaseState.handlePhaseTransition(event as PhaseTransitionEvent);
					} else if (event.type === 'REBUILD_COMPLETE') {
						const rebuildEvent = event as RebuildCompleteEvent;
						const result = this.phaseState.handleRebuildComplete(rebuildEvent);

						if (result.shouldTransition) {
							console.log(`🎮 Transition to round called - full arena rebuild`);
							this.game.transitionToRound(result.playerCount, entities, this.currentPhysicsState);
						} else if (result.shouldRemap && rebuildEvent.playerMapping) {
							console.log('🔧 Remapping paddle entities (no visual transition)');
							this.phaseState.remapPaddleEntities(entities, rebuildEvent.playerMapping);
						}
					}
				});

				if (stage && stage !== this.phaseState.currentStage && this.phaseState.isReadyForTransition()) {
					console.log(`🔄 Stage fallback sync: ${this.phaseState.currentStage} → ${stage}`);
					const result = this.phaseState.shouldSyncToStage(stage as number);
					if (result.shouldTransition) {
						this.game.transitionToRound(result.playerCount, entities);
					}
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
					// Debug: Log physics paddle data to understand the structure
					//if (Math.random() < 0.01) { // Log occasionally to avoid spam
					//	console.log(`🎮 Physics paddle data:`, { 
					//		id: p.id, 
					//		playerId: p.playerId, 
					//		offset: p.offset, 
					//		dead: p.dead 
					//	});
					//}

					//if (p.id === localPaddleId) return;

					let e = entities.find(e =>
						e.hasComponent(PaddleComponent) &&
						e.getComponent(PaddleComponent)!.paddleIndex === p.id
					);

					if (!e) {
						e = entities.find(e =>
							e.hasComponent(PaddleComponent) &&
							e.getComponent(PaddleComponent)!.id === p.playerId
						);
					}

					if (!e) return;

					const playerId = e.getComponent(PaddleComponent)!.id;
					let w = entities.find(entity =>
						entity.hasComponent(WallComponent) &&
						entity.getComponent(WallComponent)!.id === playerId
					);
					const paddle = e.getComponent(TransformComponent);
					const wall = w.getComponent(TransformComponent);
					if (p.dead) {
						if (!w)
							return;
						paddle?.disable();
						wall?.enable();

					}
					else {

						const paddleComp = e.getComponent(PaddleComponent)!;
						paddleComp.offset = p.offset as number;

						const transform = e.getComponent(TransformComponent)!;
						transform.rotation.y = paddleComp.baseRotation + p.offset;
						paddle?.enable();
						wall?.disable();
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
