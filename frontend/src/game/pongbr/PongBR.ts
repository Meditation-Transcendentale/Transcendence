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
import { ArcRotateCamera, Scene, TransformNode, Vector3, Mesh, Animation, DefaultRenderingPipeline, Color4, Engine, ImageProcessingConfiguration } from "../../babylon";
import { BallComponent } from "./components/BallComponent.js";
import { TransformComponent } from "./components/TransformComponent.js";
import { WallComponent } from "./components/WallComponent.js";
import { Entity } from "./ecs/Entity.js";
import { createBlackHoleBackdrop } from "./templates/blackhole.js";
import { SpaceSkybox } from "./templates/skybox.js";
import GameUI from "../GameUI.js";
import { PaddleComponent } from "./components/PaddleComponent.js";
import { PHASE_CAMERA_CONFIG, DEFAULT_CAMERA, LOADING_CAMERA } from "./config/CameraConfig.js";
import { postRequest } from "../../networking/request.js";

export let localPaddleId: any = null;

const BALL_SCALES = {
	100: new Vector3(2, 2, 2),
	50: new Vector3(4, 4, 4),
	25: new Vector3(8, 8, 8),
	12: new Vector3(10, 10, 10),
	3: new Vector3(12, 12, 12)
};
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
	private smileTarget: any = null;
	public currentBallScale: Vector3 = new Vector3(1, 1, 1);
	private gameUI: GameUI;
	private localPaddleIndex: number = 0;
	private paddleMaterialObserver: any = null;
	private blackholeObserver: any = null;
	private pipeline!: DefaultRenderingPipeline;
	private phaseAnimationObserver: any = null;
	private phaseAnimationStartTime: number = 0;
	private isPhaseAnimating: boolean = false;
	private isTransitioning: boolean = false;
	private uuidToUsername: Map<string, string> = new Map();
	private imageProcessingConfig!: any;
	private pipelineisDisposed: boolean = false;


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
		const statueResult = initStatue(this.scene, this.pongRoot);
		this.statue = statueResult.statue;
		this.smileTarget = statueResult.smileTarget;
		const blackholeResult = createBlackHoleBackdrop(this.scene, this.statue.position, this.pongRoot);
		blackholeResult.backdrop.setEnabled(false);
		this.blackholeObserver = blackholeResult.observer;
		this.spaceSkybox = new SpaceSkybox(this.scene);
		this.spaceSkybox.applyPreset('Monochrome');

		this.inputManager = new InputManager();
		localPaddleId = 0;
		this.initECS(this.instanceManagers, this.rotatingContainer);

		this.stateManager = new StateManager(this.ecs, this.scene);
		this.inited = true;

		this.paddleMaterialObserver = this.scene.onBeforeCameraRenderObservable.add(() => {
			const time = performance.now() / 1000;
			this.baseMeshes.paddle.material.setUniform("time", time);
			this.baseMeshes.ball.material.setUniform("time", time);
		});

		this.setupPostProcessing();

	}

	private setupPostProcessing(): void {
		this.pipeline = new DefaultRenderingPipeline(
			"brPipeline",
			true,
			this.scene,
			[this.camera]
		);

		this.pipeline.samples = 1;

		this.pipeline.bloomEnabled = true;
		this.pipeline.bloomThreshold = 0.2;
		this.pipeline.bloomWeight = 1.0;
		this.pipeline.bloomKernel = 64;
		this.pipeline.bloomScale = 0.8;

		this.pipeline.depthOfFieldEnabled = false;

		this.pipeline.grainEnabled = true;
		this.pipeline.grain.intensity = 10;
		this.pipeline.grain.animated = true;

		this.pipeline.imageProcessingEnabled = true;

		this.imageProcessingConfig = new ImageProcessingConfiguration();
		this.pipeline.imageProcessing.imageProcessingConfiguration = this.imageProcessingConfig;

		this.imageProcessingConfig.vignetteEnabled = true;
		this.imageProcessingConfig.vignetteWeight = 2.0;
		this.imageProcessingConfig.vignetteColor = new Color4(0.05, 0.02, 0.02, 1);
		this.imageProcessingConfig.contrast = 1.1;
		this.imageProcessingConfig.exposure = 1.1;
		this.imageProcessingConfig.toneMappingEnabled = true;
		this.imageProcessingConfig.toneMappingType = 1;

		this.pipeline.fxaaEnabled = true;

	}

	public async start(gameId: string, uuid: string) {
		this.uuid = uuid;
		if (!this.inited) {
			await this.init();
		} else {
			if (this.pipelineisDisposed) {
				this.setupPostProcessing();
				this.pipelineisDisposed = false;
			}
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

		const isSpectator = localPaddleId === -1;

		if (!isSpectator) {
			this.gameUI.showBRInputHints();
		}
		this.camera.alpha = LOADING_CAMERA.alpha;
		this.camera.beta = LOADING_CAMERA.beta;
		this.camera.radius = LOADING_CAMERA.radius;

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

		this.smileTarget.influence = 0.0;
		this.spaceSkybox.onGameLoad();
		this.localPaddleIndex = isSpectator ? 0 : localPaddleId;
		this.paddleBundles = createGameTemplate(this.ecs, 100, this.rotatingContainer, this.gameUI, this.localPaddleIndex);
		this.baseMeshes.paddle.material.setUniform("playerCount", 100);
		this.baseMeshes.paddle.material.setUniform("paddleId", this.localPaddleIndex);
		this.baseMeshes.wall.material.setUniform("playerCount", 100);

		this.currentBallScale = BALL_SCALES[100];

		this.networkingSystem.forceIndexRebuild();

		this.pongRoot.setEnabled(true);
		this.spaceSkybox.disable();

		this.inputManager.disable();

		this.stateManager.start();

		this.startIntroCameraAnimation('Phase 1', 3.0);

		if (!isSpectator) {
			setTimeout(() => {
				this.gameUI.startCountdown(4, () => {
					this.gameUI.hideBRInputHints();
				});
			}, 1500);
		}
	}
	public stop(): void {
		this.stateManager.stop();
		this.spaceSkybox.onGameUnload();
		this.inputManager.disable();

		this.isPhaseAnimating = false;
		this.isTransitioning = false;

		if (this.phaseAnimationObserver) {
			this.scene.onBeforeRenderObservable.remove(this.phaseAnimationObserver);
			this.phaseAnimationObserver = null;
		}

		const payload: userinterface.IClientMessage = {
			quit: {
				uuid: this.uuid,
				lobbyId: this.uuid,
			},
		};
		const buffer = encodeClientMessage(payload);
		this.wsManager.socket.send(buffer);
		this.wsManager.socket.close();
		this.pongRoot.setEnabled(false);

		if (this.pipeline) {
			this.pipeline.dispose();
			this.pipelineisDisposed = true;
		}
	}

	public dispose(): void {
		console.log("PongBR: Disposing resources");

		this.stateManager.stop();

		if (this.paddleMaterialObserver) {
			this.scene.onBeforeCameraRenderObservable.remove(this.paddleMaterialObserver);
			this.paddleMaterialObserver = null;
		}

		if (this.blackholeObserver) {
			this.scene.onBeforeRenderObservable.remove(this.blackholeObserver);
			this.blackholeObserver = null;
		}

		if (this.phaseAnimationObserver) {
			this.scene.onBeforeRenderObservable.remove(this.phaseAnimationObserver);
			this.phaseAnimationObserver = null;
		}

		if (this.spaceSkybox) {
			this.spaceSkybox.onGameUnload();
		}

		if (this.pipeline) {
			this.pipeline.dispose();
		}

		if (this.wsManager) {
			this.wsManager.socket.close();
		}

		console.log("PongBR: Disposal complete");
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
		this.performArenaRebuild(nextCount, localPaddleIndex);
		this.completeTransition(nextCount, localPaddleIndex);
	}

	public isInTransition(): boolean {
		return this.isTransitioning;
	}

	private startPhaseFadeOut(): void {
		const fadeDuration = 0.5;
		const startTime = performance.now();

		const originalExposure = this.imageProcessingConfig.exposure;
		const originalVignetteWeight = this.imageProcessingConfig.vignetteWeight;

		if (this.phaseAnimationObserver) {
			this.scene.onBeforeRenderObservable.remove(this.phaseAnimationObserver);
		}

		this.phaseAnimationObserver = this.scene.onBeforeRenderObservable.add(() => {
			if (this.pipelineisDisposed) {
				if (this.phaseAnimationObserver) {
					this.scene.onBeforeRenderObservable.remove(this.phaseAnimationObserver);
					this.phaseAnimationObserver = null;
				}
				return;
			}

			const elapsed = (performance.now() - startTime) / 1000;

			if (elapsed < fadeDuration) {
				const fadeProgress = elapsed / fadeDuration;
				this.imageProcessingConfig.exposure = originalExposure * (1.0 - fadeProgress);
				this.imageProcessingConfig.vignetteWeight = originalVignetteWeight + (10.0 * fadeProgress);
			} else {
				this.imageProcessingConfig.exposure = 0.0;
				this.imageProcessingConfig.vignetteWeight = originalVignetteWeight + 10.0;
			}
		});
	}

	private completeTransition(nextCount: number, localPaddleIndex: number): void {
		const fadeInDuration = 1.1;
		const cameraDuration = 1.5;
		const startTime = performance.now();

		const originalExposure = this.imageProcessingConfig.exposure;
		const originalVignetteWeight = this.imageProcessingConfig.vignetteWeight;

		const phase = this.getPhaseFromPlayerCount(nextCount);
		this.startCameraAnimation(phase, cameraDuration);

		if (this.phaseAnimationObserver) {
			this.scene.onBeforeRenderObservable.remove(this.phaseAnimationObserver);
		}

		this.phaseAnimationObserver = this.scene.onBeforeRenderObservable.add(() => {
			if (this.pipelineisDisposed) {
				if (this.phaseAnimationObserver) {
					this.scene.onBeforeRenderObservable.remove(this.phaseAnimationObserver);
					this.phaseAnimationObserver = null;
				}
				this.isTransitioning = false;
				return;
			}

			const elapsed = (performance.now() - startTime) / 1000;

			if (elapsed < fadeInDuration) {
				const fadeProgress = elapsed / fadeInDuration;
				this.imageProcessingConfig.exposure = originalExposure * fadeProgress;
				this.imageProcessingConfig.vignetteWeight = originalVignetteWeight + (10.0 * (1.0 - fadeProgress));
			} else {
				this.imageProcessingConfig.exposure = originalExposure;
				this.imageProcessingConfig.vignetteWeight = originalVignetteWeight;

				this.isTransitioning = false;

				this.scene.onBeforeRenderObservable.remove(this.phaseAnimationObserver);
				this.phaseAnimationObserver = null;
			}
		});
	}

	private getPhaseFromPlayerCount(playerCount: number): string {
		if (playerCount >= 50) return 'Phase 1';
		if (playerCount >= 25) return 'Phase 2';
		if (playerCount >= 12) return 'Phase 3';
		if (playerCount >= 6) return 'Phase 4';
		return 'Phase 5';
	}

	private startCameraAnimation(phase: string, duration: number): void {
		const cameraConfig = PHASE_CAMERA_CONFIG[phase] || DEFAULT_CAMERA;
		const frameRate = 60;

		const alphaAnim = this.createCameraAnimation('alpha', cameraConfig.alpha, frameRate, duration);
		const betaAnim = this.createCameraAnimation('beta', cameraConfig.beta, frameRate, duration);
		const radiusAnim = this.createCameraAnimation('radius', cameraConfig.radius, frameRate, duration);

		this.camera.animations = [alphaAnim, betaAnim, radiusAnim];
		this.scene.beginAnimation(this.camera, 0, frameRate * duration, false);
	}

	private performArenaRebuild(nextCount: number, localPaddleIndex: number): void {
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

		if (BALL_SCALES[nextCount]) {
			this.currentBallScale = BALL_SCALES[nextCount];
		} else {
			const scaleFactor = 25 / nextCount;
			this.currentBallScale = new Vector3(scaleFactor, scaleFactor, scaleFactor);
		}

		this.baseMeshes.paddle.material.setUniform("playerCount", nextCount);
		this.baseMeshes.paddle.material.setUniform("paddleId", localPaddleIndex);
		this.baseMeshes.wall.material.setUniform("playerCount", nextCount);
		this.baseMeshes.wall.material.setUniform("paddleId", localPaddleIndex);
		this.paddleBundles = createGameTemplate(
			this.ecs,
			nextCount,
			this.rotatingContainer,
			this.gameUI,
			localPaddleIndex
		);

		this.networkingSystem.forceIndexRebuild();
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
		this.isTransitioning = true;
		this.startPhaseFadeOut();
		this.startPhaseAnimation(duration);

		if (phase === 'Phase 2' && this.smileTarget) {
			this.animateStatueSmile(0.0);
		}
	}

	private startIntroCameraAnimation(phase: string, duration: number): void {
		this.startCameraAnimation(phase, duration);
		this.startPhaseAnimation(duration);
		this.inputManager.enable();
	}

	/**
	 * Animates the statue's smile morph target from hidden (0.0) to fully visible (1.0)
	 * Uses smoothstep easing for a natural smile animation
	 */
	private animateStatueSmile(duration: number): void {
		if (!this.smileTarget) return;

		const startTime = performance.now();
		const startInfluence = this.smileTarget.influence;
		const targetInfluence = 1.0;

		const smileObserver = this.scene.onBeforeRenderObservable.add(() => {
			const elapsed = (performance.now() - startTime) / 1000;
			const progress = Math.min(elapsed / duration, 1.0);

			if (progress < 1.0) {
				const eased = progress * progress * (3.0 - 2.0 * progress);
				this.smileTarget.influence = startInfluence + (targetInfluence - startInfluence) * eased;
			} else {
				this.smileTarget.influence = targetInfluence;
				this.scene.onBeforeRenderObservable.remove(smileObserver);
			}
		});
	}

	private startPhaseAnimation(duration: number): void {
		this.isPhaseAnimating = true;
		this.phaseAnimationStartTime = performance.now();

		const originalBloomWeight = this.pipeline.bloomWeight;
		const originalVignetteWeight = this.imageProcessingConfig.vignetteWeight;
		const originalContrast = this.imageProcessingConfig.contrast;
		const originalExposure = this.imageProcessingConfig.exposure;

		if (this.phaseAnimationObserver) {
			this.scene.onBeforeRenderObservable.remove(this.phaseAnimationObserver);
		}

		this.phaseAnimationObserver = this.scene.onBeforeRenderObservable.add(() => {
			if (!this.pipeline || this.pipelineisDisposed) {
				if (this.phaseAnimationObserver) {
					this.scene.onBeforeRenderObservable.remove(this.phaseAnimationObserver);
					this.phaseAnimationObserver = null;
				}
				this.isPhaseAnimating = false;
				return;
			}

			const elapsed = (performance.now() - this.phaseAnimationStartTime) / 1000;
			const progress = Math.min(elapsed / duration, 1.0);

			if (progress < 1.0) {
				let flashIntensity = 0;
				if (progress < 0.15) {
					flashIntensity = Math.sin(progress / 0.15 * Math.PI) * 0.3;
				}

				let bloomMultiplier = 1.0;
				if (progress < 0.5) {
					const bloomProgress = progress / 0.5;
					bloomMultiplier = 1.0 + Math.sin(bloomProgress * Math.PI) * 2.5;
				}

				let vignetteMultiplier = 1.0;
				if (progress < 0.6) {
					const vignProgress = progress / 0.6;
					vignetteMultiplier = 1.0 + Math.sin(vignProgress * Math.PI) * 1.5;
				}

				let contrastBoost = 0;
				if (progress < 0.4) {
					contrastBoost = Math.sin(progress / 0.4 * Math.PI) * 0.3;
				}

				let exposureBoost = 0;
				if (progress < 0.3) {
					exposureBoost = Math.sin(progress / 0.3 * Math.PI) * 0.5;
				}

				if (this.pipeline && !this.pipeline.isDisposed) {
					this.pipeline.bloomWeight = originalBloomWeight * bloomMultiplier;
				}
				if (this.imageProcessingConfig) {
					this.imageProcessingConfig.vignetteWeight = originalVignetteWeight * vignetteMultiplier;
					this.imageProcessingConfig.contrast = originalContrast + contrastBoost;
					this.imageProcessingConfig.exposure = originalExposure + exposureBoost + flashIntensity;
				}

			} else {
				if (this.pipeline && !this.pipeline.isDisposed) {
					this.pipeline.bloomWeight = originalBloomWeight;
				}
				if (this.imageProcessingConfig) {
					this.imageProcessingConfig.vignetteWeight = originalVignetteWeight;
					this.imageProcessingConfig.contrast = originalContrast;
					this.imageProcessingConfig.exposure = originalExposure;
				}

				this.scene.onBeforeRenderObservable.remove(this.phaseAnimationObserver);
				this.phaseAnimationObserver = null;
				this.isPhaseAnimating = false;
			}
		});
	}

	private createCameraAnimation(property: string, targetValue: number, frameRate: number, duration: number): any {
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

	public async fetchPlayerUsernames(playerUUIDs: string[]): Promise<void> {
		this.uuidToUsername.clear();

		const realPlayerUUIDs = playerUUIDs.filter(uuid => !uuid.startsWith('bot-'));

		const fetchPromises = realPlayerUUIDs.map(async (uuid) => {
			try {
				const response: any = await postRequest("info/search", {
					identifier: uuid,
					type: "uuid"
				});

				if (response.data && response.data.username) {
					this.uuidToUsername.set(uuid, response.data.username);
					console.log(`Fetched username for ${uuid}: ${response.data.username}`);
				}
			} catch (error) {
				console.error(`Failed to fetch username for UUID ${uuid}:`, error);
				this.uuidToUsername.set(uuid, uuid.substring(0, 8));
			}
		});

		await Promise.all(fetchPromises);
		console.log(`✅ Loaded ${this.uuidToUsername.size} real player usernames (${playerUUIDs.length - realPlayerUUIDs.length} bots skipped)`);
	}

	public getUsername(uuid: string): string {
		if (uuid.startsWith('bot-')) {
			return `Bot ${uuid.substring(4)}`;
		}
		return this.uuidToUsername.get(uuid) || uuid.substring(0, 8);
	}

	public getUsernameMap(): Map<string, string> {
		return this.uuidToUsername;
	}

}
