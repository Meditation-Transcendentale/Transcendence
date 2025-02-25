import { Engine, Scene, HemisphericLight, Vector3, ArcRotateCamera, MeshBuilder, StandardMaterial, Color3, Camera } from "@babylonjs/core";
import { Ball } from "../entities/Ball";
import { Paddle } from "../entities/Paddle";
import { WebSocketManager } from "./WebSocketManager";
import "@babylonjs/inspector";

export class SceneManager {
	private engine: Engine;
	private canvas: HTMLCanvasElement;
	private scene!: Scene;
	private ball!: Ball;
	private ball2!: Ball;
	private playerPaddle!: Paddle;
	private aiPaddle!: Paddle;
	private lastSimulationTime!: number;
	private lastServerUpdate!: number;
	private keysPressed: { [key: string]: boolean } = {};
	private webSocketManager!: WebSocketManager;
	private redmaterial!: StandardMaterial;
	private material!: StandardMaterial;
	private serverState!: {
		position: { x: number, y: number },
		velocity: { x: number, y: number },
		timestamp: number,
	};
	private SIMULATION_INTERVAL!: number;
	private stateHistory: { timestamp: number; position: Vector3; velocity: Vector3 }[] = [];

	constructor(engine: Engine, canvas: HTMLCanvasElement) {
		this.engine = engine;
		this.canvas = canvas;
		this.SIMULATION_INTERVAL = 1000 / 60;
	}

	public createScene(): void {
		this.scene = new Scene(this.engine);
		this.scene.deltaTime = 0;
		this.scene.debugLayer.show();
		this.material = new StandardMaterial("ballMaterial", this.scene);
		this.material.diffuseColor = new Color3(0, 1, 0);
		this.redmaterial = new StandardMaterial("ball2Material", this.scene);
		this.redmaterial.diffuseColor = new Color3(1, 0, 0); // 🔴 Red color

		const camera = new ArcRotateCamera("camera", 0, 0, 19, Vector3.Zero(), this.scene);
		//camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
		//camera.orthoTop = 8;
		//camera.orthoBottom = -8;
		//camera.orthoLeft = -13;
		//camera.orthoRight = 13;

		new HemisphericLight("light", new Vector3(2, 1, 0), this.scene);

		MeshBuilder.CreateGround("ground", { width: 10, height: 20 }, this.scene);
		const material = new StandardMaterial("wallMaterial", this.scene);
		material.diffuseColor = new Color3(0.6, 1, 1);

		this.createWalls();
		this.ball = new Ball(this.scene, this.material);
		this.ball2 = new Ball(this.scene, this.redmaterial);

		this.playerPaddle = new Paddle(this.scene, new Vector3(0, 0.5, -9.5), true);
		this.aiPaddle = new Paddle(this.scene, new Vector3(0, 0.5, 9.5), true);

		this.webSocketManager = new WebSocketManager("ws://10.12.12.4:8080");
		this.setupInput();

		// Listen for game state updates from the server
		this.webSocketManager.onUpdate((data) => this.updateGameState(data));
	}

	private setupInput(): void {
		window.addEventListener("keydown", (event) => {
			this.keysPressed[event.key] = true;
		});

		window.addEventListener("keyup", (event) => {
			this.keysPressed[event.key] = false;
		});
	}

	private createWalls(): void {
		const wallHeight = 1;
		const wallThickness = 0.2;
		const wallWidth = 10.2;
		const large_wallWidth = 20.2;

		const material = new StandardMaterial("wallMaterial", this.scene);
		material.diffuseColor = new Color3(1, 0.9, 1);

		const walls = [
			{ name: "wallNorth", position: new Vector3(0, wallHeight / 2, -10.01), rotation: 0 },
			{ name: "wallSouth", position: new Vector3(0, wallHeight / 2, 10.01), rotation: 0 },
		];
		const large_walls = [
			{ name: "wallEast", position: new Vector3(5.05, wallHeight / 2, 0), rotation: Math.PI / 2 },
			{ name: "wallWest", position: new Vector3(-5.05, wallHeight / 2, 0), rotation: Math.PI / 2 },
		];

		walls.forEach((wall) => {
			const wallMesh = MeshBuilder.CreateBox(wall.name, { width: wallWidth, height: wallHeight, depth: wallThickness }, this.scene);
			wallMesh.position = wall.position;
			wallMesh.rotation.y = wall.rotation;
			wallMesh.material = material;
		});

		large_walls.forEach((large_walls) => {
			const wallMesh = MeshBuilder.CreateBox(large_walls.name, { width: large_wallWidth, height: wallHeight, depth: wallThickness }, this.scene);
			wallMesh.position = large_walls.position;
			wallMesh.rotation.y = large_walls.rotation;
			wallMesh.material = material;
		});
	}
	public getScene(): Scene {
		return this.scene;
	}

