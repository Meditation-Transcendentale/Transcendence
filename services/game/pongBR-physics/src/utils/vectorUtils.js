// vectorUtils.js
export function dot(a, b) {
	return a.x * b.x + a.y * b.y;
}

export function subtract(a, b) {
	return { x: a.x - b.x, y: a.y - b.y };
}

export function add(a, b) {
	return { x: a.x + b.x, y: a.y + b.y };
}

export function scale(v, s) {
	return { x: v.x * s, y: v.y * s };
}

export function negate(v) {
	return { x: -v.x, y: -v.y };
}

export function length(v) {
	return Math.sqrt(dot(v, v));
}

export function normalize(v) {
	const l = length(v) || 1;
	return { x: v.x / l, y: v.y / l };
}

export function tripleProduct(a, b, c) {
	return {
		x: b.x * dot(a, c) - a.x * dot(b, c),
		y: b.y * dot(a, c) - a.y * dot(b, c)
	};
}

