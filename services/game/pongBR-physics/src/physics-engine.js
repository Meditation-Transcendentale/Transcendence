// physics-engine.js
// Main physics engine - coordinates all systems

import { CFG, ENTITY_MASKS, getPhaseConfig, getPhasePaddleSize, getPhaseStage } from './physics-config.js';
import { PhysicsData } from './physics-data.js';
import { UniformGrid } from './spatial-grid.js';
import { PhysicsSystems } from './collision-systems.js';
import { GameStateManager } from './game-state-manager.js';

export class PhysicsEngine {
	constructor(cfg = {}) {
		this.cfg = { ...CFG, ...cfg };

		// Core systems
		this.pd = new PhysicsData(this.cfg.MAX_PLAYERS + this.cfg.INITIAL_BALLS + this.cfg.MAX_PLAYERS + 16);
		this.gameState = new GameStateManager(() => this.moveAllBallsAway());

		// Physics timing
		this.dt = 1 / this.cfg.TARGET_FPS / this.cfg.SUB_STEPS;

		// Spatial partitioning
		const gridCellSize = this.cfg.BALL_RADIUS * this.cfg.GRID_CELL_SIZE_MULTIPLIER;
		this.ballGrid = new UniformGrid(gridCellSize);

		// Entity collections
		this.entities = { balls: [], paddles: [], pillars: [] };

		// Paddle-specific data
		this.paddleData = {
			offsets: [],
			maxOffsets: [],
			centerAngles: [],
			inputStates: [],
			dead: []
		};
	}

