import { Engine, Scene, Vector3, ArcRotateCamera, HemisphericLight, MeshBuilder, StandardMaterial, Texture, Mesh } from "@babylonjs/core";
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
import { /*calculateArenaRadius,*/ createGameTemplate, GameTemplateConfig } from "./templates/GameTemplate.js";
import { DebugVisualizer } from "./debug/DebugVisualizer.js";

import "@babylonjs/inspector";
const API_BASE = "http://10.19.229.249:4000";
// const API_BASE = "http://localhost:4000";
export let localPaddleId: any = null;
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
	private paddleId;


	constructor(canvas, gameId) {
		this.canvas = canvas;
		this.gameId = gameId;
	}

	async start() {
		this.engine = new Engine(this.canvas, true);
		this.scene = new Scene(this.engine);

		this.camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 40, Vector3.Zero(), this.scene);
		this.camera.attachControl(this.canvas, true);
		new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);

		// const arenaMesh = MeshBuilder.CreateDisc("arenaDisc", { radius: calculateArenaRadius(100), tessellation: 128 }, this.scene);
		const arenaMesh = MeshBuilder.CreateBox("arenaBox", {width: 20, height: 1, depth: 30}, this.scene);
		const material = new StandardMaterial("arenaMaterial", this.scene);
		material.diffuseColor.set(0, 0, 0);
		arenaMesh.rotation.x = Math.PI / 2;
		arenaMesh.material = material;

		const ballBaseMesh = MeshBuilder.CreateSphere("ballBase", { diameter: 0.5 }, this.scene);

		const ballMaterial = new StandardMaterial("ballMaterial", this.scene);
		//ballMaterial.diffuseColor.set(1, 0, 0);
		ballMaterial.diffuseTexture = new Texture("moi.png", this.scene);
		ballBaseMesh.setEnabled(true);
		ballBaseMesh.setPivotPoint(Vector3.Zero());
		ballBaseMesh.material = ballMaterial;

		const paddleBaseMesh = MeshBuilder.CreateBox("paddleBase", { width: 1, height: 0.2, depth: 0.1 }, this.scene);
		paddleBaseMesh.setEnabled(true);
		paddleBaseMesh.setPivotPoint(Vector3.Zero());

		const wallBaseMesh = MeshBuilder.CreateBox("wallBase", { width: 7, height: 2, depth: 0.5 }, this.scene);
		const wallMaterial = new StandardMaterial("arenaMaterial", this.scene);
		wallMaterial.diffuseColor.set(1, 0, 0);
		wallBaseMesh.material = wallMaterial;
		wallBaseMesh.setEnabled(true);
		wallBaseMesh.setPivotPoint(Vector3.Zero());

		const pillarBaseMesh = MeshBuilder.CreateBox("pillarBase", { width: 0.2, height: 2, depth: 0.2 }, this.scene);
		pillarBaseMesh.setEnabled(true);
		pillarBaseMesh.setPivotPoint(Vector3.Zero());

		const ballInstanceManager = new ThinInstanceManager(ballBaseMesh, 1000, 50, 100);
		const paddleInstanceManager = new ThinInstanceManager(paddleBaseMesh, 100, 50, 100);
		const wallInstanceManager = new ThinInstanceManager(wallBaseMesh, 100, 50, 100);
		// const pillarInstanceManager = new ThinInstanceManager(pillarBaseMesh, 100, 50, 100);

		this.ecs = new ECSManager();
		const uiid = getOrCreateUIID();
		const wsUrl = `ws://10.19.229.249:3000?uuid=${encodeURIComponent(uiid)}&gameId=${encodeURIComponent(this.gameId)}`;
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
			// pillarInstanceManager,
			this.camera
		));

		localPaddleId = await this.waitForWelcome();
		const config = {
			numberOfPlayers: 100,
			numberOfBalls: 200,
			// arenaRadius: calculateArenaRadius(100),
			numPillars: 100,
			numWalls: 100
		};

		createGameTemplate(this.ecs, config, this.paddleId);
		this.stateManager = new StateManager(this.ecs);
		this.stateManager.update();

		this.engine.runRenderLoop(() => {
			this.scene.render();
		});
	}

	waitForWelcome() {
		return new Promise((resolve) => {
			this.wsManager.socket.addEventListener("message", (event) => {
				const data = JSON.parse(event.data);
				if (data.type === "welcome") {
					console.log("Received welcome:", data);
					this.paddleId = data.paddleId;

					this.wsManager.socket.send(JSON.stringify({
						type: "registerGame",
						data: { gameId: this.gameId }
					}));

					resolve(data.paddleId);
				}
			});
		});
	}
}

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
			body: JSON.stringify({ mode: "pongBR" })
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
