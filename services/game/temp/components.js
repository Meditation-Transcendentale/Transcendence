// components.js

export function Position(x, y) {
	return { x, y };
}

export function Velocity(x, y) {
	return { x, y };
}

export function Collider(width, height) {
	return { width, height };
}

function BoxCollider(width, height, rotation = 0, offsetX = 0, offsetY = 0) {
	return {
		type: 'box',
		width,
		height,
		rotation,
		offsetX,
		offsetY,
		aabb: { x: 0, y: 0, width: 0, height: 0 }
	};
}

function CircleCollider(radius) {
	return {
		type: 'circle',
		radius,
		aabb: { x: 0, y: 0, width: 0, height: 0 }
	};
}
export { BoxCollider, CircleCollider };
