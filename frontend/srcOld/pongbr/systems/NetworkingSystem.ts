import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { BallComponent } from "../components/BallComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { WebSocketManager } from "../network/WebSocketManager.js";
import { decodeServerMessage } from "../utils/proto/helper.js";
import { userinterface } from "../utils/proto/message.js";
import { WallComponent } from "../components/WallComponent.js";
import { localPaddleId, PongBR } from "../PongBR.js";
import { PhaseState, PhaseTransitionEvent, RebuildCompleteEvent, GameStateInfo } from "../state/PhaseState.js";
import { Vector3 } from "@babylonImport";
import GameUI from "../../spa/GameUI.js";

export class NetworkingSystem extends System {
	private wsManager: WebSocketManager;
	private uuid: string;
	private gameUI: GameUI;
	private game: PongBR;
	private phaseState: PhaseState;
	private currentPhysicsState: any = null;

	private ballIdToEntity = new Map<number, Entity>();
	private paddleIdToEntity = new Map<number, Entity>();
	private paddlePlayerIdToEntity = new Map<number, Entity>();
	private wallPlayerIdToEntity = new Map<number, Entity>();
	private indexesDirty = true;

	private spectateButtonOn: boolean = false;

	constructor(wsManager: WebSocketManager, uuid: string, gameUI: GameUI, game: PongBR) {
		super();
		this.wsManager = wsManager;
		this.uuid = uuid;
		this.gameUI = gameUI;
		this.game = game;
		this.phaseState = new PhaseState();
	}

	resetPhaseState(): void {
		this.phaseState.reset();
		this.currentPhysicsState = null;
		this.indexesDirty = true;
		this.ballIdToEntity.clear();
		this.paddleIdToEntity.clear();
		this.paddlePlayerIdToEntity.clear();
		this.wallPlayerIdToEntity.clear();
	}

	public forceIndexRebuild(): void {
		this.indexesDirty = true;
	}

	private rebuildIndices(entities: Entity[]): void {
		if (!this.indexesDirty) return;

		this.ballIdToEntity.clear();
		this.paddleIdToEntity.clear();
		this.paddlePlayerIdToEntity.clear();
		this.wallPlayerIdToEntity.clear();

		let ballCount = 0, paddleCount = 0, wallCount = 0;

		for (const entity of entities) {
			if (entity.hasComponent(BallComponent)) {
				const ball = entity.getComponent(BallComponent)!;
				this.ballIdToEntity.set(ball.id, entity);
				ballCount++;
			}

			if (entity.hasComponent(PaddleComponent)) {
				const paddle = entity.getComponent(PaddleComponent)!;
				this.paddleIdToEntity.set(paddle.paddleIndex, entity);
				this.paddlePlayerIdToEntity.set(paddle.id, entity);
				paddleCount++;
			}

			if (entity.hasComponent(WallComponent)) {
				const wall = entity.getComponent(WallComponent)!;
				this.wallPlayerIdToEntity.set(wall.id, entity);
				wallCount++;
			}
		}

		this.indexesDirty = false;
	}

	update(entities: Entity[], deltaTime: number): void {
		if (this.indexesDirty) {
			this.rebuildIndices(entities);
		}

		const messages = this.wsManager.getMessages();

		messages.forEach((raw: ArrayBuffer) => {
			let serverMsg: userinterface.ServerMessage;
			try {
				serverMsg = decodeServerMessage(new Uint8Array(raw));
			} catch (err) {
				console.error("Failed to decode protobuf ServerMessage:", err);
				return;
			}

			if (serverMsg.state != null) {
				const state = serverMsg.state;
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

						this.indexesDirty = true;

						if (result.shouldTransition) {
							this.game.transitionToRound(result.playerCount, entities, this.currentPhysicsState);
						} else if (result.shouldRemap && rebuildEvent.playerMapping) {
							this.phaseState.remapPaddleEntities(entities, rebuildEvent.playerMapping);
						}
					}
				});

				if (stage && stage !== this.phaseState.currentStage && this.phaseState.isReadyForTransition()) {
					const result = this.phaseState.shouldSyncToStage(stage as number);
					if (result.shouldTransition) {
						this.game.transitionToRound(result.playerCount, entities);
						this.indexesDirty = true;
					}
				}

				balls.forEach(b => {
					const e = this.ballIdToEntity.get(b.id as number);
					if (!e) return;
					const transform = e.getComponent(TransformComponent);
					if (b.disabled == true)
						transform?.disable();
					else {
						const ball = e.getComponent(BallComponent)!;
						transform?.enable();

						const scaleFactor = this.game.currentBallScale ? this.game.currentBallScale.x : 1.0;
						const adjustedY = 0.5 + (scaleFactor - 1.0) * 0.1;

						ball.serverPosition.set(b.x as number, adjustedY, b.y as number);
						ball.lastServerUpdate = performance.now();
						ball.velocity.set(b.vx as number, 0, b.vy as number);

						if (transform && this.game.currentBallScale) {
							transform.baseScale = this.game.currentBallScale.clone();
							transform.scale = this.game.currentBallScale.clone();
						}
					}
				});

				let playerCount = 0;
				paddles.forEach(p => {
					let e = this.paddleIdToEntity.get(p.id as number);
					if (!e) {
						e = this.paddlePlayerIdToEntity.get(p.playerId as number);
					}

					if (!e) return;

					const playerId = e.getComponent(PaddleComponent)!.id;
					const w = this.wallPlayerIdToEntity.get(playerId);

					const paddle = e.getComponent(TransformComponent);
					const wall = w?.getComponent(TransformComponent);

					if (p.dead) {
						if (!w) return;
						paddle?.disable();
						wall?.enable();
						if (playerId == localPaddleId && this.spectateButtonOn == false) {
							this.gameUI.showButton('spectate', 'Spectate', () => {
								//what to do
								console.log('spectate button');
							});
							console.log("dead");
							this.spectateButtonOn = true;
						}
					} else {
						playerCount++;
						const paddleComp = e.getComponent(PaddleComponent)!;
						if (p.id != localPaddleId)
							paddleComp.offset = p.offset as number;
						else {
							paddleComp.serverOffset = p.offset as number;
						}

						paddle?.enable();
						wall?.disable();
					}
				});
				this.gameUI.updatePlayerCount(playerCount);
			}

			if (serverMsg.end) {
				console.log("Received GameEndMessage");
			}
		});
	}
}
