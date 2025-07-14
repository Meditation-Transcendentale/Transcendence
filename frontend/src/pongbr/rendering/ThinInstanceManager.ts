import { Mesh, Matrix, Vector3, Quaternion, Camera } from "@babylonImport";
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

	constructor(mesh: Mesh, capacity: number, updateThreshold: number = 300, cullThreshold: number = 500) {
		this.mesh = mesh;
		this.capacity = capacity;
		this.instanceTransforms = new Float32Array(capacity * 16);
		this.mesh.thinInstanceSetBuffer("matrix", this.instanceTransforms, 16);
		//this.mesh.doNotSyncBoundingInfo = true;
		this.updateThreshold = updateThreshold;
		this.cullThreshold = cullThreshold;
		this.mesh.setBoundingInfo((this.mesh.getScene()?.getMeshByName("arenaBox") as Mesh).getBoundingInfo());
		this.mesh.doNotSyncBoundingInfo = true;
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
		//const parentEntity = transform.parent;
		//if (parentEntity) {
		//	const parentMatrix = parentEntity.getWorldMatrix();
		//	const parent = parentMatrix.clone().invert();
		//	localMatrix = parentMatrix.multiply(localMatrix);
		//}
		return localMatrix;
	}

	update(entities: Entity[], componentClass: any, camera: Camera, frameCount: number): void {
		let count = 0;
		entities.forEach(entity => {
			if (entity.hasComponent(componentClass)) {
				if (entity.hasComponent(TransformComponent) && entity.hasComponent(PaddleComponent)) {
					const xf = entity.getComponent(TransformComponent);
					const paddle = entity.getComponent(PaddleComponent);
					const yaw = xf.rotation.y;
					const θ = yaw;

					// Replace 200 with your actual arena radius
					const R = 200;
					const x = Math.cos(θ) * R;
					const z = Math.sin(θ) * R;
					const y = xf.position.y;
					console.log(
						`Paddle ${paddle.id}: worldPos=(${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)}) ` +
						`yaw=${yaw.toFixed(2)}`
					);
				}
				let matrix: Matrix;
				if (entity.hasComponent(TransformComponent)) {
					matrix = this.computeWorldMatrix(entity, entities);
				} else {
					const comp = entity.getComponent(componentClass) as { position: Vector3 };
					matrix = Matrix.Translation(comp.position.x, comp.position.y, comp.position.z);
				}
				matrix.copyToArray(this.instanceTransforms, count * 16);
				count++;
			}
		});
		this.mesh.thinInstanceSetBuffer("matrix", this.instanceTransforms, 16, true);
		this.mesh.thinInstanceCount = count;
		this.mesh.thinInstanceRefreshBoundingInfo(true);
	}
}
