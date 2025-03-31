// ecs.js

export class Entity {
	constructor(id) {
		this.id = id;
		this.components = {};
	}

	addComponent(name, component) {
		this.components[name] = component;
		return this;
	}

	getComponent(name) {
		return this.components[name];
	}

	hasComponent(name) {
		return this.components.hasOwnProperty(name);
	}
}

export class EntityManager {
	constructor() {
		this.entities = {};
		this.nextId = 0;
	}

	createEntity() {
		const entity = new Entity(this.nextId++);
		this.entities[entity.id] = entity;
		return entity;
	}

	getEntitiesWithComponents(componentNames) {
		return Object.values(this.entities).filter(entity =>
			componentNames.every(name => entity.hasComponent(name))
		);
	}
}