	initBattleRoyale(numPlayers, numBalls) {
		console.log(`Initializing Battle Royale: ${numPlayers} players, ${numBalls} balls`);

		this.reset();
		this.gameState.initBattleRoyale(numPlayers);

		const totalEntitiesNeeded = numPlayers * 2 + numBalls; // paddles + pillars + balls
		if (totalEntitiesNeeded > this.pd.maxEntities) {
			throw new Error(`Cannot create game: need ${totalEntitiesNeeded} entities but max is ${this.pd.maxEntities}`);
		}

		this.paddleData.offsets = new Float32Array(numPlayers);
		this.paddleData.maxOffsets = new Float32Array(numPlayers);
		this.paddleData.centerAngles = new Float32Array(numPlayers);
		this.paddleData.inputStates = new Int8Array(numPlayers);
		this.paddleData.dead = new Uint8Array(numPlayers);

		console.log(`Entity stats before creation:`, this.pd.getStats());

		this.createPaddles(numPlayers);
		console.log(`Entity stats after paddles:`, this.pd.getStats());

		this.createBalls(numBalls);
		console.log(`Entity stats after balls:`, this.pd.getStats());

		for (let pid = 0; pid < numPlayers; pid++) {
			this.paddleData.dead[pid] = 0;
		}

		console.log(`Battle Royale initialization complete. Final entity stats:`, this.pd.getStats());
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
			console.log(`paddle  id = ${pid} sliceStart = ${sliceStart}, paddleRotY = ${midAngle}`)
			// const midAngle = sliceStart + halfUsableArc;
			// const midAngle = sliceStart  halfUsableArc;

			this.paddleData.centerAngles[pid] = midAngle;
			this.paddleData.maxOffsets[pid] = maxOffsets;
			this.paddleData.offsets[pid] = 0;

			pd.posX[paddleEnt] = Math.cos(midAngle) * cfg.ARENA_RADIUS;
			pd.posY[paddleEnt] = Math.sin(midAngle) * cfg.ARENA_RADIUS;
			pd.rot[paddleEnt] = midAngle - Math.PI / 2;

			// console.log(`Physics paddle ${pid}: midAngle = ${midAngle}, centerAngle = ${this.paddleData.centerAngles[pid]}`);
			const perim = 2 * Math.PI * cfg.ARENA_RADIUS;
			const cellW = (perim / numPlayers) * cfg.PADDLE_FILL;
			pd.halfW[paddleEnt] = cellW / 2;
			pd.halfH[paddleEnt] = (cellW * cfg.PADDLE_RATIO) / 2;
			pd.radius[paddleEnt] = cellW / 2;

			const pillarEnt = pd.create(ENTITY_MASKS.PILLAR | ENTITY_MASKS.STATIC);
			this.entities.pillars[pid] = pillarEnt;

			// const pillarAngle = midAngle - maxOffsets - halfArc;
			const pillarAngle = sliceStart + angleStep - pillarArc / 2;
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
			if (!pd.isActive(ballEnt) || pd.isEliminated[ballEnt] === 1) continue;

			const ballX = pd.posX[ballEnt];
			const ballY = pd.posY[ballEnt];
			const distFromCenter = Math.sqrt(ballX * ballX + ballY * ballY);

			if (distFromCenter > cfg.ARENA_RADIUS) {
				const ballAngle = Math.atan2(ballY, ballX);
				const eliminatedPlayer = this.gameState.findPlayerByAngle(ballAngle, this.entities.paddles.length);

				if (eliminatedPlayer !== -1 && !this.gameState.playerStates.eliminated.has(eliminatedPlayer)) {
					this.gameState.eliminatePlayer(eliminatedPlayer, ballIndex);
					this.disableBall(ballIndex);
					this.convertPaddleToWall(eliminatedPlayer);
					return;
				}
			}
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
				const normalizedBallAngle = ballAngle < 0 ? ballAngle + 2 * Math.PI : ballAngle;

				const approximateSector = Math.floor(normalizedBallAngle / angleStep) % numPlayers;

				const checkRange = 2;
				for (let offset = -checkRange; offset <= checkRange; offset++) {
					const paddleIndex = (approximateSector + offset + numPlayers) % numPlayers;

					let fixedPlayerId = paddleIndex;
					if (this.gameState.playerMapping && Object.keys(this.gameState.playerMapping).length > 0) {
						const reverseMapping = Object.entries(this.gameState.playerMapping)
							.find(([playerId, pIdx]) => pIdx === paddleIndex);
						if (reverseMapping) {
							fixedPlayerId = parseInt(reverseMapping[0]);
						}
					}

					let currentPaddleAngle, arcWidth;
					if (this.gameState.playerStates.eliminated.has(fixedPlayerId)) {
						currentPaddleAngle = this.paddleData.centerAngles[paddleIndex];
						arcWidth = angleStep;
					} else {
						currentPaddleAngle = this.paddleData.centerAngles[paddleIndex] + this.paddleData.offsets[paddleIndex];
						arcWidth = angleStep * cfg.PADDLE_FILL;
					}

					const startAngle = currentPaddleAngle - arcWidth / 2;
					let angleDiff = normalizedBallAngle - startAngle;

					if (angleDiff < 0) angleDiff += 2 * Math.PI;
					else if (angleDiff >= 2 * Math.PI) angleDiff -= 2 * Math.PI;

					const withinSlice = angleDiff <= arcWidth;

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


	convertPaddleToWall(playerId) {
		const pd = this.pd;

		const paddleIndex = this.gameState.playerMapping[playerId] ?? playerId;

		if (paddleIndex < this.entities.paddles.length) {
			const paddleEnt = this.entities.paddles[paddleIndex];
			const pillarEnt = this.entities.pillars[paddleIndex];

			if (pd.isActive(paddleEnt)) {
				pd.eliminateEntity(paddleEnt);
				this.paddleData.offsets[paddleIndex] = 0;
			}
			if (pd.isActive(pillarEnt)) {
				pd.eliminateEntity(pillarEnt);
			}
		}

		this.paddleData.dead[playerId] = 1;
	}

	moveAllBallsAway() {
		const pd = this.pd;
		const farDistance = this.cfg.ARENA_RADIUS * 10;

		for (const ballEnt of this.entities.balls) {
			if (pd.isActive(ballEnt)) {
				pd.moveEntityAway(ballEnt, farDistance);
			}
		}
	}

	redistributeSurvivingPlayers() {
		const pd = this.pd;
		const cfg = this.cfg;
		const activePlayers = Array.from(this.gameState.playerStates.activePlayers).sort((a, b) => a - b);
		const numActivePlayers = activePlayers.length;

		if (numActivePlayers === 0) return;

		// console.log(`Redistributing ${numActivePlayers} players. Entity stats before cleanup:`, pd.getStats());

		let destroyedPaddles = 0;
		let destroyedPillars = 0;

		this.entities.paddles.forEach(paddleEnt => {
			if (paddleEnt !== undefined && pd.isActive(paddleEnt)) {
				pd.destroy(paddleEnt);
				destroyedPaddles++;
			}
		});

		this.entities.pillars.forEach(pillarEnt => {
			if (pillarEnt !== undefined && pd.isActive(pillarEnt)) {
				pd.destroy(pillarEnt);
				destroyedPillars++;
			}
		});

		// console.log(`Destroyed ${destroyedPaddles} paddles and ${destroyedPillars} pillars. Entity stats after cleanup:`, pd.getStats());

		const newAngleStep = (2 * Math.PI) / numActivePlayers;
		const paddleArc = newAngleStep * cfg.PADDLE_FILL;
		const halfArc = paddleArc / 2;
		const pillarArc = newAngleStep * 0.1;
		const usableArc = newAngleStep - pillarArc;
		const halfUsableArc = usableArc / 2;
		const maxOffsets = halfUsableArc - halfArc;

		const phaseCellW = getPhasePaddleSize(this.gameState.currentPhase, cfg.ARENA_RADIUS);
		const paddleHalfW = phaseCellW / 2;
		const paddleHalfH = (phaseCellW * cfg.PADDLE_RATIO) / 2;

		const newPaddles = [];
		const newPillars = [];
		const newPaddleData = {
			offsets: new Float32Array(numActivePlayers),
			maxOffsets: new Float32Array(numActivePlayers),
			centerAngles: new Float32Array(numActivePlayers),
			inputStates: new Int8Array(numActivePlayers),
			dead: new Uint8Array(this.gameState.originalPlayerCount) // Keep original size
		};

		for (let i = 0; i < this.gameState.originalPlayerCount; i++) {
			newPaddleData.dead[i] = this.paddleData.dead[i];
		}

		// console.log(`Creating ${numActivePlayers} new paddles and pillars...`);

		activePlayers.forEach((fixedPlayerId, newPaddleIndex) => {
			const sliceStart = newPaddleIndex * newAngleStep;
			const midAngle = sliceStart + pillarArc + halfUsableArc;

			const paddleEnt = pd.create(ENTITY_MASKS.PADDLE);
			newPaddles[newPaddleIndex] = paddleEnt;

			newPaddleData.centerAngles[newPaddleIndex] = midAngle;
			newPaddleData.maxOffsets[newPaddleIndex] = maxOffsets;
			newPaddleData.offsets[newPaddleIndex] = 0;
			newPaddleData.inputStates[newPaddleIndex] = 0;

			pd.posX[paddleEnt] = Math.cos(midAngle) * cfg.ARENA_RADIUS;
			pd.posY[paddleEnt] = Math.sin(midAngle) * cfg.ARENA_RADIUS;
			pd.rot[paddleEnt] = midAngle - Math.PI / 2;
			pd.halfW[paddleEnt] = paddleHalfW;
			pd.halfH[paddleEnt] = paddleHalfH;
			pd.radius[paddleEnt] = paddleHalfW;

			const pillarEnt = pd.create(ENTITY_MASKS.PILLAR | ENTITY_MASKS.STATIC);
			newPillars[newPaddleIndex] = pillarEnt;

			const pillarAngle = sliceStart + newAngleStep - pillarArc / 2;
			const pillarSize = cfg.ARENA_RADIUS * pillarArc;

			pd.posX[pillarEnt] = Math.cos(pillarAngle) * cfg.ARENA_RADIUS;
			pd.posY[pillarEnt] = Math.sin(pillarAngle) * cfg.ARENA_RADIUS;
			pd.rot[pillarEnt] = pillarAngle;
			pd.halfW[pillarEnt] = pd.halfH[pillarEnt] = pd.radius[pillarEnt] = pillarSize / 2;
		});

		this.entities.paddles = newPaddles;
		this.entities.pillars = newPillars;
		this.paddleData = newPaddleData;

		this.gameState.updatePlayerMapping(activePlayers);

		// console.log(`Redistributed ${numActivePlayers} players. Final entity stats:`, pd.getStats());
	}

	resetBallsForNewPhase() {
		const pd = this.pd;
		const cfg = this.cfg;
		const numActivePlayers = this.gameState.playerStates.activePlayers.size;

		// console.log(`Resetting balls for new phase. Current balls: ${this.entities.balls.length}`);

		this.entities.balls.forEach(ballEnt => {
			if (ballEnt !== undefined && pd.isActive(ballEnt)) {
				pd.destroy(ballEnt);
			}
		});

		this.entities.balls.length = 0;

		const ballsPerPlayer = Math.floor(cfg.INITIAL_BALLS / cfg.MAX_PLAYERS);
		const newBallCount = Math.max(ballsPerPlayer * numActivePlayers / 2, 3);

		// console.log(`Creating ${newBallCount} new balls. Entity stats before:`, pd.getStats());

		this.createBalls(newBallCount);

		// console.log(`Ball reset complete. Entity stats after:`, pd.getStats());
	}

	updatePaddleInputState(fixedPlayerId, moveInput) {
		if (this.gameState.isRebuilding) return;

		const paddleIndex = this.gameState.playerMapping[fixedPlayerId] ?? fixedPlayerId;

		if (paddleIndex >= 0 && paddleIndex < this.paddleData.inputStates.length) {
			if (!this.gameState.playerStates.eliminated.has(fixedPlayerId)) {
				this.paddleData.inputStates[paddleIndex] = Math.max(-1, Math.min(1, moveInput));
			}
		}
	}

	updatePaddleMovement() {
		const cfg = this.cfg;
		const pd = this.pd;
		const dt = 1 / this.cfg.TARGET_FPS;
		const moveSpeed = 1.2;
		const numPlayers = this.entities.paddles.length;

		for (let pid = 0; pid < numPlayers; pid++) {
			const paddleEnt = this.entities.paddles[pid];
			if (!pd.isActive(paddleEnt) || this.paddleData.inputStates[pid] === 0) continue;

			const deltaOffset = this.paddleData.inputStates[pid] * moveSpeed / (numPlayers / 4) * dt;
			const newOffset = this.paddleData.offsets[pid] + deltaOffset;
			const maxOffset = this.paddleData.maxOffsets[pid];

			this.paddleData.offsets[pid] = Math.max(-maxOffset, Math.min(maxOffset, newOffset));

			const centerAngle = this.paddleData.centerAngles[pid];
			const currentAngle = centerAngle + this.paddleData.offsets[pid];

			pd.posX[paddleEnt] = Math.cos(currentAngle) * cfg.ARENA_RADIUS;
			pd.posY[paddleEnt] = Math.sin(currentAngle) * cfg.ARENA_RADIUS;
			pd.rot[paddleEnt] = currentAngle - Math.PI / 2;
		}
	}

	step() {
		if (this.gameState.gameOver) return this.getState();

		if (this.gameState.checkRebuildComplete()) {
			this.completeArenaRebuild();
		}

		if (this.gameState.isRebuilding) {
			return this.getState();
		}

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
			const activeBalls = [];
			for (const ballEnt of this.entities.balls) {
				if (!pd.isActive(ballEnt) || pd.isEliminated[ballEnt] === 1) continue;
				activeBalls.push({
					id: ballEnt,
					x: pd.posX[ballEnt],
					y: pd.posY[ballEnt],
					radius: pd.radius[ballEnt]
				});
			}
			this.ballGrid.addBulk(activeBalls);

			const pairs = this.ballGrid.getPotentialPairs();
			for (const pairKey of pairs) {
				const [idA, idB] = pairKey.split(',').map(Number);
				PhysicsSystems.ballBallCollision(pd, idA, idB);
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
			.map((ent, currentPaddleIndex) => {
				let fixedPlayerId = currentPaddleIndex;

				if (this.gameState.playerMapping && Object.keys(this.gameState.playerMapping).length > 0) {
					const reverseMapping = Object.entries(this.gameState.playerMapping)
						.find(([playerId, paddleIdx]) => paddleIdx === currentPaddleIndex);
					if (reverseMapping) {
						fixedPlayerId = parseInt(reverseMapping[0]);
					}
				}

				return {
					id: currentPaddleIndex,
					playerId: fixedPlayerId,
					move: this.paddleData.inputStates[currentPaddleIndex] || 0,
					offset: this.paddleData.offsets[currentPaddleIndex] || 0,
					dead: this.paddleData.dead[fixedPlayerId] === 1
				};
			});

		return {
			balls,
			paddles,
			score: [],
			ranks: this.gameState.calculatePlayerRanks(),
			stage: getPhaseStage(this.gameState.currentPhase),
			end: this.gameState.gameOver || this.gameState.playerStates.activePlayers.size <= 1,
			events: this.gameState.getAndClearEvents(),
			gameState: this.gameState.getGameState(),
			config: this.cfg,
			frameStats: {
				activeBalls: balls.filter(ball => !ball.disabled).length,
				activePaddles: paddles.length,
				totalPlayers: this.entities.paddles.length,
				...this.pd.getStats(),
				...this.ballGrid.getStats()
			}
		};
	}

	verifyEntityIntegrity() {
		const pd = this.pd;
		let activeCount = 0;
		let ballCount = 0;
		let paddleCount = 0;
		let pillarCount = 0;

		for (let i = 0; i < pd.count; i++) {
			if (pd.isActive(i)) {
				activeCount++;
				if (pd.mask[i] & ENTITY_MASKS.BALL) ballCount++;
				if (pd.mask[i] & ENTITY_MASKS.PADDLE) paddleCount++;
				if (pd.mask[i] & ENTITY_MASKS.PILLAR) pillarCount++;
			}
		}

		const expectedBalls = this.entities.balls.filter(b => b !== undefined && pd.isActive(b)).length;
		const expectedPaddles = this.entities.paddles.filter(p => p !== undefined && pd.isActive(p)).length;
		const expectedPillars = this.entities.pillars.filter(p => p !== undefined && pd.isActive(p)).length;

		// console.log(`Entity integrity check:`);
		// console.log(`  Active entities: ${activeCount}/${pd.count} (max: ${pd.maxEntities})`);
		// console.log(`  Balls: ${ballCount} (expected: ${expectedBalls})`);
		// console.log(`  Paddles: ${paddleCount} (expected: ${expectedPaddles})`);
		// console.log(`  Pillars: ${pillarCount} (expected: ${expectedPillars})`);
		// console.log(`  Free list size: ${pd.freeList.length}`);

		return {
			activeCount,
			ballCount,
			paddleCount,
			pillarCount,
			expectedBalls,
			expectedPaddles,
			expectedPillars,
			freeListSize: pd.freeList.length
		};
	}

	completeArenaRebuild() {
		// console.log(`Starting arena rebuild cleanup for ${this.gameState.currentPhase}`);
		// console.log(`Pre-rebuild entity integrity:`);
		this.verifyEntityIntegrity();

		this.redistributeSurvivingPlayers();
		this.resetBallsForNewPhase();
		this.gameState.completeArenaRebuild();

		// console.log(`Post-rebuild entity integrity:`);
		this.verifyEntityIntegrity();
		// console.log(`Arena rebuild complete!`);
	}

	disableBall(ballIndex) {
		if (ballIndex < 0 || ballIndex >= this.entities.balls.length) return false;
		const ballEnt = this.entities.balls[ballIndex];
		if (!this.pd.isActive(ballEnt)) return false;

		this.pd.eliminateEntity(ballEnt);
		this.pd.moveEntityAway(ballEnt, this.cfg.ARENA_RADIUS * 10);
		return true;
	}

	reset() {
		this.pd.reset();
		this.entities.balls.length = 0;
		this.entities.paddles.length = 0;
		this.entities.pillars.length = 0;
		this.gameState.reset();
	}

	isPlayerEliminated(playerId) {
		return this.gameState.playerStates.eliminated.has(playerId);
	}

	getRemainingPlayers() {
		return Array.from(this.gameState.playerStates.activePlayers);
	}

	getEliminationOrder() {
		return [...this.gameState.playerStates.eliminationOrder];
	}

	resetGame() {
		this.reset();
		if (this.paddleData.dead) this.paddleData.dead.fill(0);
	}

	getPerformanceStats() {
		return {
			...this.pd.getStats(),
			...this.ballGrid.getStats(),
			phase: this.gameState.currentPhase,
			isRebuilding: this.gameState.isRebuilding
		};
	}
}