	public renderLoop = () => {
		//interpolateGameState(); // Smooth out corrections
		this.scene.render();


		requestAnimationFrame(this.renderLoop);
	}
	public start(): void {
		//console.log("Game started! Initializing lastSimulationTime.");
		this.lastSimulationTime = performance.now() - this.SIMULATION_INTERVAL; // Prevent zero deltaTime
		this.simulationLoop(); // Start game logic loop
		requestAnimationFrame(this.renderLoop); // Start rendering loop
	}
	public simulationLoop(): void {
		const now = performance.now();
		//let deltaTime = (now - this.lastSimulationTime);
		//deltaTime = Math.min(deltaTime, 0.05);

		let loops = 0;
		while (now - this.lastSimulationTime >= this.SIMULATION_INTERVAL) {

			this.handlePlayerInput();
			this.applyServerState(); // Apply reconciliation logic

			this.ball.update(this.serverState); // Normal physics update

			this.lastSimulationTime += this.SIMULATION_INTERVAL;
			loops++;
		}

		//console.log(`Completed ${loops} updates.`);
		setTimeout(this.simulationLoop.bind(this), this.SIMULATION_INTERVAL);
	}

	private handlePlayerInput(): void {
		let playerid = this.webSocketManager.getPlayerId();
		if (this.keysPressed["a"]) {
			if (playerid == "player1") {
				this.playerPaddle.move(-0.25);
				this.webSocketManager.sendMove(this.playerPaddle.getMesh().position.x);
			}
			else if (playerid == "player2") {
				this.aiPaddle.move(-0.25);
				this.webSocketManager.sendMove(this.aiPaddle.getMesh().position.x);
			}
		} else if (this.keysPressed["d"]) {
			if (playerid == "player1") {
				this.playerPaddle.move(0.25);
				this.webSocketManager.sendMove(this.playerPaddle.getMesh().position.x);
			}
			else if (playerid == "player2") {
				this.aiPaddle.move(0.25);
				this.webSocketManager.sendMove(this.aiPaddle.getMesh().position.x);
			}
		}
	}
	private updateGameState(data: any): void {
		const now = performance.now();
		//console.log(`Server Update Received | Time Since Last: ${now - (this.lastServerUpdate || now)} ms`);


		this.lastServerUpdate = now;

		this.serverState = {
			position: { x: data.ball.x, y: data.ball.y },
			velocity: { x: data.ball.vx, y: data.ball.vy },
			timestamp: data.timestamp,
		};
		this.ball2.ball.position.x = data.ball.x;
		this.ball2.ball.position.z = data.ball.y;
		//console.log("SERVER x=" + this.ball2.ball.position.x + "y=" + this.ball2.ball.position.z);
	}

	private applyServerState(): void {
		if (!this.serverState) return; // No server update yet
		const serverPosition = new Vector3(this.serverState.position.x, this.serverState.position.y, 0);
		const serverVelocity = new Vector3(this.serverState.velocity.x, this.serverState.velocity.y, 0);
		const error = Math.abs(this.ball.ball.position.x - serverPosition.x) + Math.abs(this.ball.ball.position.z - serverPosition.y);
		const interpolationFactor = error > 0.4 ? 0.3 : error > 0.15 ? 0.15 : 0.05;

		// Find the closest predicted state

		if (error > 2) {
			console.warn(`Reconciliation: Correcting position. Error: ${error}`);

			//this.ball.ball.position.x = this.lerp(this.ball.ball.position.x, serverPosition.x, interpolationFactor);
			//this.ball.ball.position.z = this.lerp(this.ball.ball.position.z, serverPosition.y, interpolationFactor);
			this.ball.ball.position.x = serverPosition.x;
			this.ball.ball.position.z = serverPosition.y;

			this.ball.velocity.x = serverVelocity.x;
			this.ball.velocity.y = serverVelocity.y;
		}
		//else if (error > 0.5) {
		//	console.warn(`Reconciliation: Correcting position. Error: ${error}`);
		//
		//	this.ball.ball.position.x = this.lerp(this.ball.ball.position.x, serverPosition.x, interpolationFactor);
		//	this.ball.ball.position.z = this.lerp(this.ball.ball.position.z, serverPosition.y, interpolationFactor);
		//	//this.ball.ball.position.x = serverPosition.x;
		//	//this.ball.ball.position.z = serverPosition.y;
		//
		//	//this.ball.velocity.x = serverVelocity.x;
		//	//this.ball.velocity.y = serverVelocity.y;
		//}
		//else {
		//	// ✅ Ensure velocity gradually adjusts, but doesn't lag behind
		//	if (Math.abs(this.ball.velocity.x - this.serverState.velocity.x) > 0.1 ||
		//		Math.abs(this.ball.velocity.y - this.serverState.velocity.y) > 0.1) {
		//		this.ball.velocity.x = this.lerp(this.ball.velocity.x, this.serverState.velocity.x, 0.5);
		//		this.ball.velocity.y = this.lerp(this.ball.velocity.y, this.serverState.velocity.y, 0.5);
		//	}
		//	this.ball.ball.position.x = serverPosition.x;
		//	this.ball.ball.position.z = serverPosition.y;
		//}

		// Remove outdated history
		//this.stateHistory = this.stateHistory.filter(state => state.timestamp > this.serverState.timestamp);
	}
	private lerp(start: number, end: number, t: number): number {
		const distance = Math.abs(end - start);

		const adaptiveFactor = distance > 0.5 ? 0.15 : 0.03;
		t = Math.max(0, Math.min(1, adaptiveFactor));

		return start + (end - start) * t;
	}
}

