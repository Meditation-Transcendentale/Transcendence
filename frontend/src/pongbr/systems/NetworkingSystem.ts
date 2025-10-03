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
import { InputComponent } from "../components/InputComponent.js";

export class NetworkingSystem extends System {
	private wsManager: WebSocketManager;
	private uuid: string;
	private gameUI: GameUI;
	private game: PongBR;
	private currentPhysicsState: any = null;

	private ballIdToEntity = new Map<number, Entity>();
	private paddleIndexToEntity = new Map<number, Entity>();
	private indexesDirty = true;

	private spectateButtonOn: boolean = false;

	constructor(wsManager: WebSocketManager, uuid: string, gameUI: GameUI, game: PongBR) {
		super();
		this.wsManager = wsManager;
		this.uuid = uuid;
		this.gameUI = gameUI;
		this.game = game;
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
				const events = state.events ?? [];

				// Handle ONLY rebuild complete events
				events.forEach((event: any) => {
					if (event.type === 'REBUILD_COMPLETE') {
						const mapping = event.playerMapping || {};
						const newLocalIndex = mapping[localPaddleId] ?? -1;

						console.log(`🔄 Phase transition: ${event.activePlayers.length} players, local→${newLocalIndex}`);

						this.game.transitionToRound(event.activePlayers.length, newLocalIndex);
						this.indexesDirty = true;
					}
				});

				if (this.indexesDirty) {
					this.rebuildIndices(entities);
				}

				balls.forEach(b => {
					const e = this.ballIdToEntity.get(b.id as number);
					if (!e) return;

					const transform = e.getComponent(TransformComponent);
					const ball = e.getComponent(BallComponent);
					if (!transform || !ball) return;

					if (b.disabled) {
						transform.disable();
					} else {
						transform.enable();

						const scaleFactor = this.game.currentBallScale?.x ?? 1.0;
						const adjustedY = 3.0 + (scaleFactor - 1.0) * 0.1;

						ball.serverPosition.set(b.x as number, adjustedY, b.y as number);
						ball.lastServerUpdate = performance.now();
						ball.velocity.set(b.vx as number, 0, b.vy as number);

						if (this.game.currentBallScale) {
							transform.baseScale = this.game.currentBallScale.clone();
							transform.scale = this.game.currentBallScale.clone();
						}
					}
				});

				// Update paddles
				let activePaddleCount = 0;
				paddles.forEach(p => {
					const e = this.paddleIndexToEntity.get(p.id as number);
					if (!e) return;

					const paddleComp = e.getComponent(PaddleComponent);
					const paddle = e.getComponent(TransformComponent);
					if (!paddleComp || !paddle) return;

					if (p.dead) {
						paddle.disable();

						if (paddleComp.isLocal && !this.spectateButtonOn) {
							this.gameUI.showButton('spectate', 'Spectate', () => {
								console.log('Spectating...');
							});
							this.spectateButtonOn = true;
						}
					} else {
						activePaddleCount++;
						paddle.enable();

						if (paddleComp.isLocal) {
							paddleComp.serverOffset = p.offset as number;
						} else {
							paddleComp.offset = p.offset as number;
							paddle.rotation.y = paddleComp.baseRotation - paddleComp.offset;
						}
					}
				});

				this.gameUI.updatePlayerCount(activePaddleCount);
			}
		});
	}

	private rebuildIndices(entities: Entity[]): void {
		this.ballIdToEntity.clear();
		this.paddleIndexToEntity.clear();

		for (const entity of entities) {
			if (entity.hasComponent(BallComponent)) {
				const ball = entity.getComponent(BallComponent)!;
				this.ballIdToEntity.set(ball.id, entity);
			}

			if (entity.hasComponent(PaddleComponent)) {
				const paddle = entity.getComponent(PaddleComponent)!;
				this.paddleIndexToEntity.set(paddle.paddleIndex, entity);
			}
		}

		this.indexesDirty = false;
		console.log(`✅ Indices: ${this.ballIdToEntity.size} balls, ${this.paddleIndexToEntity.size} paddles`);
	}

	public forceIndexRebuild(): void {
		this.indexesDirty = true;
	}

	resetPhaseState(): void {
		this.indexesDirty = true;
		this.ballIdToEntity.clear();
		this.paddleIndexToEntity.clear();
		this.spectateButtonOn = false;
	}
}
