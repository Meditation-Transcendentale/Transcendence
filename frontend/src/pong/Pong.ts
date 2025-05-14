import { Engine, Scene, Color4, ArcRotateCamera, GlowLayer } from "@babylonjs/core";
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
import { DebugVisualizer } from "./debug/DebugVisualizer.js";
import { VisualEffectSystem } from "./systems/VisualEffectSystem.js";
import { UISystem } from "./systems/UISystem.js";
import { gameScoreInterface } from "./utils/displayGameInfo.js";
import { createCamera, createArenaMesh, createBallMesh, createPaddleMesh, createWallMesh } from "./utils/initializeGame.js";
import { Inspector } from '@babylonjs/inspector';


const API_BASE = "http://10.19.225.59:4000";
//const API_BASE = `http://${window.location.hostname}:4000`;
export const global = {
	endUI: null as any
}
export let localPaddleId: any = null;
let engine: any;
let resizeTimeout: number;
export class Pong {
	private engine!: Engine;
	private scene!: Scene;
	private ecs!: ECSManager;
	public stateManager!: StateManager;
	private wsManager!: WebSocketManager;
	private inputManager!: InputManager;
	private camera!: ArcRotateCamera;
	private debugVisualizer!: DebugVisualizer;
	private gameId;
	private canvas;
	private paddleId: any;
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
		// Inspector.Show(this.scene, {});

		this.glowLayer = new GlowLayer("glow", this.scene);
		this.glowLayer.intensity = 0.3;
		this.camera = createCamera(this.scene, this.canvas);

		this.baseMeshes = this.createBaseMeshes(config);
		this.glowLayer.addIncludedOnlyMesh(this.baseMeshes.wall);
		this.glowLayer.excludeMeshes = true;
		this.instanceManagers = this.createInstanceManagers(this.baseMeshes);

		this.uuid = await getOrCreateUUID();
		const wsUrl = `ws://10.19.225.59:5004?uuid=${encodeURIComponent(this.uuid)}&gameId=${encodeURIComponent(this.gameId)}`;
		//const wsUrl = `ws://localhost:3000?uuid=${encodeURIComponent(uuid)}&gameId=${encodeURIComponent(this.gameId)}`;
		this.wsManager = new WebSocketManager(wsUrl);
		this.inputManager = new InputManager();

		// localPaddleId = await this.waitForWelcome();
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
		this.ecs.addSystem(new UISystem(this.scene));

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
				let data: any;
				if (typeof event.data === "string") {
					try {
						data = JSON.parse(event.data);
					} catch {
						return;
					}
				} else {
					return;
				}

				if (data.type === "welcome") {
					console.log("Got welcome (session):", data);
					socket.send(JSON.stringify({
						type: "registerGame",
						data: { gameId: this.gameId, uuid: this.uuid }
					}));
				}

