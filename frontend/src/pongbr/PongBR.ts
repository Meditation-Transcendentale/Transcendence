import { ECSManager } from "./ecs/ECSManager.js";
import { StateManager } from "./state/StateManager.js";
import { MovementSystem } from "./systems/MovementSystem.js";
import { InputSystem } from "./systems/InputSystem.js";
//import { NetworkingSystem } from "./systems/NetworkingSystem.js";
import { HybridNetworkingSystem as NetworkingSystem } from "./systems/HybridNetworkingSystem.js";
import { ThinInstanceSystem } from "./systems/ThinInstanceSystem.js";
import { WebSocketManager } from "./network/WebSocketManager.js";
import { InputManager } from "./input/InputManager.js";
import { ThinInstanceManager } from "./rendering/ThinInstanceManager.js";
import { createBaseMeshes } from "./utils/initializeGame.js";
import { decodeServerMessage, encodeClientMessage } from './utils/proto/helper.js';
import type { userinterface } from './utils/proto/message.js';
import { buildPaddles, PaddleBundle } from "./templates/builder.js";
import { createGameTemplate } from "./templates/builder.js";
import { AnimationSystem } from "./systems/AnimationSystem.js";
import { ArcRotateCamera, Color3, Color4, PointLight, Scene, TransformNode, Vector3, Vector2, Engine, Mesh, UniversalCamera, DefaultRenderingPipeline, PolygonMeshBuilder } from "@babylonImport";
import { BallComponent } from "./components/BallComponent.js";
import { PaddleComponent } from "./components/PaddleComponent.js";
import { TransformComponent } from "./components/TransformComponent.js";
import { WallComponent } from "./components/WallComponent.js";
import { Entity } from "./ecs/Entity.js";
import earcut from "earcut";
import { MotionBlurPostProcess } from "@babylonjs/core";
import { createBlackHoleBackdrop } from "./blackhole.js";
import { SpaceSkybox } from "./skybox.js";


export let localPaddleId: any = null;
export class PongBR {
	private scene!: Scene;
	private ecs!: ECSManager;
	public stateManager!: StateManager;
	private wsManager!: WebSocketManager;
	private inputManager!: InputManager;
	private camera!: ArcRotateCamera;
	private canvas;
	private scoreUI: any;
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
	public currentBallScale: Vector3 = new Vector3(1, 1, 1);


	constructor(canvas: any, scene: Scene) {
		this.canvas = canvas;
		this.scene = scene;
		this.inited = false;
		this.pongRoot = this.scene.getTransformNodeByName('pongbrRoot') as TransformNode;
	}

