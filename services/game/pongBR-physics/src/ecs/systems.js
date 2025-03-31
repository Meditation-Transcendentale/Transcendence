export function movementSystem(entityManager, dt) {
  const entities = entityManager.getEntitiesWithComponents(['position', 'velocity']);
  for (const entity of entities) {
    const pos = entity.getComponent('position');
    const vel = entity.getComponent('velocity');
    pos.x += vel.x * dt;
    pos.y += vel.y * dt;
  }
}