import { Engine, Scene, Vector3, ArcRotateCamera, HemisphericLight, MeshBuilder, StandardMaterial, ShaderMaterial, Effect } from "@babylonjs/core";
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
import { ShieldSystem } from "./systems/ShieldSystem.js";

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

		this.camera = new ArcRotateCamera("camera", Math.PI * 0.5, 0, 10, Vector3.Zero(), this.scene);
		this.camera.attachControl(canvas, true);
		new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);

		const arenaMesh = MeshBuilder.CreateDisc("arenaDisc", { radius: calculateArenaRadius(2), tessellation: 128 }, this.scene);
		const material = new StandardMaterial("arenaMaterial", this.scene);
		material.diffuseColor.set(0.75, 0.75, 0.75);
		arenaMesh.rotation.x = Math.PI / 2;
		arenaMesh.material = material;
		const ballBaseMesh = MeshBuilder.CreateSphere("ballBase", { diameter: 0.5 }, this.scene);
		ballBaseMesh.setEnabled(false);
		ballBaseMesh.setPivotPoint(Vector3.Zero());
		const paddleBaseMesh = MeshBuilder.CreateCylinder("goal", {height: 0.5, diameter:1, subdivisions:16}, this.scene);
		paddleBaseMesh.setEnabled(true);
		paddleBaseMesh.setPivotPoint(Vector3.Zero());
		const mat = new StandardMaterial("paddleMaterial", this.scene);
		mat.diffuseColor.set(1, 0, 0);
		paddleBaseMesh.material = mat;
		const shieldBaseMesh = MeshBuilder.CreateCylinder("shield", {height: 0.25, diameter: 1.65, tessellation: 12, arc: 0.5, enclose: true, updatable: true}, this.scene);
		shieldBaseMesh.setEnabled(true);
		shieldBaseMesh.setPivotPoint(Vector3.Zero());

		Effect.ShadersStore['customFragmentShader'] = `
			precision highp float;

			void main(void) {
				vec3 color = vec3(1.0,0.0,0.0);
				gl_FragColor = vec4( color, 1.0);
			}
		`;

		Effect.ShadersStore['customVertexShader'] = `
			precision highp float;

			// Attributes
			attribute vec3 position;
			attribute vec3 normal;
			attribute vec2 uv;
			attribute float angleFactor;
			attribute float isActive;
			
			// Uniforms
			uniform mat4 world;
			uniform mat4 worldViewProjection;

			// Varying
			// varying vec3 vNormal;


			const float PI = 3.14159265;

			void main(void) {
				// Transform the normal for proper lighting
				// vNormal = normalize(mat3(world) * normal);
				if (isActive == 0.0){
					vec3 newPos = vec3(0.0, 0.0, 0.0);
					gl_Position = worldViewProjection * vec4(newPos, 1.0);
					return;
				}

				float angle = atan(position.z, position.x) + (PI / 2.0);
				
				// Interpolate the vertex's angle from its original (shieldAngle) to the hinge angle (0.0)
				float newAngle = mix(angle, 0.0, angleFactor) - PI * 0.5;
				
				// Compute the original radial distance from the center (preserved during the fan closing)
				float radius = length(vec2(position.x, position.z));
				
				// Reconstruct the new XZ coordinates from the new angle, keeping Y unchanged
				vec2 newXZ = vec2(cos(newAngle), sin(newAngle)) * radius;
				vec3 newPosition = vec3(newXZ.x, position.y, newXZ.y);
				
				gl_Position = worldViewProjection * vec4(newPosition, 1.0);
			}
		`;

		shieldBaseMesh.convertToFlatShadedMesh();
		shieldBaseMesh.computeWorldMatrix(true);
		console.log(Effect.ShadersStore);
		let shaderMaterial = new ShaderMaterial('custom', this.scene, 'custom', {
			attributes: ['position', 'normal', 'angleFactor', 'isActive'],
			uniforms: ['world', 'worldViewProjection']
		});
		shieldBaseMesh.material = shaderMaterial;

		const wallBaseMesh = MeshBuilder.CreateBox("wallBase", { width: 3, height: 1, depth: 1 }, this.scene);
		wallBaseMesh.setEnabled(false);
		wallBaseMesh.setPivotPoint(Vector3.Zero());
		const pillarBaseMesh = MeshBuilder.CreateBox("pillarBase", { width: 0.2, height: 2, depth: 0.2 }, this.scene);
		pillarBaseMesh.setEnabled(true);
		pillarBaseMesh.setPivotPoint(Vector3.Zero());

		const ballInstanceManager = new ThinInstanceManager(ballBaseMesh, 1, 50, 100);
		const paddleInstanceManager = new ThinInstanceManager(paddleBaseMesh, 1, 50, 100);
		const shieldInstanceManager = new ThinInstanceManager(shieldBaseMesh, 1, 50, 100);
		const wallInstanceManager = new ThinInstanceManager(wallBaseMesh, 1, 50, 100);
		const pillarInstanceManager = new ThinInstanceManager(pillarBaseMesh, 1, 50, 100);

		this.ecs = new ECSManager();
		this.wsManager = new WebSocketManager("ws://localhost:8080");
		this.inputManager = new InputManager();

		this.ecs.addSystem(new MovementSystem());
		this.ecs.addSystem(new InputSystem(this.inputManager));
		this.ecs.addSystem(new NetworkingSystem(this.wsManager));
		this.ecs.addSystem(new ShieldSystem());
		this.ecs.addSystem(new ThinInstanceSystem(
			ballInstanceManager,
			paddleInstanceManager,
			shieldInstanceManager,
			wallInstanceManager,
			pillarInstanceManager,
			this.camera
		));

		const config: GameTemplateConfig = {
			numberOfPlayers: 1,
			numberOfBalls: 50,
			arenaRadius: calculateArenaRadius(2),
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
