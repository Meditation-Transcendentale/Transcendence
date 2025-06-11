/**
 * physicsBR.js
 * Data-Oriented Physics Engine for Pong-BR with:
 *  - Elimination → Paddle→Wall
 *  - Phase System & Smooth Shrink
 *  - Ball Spawning & Despawning
 *  - Modular BR Phases
 */

// Constants
const WORLD_RADIUS = 300;           // constant play-area radius
const SUBSTEPS = 5;
const TARGET_FPS = 60;
const DT = 1 / TARGET_FPS / SUBSTEPS;

// Phase brackets: max players per phase
const PHASE_BRACKETS = [100, 50, 25, 12, 6, 3, 2];

// Utility: choose starting phase index for N players
function pickStartPhase(playerCount) {
	for (let i = 0; i < PHASE_BRACKETS.length; i++) {
		if (playerCount <= PHASE_BRACKETS[i]) return i;
	}
	return PHASE_BRACKETS.length - 1;
}

// Create a new PhysicsWorld for a match
export function createPhysicsWorld(playerCount) {
	const phaseIndex = pickStartPhase(playerCount);
	const maxBalls = PHASE_BRACKETS[phaseIndex];

	// Grid for collisions
	const CELL_SIZE = 64;
	const COLS = Math.ceil(WORLD_RADIUS * 2 / CELL_SIZE);
	const ROWS = COLS;
	const CELL_COUNT = COLS * ROWS;
	const MAX_BALLS_PER_CELL = 4;
	const MAX_BOXES_PER_CELL = playerCount + 4; // paddles + border walls

	return {
		// --- Battle Royale state ---
		phaseIndex,
		playersTotal: playerCount,
		eliminatedCount: 0,
		// Smooth shrink progress [0..1]
		shrinkProgress: 0,
		inPhaseTransition: false,
		transitionTimer: 0,

		// --- Balls ---
		ballCount: 0,
		maxBalls,
		ballPosX: new Float32Array(maxBalls),
		ballPosY: new Float32Array(maxBalls),
		ballVelX: new Float32Array(maxBalls),
		ballVelY: new Float32Array(maxBalls),
		ballRadius: new Float32Array(maxBalls),
		ballAlive: new Uint8Array(maxBalls),

		// spawn queue (indices to reuse)
		spawnQueue: [],
		despawnQueue: [],

		// --- Paddles & Walls ---
		playerCount,
		paddlePosX: new Float32Array(playerCount),
		paddlePosY: new Float32Array(playerCount),
		paddleHalfW: new Float32Array(playerCount),
		paddleHalfH: new Float32Array(playerCount),
		isEliminated: new Uint8Array(playerCount),

		// Converted walls for eliminated players
		wallPosX: new Float32Array(playerCount),
		wallPosY: new Float32Array(playerCount),
		wallHalfW: new Float32Array(playerCount),
		wallHalfH: new Float32Array(playerCount),
		wallActive: new Uint8Array(playerCount),

		// Border walls (4 fixed)
		borderPosX: [0, 0, -WORLD_RADIUS, WORLD_RADIUS],
		borderPosY: [-WORLD_RADIUS, WORLD_RADIUS, 0, 0],
		borderHalfW: [WORLD_RADIUS, WORLD_RADIUS, 1, 1],
		borderHalfH: [1, 1, WORLD_RADIUS, WORLD_RADIUS],

		// --- Grid buckets ---
		gridCellSize: CELL_SIZE,
		gridCols: COLS,
		gridRows: ROWS,
		ballBucketCounts: new Int32Array(CELL_COUNT),
		bucketBallIndices: new Int32Array(CELL_COUNT * MAX_BALLS_PER_CELL),
		boxBucketCounts: new Int32Array(CELL_COUNT),
		bucketBoxIndices: new Int32Array(CELL_COUNT * MAX_BOXES_PER_CELL),
	};
}

