const MAX_OFFSET = 8.4;
const SPEED = 10;

export function movementSystem(entityManager, dt) {
	const entities = entityManager.getEntitiesWithComponents(['position', 'velocity']);
	for (const entity of entities) {
		const pos = entity.getComponent('position');
		const vel = entity.getComponent('velocity');
		pos.x += vel.x * dt;
		pos.y += vel.y * dt;
		// if (Math.abs(vel.x) < 0.01) vel.x = 0;
		// if (Math.abs(vel.y) < 0.01) vel.y = 0;
	}

}

