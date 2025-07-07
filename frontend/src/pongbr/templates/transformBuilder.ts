// templates/transformBuilders.ts
import { Vector3 } from "@babylonImport";

export interface TransformBundle {
	paddle: { pos: Vector3; rot: Vector3; scale: Vector3 };
	goal: { pos: Vector3; rot: Vector3; scale: Vector3 };
	deathWall: { pos: Vector3; rot: Vector3; scale: Vector3 };
	pillars: [
		{ pos: Vector3; rot: Vector3; scale: Vector3 },
		{ pos: Vector3; rot: Vector3; scale: Vector3 }
	];
}

/**
 * Helper to intersect two XZ segments, returns null if no intersection
 */
function intersectSegmentsXZ(
	A: Vector3, B: Vector3,
	C: Vector3, D: Vector3
): Vector3 | null {
	const ab = B.subtract(A);
	const cd = D.subtract(C);
	const ac = C.subtract(A);
	const denom = ab.x * cd.z - ab.z * cd.x;
	if (Math.abs(denom) < 1e-6) return null;
	const t = (ac.x * cd.z - ac.z * cd.x) / denom;
	if (t < 0 || t > 1) return null;
	const u = (ac.x * ab.z - ac.z * ab.x) / denom;
	if (u < 0 || u > 1) return null;
	return new Vector3(
		A.x + ab.x * t,
		A.y + ab.y * t,
		A.z + ab.z * t
	);
}

/**
 * Compute identical transforms to buildPaddles for a given config & playerCount.
 * Ensures paddles, goals & pillars distribute exactly as initial placement.
 */
export function computePaddleTransforms(
	cfg: {
		arenaRadius: number;
		wallWidth: number;
		paddleHeight: number;
		paddleDepth: number;
		goalDepth: number;
	},
	playerCount: number
): TransformBundle[] {
	const bundles: TransformBundle[] = [];
	const angleStep = (2 * Math.PI) / playerCount;
	const paddleRadius = cfg.arenaRadius - cfg.paddleDepth / 2;
	const goalRadius = cfg.arenaRadius + cfg.wallWidth / 2 + cfg.goalDepth / 2;
	const center = new Vector3(0, cfg.paddleHeight / 2, 0);

	for (let i = 0; i < playerCount; i++) {
		const sliceStart = i * angleStep;
		const sliceEnd = sliceStart + angleStep;
		const midAngle = sliceStart + angleStep / 2;
		const cosM = Math.cos(midAngle);
		const sinM = Math.sin(midAngle);
		const rotY = -midAngle + Math.PI / 2;

		// base point along the tangent circle
		const basePos = new Vector3(
			cosM * paddleRadius,
			cfg.paddleHeight / 2,
			sinM * paddleRadius
		);

		// remove intersection-based offset: use basePos directly for even distribution
		const paddlePos = basePos;

		const arcLen = paddleRadius * angleStep; paddleRadius * angleStep;
		const paddleLen = arcLen * 0.07;
		const pillarOff = arcLen * 0.08;

		const posA = new Vector3(
			Math.cos(sliceStart) * goalRadius * 0.98,
			cfg.paddleHeight / 2,
			Math.sin(sliceStart) * goalRadius * 0.98
		);
		const posB = new Vector3(
			Math.cos(sliceEnd) * goalRadius * 0.98,
			cfg.paddleHeight / 2,
			Math.sin(sliceEnd) * goalRadius * 0.98
		);
		bundles.push({
			paddle: {
				pos: paddlePos,
				rot: new Vector3(0, rotY, 0),
				scale: new Vector3(paddleLen, cfg.paddleHeight * paddleLen, cfg.paddleDepth * paddleLen)
			},

			goal: {
				pos: new Vector3(cosM * goalRadius, cfg.paddleHeight / 2, sinM * goalRadius),
				rot: new Vector3(0, rotY, 0),
				scale: new Vector3(paddleLen, cfg.paddleHeight * paddleLen, cfg.goalDepth * paddleLen)
			},

			deathWall: {
				pos: new Vector3(cosM * goalRadius, cfg.paddleHeight / 2, sinM * goalRadius),
				rot: new Vector3(0, rotY, 0),
				scale: new Vector3(paddleLen, 1, cfg.goalDepth * paddleLen)
			},

			pillars: [
				{
					pos: posA,
					rot: new Vector3(0, -sliceStart, 0),
					scale: new Vector3(pillarOff, cfg.paddleHeight * pillarOff, pillarOff)
				},
				{
					pos: posB,
					rot: new Vector3(0, -sliceEnd, 0),
					scale: new Vector3(pillarOff, cfg.paddleHeight * pillarOff, pillarOff)
				}
			]
		});
	}

	return bundles;
}

