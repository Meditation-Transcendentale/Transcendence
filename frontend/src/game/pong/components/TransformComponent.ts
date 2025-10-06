import { Vector3, } from "../../../babylon"
import { Component } from "../ecs/Component.js";

export class TransformComponent implements Component {
	public position: Vector3;
	public basePosition: Vector3; // new property for clamping offset
	public rotation: Vector3;
	public scale: Vector3;
	public parent?: number;

	constructor(
		position?: Vector3,
		rotation?: Vector3,
		scale?: Vector3,
		parent?: number
	) {
		this.position = position || Vector3.Zero();
		this.basePosition = position ? position.clone() : Vector3.Zero();
		this.rotation = rotation || Vector3.Zero();
		this.scale = scale || new Vector3(1, 1, 1);
		this.parent = parent;
	}
}
