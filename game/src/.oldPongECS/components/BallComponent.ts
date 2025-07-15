import { Vector3 } from "@babylonjs/core";
import { Component } from "../ecs/Component.js";

export class BallComponent implements Component {
    public position: Vector3;
    public velocity: Vector3;

    constructor(position: Vector3, velocity: Vector3) {
        this.position = position;
        this.velocity = velocity;
    }
}
