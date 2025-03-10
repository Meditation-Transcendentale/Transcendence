import { MeshBuilder, Matrix, Scene, Mesh, StandardMaterial, Color3 } from "@babylonjs/core";

export class Ball {
    private masterMesh: Mesh;

    constructor(scene: Scene) {
        this.masterMesh = MeshBuilder.CreateSphere("ballMaster", { diameter: 0.5 }, scene);
        const ballMaterial = new StandardMaterial("ballMat", scene);
        ballMaterial.diffuseColor = new Color3(1, 0, 0);
        this.masterMesh.material = ballMaterial;
    }

    public addInstance(scene: Scene, instanceMatrix: Matrix): number {
        return this.masterMesh.thinInstanceAdd(instanceMatrix);
    }

    public updateInstance(instanceIndex: number, newMatrix: Matrix, scene: Scene): void {
        this.masterMesh.thinInstanceSetMatrixAt(instanceIndex, newMatrix);
        this.masterMesh.thinInstanceBufferUpdated("matrix");
    }
}
