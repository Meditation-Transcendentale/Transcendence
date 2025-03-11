import { MeshBuilder, Matrix, Scene, Mesh, StandardMaterial, Color3 } from "@babylonjs/core";

export class Ball {
    private static masterMesh: Mesh;

    public static getMasterMesh(scene: Scene): Mesh {
        if (!Ball.masterMesh) {
            Ball.masterMesh = MeshBuilder.CreateSphere("ballMaster", { diameter: 0.5 }, scene);
            const ballMaterial = new StandardMaterial("ballMat", scene);
            ballMaterial.diffuseColor = new Color3(1, 0, 0);
            Ball.masterMesh.material = ballMaterial;
        }
        return Ball.masterMesh;
    }

    public static addInstance(scene: Scene, instanceMatrix: Matrix): number {
        const master = Ball.getMasterMesh(scene);
        return master.thinInstanceAdd(instanceMatrix);
    }

    public static updateInstance(instanceIndex: number, newMatrix: Matrix, scene: Scene): void {
        const master = Ball.getMasterMesh(scene);
        master.thinInstanceSetMatrixAt(instanceIndex, newMatrix);
        master.thinInstanceBufferUpdated("matrix");
    }
}
