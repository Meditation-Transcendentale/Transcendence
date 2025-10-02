import { ECSManager } from "./ecs/ECSManager.js";
import { StateManager } from "./state/StateManager.js";
import { MovementSystem } from "./systems/MovementSystem.js";
import { InputSystem } from "./systems/InputSystem.js";
import { NetworkingSystem } from "./systems/NetworkingSystem.js";
import { ThinInstanceSystem } from "./systems/ThinInstanceSystem.js";
import { WebSocketManager } from "./network/WebSocketManager.js";
import { InputManager } from "./input/InputManager.js";
import { ThinInstanceManager } from "./rendering/ThinInstanceManager.js";
import { createBaseMeshes, initStatue } from "./utils/initializeGame.js";
import { decodeServerMessage, encodeClientMessage } from './utils/proto/helper.js';
import type { userinterface } from './utils/proto/message.js';
import { PaddleBundle } from "./templates/builder.js";
import { createGameTemplate } from "./templates/builder.js";
import { ArcRotateCamera, Scene, TransformNode, Vector3, Mesh, } from "@babylonImport";
import { BallComponent } from "./components/BallComponent.js";
import { TransformComponent } from "./components/TransformComponent.js";
import { WallComponent } from "./components/WallComponent.js";
import { Entity } from "./ecs/Entity.js";
import { createBlackHoleBackdrop } from "./templates/blackhole.js";
import { SpaceSkybox } from "./templates/skybox.js";
import GameUI from "../spa/GameUI.js";


export let localPaddleId: any = null;
export class PongBR {
	private scene!: Scene;
	private ecs!: ECSManager;
	public stateManager!: StateManager;
	private wsManager!: WebSocketManager;
	private inputManager!: InputManager;
	private camera!: ArcRotateCamera;
	private canvas;
	private baseMeshes: any;
	private instanceManagers: any;
	private uuid!: string;
	private paddleBundles!: PaddleBundle[];
	private pongRoot!: TransformNode;
	private rotatingContainer!: TransformNode;
	private inited: boolean;
	private networkingSystem!: NetworkingSystem;
	private inputSystem!: InputSystem;
	private thinInstanceSystem!: ThinInstanceSystem;
	private spaceSkybox!: SpaceSkybox;
	private statue!: Mesh;
	public currentBallScale: Vector3 = new Vector3(1, 1, 1);
	private gameUI: GameUI;


	constructor(canvas: any, scene: Scene, gameUI: GameUI) {
		this.canvas = canvas;
		this.scene = scene;
		this.inited = false;
		this.pongRoot = this.scene.getTransformNodeByName('pongbrRoot') as TransformNode;
		this.gameUI = gameUI;
	}

	public async init() {
		const arena = this.scene.getMeshByName('arenaBox') as Mesh;
		arena.parent = this.pongRoot;

		this.rotatingContainer = new TransformNode("rotatingContainer", this.scene);
		this.rotatingContainer.parent = this.pongRoot;

		this.camera = this.scene.getCameraByName('br') as ArcRotateCamera;
		this.camera.parent = this.pongRoot;
		this.camera.minZ = 0.2;

		this.camera.alpha = 0;
		this.camera.beta = Math.PI / 2.1;
		this.camera.radius = 300;

		this.baseMeshes = createBaseMeshes(this.scene, this.rotatingContainer);
		this.instanceManagers = this.createInstanceManagers(this.baseMeshes);
		this.statue = initStatue(this.scene, this.pongRoot);
		createBlackHoleBackdrop(this.scene, this.statue.position, this.pongRoot);
		this.spaceSkybox = new SpaceSkybox(this.scene);
		this.spaceSkybox.applyPreset('Monochrome');

		this.inputManager = new InputManager();
		localPaddleId = 0;
		this.initECS(this.instanceManagers, this.rotatingContainer);

		this.stateManager = new StateManager(this.ecs);
		this.inited = true;


	}
	public async start(gameId: string, uuid: string) {
		if (!this.inited) {
			await this.init();
		}
		if (this.wsManager) {
			this.wsManager.socket.close();
			this.ecs.removeSystem(this.inputSystem);
			this.ecs.removeSystem(this.networkingSystem);
			this.thinInstanceSystem.reset(this.ecs.getAllEntities());
		}
		const wsUrl = `wss://${window.location.hostname}:7000/game?` +
			`uuid=${uuid}&` +
			`gameId=${encodeURIComponent(gameId)}`;
		this.wsManager = new WebSocketManager(wsUrl);

		localPaddleId = await this.waitForRegistration();

		this.inputSystem = new InputSystem(this.inputManager, this.wsManager);
		this.ecs.addSystem(this.inputSystem);
		this.networkingSystem = new NetworkingSystem(
			this.wsManager,
			this.uuid,
			this.gameUI,
			this
		);
		this.ecs.addSystem(this.networkingSystem);

		this.networkingSystem.resetPhaseState();

		this.paddleBundles.forEach(b => {
			this.ecs.removeEntity(b.paddle);
			this.ecs.removeEntity(b.goal);
			this.ecs.removeEntity(b.deathWall);
			this.ecs.removeEntity(b.pillar);
		});
		const allEntities = this.ecs.getAllEntities();
		allEntities.forEach(entity => {
			if (entity.hasComponent(BallComponent)) {
				this.ecs.removeEntity(entity);
			}
		});

		this.spaceSkybox.onGameLoad();
		this.paddleBundles = createGameTemplate(this.ecs, 100, this.rotatingContainer, this.gameUI, localPaddleId);
		this.baseMeshes.paddle.material.setUniform("playerCount", 100);
		this.baseMeshes.paddle.material.setUniform("paddleId", localPaddleId);

		this.currentBallScale = new Vector3(1, 1, 1);

		this.networkingSystem.forceIndexRebuild();

		this.inputManager.enable();
		this.pongRoot.setEnabled(true);
		this.stateManager.setter(true);
		this.stateManager.update();
	}
	public stop(): void {

		this.spaceSkybox.onGameUnload();
		this.inputManager.disable();
		this.pongRoot.setEnabled(false);
		this.stateManager.setter(false);

		console.log("game paused");
	}

