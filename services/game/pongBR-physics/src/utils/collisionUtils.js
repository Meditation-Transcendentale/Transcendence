// collisionUtils.js

export function updateAABB(position, collider) {
	if (collider.type === 'circle') {
		const r = collider.radius;
		collider.aabb.x = position.x - r;
		collider.aabb.y = position.y - r;
		collider.aabb.width = r * 2;
		collider.aabb.height = r * 2;
	} else if (collider.type === 'box') {
		const cos = Math.cos(collider.rotation);
		const sin = Math.sin(collider.rotation);
		const hw = collider.width / 2;
		const hh = collider.height / 2;
		const cx = position.x + collider.offsetX;
		const cy = position.y + collider.offsetY;

		const corners = [
			{ x: cx - hw * cos + hh * sin, y: cy - hw * sin - hh * cos },
			{ x: cx + hw * cos + hh * sin, y: cy + hw * sin - hh * cos },
			{ x: cx + hw * cos - hh * sin, y: cy + hw * sin + hh * cos },
			{ x: cx - hw * cos - hh * sin, y: cy - hw * sin + hh * cos }
		];

		const xs = corners.map(c => c.x);
		const ys = corners.map(c => c.y);
		collider.aabb.x = Math.min(...xs);
		collider.aabb.y = Math.min(...ys);
		collider.aabb.width = Math.max(...xs) - collider.aabb.x;
		collider.aabb.height = Math.max(...ys) - collider.aabb.y;
	}
}

// export function getOBBPoints(position, collider) {
// 	const cx = position.x + (collider.offsetX || 0);
// 	const cy = position.y + (collider.offsetY || 0);
// 	const hw = collider.width / 2;
// 	const hh = collider.height / 2;
// 	const cos = Math.cos(collider.rotation);
// 	const sin = Math.sin(collider.rotation);
//
// 	return [
// 		{ x: cx - hw * cos + hh * sin, y: cy - hw * sin - hh * cos },
// 		{ x: cx + hw * cos + hh * sin, y: cy + hw * sin - hh * cos },
// 		{ x: cx + hw * cos - hh * sin, y: cy + hw * sin + hh * cos },
// 		{ x: cx - hw * cos - hh * sin, y: cy - hw * sin + hh * cos }
// 	];
// }
// export function getAxes(points) {
// 	const axes = [];
// 	for (let i = 0; i < points.length; i++) {
// 		const p1 = points[i];
// 		const p2 = points[(i + 1) % points.length];
// 		const edge = { x: p2.x - p1.x, y: p2.y - p1.y };
// 		const normal = { x: -edge.y, y: edge.x };
// 		const length = Math.hypot(normal.x, normal.y);
// 		axes.push({ x: normal.x / length, y: normal.y / length });
// 	}
// 	return axes;
// }

// function projectPolygon(axis, points) {
// 	let min = Infinity;
// 	let max = -Infinity;
// 	points.forEach(point => {
// 		const projection = point.x * axis.x + point.y * axis.y;
// 		if (projection < min) min = projection;
// 		if (projection > max) max = projection;
// 	});
// 	return { min, max };
// }
//
// function overlapIntervals(projA, projB) {
// 	return projA.max >= projB.min && projB.max >= projA.min;
// }

// export function obbCollision(positionA, colliderA, positionB, colliderB) {
// 	const pointsA = getOBBPoints(positionA, colliderA);
// 	const pointsB = getOBBPoints(positionB, colliderB);
//
// 	const getAxes = (points) => {
// 		const axes = [];
// 		for (let i = 0; i < points.length; i++) {
// 			const p1 = points[i];
// 			const p2 = points[(i + 1) % points.length];
// 			const edge = { x: p2.x - p1.x, y: p2.y - p1.y };
// 			const normal = { x: -edge.y, y: edge.x };
// 			const length = Math.hypot(normal.x, normal.y);
// 			axes.push({ x: normal.x / length, y: normal.y / length });
// 		}
// 		return axes;
// 	};
//
// 	const axesA = getAxes(pointsA);
// 	const axesB = getAxes(pointsB);
// 	const axes = axesA.concat(axesB);
//
// 	for (const axis of axes) {
// 		const projA = projectPolygon(axis, pointsA);
// 		const projB = projectPolygon(axis, pointsB);
// 		if (!overlapIntervals(projA, projB)) {
// 			return false;
// 		}
// 	}
// 	return true;
// }

// export function getOBBResolution(positionA, colliderA, positionB, colliderB) {
// 	const pointsA = getOBBPoints(positionA, colliderA);
// 	const pointsB = getOBBPoints(positionB, colliderB);
//
// 	const axesA = getAxes(pointsA);
// 	const axesB = getAxes(pointsB);
// 	const axes = axesA.concat(axesB);
//
// 	let minOverlap = Infinity;
// 	let smallestAxis = null;
//
// 	for (const axis of axes) {
// 		const projA = projectPolygon(axis, pointsA);
// 		const projB = projectPolygon(axis, pointsB);
//
// 		if (!overlapIntervals(projA, projB)) {
// 			return { x: 0, y: 0 };
// 		}
//
// 		const overlap = Math.min(projA.max, projB.max) - Math.max(projA.min, projB.min);
// 		if (overlap < minOverlap) {
// 			minOverlap = overlap;
// 			smallestAxis = axis;
// 		}
// 	}
//
// 	return { x: smallestAxis.x * minOverlap, y: smallestAxis.y * minOverlap };
// }

