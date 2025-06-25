import { Vector3 } from "@babylonjs/core";
import { Component } from "../ecs/Component.js";

export type PillarSide = "start" | "end";

export class PillarComponent implements Component {
	constructor(
		public readonly segmentIndex: number,
		public readonly side: PillarSide
	) { }
}

