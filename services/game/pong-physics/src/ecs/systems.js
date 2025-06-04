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
	const paddles = entityManager.getEntitiesWithComponents(['paddle', 'position']);

	for (let i = 0; i < paddles.length; i++) {
		const entity = paddles[i];
		const paddle = entity.getComponent('paddle');
		const position = entity.getComponent('position');

		const move = paddle.move ?? 0;
		if (move === 0)
			continue;
		let offset = paddle.offset ?? 0;

		const velocity = move * SPEED * dt;
		offset += velocity;

		offset = Math.max(-MAX_OFFSET, Math.min(offset, MAX_OFFSET));
		paddle.offset = offset;

		position.y = offset;
		paddle.dirty = true;
	}

}

