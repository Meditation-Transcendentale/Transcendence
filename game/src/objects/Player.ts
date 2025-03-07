import { Vector3, Matrix, Scene, Mesh } from '@babylonjs/core';
import { Paddle } from './paddle';

export interface IPlayer {
    zoneId: number;
    zoneCenter: Vector3;
    leftPillarPosition: Vector3;
    rightPillarPosition: Vector3;
    localBaseMatrix: Matrix;
    instanceIndex: number;
    updatePaddleX(newLocalX: number, scene: Scene): void;
}

export class Player implements IPlayer {
    zoneId: number;
    zoneCenter: Vector3;
    leftPillarPosition: Vector3;
    rightPillarPosition: Vector3;
    masterMesh: Mesh;
    localBaseMatrix: Matrix;
    instanceIndex: number;

    constructor(scene: Scene, zoneId: number, totalPlayers: number, arenaRadius: number) {
        this.zoneId = zoneId;
        this.masterMesh = Paddle.getMasterMesh(scene);

        // Calculate center angle for this zone
        const angle = (2 * Math.PI / totalPlayers) * zoneId;
        const offset = arenaRadius * 0.99;
        this.zoneCenter = new Vector3(offset * Math.cos(angle), 0, offset * Math.sin(angle));

        // Calculate pillar positions for visual zone boundaries (optional)
        const zoneAngleWidth = (2 * Math.PI) / totalPlayers;
        const leftAngle = angle - zoneAngleWidth / 2;
        const rightAngle = angle + zoneAngleWidth / 2;
        const pillarOffset = arenaRadius * 0.95;
        this.leftPillarPosition = new Vector3(pillarOffset * Math.cos(leftAngle), 0, pillarOffset * Math.sin(leftAngle));
        this.rightPillarPosition = new Vector3(pillarOffset * Math.cos(rightAngle), 0, pillarOffset * Math.sin(rightAngle));

        this.localBaseMatrix = Matrix.Translation(this.zoneCenter.x, 0.5, this.zoneCenter.z);
        this.instanceIndex = Paddle.addInstance(scene, this.localBaseMatrix);
    }

    public updatePaddleX(newLocalX: number, scene: Scene): void {
        const localTranslationMatrix = Matrix.Translation(newLocalX, 0, 0);
        const finalMatrix = localTranslationMatrix.multiply(this.localBaseMatrix);
        //const finalMatrix = parentMatrix.multiply(updatedLocalMatrix);
        Paddle.updateInstance(this.instanceIndex, finalMatrix, scene);
    }
}