// Compute grid cell index for (x,y)
function getCellIndex(world, x, y) {
	const col = Math.min(world.gridCols - 1, Math.max(0, ((x + WORLD_RADIUS) / world.gridCellSize) | 0));
	const row = Math.min(world.gridRows - 1, Math.max(0, ((y + WORLD_RADIUS) / world.gridCellSize) | 0));
	return row * world.gridCols + col;
}

// Clear grid buckets
function clearBuckets(world) {
	world.ballBucketCounts.fill(0);
	world.boxBucketCounts.fill(0);
}

// Insert balls into grid
function insertBallsIntoGrid(world) {
	const { ballCount, ballPosX, ballPosY, bucketBallIndices, ballBucketCounts } = world;
	const cells = world.gridCols * world.gridRows;
	const maxPer = bucketBallIndices.length / cells;
	for (let b = 0; b < ballCount; b++) {
		if (!world.ballAlive[b]) continue;
		const x = ballPosX[b], y = ballPosY[b];
		const idx = getCellIndex(world, x, y);
		const c = ballBucketCounts[idx];
		if (c < maxPer) {
			bucketBallIndices[idx * maxPer + c] = b;
			ballBucketCounts[idx] = c + 1;
		}
	}
}

// Insert boxes (border + eliminated-walls) into grid
function insertBoxesIntoGrid(world) {
	const cells = world.gridCols * world.gridRows;
	const maxPer = world.bucketBoxIndices.length / cells;
	const put = (bx, by, idx) => {
		const cell = getCellIndex(world, bx, by);
		const c = world.boxBucketCounts[cell];
		if (c < maxPer) {
			world.bucketBoxIndices[cell * maxPer + c] = idx;
			world.boxBucketCounts[cell] = c + 1;
		}
	};
	// border: indices 0..3
	for (let i = 0; i < 4; i++) put(world.borderPosX[i], world.borderPosY[i], /* idx */ i);
	// eliminated player walls: idx 4..4+playerCount-1
	for (let p = 0; p < world.playerCount; p++) {
		if (world.isEliminated[p]) put(world.wallPosX[p], world.wallPosY[p], 4 + p);
	}
}

// Compute circle vs AABB MTV
function computeCircleAABB(cx, cy, r, bx, by, hw, hh) {
	const dx = cx - bx;
	const px = dx < -hw ? -hw : dx > hw ? hw : dx;
	const closestX = bx + px;
	const dy = cy - by;
	const py = dy < -hh ? -hh : dy > hh ? hh : dy;
	const closestY = by + py;
	const vx = cx - closestX;
	const vy = cy - closestY;
	const distSq = vx * vx + vy * vy;
	if (distSq >= r * r) return { penetration: 0, mtvX: 0, mtvY: 0 };
	const dist = Math.sqrt(distSq) || 1e-5;
	const pen = r - dist;
	const nx = vx / dist, ny = vy / dist;
	return { penetration: pen, mtvX: nx * pen, mtvY: ny * pen };
}

// Movement
function simulateMovement(world, dt) {
	for (let i = 0; i < world.ballCount; i++) {
		if (!world.ballAlive[i]) continue;
		world.ballPosX[i] += world.ballVelX[i] * dt;
		world.ballPosY[i] += world.ballVelY[i] * dt;
	}
}

// Handle elimination when ball reaches a player-goal
function detectGoals(world) {
	for (let i = 0; i < world.ballCount; i++) {
		if (!world.ballAlive[i]) continue;
		const x = world.ballPosX[i], y = world.ballPosY[i];
		// For each active paddle-wall (game goal), if ball crosses its plane
		for (let p = 0; p < world.playerCount; p++) {
			if (world.isEliminated[p]) continue;
			// e.g., left player at x = -WORLD_RADIUS;
			const px = world.paddlePosX[p];
			if (Math.abs(x - px) < world.ballRadius[i]) {
				// eliminate player p
				world.isEliminated[p] = 1;
				world.eliminatedCount++;
				// convert to wall
				world.wallPosX[p] = world.paddlePosX[p];
				world.wallPosY[p] = world.paddlePosY[p];
				world.wallHalfW[p] = world.paddleHalfW[p];
				world.wallHalfH[p] = world.paddleHalfH[p];
				world.wallActive[p] = 1;
				// despawn ball
				world.ballAlive[i] = 0;
				world.despawnQueue.push(i);
			}
		}
	}
}

