import { ECSManager } from "../ecs/ECSManager.js";

export class StateManager {
	private ecs: ECSManager;
	private lastUpdate: number = performance.now();
	private accumulatedTime: number = 0;
	private readonly timestep: number = 16.67; // ~60 updates per second
	private start: boolean;
	private id: number = 0;

	constructor(ecs: ECSManager) {
		this.ecs = ecs;
		this.start = true;
	}

	update(): void {
		const now = performance.now();
		const deltaTime = now - this.lastUpdate;
		this.lastUpdate = now;
		this.ecs.update(deltaTime / 1000);
		this.id = requestAnimationFrame(() => this.update());
		if (!this.start) {
			console.log("Cancel Animation Fram :", this.id);
			cancelAnimationFrame(this.id);
			return;
		}
	}

	setter(value: boolean): void {
		console.log("change start");
		this.start = value;
	}
	set_ecs(ecs: ECSManager) {
		this.ecs = ecs;
	}
}
