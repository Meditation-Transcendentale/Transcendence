import { Component } from "../ecs/Component.js";
import { ThinInstanceManager } from "../.oldPongECS/rendering/ThinInstanceManager.js";

export class ThinInstanceComponent implements Component {
	constructor(
		public instanceIndex: number,
		public manager: ThinInstanceManager
	) {}
}