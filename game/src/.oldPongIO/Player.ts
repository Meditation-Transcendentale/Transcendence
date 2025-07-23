import { MeshBuilder, Scene, Vector3, Mesh, StandardMaterial, Color3, Nullable, Matrix, Axis, VertexBuffer } from "@babylonjs/core";

export class Player {
	private goal: Mesh;
	private shield: Mesh;
	private isPlayer: boolean;
	private alive: boolean = true;
	private materialGoal: StandardMaterial;
	private materialShield: StandardMaterial;
	private velocity: Vector3;
	
	private shieldBaseScale: number = 0.5;
	private shieldScale: number = this.shieldBaseScale;
	private oldShieldScale: number = this.shieldScale;
	
	private tessellation: number = 12;
	private vertexCenter: number = this.tessellation / 2;
	private lastInputDelay: number = performance.now();
	private regenRate: number = 0.01;
	private shieldAngle: number = Math.PI * 0.5 * this.shieldScale;
	
	constructor(scene: Scene, position: Vector3, isPlayer: boolean) {
		this.isPlayer = isPlayer;

		this.goal = MeshBuilder.CreateCylinder("goal", {height: 0.5, diameter:1, subdivisions:16});
		this.materialGoal = new StandardMaterial("goalMat", scene);
		this.materialGoal.diffuseColor = new Color3(1, 0, 0);
		this.goal.material = this.materialGoal;
		this.goal.setAbsolutePosition(position);
		this.velocity = new Vector3(0, 0, 0);

		this.shield = MeshBuilder.CreateCylinder("shield", {height: 0.25, diameter: 1.65, tessellation: this.tessellation, arc: 0.5, enclose: true, updatable: true}, scene);
		this.shield.rotation._y = Math.PI;
		this.materialShield = new StandardMaterial("shieldMat", scene);
		this.materialShield.diffuseColor = new Color3(0, 1, 0);
		this.shield.material = this.materialShield;
		console.log("Angle = ", this.shieldAngle);
		this.spawnShield(1);
		

		this.shield.parent = this.goal;
	}

	public move(): void{
		if (this.goal.position.x + this.velocity.x <= 20 - 0.5 && this.goal.position.x + this.velocity.x >= -20 + 0.5)
			this.goal.position.x += this.velocity.x;
		if (this.goal.position.z + this.velocity.z <= 20 - 0.5 && this.goal.position.z + this.velocity.z >= -20 + 0.5)
			this.goal.position.z += this.velocity.z;
	}

	public spawnShield(visibility: number): void {
		if (!this.alive) return;
		this.shield.visibility = visibility;
	
		if (visibility === 1) {
			this.lastInputDelay = performance.now();
			this.shieldScale = Math.max(0, this.shieldScale - 0.01);
		} else if (performance.now() - this.lastInputDelay >= 500) {
			this.shieldScale = Math.min(this.shieldBaseScale, this.shieldScale + this.regenRate);
		}
		if (this.shieldScale == 0)
			this.shield.visibility = 0;
		if (this.oldShieldScale != this.shieldScale)
		{
			this.shieldAngle = Math.PI * 0.5 * this.shieldScale;
			this.applyVertexRotation();
		}
		this.oldShieldScale = this.shieldScale;
	}
	
	private applyVertexRotation(): void {
		const axis = Axis.Y;
		const center = Vector3.Zero();
		const positions = new Float32Array(this.shield.getVerticesData(VertexBuffer.PositionKind)!);
	
		for (let i = 0; i <= this.tessellation; i++) {
			const angle = ((Math.PI * 0.5) * this.shieldScale) * ((i - this.vertexCenter) / this.vertexCenter);
			const rotationMatrix = Matrix.RotationAxis(axis, angle);
			if (i == this.vertexCenter)
				continue;

			this.updateVertexPositions(i, rotationMatrix, center, positions);
		}

		this.shield.updateVerticesData(VertexBuffer.PositionKind, positions);
	}
	
	private updateVertexPositions(i: number, rotationMatrix: Matrix, center: Vector3, positions: Float32Array): void {
		let indices = this.calculateIndices(i);
		let vertices = indices.map(nV => new Vector3(positions[this.vertexCenter * 3], positions[nV * 3 + 1], positions[this.vertexCenter * 3 + 2])); //issue if tessellation is odd 
		
		vertices.forEach((vertex, index) => {
			vertex.subtractInPlace(center);
			vertices[index] = Vector3.TransformCoordinates(vertex, rotationMatrix).addInPlace(center);
		});

		indices.forEach((nV, index) => {
			positions[nV * 3] = vertices[index].x;
			positions[nV * 3 + 1] = vertices[index].y;
			positions[nV * 3 + 2] = vertices[index].z;
		});
	}
	
	private calculateIndices(i: number): number[] {
		if (i === 0) {
			return [
				i,
				i + this.tessellation + 4,
				i + this.tessellation + 4 + 1,
				i + this.tessellation + 4 + 1 + this.tessellation + 4,
				i + this.tessellation + 4 + 1 + this.tessellation + 4 + 2,
				i + this.tessellation + 4 + 1 + this.tessellation + 4 + 2 + this.tessellation + 2
			];
		} else if (i === this.tessellation) {
			return [
				i,
				i + 1,
				i + 1 + this.tessellation + 4,
				i + 1 + this.tessellation + 4 + 1,
				i + 1 + this.tessellation + 4 + 1 + this.tessellation + 5,
				i + 1 + this.tessellation + 4 + 1 + this.tessellation + 5 + this.tessellation + 2
			];
		}
		return [
			i,
			i + this.tessellation + 5,
			i + this.tessellation + 5 + this.tessellation + 6,
			i + this.tessellation + 5 + this.tessellation + 6 + this.tessellation + 2
		];
	}

	private speed: number = 0.05;
	private stopThreshold: number = 0.05;

	public orientMesh(targetPosition: Nullable<Vector3>): void {
		if (!targetPosition) return;

		targetPosition.y = this.goal.position.y;
		let direction = targetPosition.subtract(this.goal.position);
		const distance = direction.length();
		direction.y = this.goal.position.y;
		if (distance > this.stopThreshold)
			this.goal.rotation.y = Math.atan2(direction.x, direction.z);

		if (distance < this.stopThreshold) { 
			this.velocity = Vector3.Zero();
		} else {
			direction.normalize();
			this.velocity = Vector3.Lerp(this.velocity, direction.scale(this.speed), 0.5);
		}
	}

	public getPlayerGoal(): Mesh{
		return this.goal;
	}
	
	public getShieldAngle(): number {
		return this.shieldAngle;
	}

	public getPlayerShield(): Mesh{
		return this.shield;
	}

	public getAlive(): boolean{
		return this.alive;
	}

	public die(): void {
		this.goal.visibility = 0;
		this.shield.visibility = 0;
		this.alive = false;
	}
}