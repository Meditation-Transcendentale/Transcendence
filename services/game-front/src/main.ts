import { Engine, Scene, Vector3, ArcRotateCamera, HemisphericLight, MeshBuilder, StandardMaterial, Texture, Mesh } from "@babylonjs/core";
import { AdvancedDynamicTexture, TextBlock } from "@babylonjs/gui";
import { ECSManager } from "./ecs/ECSManager.js";
import { StateManager } from "./state/StateManager.js";
import { MovementSystem } from "./systems/MovementSystem.js";
import { InputSystem } from "./systems/InputSystem.js";
import { NetworkingSystem } from "./systems/NetworkingSystem.js";
import { ThinInstanceSystem } from "./systems/ThinInstanceSystem.js";
import { WebSocketManager } from "./network/WebSocketManager.js";
import { InputManager } from "./input/InputManager.js";
import { ThinInstanceManager } from "./rendering/ThinInstanceManager.js";
import { getOrCreateUIID } from "./utils/getUIID.js";
import { createGameTemplate, GameTemplateConfig } from "./templates/GameTemplate.js";
import { DebugVisualizer } from "./debug/DebugVisualizer.js";

const API_BASE = "http://10.19.225.151:4000";
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

	constructor(canvas: any, gameId: any) {
		this.canvas = canvas;
		this.gameId = gameId;
	}

	async start() {
		console.log("start");
		this.engine = new Engine(this.canvas, true);
		engine = this.engine;
		this.scene = new Scene(this.engine);
		// localPaddleId = await this.waitForWelcome();
		localPaddleId = 0;
		const config = {
			numberOfBalls: 1,
			arenaSizeX: 30,
			arenaSizeZ: 20,
			wallWidth: 1
		};

		const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

		const scoreTitle = new TextBlock();
		scoreTitle.text = "Score";
		scoreTitle.color = "white";
		scoreTitle.fontSize = 34;
		scoreTitle.left = "0px";
		scoreTitle.top = "-300px";
		advancedTexture.addControl(scoreTitle);

		const scorePipe = new TextBlock();
		scorePipe.text = "|";
		scorePipe.color = "white";
		scorePipe.fontSize = 24;
		scorePipe.left = "0px";
		scorePipe.top = "-250px";
		advancedTexture.addControl(scorePipe);

		let scoreP1 = 0;
		let scoreP2 = 0;

		const score = new TextBlock();
		score.text = scoreP1 + " | " + scoreP2;
		score.color = "white";
		score.fontSize = 24;
		score.left = "0px";
		score.top = "-250px";
		advancedTexture.addControl(score);

		this.camera = new ArcRotateCamera("camera", Math.PI / 2, 0, 60, Vector3.Zero(), this.scene);
		this.camera.attachControl(this.canvas, true);
		new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);

		const arenaMesh = MeshBuilder.CreateBox("arenaBox", { width: config.arenaSizeX, height: config.arenaSizeZ, depth: 1 }, this.scene);
		const material = new StandardMaterial("arenaMaterial", this.scene);
		material.diffuseColor.set(0, 0, 0);
		arenaMesh.rotation.x = Math.PI / 2;
		arenaMesh.position.y = -0.5;
		arenaMesh.material = material;

		const ballBaseMesh = MeshBuilder.CreateSphere("ballBase", { diameter: 1 }, this.scene);

		const ballMaterial = new StandardMaterial("ballMaterial", this.scene);
		//ballMaterial.diffuseColor.set(1, 0, 0);
		ballMaterial.diffuseTexture = new Texture("moi.png", this.scene);
		ballBaseMesh.setEnabled(true);
		ballBaseMesh.setPivotPoint(Vector3.Zero());
		ballBaseMesh.material = ballMaterial;

		const paddleBaseMesh = MeshBuilder.CreateBox("paddleBase", { width: 3, height: 0.4, depth: 0.4 }, this.scene);
		paddleBaseMesh.setEnabled(true);
		paddleBaseMesh.setPivotPoint(Vector3.Zero());

		const wallBaseMesh = MeshBuilder.CreateBox("wallBase", { width: config.wallWidth, height: 1, depth: 20 }, this.scene);
		const wallMaterial = new StandardMaterial("arenaMaterial", this.scene);
		wallMaterial.diffuseColor.set(1, 0, 0);
		wallBaseMesh.material = wallMaterial;
		wallBaseMesh.setEnabled(true);
		wallBaseMesh.setPivotPoint(Vector3.Zero());

		const ballInstanceManager = new ThinInstanceManager(ballBaseMesh, 1000, 50, 100);
		const paddleInstanceManager = new ThinInstanceManager(paddleBaseMesh, 100, 50, 100);
		const wallInstanceManager = new ThinInstanceManager(wallBaseMesh, 100, 50, 100);

		this.ecs = new ECSManager();
		const uiid = getOrCreateUIID();
		const wsUrl = `ws://10.19.225.151:3000?uuid=${encodeURIComponent(uiid)}&gameId=${encodeURIComponent(this.gameId)}`;
		// const wsUrl = `ws://localhost:3000?uuid=${encodeURIComponent(uiid)}&gameId=${encodeURIComponent(this.gameId)}`;
		this.wsManager = new WebSocketManager(wsUrl);
		this.inputManager = new InputManager();

		this.ecs.addSystem(new MovementSystem());
		this.ecs.addSystem(new InputSystem(this.inputManager, this.wsManager));
		this.ecs.addSystem(new NetworkingSystem(this.wsManager, uiid));
		this.ecs.addSystem(new ThinInstanceSystem(
			ballInstanceManager,
			paddleInstanceManager,
			wallInstanceManager,
			this.camera
		));

		localPaddleId = await this.waitForWelcome();
		createGameTemplate(this.ecs, config, localPaddleId);
		this.stateManager = new StateManager(this.ecs);
		this.stateManager.update();

		this.engine.runRenderLoop(() => {
			this.scene.render();
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
	// waitForWelcome() {
	// 	return new Promise((resolve) => {
	// 		this.wsManager.socket.addEventListener("message", (event) => {
	// 			const data = JSON.parse(event.data);
	// 			if (data.type === "welcome") {
	// 				console.log("Received welcome:", data);
	// 				this.paddleId = data.paddleId;
	//
	// 				this.wsManager.socket.send(JSON.stringify({
	// 					type: "registerGame",
	// 					data: { gameId: this.gameId }
	// 				}));
	// 				resolve(data.paddleId);
	// 			}
	// 		});
	// 	});
	// }
}

// window.addEventListener("DOMContentLoaded", () => {
// 	const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
// 	if (!canvas) {
// 		console.error("Canvas not found");
// 		return;
// 	}
// 	const game = new Game(canvas, "test-game-id");
// 	game.start();
// });
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
