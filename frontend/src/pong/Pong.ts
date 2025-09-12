
import { ArcRotateCamera, Color4, Engine, Scene, TransformNode, Inspector, FreeCamera } from "@babylonImport";
import { ECSManager } from "./ecs/ECSManager.js";
import { StateManager } from "./state/StateManager.js";
import { MovementSystem } from "./systems/MovementSystem.js";
import { InputSystem } from "./systems/InputSystem.js";
import { NetworkingSystem } from "./systems/NetworkingSystem.js";
import { ThinInstanceSystem } from "./systems/ThinInstanceSystem.js";
import { WebSocketManager } from "./network/WebSocketManager.js";
import { InputManager } from "./input/InputManager.js";
import { getOrCreateUUID } from "./utils/getUUID.js";
import { createGameTemplate, GameTemplateConfig, createPlayer } from "./templates/GameTemplate.js";
import { VisualEffectSystem } from "./systems/VisualEffectSystem.js";
import { UISystem } from "./systems/UISystem.js";
import { createCamera, createBaseMeshes, createInstanceManagers } from "./utils/initGame.js";
import { decodeServerMessage, encodeClientMessage } from './utils/proto/helper.js';
import Router from "../spa/Router";
import type { userinterface } from './utils/proto/message.js';
import { BallComponent } from "./components/BallComponent.js";
import { Entity } from "./ecs/Entity.js";
import { Ball } from "../brickbreaker/Ball.js";

const API_BASE = `http://${window.location.hostname}:4000`;
export let localPaddleId: any = null;
let engine: any;
let resizeTimeout: NodeJS.Timeout;

export class Pong {
	private engine!: Engine;
	private scene: Scene;
	private cam!: FreeCamera;

	private ecs!: ECSManager;
	public stateManager!: StateManager;
	private wsManager!: WebSocketManager;
	private inputManager!: InputManager;

	private visualEffectSystem!: VisualEffectSystem;
	// private uiSystem!: UISystem;

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

	private config: any;

	constructor(canvas: any, gameId: any, scene: Scene) {
		this.canvas = canvas;
		this.scene = scene;
		this.gameId = gameId;
		this.gameMode = "";
		this.engine = this.scene.getEngine() as Engine;
		this.inited = false;

		this.config = {
			numberOfBalls: 1,
			arenaSizeX: 30,
			arenaSizeZ: 20,
			wallWidth: 1
		};

	}

	public async init() {

		this.pongRoot = new TransformNode("pongRoot", this.scene);
		this.pongRoot.position.set(2000, -3500, -3500);
		this.cam = this.scene.getCameraByName('fieldCamera') as FreeCamera;
		this.baseMeshes = createBaseMeshes(this.scene, this.config, this.pongRoot);
		this.instanceManagers = createInstanceManagers(this.baseMeshes);
		this.uuid = getOrCreateUUID();

		// const wsUrl = `ws://${window.location.hostname}:5004?uuid=${encodeURIComponent(this.uuid)}&gameId=${encodeURIComponent(this.gameId)}`;
		// this.wsManager = new WebSocketManager(wsUrl);
		this.inputManager = new InputManager();

		// localPaddleId = await this.waitForRegistration();
		//this.camera = createCamera(this.scene, this.canvas, localPaddleId, this.gameMode);
		this.initECS(this.config, this.instanceManagers, this.uuid);
		this.stateManager = new StateManager(this.ecs);
		this.inited = true;

	}

	public async start(gameId: string, uuid: string, gameMode: string, maps: string) {
		// const maps = 0;
		this.gameMode = gameMode;
		if (this.wsManager) {
			this.wsManager.socket.close();
			this.ecs.removeSystem(this.inputSystem);
			this.ecs.removeSystem(this.networkingSystem);
			//delete player
			// this.ecs.removeEntityById(7);
			this.ecs.removeEntityById(6);
			this.ecs.removeEntityById(5);
		}
		console.log("UU", uuid)
		const wsUrl = `wss://${window.location.hostname}:7000/game?` +
			`uuid=${encodeURIComponent(uuid)}&` +
			`gameId=${encodeURIComponent(gameId)}`;
		this.wsManager = new WebSocketManager(wsUrl);

		if (!this.inited) {
			await this.init();
		}
		this.cam.parent = this.pongRoot;
		this.cam.minZ = 0.2;
		if (maps == "monolith") {
			this.pongRoot.position.set(0.1, 10, 0);
			this.pongRoot.scalingDeterminant = 0.07;
		} else if (maps == "grass") {
			this.pongRoot.position.set(5, 0, 5);
			this.pongRoot.scalingDeterminant = 0.25;
		} else if (maps == "void") {
			this.pongRoot.position.set(100, 0, 100);
			this.pongRoot.scalingDeterminant = 0.25;
		}
		localPaddleId = await this.waitForRegistration();

		//if (maps == "monolith") {
		//	this.pongRoot.position.set(0.1, 10, 0);
		//	this.pongRoot.scalingDeterminant = 0.07;
		//} else if (maps == "grass") {
		//	this.pongRoot.position.set(5, 0, 5);
		//	this.pongRoot.scalingDeterminant = 0.25;
		//} else if (maps == "void") {
		//	this.pongRoot.position.set(100, 0, 100);
		//	this.pongRoot.scalingDeterminant = 0.25;
		//}

		// if (this.uiSystem) {
		// 	this.uiSystem.resetUI();
		// 	//this.uiSystem.enableUI();
		// }

		// 4) Plug networking into ECS
		this.inputSystem = new InputSystem(this.inputManager, this.wsManager);
		this.ecs.addSystem(this.inputSystem);
		this.networkingSystem = new NetworkingSystem(
			this.wsManager,
			this.uuid
		);
		this.ecs.addSystem(this.networkingSystem);

		//add player
		createPlayer(this.ecs, this.config, localPaddleId, this.gameMode);

		console.log("start");
		//this.engine = new Engine(this.canvas, true);
		//engine = this.engine;
		this.inputManager.enable();
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
		// if (this.uiSystem) {
		// 	this.uiSystem.disableUI();
		// }
		const ballEntity = this.ecs.entitiesWith(BallComponent)[0] as Entity;
		const ballComp = ballEntity.getComponent(BallComponent) as BallComponent;
		ballComp.velocity.x = 0;
		ballComp.velocity.z = 0;
		ballComp.position.x = 0;
		ballComp.position.z = 0;
		this.inputManager.disable();
		const payload: userinterface.IClientMessage = {
			quit: {
				uuid: this.uuid,
				lobbyId: this.uuid
			}
		};

		const buffer = encodeClientMessage(payload);

		this.wsManager.socket.send(buffer);
		this.pongRoot.setEnabled(false);
		this.stateManager.setter(false);
		this.cam.parent = null;


		console.log("render loop stopped and game paused");
	}

	private initECS(config: GameTemplateConfig, instanceManagers: any, uuid: string) {
		this.ecs = new ECSManager();
		this.ecs.addSystem(new ThinInstanceSystem(
			instanceManagers.ball,
			instanceManagers.paddle,
			instanceManagers.wall,
			this.cam
		));
		this.ecs.addSystem(new MovementSystem());
		this.visualEffectSystem = new VisualEffectSystem(this.scene);
		this.ecs.addSystem(this.visualEffectSystem);
		// this.uiSystem = new UISystem(this);
		// this.scoreUI = this.uiSystem.scoreUI;
		// this.ecs.addSystem(this.uiSystem);

		createGameTemplate(this.ecs, config);
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
