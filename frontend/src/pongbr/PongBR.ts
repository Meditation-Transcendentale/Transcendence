import { ECSManager } from "./ecs/ECSManager.js";
import { StateManager } from "./state/StateManager.js";
import { MovementSystem } from "./systems/MovementSystem.js";
import { InputSystem } from "./systems/InputSystem.js";
import { NetworkingSystem } from "./systems/NetworkingSystem.js";
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
import { ArcRotateCamera, Color3, Color4, PointLight, Scene, TransformNode, Vector3, Engine, Mesh } from "@babylonImport";
import { BallComponent } from "./components/BallComponent.js";
import { TransformComponent } from "./components/TransformComponent.js";
import { WallComponent } from "./components/WallComponent.js";
import { Entity } from "./ecs/Entity.js";

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
	private inited: boolean;
	private networkingSystem!: NetworkingSystem;
	private inputSystem!: InputSystem;
	private thinInstanceSystem!: ThinInstanceSystem;

	constructor(canvas: any, scene: Scene) {
		this.canvas = canvas;
		this.scene = scene;
		this.inited = false;
	}

	public async init() {
		console.log("INIT");
		this.pongRoot = new TransformNode("pongbrRoot", this.scene);
		this.pongRoot.position.set(-2200, -3500, -3500);
		this.pongRoot.rotation.z -= 30.9000;
		this.pongRoot.scaling.set(1, 1, 1);
		this.camera = this.scene.getCameraByName('br') as ArcRotateCamera;
		this.camera.parent = this.pongRoot;
		this.camera.minZ = 0.2;
		this.baseMeshes = createBaseMeshes(this.scene, this.pongRoot);
		this.instanceManagers = this.createInstanceManagers(this.baseMeshes);

		const statue = this.scene.getMeshByName('Version NoSmile.006') as Mesh;
		statue.parent = this.pongRoot;
		statue.position.set(-750, -350, 0);
		statue.rotation.set(0, Math.PI, 0);
		statue.scaling.setAll(70);



		this.inputManager = new InputManager();

		localPaddleId = 0;
		this.initECS(this.instanceManagers, this.pongRoot);

		this.stateManager = new StateManager(this.ecs);
		this.baseMeshes.portal.material.setFloat("time", performance.now() * 0.001);
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
		const wsUrl = `ws://${window.location.hostname}:5004?` +
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
		console.log("start");
		this.pongRoot.setEnabled(true);
		this.stateManager.setter(true);
		this.stateManager.update();
		this.camera.attachControl(this.canvas);

		this.scene.onBeforeRenderObservable.add(() => {
			this.baseMeshes.portal.material.setFloat("time", performance.now() * 0.001);
		});

	}
	public stop(): void {

		this.camera.detachControl();
		this.pongRoot.setEnabled(false);
		this.stateManager.setter(false);

		console.log("game paused");
	}

	private createInstanceManagers(baseMeshes: any) {
		return {
			ball: new ThinInstanceManager(baseMeshes.ball, 200, 50, 100),
			paddle: new ThinInstanceManager(baseMeshes.paddle, 100, 50, 100),
			wall: new ThinInstanceManager(baseMeshes.wall, 100, 50, 100),
			portal: new ThinInstanceManager(baseMeshes.portal, 4, 50, 100),
			pillar: new ThinInstanceManager(baseMeshes.pillar, /* capacity */ 200, 50, 100),
			goal: new ThinInstanceManager(baseMeshes.goal,   /* capacity */ 100, 50, 100),
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
			instanceManagers.portal,
			instanceManagers.goal,
			instanceManagers.pillar,
			this.camera
		);
		this.ecs.addSystem(this.thinInstanceSystem);
		// this.ecs.addSystem(new VisualEffectSystem(this.scene));
		//this.ecs.addSystem(new UISystem());
		this.paddleBundles = createGameTemplate(this.ecs, 100, pongRoot);
	}

	public transitionToRound(nextCount: number, entities: Entity[]) {
		const cfg = { arenaRadius: 100, wallWidth: 1, paddleHeight: 1, paddleDepth: 1, goalDepth: 1 };
		this.baseMeshes.paddle.material.setUniform("playerCount", nextCount);
		const targets: PaddleBundle[] = buildPaddles(this.ecs, nextCount, this.pongRoot);

		const survivors = this.paddleBundles.filter(b => b.sliceIndex < nextCount);
		const eliminated = this.paddleBundles.filter(b => b.sliceIndex >= nextCount);

		for (const entity of entities) {
			if (
				!entity.hasComponent(BallComponent) ||
				!entity.hasComponent(TransformComponent)
			) {
				continue;
			}
			const transform = entity.getComponent(TransformComponent)!;
			transform.baseScale = new Vector3(25 / nextCount, 25 / nextCount, 25 / nextCount);

		}


		eliminated.forEach(b => {
			this.ecs.removeEntity(b.paddle);
			this.ecs.removeEntity(b.goal);
			this.ecs.removeEntity(b.deathWall);
			this.ecs.removeEntity(b.pillar);
		});
		survivors.forEach(b => {
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
		this.paddleBundles = targets;
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

				// Check for the welcome case
				if (serverMsg.welcome?.paddleId != null) {
					const paddleId = serverMsg.welcome.paddleId;
					console.log('Received WelcomeMessage:', paddleId);

					// Create and send a “ready” ClientMessage via helper
					const readyPayload: userinterface.IClientMessage = { ready: {} };
					const readyBuf = encodeClientMessage(readyPayload);
					socket.send(readyBuf);

					socket.removeEventListener('message', listener);
					resolve(paddleId);
				}
			};

			socket.addEventListener('message', listener);

			// Timeout guard
			setTimeout(() => {
				socket.removeEventListener('message', listener);
				reject(new Error('Timed out waiting for WelcomeMessage'));
			}, 5000);
		});
	}

}
