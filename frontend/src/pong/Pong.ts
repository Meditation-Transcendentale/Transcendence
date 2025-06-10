import { Scene } from "@babylonjs/core/scene";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { GlowLayer } from "@babylonjs/core/Layers/glowLayer";


import { ECSManager } from "./ecs/ECSManager.js";
import { StateManager } from "./state/StateManager.js";
import { MovementSystem } from "./systems/MovementSystem.js";
import { InputSystem } from "./systems/InputSystem.js";
import { NetworkingSystem } from "./systems/NetworkingSystem.js";
import { ThinInstanceSystem } from "./systems/ThinInstanceSystem.js";
import { WebSocketManager } from "./network/WebSocketManager.js";
import { InputManager } from "./input/InputManager.js";
import { ThinInstanceManager } from "./rendering/ThinInstanceManager.js";
import { getOrCreateUUID } from "./utils/getUUID.js";
import { createGameTemplate, GameTemplateConfig } from "./templates/GameTemplate.js";
import { VisualEffectSystem } from "./systems/VisualEffectSystem.js";
import { UISystem } from "./systems/UISystem.js";
import { gameScoreInterface } from "./utils/displayGameInfo.js";
import { createCamera, createArenaMesh, createBallMesh, createPaddleMesh, createWallMesh } from "./utils/initializeGame.js";
import { decodeServerMessage, encodeClientMessage } from './utils/proto/helper.js';
import type { userinterface } from './utils/proto/message.js';

const API_BASE = `http://${window.location.hostname}:4000`;
export const global = {
	endUI: null as any
}
export let localPaddleId: any = null;
let engine: any;
let resizeTimeout: NodeJS.Timeout;
export class Pong {
	private engine!: Engine;
	private scene!: Scene;
	private ecs!: ECSManager;
	public stateManager!: StateManager;
	private wsManager!: WebSocketManager;
	private inputManager!: InputManager;
	private camera!: ArcRotateCamera;
	private gameId;
	private canvas;
	private scoreUI: any;
	private baseMeshes: any;
	private instanceManagers: any;
	private glowLayer: any;
	private uuid!: string;

	constructor(canvas: any, gameId: any) {
		this.canvas = canvas;
		this.gameId = gameId;
	}

	async start() {
		console.log("start");
		this.engine = new Engine(this.canvas, true);
		engine = this.engine;

		this.scene = new Scene(this.engine);
		const config = {
			numberOfBalls: 1,
			arenaSizeX: 30,
			arenaSizeZ: 20,
			wallWidth: 1
		};

		this.glowLayer = new GlowLayer("glow", this.scene);
		this.glowLayer.intensity = 0.3;
		this.camera = createCamera(this.scene, this.canvas);

		this.baseMeshes = this.createBaseMeshes(config);
		this.glowLayer.addIncludedOnlyMesh(this.baseMeshes.wall);
		this.glowLayer.excludeMeshes = true;
		this.instanceManagers = this.createInstanceManagers(this.baseMeshes);

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

	private createInstanceManagers(baseMeshes: any) {
		return {
			ball: new ThinInstanceManager(baseMeshes.ball, 1, 50, 100),
			paddle: new ThinInstanceManager(baseMeshes.paddle, 2, 50, 100),
			wall: new ThinInstanceManager(baseMeshes.wall, 4, 50, 100)
		}
	}

	private initECS(config: GameTemplateConfig, instanceManagers: any, uuid: string) {
		this.ecs = new ECSManager();
		this.ecs.addSystem(new MovementSystem());
		this.ecs.addSystem(new InputSystem(this.inputManager, this.wsManager));
		this.ecs.addSystem(new NetworkingSystem(this.wsManager, uuid, this.scoreUI));
		this.ecs.addSystem(new ThinInstanceSystem(
			instanceManagers.ball,
			instanceManagers.paddle,
			instanceManagers.wall,
			this.camera
		));
		this.ecs.addSystem(new VisualEffectSystem(this.scene));
		//this.ecs.addSystem(new UISystem());

		createGameTemplate(this.ecs, config, localPaddleId);
	}

	private createBaseMeshes(config: GameTemplateConfig) {
		return {
			arena: createArenaMesh(this.scene, config),
			ball: createBallMesh(this.scene, config),
			paddle: createPaddleMesh(this.scene, config),
			wall: createWallMesh(this.scene, config)
		}
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
	dispose() {
		this.baseMeshes.arena.material.dispose();
		this.baseMeshes.arena.dispose();
		this.baseMeshes.ball.material.dispose();
		this.baseMeshes.ball.dispose();
		this.baseMeshes.paddle.dispose();
		this.baseMeshes.wall.material.dispose();
		this.baseMeshes.wall.dispose();
		this.camera.dispose();
		this.engine.clear(new Color4(1, 1, 1, 1), true, true);
		this.engine.stopRenderLoop();
		if (this.wsManager?.socket) {
			this.wsManager.socket.close();
		}
		this.scene?.dispose();
		this.engine?.dispose();
		global.endUI?.dispose();
		if (this.scoreUI?.dispose) {
			this.scoreUI.dispose();
		} else if (this.scoreUI?.parentNode) {
			this.scoreUI.parentNode.removeChild(this.scoreUI);
		}
		clearTimeout(resizeTimeout);
		this.engine.dispose();
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
