import { Camera, Vector3, Mesh, Matrix, Quaternion } from "@babylonImport";
import { Entity } from "../ecs/Entity.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";

export class ThinInstanceManager {
	private mesh: Mesh;
	private capacity: number;
	private instanceTransforms: Float32Array;

	// LOD/culling thresholds (world units)
	private updateThreshold: number;
	private cullThreshold: number;

	private instanceColors: Float32Array;

	constructor(mesh: Mesh, capacity: number, updateThreshold: number = 300, cullThreshold: number = 500) {
		this.mesh = mesh;
		this.capacity = capacity;
		this.instanceTransforms = new Float32Array(capacity * 16);
		this.mesh.thinInstanceSetBuffer("matrix", this.instanceTransforms, 16);
		this.updateThreshold = updateThreshold;
		this.cullThreshold = cullThreshold;
		this.instanceColors = new Float32Array(capacity * 4);
		for (let i = 0; i < capacity; i++) {
			if (i === 0 || i === 1) {
				this.instanceColors[i * 4 + 0] = 1; // rouge
				this.instanceColors[i * 4 + 1] = 1;
				this.instanceColors[i * 4 + 2] = 1;
				this.instanceColors[i * 4 + 3] = 1; // alpha
			} else {
				this.instanceColors[i * 4 + 0] = 1; // rouge
				this.instanceColors[i * 4 + 1] = 0;
				this.instanceColors[i * 4 + 2] = 0;
				this.instanceColors[i * 4 + 3] = 1; // alpha
			}
		}
		this.mesh.thinInstanceSetBuffer("instanceColor", this.instanceColors, 4);
	}

	private computeWorldMatrix(entity: Entity, allEntities: Entity[]): Matrix {
		const transform = entity.getComponent(TransformComponent);
		if (!transform) {
			return Matrix.Translation(0, 0, 0);
		}
		// console.log("Entity", entity.id, "rotation:", transform.rotation.toString());

		const rotationQuaternion = Quaternion.FromEulerVector(transform.rotation);
		let localMatrix = Matrix.Compose(
			transform.scale,
			rotationQuaternion,
			transform.position
		);
		if (transform.parent !== undefined) {
			const parentEntity = allEntities.find(e => e.id === transform.parent);
			if (parentEntity) {
				const parentMatrix = this.computeWorldMatrix(parentEntity, allEntities);
				localMatrix = parentMatrix.multiply(localMatrix);
			}
		}
		return localMatrix;
	}

	update(entities: Entity[], componentClass: any, camera: Camera, frameCount: number): void {
		let count = 0;
		entities.forEach(entity => {
			if (entity.hasComponent(componentClass)) {
				let matrix: Matrix;
				if (entity.hasComponent(TransformComponent)) {
					matrix = this.computeWorldMatrix(entity, entities);
				} else {
					const comp = entity.getComponent(componentClass) as { position: Vector3 };
					matrix = Matrix.Translation(comp.position.x, comp.position.y, comp.position.z);
				}
				const pos = Vector3.TransformCoordinates(Vector3.Zero(), matrix);
				const distance = Vector3.Distance(camera.position, pos);
				let shouldUpdate = true;
				// if (distance > this.cullThreshold) {
				// 	shouldUpdate = false;
				// } else if (distance > this.updateThreshold) {
				// 	if (frameCount % 5 !== 0) {
				// 		shouldUpdate = false;
				// 	}
				// }
				// shouldUpdate = true;
				if (shouldUpdate) {
					matrix.copyToArray(this.instanceTransforms, count * 16);
				}
				count++;
			}
		});
		this.mesh.thinInstanceSetBuffer("matrix", this.instanceTransforms, 16, true);
		this.mesh.thinInstanceCount = count;
	}
}
