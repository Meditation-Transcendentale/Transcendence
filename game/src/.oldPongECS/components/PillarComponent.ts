import { Vector3 } from "@babylonjs/core";
import { Component } from "../ecs/Component.js";

export class PillarComponent implements Component {
    public position: Vector3;

    constructor(position: Vector3) {
        this.position = position;
    }
}
