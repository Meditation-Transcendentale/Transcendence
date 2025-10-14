/**
 * Camera configuration for each phase
 * ArcRotateCamera parameters:
 * - alpha: horizontal rotation (radians)
 * - beta: vertical rotation (radians, 0 = top view, PI/2 = side view)
 * - radius: distance from target
 */

export interface CameraPosition {
	alpha: number;
	beta: number;
	radius: number;
}

export const PHASE_CAMERA_CONFIG: Record<string, CameraPosition> = {
	'Phase 1': {
		alpha: 0.001,
		beta: 1.527,
		radius: 239
	},
	'Phase 2': {
		alpha: -0.002,
		beta: 1.518,
		radius: 261
	},
	'Phase 3': {
		alpha: -0.006,
		beta: 1.481,
		radius: 309
	},
	'Phase 4': {
		alpha: 0,
		beta: 1.473,
		radius: 392
	},
	'Phase 5': {
		alpha: -0.017,
		beta: 1.003,
		radius: 496
	}
};

export const DEFAULT_CAMERA: CameraPosition = {
	alpha: 0,
	beta: Math.PI / 2.1,
	radius: 300
};

export const LOADING_CAMERA: CameraPosition = {
	alpha: 0,
	beta: 1.290,
	radius: 1000
};