				else if (data.type === "registered") {
					console.log("Registered into game:", data);
					this.paddleId = data.paddleId;
					socket.removeEventListener("message", listener);
					clearTimeout(timeout);
					resolve(data.paddleId);
				}
			}

			socket.addEventListener("message", listener);

			// const timeout = setTimeout(() => {
			// 	this.wsManager.socket.removeEventListener("message", listener);
			// 	reject(new Error("Timed out waiting for welcome"));
			// }, 5000)

			// setTimeout(() => reject(new Error("Timed out waiting for registration")), 5000);
		});
	}


	waitForWelcome() {
		return new Promise((resolve) => {
			this.wsManager.socket.addEventListener("message", (event) => {
				let data;
				if (typeof event.data === "string") {
					try {
						data = JSON.parse(event.data);
					} catch (e) {
						console.error("Error parsing JSON in waitForWelcome:", e);
						return;
					}
				} else {
					console.warn("Received non-string message in waitForWelcome; ignoring.");
					return;
				}

				if (data.type === "welcome") {
					console.log("Received welcome:", data);
					this.paddleId = data.paddleId;

					this.wsManager.socket.send(JSON.stringify({
						type: "registerGame",
						data: { gameId: this.gameId }
					}));

					resolve(data.paddleId);
				}
			}, { once: true });
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
			// this.wsManager.socket.removeEventListener('message', this.wsManager.socketListener);
			this.wsManager.socket.close();
		}
		// this.scene.onBeforeRenderObservable.clear();
		// this.scene.onBPointerObservable.clear();
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



//window.addEventListener("DOMContentLoaded", () => {
//	const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement | null;
//	const createBtn = document.getElementById("createBtn") as HTMLButtonElement | null;
//	const launchBtn = document.getElementById("launchBtn") as HTMLButtonElement | null;
//	const connectBtn = document.getElementById("connectBtn") as HTMLButtonElement | null;
//	const stopBtn = document.getElementById("stopBtn") as HTMLButtonElement | null;
//	const quitBtn = document.getElementById("quitBtn") as HTMLButtonElement | null;
//	const gameIdInput = document.getElementById("gameIdInput") as HTMLInputElement | null;
//	const statusBadge = document.getElementById("statusBadge") as HTMLElement | null;
//
//	if (!canvas || !createBtn || !launchBtn || !connectBtn || !stopBtn || !quitBtn || !gameIdInput || !statusBadge) {
//		throw new Error("One or more required DOM elements not found");
//	}
//	// if (canvas.style.filter == "")
//	// 	canvas.style.filter = "blur(5px)";
//	let gameId = "";
//	let gameInstance: any = null;
//
//	function setStatus(status: string, color: string = "black") {
//		statusBadge!.textContent = status;
//		statusBadge!.style.color = color;
//	}
//
//	function updateButtons() {
//		const value = gameIdInput!.value.trim();
//		const valid = value.length > 0;
//		launchBtn!.disabled = !valid;
//		connectBtn!.disabled = !valid;
//		stopBtn!.disabled = !valid;
//		quitBtn!.disabled = !valid;
//
//	}
//
//	gameIdInput.addEventListener("input", updateButtons);
//
//	createBtn.onclick = async () => {
//		const res = await fetch(`${API_BASE}/match`, {
//			method: "POST",
//			headers: { "Content-Type": "application/json" },
//			body: JSON.stringify({ mode: "pong" })
//		});
//
//		if (!res.ok) {
//			const text = await res.text();
//			console.error("Failed to create game:", res.status, text);
//			setStatus("Create Failed", "red");
//			return;
//		}
//
//		let data;
//		try {
//			data = await res.json();
//		} catch (err) {
//			console.error("Failed to parse JSON response:", err);
//			setStatus("Invalid JSON", "red");
//			return;
//		}
//
//		gameId = data.gameId;
//		gameIdInput.value = gameId;
//		updateButtons();
//		console.log("Game created:", gameId);
//		setStatus("Created", "orange");
//	};
//
//	launchBtn.onclick = async () => {
//		const id = gameIdInput.value.trim();
//		if (!id) return;
//		gameId = id;
//		await fetch(`${API_BASE}/match/${gameId}/launch`, { method: "POST" });
//		console.log("Game launched:", gameId);
//		setStatus("Launched", "green");
//	};
//
//	connectBtn.onclick = () => {
//		const id = gameIdInput.value.trim();
//		if (!id) return;
//		gameId = id;
//		gameInstance = new Game(canvas, gameId);
//		gameInstance.start();
//		setStatus("Connected", "blue");
//	};
//
//	stopBtn.onclick = async () => {
//		const id = gameIdInput.value.trim();
//		if (!id) return;
//		gameId = id;
//		await fetch(`${API_BASE}/match/${gameId}/end`, { method: "POST" });
//		console.log("Game stopped:", gameId);
//		if (gameInstance?.engine) {
//			gameInstance.engine.stopRenderLoop();
//		}
//		setStatus("Stopped", "gray");
//	};
//
//	quitBtn.onclick = async () => {
//		const id = gameIdInput.value.trim();
//		if (!id || !gameInstance) return;
//		gameInstance.stateManager.setter(false);
//		gameInstance.dispose();
//		gameInstance = null;
//		console.log("QUIT");
//		setStatus("Quit", "black");
//	}
//
//	setStatus("Idle", "black");
//	updateButtons();
//});
