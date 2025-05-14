// debug/DebugVisualizer.ts
import { Scene, MeshBuilder, StandardMaterial, Mesh, Color3 } from "@babylonjs/core";

export interface DebugWall {
	id: number;
	x: number;
	y: number;
	rotation: number;
}

export interface DebugData {
	walls: DebugWall[];
}

export class DebugVisualizer {
	private scene: Scene;
	private wallMeshes: Map<number, Mesh> = new Map();

	constructor(scene: Scene) {
		this.scene = scene;
	}

	updateDebugData(debug: DebugData) {
		// Update or create meshes for each wall.
		debug.walls.forEach((wall) => {
			if (this.wallMeshes.has(wall.id)) {
				const mesh = this.wallMeshes.get(wall.id)!;
				mesh.position.x = wall.x;
				// Use Z for "y" coordinate.
				mesh.position.z = wall.y;
				mesh.rotation.y = wall.rotation;
			} else {
				const mesh = MeshBuilder.CreateBox(`debugWall_${wall.id}`, {
					width: 7,   // Adjust to match your wall dimensions
					height: 2,  // Adjust as needed
					depth: 0.5  // Adjust as needed
				}, this.scene);
				mesh.position.x = wall.x;
				mesh.position.z = wall.y;
				mesh.rotation.y = wall.rotation;
				const mat = new StandardMaterial(`debugWallMat_${wall.id}`, this.scene);
				mat.wireframe = true;
				mat.emissiveColor = new Color3(1, 0, 0); // Red wireframe
				mesh.material = mat;
				this.wallMeshes.set(wall.id, mesh);
			}
		});

		// Remove any wall meshes that are no longer present.
		const currentIds = new Set(debug.walls.map(w => w.id));
		this.wallMeshes.forEach((mesh, id) => {
			if (!currentIds.has(id)) {
				mesh.dispose();
				this.wallMeshes.delete(id);
			}
		});
	}
}

