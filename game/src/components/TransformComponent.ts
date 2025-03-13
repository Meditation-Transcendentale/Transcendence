import { Vector3 } from "@babylonjs/core";
import { Component } from "../ecs/Component.js";

export class TransformComponent implements Component {
    public position: Vector3;
    public rotation: Vector3; // Euler angles (in radians)
    public scale: Vector3;
    public parent?: number; // Optional parent entity id

    constructor(
        position?: Vector3,
        rotation?: Vector3,
        scale?: Vector3,
        parent?: number
    ) {
        this.position = position || Vector3.Zero();
        this.rotation = rotation || Vector3.Zero();
        this.scale = scale || new Vector3(1, 1, 1);
        this.parent = parent;
    }
}
