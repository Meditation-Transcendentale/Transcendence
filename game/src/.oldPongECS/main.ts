import { PolygonMeshBuilder, Engine, Scene, Vector3, Vector2, ArcRotateCamera, HemisphericLight, MeshBuilder, StandardMaterial, ShaderMaterial, Effect, Camera, Mesh } from "@babylonjs/core";
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
import { Inspector } from '@babylonjs/inspector';
import { Ball } from "../.oldPongIO/Ball.js"
import earcut from 'earcut';

class Game {
	private engine: Engine;
	private scene: Scene;
	private ecs: ECSManager;
	private stateManager: StateManager;
	private wsManager: WebSocketManager;
	private inputManager: InputManager;
	private camera: ArcRotateCamera;
	private meshes: any;

	constructor(canvas: HTMLCanvasElement) {
		this.engine = new Engine(canvas, true);
		this.scene = new Scene(this.engine);

		// Inspector.Show(this.scene, {});

		this.camera = new ArcRotateCamera("camera", Math.PI * 0.5, 0, 10, Vector3.Zero(), this.scene);
		this.camera.attachControl(canvas, true);
		this.camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
		this.camera.orthoLeft = -5 * 16 / 5
		this.camera.orthoRight = 5 * 16 / 5;
		this.camera.orthoTop = 5 * 9 / 5;
		this.camera.orthoBottom = -5 * 9 / 5;
		new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);

		this.generateBricks(10, 3, 6);
		this.meshes = this.createGame();

		// const wallBaseMesh = MeshBuilder.CreateBox("wallBase", { width: 3, height: 1, depth: 1 }, this.scene);
		// wallBaseMesh.setEnabled(false);
		// wallBaseMesh.setPivotPoint(Vector3.Zero());

		let ballMat = new StandardMaterial("ballMat", this.scene);
		ballMat.diffuseColor.set(1, 0, 0);
		let ball = new Ball(this.scene, ballMat);

		const ballInstanceManager = new ThinInstanceManager(this.meshes.arena, 5, 50, 100);
		const paddleInstanceManager = new ThinInstanceManager(paddleBaseMesh, 1, 50, 100);
		const shieldInstanceManager = new ThinInstanceManager(shieldBaseMesh, 1, 50, 100);
		const wallInstanceManager = new ThinInstanceManager(wallBaseMesh, 1, 50, 100);

		this.ecs = new ECSManager();
		// this.wsManager = new WebSocketManager("ws://localhost:8080");
		this.wsManager = null as any;
		this.inputManager = new InputManager();

		this.ecs.addSystem(new MovementSystem());
		this.ecs.addSystem(new InputSystem(this.inputManager, this.scene));
		// this.ecs.addSystem(new NetworkingSystem(this.wsManager));
		this.ecs.addSystem(new ShieldSystem());
		this.ecs.addSystem(new ThinInstanceSystem(
			ballInstanceManager,
			paddleInstanceManager,
			shieldInstanceManager,
			wallInstanceManager,
			this.camera
		));

