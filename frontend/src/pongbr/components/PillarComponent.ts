import { Vector3 } from "@babylonImport";
import { Component } from "../ecs/Component.js";

export type PillarSide = "start" | "end";

export class PillarComponent implements Component {
	public static key = "PillarComponent";
	constructor(
		public readonly segmentIndex: number,
	) { }
}

