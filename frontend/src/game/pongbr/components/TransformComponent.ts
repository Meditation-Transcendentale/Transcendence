import { TransformNode, Vector3 } from "../../../babylon";
import { Component } from "../ecs/Component.js";

export class TransformComponent implements Component {
	public position: Vector3;
	public basePosition: Vector3;
	public rotation: Vector3;
	public scale: Vector3;
	public baseScale: Vector3;
	public parent: TransformNode;
	public enabled: boolean = true;
	public static key = "TransformComponent";

	constructor(
		position: Vector3,
		rotation: Vector3,
		scale: Vector3,
		parent: TransformNode
	) {
		this.position = position || Vector3.Zero();
		this.basePosition = position ? position.clone() : Vector3.Zero();
		this.rotation = rotation || Vector3.Zero();
		this.scale = scale || new Vector3(1, 1, 1);
		this.baseScale = this.scale.clone();
		this.parent = parent;
	}

	enable() {
		this.enabled = true;
		this.scale = this.baseScale.clone();
	}

	disable() {
		this.enabled = false;
		this.scale = Vector3.Zero();
	}

	setEnabled(enabled: boolean) {
		if (enabled) {
			this.enable();
		} else {
			this.disable();
		}
	}

	setDead(dead: boolean) {
		this.setEnabled(!dead);
	}
}
