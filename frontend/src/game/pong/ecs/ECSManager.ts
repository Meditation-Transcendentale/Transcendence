// ECSManager.ts
import { BallComponent } from "../components/BallComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { WallComponent } from "../components/WallComponent.js";
import { Entity } from "./Entity.js";
import { System } from "./System.js";

/**
 * Central manager for all entities and systems.
 * Allows querying by component and system-driven updates.
 */
export class ECSManager {
	private entities: Entity[] = [];
	private systems: System[] = [];

	/**
	 * Add an entity to the world.
	 */
	addEntity(entity: Entity): void {
		this.entities.push(entity);
	}

	/**
	 * Remove a specific entity instance from the world.
	 */
	removeEntity(entity: Entity): void {
		this.entities = this.entities.filter(e => e.id !== entity.id);
		Entity._idCounter--;
		let count = 0;
		this.entities.forEach(e => {
			e.id = count++;
		})
	}

	/**
	 * Remove an entity by its ID.
	 */
	removeEntityById(id: number): void {
		this.entities = this.entities.filter(e => e.id !== id);
		Entity._idCounter--;
		let count = 0;
		this.entities.forEach(e => {
			e.id = count++;
		})
	}

	/**
	 * Return entities that have *all* of the given component classes.
	 */
	entitiesWith(...componentClasses: Function[]): Entity[] {
		return this.entities.filter(ent =>
			componentClasses.every(cls => ent.hasComponent(cls))
		);
	}

	/**
	 * Add a system to the update loop.
	 */
	addSystem(system: System): void {
		this.systems.push(system);
	}

	removeSystem(system: System): void {
		this.systems = this.systems.filter(s => s !== system);
	}


	/**
	 * Call each system's update, passing this manager and the elapsed time.
	 */
	update(deltaTime: number): void {
		for (const sys of this.systems) {
			sys.update(this.entities, deltaTime);
		}
	}

	/**
	 * Get a shallow copy of all current entities.
	 */
	getAllEntities(): Entity[] {
		return [...this.entities];
	}
}

