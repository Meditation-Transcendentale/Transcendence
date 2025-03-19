import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { InputComponent } from "../components/InputComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { ShieldComponent } from "../components/ShieldComponent.js";

export class ShieldSystem extends System {
	update(entities: Entity[], deltaTime: number): void {
		entities.forEach(entity => {
			if (entity.hasComponent(PaddleComponent) && entity.hasComponent(InputComponent) && entity.hasComponent(ShieldComponent)) {
				const player = entity.getComponent(PaddleComponent)!;
				const shield = entity.getComponent(ShieldComponent)!;
				const input = entity.getComponent(InputComponent)!;
				this.spawnShield(input, player, shield);
			}
		});
	}

	private spawnShield(input: InputComponent, player: PaddleComponent, shield: ShieldComponent): void {
		if (!player.isAlive) return;

		if (shield.angleFactor != 0)
			shield.isActive = input.down;
	
		if (input.down === true) {
			shield.lastInputDelay = performance.now();
			shield.angleFactor = Math.max(0, shield.angleFactor - 0.01);
		} else if (performance.now() - shield.lastInputDelay >= 500) {
			shield.angleFactor = Math.min(0.5, shield.angleFactor + 0.01);
		}
		if (shield.angleFactor == 0)
			shield.isActive = false;

		if (shield.oldAngleFactor != shield.angleFactor)
			shield.angle = Math.PI * 0.5 * shield.angleFactor;

		shield.oldAngleFactor = shield.angleFactor;
	}
	
	// private applyVertexRotation(player: PaddleComponent): void {
	// 	const axis = Axis.Y;
	// 	const center = Vector3.Zero();
	// 	const positions = new Float32Array(this.shield.getVerticesData(VertexBuffer.PositionKind)!);
	
	// 	for (let i = 0; i <= this.tessellation; i++) {
	// 		const angle = ((Math.PI * 0.5) * this.shieldScale) * ((i - this.vertexCenter) / this.vertexCenter);
	// 		const rotationMatrix = Matrix.RotationAxis(axis, angle);
	// 		if (i == this.vertexCenter)
	// 			continue;

	// 		this.updateVertexPositions(i, rotationMatrix, center, positions);
	// 	}

	// 	this.shield.updateVerticesData(VertexBuffer.PositionKind, positions);
	// }
	
	// private updateVertexPositions(i: number, rotationMatrix: Matrix, center: Vector3, positions: Float32Array): void {
	// 	let indices = this.calculateIndices(i);
	// 	let vertices = indices.map(nV => new Vector3(positions[this.vertexCenter * 3], positions[nV * 3 + 1], positions[this.vertexCenter * 3 + 2])); //issue if tessellation is odd 
		
	// 	vertices.forEach((vertex, index) => {
	// 		vertex.subtractInPlace(center);
	// 		vertices[index] = Vector3.TransformCoordinates(vertex, rotationMatrix).addInPlace(center);
	// 	});

	// 	indices.forEach((nV, index) => {
	// 		positions[nV * 3] = vertices[index].x;
	// 		positions[nV * 3 + 1] = vertices[index].y;
	// 		positions[nV * 3 + 2] = vertices[index].z;
	// 	});
	// }
	
	// private calculateIndices(i: number): number[] {
	// 	if (i === 0) {
	// 		return [
	// 			i,
	// 			i + this.tessellation + 4,
	// 			i + this.tessellation + 4 + 1,
	// 			i + this.tessellation + 4 + 1 + this.tessellation + 4,
	// 			i + this.tessellation + 4 + 1 + this.tessellation + 4 + 2,
	// 			i + this.tessellation + 4 + 1 + this.tessellation + 4 + 2 + this.tessellation + 2
	// 		];
	// 	} else if (i === this.tessellation) {
	// 		return [
	// 			i,
	// 			i + 1,
	// 			i + 1 + this.tessellation + 4,
	// 			i + 1 + this.tessellation + 4 + 1,
	// 			i + 1 + this.tessellation + 4 + 1 + this.tessellation + 5,
	// 			i + 1 + this.tessellation + 4 + 1 + this.tessellation + 5 + this.tessellation + 2
	// 		];
	// 	}
	// 	return [
	// 		i,
	// 		i + this.tessellation + 5,
	// 		i + this.tessellation + 5 + this.tessellation + 6,
	// 		i + this.tessellation + 5 + this.tessellation + 6 + this.tessellation + 2
	// 	];
	// }
}
