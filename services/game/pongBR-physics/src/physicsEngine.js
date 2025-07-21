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

	GRID_CELL_SIZE_MULTIPLIER: 4, // Ball radius multiplier for grid cells
	MAX_BROAD_PHASE_CHECKS: 64,   // Limit broad phase checks per cell
};

const ENTITY_MASKS = {
	NONE: 0,
	BALL: 1,
	PADDLE: 2,
	PILLAR: 4,
	STATIC: 8
};

class PhysicsData {
	constructor(maxEntities) {
		this.maxEntities = maxEntities;
		this.count = 0;

		// Position and velocity 
		this.posX = new Float32Array(maxEntities);
		this.posY = new Float32Array(maxEntities);
		this.velX = new Float32Array(maxEntities);
		this.velY = new Float32Array(maxEntities);

		// Collision data 
		this.radius = new Float32Array(maxEntities);
		this.mask = new Uint8Array(maxEntities);

		this.isEliminated = new Uint8Array(maxEntities);

		// Transform data 
		this.halfW = new Float32Array(maxEntities);
		this.halfH = new Float32Array(maxEntities);
		this.rot = new Float32Array(maxEntities);

		// Arena offset 
		this.arenaX = 0;
		this.arenaY = 0;

		// Free list for entity recycling
		this.freeList = [];
		this.generation = new Uint16Array(maxEntities); // For entity versioning
	}

	create(mask) {
		let id;
		if (this.freeList.length > 0) {
			id = this.freeList.pop();
			this.generation[id]++;
		} else {
			if (this.count >= this.maxEntities) {
				throw new Error('Maximum entities exceeded');
			}
			id = this.count++;
			this.generation[id] = 0;
		}

		this.mask[id] = mask;
		this.posX[id] = this.posY[id] = 0;
		this.velX[id] = this.velY[id] = 0;
		this.radius[id] = 1;
		this.halfW[id] = this.halfH[id] = 1;
		this.rot[id] = 0;
		this.isEliminated[id] = 0;

		return id;
	}

	destroy(id) {
		if (id < 0 || id >= this.count) return;
		this.mask[id] = ENTITY_MASKS.NONE;
		this.freeList.push(id);
	}

	isActive(id) {
		return id >= 0 && id < this.count && this.mask[id] !== ENTITY_MASKS.NONE;
	}
}

class UniformGrid {
	constructor(cellSize, maxItemsPerCell = 64) {
		this.cellSize = cellSize;
		this.maxItemsPerCell = maxItemsPerCell;
		this.invCellSize = 1.0 / cellSize;
		this.buckets = new Map();
	}

	reset() {
		this.buckets.clear();
	}

	getKey(gx, gy) {
		return (gx << 16) | (gy & 0xFFFF);
	}

	add(id, x, y, radius = 0) {
		const minGx = Math.floor((x - radius) * this.invCellSize);
		const maxGx = Math.floor((x + radius) * this.invCellSize);
		const minGy = Math.floor((y - radius) * this.invCellSize);
		const maxGy = Math.floor((y + radius) * this.invCellSize);

		for (let gx = minGx; gx <= maxGx; gx++) {
			for (let gy = minGy; gy <= maxGy; gy++) {
				const key = this.getKey(gx, gy);
				let bucket = this.buckets.get(key);
				if (!bucket) {
					bucket = [];
					this.buckets.set(key, bucket);
				}
				if (bucket.length < this.maxItemsPerCell) {
					bucket.push(id);
				}
			}
		}
	}

	query(x, y, radius, callback) {
		const minGx = Math.floor((x - radius) * this.invCellSize);
		const maxGx = Math.floor((x + radius) * this.invCellSize);
		const minGy = Math.floor((y - radius) * this.invCellSize);
		const maxGy = Math.floor((y + radius) * this.invCellSize);

		for (let gx = minGx; gx <= maxGx; gx++) {
			for (let gy = minGy; gy <= maxGy; gy++) {
				const key = this.getKey(gx, gy);
				const bucket = this.buckets.get(key);
				if (bucket) {
					for (const id of bucket) {
						callback(id);
					}
				}
			}
		}
	}
}

