// systems.js

export function movementSystem(entityManager, deltaTime) {
	const entities = entityManager.getEntitiesWithComponents(['position', 'velocity']);
	entities.forEach(entity => {
		const pos = entity.getComponent('position');
		const vel = entity.getComponent('velocity');
		pos.x += vel.x * deltaTime;
		pos.y += vel.y * deltaTime;
	});
}

export function debugCollisionSystem(entityManager) {
	const entities = entityManager.getEntitiesWithComponents(['position', 'collider']);
	entities.forEach(entity => {
		const pos = entity.getComponent('position');
		const col = entity.getComponent('collider');
		console.log(`Entity ${entity.id} at (${pos.x}, ${pos.y}) with size (${col.width}, ${col.height})`);
	});
}
