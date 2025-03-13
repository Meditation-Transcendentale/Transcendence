import { MeshBuilder, Matrix, Scene, Mesh, StandardMaterial } from "@babylonjs/core";

export class Paddle {
    private static masterMesh: Mesh;

    public static getMasterMesh(scene: Scene): Mesh {
        if (!Paddle.masterMesh) {
            Paddle.masterMesh = MeshBuilder.CreateBox("paddleMaster", { width: 1, height: 0.2, depth: 0.1 }, scene);
            const material = new StandardMaterial("paddleMaterial", scene);
            material.diffuseColor.set(1, 0, 0);
            Paddle.masterMesh.material = material;
        }
        return Paddle.masterMesh;
    }

    public static addInstance(scene: Scene, instanceMatrix: Matrix): number {
        const master = Paddle.getMasterMesh(scene);
        return master.thinInstanceAdd(instanceMatrix);
    }

    public static updateInstance(instanceIndex: number, newMatrix: Matrix, scene: Scene): void {
        const master = Paddle.getMasterMesh(scene);
        master.thinInstanceSetMatrixAt(instanceIndex, newMatrix);
        master.thinInstanceBufferUpdated("matrix");
    }
}
