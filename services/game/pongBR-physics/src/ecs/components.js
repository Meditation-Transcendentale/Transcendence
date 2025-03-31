export function Position(x, y) {
  return { x, y };
}

export function Velocity(x, y) {
  return { x, y };
}

export function CircleCollider(radius) {
  return {
    type: 'circle',
    radius,
    aabb: { minX: 0, minY: 0, maxX: 0, maxY: 0 }
  };
}

export function BoxCollider(width, height, rotation = 0) {
  return {
    type: 'box',
    width,
    height,
    rotation,
    aabb: { minX: 0, minY: 0, maxX: 0, maxY: 0 }
  };
}