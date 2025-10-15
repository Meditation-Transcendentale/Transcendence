import { MeshBuilder, Scene, Vector3, Vector2, Mesh, StandardMaterial, Color3, Matrix, ShaderMaterial, Effect, VertexBuffer } from "../../babylon";
import { BrickBreaker } from './brickbreaker'

export class Player {
	public goal: Mesh;
	public shield: Mesh;
	public pointerSurface: Mesh;
	private game: BrickBreaker;
	private isAlive: boolean = true;
	private materialGoal: StandardMaterial;
	private materialShield: StandardMaterial;
	private shieldMat: ShaderMaterial;
	private velocity: Vector3;

	private angleFactor: number;
	private lastInputDelay: number;
	private isActive: number = 0.0;
	private alpha: number = 1.;
	private inputDown: boolean = false;
	private inputPointer: any;

	private keysPressed: Set<string> = new Set();
	private pointer: Vector2;
	private inputActive: boolean = false;

	private keydownHandler: (e: KeyboardEvent) => void;
	private keyupHandler: (e: KeyboardEvent) => void;
	private pointerHandler: (e: PointerEvent) => void;

	private scene: Scene;

	private deltaTime: number = 1000 / 60;


	constructor(scene: Scene, position: Vector3, game: BrickBreaker) {
		this.scene = scene;
		this.game = game;

		this.goal = MeshBuilder.CreateCylinder("goal", { height: 0.5, diameter: 1, subdivisions: 16 }, this.scene);
		this.goal.parent = game.root;
		this.materialGoal = new StandardMaterial("goalMat", this.scene);
		this.materialGoal.diffuseColor = new Color3(0.878, 0.667, 1.0);
		this.materialGoal.specularColor = new Color3(0.878, 0.667, 1.0);
		this.goal.material = this.materialGoal;
		this.goal.position.set(position.x, position.y, position.z);
		this.velocity = new Vector3(0, 0, 0);
		this.pointer = new Vector2(game.root.position.x, game.root.position.z);

		this.shield = MeshBuilder.CreateCylinder("shield", { height: 0.25, diameter: 1.8, tessellation: 64, arc: 0.5, enclose: true, updatable: true }, this.scene);
		this.shield.parent = game.root;
		this.shield.rotation.y = Math.PI;
		this.materialShield = new StandardMaterial("shieldMat", this.scene);
		this.materialShield.diffuseColor = new Color3(0, 1, 0);
		this.shield.material = this.materialShield;

		this.angleFactor = 0.5;
		this.isActive = 0.0;
		this.lastInputDelay = performance.now();

		this.spawnShield();

		this.keydownHandler = (e: KeyboardEvent) => {
			this.keysPressed.add(e.code);
		}

		this.keyupHandler = (e: KeyboardEvent) => {
			this.keysPressed.delete(e.code);
		}

		this.pointerHandler = (e: PointerEvent) => {
			this.pointer.x = e.clientX;
			this.pointer.y = e.clientY;
		}

		// window.addEventListener("keydown", (e) => {
		// 	this.keysPressed.add(e.code);
		// });
		// window.addEventListener("keyup", (e) => this.keysPressed.delete(e.code));
		// window.addEventListener("pointermove", (e) => {
		// 	this.pointer.x = e.clientX;
		// 	this.pointer.y = e.clientY;
		// });

		this.pointerSurface = MeshBuilder.CreatePlane("surface", { size: 40, sideOrientation: Mesh.DOUBLESIDE }, this.scene);
		this.pointerSurface.parent = game.root;
		const invMat = new StandardMaterial("surfaceMat", this.scene);
		invMat.diffuseColor.set(0, 0, 0);
		invMat.alpha = 0;
		this.pointerSurface.position.y = 0;
		this.pointerSurface.material = invMat;
		this.pointerSurface.rotation.x = Math.PI / 2;
		this.pointerSurface.isPickable = true;

		Effect.ShadersStore['customFragmentShader'] = `
			precision highp float;

			// Varying
			varying float vAlpha;

			void main(void) {
				vec3 color = vec3(1.0,0.5,0.0);
				gl_FragColor = vec4( color, vAlpha);
			}
		`;

		Effect.ShadersStore['customVertexShader'] = `
			precision highp float;

			// Attributes
			attribute vec3 position;
			attribute vec3 normal;
			attribute vec2 uv;
			attribute float angleFactor;
			attribute vec3 paddlePosition;
			attribute vec3 paddleRotation;
			attribute float alpha;
			
			// Uniforms
			uniform mat4 world;
			uniform mat4 worldViewProjection;

			// Varying
			varying float vAlpha;

			const float PI = 3.14159265;

			void main(void) {
				vAlpha = alpha;

				float angle = atan(position.z, position.x) + (PI / 2.0);
				float newAngle = mix(angle, 0.0, angleFactor) - paddleRotation.y + PI * 1.5;
				float radius = length(vec2(position.x, position.z));
				vec2 newXZ = vec2(cos(newAngle), sin(newAngle)) * radius;
				vec3 newPosition = vec3(newXZ.x, position.y, newXZ.y);

				newPosition += paddlePosition * vec3(-1., 1., -1.);
				gl_Position = worldViewProjection * vec4(newPosition, 1.0);
			}
		`;

		this.shieldMat = new ShaderMaterial('custom', this.scene, 'custom', {
			attributes: ['position', 'normal', 'angleFactor', 'isActive', 'paddlePosition', 'paddleRotation', 'alpha'],
			uniforms: ['world', 'worldViewProjection']
		});
		this.shieldMat.alpha = this.alpha;
		this.shield.material = this.shieldMat;
	}

