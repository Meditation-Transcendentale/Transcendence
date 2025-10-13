import { ECSManager } from "../ecs/ECSManager.js";
import { Scene } from "../../../babylon";

export class StateManager {
	private ecs: ECSManager;
	private scene: Scene;
	private lastUpdate: number = performance.now();
	private renderObserver: any = null;
	private isRunning: boolean = false;

	constructor(ecs: ECSManager, scene: Scene) {
		this.ecs = ecs;
		this.scene = scene;
	}

	private onBeforeRender = (): void => {
		if (!this.isRunning) return;

		const now = performance.now();
		const deltaTime = (now - this.lastUpdate) / 1000;
		this.lastUpdate = now;

		this.ecs.update(deltaTime);
	}

	start(): void {
		if (this.isRunning) return;

		console.log("StateManager: Starting ECS updates");
		this.isRunning = true;
		this.lastUpdate = performance.now();

		this.renderObserver = this.scene.onBeforeRenderObservable.add(this.onBeforeRender);
	}

	stop(): void {
		if (!this.isRunning) return;

		console.log("StateManager: Stopping ECS updates");
		this.isRunning = false;

		if (this.renderObserver) {
			this.scene.onBeforeRenderObservable.remove(this.renderObserver);
			this.renderObserver = null;
		}
	}

	setter(value: boolean): void {
		if (value) {
			this.start();
		} else {
			this.stop();
		}
	}

	update(): void {
		this.start();
	}

	set_ecs(ecs: ECSManager) {
		this.ecs = ecs;
	}
}
