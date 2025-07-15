import { Entity } from "./Entity.js";
import { System } from "./System.js";

export class ECSManager {
    private entities: Entity[] = [];
    private systems: System[] = [];

    addEntity(entity: Entity): void {
        this.entities.push(entity);
    }

    removeEntity(entity: Entity): void {
        this.entities = this.entities.filter(e => e.id !== entity.id);
    }

    addSystem(system: System): void {
        this.systems.push(system);
    }

    update(deltaTime: number): void {
        for (const system of this.systems) {
            system.update(this.entities, deltaTime);
        }
    }
}