const MathUtils = {
	rotatePoint(x, y, cos, sin) {
		return {
			x: x * cos - y * sin,
			y: x * sin + y * cos
		};
	},

	fastSqrt(x) {
		return Math.sqrt(x);
	},

	fastInvSqrt(x) {
		return 1.0 / Math.sqrt(x);
	}
};

function collideCircleWithOBB(circleX, circleY, circleRadius, rectX, rectY, rectHalfW, rectHalfH, rectCos, rectSin) {
	const dx = circleX - rectX;
	const dy = circleY - rectY;

	const localPoint = MathUtils.rotatePoint(dx, dy, rectCos, -rectSin);
	const localX = localPoint.x;
	const localY = localPoint.y;

	const closestX = Math.max(-rectHalfW, Math.min(rectHalfW, localX));
	const closestY = Math.max(-rectHalfH, Math.min(rectHalfH, localY));

	const distX = localX - closestX;
	const distY = localY - closestY;
	const distanceSquared = distX * distX + distY * distY;
	const radiusSquared = circleRadius * circleRadius;

	if (distanceSquared <= radiusSquared) {
		const distance = Math.sqrt(distanceSquared);

		let normalX, normalY;

		if (distance < CFG.COLLISION_EPSILON) {
			if (rectHalfW - Math.abs(localX) < rectHalfH - Math.abs(localY)) {
				normalX = localX > 0 ? 1 : -1;
				normalY = 0;
			} else {
				normalX = 0;
				normalY = localY > 0 ? 1 : -1;
			}
		} else {
			const invDistance = 1.0 / distance;
			normalX = distX * invDistance;
			normalY = distY * invDistance;
		}

		const worldNormal = MathUtils.rotatePoint(normalX, normalY, rectCos, rectSin);
		const penetration = circleRadius - distance;

		return {
			collision: true,
			normalX: worldNormal.x,
			normalY: worldNormal.y,
			penetration: Math.max(0, penetration)
		};
	}

	return { collision: false };
}

class PhysicsSystems {
	static movement(pd, dt, mask = ENTITY_MASKS.BALL) {
		for (let i = 0; i < pd.count; i++) {
			if ((pd.mask[i] & mask) === 0) continue;
			if (pd.isEliminated[i] === 1) continue;
			pd.posX[i] += pd.velX[i] * dt;
			pd.posY[i] += pd.velY[i] * dt;
		}
	}

