// ECSManager.ts
import { Entity } from "./Entity.js";
import { System } from "./System.js";

/**
 * Central manager for all entities and systems.
 * Allows querying by component and system-driven updates.
 */
// ECSManager.ts
export class ECSManager {
	public entities: Entity[] = [];
	private systems: System[] = [];

	addEntity(entity: Entity): void {
		this.entities.push(entity);
	}

	removeEntity(entity: Entity): void {
		const index = this.entities.findIndex(e => e.id === entity.id);
		if (index !== -1) {
			this.entities.splice(index, 1);  // Mutate in place
		}
	}

	removeEntityById(id: number): void {
		const index = this.entities.findIndex(e => e.id === id);
		if (index !== -1) {
			this.entities.splice(index, 1);  // Mutate in place
		}
	}

	entitiesWith(...componentClasses: Function[]): Entity[] {
		return this.entities.filter(ent =>
			componentClasses.every(cls => ent.hasComponent(cls))
		);
	}

	addSystem(system: System): void {
		this.systems.push(system);
	}

	removeSystem(system: System): void {
		const index = this.systems.indexOf(system);
		if (index !== -1) {
			this.systems.splice(index, 1);
		}
	}

	update(deltaTime: number): void {
		// Make a copy for iteration to avoid issues if systems add/remove entities
		const entitiesSnapshot = [...this.entities];
		for (const sys of this.systems) {
			sys.update(entitiesSnapshot, deltaTime);
		}
	}

	getAllEntities(): Entity[] {
		return [...this.entities];
	}
}
