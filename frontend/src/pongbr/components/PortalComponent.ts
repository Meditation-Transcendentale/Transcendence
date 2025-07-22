import { Vector3 } from "@babylonImport";
import { Component } from "../ecs/Component.js";

export class PortalComponent implements Component {
	public id: number;
	public position: Vector3;
	public static key = "PortalComponent";

	constructor(id: number, position: Vector3) {
		this.id = id;
		this.position = position;
	}
}
