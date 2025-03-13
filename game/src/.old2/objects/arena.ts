import { Mesh, Scene, MeshBuilder, StandardMaterial, Matrix } from "@babylonjs/core";

export function calculateArenaRadius(numPlayers: number): number {
    const playerWidth = 7;
    const centralAngleDeg = 360 / numPlayers;
    const halfCentralAngleRad = (centralAngleDeg / 2) * Math.PI / 180;

    const radius = playerWidth / (2 * Math.sin(halfCentralAngleRad));

    return radius;
}
export class Arena {
    public masterMesh: Mesh;
    public pillarMasterMesh: Mesh;
    public pillarInstanceIndices: number[] = [];
    public radius: number;

    constructor(scene: Scene, arenaRadius: number, numPlayers: number) {
        this.radius = arenaRadius;

        this.masterMesh = MeshBuilder.CreateDisc("arenaDisc", {
            radius: arenaRadius,
            tessellation: 128
        }, scene);
        const material = new StandardMaterial("arenaMaterial", scene);
        material.diffuseColor.set(0, 0, 0);
        this.masterMesh.rotation.x = Math.PI / 2;
        this.masterMesh.material = material;

        this.createPillars(scene, numPlayers);
    }

    private createPillars(scene: Scene, numPlayers: number): void {
        const pillarRadius = this.radius * 1.00;

        this.pillarMasterMesh = MeshBuilder.CreateBox("pillarMaster", {
            width: 0.2,
            height: 1.5,
            depth: 0.2,
        }, scene);

        const material = new StandardMaterial("pillarMaterial", scene);
        material.diffuseColor.set(0, 1, 0);
        this.pillarMasterMesh.material = material;

        for (let i = 0; i < numPlayers; i++) {
            const angle = (2 * Math.PI / numPlayers) * i + (Math.PI / numPlayers);
            const x = pillarRadius * Math.cos(angle);
            const z = pillarRadius * Math.sin(angle);

            let pillarMatrix = Matrix.Translation(x, 0.75, z);
            const tangentangle = angle + Math.PI / 2;
            const rotationMatrix = Matrix.RotationY(-tangentangle);
            pillarMatrix = rotationMatrix.multiply(pillarMatrix);
            const index = this.pillarMasterMesh.thinInstanceAdd(pillarMatrix);
            this.pillarInstanceIndices.push(index);
        }
    }
}
//export class Arena {
//    public masterMesh: Mesh;
//
//    constructor(scene: Scene, arenaRadius: number) {
//        this.masterMesh = MeshBuilder.CreateDisc("arenaDisc", { radius: arenaRadius, tessellation: 64 }, scene);
//        this.masterMesh.rotation.x = Math.PI / 2;
//        const material = new StandardMaterial("arenaMaterial", scene);
//        material.diffuseColor.set(0, 0, 0);
//        this.masterMesh.material = material;
//
//        // Optionally set materials or other visual properties.
//    }
//}
