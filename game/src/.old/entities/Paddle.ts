//import { MeshBuilder, Scene, Vector3, Mesh, StandardMaterial, Color3, TransformNode } from "@babylonjs/core";
//
//export class Paddle {
//    private paddle: Mesh;
//    private playerPos: Vector3;
//    private material!: StandardMaterial;
//
//
//    constructor(scene: Scene, playerPos: Vector3, angle: number, parent: TransformNode) {
//        this.paddle = MeshBuilder.CreateBox("paddle", { width: 2, height: 0.5, depth: 0.5 }, scene);
//        this.paddle.setPivotPoint(playerPos);
//        this.paddle.parent = parent;
//        this.material = new StandardMaterial("paddleMaterial", scene);
//        this.material.diffuseColor = new Color3(0, 0, 1);
//        this.paddle.material = this.material;
//        this.playerPos = playerPos;
//        this.paddle.setAbsolutePosition(playerPos);
//    }
//
//    public move(x: number): void {
//        const minX = this.playerPos.x - 4; // Left wall
//        const maxX = this.playerPos.x + 4;  // Right wall
//
//        this.paddle.position.x = Math.max(minX, Math.min(maxX, this.paddle.position.x + x));
//    }
//
//
//    public updatePosition(x: number): void {
//        this.paddle.position.x = x; // Server-synced movement
//    }
//
//    public getMesh(): Mesh {
//        return this.paddle;
//    }
//    public dispose(): void {
//
//    }
//}
import { Scene, Vector3, Mesh, MeshBuilder, Matrix, StandardMaterial, Color3, Quaternion } from "@babylonjs/core";
import Client from "../core/Client";

export class Paddle {
    private static masterPaddle: Mesh | null = null;
    private static matrices: Matrix[] = [];
    private static targetPositions: Vector3[] = [];
    private static targetRotations: number[] = [];
    private static needsUpdate = false;

    public instanceIndex: number;
    public initialAngle: number;
    public radius: number;
    private currentPosition: Vector3;
    private currentRotation: number;
    private mouvMax: number = 0.08;
    private mouv: number = 0;
    constructor(scene: Scene, position: Vector3, angle: number, arenaRadius: number) {
        if (!Paddle.masterPaddle) {
            Paddle.masterPaddle = MeshBuilder.CreateBox("paddleMaster", { width: 2, height: 0.5, depth: 0.5 }, scene);
            //Paddle.masterPaddle.isVisible = false;
            Paddle.masterPaddle.material = new StandardMaterial("paddleMaterial", scene);
            Paddle.masterPaddle.material.diffuseColor = new Color3(1, 0, 1);
        }

        this.radius = arenaRadius;
        this.instanceIndex = Paddle.matrices.length;
        this.currentPosition = position.clone();
        this.currentRotation = -1 * (angle + 90) * Math.PI / 180;
        this.initialAngle = -1 * (angle + 90) * Math.PI / 180;

        Paddle.matrices.push(Matrix.Compose(Vector3.One(), Quaternion.RotationAxis(new Vector3(0, 1, 0), -1 * (angle + 90) * Math.PI / 180), position));
        Paddle.targetPositions.push(position.clone());
        Paddle.targetRotations.push((-1 * angle + 90) * Math.PI / 180);

        Paddle.masterPaddle.thinInstanceSetBuffer("matrix", Paddle.matrices.flatMap(m => [...m.toArray()]), 16);
    }
    public move(movementAmount: number, client: Client): void {
        this.mouv = Math.max(-this.mouvMax, Math.min(this.mouv + movementAmount * 0.1, this.mouvMax));
        if (this.mouv === this.mouvMax || this.mouv === -this.mouvMax) return;

        const rotationMatrix = Matrix.RotationY(-movementAmount * Math.PI * 0.01);
        this.currentPosition = Vector3.TransformCoordinates(this.currentPosition, rotationMatrix);

        this.currentRotation += -movementAmount * Math.PI * 0.01;

        Paddle.targetPositions[this.instanceIndex].set(this.currentPosition.x, 0.5, this.currentPosition.z);

        client.sendMove(this.currentPosition.clone(), Paddle.targetRotations[this.instanceIndex]);

        Paddle.needsUpdate = true;
        this.update(1 / 60);
    }

    public rotate(newAngle: number): void {
        Paddle.targetRotations[this.instanceIndex] = newAngle;
        Paddle.needsUpdate = true;
    }

    public update(deltaTime: number) {
        const smoothingFactor = 0.1;

        this.currentPosition = Paddle.targetPositions[this.instanceIndex];
        Paddle.matrices[this.instanceIndex] = Matrix.Compose(
            Vector3.One(),
            Quaternion.RotationAxis(Vector3.Up(), this.currentRotation),
            this.currentPosition
        );
        Paddle.needsUpdate = true;
    }
    public updateState(serverPosition: Vector3, serverRotation: number): void {

        this.currentPosition.x = (serverPosition.x);
        this.currentPosition.z = (serverPosition.z);

        this.currentRotation = serverRotation;
        Paddle.matrices[this.instanceIndex] = Matrix.Compose(
            Vector3.One(),
            Quaternion.RotationAxis(Vector3.Up(), this.currentRotation),
            this.currentPosition
        );

        Paddle.needsUpdate = true;
    }
    public static updateAllInstances() {

        if (Paddle.needsUpdate && Paddle.masterPaddle) {
            Paddle.masterPaddle.thinInstanceSetBuffer("matrix", Paddle.matrices.flatMap(m => [...m.toArray()]), 16);
            Paddle.needsUpdate = false;
        }
    }
}

