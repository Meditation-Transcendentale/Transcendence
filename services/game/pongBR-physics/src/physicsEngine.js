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
};

const ENTITY_MASKS = {
	NONE: 0, BALL: 1, PADDLE: 2, PILLAR: 4, STATIC: 8
};

class PhysicsData {
	constructor(maxEntities) {
		this.maxEntities = maxEntities;
		this.count = 0;

		// Position and velocity arrays
		this.posX = new Float32Array(maxEntities);
		this.posY = new Float32Array(maxEntities);
		this.velX = new Float32Array(maxEntities);
		this.velY = new Float32Array(maxEntities);

		// Collision data
		this.radius = new Float32Array(maxEntities);
		this.mask = new Uint8Array(maxEntities);
		this.isEliminated = new Uint8Array(maxEntities);

		// Transform data for rectangles
		this.halfW = new Float32Array(maxEntities);
		this.halfH = new Float32Array(maxEntities);
		this.rot = new Float32Array(maxEntities);

		// Entity recycling
		this.freeList = [];
		this.generation = new Uint16Array(maxEntities);
	}

	create(mask) {
		let id;
		if (this.freeList.length > 0) {
			id = this.freeList.pop();
			this.generation[id]++;
		} else {
			if (this.count >= this.maxEntities) throw new Error('Maximum entities exceeded');
			id = this.count++;
			this.generation[id] = 0;
		}

		this.mask[id] = mask;
		this.posX[id] = this.posY[id] = 0;
		this.velX[id] = this.velY[id] = 0;
		this.radius[id] = this.halfW[id] = this.halfH[id] = 1;
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

	reset() { this.buckets.clear(); }
	getKey(gx, gy) { return (gx << 16) | (gy & 0xFFFF); }

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
}

function collideCircleWithOBB(circleX, circleY, circleRadius, rectX, rectY, rectHalfW, rectHalfH, rectCos, rectSin) {
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
			normalX = rectHalfW - Math.abs(localX) < rectHalfH - Math.abs(localY) ? (localX > 0 ? 1 : -1) : 0;
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

class PhysicsSystems {
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

export class PhysicsEngine {
	constructor(cfg = CFG) {
		this.cfg = { ...CFG, ...cfg };
		this.pd = new PhysicsData(this.cfg.MAX_PLAYERS + this.cfg.INITIAL_BALLS + this.cfg.MAX_PLAYERS + 16);
		this.dt = 1 / this.cfg.TARGET_FPS / this.cfg.SUB_STEPS;

		const gridCellSize = this.cfg.BALL_RADIUS * this.cfg.GRID_CELL_SIZE_MULTIPLIER;
		this.ballGrid = new UniformGrid(gridCellSize);

		this.entities = { balls: [], paddles: [], pillars: [] };
		this.paddleData = {
			offsets: [], maxOffsets: [], centerAngles: [],
			inputStates: [], dead: []
		};

		this.playerStates = {
			eliminated: new Set(),
			activePlayers: new Set(),
			eliminationOrder: []
		};

		this.currentPhase = 'Phase 1';
		this.isRebuilding = false;
		this.rebuildStartTime = 0;
		this.rebuildDuration = 3000;
		this.playerMapping = {};
		this.originalPlayerCount = 0;

		this.gameEvents = [];
	}

	getPhaseConfig(phase = this.currentPhase) {
		const configs = {
			'Phase 1': { playerCount: 100, minPlayers: 51 },
			'Phase 2': { playerCount: 50, minPlayers: 26 },
			'Phase 3': { playerCount: 25, minPlayers: 13 },
			'Phase 4': { playerCount: 12, minPlayers: 7 },
			'Final Phase': { playerCount: 3, minPlayers: 2 }
		};
		return configs[phase] || configs['Phase 1'];
	}

	getPhasePaddleSize(phase = this.currentPhase) {
		const perim = 2 * Math.PI * this.cfg.ARENA_RADIUS;
		const playerCount = this.getPhaseConfig(phase).playerCount;
		return (perim / playerCount) * this.cfg.PADDLE_FILL;
	}

	initBattleRoyale(numPlayers, numBalls) {
		this.reset();
		this.originalPlayerCount = numPlayers;

		this.paddleData.offsets = new Float32Array(numPlayers);
		this.paddleData.maxOffsets = new Float32Array(numPlayers);
		this.paddleData.centerAngles = new Float32Array(numPlayers);
		this.paddleData.inputStates = new Int8Array(numPlayers);
		this.paddleData.dead = new Uint8Array(numPlayers);

		this.createPaddles(numPlayers);
		this.createBalls(numBalls);

		this.playerStates.eliminated.clear();
		this.playerStates.activePlayers.clear();
		this.playerStates.eliminationOrder = [];
		for (let pid = 0; pid < numPlayers; pid++) {
			this.playerStates.activePlayers.add(pid);
			this.paddleData.dead[pid] = 0;
		}
	}

	createPaddles(numPlayers) {
		const cfg = this.cfg;
		const pd = this.pd;
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

			pd.posX[paddleEnt] = Math.cos(midAngle) * cfg.ARENA_RADIUS;
			pd.posY[paddleEnt] = Math.sin(midAngle) * cfg.ARENA_RADIUS;
			pd.rot[paddleEnt] = midAngle - Math.PI / 2;

			const perim = 2 * Math.PI * cfg.ARENA_RADIUS;
			const cellW = (perim / numPlayers) * cfg.PADDLE_FILL;
			pd.halfW[paddleEnt] = cellW / 2;
			pd.halfH[paddleEnt] = (cellW * cfg.PADDLE_RATIO) / 2;
			pd.radius[paddleEnt] = cellW / 2;

			const pillarEnt = pd.create(ENTITY_MASKS.PILLAR | ENTITY_MASKS.STATIC);
			this.entities.pillars[pid] = pillarEnt;

			const pillarAngle = midAngle - maxOffsets - halfArc;
			const pillarSize = cfg.ARENA_RADIUS * pillarArc;

			pd.posX[pillarEnt] = Math.cos(pillarAngle) * cfg.ARENA_RADIUS;
			pd.posY[pillarEnt] = Math.sin(pillarAngle) * cfg.ARENA_RADIUS;
			pd.rot[pillarEnt] = pillarAngle;
			pd.halfW[pillarEnt] = pd.halfH[pillarEnt] = pd.radius[pillarEnt] = pillarSize / 2;
		}
	}

	createBalls(numBalls) {
		const cfg = this.cfg;
		const pd = this.pd;

		for (let b = 0; b < numBalls; b++) {
			const ballEnt = pd.create(ENTITY_MASKS.BALL);
			this.entities.balls[b] = ballEnt;

			pd.radius[ballEnt] = cfg.BALL_RADIUS;

			const maxSpawnRadius = cfg.ARENA_RADIUS * 0.6;
			const r = Math.sqrt(Math.random()) * maxSpawnRadius;
			const theta = Math.random() * 2 * Math.PI;
			pd.posX[ballEnt] = r * Math.cos(theta);
			pd.posY[ballEnt] = r * Math.sin(theta);

			const dir = Math.random() * 2 * Math.PI;
			pd.velX[ballEnt] = Math.cos(dir) * cfg.INITIAL_SPEED;
			pd.velY[ballEnt] = Math.sin(dir) * cfg.INITIAL_SPEED;
		}
	}

	checkGoalCollisions() {
		const pd = this.pd;
		const cfg = this.cfg;

		for (let ballIndex = this.entities.balls.length - 1; ballIndex >= 0; ballIndex--) {
			const ballEnt = this.entities.balls[ballIndex];
			// Skip disabled balls
			if (!pd.isActive(ballEnt) || pd.isEliminated[ballEnt] === 1) continue;

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
		while (ballAngle < 0) ballAngle += 2 * Math.PI;
		while (ballAngle >= 2 * Math.PI) ballAngle -= 2 * Math.PI;

		const numPlayers = this.entities.paddles.length;
		const angleStep = (2 * Math.PI) / numPlayers;

		for (let pid = 0; pid < numPlayers; pid++) {
			const sliceStart = pid * angleStep;
			const sliceEnd = (pid + 1) * angleStep;

			let withinSlice;
			if (sliceStart <= sliceEnd) {
				withinSlice = ballAngle >= sliceStart && ballAngle <= sliceEnd;
			} else {
				withinSlice = ballAngle >= sliceStart || ballAngle <= sliceEnd;
			}

			if (withinSlice) {
				if (this.playerMapping && Object.keys(this.playerMapping).length > 0) {
					const reverseMapping = Object.entries(this.playerMapping).find(([origId, newIdx]) => newIdx === pid);
					return reverseMapping ? parseInt(reverseMapping[0]) : pid;
				}
				return pid;
			}
		}
		return -1;
	}

	eliminatePlayer(playerId, ballIndex) {
		// Mark player as eliminated
		this.playerStates.eliminated.add(playerId);
		this.playerStates.activePlayers.delete(playerId);
		this.paddleData.dead[playerId] = 1;
		this.playerStates.eliminationOrder.push({
			playerId, timestamp: Date.now(), ballIndex
		});

		this.disableBall(ballIndex);
		this.convertPaddleToWall(playerId);

		this.gameEvents.push({
			type: 'PLAYER_ELIMINATED',
			playerId,
			timestamp: Date.now(),
			remainingPlayers: this.playerStates.activePlayers.size
		});

		console.log(`Player ${playerId} eliminated! ${this.playerStates.activePlayers.size} players remaining.`);
		this.checkPhaseTransition();
	}

	convertPaddleToWall(playerId) {
		const pd = this.pd;
		const paddleEnt = this.entities.paddles[playerId];
		const pillarEnt = this.entities.pillars[playerId];

		if (pd.isActive(paddleEnt)) {
			// Keep paddle in place as static wall
			pd.isEliminated[paddleEnt] = 1;
			this.paddleData.offsets[playerId] = 0;
		}
		if (pd.isActive(pillarEnt)) {
			pd.isEliminated[pillarEnt] = 1;
		}
	}

	checkPhaseTransition() {
		const remainingPlayers = this.playerStates.activePlayers.size;
		let targetPhase = this.currentPhase;
		if (remainingPlayers <= 1) {
			this.endGame();
			return;
		}

		if (remainingPlayers <= 3 && remainingPlayers > 1) targetPhase = 'Final Phase';
		else if (remainingPlayers <= 12) targetPhase = 'Phase 4';
		else if (remainingPlayers <= 25) targetPhase = 'Phase 3';
		else if (remainingPlayers <= 50) targetPhase = 'Phase 2';
		else targetPhase = 'Phase 1';

		if (this.currentPhase !== targetPhase) {
			this.triggerPhaseTransition({ name: targetPhase });
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
		this.startArenaRebuild();
	}

	startArenaRebuild() {
		this.isRebuilding = true;
		this.rebuildStartTime = Date.now();

		this.moveAllBallsAway();

		console.log(`Starting arena rebuild for ${this.currentPhase}...`);
	}

	checkRebuildComplete() {
		if (!this.isRebuilding) return false;

		const elapsed = Date.now() - this.rebuildStartTime;
		if (elapsed >= this.rebuildDuration) {
			this.completeArenaRebuild();
			return true;
		}
		return false;
	}

	completeArenaRebuild() {
		console.log(`Completing arena rebuild for ${this.currentPhase}`);

		const eliminatedPlayerIds = Array.from(this.playerStates.eliminated);
		eliminatedPlayerIds.forEach(playerId => {
			if (this.entities.paddles[playerId] !== undefined && this.pd.isActive(this.entities.paddles[playerId])) {
				this.pd.destroy(this.entities.paddles[playerId]);
			}
			if (this.entities.pillars[playerId] !== undefined && this.pd.isActive(this.entities.pillars[playerId])) {
				this.pd.destroy(this.entities.pillars[playerId]);
			}
		});

		this.redistributeSurvivingPlayers();
		this.resetBallsForNewPhase();

		this.isRebuilding = false;
		this.playerStates.eliminated.clear();

		console.log(`Arena rebuild complete! ${this.playerStates.activePlayers.size} players remaining.`);
	}

	moveAllBallsAway() {
		const pd = this.pd;
		const farDistance = this.cfg.ARENA_RADIUS * 10;

		for (const ballEnt of this.entities.balls) {
			if (pd.isActive(ballEnt)) {
				pd.posX[ballEnt] = farDistance;
				pd.posY[ballEnt] = farDistance;
				pd.velX[ballEnt] = 0;
				pd.velY[ballEnt] = 0;
			}
		}
		console.log(`Moved ${this.entities.balls.length} balls away from arena`);
	}

	redistributeSurvivingPlayers() {
		const pd = this.pd;
		const cfg = this.cfg;
		const activePlayers = Array.from(this.playerStates.activePlayers).sort((a, b) => a - b);
		const numActivePlayers = activePlayers.length;

		if (numActivePlayers === 0) return;

		const newAngleStep = (2 * Math.PI) / numActivePlayers;
		const phaseConfig = this.getPhaseConfig();
		const phaseAngleStep = (2 * Math.PI) / phaseConfig.playerCount;
		const paddleArc = phaseAngleStep * cfg.PADDLE_FILL;
		const halfArc = paddleArc / 2;
		const pillarArc = phaseAngleStep * 0.1;
		const usableArc = phaseAngleStep - pillarArc;
		const halfUsableArc = usableArc / 2;
		const maxOffsets = halfUsableArc - halfArc;

		const phaseCellW = this.getPhasePaddleSize();
		const paddleHalfW = phaseCellW / 2;
		const paddleHalfH = (phaseCellW * cfg.PADDLE_RATIO) / 2;

		const newPaddles = [];
		const newPillars = [];
		const newPaddleData = {
			offsets: new Float32Array(numActivePlayers),
			maxOffsets: new Float32Array(numActivePlayers),
			centerAngles: new Float32Array(numActivePlayers),
			inputStates: new Int8Array(numActivePlayers),
			dead: new Uint8Array(numActivePlayers)
		};

		activePlayers.forEach((originalPlayerId, newIndex) => {
			const midAngle = newIndex * newAngleStep + newAngleStep / 2;

			const paddleEnt = pd.create(ENTITY_MASKS.PADDLE);
			newPaddles[newIndex] = paddleEnt;

			newPaddleData.centerAngles[newIndex] = midAngle;
			newPaddleData.maxOffsets[newIndex] = maxOffsets;
			newPaddleData.offsets[newIndex] = 0;
			newPaddleData.inputStates[newIndex] = 0;
			newPaddleData.dead[newIndex] = 0;

			pd.posX[paddleEnt] = Math.cos(midAngle) * cfg.ARENA_RADIUS;
			pd.posY[paddleEnt] = Math.sin(midAngle) * cfg.ARENA_RADIUS;
			pd.rot[paddleEnt] = midAngle - Math.PI / 2;
			pd.halfW[paddleEnt] = paddleHalfW;
			pd.halfH[paddleEnt] = paddleHalfH;
			pd.radius[paddleEnt] = paddleHalfW;
			pd.isEliminated[paddleEnt] = 0;

			const pillarEnt = pd.create(ENTITY_MASKS.PILLAR | ENTITY_MASKS.STATIC);
			newPillars[newIndex] = pillarEnt;

			const pillarAngle = midAngle - maxOffsets - halfArc;
			const pillarSize = cfg.ARENA_RADIUS * pillarArc;

			pd.posX[pillarEnt] = Math.cos(pillarAngle) * cfg.ARENA_RADIUS;
			pd.posY[pillarEnt] = Math.sin(pillarAngle) * cfg.ARENA_RADIUS;
			pd.rot[pillarEnt] = pillarAngle;
			pd.halfW[pillarEnt] = pd.halfH[pillarEnt] = pd.radius[pillarEnt] = pillarSize / 2;
			pd.isEliminated[pillarEnt] = 0;
		});

		this.entities.paddles = newPaddles;
		this.entities.pillars = newPillars;
		this.paddleData = newPaddleData;

		this.playerMapping = {};
		activePlayers.forEach((originalId, newIndex) => {
			this.playerMapping[originalId] = newIndex;
		});

		console.log(`Redistributed ${numActivePlayers} surviving players with ${this.currentPhase} paddle sizes`);
	}

	resetBallsForNewPhase() {
		const pd = this.pd;
		const cfg = this.cfg;
		const numActivePlayers = this.playerStates.activePlayers.size;

		const ballsPerPlayer = Math.floor(cfg.INITIAL_BALLS / cfg.MAX_PLAYERS);
		const newBallCount = Math.max(ballsPerPlayer * numActivePlayers, 20);

		this.entities.balls.forEach(ballEnt => {
			if (pd.isActive(ballEnt)) pd.destroy(ballEnt);
		});
		this.entities.balls = [];

		this.createBalls(newBallCount);
		console.log(`Reset balls: created ${newBallCount} new balls`);
	}

	updatePaddleInputState(originalPlayerId, moveInput) {
		if (this.isRebuilding) return;

		const newIndex = this.playerMapping ? this.playerMapping[originalPlayerId] : originalPlayerId;
		if (newIndex !== undefined && newIndex >= 0 && newIndex < this.paddleData.inputStates.length) {
			if (!this.playerStates.eliminated.has(originalPlayerId)) {
				this.paddleData.inputStates[newIndex] = Math.max(-1, Math.min(1, moveInput));
			}
		}
	}

	updatePaddleMovement() {
		const cfg = this.cfg;
		const pd = this.pd;
		const dt = 1 / this.cfg.TARGET_FPS;
		const moveSpeed = 10;
		const numPlayers = this.entities.paddles.length;

		for (let pid = 0; pid < numPlayers; pid++) {
			const paddleEnt = this.entities.paddles[pid];
			if (!pd.isActive(paddleEnt) || this.paddleData.inputStates[pid] === 0) continue;

			const deltaOffset = this.paddleData.inputStates[pid] * moveSpeed / numPlayers / 4 * dt;
			const newOffset = this.paddleData.offsets[pid] + deltaOffset;
			const maxOffset = this.paddleData.maxOffsets[pid];

			this.paddleData.offsets[pid] = Math.max(-maxOffset, Math.min(maxOffset, newOffset));

			const centerAngle = this.paddleData.centerAngles[pid];
			const currentAngle = centerAngle + this.paddleData.offsets[pid];

			pd.posX[paddleEnt] = Math.cos(currentAngle) * cfg.ARENA_RADIUS;
			pd.posY[paddleEnt] = Math.sin(currentAngle) * cfg.ARENA_RADIUS;
			pd.rot[paddleEnt] = currentAngle - Math.PI / 2;

			pd.velX[paddleEnt] = pd.velY[paddleEnt] = 0;
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
			const distFromCenter = Math.sqrt(ballX * ballX + ballY * ballY);
			const collisionDistance = cfg.ARENA_RADIUS - pd.radius[ballEnt];

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

				for (let paddleIndex = 0; paddleIndex < numPlayers; paddleIndex++) {
					let currentPaddleAngle, arcWidth;

					if (this.playerStates.eliminated.has(paddleIndex)) {
						currentPaddleAngle = this.paddleData.centerAngles[paddleIndex];
						arcWidth = angleStep;
					} else {
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

					let withinSlice;
					if (normalizedStart <= normalizedEnd) {
						withinSlice = normalizedBallAngle >= normalizedStart && normalizedBallAngle <= normalizedEnd;
					} else {
						withinSlice = normalizedBallAngle >= normalizedStart || normalizedBallAngle <= normalizedEnd;
					}

					if (withinSlice) {
						pd.posX[ballEnt] = nx * collisionDistance;
						pd.posY[ballEnt] = ny * collisionDistance;

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
		if (this.gameOver) return this.getState();

		this.checkRebuildComplete();
		if (this.isRebuilding) return this.getState();

		const pd = this.pd;
		const cfg = this.cfg;

		this.updatePaddleMovement();

		for (let ss = 0; ss < cfg.SUB_STEPS; ss++) {
			PhysicsSystems.movement(pd, this.dt, ENTITY_MASKS.BALL);
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

				for (let i = 0; i < bucket.length; i++) {
					for (let j = i + 1; j < bucket.length; j++) {
						const idA = bucket[i];
						const idB = bucket[j];
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
				radius: pd.radius[ent],
				disabled: pd.isEliminated[ent] === 1
			}));

		const paddles = this.entities.paddles
			.filter(ent => ent !== undefined && pd.isActive(ent))
			.map((ent, i) => ({
				id: i,
				move: this.paddleData.inputStates[i] || 0,
				offset: this.paddleData.offsets[i] || 0,
				dead: this.paddleData.dead[i] === 1
			}));

		const events = [...this.gameEvents];
		this.gameEvents = [];

		return {
			balls,
			paddles,
			score: [],
			ranks: this.calculatePlayerRanks(),
			stage: this.getStageFromPhase(),
			end: this.gameOver || this.playerStates.activePlayers.size <= 1,
			events,
			gameState: {
				activePlayers: Array.from(this.playerStates.activePlayers),
				eliminatedPlayers: Array.from(this.playerStates.eliminated),
				currentPhase: this.currentPhase,
				isRebuilding: this.isRebuilding,
				rebuildTimeRemaining: this.isRebuilding ?
					Math.max(0, this.rebuildDuration - (Date.now() - this.rebuildStartTime)) : 0,
				playerMapping: this.playerMapping,
				isGameOver: this.gameOver || this.playerStates.activePlayers.size <= 1,
				winner: this.playerStates.activePlayers.size === 1
					? Array.from(this.playerStates.activePlayers)[0] : null
			},
			config: this.cfg,
			frameStats: {
				activeBalls: balls.filter(ball => !ball.disabled).length,
				activePaddles: paddles.length,
				totalPlayers: this.entities.paddles.length
			}
		};
	}

	calculatePlayerRanks() {
		const ranks = new Array(this.originalPlayerCount).fill(0);
		this.playerStates.eliminationOrder.forEach((elimination, index) => {
			ranks[elimination.playerId] = this.originalPlayerCount - index;
		});
		this.playerStates.activePlayers.forEach(playerId => {
			ranks[playerId] = 1;
		});
		return ranks;
	}

	getStageFromPhase() {
		const stages = { 'Phase 1': 1, 'Phase 2': 2, 'Phase 3': 3, 'Phase 4': 4, 'Final Phase': 5 };
		return stages[this.currentPhase] || 1;
	}

	endGame() {
		const activePlayers = Array.from(this.playerStates.activePlayers);
		const winner = activePlayers.length === 1 ? activePlayers[0] : null;

		this.gameOver = true;

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

	disableBall(ballIndex) {
		if (ballIndex < 0 || ballIndex >= this.entities.balls.length) return false;
		const ballEnt = this.entities.balls[ballIndex];
		if (!this.pd.isActive(ballEnt)) return false;

		const pd = this.pd;
		pd.isEliminated[ballEnt] = 1;
		pd.posX[ballEnt] = pd.posY[ballEnt] = this.cfg.ARENA_RADIUS * 10;
		pd.velX[ballEnt] = pd.velY[ballEnt] = 0;
		return true;
	}

	isPlayerEliminated(playerId) { return this.playerStates.eliminated.has(playerId); }
	getRemainingPlayers() { return Array.from(this.playerStates.activePlayers); }
	getEliminationOrder() { return [...this.playerStates.eliminationOrder]; }

	resetGame() {
		this.reset();
		this.playerStates.eliminated.clear();
		this.playerStates.activePlayers.clear();
		this.playerStates.eliminationOrder = [];
		this.gameEvents = [];
		this.currentPhase = 'Phase 1';
		this.isRebuilding = false;
		this.rebuildStartTime = 0;
		this.playerMapping = {};
		this.originalPlayerCount = 0;
		this.gameOver = false;
		if (this.paddleData.dead) this.paddleData.dead.fill(0);
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
