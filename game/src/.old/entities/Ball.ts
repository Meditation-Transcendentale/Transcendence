import { MeshBuilder, Scene, Vector3, Mesh, StandardMaterial, Matrix, Color3 } from "@babylonjs/core";
export class Ball {
    private static masterBall: Mesh | null = null;
    private static matrices: Matrix[] = [];
    private static needsUpdate = false;
    private targetPosition: Vector3 = new Vector3(0, 0, 0);
    public velocity: Vector3 = new Vector3(0, 0, 0);
    public position: Vector3 = new Vector3(0, 0, 0);
    public instanceIndex: number;

    constructor(scene: Scene, position: Vector3) {
        if (!Ball.masterBall) {
            Ball.masterBall = MeshBuilder.CreateSphere("masterBall", { diameter: 1 }, scene);
            //Ball.masterBall.isVisible = false; // Hide the master mesh
            Ball.masterBall.material = new StandardMaterial("ballmaterial", scene);
            Ball.masterBall.material.diffuseColor = new Color3(1, 1, 0);
        }

        // Create thin instance
        this.setPosition(position);
        this.instanceIndex = Ball.matrices.length;
        Ball.matrices.push(Matrix.Translation(position.x, 0.5, position.z));
        //Ball.matrices.flatMap(m => [...m.toArray()]);
        Ball.masterBall.thinInstanceSetBuffer("matrix", Ball.matrices.flatMap(m => [...m.toArray()]), 16);
    }

    public updatePosition(x: number, z: number, vx: number, vz: number): void {
        this.targetPosition.set(x, 0.25, z);
        this.velocity.set(vx, 0, vz);
    }

    public update(delta: number): void {
        // Linear interpolation for smooth movement
        this.position.x += (this.targetPosition.x - this.position.x) * 0.1;
        this.position.z += (this.targetPosition.z - this.position.z) * 0.1;

        // Simulate real movement based on velocity
        this.position.x += this.velocity.x * delta;
        this.position.z += this.velocity.z * delta;
        Ball.matrices[this.instanceIndex].setTranslation(new Vector3(this.position.x, 0.5, this.position.z));
        Ball.needsUpdate = true;
        //this.instanceMatrix.setTranslation(this.position);
        //Ball.masterBall?.thinInstanceBufferUpdated("matrix");
    }

    public static updateAllInstances() {
        if (Ball.needsUpdate && Ball.masterBall) {
            Ball.masterBall.thinInstanceSetBuffer("matrix", Ball.matrices.flatMap(m => [...m.toArray()]), 16);
            Ball.needsUpdate = false; // Reset update flag
        }
    }

    public getPosition(): Vector3 {
        return this.position;
    }

    public getVelocity(): Vector3 {
        return this.velocity;
    }

    public setPosition(position: Vector3): void {
        this.position.x = position.x;
        this.position.z = position.z;
    }

    public setVelocity(velocity: Vector3): void {
        this.velocity.copyFrom(velocity);
    }
}
