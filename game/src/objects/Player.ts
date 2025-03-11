import { Vector3, Matrix, Scene, Mesh } from '@babylonjs/core';
import { Paddle } from './paddle';
import { Wall } from "./Wall";

export interface IPlayer {
    zoneId: number;
    zoneCenter: Vector3;
    leftPillarPosition: Vector3;
    rightPillarPosition: Vector3;
    localBaseMatrix: Matrix;
    instanceIndex: number;
    predictedX: number;
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
    public predictedX: number = 0;
    public maxOffset: number;
    public wallInstanceIndex?: number;

    constructor(scene: Scene, zoneId: number, totalPlayers: number, arenaRadius: number) {
        this.zoneId = zoneId;
        //console.log(zoneId);
        this.masterMesh = Paddle.getMasterMesh(scene);

        const angle = (2 * Math.PI / totalPlayers) * zoneId;
        const offset = arenaRadius * 1;
        this.zoneCenter = new Vector3(offset * Math.cos(angle), 0, offset * Math.sin(angle));

        const zoneAngleWidth = (2 * Math.PI) / totalPlayers;
        const leftAngle = angle - zoneAngleWidth / 2;
        const rightAngle = angle + zoneAngleWidth / 2;
        const pillarOffset = arenaRadius * 1;
        this.leftPillarPosition = new Vector3(pillarOffset * Math.cos(leftAngle), 0, pillarOffset * Math.sin(leftAngle));
        this.rightPillarPosition = new Vector3(pillarOffset * Math.cos(rightAngle), 0, pillarOffset * Math.sin(rightAngle));
        const chordLength = 2 * pillarOffset * Math.sin(zoneAngleWidth / 2);
        this.maxOffset = chordLength / 2 - 0.56;
        console.log(this.maxOffset);
        this.localBaseMatrix = Matrix.Translation(this.zoneCenter.x, 0.5, this.zoneCenter.z);
        const tangentangle = angle + Math.PI / 2;
        const rotationMatrix = Matrix.RotationY(-tangentangle);
        this.localBaseMatrix = rotationMatrix.multiply(this.localBaseMatrix);
        this.instanceIndex = Paddle.addInstance(scene, this.localBaseMatrix);
    }

    public updatePaddleX(newLocalX: number, scene: Scene): void {
        const clampedX = Math.max(-this.maxOffset, Math.min(newLocalX, this.maxOffset));
        const localTranslationMatrix = Matrix.Translation(clampedX, 0, 0);
        const finalMatrix = localTranslationMatrix.multiply(this.localBaseMatrix);
        Paddle.updateInstance(this.instanceIndex, finalMatrix, scene);
        this.predictedX = clampedX;
    }
    public showWall(scene: Scene): void {
        const midX = (this.leftPillarPosition.x + this.rightPillarPosition.x) / 2;
        const midZ = (this.leftPillarPosition.z + this.rightPillarPosition.z) / 2;
        const wallPosition = new Vector3(midX, 0.5, midZ);

        const wallTranslation = Matrix.Translation(wallPosition.x, wallPosition.y, wallPosition.z);

        const wallAngle = Math.atan2(wallPosition.z, wallPosition.x) + Math.PI / 2;
        const wallRotation = Matrix.RotationY(-wallAngle);

        const wallMatrix = wallRotation.multiply(wallTranslation);

        if (this.wallInstanceIndex === undefined) {
            this.wallInstanceIndex = Wall.addInstance(scene, wallMatrix);
        } else {
            Wall.updateInstance(this.wallInstanceIndex, wallMatrix, scene);
        }
    }

    public hideWall(scene: Scene): void {
        if (this.wallInstanceIndex !== undefined) {
            const offScreenMatrix = Matrix.Translation(10000, 10000, 10000);
            Wall.updateInstance(this.wallInstanceIndex, offScreenMatrix, scene);
        }
    }
}
