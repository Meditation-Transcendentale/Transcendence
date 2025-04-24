// collisionUtils.js

const EPSILON = 0.01;

/**
 * Update a collider’s AABB based on its world position.
 * @param {{x:number,y:number}} position
 * @param {object} collider
 * @param {'circle'|'box'} collider.type
 */
export function updateAABB(position, collider) {
	if (collider.type === 'circle') {
		const r = collider.radius;
		collider.aabb.x = position.x - r;
		collider.aabb.y = position.y - r;
		collider.aabb.width = r * 2;
		collider.aabb.height = r * 2;
	} else if (collider.type === 'box') {
		const cos = collider.cos;
		const sin = collider.sin;
		const hw = collider.width / 2;
		const hh = collider.height / 2;
		const cx = position.x + (collider.offsetX || 0);
		const cy = position.y + (collider.offsetY || 0);

		const x1 = cx - hw * cos + hh * sin;
		const y1 = cy - hw * sin - hh * cos;
		const x2 = cx + hw * cos + hh * sin;
		const y2 = cy + hw * sin - hh * cos;
		const x3 = cx + hw * cos - hh * sin;
		const y3 = cy + hw * sin + hh * cos;
		const x4 = cx - hw * cos - hh * sin;
		const y4 = cy - hw * sin + hh * cos;

		const minX = Math.min(x1, x2, x3, x4);
		const minY = Math.min(y1, y2, y3, y4);
		const maxX = Math.max(x1, x2, x3, x4);
		const maxY = Math.max(y1, y2, y3, y4);

		collider.aabb.x = minX;
		collider.aabb.y = minY;
		collider.aabb.width = maxX - minX;
		collider.aabb.height = maxY - minY;
	}
}

/**
 * Attempt to resolve a circle‐box collision in place.
 * @param {{x:number,y:number}} ballPos
 * @param {{radius:number}} ballCollider
 * @param {{x:number,y:number}} ballVelocity
 * @param {{x:number,y:number}} wallPos
 * @param {object} wallCollider
 * @param {number} [restitution=1]
 * @returns {boolean} True if collision was handled
 */
export function resolveCircleBoxCollision(ballPos, ballCollider, ballVelocity, wallPos, wallCollider, restitution = 1) {
	const wx = wallPos.x + (wallCollider.offsetX || 0);
	const wy = wallPos.y + (wallCollider.offsetY || 0);

	const dx = ballPos.x - wx;
	const dy = ballPos.y - wy;

	const cosTheta = wallCollider.cos;
	const sinTheta = wallCollider.sin;
	const localX = dx * cosTheta - dy * sinTheta;
	const localY = dx * sinTheta + dy * cosTheta;

	const halfW = wallCollider.width / 2;
	const halfH = wallCollider.height / 2;
	const clampedX = Math.max(-halfW, Math.min(localX, halfW));
	const clampedY = Math.max(-halfH, Math.min(localY, halfH));

	const invCos = -wallCollider.cos;       // cos(-theta)
	const invSin = -wallCollider.sin;        // sin(-theta)
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
	ballVelocity.x -= 2 * dot * normalX;
	ballVelocity.y -= 2 * dot * normalY;

	ballVelocity.x *= restitution;
	ballVelocity.y *= restitution;

	return true;
}

/**
 * Compute and apply the minimum‐translation‐vector for circle‐box collisions.
 * @param {{x:number,y:number}} ballPos
 * @param {{radius:number}} ballCollider
 * @param {{x:number,y:number}} wallPos
 * @param {object} wallCollider
 * @returns {{mtv:{x:number,y:number}, penetration:number}}
 */
export function computeCircleBoxMTV(ballPos, ballCollider, wallPos, wallCollider) {
	const wx = wallPos.x + (wallCollider.offsetX || 0);
	const wy = wallPos.y + (wallCollider.offsetY || 0);

	const dx = ballPos.x - wx;
	const dy = ballPos.y - wy;

	const cosTheta = wallCollider.cos;
	const sinTheta = -wallCollider.sin;
	const localX = dx * cosTheta - dy * sinTheta;
	const localY = dx * sinTheta + dy * cosTheta;

	const halfW = wallCollider.width / 2;
	const halfH = wallCollider.height / 2;
	const clampedX = Math.max(-halfW, Math.min(localX, halfW));
	const clampedY = Math.max(-halfH, Math.min(localY, halfH));

	const invCos = wallCollider.cos;
	const invSin = wallCollider.sin;
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
	if (penetration < EPSILON) {
		return { mtv: { x: 0, y: 0 }, penetration: 0 };
	}

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

// export function resolveCircleCircleCollision(posA, colliderA, velA, posB, colliderB, velB, restitution = 1) {
// 	const dx = posB.x - posA.x;
// 	const dy = posB.y - posA.y;
// 	const distance = Math.hypot(dx, dy);
// 	const sumRadii = colliderA.radius + colliderB.radius;
//
// 	if (distance >= sumRadii || distance === 0) {
// 		return false;
// 	}
//
// 	const penetration = sumRadii - distance;
// 	const normalX = dx / distance;
// 	const normalY = dy / distance;
//
// 	posA.x -= normalX * (penetration / 2);
// 	posA.y -= normalY * (penetration / 2);
// 	posB.x += normalX * (penetration / 2);
// 	posB.y += normalY * (penetration / 2);
//
// 	const relVelX = velB.x - velA.x;
// 	const relVelY = velB.y - velA.y;
// 	const velAlongNormal = relVelX * normalX + relVelY * normalY;
//
// 	if (velAlongNormal > 0) return false;
//
// 	const impulse = -(1 + restitution) * velAlongNormal / 2;
// 	velA.x -= impulse * normalX;
// 	velA.y -= impulse * normalY;
// 	velB.x += impulse * normalX;
// 	velB.y += impulse * normalY;
//
// 	return true;
// }

