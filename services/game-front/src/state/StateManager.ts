import { ECSManager } from "../ecs/ECSManager.js";

export class StateManager {
    private ecs: ECSManager;
    private lastUpdate: number = performance.now();
    private accumulatedTime: number = 0;
    private readonly timestep: number = 16.67; // ~60 updates per second

    constructor(ecs: ECSManager) {
        this.ecs = ecs;
    }

    update(): void {
        const now = performance.now();
        const deltaTime = now - this.lastUpdate;
        this.lastUpdate = now;
        this.accumulatedTime += deltaTime;

        while (this.accumulatedTime >= this.timestep) {
            this.ecs.update(this.timestep);
            this.accumulatedTime -= this.timestep;
        }
        requestAnimationFrame(() => this.update());
    }
}
