import { Mesh, Scene, MeshBuilder, StandardMaterial } from "@babylonjs/core";

export function calculateArenaRadius(numPlayers: number): number {
    const playerWidth = 7;
    const centralAngleDeg = 360 / numPlayers;
    const halfCentralAngleRad = (centralAngleDeg / 2) * Math.PI / 180;

    const radius = playerWidth / (2 * Math.sin(halfCentralAngleRad));

    return radius;
}

export class Arena {
    public masterMesh: Mesh;

    constructor(scene: Scene, arenaRadius: number) {
        this.masterMesh = MeshBuilder.CreateDisc("arenaDisc", { radius: arenaRadius, tessellation: 64 }, scene);
        this.masterMesh.rotation.x = Math.PI / 2;
        const material = new StandardMaterial("arenaMaterial", scene);
        material.diffuseColor.set(0, 0, 0);
        this.masterMesh.material = material;

        // Optionally set materials or other visual properties.
    }
}
