import { Scene } from "@babylonjs/core/scene";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";

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
	private scene!: Scene;
	private camera!: ArcRotateCamera;

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
	private isLocalGame: boolean;

	constructor(canvas: any, gameId: any, gameMode: any) {
		this.canvas = canvas;
		this.gameId = gameId;
		this.isLocalGame = (gameMode === "local");
	}

	async start() {
		this.engine = new Engine(this.canvas, true);
		engine = this.engine;
		this.scene = new Scene(this.engine);
		
		const config = {
			numberOfBalls: 1,
			arenaSizeX: 30,
			arenaSizeZ: 20,
			wallWidth: 1
		};

		this.camera = createCamera(this.scene, this.canvas);

		this.baseMeshes = createBaseMeshes(this.scene, config);
		this.instanceManagers = createInstanceManagers(this.baseMeshes);
		this.uuid = await getOrCreateUUID();

		const wsUrl = `ws://${window.location.hostname}:5004?uuid=${encodeURIComponent(this.uuid)}&gameId=${encodeURIComponent(this.gameId)}`;
		this.wsManager = new WebSocketManager(wsUrl);
		this.inputManager = new InputManager();

		localPaddleId = await this.waitForRegistration();
		this.initECS(config, this.instanceManagers, this.uuid);
		this.stateManager = new StateManager(this.ecs);
		this.stateManager.update();

		this.engine.runRenderLoop(() => {
			this.scene.render();
		});
	}

	private initECS(config: GameTemplateConfig, instanceManagers: any, uuid: string) {
		this.ecs = new ECSManager();
		this.ecs.addSystem(new InputSystem(this.inputManager, this.wsManager));
		this.ecs.addSystem(new ThinInstanceSystem(
			instanceManagers.ball,
			instanceManagers.paddle,
			instanceManagers.wall,
			this.camera
		));
		this.ecs.addSystem(new MovementSystem());
		this.visualEffectSystem = new VisualEffectSystem(this.scene);
		this.ecs.addSystem(this.visualEffectSystem);
		this.uiSystem = new UISystem(this);
		this.scoreUI = this.uiSystem.scoreUI;
		this.ecs.addSystem(this.uiSystem);
		this.ecs.addSystem(new NetworkingSystem(this.wsManager, uuid));
	
		createGameTemplate(this.ecs, config, localPaddleId, this.isLocalGame);
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
		this.camera.dispose();
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
