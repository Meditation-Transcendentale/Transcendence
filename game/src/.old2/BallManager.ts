import { Scene, Matrix } from "@babylonjs/core";
import { Ball } from "./objects/ball";

export class BallManager {
    private instanceIndices: number[] = [];
    private scene: Scene;

    constructor(scene: Scene, numBalls: number) {
        this.scene = scene;

        for (let i = 0; i < numBalls; i++) {
            const initialMatrix = Matrix.Translation(0, 0.25, 0);
            const index = Ball.addInstance(scene, initialMatrix);
            this.instanceIndices.push(index);
        }
    }

    public updateBall(ballId: number, position: { x: number; y: number, z: number }): void {
        const newMatrix = Matrix.Translation(position.x, 0.25, position.z);
        Ball.updateInstance(this.instanceIndices[ballId], newMatrix, this.scene);
    }
}
