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
	private keysPressed: { [key: string]: boolean } = {};
	private webSocketManager!: WebSocketManager;
	private redmaterial!: StandardMaterial;
	private material!: StandardMaterial;
	private serverState!: {
		position: { x: number, y: number },
		velocity: { x: number, y: number },
		timestamp: number,
	};

	constructor(engine: Engine, canvas: HTMLCanvasElement) {
		this.engine = engine;
		this.canvas = canvas;
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

	public start(): void {
		this.engine.runRenderLoop(() => {
			this.handlePlayerInput();
			this.ball.update(this.serverState);
			//this.ball2.update2();
			this.scene.render();
		});
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
		//const latencyCompensation = this.webSocketManager.getLatency() * 0.001; // Convert ms to seconds
		//
		//// Adjust ball position based on latency
		////const estimatedX = data.ball.x + data.ball.vx * latencyCompensation;
		////const estimatedZ = data.ball.y + data.ball.vy * latencyCompensation;
		//const estimatedX = data.ball.x + data.ball.vx;
		//const estimatedZ = data.ball.y + data.ball.vy;
		//
		//this.ball.updatePosition(estimatedX, estimatedZ, data.ball.vx, data.ball.vy);
		//this.ball2.updatePosition(data.ball.x + data.ball.vx, data.ball.y + data.ball.vy, data.ball.vx, data.ball.vy);
		//
		//this.playerPaddle.updatePosition(data.paddles["player1"].x);
		//this.aiPaddle.updatePosition(data.paddles["player2"].x);
		this.serverState = {
			position: { x: data.ball.x, y: data.ball.y },
			velocity: { x: data.ball.vx, y: data.ball.vy },
			timestamp: data.timestamp,
		};
		console.log(`Server Ball: x=${data.ball.x}, y=${data.ball.y}, vx=${data.ball.vx}, vy=${data.ball.vy}`);
	}
}

