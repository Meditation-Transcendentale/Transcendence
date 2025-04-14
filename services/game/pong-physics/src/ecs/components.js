export function Position(x, y) {
	return { x, y };
}

export function Velocity(x, y) {
	return { x, y };
}

export function BoxCollider(width, height, rotation = 0, offsetX = 0, offsetY = 0) {
	return {
		type: 'box',
		width,
		height,
		rotation,
		offsetX,
		offsetY,
		cos: Math.cos(-rotation),
		sin: Math.sin(-rotation),
		aabb: { x: 0, y: 0, width: 0, height: 0 }
	};
}

export function CircleCollider(radius) {
	return {
		type: 'circle',
		radius,
		aabb: { x: 0, y: 0, width: 0, height: 0 }
	};
}
