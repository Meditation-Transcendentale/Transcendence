import { MeshBuilder, Scene, Vector3, Vector2, Mesh, StandardMaterial, Color3, Matrix, ShaderMaterial, Effect, VertexBuffer } from "@babylonjs/core";
import { Game } from './main.ts'

export class Player {
	public goal: Mesh;
	public shield: Mesh;
	public pointerSurface: Mesh;
	private game: Game;
	private isAlive: boolean = true;
	private materialGoal: StandardMaterial;
	private materialShield: StandardMaterial;
	private velocity: Vector3;
	
	private angleFactor: number;
	// private oldAngleFactor: number;
	private lastInputDelay: number;
	private isActive: number = 0.0;
	private inputDown: boolean = false;
	private inputPointer: any;

	private keysPressed: Set<string> = new Set();
	private pointer: Vector2 = new Vector2(0, 0);

	private scene: Scene;

	private deltaTime: number = 1000/60;
	
	constructor(scene: Scene, position: Vector3, game: Game) {
		this.scene = scene;
		this.game = game;

		this.goal = MeshBuilder.CreateCylinder("goal", {height: 0.5, diameter:1, subdivisions:16}, this.scene);
		this.materialGoal = new StandardMaterial("goalMat", this.scene);
		this.materialGoal.diffuseColor = new Color3(1, 0, 0);
		this.goal.material = this.materialGoal;
		this.goal.setAbsolutePosition(position);
		this.velocity = new Vector3(0, 0, 0);

		this.shield = MeshBuilder.CreateCylinder("shield", {height: 0.25, diameter: 1.65, tessellation: 64, arc: 0.5, enclose: true, updatable: true}, this.scene);
		this.shield.rotation.y = Math.PI;
		this.materialShield = new StandardMaterial("shieldMat", this.scene);
		this.materialShield.diffuseColor = new Color3(0, 1, 0);
		this.shield.material = this.materialShield;

		this.angleFactor = 0.5;
		// this.oldAngleFactor = 0.5;
		this.isActive = 0.0;
		this.lastInputDelay = performance.now();

		this.spawnShield();

		window.addEventListener("keydown", (e) => {
			this.keysPressed.add(e.code);
			console.log(e.code);
		});
		window.addEventListener("keyup", (e) => this.keysPressed.delete(e.code));
		window.addEventListener("pointermove", (e) => {
			this.pointer.x = e.clientX;
			this.pointer.y = e.clientY;
		});

		this.pointerSurface = MeshBuilder.CreatePlane("surface", {size: 40, sideOrientation: Mesh.DOUBLESIDE}, this.scene);
		const invMat = new StandardMaterial("surfaceMat", this.scene);
		invMat.diffuseColor.set(0, 0, 0);
		invMat.alpha = 0;
		this.pointerSurface.position.y = 0;
		this.pointerSurface.material = invMat;
		this.pointerSurface.rotation.x = Math.PI / 2;
		this.pointerSurface.isPickable = true;

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
				float newAngle = mix(angle, 0.0, angleFactor) - paddleRotation.y + PI * 1.5;
				float radius = length(vec2(position.x, position.z));
				vec2 newXZ = vec2(cos(newAngle), sin(newAngle)) * radius;
				vec3 newPosition = vec3(newXZ.x, position.y, newXZ.y);

				newPosition -= paddlePosition;
				gl_Position = worldViewProjection * vec4(newPosition, 1.0);
			}
		`;

		let shaderMaterial = new ShaderMaterial('custom', this.scene, 'custom', {
			attributes: ['position', 'normal', 'angleFactor', 'isActive', 'paddlePosition', 'paddleRotation'],
			uniforms: ['world', 'worldViewProjection']
		});
		this.shield.material = shaderMaterial;
	}

	public die(): void {
		this.goal.visibility = 0;
		this.shield.visibility = 0;
		this.isAlive = false;
		//interface de fin de game
		this.game.dispose();
	}

	update(): void {
		this.movePlayer();
		this.spawnShield();
		const vertexCount = this.shield.getTotalVertices();

		const angleFactorArray = new Float32Array(vertexCount);
		const isActiveArray = new Float32Array(vertexCount);
		const paddlePositionArray = new Float32Array(vertexCount * 3);
		const paddleRotationArray = new Float32Array(vertexCount * 3);

		for (let i = 0; i < vertexCount; i++) {
			angleFactorArray[i] = this.angleFactor;
			isActiveArray[i] = this.isActive;
			const index = 3 * i;
			paddlePositionArray[index] = this.goal.position.x;
			paddlePositionArray[index + 1] = this.goal.position.y;
			paddlePositionArray[index + 2] = this.goal.position.z;
			paddleRotationArray[index] = this.goal.rotation.x;
			paddleRotationArray[index + 1] = this.goal.rotation.y;
			paddleRotationArray[index + 2] = this.goal.rotation.z;
		}

		this.shield.setVerticesBuffer(new VertexBuffer(this.scene.getEngine(), angleFactorArray, "angleFactor", true, false, 1));
		this.shield.setVerticesBuffer(new VertexBuffer(this.scene.getEngine(), isActiveArray, "isActive", true, false, 1));
		this.shield.setVerticesBuffer(new VertexBuffer(this.scene.getEngine(), paddlePositionArray, "paddlePosition", true, false, 3));
		this.shield.setVerticesBuffer(new VertexBuffer(this.scene.getEngine(), paddleRotationArray, "paddleRotation", true, false, 3));
	}

	private spawnShield(): void {
		if (!this.isAlive) return;

		if (this.angleFactor != 1 && this.inputDown == true)
			this.isActive = 1.0;
		else
			this.isActive = 0.0;

		if (this.inputDown === true) {
			this.lastInputDelay = performance.now();
			this.angleFactor = Math.min(1, this.angleFactor + 0.01);
		} else if (performance.now() - this.lastInputDelay >= 500) {
			this.angleFactor = Math.max(0.5, this.angleFactor - 0.01);
		}
	}

	public getPlayerGoal(): Mesh{
		return this.goal;
	}
	
	public getShieldAngle(): number {
		return this.angleFactor;
	}

	public getPlayerShield(): Mesh{
		return this.shield;
	}

	public getAlive(): boolean{
		return this.isAlive;
	}

	public getShieldActive(): number{
		return this.isActive;
	}

	isKeyPressed(keyCode: string): boolean {
		return this.keysPressed.has(keyCode);
	} 

	private movePlayer() {
		let speed = 0.3;
		if (this.isKeyPressed("Space")) {
			this.inputDown = true;
		} else if (this.inputDown == true){
			this.inputDown = false;
		}
		this.inputPointer = this.pointer;
		const ray = this.scene.createPickingRay(this.inputPointer.x, this.inputPointer.y, Matrix.Identity(), null);
		const hit = this.scene.pickWithRay(ray);
		if (hit?.pickedMesh) {
			let targetPosition = hit.pickedPoint!;
			targetPosition.y = this.goal.position.y;

			let direction = targetPosition.subtract(this.goal.position);
			const distance = direction.length();
			direction.y = this.goal.position.y;

			if (distance < 0.01){
				this.velocity = Vector3.Zero();
			} else {
				this.goal.rotation.y = Math.atan2(direction.x, direction.z);
				direction.normalize();
				speed *= Math.min(distance, 1);
				this.velocity = Vector3.Lerp(this.velocity, direction.scale(speed), 0.5);
			}
		}
		this.updatePosition();
	}
    
	private updatePosition(){
		this.goal.position.addInPlace(this.velocity.scale(this.deltaTime / 100));
		const distance = Math.hypot(this.goal.position.x, this.goal.position.z);
		if ( distance > 5 - 0.5){
			const factor = (5 - 0.5) / distance;
			this.goal.position.x *= factor;
			this.goal.position.z *= factor;
		} 
	}
}