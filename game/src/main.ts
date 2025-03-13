import { Engine, Scene, Vector3, ArcRotateCamera, HemisphericLight, MeshBuilder, StandardMaterial } from "@babylonjs/core";
import { ECSManager } from "./ecs/ECSManager.js";
import { StateManager } from "./state/StateManager.js";
import { MovementSystem } from "./systems/MovementSystem.js";
import { InputSystem } from "./systems/InputSystem.js";
import { NetworkingSystem } from "./systems/NetworkingSystem.js";
import { ThinInstanceSystem } from "./systems/ThinInstanceSystem.js";
import { WebSocketManager } from "./network/WebSocketManager.js";
import { InputManager } from "./input/InputManager.js";
import { ThinInstanceManager } from "./rendering/ThinInstanceManager.js";
import { calculateArenaRadius, createGameTemplate, GameTemplateConfig } from "./templates/GameTemplate.js";

class Game {
    private engine: Engine;
    private scene: Scene;
    private ecs: ECSManager;
    private stateManager: StateManager;
    private wsManager: WebSocketManager;
    private inputManager: InputManager;
    private camera: ArcRotateCamera;

    constructor(canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas, true);
        this.scene = new Scene(this.engine);

        this.camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 40, Vector3.Zero(), this.scene);
        this.camera.attachControl(canvas, true);
        new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);

        const arenaMesh = MeshBuilder.CreateDisc("arenaDisc", { radius: calculateArenaRadius(100), tessellation: 128 }, this.scene);
        const material = new StandardMaterial("arenaMaterial", this.scene);
        material.diffuseColor.set(0, 0, 0);
        arenaMesh.rotation.x = Math.PI / 2;
        arenaMesh.material = material;
        const ballBaseMesh = MeshBuilder.CreateSphere("ballBase", { diameter: 0.5 }, this.scene);
        ballBaseMesh.setEnabled(true);
        const paddleBaseMesh = MeshBuilder.CreateBox("paddleBase", { width: 1, height: 0.2, depth: 0.1 }, this.scene);
        paddleBaseMesh.setEnabled(true);
        const wallBaseMesh = MeshBuilder.CreateBox("wallBase", { width: 3, height: 1, depth: 1 }, this.scene);
        wallBaseMesh.setEnabled(true);
        const pillarBaseMesh = MeshBuilder.CreateCylinder("pillarBase", { height: 5, diameter: 1 }, this.scene);
        pillarBaseMesh.setEnabled(true);

        const ballInstanceManager = new ThinInstanceManager(ballBaseMesh, 1000, 50, 100);
        const paddleInstanceManager = new ThinInstanceManager(paddleBaseMesh, 100, 50, 100);
        const wallInstanceManager = new ThinInstanceManager(wallBaseMesh, 100, 50, 100);
        const pillarInstanceManager = new ThinInstanceManager(pillarBaseMesh, 100, 50, 100);

        this.ecs = new ECSManager();
        this.wsManager = new WebSocketManager("ws://10.12.12.4:8080");
        this.inputManager = new InputManager();

        this.ecs.addSystem(new MovementSystem());
        this.ecs.addSystem(new InputSystem(this.inputManager));
        this.ecs.addSystem(new NetworkingSystem(this.wsManager));
        this.ecs.addSystem(new ThinInstanceSystem(
            ballInstanceManager,
            paddleInstanceManager,
            wallInstanceManager,
            pillarInstanceManager,
            this.camera
        ));

        const config: GameTemplateConfig = {
            numberOfPlayers: 100,
            numberOfBalls: 50,
            arenaRadius: calculateArenaRadius(100),
            numPillars: 100,
            numWalls: 100
        };
        createGameTemplate(this.ecs, config);

        this.stateManager = new StateManager(this.ecs);
        this.stateManager.update();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    new Game(canvas);
});