	public async init() {
		console.log("INIT");
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

		//var pipeline = new DefaultRenderingPipeline(
		//	"brPipeline",
		//	true,
		//	this.scene,
		//	[this.camera]
		//);
		//pipeline.samples = 4;
		//pipeline.sharpenEnabled = true;
		this.baseMeshes = createBaseMeshes(this.scene, this.rotatingContainer);
		this.instanceManagers = this.createInstanceManagers(this.baseMeshes);
		// const defaultPipeline = new DefaultRenderingPipeline("gameplayPipeline", true, this.scene, [this.camera]);
		//
		// defaultPipeline.bloomEnabled = true;
		// defaultPipeline.bloomThreshold = 0.8; // Only very bright objects (balls)
		// defaultPipeline.bloomWeight = 0.25; // Subtle - won't overwhelm
		// defaultPipeline.bloomKernel = 32; // Tight glow, not spreading
		// defaultPipeline.bloomScale = 0.5;
		//
		// defaultPipeline.imageProcessingEnabled = true;
		// defaultPipeline.imageProcessing.contrast = 1.05; // Very slight contrast boost
		// defaultPipeline.imageProcessing.exposure = 0.9;

		// const radian = 2 * Math.PI;
		//
		// let points: Vector2[] = [];
		// for (let k = 128; k >= 0; --k) {
		// 	let point = new Vector2(Math.cos(radian * k / 128) * 202, Math.sin(radian * k / 128) * 202);
		// 	points.push(point);
		// }
		// for (let k = 0; k <= 128; ++k) {
		// 	let point = new Vector2(Math.cos(radian * k / 128) * 203, Math.sin(radian * k / 128) * 203);
		// 	points.push(point);
		// }
		// const builder = new PolygonMeshBuilder("brick", points, this.scene, earcut);
		// const mesh = builder.build(true, 1.);
		// mesh.parent = this.rotatingContainer;
		// mesh.position.y += 0.45;
		const statue = this.scene.getMeshByName('__root__') as Mesh;
		console.log("Statue type:", statue?.getClassName());
		statue.parent = this.pongRoot;
		statue.rotationQuaternion = null;
		statue.position.set(-650, 400, 0);
		statue.rotation.set(0, 0, 0);
		statue.scaling.setAll(70);
		// createSkybox(this.scene);
		// createSimpleTextureSkybox(this.scene, "/assets/galaxy.jpg");
		// const spaceSkybox = createCustomizableSpaceSkybox(this.scene, {
		// 	brightness: 0.003,
		// 	speed: 0.001,
		// 	rotationSpeed: 0.0000001
		// });
		// createHighQualityProceduralSkybox(this.scene);
		createBlackHoleBackdrop(this.scene, statue.position, this.pongRoot);
		this.spaceSkybox = new SpaceSkybox(this.scene);
		this.spaceSkybox.applyPreset('Horror');

		this.inputManager = new InputManager();
		localPaddleId = 0;
		this.initECS(this.instanceManagers, this.rotatingContainer);

		this.stateManager = new StateManager(this.ecs);
		// this.baseMeshes.portal.material.setFloat("time", performance.now() * 0.001);
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
			this.scoreUI,
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
				//const ballComponent = entity.getComponent(BallComponent)!;
				//const transform = entity.getComponent(TransformComponent);
				//
				//ballComponent.position.set(0, 0.5, 0);
				//ballComponent.velocity.set(0, 0, 0);
				//
				//if (transform) {
				//	transform.baseScale = new Vector3(1, 1, 1);
				//	transform.enable();
				//}
			}
		});

		this.spaceSkybox.onGameLoad();
		this.paddleBundles = createGameTemplate(this.ecs, 100, this.pongRoot);
		this.baseMeshes.paddle.material.setUniform("playerCount", 100);

		this.currentBallScale = new Vector3(1, 1, 1);

		this.networkingSystem.forceIndexRebuild();

		console.log("start");
		this.inputManager.enable();
		this.pongRoot.setEnabled(true);
		this.stateManager.setter(true);
		this.stateManager.update();

		// this.scene.onBeforeRenderObservable.add(() => {
		// 	this.baseMeshes.portal.material.setFloat("time", performance.now() * 0.001);
		// });

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
			// portal: new ThinInstanceManager(baseMeshes.portal, 4, 50, 100),
			pillar: new ThinInstanceManager(baseMeshes.pillar, 200, 50, 100),
			goal: new ThinInstanceManager(baseMeshes.goal, 100, 50, 100),
		}
	}

	private initECS(instanceManagers: any, pongRoot: TransformNode) {
		this.ecs = new ECSManager();
		this.ecs.addSystem(new MovementSystem());
		this.ecs.addSystem(new AnimationSystem());
		this.thinInstanceSystem = new ThinInstanceSystem(
			instanceManagers.ball,
			instanceManagers.paddle,
			instanceManagers.wall,
			// instanceManagers.portal,
			instanceManagers.goal,
			instanceManagers.pillar,
			this.camera
		);
		this.ecs.addSystem(this.thinInstanceSystem);
		this.paddleBundles = createGameTemplate(this.ecs, 100, pongRoot);
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

		const cfg = { arenaRadius: 100, wallWidth: 1, paddleHeight: 1, paddleDepth: 1, goalDepth: 1 };
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

		this.paddleBundles = createGameTemplate(this.ecs, nextCount, this.rotatingContainer);

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
