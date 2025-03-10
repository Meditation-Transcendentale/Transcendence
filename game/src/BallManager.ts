import { Scene, Matrix } from "@babylonjs/core";
import { Ball } from "./objects/ball";

export class BallManager {
    private ball: Ball;
    private instanceIndices: number[] = [];
    private scene: Scene;

    constructor(scene: Scene, numBalls: number) {
        this.scene = scene;
        this.ball = new Ball(scene);

        for (let i = 0; i < numBalls; i++) {
            const initialMatrix = Matrix.Translation(0, 0.25, 0);
            const index = this.ball.addInstance(scene, initialMatrix);
            this.instanceIndices.push(index);
        }
    }

    public updateBall(ballId: number, position: { x: number; y: number }): void {
        const newMatrix = Matrix.Translation(position.x, position.y, 0);
        this.ball.updateInstance(this.instanceIndices[ballId], newMatrix, this.scene);
    }
}