// Physics sub-step (movement + collisions)
function physicsSubStep(world, dt) {
	simulateMovement(world, dt);
	clearBuckets(world);
	insertBallsIntoGrid(world);
	insertBoxesIntoGrid(world);

	// Ball↔Box collisions: reflect off border & eliminated-wall
	const cells = world.gridCols * world.gridRows;
	const maxBoxes = world.bucketBoxIndices.length / cells;
	for (let b = 0; b < world.ballCount; b++) {
		if (!world.ballAlive[b]) continue;
		const cx = world.ballPosX[b], cy = world.ballPosY[b], r = world.ballRadius[b];
		let sumX = 0, sumY = 0, tot = 0;
		const cell = getCellIndex(world, cx, cy);
		const boxC = world.boxBucketCounts[cell];
		const off = cell * maxBoxes;
		for (let bi = 0; bi < boxC; bi++) {
			const idx = world.bucketBoxIndices[off + bi];
			let bx, by, hw, hh;
			if (idx < 4) {
				// border
				bx = world.borderPosX[idx]; by = world.borderPosY[idx];
				hw = world.borderHalfW[idx]; hh = world.borderHalfH[idx];
			} else {
				// eliminated-player wall (idx-4)
				const p = idx - 4;
				bx = world.wallPosX[p]; by = world.wallPosY[p];
				hw = world.wallHalfW[p]; hh = world.wallHalfH[p];
			}
			const { penetration, mtvX, mtvY } = computeCircleAABB(cx, cy, r, bx, by, hw, hh);
			if (penetration > 0) {
				sumX += mtvX * penetration;
				sumY += mtvY * penetration;
				tot += penetration;
			}
		}
		if (tot > 0) {
			const ax = sumX / tot, ay = sumY / tot;
			world.ballPosX[b] += ax; world.ballPosY[b] += ay;
			const mag = Math.hypot(ax, ay);
			if (mag > 0) {
				const nx = ax / mag, ny = ay / mag;
				const vx = world.ballVelX[b], vy = world.ballVelY[b];
				const dot = vx * nx + vy * ny;
				world.ballVelX[b] = vx - 2 * dot * nx;
				world.ballVelY[b] = vy - 2 * dot * ny;
			}
		}
	}

	// Ball↔Ball collisions
	const maxBallsPerCell = world.bucketBallIndices.length / cells;
	for (let cell = 0; cell < cells; cell++) {
		const bc = world.ballBucketCounts[cell];
		const offB = cell * maxBallsPerCell;
		for (let i = 0; i < bc; i++) {
			const bi = world.bucketBallIndices[offB + i];
			if (!world.ballAlive[bi]) continue;
			const ax = world.ballPosX[bi], ay = world.ballPosY[bi], rA = world.ballRadius[bi];
			for (let j = i + 1; j < bc; j++) {
				const bj = world.bucketBallIndices[offB + j];
				if (!world.ballAlive[bj]) continue;
				const bx = world.ballPosX[bj], by = world.ballPosY[bj], rB = world.ballRadius[bj];
				const dx = bx - ax, dy = by - ay;
				const dsq = dx * dx + dy * dy, rsum = rA + rB;
				if (dsq < rsum * rsum) {
					const dist = Math.sqrt(dsq) || 1e-5;
					const pen = rsum - dist;
					const nx = dx / dist, ny = dy / dist;
					const h = pen * 0.5;
					world.ballPosX[bi] -= nx * h; world.ballPosY[bi] -= ny * h;
					world.ballPosX[bj] += nx * h; world.ballPosY[bj] += ny * h;
					const vA = { x: world.ballVelX[bi], y: world.ballVelY[bi] };
					const vB = { x: world.ballVelX[bj], y: world.ballVelY[bj] };
					const dA = vA.x * nx + vA.y * ny, dB = vB.x * nx + vB.y * ny;
					const rv = { x: (vA.x - (dA - dB) * nx), y: (vA.y - (dA - dB) * ny) };
					const ru = { x: (vB.x - (dB - dA) * nx), y: (vB.y - (dB - dA) * ny) };
					world.ballVelX[bi] = rv.x; world.ballVelY[bi] = rv.y;
					world.ballVelX[bj] = ru.x; world.ballVelY[bj] = ru.y;
				}
			}
		}
	}
}

