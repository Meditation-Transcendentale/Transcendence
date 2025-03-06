import { Engine, Scene, HemisphericLight, Vector3, ArcRotateCamera, MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";
//import { Ball } from "../entities/Ball";
import { Paddle } from "../entities/Paddle";
import { Player } from "../entities/Player";
import { Ball } from "../entities/Ball";
import Client from "./Client";
//import { WebSocketManager } from "./WebSocketManager";
import "@babylonjs/inspector";

//interface ServerState {
//	position: Vector3;
//	velocity: Vector3;
//	timestamp: number;
//}

export class SceneManager {
    private engine: Engine;
    private canvas: HTMLCanvasElement;
    private scene!: Scene;
    private player: { [key: number]: Player } = {};
    private client!: Client;
    private balls: { [key: number]: Ball } = {};
    //private ball!: Ball;
    //private ball2!: Ball;
    //private playerPaddle!: Paddle;
    //private aiPaddle!: Paddle;
    //
    //private lastSimulationTime!: number;
    //private fixedDelta: number = 1 / 120;
    //private accumulator: number = 0;
    //
    private keysPressed: { [key: string]: boolean } = {};
    //private material!: StandardMaterial;
    //private redmaterial!: StandardMaterial;
    //
    //private webSocketManager!: WebSocketManager;
    //
    //private previousServerState: ServerState | null = null;
    //private currentServerState: ServerState | null = null;

    constructor(engine: Engine, canvas: HTMLCanvasElement) {
        this.engine = engine;
        this.canvas = canvas;
    }

    public createScene(): void {
        this.scene = new Scene(this.engine);
        this.scene.debugLayer.show();

        //this.material = new StandardMaterial("ballMaterial", this.scene);
        //this.material.diffuseColor = new Color3(0, 1, 0);
        //this.redmaterial = new StandardMaterial("ball2Material", this.scene);
        //this.redmaterial.diffuseColor = new Color3(1, 0, 0);

        const camera = new ArcRotateCamera("camera", 0, 0, 19, Vector3.Zero(), this.scene);
        camera.attachControl(this.canvas, true);
        new HemisphericLight("light", new Vector3(2, 1, 0), this.scene);


        const numPlayers = 100;
        const playerWidth = 10;
        const centralAngleDeg = 360 / numPlayers;
        const halfCentralAngleRad = (centralAngleDeg / 2) * Math.PI / 180;

        const radius = playerWidth / (2 * Math.sin(halfCentralAngleRad));

        for (let i = 0; i < numPlayers; i++) {
            const angleDeg = i * centralAngleDeg;

            const angleRad = angleDeg * Math.PI / 180;

            const posX = radius * Math.cos(angleRad);
            const posZ = radius * Math.sin(angleRad);
            const position = new Vector3(posX, 0.5, posZ);

            this.player[i] = new Player(this.scene, position, angleDeg, true, i, radius);

        }

        const circleFloor = MeshBuilder.CreateDisc("circleFloor", {
            radius: radius,
            tessellation: 64
        }, this.scene);
        const material = new StandardMaterial("ballMaterial", this.scene);
        material.diffuseColor.set(0, 0, 0);
        circleFloor.material = material;

        circleFloor.rotation.x = Math.PI / 2;
        this.client = new Client(this.scene, this.player);
        //this.player = new Player(this.scene, new Vector3(5, 0.5, 5), 90, true);
        //MeshBuilder.CreateGround("ground", { width: 10, height: 20 }, this.scene);
        //this.createWalls();

        //this.ball = new Ball(this.scene, this.material);
        ////this.ball2 = new Ball(this.scene, this.redmaterial);
        //this.playerPaddle = new Paddle(this.scene, new Vector3(0, 0.5, -9.5), true);
        //this.aiPaddle = new Paddle(this.scene, new Vector3(0, 0.5, 9.5), true);
        //
        //this.webSocketManager = new WebSocketManager("ws://10.12.12.4:8080");
        //this.webSocketManager.onUpdate((data) => this.updateGameState(data));
        //this.playerid = this.webSocketManager.getPlayerId();
        this.setupInput();
    }

    private setupInput(): void {
        window.addEventListener("keydown", (event) => {
            this.keysPressed[event.key] = true;
        });
        window.addEventListener("keyup", (event) => {
            this.keysPressed[event.key] = false;
        });
    }
    //
    //private createWalls(): void {
    //	const wallHeight = 1;
    //	const wallThickness = 0.2;
    //	const wallWidth = 10.2;
    //	const large_wallWidth = 20.2;
    //	const material = new StandardMaterial("wallMaterial", this.scene);
    //	material.diffuseColor = new Color3(1, 0.9, 1);
    //
    //	const walls = [
    //		{ name: "wallNorth", position: new Vector3(0, wallHeight / 2, -10.01), rotation: 0 },
    //		{ name: "wallSouth", position: new Vector3(0, wallHeight / 2, 10.01), rotation: 0 },
    //	];
    //	const largeWalls = [
    //		{ name: "wallEast", position: new Vector3(5.05, wallHeight / 2, 0), rotation: Math.PI / 2 },
    //		{ name: "wallWest", position: new Vector3(-5.05, wallHeight / 2, 0), rotation: Math.PI / 2 },
    //	];
    //
    //	walls.forEach((wall) => {
    //		const wallMesh = MeshBuilder.CreateBox(wall.name, { width: wallWidth, height: wallHeight, depth: wallThickness }, this.scene);
    //		wallMesh.position = wall.position;
    //		wallMesh.rotation.y = wall.rotation;
    //		wallMesh.material = material;
    //	});
    //
    //	largeWalls.forEach((wall) => {
    //		const wallMesh = MeshBuilder.CreateBox(wall.name, { width: large_wallWidth, height: wallHeight, depth: wallThickness }, this.scene);
    //		wallMesh.position = wall.position;
    //		wallMesh.rotation.y = wall.rotation;
    //		wallMesh.material = material;
    //	});
    //}
    //
    public renderLoop = () => {
        //const adjustedNow = performance.now() + this.webSocketManager.getOffset();
        //
        //if (this.previousServerState && this.currentServerState) {
        //	const tickInterval = (this.currentServerState.timestamp - this.previousServerState.timestamp) / 1000;
        //	const tElapsed = (adjustedNow - this.currentServerState.timestamp) / 1000;
        //
        //	let newPosition: Vector3;
        //	if (tElapsed <= 0) {
        //		newPosition = this.currentServerState.position;
        //	}
        //	else if (tElapsed <= tickInterval) {
        //		const interpolationFactor = tElapsed / tickInterval;
        //		newPosition = Vector3.Lerp(
        //			this.previousServerState.position,
        //			this.currentServerState.position,
        //			interpolationFactor
        //		);
        //	}
        //	else {
        //		const extraTime = tElapsed - tickInterval;
        //		newPosition = this.currentServerState.position.add(
        //			this.currentServerState.velocity.scale(extraTime)
        //		);
        //	}
        //	this.ball.setPosition(newPosition);
        //}
        //
        const balls = this.client.getBalls();
        for (const id in balls) {
            balls[id].update(1 / 60); // Update balls at 60FPS
        }
        Ball.updateAllInstances();
        Paddle.updateAllInstances();
        this.scene.render();
        requestAnimationFrame(this.renderLoop);
    };

    public start(): void {
        //this.lastSimulationTime = performance.now();
        this.simulationLoop();
        requestAnimationFrame(this.renderLoop);
    }

    public simulationLoop(): void {
        //const now = performance.now();
        //let frameTime = (now - this.lastSimulationTime) / 1000;
        //
        //frameTime = Math.min(frameTime, 0.1);
        //this.lastSimulationTime = now;
        //this.accumulator += frameTime;

        this.handlePlayerInput();
        //while (this.accumulator >= this.fixedDelta) {
        //	this.applyServerState();
        //	this.ball.update(this.fixedDelta);
        //	this.accumulator -= this.fixedDelta;
        //}
        requestAnimationFrame(this.simulationLoop.bind(this));
    }

    private handlePlayerInput(): void {
        if (this.client.getMyId() == -1) return;
        let id = this.client.getMyId();
        let move = 0;
        let player = this.player[id];
        if (this.keysPressed["a"]) {
            //console.log("Pressing A");
            player.move(-0.05, this.client);
            move = -0.05;
        } else if (this.keysPressed["d"]) {
            //console.log("Pressing D");
            player.move(0.05, this.client);
            move = 0.05;
        }

        //const minX = this.player[id].position.x - 4; // Left wall
        //const maxX = this.player[id].position.x + 4;  // Right wall

        //let paddle = Math.max(minX, Math.min(maxX, this.player[id].getPaddle().position.x + move));
        //this.client.sendMove(new Vector3(paddle, 0.5, player.getPaddle().position.z), player.getPaddle().rotation.x)

    }
//
//private updateGameState(data: any): void {
//	const playerid = this.webSocketManager.getPlayerId();
//	if (this.currentServerState) {
//		this.previousServerState = this.currentServerState;
//	}
//	this.currentServerState = {
//		position: new Vector3(data.ball.x, data.ball.y, 0),
//		velocity: new Vector3(data.ball.vx, data.ball.vy, 0),
//		timestamp: data.timestamp
//	};
//	this.accumulator = 0;
//	//this.ball2.setPosition(this.currentServerState.position);
//	if (playerid == "player1")
//		this.aiPaddle.updatePosition(data.paddles["player2"].x)
//	else if (playerid == "player2")
//		this.playerPaddle.updatePosition(data.paddles["player1"].x)
//}
//
//private applyServerState(): void {
//	if (!this.currentServerState) return;
//	const predictedPosition = this.ball.getPosition();
//	const serverPosition = this.currentServerState.position;
//	const error = Vector3.Distance(predictedPosition, serverPosition);
//
//	const threshold = 0.4;
//	if (error > threshold) {
//		const correctionFactor = 0.1;
//		const correctedPosition = Vector3.Lerp(predictedPosition, serverPosition, correctionFactor);
//		this.ball.setPosition(correctedPosition);
//
//		if (this.ball.setVelocity) {
//			this.ball.setVelocity(this.currentServerState.velocity);
//		}
//	}
//	else {
//		if (Math.abs(this.ball.velocity.x - this.currentServerState.velocity.x) > 0.1 ||
//			Math.abs(this.ball.velocity.y - this.currentServerState.velocity.y) > 0.1) {
//			this.ball.velocity.x = this.lerp(this.ball.velocity.x, this.currentServerState.velocity.x, 0.5);
//			this.ball.velocity.y = this.lerp(this.ball.velocity.y, this.currentServerState.velocity.y, 0.5);
//		}
//	}
//
//}
//private lerp(start: number, end: number, t: number): number {
//	const distance = Math.abs(end - start);
//
//	const adaptiveFactor = distance > 0.5 ? 0.15 : 0.03;
//	t = Math.max(0, Math.min(1, adaptiveFactor));
//
//	return start + (end - start) * t;
//}
}
