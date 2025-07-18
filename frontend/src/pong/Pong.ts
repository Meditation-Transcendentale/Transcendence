
import { ArcRotateCamera, Color4, Engine, Scene, TransformNode, Inspector } from "@babylonImport";
import { ECSManager } from "./ecs/ECSManager.js";
import { StateManager } from "./state/StateManager.js";
import { MovementSystem } from "./systems/MovementSystem.js";
import { InputSystem } from "./systems/InputSystem.js";
import { NetworkingSystem } from "./systems/NetworkingSystem.js";
import { ThinInstanceSystem } from "./systems/ThinInstanceSystem.js";
import { WebSocketManager } from "./network/WebSocketManager.js";
import { InputManager } from "./input/InputManager.js";
import { getOrCreateUUID } from "./utils/getUUID.js";
import { createGameTemplate, GameTemplateConfig } from "./templates/GameTemplate.js";
import { VisualEffectSystem } from "./systems/VisualEffectSystem.js";
import { UISystem } from "./systems/UISystem.js";
import { createCamera, createBaseMeshes, createInstanceManagers } from "./utils/initGame.js";
import { decodeServerMessage, encodeClientMessage } from './utils/proto/helper.js';
import Router from "../spa/Router";
import type { userinterface } from './utils/proto/message.js';

const API_BASE = `http://${window.location.hostname}:4000`;
export let localPaddleId: any = null;
let engine: any;
let resizeTimeout: NodeJS.Timeout;

export class Pong {
	private engine!: Engine;
	private scene: Scene;
	private cam!: ArcRotateCamera;

	private ecs!: ECSManager;
	public stateManager!: StateManager;
	private wsManager!: WebSocketManager;
	private inputManager!: InputManager;

	private visualEffectSystem!: VisualEffectSystem;
	private uiSystem!: UISystem;

	private uuid!: string;
	private baseMeshes: any;
	private instanceManagers: any;
	private scoreUI: any;

	private canvas;
	private gameId;
	private gameMode: string;
	private pongRoot!: TransformNode;
	private inited: boolean;
	private networkingSystem!: NetworkingSystem;
	private inputSystem!: InputSystem;

	constructor(canvas: any, gameId: any, gameMode: any, scene: Scene) {
		this.canvas = canvas;
		this.scene = scene;
		this.gameId = gameId;
		this.gameMode = gameMode;
		this.engine = this.scene.getEngine() as Engine;
		this.inited = false;
	}

	public async init() {
		const config = {
			numberOfBalls: 1,
			arenaSizeX: 30,
			arenaSizeZ: 20,
			wallWidth: 1
		};

		this.pongRoot = new TransformNode("pongRoot", this.scene);
		this.pongRoot.position.set(-2200, -3500, -3500);
		this.cam = this.scene.getCameraByName('pong') as ArcRotateCamera;
		this.cam.parent = this.pongRoot;
		this.cam.minZ = 0.2;
		this.baseMeshes = createBaseMeshes(this.scene, config, this.pongRoot);
		this.instanceManagers = createInstanceManagers(this.baseMeshes);
		this.uuid = getOrCreateUUID();

		const wsUrl = `ws://${window.location.hostname}:5004?uuid=${encodeURIComponent(this.uuid)}&gameId=${encodeURIComponent(this.gameId)}`;
		this.wsManager = new WebSocketManager(wsUrl);
		this.inputManager = new InputManager();

		localPaddleId = await this.waitForRegistration();
		//this.camera = createCamera(this.scene, this.canvas, localPaddleId, this.gameMode);
		this.initECS(config, this.instanceManagers, this.uuid);
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
		}
		console.log("UU", uuid)
		const wsUrl = `ws://${window.location.hostname}:5004?` +
			`uuid=${uuid.toString()}&` +
			`gameId=${encodeURIComponent(gameId)}`;
		this.wsManager = new WebSocketManager(wsUrl);

		localPaddleId = 0;

		// 4) Plug networking into ECS
		this.inputSystem = new InputSystem(this.inputManager, this.wsManager);
		this.ecs.addSystem(this.inputSystem);
		this.networkingSystem = new NetworkingSystem(
			this.wsManager,
			this.uuid
		);
		this.ecs.addSystem(this.networkingSystem);
		console.log("start");
		//this.engine = new Engine(this.canvas, true);
		//engine = this.engine;
		this.pongRoot.setEnabled(true);
		// this.stateManager.set_ecs(this.ecs);
		this.stateManager.setter(true);
		this.stateManager.update();

		//this.engine.runRenderLoop(() => {
		//	this.scene.render();
		//this.scene.onBeforeRenderObservable.add(() => {
		//	// called _before_ every frame is drawn
		//	this.baseMeshes.portal.material.setFloat("time", performance.now() * 0.001);
		//});
		//	//this.baseMeshes.portal.material.enableResolutionUniform();
		//});

	}
	public stop(): void {
		//if (this.engine) {
		//	this.engine.stopRenderLoop();
		//}

		//if (this.scene) {
		//  this.scene.detachControl();
		//}

		this.pongRoot.setEnabled(false);
		this.stateManager.setter(false);

		console.log("render loop stopped and game paused");
	}



	private initECS(config: GameTemplateConfig, instanceManagers: any, uuid: string) {
		this.ecs = new ECSManager();
		this.ecs.addSystem(new InputSystem(this.inputManager, this.wsManager));
		this.ecs.addSystem(new ThinInstanceSystem(
			instanceManagers.ball,
			instanceManagers.paddle,
			instanceManagers.wall,
			this.cam
		));
		this.ecs.addSystem(new MovementSystem());
		this.visualEffectSystem = new VisualEffectSystem(this.scene);
		this.ecs.addSystem(this.visualEffectSystem);
		this.uiSystem = new UISystem(this);
		this.scoreUI = this.uiSystem.scoreUI;
		this.ecs.addSystem(this.uiSystem);
		this.ecs.addSystem(new NetworkingSystem(this.wsManager, uuid));

		createGameTemplate(this.ecs, config, localPaddleId, this.gameMode);
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

	dispose() {
		const { arena, ball, paddle, wall } = this.baseMeshes;
		this.stateManager.setter(false);

		[arena, ball, wall, paddle].forEach(mesh => {
			mesh.material?.dispose?.();
			mesh.dispose?.();
		});
		this.cam.dispose();
		this.engine.clear(new Color4(1, 1, 1, 1), true, true);
		this.engine.stopRenderLoop();

		this.wsManager?.socket?.close();
		this.scene?.dispose();
		this.engine?.dispose();

		this.visualEffectSystem?.dispose();

		if (this.scoreUI?.dispose) {
			this.scoreUI.dispose();
		} else if (this.scoreUI?.parentNode) {
			this.scoreUI.parentNode.removeChild(this.scoreUI);
		}
		clearTimeout(resizeTimeout);
		this.engine.dispose();
		Router.nav(`/play`, false, false);
	}

	public static INIT() {
		window.addEventListener("resize", () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				if (engine)
					engine.resize();
			}, 100); // délai pour limiter les appels trop fréquents
		});
	}
}
