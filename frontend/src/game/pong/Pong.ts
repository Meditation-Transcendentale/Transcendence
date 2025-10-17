import {
	ArcRotateCamera, Color4, Engine, Scene, TransformNode, FreeCamera,
	Mesh,
} from "../../babylon";
import { ECSManager } from "./ecs/ECSManager.js";
import { StateManager } from "./state/StateManager.js";
import { MovementSystem } from "./systems/MovementSystem.js";
import { InputSystem } from "./systems/InputSystem.js";
import { NetworkingSystem } from "./systems/NetworkingSystem.js";
import { ThinInstanceSystem } from "./systems/ThinInstanceSystem.js";
import { WebSocketManager } from "./network/WebSocketManager.js";
import { InputManager } from "./input/InputManager.js";
import { getOrCreateUUID } from "./utils/getUUID.js";
import { createGameTemplate, GameTemplateConfig, createPlayer, } from "./templates/GameTemplate.js";
import { UISystem } from "./systems/UISystem.js";
import {
	createCamera, createBaseMeshes, createInstanceManagers,
} from "./utils/initGame.js";
import {
	decodeServerMessage, encodeClientMessage,
} from "./utils/proto/helper.js";
import type { userinterface } from "./utils/proto/message.js";
import { BallComponent } from "./components/BallComponent.js";
import { Entity } from "./ecs/Entity.js";
import { Ball } from "../brickbreaker/Ball.js";
import { PaddleComponent } from "./components/PaddleComponent.js";
import GameUI from "../GameUI.js";
import { sceneManager } from "../../scene/SceneManager.js";
import { User } from "../../User.js";
import { getRandomAIName } from "./utils/aiNames.js";

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

	private uuid!: string;
	private baseMeshes!: { arena: Mesh, ball: Mesh, paddle: Mesh, wall: Mesh };
	private instanceManagers: any;
	public gameUI: GameUI;

	private canvas;
	private gameId;
	private gameMode: string;
	private pongRoot!: TransformNode;
	private inited: boolean;
	private networkingSystem!: NetworkingSystem;
	private inputSystem!: InputSystem;

	private config: any;

	constructor(canvas: any, gameId: any, scene: Scene, gameUI: GameUI) {
		this.canvas = canvas;
		this.scene = scene;
		this.gameId = gameId;
		this.gameMode = "";
		this.gameUI = gameUI;
		this.engine = this.scene.getEngine() as Engine;
		this.inited = false;

		this.config = {
			numberOfBalls: 1,
			arenaSizeX: 30,
			arenaSizeZ: 20,
			wallWidth: 1,
		};
	}

	public async init() {
		this.pongRoot = sceneManager.assets.ballRoot;
		this.baseMeshes = createBaseMeshes(this.scene, this.config, this.pongRoot);
		this.instanceManagers = createInstanceManagers(this.baseMeshes);
		this.uuid = getOrCreateUUID();

		this.inputManager = new InputManager();

		this.initECS(this.config, this.instanceManagers, this.uuid);
		this.stateManager = new StateManager(this.ecs);
		this.inited = true;
	}

	public async start(
		gameId: string,
		uuid: string,
		gameMode: string,
		maps: string
	) {
		this.gameMode = gameMode;
		if (this.wsManager) {
			this.wsManager.socket.close();
			this.ecs.removeSystem(this.inputSystem);
			this.ecs.removeSystem(this.networkingSystem);
			const allEntities = this.ecs.getAllEntities();
			allEntities.forEach((entity) => {
				if (entity.hasComponent(PaddleComponent)) {
					this.ecs.removeEntity(entity);
				}
			});
		}
		const wsUrl =
			`wss://${window.location.hostname}:7000/game?` +
			`uuid=${encodeURIComponent(uuid)}&` +
			`gameId=${encodeURIComponent(gameId)}`;
		this.wsManager = new WebSocketManager(wsUrl);

		this.cam = sceneManager.camera;
		this.cam.detachControl();

		if (!this.inited) {
			await this.init();
		}

		this.baseMeshes.wall.setEnabled(true);
		this.baseMeshes.paddle.setEnabled(true);
		this.baseMeshes.arena.setEnabled(true);
		this.baseMeshes.ball.setEnabled(true);
		this.cam.minZ = 0.2;
		if (maps == "monolith") {
			this.pongRoot.position.set(0, 7, 0);
			this.pongRoot.scalingDeterminant = 0.15;
			this.cam.position.set(0, 13, 0);
		} else if (maps == "grass") {
			this.pongRoot.position.set(0, 0, 0);
			this.pongRoot.scalingDeterminant = 2;
			this.cam.position.set(0, 80, 0);
			this.baseMeshes.arena.setEnabled(false);
		} else if (maps == "void") {
			this.pongRoot.position.set(0, 0, 0);
			this.pongRoot.scalingDeterminant = 0.25;
			this.cam.position.set(0, 10, 0);
		}
		localPaddleId = await this.waitForRegistration();

		this.inputSystem = new InputSystem(this.inputManager, this.wsManager);
		this.ecs.addSystem(this.inputSystem);
		this.networkingSystem = new NetworkingSystem(
			this.wsManager,
			this.uuid,
			this.gameMode
		);
		this.ecs.addSystem(this.networkingSystem);

		const isSpectator = localPaddleId === -1;

		createPlayer(
			this.ecs,
			this.config,
			localPaddleId,
			this.gameMode,
			this.gameUI
		);

		if (!isSpectator) {
			this.inputManager.enable();
		}

		this.pongRoot.setEnabled(true);
		this.stateManager.setter(true);
		this.gameUI.updateScoreVersus(0, 0);

		if (this.gameMode === "ai") {
			const aiName = getRandomAIName();
			if (localPaddleId === 0) {
				this.gameUI.setPlayerNames(User.username, aiName);
			} else {
				this.gameUI.setPlayerNames(aiName, User.username);
			}
		} else if (this.gameMode === "online" || this.gameMode === "tournament") {
			if (localPaddleId === 0) {
				this.gameUI.setPlayerNames(User.username, "Opponent");
			} else {
				this.gameUI.setPlayerNames("Opponent", User.username);
			}
		} else if (this.gameMode === "local") {
			this.gameUI.setPlayerNames("Player 1", "Player 2");
		}

		if (!isSpectator) {
			this.gameUI.showInputHints(this.gameMode);
			const readyPayload: userinterface.IClientMessage = { ready: {} };
			const readyBuf = encodeClientMessage(readyPayload);
			this.wsManager.socket.send(readyBuf);
		}

		this.stateManager.update();

	}
	public stop(): void {
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
				lobbyId: this.uuid,
			},
		};

		const buffer = encodeClientMessage(payload);

		this.wsManager.socket.send(buffer);
		this.wsManager.socket.close();
		this.stateManager.setter(false);
		this.cam.parent = null;

		this.baseMeshes.arena.setEnabled(false);
		this.baseMeshes.wall.setEnabled(false);
		this.baseMeshes.paddle.setEnabled(false);

		console.log("render loop stopped and game paused");
	}

	private initECS(
		config: GameTemplateConfig,
		instanceManagers: any,
		uuid: string
	) {
		this.ecs = new ECSManager();
		this.ecs.addSystem(
			new ThinInstanceSystem(
				instanceManagers.ball,
				instanceManagers.paddle,
				instanceManagers.wall,
				this.cam
			)
		);
		this.ecs.addSystem(new MovementSystem());

		createGameTemplate(this.ecs, config);
	}

	private waitForRegistration(): Promise<number> {
		return new Promise((resolve, reject) => {
			const socket = this.wsManager.socket;

			const listener = (event: MessageEvent) => {
				if (!(event.data instanceof ArrayBuffer)) {
					console.warn("Non-binary message received, ignoring");
					return;
				}

				let serverMsg: userinterface.ServerMessage;
				try {
					const buf = new Uint8Array(event.data);
					serverMsg = decodeServerMessage(buf);
				} catch (err) {
					console.error("Failed to decode protobuf message:", err);
					return;
				}

				if (serverMsg.welcome?.paddleId != null) {
					const paddleId = serverMsg.welcome.paddleId;

					socket.removeEventListener("message", listener);
					resolve(paddleId);
				}
			};

			socket.addEventListener("message", listener);

			setTimeout(() => {
				socket.removeEventListener("message", listener);
				reject(new Error("Timed out waiting for WelcomeMessage"));
			}, 5000);
		});
	}
}
