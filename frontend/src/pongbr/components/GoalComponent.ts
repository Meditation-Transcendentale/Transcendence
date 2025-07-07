// components/GoalComponent.ts
import { Vector3 } from "@babylonImport";
import { Component } from "../ecs/Component";
export class GoalComponent implements Component {
	/**
	 * Marks a goal opening for a specific player segment.
	 * @param segmentIndex which goal segment (player) this is
	 * @param position     world position of the goal center
	 */
	constructor(
		public readonly segmentIndex: number,
		public readonly position: Vector3
	) { }
}