	static ballBallCollision(pd, i, j) {
		const dx = pd.posX[j] - pd.posX[i];
		const dy = pd.posY[j] - pd.posY[i];
		const R = pd.radius[i] + pd.radius[j];
		const d2 = dx * dx + dy * dy;
		const R2 = R * R;

		if (d2 >= R2) return false;

		const dist = Math.sqrt(d2);

		if (dist < CFG.COLLISION_EPSILON) {
			const angle = Math.random() * 2 * Math.PI;
			const separation = R * 0.5;
			const cos = Math.cos(angle);
			const sin = Math.sin(angle);

			pd.posX[i] += cos * separation;
			pd.posY[i] += sin * separation;
			pd.posX[j] -= cos * separation;
			pd.posY[j] -= sin * separation;
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
		const ballX = pd.posX[ballId];
		const ballY = pd.posY[ballId];
		const ballRadius = pd.radius[ballId];

		const staticX = pd.posX[staticId];
		const staticY = pd.posY[staticId];
		const staticHalfW = pd.halfW[staticId];
		const staticHalfH = pd.halfH[staticId];
		const staticAngle = pd.rot[staticId];

		const cos = Math.cos(staticAngle);
		const sin = Math.sin(staticAngle);

		const collision = collideCircleWithOBB(
			ballX, ballY, ballRadius,
			staticX, staticY, staticHalfW, staticHalfH, cos, sin
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

export class PhysicsEngine {
	constructor(cfg = CFG) {
		this.cfg = { ...CFG, ...cfg };
		this.pd = new PhysicsData(this.cfg.MAX_PLAYERS + this.cfg.INITIAL_BALLS + this.cfg.MAX_PLAYERS + 16);
		this.dt = 1 / this.cfg.TARGET_FPS / this.cfg.SUB_STEPS;

		const gridCellSize = this.cfg.BALL_RADIUS * this.cfg.GRID_CELL_SIZE_MULTIPLIER;
		this.ballGrid = new UniformGrid(gridCellSize);

		this.entities = {
			balls: [],
			paddles: [],
			pillars: []
		};
		this.playerStates = {
			eliminated: new Set(),
			activePlayers: new Set(),
			eliminationOrder: []
		};


		this.paddleData = {
			offsets: [],
			maxOffsets: [],
			centerAngles: [],
			inputStates: [],
			dead: [] // Add dead status tracking
		};

		this.paddleTrig = {
			cos: [],
			sin: []
		};

		this.currentPhase = 'Phase 1';
		this.phaseHistory = [];

		this.gameEvents = [];
	}

	initBattleRoyale(numPlayers, numBalls) {
		this.reset();

		const cfg = this.cfg;
		const pd = this.pd;

		this.paddleData.offsets = new Float32Array(numPlayers);
		this.paddleData.maxOffsets = new Float32Array(numPlayers);
		this.paddleData.centerAngles = new Float32Array(numPlayers);
		this.paddleData.inputStates = new Int8Array(numPlayers);
		this.paddleData.dead = new Uint8Array(numPlayers);

		this.paddleTrig.cos = new Float32Array(numPlayers);
		this.paddleTrig.sin = new Float32Array(numPlayers);

		const angleStep = (2 * Math.PI) / numPlayers;
		const paddleArc = angleStep * cfg.PADDLE_FILL;
		const halfArc = paddleArc / 2;
		const pillarArc = angleStep * 0.1;
		const usableArc = angleStep - pillarArc;
		const halfUsableArc = usableArc / 2;
		const maxOffsets = halfUsableArc - halfArc;

		for (let pid = 0; pid < numPlayers; pid++) {
			const paddleEnt = pd.create(ENTITY_MASKS.PADDLE);
			this.entities.paddles[pid] = paddleEnt;

			const sliceStart = pid * angleStep;
			const midAngle = sliceStart + pillarArc + halfUsableArc;

			this.paddleData.centerAngles[pid] = midAngle;
			this.paddleData.maxOffsets[pid] = maxOffsets;
			this.paddleData.offsets[pid] = 0;

			const paddleAngle = midAngle;
			pd.posX[paddleEnt] = Math.cos(paddleAngle) * cfg.ARENA_RADIUS;
			pd.posY[paddleEnt] = Math.sin(paddleAngle) * cfg.ARENA_RADIUS;
			pd.rot[paddleEnt] = paddleAngle - Math.PI / 2;

			const perim = 2 * Math.PI * cfg.ARENA_RADIUS;
			const cellW = (perim / numPlayers) * cfg.PADDLE_FILL;
			pd.halfW[paddleEnt] = cellW / 2;
			pd.halfH[paddleEnt] = (cellW * cfg.PADDLE_RATIO) / 2;
			pd.radius[paddleEnt] = cellW / 2;

			this.paddleTrig.cos[pid] = Math.cos(paddleAngle - Math.PI / 2);
			this.paddleTrig.sin[pid] = Math.sin(paddleAngle - Math.PI / 2);

			const pillarEnt = pd.create(ENTITY_MASKS.PILLAR | ENTITY_MASKS.STATIC);
			this.entities.pillars[pid] = pillarEnt;

			const pillarAngle = midAngle - maxOffsets - halfArc;
			const pillarSize = cfg.ARENA_RADIUS * pillarArc;

			const baseX = Math.cos(pillarAngle) * cfg.ARENA_RADIUS;
			const baseY = Math.sin(pillarAngle) * cfg.ARENA_RADIUS;

			const tx = -Math.sin(pillarAngle);
			const ty = Math.cos(pillarAngle);
			const halfThickness = pillarSize / 2;

			pd.posX[pillarEnt] = baseX - tx * halfThickness;
			pd.posY[pillarEnt] = baseY - ty * halfThickness;
			pd.rot[pillarEnt] = pillarAngle;

			pd.halfW[pillarEnt] = pillarSize / 2;
			pd.halfH[pillarEnt] = pillarSize / 2;
			pd.radius[pillarEnt] = pillarSize / 2;
		}

		// Create balls
		for (let b = 0; b < numBalls; b++) {
			const ballEnt = pd.create(ENTITY_MASKS.BALL);
			this.entities.balls[b] = ballEnt;

			pd.radius[ballEnt] = cfg.BALL_RADIUS;

			// Random spawn position
			const maxSpawnRadius = cfg.ARENA_RADIUS * 0.6;
			const r0 = Math.sqrt(Math.random()) * maxSpawnRadius;
			const t0 = Math.random() * 2 * Math.PI;
			pd.posX[ballEnt] = r0 * Math.cos(t0);
			pd.posY[ballEnt] = r0 * Math.sin(t0);

			// Random initial velocity
			const d = Math.random() * 2 * Math.PI;
			pd.velX[ballEnt] = Math.cos(d) * cfg.INITIAL_SPEED;
			pd.velY[ballEnt] = Math.sin(d) * cfg.INITIAL_SPEED;
		}
		this.playerStates.eliminated.clear();
		this.playerStates.activePlayers.clear();
		this.playerStates.eliminationOrder = [];

		for (let pid = 0; pid < numPlayers; pid++) {
			this.playerStates.activePlayers.add(pid);
			this.paddleData.dead[pid] = 0;
		}
	}
	checkGoalCollisions() {
		const pd = this.pd;
		const cfg = this.cfg;

		for (let ballIndex = this.entities.balls.length - 1; ballIndex >= 0; ballIndex--) {
			const ballEnt = this.entities.balls[ballIndex];
			if (!pd.isActive(ballEnt)) continue;

			const ballX = pd.posX[ballEnt];
			const ballY = pd.posY[ballEnt];
			const distFromCenter = Math.sqrt(ballX * ballX + ballY * ballY);

			if (distFromCenter > cfg.ARENA_RADIUS) {
				const ballAngle = Math.atan2(ballY, ballX);
				const eliminatedPlayer = this.findPlayerByAngle(ballAngle);

				if (eliminatedPlayer !== -1 && !this.playerStates.eliminated.has(eliminatedPlayer)) {
					this.eliminatePlayer(eliminatedPlayer, ballIndex);
					return;
				}
			}
		}
	}

	findPlayerByAngle(ballAngle) {
		// Normalize angle to [0, 2π)
		let normalizedAngle = ballAngle;
		while (normalizedAngle < 0) normalizedAngle += 2 * Math.PI;
		while (normalizedAngle >= 2 * Math.PI) normalizedAngle -= 2 * Math.PI;

		const numPlayers = this.entities.paddles.length;
		const angleStep = (2 * Math.PI) / numPlayers;

		for (let pid = 0; pid < numPlayers; pid++) {
			if (this.playerStates.eliminated.has(pid)) continue;

			// Use existing paddle data instead of duplicating calculations
			const centerAngle = this.paddleData.centerAngles[pid];
			const sliceStart = (pid * angleStep);
			const sliceEnd = ((pid + 1) * angleStep);
			// Handle angle wrapping
			let normalizedStart = sliceStart;
			let normalizedEnd = sliceEnd;

			while (normalizedStart < 0) normalizedStart += 2 * Math.PI;
			while (normalizedStart >= 2 * Math.PI) normalizedStart -= 2 * Math.PI;
			while (normalizedEnd < 0) normalizedEnd += 2 * Math.PI;
			while (normalizedEnd >= 2 * Math.PI) normalizedEnd -= 2 * Math.PI;

			let withinGoal = false;
			if (normalizedStart <= normalizedEnd) {
				withinGoal = normalizedAngle >= normalizedStart && normalizedAngle <= normalizedEnd;
			} else {
				withinGoal = normalizedAngle >= normalizedStart || normalizedAngle <= normalizedEnd;
			}

			if (withinGoal) {
				return pid;
			}
		}

		return -1;
	}

	eliminatePlayer(playerId, ballIndex) {
		const pd = this.pd;

		// Mark player as eliminated
		this.playerStates.eliminated.add(playerId);
		this.playerStates.activePlayers.delete(playerId);
		this.paddleData.dead[playerId] = 1;
		this.playerStates.eliminationOrder.push({
			playerId,
			timestamp: Date.now(),
			ballIndex
		});

		// Remove the ball that scored the goal
		this.disableBall(ballIndex);

		this.convertPaddleToWall(playerId);
		// Keep paddle and pillar active but mark as eliminated for rendering
		// They stay in place for future phase transitions
		const paddleEnt = this.entities.paddles[playerId];
		const pillarEnt = this.entities.pillars[playerId];

		if (pd.isActive(paddleEnt)) {
			pd.isEliminated[paddleEnt] = 1; // Visual marker only
		}
		if (pd.isActive(pillarEnt)) {
			pd.isEliminated[pillarEnt] = 1; // Visual marker only
		}

		// Create elimination event
		this.gameEvents.push({
			type: 'PLAYER_ELIMINATED',
			playerId,
			timestamp: Date.now(),
			remainingPlayers: this.playerStates.activePlayers.size
		});

		console.log(`Player ${playerId} eliminated! ${this.playerStates.activePlayers.size} players remaining.`);

		// Check for phase transition instead of immediate game end
		this.checkPhaseTransition();
	}

	convertPaddleToWall(playerId) {
		const pd = this.pd;
		const cfg = this.cfg;
		const paddleEnt = this.entities.paddles[playerId];
		const pillarEnt = this.entities.pillars[playerId];

		if (!pd.isActive(paddleEnt)) return;

		const numPlayers = this.entities.paddles.length;
		const angleStep = (2 * Math.PI) / numPlayers;
		const centerAngle = this.paddleData.centerAngles[playerId];

		const wallArc = angleStep; // Full slice width
		const wallAngle = centerAngle;

		pd.posX[paddleEnt] = Math.cos(wallAngle) * cfg.ARENA_RADIUS;
		pd.posY[paddleEnt] = Math.sin(wallAngle) * cfg.ARENA_RADIUS;
		pd.rot[paddleEnt] = wallAngle - Math.PI / 2;

		const perim = 2 * Math.PI * cfg.ARENA_RADIUS;
		const wallWidth = (perim / numPlayers);
		pd.halfW[paddleEnt] = wallWidth / 2;
		pd.halfH[paddleEnt] = (wallWidth * cfg.PADDLE_RATIO) / 2;

		pd.isEliminated[paddleEnt] = 1;

		if (pd.isActive(pillarEnt)) {
			pd.isEliminated[pillarEnt] = 1;
		}

		this.paddleData.offsets[playerId] = 0;
	}

	checkPhaseTransition() {
		const remainingPlayers = this.playerStates.activePlayers.size;
		const totalPlayers = this.entities.paddles.length;

		const phaseThresholds = [
			{ minPlayers: 50, name: 'Phase 1' },
			{ minPlayers: 25, name: 'Phase 2' },
			{ minPlayers: 12, name: 'Phase 3' },
			{ minPlayers: 6, name: 'Phase 4' },
			{ minPlayers: 3, name: 'Final Phase' }
		];

		let currentPhase = null;
		for (const phase of phaseThresholds) {
			if (remainingPlayers >= phase.minPlayers) {
				currentPhase = phase;
				break;
			}
		}

		if (currentPhase && this.currentPhase !== currentPhase.name) {
			this.triggerPhaseTransition(currentPhase);
		} else if (remainingPlayers <= 1) {
			this.endGame();
		}
	}

	triggerPhaseTransition(newPhase) {
		this.currentPhase = newPhase.name;

		this.gameEvents.push({
			type: 'PHASE_TRANSITION',
			phase: newPhase.name,
			remainingPlayers: this.playerStates.activePlayers.size,
			timestamp: Date.now()
		});

		console.log(`Phase Transition: ${newPhase.name} - ${this.playerStates.activePlayers.size} players remaining`);

		// Future:  rebuild the arena
	}

	rebuildArenaForPhase(phaseName) {
		const activePlayers = Array.from(this.playerStates.activePlayers);

		// Future implementation:
		// 1. Calculate new arena size/configuration
		// 2. Reposition active players
		// 3. Remove eliminated players' entities
		// 4. Adjust ball physics if needed

		console.log(`Rebuilding arena for ${phaseName} with ${activePlayers.length} players`);

		this.gameEvents.push({
			type: 'ARENA_REBUILT',
			phase: phaseName,
			activePlayers: [...activePlayers],
			timestamp: Date.now()
		});
	}

	endGame() {
		const winner = this.playerStates.activePlayers.size === 1
			? Array.from(this.playerStates.activePlayers)[0]
			: null;

		this.gameEvents.push({
			type: 'GAME_END',
			winner,
			timestamp: Date.now(),
			eliminationOrder: [...this.playerStates.eliminationOrder]
		});

		console.log(winner !== null ? `Game Over! Winner: Player ${winner}` : 'Game Over! No winner.');
	}

	reset() {
		this.pd.count = 0;
		this.pd.freeList.length = 0;
		this.entities.balls.length = 0;
		this.entities.paddles.length = 0;
		this.entities.pillars.length = 0;
	}

	updatePaddleInputState(pid, moveInput) {
		if (pid >= 0 && pid < this.paddleData.inputStates.length) {
			this.paddleData.inputStates[pid] = Math.max(-1, Math.min(1, moveInput));
		}
	}

	updatePaddleMovement() {
		const cfg = this.cfg;
		const pd = this.pd;
		const dt = 1 / this.cfg.TARGET_FPS; // Full frame time
		const moveSpeed = 10.;
		const numPlayers = this.entities.paddles.length;

		for (let pid = 0; pid < numPlayers; pid++) {
			if (this.playerStates.eliminated.has(pid)) continue;
			const paddleEnt = this.entities.paddles[pid];
			if (!pd.isActive(paddleEnt)) continue;

			const moveInput = this.paddleData.inputStates[pid];
			if (moveInput === 0) continue;

			const deltaOffset = moveInput * moveSpeed / numPlayers / 4 * dt;
			const newOffset = this.paddleData.offsets[pid] + deltaOffset;
			const maxOffset = this.paddleData.maxOffsets[pid];

			this.paddleData.offsets[pid] = Math.max(-maxOffset, Math.min(maxOffset, newOffset));

			const centerAngle = this.paddleData.centerAngles[pid];
			const currentAngle = centerAngle + this.paddleData.offsets[pid];

			pd.posX[paddleEnt] = Math.cos(currentAngle) * cfg.ARENA_RADIUS;
			pd.posY[paddleEnt] = Math.sin(currentAngle) * cfg.ARENA_RADIUS;
			pd.rot[paddleEnt] = currentAngle - Math.PI / 2;

			// Update precomputed trigonometry
			this.paddleTrig.cos[pid] = Math.cos(pd.rot[paddleEnt]);
			this.paddleTrig.sin[pid] = Math.sin(pd.rot[paddleEnt]);

			pd.velX[paddleEnt] = 0;
			pd.velY[paddleEnt] = 0;
		}
	}

	handleArenaCollisions() {
		const pd = this.pd;
		const cfg = this.cfg;
		const numPlayers = this.entities.paddles.length;
		const angleStep = (2 * Math.PI) / numPlayers;

		for (const ballEnt of this.entities.balls) {
			if (!pd.isActive(ballEnt) || pd.isEliminated[ballEnt] === 1) continue;

			const ballX = pd.posX[ballEnt];
			const ballY = pd.posY[ballEnt];
			const ballRadius = pd.radius[ballEnt];
			const distFromCenter = Math.sqrt(ballX * ballX + ballY * ballY);

			const collisionDistance = cfg.ARENA_RADIUS - ballRadius;

			if (distFromCenter >= collisionDistance && distFromCenter <= cfg.ARENA_RADIUS + 1) {
				const invDist = 1.0 / distFromCenter;
				const nx = ballX * invDist;
				const ny = ballY * invDist;
				const velocityDotNormal = pd.velX[ballEnt] * nx + pd.velY[ballEnt] * ny;

				if (velocityDotNormal <= 0) continue;

				const ballAngle = Math.atan2(ballY, ballX);
				let normalizedBallAngle = ballAngle;
				while (normalizedBallAngle < 0) normalizedBallAngle += 2 * Math.PI;
				while (normalizedBallAngle >= 2 * Math.PI) normalizedBallAngle -= 2 * Math.PI;

				// Check paddle collisions
				for (let paddleIndex = 0; paddleIndex < numPlayers; paddleIndex++) {
					let currentPaddleAngle, arcWidth;

					if (this.playerStates.eliminated.has(paddleIndex)) {
						// Eliminated player - treat as full wall
						currentPaddleAngle = this.paddleData.centerAngles[paddleIndex];
						arcWidth = angleStep; // Full arc width
					} else {
						// Active player - normal paddle
						currentPaddleAngle = this.paddleData.centerAngles[paddleIndex] + this.paddleData.offsets[paddleIndex];
						arcWidth = angleStep * cfg.PADDLE_FILL;
					}

					const startAngle = currentPaddleAngle - arcWidth / 2;
					const endAngle = currentPaddleAngle + arcWidth / 2;

					let normalizedStart = startAngle;
					let normalizedEnd = endAngle;

					while (normalizedStart < 0) normalizedStart += 2 * Math.PI;
					while (normalizedStart >= 2 * Math.PI) normalizedStart -= 2 * Math.PI;
					while (normalizedEnd < 0) normalizedEnd += 2 * Math.PI;
					while (normalizedEnd >= 2 * Math.PI) normalizedEnd -= 2 * Math.PI;

					let withinSlice = false;
					if (normalizedStart <= normalizedEnd) {
						withinSlice = normalizedBallAngle >= normalizedStart && normalizedBallAngle <= normalizedEnd;
					} else {
						withinSlice = normalizedBallAngle >= normalizedStart || normalizedBallAngle <= normalizedEnd;
					}

					if (withinSlice) {
						// Position correction
						pd.posX[ballEnt] = nx * collisionDistance;
						pd.posY[ballEnt] = ny * collisionDistance;

						// Velocity reflection
						const dot = pd.velX[ballEnt] * nx + pd.velY[ballEnt] * ny;
						pd.velX[ballEnt] -= 2 * dot * nx;
						pd.velY[ballEnt] -= 2 * dot * ny;

						pd.velX[ballEnt] *= cfg.VELOCITY_DAMPING;
						pd.velY[ballEnt] *= cfg.VELOCITY_DAMPING;
						break;
					}
				}
			}
		}
	}
	step() {
		const pd = this.pd;
		const cfg = this.cfg;

		for (const pillarEnt of this.entities.pillars) {
			if (pd.isActive(pillarEnt)) {
				pd.velX[pillarEnt] = 0;
				pd.velY[pillarEnt] = 0;
			}
		}

		this.updatePaddleMovement();

		const subDt = this.dt;

		for (let ss = 0; ss < cfg.SUB_STEPS; ss++) {
			PhysicsSystems.movement(pd, subDt, ENTITY_MASKS.BALL);

			this.handleArenaCollisions();

			for (const ballEnt of this.entities.balls) {
				if (!pd.isActive(ballEnt) || pd.isEliminated[ballEnt] === 1) continue;

				for (const pillarEnt of this.entities.pillars) {
					if (!pd.isActive(pillarEnt)) continue;
					PhysicsSystems.ballStaticCollision(pd, ballEnt, pillarEnt, cfg);
				}
			}

			this.ballGrid.reset();

			for (const ballEnt of this.entities.balls) {
				if (!pd.isActive(ballEnt) || pd.isEliminated[ballEnt] === 1) continue;

				this.ballGrid.add(ballEnt, pd.posX[ballEnt], pd.posY[ballEnt], pd.radius[ballEnt]);
			}

			const processedPairs = new Set();

			for (const bucket of this.ballGrid.buckets.values()) {
				if (bucket.length < 2) continue;

				const entries = bucket.map(id => ({
					id,
					minX: pd.posX[id] - pd.radius[id],
					maxX: pd.posX[id] + pd.radius[id]
				}));
				entries.sort((a, b) => a.minX - b.minX);

				for (let i = 0; i < entries.length; i++) {
					for (let j = i + 1; j < entries.length; j++) {
						if (entries[j].minX > entries[i].maxX) break;

						const idA = entries[i].id;
						const idB = entries[j].id;

						const pairKey = idA < idB ? `${idA},${idB}` : `${idB},${idA}`;
						if (processedPairs.has(pairKey)) continue;
						processedPairs.add(pairKey);

						PhysicsSystems.ballBallCollision(pd, idA, idB);
					}
				}
			}
		}

		this.checkGoalCollisions();
		return this.getState();
	}

	getState() {
		const pd = this.pd;

		const balls = this.entities.balls
			.filter(ent => pd.isActive(ent))
			.map((ent, i) => ({
				id: i,
				x: pd.posX[ent],
				y: pd.posY[ent],
				vx: pd.velX[ent],
				vy: pd.velY[ent],
				radius: pd.radius[ent]
			}));

		const paddles = this.entities.paddles
			.filter(ent => pd.isActive(ent))
			.map((ent, i) => ({
				id: i,
				offset: this.paddleData.offsets[i],
				x: pd.posX[ent],
				y: pd.posY[ent],
				dead: this.paddleData.dead[i] === 1,
				rot: pd.rot[ent]
			}));

		const pillars = this.entities.pillars
			.filter(ent => pd.isActive(ent))
			.map((ent, i) => ({
				id: i,
				x: pd.posX[ent],
				y: pd.posY[ent],
				rot: pd.rot[ent],
				radius: pd.radius[ent],
				halfW: pd.halfW[ent],
				halfH: pd.halfH[ent]
			}));

		return {
			balls,
			paddles,
			pillars,
			events: [],
			arenaCenter: { x: pd.arenaX, y: pd.arenaY },
			config: this.cfg,
			numPlayers: this.entities.paddles.length,
			frameStats: {
				activeBalls: balls.length,
				activePaddles: paddles.length,
				activePillars: pillars.length
			}
		};
	}

	disableBall(ballIndex) {
		if (ballIndex < 0 || ballIndex >= this.entities.balls.length) return false;

		const ballEnt = this.entities.balls[ballIndex];
		const pd = this.pd;

		if (!pd.isActive(ballEnt)) return false;

		const farDistance = this.cfg.ARENA_RADIUS * 10;
		pd.posX[ballEnt] = farDistance;
		pd.posY[ballEnt] = farDistance;

		pd.velX[ballEnt] = 0;
		pd.velY[ballEnt] = 0;

		pd.isEliminated[ballEnt] = 1;

		return true;
	}

	isPlayerEliminated(playerId) {
		return this.playerStates.eliminated.has(playerId);
	}

	getRemainingPlayers() {
		return Array.from(this.playerStates.activePlayers);
	}

	getEliminationOrder() {
		return [...this.playerStates.eliminationOrder];
	}

	resetGame() {
		this.reset();
		this.playerStates.eliminated.clear();
		this.playerStates.activePlayers.clear();
		this.playerStates.eliminationOrder = [];
		this.gameEvents = [];
		if (this.paddleData.dead) {
			this.paddleData.dead.fill(0);
		}
	}
	addBall(x, y, vx, vy, radius = null) {
		const pd = this.pd;
		const ballEnt = pd.create(ENTITY_MASKS.BALL);

		pd.posX[ballEnt] = x;
		pd.posY[ballEnt] = y;
		pd.velX[ballEnt] = vx;
		pd.velY[ballEnt] = vy;
		pd.radius[ballEnt] = radius || this.cfg.BALL_RADIUS;

		this.entities.balls.push(ballEnt);
		return ballEnt;
	}

	removeBall(ballIndex) {
		if (ballIndex < 0 || ballIndex >= this.entities.balls.length) return false;

		const ballEnt = this.entities.balls[ballIndex];
		this.pd.destroy(ballEnt);
		this.entities.balls.splice(ballIndex, 1);
		return true;
	}

	getPerformanceStats() {
		return {
			entityCount: this.pd.count,
			activeBalls: this.entities.balls.filter(ent => this.pd.isActive(ent)).length,
			activePaddles: this.entities.paddles.filter(ent => this.pd.isActive(ent)).length,
			gridBuckets: this.ballGrid.buckets.size,
			freeEntities: this.pd.freeList.length
		};
	}
}