	enableInput() {
		if (!this.inputActive) {
			window.addEventListener("keydown", this.keydownHandler);
			window.addEventListener("keyup", this.keyupHandler);
			window.addEventListener("pointermove", this.pointerHandler);
			this.inputActive = true;
		}
	}

	disableInput() {
		if (this.inputActive) {
			window.removeEventListener("keydown", this.keydownHandler);
			window.removeEventListener("keyup", this.keyupHandler);
			window.removeEventListener("pointermove", this.pointerHandler);
			this.inputActive = false;
		}
	}

	die(): void {
		this.goal.visibility = 0;
		this.shield.visibility = 0;
		this.isAlive = false;
		this.game.end();
	}

	reset(): void {
		this.enableInput();
		this.goal.visibility = 1;
		this.shield.visibility = 1;
		this.isAlive = true;
	}

	update(): void {
		this.movePlayer();
		this.spawnShield();
		this.shieldMat.alpha = this.alpha;
		const vertexCount = this.shield.getTotalVertices();

		const angleFactorArray = new Float32Array(vertexCount);
		const alphaArray = new Float32Array(vertexCount);
		const paddlePositionArray = new Float32Array(vertexCount * 3);
		const paddleRotationArray = new Float32Array(vertexCount * 3);

		for (let i = 0; i < vertexCount; i++) {
			angleFactorArray[i] = this.angleFactor;
			alphaArray[i] = this.alpha;
			const index = 3 * i;
			paddlePositionArray[index] = this.goal.position.x;
			paddlePositionArray[index + 1] = this.goal.position.y;
			paddlePositionArray[index + 2] = this.goal.position.z;
			paddleRotationArray[index] = this.goal.rotation.x;
			paddleRotationArray[index + 1] = this.goal.rotation.y;
			paddleRotationArray[index + 2] = this.goal.rotation.z;
		}

		this.shield.setVerticesBuffer(new VertexBuffer(this.scene.getEngine(), alphaArray, "alpha", true, false, 1));
		this.shield.setVerticesBuffer(new VertexBuffer(this.scene.getEngine(), angleFactorArray, "angleFactor", true, false, 1));
		this.shield.setVerticesBuffer(new VertexBuffer(this.scene.getEngine(), paddlePositionArray, "paddlePosition", true, false, 3));
		this.shield.setVerticesBuffer(new VertexBuffer(this.scene.getEngine(), paddleRotationArray, "paddleRotation", true, false, 3));
	}

	private spawnShield(): void {
		if (!this.isAlive) return;

		if (this.angleFactor != 1 && this.inputDown == true) {
			this.isActive = 1.0;
			this.alpha = 1.0;
		}
		else {
			this.isActive = 0.0;
			this.alpha = 0.5;
		}

		if (this.inputDown === true) {
			this.lastInputDelay = performance.now();
			this.angleFactor = Math.min(1, this.angleFactor + 0.01);
		} else if (performance.now() - this.lastInputDelay >= 500) {
			this.angleFactor = Math.max(0.5, this.angleFactor - 0.01);
		}
	}

	public getPlayerGoal(): Mesh {
		return this.goal;
	}

	public getShieldAngle(): number {
		return this.angleFactor;
	}

	public getPlayerShield(): Mesh {
		return this.shield;
	}

	public getAlive(): boolean {
		return this.isAlive;
	}

	public getShieldActive(): number {
		return this.isActive;
	}

	isKeyPressed(keyCode: string): boolean {
		return this.keysPressed.has(keyCode);
	}

	private movePlayer() {
		let speed = 1;
		if (this.isKeyPressed("Space")) {
			this.inputDown = true;
		} else if (this.inputDown == true) {
			this.inputDown = false;
		}

		this.inputPointer = this.pointer;
		const ray = this.scene.createPickingRay(this.inputPointer.x, this.inputPointer.y, Matrix.Identity(), null);
		const hit = this.scene.pickWithRay(ray);
		if (hit?.pickedMesh) {
			let targetPosition = hit.pickedPoint!;
			targetPosition.x -= this.game.root.position.x;
			targetPosition.y = this.goal.position.y;
			targetPosition.z -= this.game.root.position.z;

			let direction = targetPosition.subtract(this.goal.position);
			direction.y = 0;
			const distance = direction.length();

			if (distance < 0.01) {
				this.velocity = Vector3.Zero();
			} else {
				this.goal.rotation.y = Math.atan2(direction.x, direction.z);
				direction.normalize();
				speed *= Math.min(distance * 2, 1);
				this.velocity = Vector3.Lerp(this.velocity, direction.scale(speed), 0.5);
			}
		}
		this.updatePosition();
	}

	private updatePosition() {
		this.goal.position.addInPlace(this.velocity.scale(this.deltaTime / 100));
		const distance = Math.hypot(this.goal.position.x, this.goal.position.z);
		if (distance > 5 - 0.5) {
			const factor = (5 - 0.5) / distance;
			this.goal.position.x *= factor;
			this.goal.position.z *= factor;
		}
	}
}
