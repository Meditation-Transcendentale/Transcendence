import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { BallComponent } from "../components/BallComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { WebSocketManager } from "../network/WebSocketManager.js";
import { decodeServerMessage, encodeClientMessage } from "../utils/proto/helper.js";
import { userinterface } from "../utils/proto/message.js";
import { WallComponent } from "../components/WallComponent.js";
import { localPaddleId, PongBR } from "../PongBR.js";
import { PhaseState, PhaseTransitionEvent, RebuildCompleteEvent, GameStateInfo } from "../state/PhaseState.js";
import { Vector3 } from "../../../babylon";
import GameUI from "../../GameUI";
import { InputComponent } from "../components/InputComponent.js";
import { htmlManager } from "../../../html/HtmlManager.js";
import { NotificationType } from "../../../html/NotificationHtml.js";

export class NetworkingSystem extends System {
	private wsManager: WebSocketManager;
	private uuid: string;
	private gameUI: GameUI;
	private game: PongBR;
	private currentPhysicsState: any = null;

	private ballIdToEntity = new Map<number, Entity>();
	private paddleIndexToEntity = new Map<number, Entity>();
	private wallIndexToEntity = new Map<number, Entity>();
	private indexesDirty = true;

	private spectateButtonOn: boolean = false;
	private currentPlayerCount: number = 100;
	private currentPhase: string = 'Phase 1';
	private usernamesFetched: boolean = false;
	private eliminatedPlayers: Set<string> = new Set();

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

				let rebuildHappenedThisFrame = false;

				if (!this.usernamesFetched && paddles.length > 0) {
					console.log(`🔍 First paddles data:`, paddles.slice(0, 3));
					const playerUUIDs = paddles
						.map((p: any) => p.uuid)
						.filter((uuid: any) => uuid && typeof uuid === 'string');

					console.log(`🔍 Extracted UUIDs:`, playerUUIDs.slice(0, 3));

					if (playerUUIDs.length > 0) {
						this.usernamesFetched = true;
						this.game.fetchPlayerUsernames(playerUUIDs).catch((err) => {
							console.error('Failed to fetch player usernames:', err);
						});
					} else {
						console.warn('⚠️ No valid UUIDs found in paddle data');
					}
				}

				events.forEach((event: any) => {
					if (event.type === 'PHASE_TRANSITION') {
						const newPhase = event.phase;

						if (newPhase !== this.currentPhase) {
							console.log(`🎬 Phase changed: ${this.currentPhase} → ${newPhase}`);
							this.currentPhase = newPhase;
							this.game.onPhaseChange(newPhase);
						}
					}

					if (event.type === 'REBUILD_COMPLETE') {
						rebuildHappenedThisFrame = true;
						const mapping = event.playerMapping || {};
						const newLocalIndex = mapping[localPaddleId] ?? -1;
						const newPlayerCount = event.activePlayers.length;

						const playerCountChanged = newPlayerCount !== this.currentPlayerCount;
						const localIndexChanged = newLocalIndex !== this.game.getLocalPaddleIndex();

						if (playerCountChanged) {
							console.log(`🔄 Arena rebuild: ${this.currentPlayerCount} → ${newPlayerCount} players, local→${newLocalIndex}`);
							this.game.transitionToRound(newPlayerCount, newLocalIndex);

							this.gameUI.showPhaseChange(this.currentPhase, newPlayerCount);

							this.currentPlayerCount = newPlayerCount;
							this.indexesDirty = true;
						} else if (localIndexChanged) {
							console.log(`🎯 Local paddle remap: index ${this.game.getLocalPaddleIndex()} → ${newLocalIndex}`);
							this.game.updateLocalPaddleIndex(newLocalIndex);
						} else {
							console.log(`⏭️ Skipping: already at ${newPlayerCount} players, index ${newLocalIndex}`);
						}
					}
				});

				if (this.indexesDirty) {
					const freshEntities = this.game.getEntities();
					this.rebuildIndices(freshEntities);
				}

