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
import { ArcRotateCamera, Scene, TransformNode, Vector3, Mesh, } from "../../babylon";
import { BallComponent } from "./components/BallComponent.js";
import { TransformComponent } from "./components/TransformComponent.js";
import { WallComponent } from "./components/WallComponent.js";
import { Entity } from "./ecs/Entity.js";
import { createBlackHoleBackdrop } from "./templates/blackhole.js";
import { SpaceSkybox } from "./templates/skybox.js";
import GameUI from "../GameUI.js";
import { PaddleComponent } from "./components/PaddleComponent.js";
import { GoalComponent } from "./components/GoalComponent.js";
import { PillarComponent } from "./components/PillarComponent.js";
import { PHASE_CAMERA_CONFIG, DEFAULT_CAMERA, LOADING_CAMERA } from "./config/CameraConfig.js";

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
	private localPaddleIndex: number = 0;


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

		this.camera.alpha = LOADING_CAMERA.alpha;
		this.camera.beta = LOADING_CAMERA.beta;
		this.camera.radius = LOADING_CAMERA.radius;


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
		this.scene.onBeforeCameraRenderObservable.add(() => {
			this.baseMeshes.paddle.material.setUniform("time", performance.now() / 1000);
		});



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

		if (this.paddleBundles) {
			this.paddleBundles.forEach(b => {
				this.ecs.removeEntity(b.paddle);
				this.ecs.removeEntity(b.goal);
				this.ecs.removeEntity(b.deathWall);
				this.ecs.removeEntity(b.pillar);
			});
		}
		const allEntities = this.ecs.getAllEntities();
		allEntities.forEach(entity => {
			if (entity.hasComponent(BallComponent)) {
				this.ecs.removeEntity(entity);
			}
		});

		this.spaceSkybox.onGameLoad();
		this.localPaddleIndex = localPaddleId;
		this.paddleBundles = createGameTemplate(this.ecs, 100, this.rotatingContainer, this.gameUI, this.localPaddleIndex);
		this.baseMeshes.paddle.material.setUniform("playerCount", 100);
		this.baseMeshes.paddle.material.setUniform("paddleId", this.localPaddleIndex);

		this.currentBallScale = new Vector3(2, 2, 2);

		console.log('📹 Starting intro camera animation to Phase 1');
		this.onPhaseChange('Phase 1', 3.0);

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
		// this.paddleBundles = createGameTemplate(this.ecs, 100, this.rotatingContainer, this.gameUI, localPaddleId);
	}
	public transitionToRound(nextCount: number, localPaddleIndex: number) {
		console.log(`🎮 Transition: ${nextCount} players, local at index ${localPaddleIndex}`);

		this.localPaddleIndex = localPaddleIndex;

		const allEntities = this.ecs.getAllEntities();
		allEntities.forEach(entity => {
			if (entity.hasComponent(BallComponent)) {
				this.ecs.removeEntity(entity);
			}
		});
		const entities = this.ecs.getAllEntities();

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

		// 1. Remove ALL game entities
		// const toRemove = this.ecs.getAllEntities().filter(e =>
		// 	e.hasComponent(BallComponent) ||
		// 	e.hasComponent(PaddleComponent) ||
		// 	e.hasComponent(GoalComponent) ||
		// 	e.hasComponent(WallComponent) ||
		// 	e.hasComponent(PillarComponent)
		// );
		// toRemove.forEach(e => this.ecs.removeEntity(e));

		// 2. Update ball scale
		let scaleFactor: number;
		switch (nextCount) {
			case 100: scaleFactor = 2; break;
			case 50: scaleFactor = 4; break;
			case 25: scaleFactor = 8; break;
			case 12: scaleFactor = 10; break;
			case 3: scaleFactor = 12; break;
			default: scaleFactor = 25 / nextCount;
		}
		this.currentBallScale = new Vector3(scaleFactor, scaleFactor, scaleFactor);

		// 3. Update shaders
		this.baseMeshes.paddle.material.setUniform("playerCount", nextCount);
		this.baseMeshes.paddle.material.setUniform("paddleId", localPaddleIndex);

		// 4. Create new everything
		this.paddleBundles = createGameTemplate(
			this.ecs,
			nextCount,
			this.rotatingContainer,
			this.gameUI,
			localPaddleIndex
		);

		// 5. Force index rebuild
		this.networkingSystem.forceIndexRebuild();

		console.log(`✅ Transition complete`);
	}


	public getEntities(): Entity[] {
		return this.ecs.getAllEntities();
	}

	public getLocalPaddleIndex(): number {
		return this.localPaddleIndex;
	}

	public updateLocalPaddleIndex(newIndex: number): void {
		console.log(`🔄 Updating local paddle index: ${this.localPaddleIndex} → ${newIndex}`);
		this.localPaddleIndex = newIndex;

		this.baseMeshes.paddle.material.setUniform("paddleId", newIndex);

		if (newIndex >= 0 && this.paddleBundles) {
			const bundle = this.paddleBundles.find(b => b.sliceIndex === newIndex);
			if (bundle) {
				const paddleComp = bundle.paddle.getComponent(PaddleComponent);
				if (paddleComp) {
					this.rotatingContainer.rotation.y = -paddleComp.baseRotation;
				}
			}
		} else {
			this.rotatingContainer.rotation.y = 0;
		}
	}

	public onPhaseChange(phase: string, duration: number = 1.0): void {
		console.log(`📹 Camera transition for phase: ${phase} (${duration}s)`);

		const cameraConfig = PHASE_CAMERA_CONFIG[phase] || DEFAULT_CAMERA;

		const frameRate = 60;

		const alphaAnim = this.createCameraAnimation('alpha', cameraConfig.alpha, frameRate, duration);
		const betaAnim = this.createCameraAnimation('beta', cameraConfig.beta, frameRate, duration);
		const radiusAnim = this.createCameraAnimation('radius', cameraConfig.radius, frameRate, duration);

		this.camera.animations = [alphaAnim, betaAnim, radiusAnim];
		this.scene.beginAnimation(this.camera, 0, frameRate * duration, false);
	}

	private createCameraAnimation(property: string, targetValue: number, frameRate: number, duration: number): any {
		const { Animation } = require('../../babylon');

		const animation = new Animation(
			`camera_${property}`,
			property,
			frameRate,
			Animation.ANIMATIONTYPE_FLOAT,
			Animation.ANIMATIONLOOPMODE_CONSTANT
		);

		const keys = [
			{ frame: 0, value: (this.camera as any)[property] },
			{ frame: frameRate * duration, value: targetValue }
		];

		animation.setKeys(keys);
		return animation;
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
