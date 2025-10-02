// physics-config.js

export const CFG = {
	TARGET_FPS: 60,
	SUB_STEPS: 8,
	ARENA_RADIUS: 200,
	MAX_PLAYERS: 100,
	INITIAL_BALLS: 200,
	BALL_RADIUS: 0.25,
	INITIAL_SPEED: 50,
	PADDLE_FILL: 0.25,
	PADDLE_RATIO: 1 / 5,
	COLLISION_EPSILON: 1e-6,
	VELOCITY_DAMPING: 0.9999,
	GOAL_DETECTION_MARGIN: 1,
	GRID_CELL_SIZE_MULTIPLIER: 4,
	MAX_BROAD_PHASE_CHECKS: 64,
	REBUILD_DURATION: 3000,
	SPAWN_INITIAL_DELAY: 1000,
	SPAWN_EXPONENTIAL_BASE: 0.8,
	SPAWN_MIN_INTERVAL: 100,
	SPAWN_MAX_INTERVAL: 3000,
	SPAWN_SAFETY_MARGIN: 0.3,
};

export const ENTITY_MASKS = {
	NONE: 0,
	BALL: 1,
	PADDLE: 2,
	PILLAR: 4,
	STATIC: 8
};

export const PHASE_BALL_CONFIGS = {
	'Phase 1': { initialBalls: 1, maxBalls: 200 },
	'Phase 2': { initialBalls: 1, maxBalls: 100 },
	'Phase 3': { initialBalls: 1, maxBalls: 50 },
	'Phase 4': { initialBalls: 1, maxBalls: 25 },
	'Final Phase': { initialBalls: 1, maxBalls: 6 }
};


export const PHASE_CONFIGS = {
	'Phase 1': { playerCount: 100, minPlayers: 51 },
	'Phase 2': { playerCount: 50, minPlayers: 26 },
	'Phase 3': { playerCount: 25, minPlayers: 13 },
	'Phase 4': { playerCount: 12, minPlayers: 7 },
	'Final Phase': { playerCount: 3, minPlayers: 2 }
};

export const PHASE_STAGES = {
	'Phase 1': 1,
	'Phase 2': 2,
	'Phase 3': 3,
	'Phase 4': 4,
	'Final Phase': 5
};

export function getPhaseConfig(phase = 'Phase 1') {
	return PHASE_CONFIGS[phase] || PHASE_CONFIGS['Phase 1'];
}

export function getPhaseStage(phase = 'Phase 1') {
	return PHASE_STAGES[phase] || 1;
}

export function getPhasePaddleSize(phase = 'Phase 1', arenaRadius = CFG.ARENA_RADIUS) {
	const perim = 2 * Math.PI * arenaRadius;
	const playerCount = getPhaseConfig(phase).playerCount;
	return (perim / playerCount) * CFG.PADDLE_FILL;
}

export function getPhaseBallConfig(phase = 'Phase 1') {
	return PHASE_BALL_CONFIGS[phase] || PHASE_BALL_CONFIGS['Phase 1'];
}

export function getBallScaleForPlayerCount(playerCount) {
	let scaleFactor;
	switch (playerCount) {
		case 100: scaleFactor = 2.; break;
		case 50: scaleFactor = 4.; break;
		case 25: scaleFactor = 8.; break;
		case 12: scaleFactor = 10; break;
		case 3: scaleFactor = 12.; break;
		default: scaleFactor = 25 / playerCount;
	}
	return scaleFactor;
}

