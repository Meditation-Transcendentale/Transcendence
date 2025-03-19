import { Component } from "../ecs/Component.js";
import { ThinInstanceManager } from "../rendering/ThinInstanceManager.js";

export class ThinInstanceComponent implements Component {
	constructor(
		public instanceIndex: number,
		public manager: ThinInstanceManager
	) {}
}