	private createInstanceManagers(baseMeshes: any) {
		return {
			ball: new ThinInstanceManager(baseMeshes.ball, 200, 50, 100),
			paddle: new ThinInstanceManager(baseMeshes.paddle, 100, 50, 100),
			wall: new ThinInstanceManager(baseMeshes.wall, 100, 50, 100),
			pillar: new ThinInstanceManager(baseMeshes.pillar, 200, 50, 100),
			goal: new ThinInstanceManager(baseMeshes.goal, 100, 50, 100),
		}
	}

	private initECS(instanceManagers: any, pongRoot: TransformNode) {
		this.ecs = new ECSManager();
		this.ecs.addSystem(new MovementSystem());
		this.thinInstanceSystem = new ThinInstanceSystem(
			instanceManagers.ball,
			instanceManagers.paddle,
			instanceManagers.wall,
			instanceManagers.goal,
			instanceManagers.pillar,
			this.camera
		);
		this.ecs.addSystem(this.thinInstanceSystem);
		this.paddleBundles = createGameTemplate(this.ecs, 100, this.rotatingContainer, this.gameUI, localPaddleId);
	}

	public transitionToRound(nextCount: number, entities: Entity[], physicsState?: any, playerMapping?: Record<number, number>) {
		const eliminatedPlayerIds = new Set<number>();
		const activePlayers = new Set<number>();

		if (physicsState && physicsState.paddles) {
			physicsState.paddles.forEach((p: any) => {
				if (p.dead) {
					eliminatedPlayerIds.add(p.playerId);
				} else {
					activePlayers.add(p.playerId);
				}
			});
		}

		this.baseMeshes.paddle.material.setUniform("playerCount", nextCount);

		let scaleFactor: number;
		switch (nextCount) {
			case 100: scaleFactor = 1; break;
			case 50: scaleFactor = 1.5; break;
			case 25: scaleFactor = 2; break;
			case 12: scaleFactor = 2.5; break;
			case 3: scaleFactor = 6.0; break;
			default: scaleFactor = 25 / nextCount;
		}
		this.currentBallScale = new Vector3(scaleFactor, scaleFactor, scaleFactor);

		const allEntities = this.ecs.getAllEntities();
		allEntities.forEach(entity => {
			if (entity.hasComponent(BallComponent)) {
				this.ecs.removeEntity(entity);
			}
		});

		this.paddleBundles.forEach(b => {
			this.ecs.removeEntity(b.paddle);
			this.ecs.removeEntity(b.goal);
			this.ecs.removeEntity(b.deathWall);
			this.ecs.removeEntity(b.pillar);
		});
		for (const entity of entities) {
			if (
				!entity.hasComponent(WallComponent) ||
				!entity.hasComponent(TransformComponent)
			) {
				continue;
			}
			const transform = entity.getComponent(TransformComponent);
			transform?.disable();
		}

		let newLocalPaddleIndex = -1;

		if (localPaddleId !== null && localPaddleId !== undefined) {
			if (eliminatedPlayerIds.has(localPaddleId)) {
				newLocalPaddleIndex = -1;
			} else if (playerMapping && playerMapping[localPaddleId] !== undefined) {
				newLocalPaddleIndex = playerMapping[localPaddleId];
			} else {
				if (activePlayers.has(localPaddleId)) {
					newLocalPaddleIndex = localPaddleId;
				} else {
					newLocalPaddleIndex = -1;
				}
			}
		}

		this.baseMeshes.paddle.material.setUniform("paddleId", newLocalPaddleIndex);

		this.paddleBundles = createGameTemplate(this.ecs, nextCount, this.rotatingContainer, this.gameUI, newLocalPaddleIndex);

		this.networkingSystem.forceIndexRebuild();
	}


	private waitForRegistration(): Promise<number> {
		return new Promise((resolve, reject) => {
			const socket = this.wsManager.socket;

			const listener = (event: MessageEvent) => {
				if (!(event.data instanceof ArrayBuffer)) {
					console.warn('Non-binary message received, ignoring');
					return;
				}

				let serverMsg: userinterface.ServerMessage;
				try {
					const buf = new Uint8Array(event.data);
					serverMsg = decodeServerMessage(buf);
				} catch (err) {
					console.error('Failed to decode protobuf message:', err);
					return;
				}

				if (serverMsg.welcome?.paddleId != null) {
					const paddleId = serverMsg.welcome.paddleId;
					console.log('Received WelcomeMessage:', paddleId);

					const readyPayload: userinterface.IClientMessage = { ready: {} };
					const readyBuf = encodeClientMessage(readyPayload);
					socket.send(readyBuf);

					socket.removeEventListener('message', listener);
					resolve(paddleId);
				}
			};

			socket.addEventListener('message', listener);

			setTimeout(() => {
				socket.removeEventListener('message', listener);
				reject(new Error('Timed out waiting for WelcomeMessage'));
			}, 5000);
		});
	}

}