		const config: GameTemplateConfig = {
			numberOfPlayers: 1,
			numberOfBalls: 5,
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

	generateBricks(radius: number, layers: number, cols: number) {
		let brickArr = [];
		const arenaSubdv = cols * Math.ceil(128 / cols) ;
		const width = 0.4;
		const radian = 2 * Math.PI;
		
		for (let i = 0; i < layers; ++i){
			const radIn = radius - (width * i * 2) - width;
			const radOut = radius - (width * (i + 1) * 2);
			for (let j = 0; j < cols; ++j){
				let points = [];
				let vert;
				for (let k = (arenaSubdv / cols) - 1; k >= 0; --k){
					vert = k + (arenaSubdv / cols) * j;
					let point = new Vector2(Math.cos(radian * vert / arenaSubdv) * radIn, Math.sin(radian * vert / arenaSubdv) * radIn);
					points.push(point);
				}
				for (let k = 0; k < arenaSubdv / cols; ++k){
					vert = k + (arenaSubdv / cols) * j;
					let point = new Vector2(Math.cos(radian * vert / arenaSubdv) * radOut, Math.sin(radian * vert / arenaSubdv) * radOut);
					points.push(point);
				}
				const poly_tri = new PolygonMeshBuilder("polytri", points, this.scene, earcut);
				const polygon = poly_tri.build(true, width);
				polygon.position.y += 0.4;
				brickArr.push(polygon);
			}
		}
	}

	createGame(): any{
		const arenaMesh = MeshBuilder.CreateDisc("arenaDisc", { radius: 10, tessellation: 128 }, this.scene);//calculateArenaRadius(2)
		const material = new StandardMaterial("arenaMaterial", this.scene);
		material.diffuseColor.set(0.75, 0.75, 0.75);
		material.disableLighting = true;
		material.emissiveColor.set(0.75,0.75,0.75);
		arenaMesh.rotation.x = Math.PI / 2;
		arenaMesh.material = material;

		const ballBaseMesh = MeshBuilder.CreateSphere("ballBase", { diameter: 0.5 }, this.scene);
		ballBaseMesh.setEnabled(false);
		ballBaseMesh.setPivotPoint(Vector3.Zero());

		const paddleBaseMesh = MeshBuilder.CreateCylinder("paddle", {height: 0.5, diameter:1, tessellation:64}, this.scene);
		paddleBaseMesh.setEnabled(true);
		paddleBaseMesh.setPivotPoint(Vector3.Zero());

		const mat = new StandardMaterial("paddleMaterial", this.scene);
		mat.diffuseColor.set(1, 0, 0);
		mat.disableLighting = true;
		mat.emissiveColor.set(1,0,0);

		const shieldBaseMesh = MeshBuilder.CreateCylinder("shield", {height: 0.25, diameter: 1.65, tessellation: 12, arc: 0.5, enclose: true, updatable: true}, this.scene);
		shieldBaseMesh.setEnabled(true);
		shieldBaseMesh.setPivotPoint(Vector3.Zero());

		const pointerSurface = MeshBuilder.CreatePlane("surface", {size: 40, sideOrientation: Mesh.DOUBLESIDE}, this.scene);
		const invMat = new StandardMaterial("surfaceMat", this.scene);
		invMat.diffuseColor.set(0, 0, 0);
		invMat.alpha = 0;
		pointerSurface.position.y = 5;
		pointerSurface.material = invMat;
		pointerSurface.rotation.x = Math.PI / 2;
		pointerSurface.isPickable = true;

		Effect.ShadersStore['customFragmentShader'] = `
			precision highp float;

			void main(void) {
				vec3 color = vec3(0.0,0.0,1.0);
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
			attribute vec3 paddlePosition;
			attribute vec3 paddleRotation;
			
			// Uniforms
			uniform mat4 world;
			uniform mat4 worldViewProjection;

			const float PI = 3.14159265;

			void main(void) {
				if (isActive == 0.0){
					gl_Position = worldViewProjection * vec4(0.0, 0.0, 0.0, 1.0);
					return;
				}

				float angle = atan(position.z, position.x) + (PI / 2.0);
				float newAngle = mix(angle, 0.0, angleFactor) - paddleRotation.y + PI * 0.5;
				float radius = length(vec2(position.x, position.z));
				vec2 newXZ = vec2(cos(newAngle), sin(newAngle)) * radius;
				vec3 newPosition = vec3(newXZ.x, position.y, newXZ.y);

				newPosition += paddlePosition;
				gl_Position = worldViewProjection * vec4(newPosition, 1.0);
			}
		`;

		let shaderMaterial = new ShaderMaterial('custom', this.scene, 'custom', {
			attributes: ['position', 'normal', 'angleFactor', 'isActive', 'paddlePosition', 'paddleRotation'],
			uniforms: ['world', 'worldViewProjection']
		});
		shieldBaseMesh.material = shaderMaterial;

		return {arena: arenaMesh, ball: ballBaseMesh, paddle: paddleBaseMesh, shield: shieldBaseMesh, mouseSurface: pointerSurface};
	}
}

window.addEventListener("DOMContentLoaded", () => {
	const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
	new Game(canvas);
});
