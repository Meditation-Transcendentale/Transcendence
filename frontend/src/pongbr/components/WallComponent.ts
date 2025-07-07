import { Vector3 } from "@babylonImport";
import { Component } from "../ecs/Component.js";

export class WallComponent implements Component {
    public id: number;
    public position: Vector3;

    constructor(id: number, position: Vector3) {
        this.id = id;
        this.position = position;
    }
}
