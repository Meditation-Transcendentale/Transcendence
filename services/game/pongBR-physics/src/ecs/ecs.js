export function createEntityManager() {
	return new EntityManager();
}

export class EntityManager {
	constructor() {
		this.entities = new Set();
		this.nextId = 1;
	}

	createEntity() {
		const entity = new Entity(this.nextId++);
		this.entities.add(entity);
		return entity;
	}

	getEntitiesWithComponents(componentNames) {
		return Array.from(this.entities).filter(entity =>
			componentNames.every(name => entity.components[name] !== undefined)
		);
	}
}

export class Entity {
	constructor(id) {
		this.id = id;
		this.components = {};
	}

	addComponent(name, data) {
		this.components[name] = data;
		return this;
	}

	getComponent(name) {
		return this.components[name];
	}

	hasComponent(name) {
		return name in this.components;
	}
}
