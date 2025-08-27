// collision-systems.js

import { CFG, ENTITY_MASKS } from './physics-config.js';

export function collideCircleWithOBB(circleX, circleY, circleRadius, rectX, rectY, rectHalfW, rectHalfH, rectCos, rectSin) {
	const dx = circleX - rectX;
	const dy = circleY - rectY;

	const localX = dx * rectCos + dy * rectSin;
	const localY = -dx * rectSin + dy * rectCos;

	const closestX = Math.max(-rectHalfW, Math.min(rectHalfW, localX));
	const closestY = Math.max(-rectHalfH, Math.min(rectHalfH, localY));

	const distX = localX - closestX;
	const distY = localY - closestY;
	const distanceSquared = distX * distX + distY * distY;

	if (distanceSquared <= circleRadius * circleRadius) {
		const distance = Math.sqrt(distanceSquared);
		let normalX, normalY;

		if (distance < CFG.COLLISION_EPSILON) {
			normalX = rectHalfW - Math.abs(localX) < rectHalfH - Math.abs(localY) ?
				(localX > 0 ? 1 : -1) : 0;
			normalY = normalX === 0 ? (localY > 0 ? 1 : -1) : 0;
		} else {
			normalX = distX / distance;
			normalY = distY / distance;
		}

		const worldNormalX = normalX * rectCos - normalY * rectSin;
		const worldNormalY = normalX * rectSin + normalY * rectCos;

		return {
			collision: true,
			normalX: worldNormalX,
			normalY: worldNormalY,
			penetration: Math.max(0, circleRadius - distance)
		};
	}

	return { collision: false };
}

export class PhysicsSystems {
	static movement(pd, dt, mask = ENTITY_MASKS.BALL) {
		for (let i = 0; i < pd.count; i++) {
			if ((pd.mask[i] & mask) === 0 || pd.isEliminated[i] === 1) continue;
			pd.posX[i] += pd.velX[i] * dt;
			pd.posY[i] += pd.velY[i] * dt;
		}
	}

	static ballBallCollision(pd, i, j) {
		const dx = pd.posX[j] - pd.posX[i];
		const dy = pd.posY[j] - pd.posY[i];
		const R = pd.radius[i] + pd.radius[j];
		const d2 = dx * dx + dy * dy;

		if (d2 >= R * R) return false;

		const dist = Math.sqrt(d2);

		if (dist < CFG.COLLISION_EPSILON) {
			const angle = Math.random() * 2 * Math.PI;
			const separation = R * 0.5;
			pd.posX[i] += Math.cos(angle) * separation;
			pd.posY[i] += Math.sin(angle) * separation;
			pd.posX[j] -= Math.cos(angle) * separation;
			pd.posY[j] -= Math.sin(angle) * separation;
			return true;
		}

		const invDist = 1.0 / dist;
		const nx = dx * invDist;
		const ny = dy * invDist;
		const overlap = R - dist;

		const separation = overlap * 0.5;
		pd.posX[i] -= nx * separation;
		pd.posY[i] -= ny * separation;
		pd.posX[j] += nx * separation;
		pd.posY[j] += ny * separation;

		const vi = pd.velX[i] * nx + pd.velY[i] * ny;
		const vj = pd.velX[j] * nx + pd.velY[j] * ny;
		if (vi - vj > 0) {
			pd.velX[i] -= 2 * vi * nx;
			pd.velY[i] -= 2 * vi * ny;
			pd.velX[j] -= 2 * vj * nx;
			pd.velY[j] -= 2 * vj * ny;
		}

		return true;
	}

	static ballStaticCollision(pd, ballId, staticId, cfg) {
		const collision = collideCircleWithOBB(
			pd.posX[ballId], pd.posY[ballId], pd.radius[ballId],
			pd.posX[staticId], pd.posY[staticId], pd.halfW[staticId], pd.halfH[staticId],
			Math.cos(pd.rot[staticId]), Math.sin(pd.rot[staticId])
		);

		if (collision.collision) {
			pd.posX[ballId] += collision.normalX * collision.penetration;
			pd.posY[ballId] += collision.normalY * collision.penetration;

			const dot = pd.velX[ballId] * collision.normalX + pd.velY[ballId] * collision.normalY;
			if (dot > 0) {
				pd.velX[ballId] -= 2 * dot * collision.normalX;
				pd.velY[ballId] -= 2 * dot * collision.normalY;
				pd.velX[ballId] *= cfg.VELOCITY_DAMPING;
				pd.velY[ballId] *= cfg.VELOCITY_DAMPING;
			}
			return true;
		}
		return false;
	}
}
