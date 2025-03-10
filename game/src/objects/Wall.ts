import { Scene, MeshBuilder, StandardMaterial, Mesh, Matrix } from "@babylonjs/core";

export class Wall {
    private static masterMesh: Mesh;

    public static getMasterMesh(scene: Scene): Mesh {
        if (!Wall.masterMesh) {
            Wall.masterMesh = MeshBuilder.CreateBox("wallMaster", { width: 7, height: 1, depth: 0.3 }, scene);
            const material = new StandardMaterial("wallMaterial", scene);
            material.diffuseColor.set(0, 0, 1);
            Wall.masterMesh.material = material;
        }
        return Wall.masterMesh;
    }

    public static addInstance(scene: Scene, instanceMatrix: Matrix): number {
        const master = Wall.getMasterMesh(scene);
        return master.thinInstanceAdd(instanceMatrix);
    }

    public static updateInstance(instanceIndex: number, newMatrix: Matrix, scene: Scene): void {
        const master = Wall.getMasterMesh(scene);
        master.thinInstanceSetMatrixAt(instanceIndex, newMatrix);
        master.thinInstanceBufferUpdated("matrix");
    }
}