export function resolveCircleBoxCollision(ballPos, ballCollider, ballVelocity, wallPos, wallCollider, restitution = 1) {
	const wx = wallPos.x + (wallCollider.offsetX || 0);
	const wy = wallPos.y + (wallCollider.offsetY || 0);

	const dx = ballPos.x - wx;
	const dy = ballPos.y - wy;

	const cosTheta = Math.cos(-wallCollider.rotation);
	const sinTheta = Math.sin(-wallCollider.rotation);
	const localX = dx * cosTheta - dy * sinTheta;
	const localY = dx * sinTheta + dy * cosTheta;

	const halfW = wallCollider.width / 2;
	const halfH = wallCollider.height / 2;
	const clampedX = Math.max(-halfW, Math.min(localX, halfW));
	const clampedY = Math.max(-halfH, Math.min(localY, halfH));

	const invCos = Math.cos(wallCollider.rotation);
	const invSin = Math.sin(wallCollider.rotation);
	const closestX = wx + clampedX * invCos - clampedY * invSin;
	const closestY = wy + clampedX * invSin + clampedY * invCos;

	const diffX = ballPos.x - closestX;
	const diffY = ballPos.y - closestY;
	const dist = Math.hypot(diffX, diffY);
	const radius = ballCollider.radius;

	if (dist >= radius) {
		return false;
	}

	const penetration = radius - dist;

	let normalX, normalY;
	if (dist === 0) {
		normalX = 0;
		normalY = 1;
	} else {
		normalX = diffX / dist;
		normalY = diffY / dist;
	}

	ballPos.x += normalX * penetration;
	ballPos.y += normalY * penetration;

	const dot = ballVelocity.x * normalX + ballVelocity.y * normalY;
	ballVelocity.x = ballVelocity.x - 2 * dot * normalX;
	ballVelocity.y = ballVelocity.y - 2 * dot * normalY;

	ballVelocity.x *= restitution;
	ballVelocity.y *= restitution;

	return true;
}

export function computeCircleBoxMTV(ballPos, ballCollider, wallPos, wallCollider) {
	const wx = wallPos.x + (wallCollider.offsetX || 0);
	const wy = wallPos.y + (wallCollider.offsetY || 0);

	const dx = ballPos.x - wx;
	const dy = ballPos.y - wy;

	const cosTheta = Math.cos(wallCollider.rotation);
	const sinTheta = Math.sin(wallCollider.rotation);
	const localX = dx * cosTheta - dy * sinTheta;
	const localY = dx * sinTheta + dy * cosTheta;

	const halfW = wallCollider.width / 2;
	const halfH = wallCollider.height / 2;
	const clampedX = Math.max(-halfW, Math.min(localX, halfW));
	const clampedY = Math.max(-halfH, Math.min(localY, halfH));

	const invCos = Math.cos(-wallCollider.rotation);
	const invSin = Math.sin(-wallCollider.rotation);
	const closestX = wx + clampedX * invCos - clampedY * invSin;
	const closestY = wy + clampedX * invSin + clampedY * invCos;

	const diffX = ballPos.x - closestX;
	const diffY = ballPos.y - closestY;
	const dist = Math.hypot(diffX, diffY);
	const radius = ballCollider.radius;

	if (dist >= radius) {
		return { mtv: { x: 0, y: 0 }, penetration: 0 };
	}

	const penetration = radius - dist;

	let normalX, normalY;
	if (dist === 0) {
		normalX = 0;
		normalY = 1;
	} else {
		normalX = diffX / dist;
		normalY = diffY / dist;
	}

	return { mtv: { x: normalX * penetration, y: normalY * penetration }, penetration };
}

export function resolveCircleCircleCollision(posA, colliderA, velA, posB, colliderB, velB, restitution = 1) {
	const dx = posB.x - posA.x;
	const dy = posB.y - posA.y;
	const distance = Math.hypot(dx, dy);
	const sumRadii = colliderA.radius + colliderB.radius;

	if (distance >= sumRadii || distance === 0) {
		return false;
	}

	const penetration = sumRadii - distance;
	const normal = { x: dx / distance, y: dy / distance };

	posA.x -= normal.x * (penetration / 2);
	posA.y -= normal.y * (penetration / 2);
	posB.x += normal.x * (penetration / 2);
	posB.y += normal.y * (penetration / 2);

	const relativeVel = { x: velB.x - velA.x, y: velB.y - velA.y };
	const velAlongNormal = relativeVel.x * normal.x + relativeVel.y * normal.y;

	if (velAlongNormal > 0) return false;

	const impulse = -(1 + restitution) * velAlongNormal / 2;

	velA.x -= impulse * normal.x;
	velA.y -= impulse * normal.y;
	velB.x += impulse * normal.x;
	velB.y += impulse * normal.y;

	return true;
}