// Public API
export const PhysicsBR = {
	games: new Map(),

	processTick({ gameId, tick, state, inputs }) {
		if (!this.games.has(gameId)) {
			console.log(`[PhysicsBR] Init world ${gameId}`);
			const world = createPhysicsWorld(state.paddles.length);
			// initialize paddles
			state.paddles.forEach((p, i) => {
				world.paddlePosX[i] = p.x; world.paddlePosY[i] = p.y;
				world.paddleHalfW[i] = p.halfW; world.paddleHalfH[i] = p.halfH;
			});
			world.ballCount = state.balls.length;
			for (let i = 0; i < world.ballCount; i++) {
				const b = state.balls[i];
				world.ballAlive[i] = 1;
				world.ballRadius[i] = b.radius;
				world.ballPosX[i] = b.x;
				world.ballPosY[i] = b.y;
				world.ballVelX[i] = b.vx;
				world.ballVelY[i] = b.vy;
			}
			// spawn first ball at center
			// const i = 0; world.ballCount = 1;
			// world.ballAlive[i] = 1; world.ballRadius[i] = state.balls[0].radius;
			// world.ballPosX[i] = 0; world.ballPosY[i] = 0;
			// world.ballVelX[i] = state.balls[0].vx; world.ballVelY[i] = state.balls[0].vy;
			this.games.set(gameId, { world });
		}
		const { world } = this.games.get(gameId);

		// handle paddle inputs
		inputs.forEach(({ playerId, input, type }) => {
			if (type === 'paddleUpdate') {
				world.paddlePosX[playerId] = input.x;
				world.paddlePosY[playerId] = input.y;
			}
		});

		// Phase transition logic (simplified)
		if (world.inPhaseTransition) {
			world.transitionTimer -= 1 / TARGET_FPS;
			world.shrinkProgress = 1 - world.transitionTimer / 2; // assume 2s anim
			if (world.transitionTimer <= 0) {
				world.inPhaseTransition = false;
				world.shrinkProgress = 0;
				// advance phase
				world.phaseIndex++;
			}
			return { gameId, tick, balls: [], paddles: [] };
		}

		// simulate sub-steps
		for (let s = 0; s < SUBSTEPS; s++) physicsSubStep(world, DT);

		// detect goals / eliminations
		detectGoals(world);

		// spawn new balls up to limit
		// TODO	implement spawn queue & 4 launch points

		// collect state
		const ballsOut = [], paddlesOut = [];
		for (let i = 0; i < world.ballCount; i++) {
			if (!world.ballAlive[i]) continue;
			ballsOut.push({ x: world.ballPosX[i], y: world.ballPosY[i], vx: world.ballVelX[i], vy: world.ballVelY[i], radius: world.ballRadius[i] });
		}
		state.paddles.forEach((_, i) => paddlesOut.push({ x: world.paddlePosX[i], y: world.paddlePosY[i], halfW: world.paddleHalfW[i], halfH: world.paddleHalfH[i] }));

		return { gameId, tick, balls: ballsOut, paddles: paddlesOut };
	},

	handleImmediateInput({ gameId, inputs = [] }) {
		// additional immediate actions, e.g. manual phase skip
	},

	removeGame(gameId) {
		this.games.delete(gameId);
	}
};

