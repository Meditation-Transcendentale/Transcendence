import { Vector3 } from "@babylonjs/core";
import { Component } from "../ecs/Component.js";

export class BallComponent implements Component {
    public id: number;
    public position: Vector3;
    public velocity: Vector3;
	public destroy: boolean;

    constructor(id: number, position: Vector3, velocity: Vector3) {
        this.id = id;
        this.position = position;
        this.velocity = velocity;
		this.destroy = false;
    }
}