				balls.forEach(b => {
					const e = this.ballIdToEntity.get(b.id as number);
					if (!e) return;

					const transform = e.getComponent(TransformComponent);
					const ball = e.getComponent(BallComponent);
					if (!transform || !ball) return;

					if (this.game.isInTransition()) {
						transform.disable();
						return;
					}

					if (b.disabled) {
						transform.disable();
					} else {
						transform.enable();

						const scaleFactor = this.game.currentBallScale?.x ?? 1.0;
						const ballRadius = 0.25 * scaleFactor;
						const arenaTopY = 2.5;
						const adjustedY = arenaTopY + ballRadius;

						ball.serverPosition.set(b.x as number, adjustedY, b.y as number);
						ball.lastServerUpdate = performance.now();
						ball.velocity.set(b.vx as number, 0, b.vy as number);

						if (this.game.currentBallScale) {
							transform.baseScale.copyFrom(this.game.currentBallScale);
							transform.scale.copyFrom(this.game.currentBallScale);
						}
					}
				});

				if (rebuildHappenedThisFrame) {
					return;
				}

				let activePaddleCount = 0;
				paddles.forEach(p => {
					const e = this.paddleIndexToEntity.get(p.id as number);
					if (!e) return;

					const paddleComp = e.getComponent(PaddleComponent);
					const paddle = e.getComponent(TransformComponent);
					if (!paddleComp || !paddle) return;

					if (p.dead) {
						const wasAlreadyEliminated = this.eliminatedPlayers.has(p.uuid);

						paddle.disable();

						const wallEntity = this.wallIndexToEntity.get(p.id as number);
						if (wallEntity) {
							const wallTransform = wallEntity.getComponent(TransformComponent);
							if (wallTransform) {
								wallTransform.enable();
							}
						}

						if (!wasAlreadyEliminated) {
							this.eliminatedPlayers.add(p.uuid);

							const username = this.game.getUsername(p.uuid);

							htmlManager.notification.add({
								type: NotificationType.text,
								text: `${username} was eliminated!`,
								duration: 1000
							});

							if (p.uuid === this.uuid) {
								this.gameUI.showEliminationMessage(username);
							}
						}

					} else {
						activePaddleCount++;
						paddle.enable();

						const wallEntity = this.wallIndexToEntity.get(p.id as number);
						if (wallEntity) {
							const wallTransform = wallEntity.getComponent(TransformComponent);
							if (wallTransform) {
								wallTransform.disable();
							}
						}

						if (paddleComp.isLocal) {
							paddleComp.serverOffset = p.offset as number;
						} else {
							paddleComp.offset = p.offset as number;
							paddle.rotation.y = paddleComp.baseRotation - paddleComp.offset;
							paddle.markDirty();
						}
					}
				});

				this.gameUI.updatePlayerCount(activePaddleCount);
			}

			// === BR Game End ===
			if (serverMsg.endBr) {
				const playerIds = serverMsg.endBr.playerIds || [];


				playerIds.forEach((uuid, index) => {
					const rank = index + 1;
					const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '  ';
					const username = this.game.getUsername(uuid);
				});


				const rankings = playerIds.map((uuid, index) => {
					const isLocal = uuid === this.uuid;
					return {
						rank: index + 1,
						username: this.game.getUsername(uuid),
						uuid: uuid,
						isLocalPlayer: isLocal
					};
				});

				this.gameUI.showBRRankings(rankings);
			}
		});
	}

	private rebuildIndices(entities: Entity[]): void {
		this.ballIdToEntity.clear();
		this.paddleIndexToEntity.clear();
		this.wallIndexToEntity.clear();

		for (const entity of entities) {
			if (entity.hasComponent(BallComponent)) {
				const ball = entity.getComponent(BallComponent)!;
				this.ballIdToEntity.set(ball.id, entity);
			}

			if (entity.hasComponent(PaddleComponent)) {
				const paddle = entity.getComponent(PaddleComponent)!;
				this.paddleIndexToEntity.set(paddle.paddleIndex, entity);
			}

			if (entity.hasComponent(WallComponent)) {
				const wall = entity.getComponent(WallComponent)!;
				this.wallIndexToEntity.set(wall.id, entity);
			}
		}

		this.indexesDirty = false;
	}

	public forceIndexRebuild(): void {
		this.indexesDirty = true;
	}

	resetPhaseState(): void {
		this.indexesDirty = true;
		this.ballIdToEntity.clear();
		this.paddleIndexToEntity.clear();
		this.wallIndexToEntity.clear();
		this.spectateButtonOn = false;
		this.currentPlayerCount = 100;
		this.currentPhase = 'Phase 1';
		this.usernamesFetched = false;
	}
}
