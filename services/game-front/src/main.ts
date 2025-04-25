import { Engine, Scene, Vector3, ArcRotateCamera } from "@babylonjs/core";
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
import { gameScoreInterface } from "./utils/displayGameInfo.js";
import { createCamera, createArenaMesh, createBallMesh, createPaddleMesh, createWallMesh } from "./utils/initializeGame.js";

const API_BASE = "http://10.19.225.59:4000";
// const API_BASE = "http://localhost:4000";
export let localPaddleId: any = null;
let engine: any;
class Game {
	private engine!: Engine;
	private scene!: Scene;
	private ecs!: ECSManager;
	private stateManager!: StateManager;
	private wsManager!: WebSocketManager;
	private inputManager!: InputManager;
	private camera!: ArcRotateCamera;
	private debugVisualizer!: DebugVisualizer;
	private gameId;
	private canvas;
	private paddleId: any;
	private scoreUI: any;

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

		// create scene component
		this.scoreUI = gameScoreInterface(0, 0);
		this.camera = createCamera(this.scene, this.canvas);

		const baseMeshes = this.createBaseMeshes(config);
		const instanceManagers = this.createInstanceManagers(baseMeshes);

		const uuid = getOrCreateUUID();
		const wsUrl = `ws://10.19.225.59:3000?uuid=${encodeURIComponent(uuid)}&gameId=${encodeURIComponent(this.gameId)}`;
		// const wsUrl = `ws://localhost:3000?uuid=${encodeURIComponent(uiid)}&gameId=${encodeURIComponent(this.gameId)}`;
		this.wsManager = new WebSocketManager(wsUrl);
		this.inputManager = new InputManager();

		// localPaddleId = await this.waitForWelcome();
		localPaddleId = await this.waitForRegistration();
		this.initECS(config, instanceManagers, uuid);

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
		// this.ecs.addSystem(new VisualEffectSystem(this.scene));

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

			socket.addEventListener("message", (event) => {
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
						data: { gameId: this.gameId }
					}));
				}

				else if (data.type === "registered") {
					console.log("Registered into game:", data);
					this.paddleId = data.paddleId;
					resolve(data.paddleId);
				}
			}, { once: false });

			setTimeout(() => reject(new Error("Timed out waiting for registration")), 5000);
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
}

window.addEventListener("resize", () => {
	engine.resize();
});

window.addEventListener("DOMContentLoaded", () => {
	const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement | null;
	const createBtn = document.getElementById("createBtn") as HTMLButtonElement | null;
	const launchBtn = document.getElementById("launchBtn") as HTMLButtonElement | null;
	const connectBtn = document.getElementById("connectBtn") as HTMLButtonElement | null;
	const stopBtn = document.getElementById("stopBtn") as HTMLButtonElement | null;
	const gameIdInput = document.getElementById("gameIdInput") as HTMLInputElement | null;
	const statusBadge = document.getElementById("statusBadge") as HTMLElement | null;

	if (!canvas || !createBtn || !launchBtn || !connectBtn || !stopBtn || !gameIdInput || !statusBadge) {
		throw new Error("One or more required DOM elements not found");
	}

	let gameId = "";
	let gameInstance: any = null;

	function setStatus(status: string, color: string = "black") {
		statusBadge!.textContent = status;
		statusBadge!.style.color = color;
	}

	function updateButtons() {
		const value = gameIdInput!.value.trim();
		const valid = value.length > 0;
		launchBtn!.disabled = !valid;
		connectBtn!.disabled = !valid;
		stopBtn!.disabled = !valid;
	}

	gameIdInput.addEventListener("input", updateButtons);

	createBtn.onclick = async () => {
		const res = await fetch(`${API_BASE}/match`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ mode: "pong" })
		});

		if (!res.ok) {
			const text = await res.text();
			console.error("Failed to create game:", res.status, text);
			setStatus("Create Failed", "red");
			return;
		}

		let data;
		try {
			data = await res.json();
		} catch (err) {
			console.error("Failed to parse JSON response:", err);
			setStatus("Invalid JSON", "red");
			return;
		}

		gameId = data.gameId;
		gameIdInput.value = gameId;
		updateButtons();
		console.log("Game created:", gameId);
		setStatus("Created", "orange");
	};

	launchBtn.onclick = async () => {
		const id = gameIdInput.value.trim();
		if (!id) return;
		gameId = id;
		await fetch(`${API_BASE}/match/${gameId}/launch`, { method: "POST" });
		console.log("Game launched:", gameId);
		setStatus("Launched", "green");
	};

	connectBtn.onclick = () => {
		const id = gameIdInput.value.trim();
		if (!id) return;
		gameId = id;
		gameInstance = new Game(canvas, gameId);
		gameInstance.start();
		setStatus("Connected", "blue");
	};

	stopBtn.onclick = async () => {
		const id = gameIdInput.value.trim();
		if (!id) return;
		gameId = id;
		await fetch(`${API_BASE}/match/${gameId}/end`, { method: "POST" });
		console.log("Game stopped:", gameId);
		if (gameInstance?.engine) {
			gameInstance.engine.stopRenderLoop();
		}
		setStatus("Stopped", "gray");
	};

	setStatus("Idle", "black");
	updateButtons();
});
