// components/AnimationComponent.ts
import { Component } from "../ecs/Component";
import { Vector3 } from "@babylonImport";

export type AnimProp = "position" | "rotation" | "scale";

export class AnimationComponent implements Component {
	elapsed = 0;
	public static key = "AnimationComponent";
	constructor(
		/** seconds */
		public readonly duration: number,
		/** which Transform field to animate */
		public readonly prop: AnimProp,
		/** start value (Vector3.clone()) */
		public readonly from: Vector3,
		/** end value (Vector3.clone()) */
		public readonly to: Vector3,
		/** optional easing (0…1 → 0…1) */
		public readonly ease: (t: number) => number = t => t
	) { }
}

