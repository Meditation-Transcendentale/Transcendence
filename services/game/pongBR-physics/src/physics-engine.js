// physics-engine.js

import { CFG, ENTITY_MASKS, getBallScaleForPlayerCount, getPhaseBallConfig, getPhaseConfig, getPhasePaddleSize, getPhaseStage } from './physics-config.js';
import { PhysicsData } from './physics-data.js';
import { UniformGrid } from './spatial-grid.js';
import { PhysicsSystems } from './collision-systems.js';
import { GameStateManager } from './game-state-manager.js';

export class PhysicsEngine {
	constructor(cfg = {}) {
		this.cfg = { ...CFG, ...cfg };

		this.pd = new PhysicsData(this.cfg.MAX_PLAYERS + this.cfg.INITIAL_BALLS + this.cfg.MAX_PLAYERS + 16);
		this.gameState = new GameStateManager(() => this.moveAllBallsAway());

		this.dt = 1 / this.cfg.TARGET_FPS / this.cfg.SUB_STEPS;

		const gridCellSize = this.cfg.BALL_RADIUS * this.cfg.GRID_CELL_SIZE_MULTIPLIER;
		this.ballGrid = new UniformGrid(gridCellSize);

		this.entities = { balls: [], paddles: [], pillars: [] };

		this.paddleData = {
			offsets: [],
			maxOffsets: [],
			centerAngles: [],
			inputStates: [],
			dead: []
		};

		this.spawnState = {
			enabled: false,
			startTime: 0,
			lastSpawnTime: 0,
			nextSpawnTime: 0,
			currentSpawnInterval: cfg.SPAWN_MAX_INTERVAL,
			targetBallCount: 0,
			spawnedThisPhase: 0
		};
	}

	initBattleRoyale(numPlayers, numBalls) {
		console.log(`Initializing Battle Royale: ${numPlayers} players, ${numBalls} balls`);

		this.reset();
		this.gameState.initBattleRoyale(numPlayers);

		const totalEntitiesNeeded = numPlayers * 2 + numBalls;
		if (totalEntitiesNeeded > this.pd.maxEntities) {
			throw new Error(`Cannot create game: need ${totalEntitiesNeeded} entities but max is ${this.pd.maxEntities}`);
		}

		this.paddleData.offsets = new Float32Array(numPlayers);
		this.paddleData.maxOffsets = new Float32Array(numPlayers);
		this.paddleData.centerAngles = new Float32Array(numPlayers);
		this.paddleData.inputStates = new Int8Array(numPlayers);
		this.paddleData.dead = new Uint8Array(numPlayers);

		this.createPaddles(numPlayers);

		for (let pid = 0; pid < numPlayers; pid++) {
			this.paddleData.dead[pid] = 0;
		}

		setTimeout(() => {
			this.gameState.triggerPhaseTransition('Phase 1');
		}, 3000);

		console.log(`Battle Royale initialization complete. Final entity stats:`, this.pd.getStats());
	}

	createPaddles(numPlayers) {
		const cfg = this.cfg;
		const pd = this.pd;
		const angleStep = (2 * Math.PI) / numPlayers;
		const paddleArc = angleStep * cfg.PADDLE_FILL;
		const halfArc = paddleArc / 2;
		const pillarArc = angleStep * 0.025;
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

			const pillarAngle = sliceStart + pillarArc / 2;

			const pillarSize = cfg.ARENA_RADIUS * pillarArc;

			pd.posX[pillarEnt] = Math.cos(pillarAngle) * (cfg.ARENA_RADIUS + pillarSize / 2);
			pd.posY[pillarEnt] = Math.sin(pillarAngle) * (cfg.ARENA_RADIUS + pillarSize / 2);
			pd.rot[pillarEnt] = pillarAngle;
			pd.halfW[pillarEnt] = pd.halfH[pillarEnt] = pd.radius[pillarEnt] = pillarSize / 2;
		}
	}

	startPhaseSpawning(phase) {
		const ballConfig = getPhaseBallConfig(phase);
		const currentActiveBalls = this.entities.balls.filter(b =>
			this.pd.isActive(b) && this.pd.isEliminated[b] !== 1
		).length;

		if (currentActiveBalls >= ballConfig.maxBalls) {
			this.spawnState.enabled = false;
			return;
		}

		const currentTime = performance.now();
		this.spawnState.enabled = true;
		this.spawnState.startTime = currentTime;
		this.spawnState.lastSpawnTime = currentTime;
		this.spawnState.nextSpawnTime = currentTime + this.cfg.SPAWN_INITIAL_DELAY;
		this.spawnState.currentSpawnInterval = this.cfg.SPAWN_MAX_INTERVAL;
		this.spawnState.targetBallCount = ballConfig.maxBalls;
		this.spawnState.spawnedThisPhase = 0;

	}

	updateBallSpawning(currentTime) {
		if (!this.spawnState.enabled || this.gameState.isRebuilding || this.gameState.gameOver) {
			return;
		}

		const activeBalls = this.entities.balls.filter(b =>
			this.pd.isActive(b) && this.pd.isEliminated[b] !== 1
		).length;

		if (activeBalls >= this.spawnState.targetBallCount) {
			this.spawnState.enabled = false;
			return;
		}

		if (currentTime >= this.spawnState.nextSpawnTime) {
			this.spawnSingleBall();
			this.spawnState.lastSpawnTime = currentTime;
			this.spawnState.spawnedThisPhase++;

			this.spawnState.currentSpawnInterval *= this.cfg.SPAWN_EXPONENTIAL_BASE;
			this.spawnState.currentSpawnInterval = Math.max(
				this.spawnState.currentSpawnInterval,
				this.cfg.SPAWN_MIN_INTERVAL
			);

			this.spawnState.nextSpawnTime = currentTime + this.spawnState.currentSpawnInterval;

			const jitter = (Math.random() - 0.5) * this.spawnState.currentSpawnInterval * 0.2;
			this.spawnState.nextSpawnTime += jitter;
		}
	}

	spawnSingleBall() {
		const cfg = this.cfg;
		const pd = this.pd;
		const phaseConfig = getPhaseConfig(this.gameState.currentPhase);
		const ballRadius = cfg.BALL_RADIUS * getBallScaleForPlayerCount(phaseConfig.playerCount);

		const ballEnt = pd.create(ENTITY_MASKS.BALL);
		this.entities.balls.push(ballEnt);

		pd.radius[ballEnt] = ballRadius;

		const safeRadius = cfg.ARENA_RADIUS * cfg.SPAWN_SAFETY_MARGIN;
		const r = Math.sqrt(Math.random()) * safeRadius;
		const theta = Math.random() * 2 * Math.PI;
		pd.posX[ballEnt] = r * Math.cos(theta);
		pd.posY[ballEnt] = r * Math.sin(theta);
		// pd.posX[ballEnt] = 0;
		// pd.posY[ballEnt] = 0;

		const dir = Math.random() * 2 * Math.PI;
		// const dir = 0.0007853981633974484;
		const speedVariation = 0.8 + (Math.random() * 0.4);
		const speed = cfg.INITIAL_SPEED * speedVariation;
		pd.velX[ballEnt] = Math.cos(dir) * speed;
		pd.velY[ballEnt] = Math.sin(dir) * speed;

	}

	stopBallSpawning() {
		this.spawnState.enabled = false;
	}

	createBalls(numBalls) {
		const cfg = this.cfg;
		const pd = this.pd;
		const phaseConfig = getPhaseConfig(this.gameState.currentPhase);
		const ballRadius = cfg.BALL_RADIUS * getBallScaleForPlayerCount(phaseConfig.playerCount);

		for (let b = 0; b < numBalls; b++) {
			const ballEnt = pd.create(ENTITY_MASKS.BALL);
			this.entities.balls[b] = ballEnt;

			pd.radius[ballEnt] = ballRadius;

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

		const newAngleStep = (2 * Math.PI) / numActivePlayers;
		const paddleArc = newAngleStep * cfg.PADDLE_FILL;
		const halfArc = paddleArc / 2;
		const pillarArc = newAngleStep * 0.025;
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
			dead: new Uint8Array(this.gameState.originalPlayerCount)
		};

		for (let i = 0; i < this.gameState.originalPlayerCount; i++) {
			newPaddleData.dead[i] = this.paddleData.dead[i];
		}

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

			const pillarAngle = sliceStart + pillarArc / 2;
			const pillarSize = cfg.ARENA_RADIUS * pillarArc;

			pd.posX[pillarEnt] = Math.cos(pillarAngle) * (cfg.ARENA_RADIUS + pillarSize / 2);
			pd.posY[pillarEnt] = Math.sin(pillarAngle) * (cfg.ARENA_RADIUS + pillarSize / 2);
			pd.rot[pillarEnt] = pillarAngle;
			pd.halfW[pillarEnt] = pd.halfH[pillarEnt] = pd.radius[pillarEnt] = pillarSize / 2;
		});

		this.entities.paddles = newPaddles;
		this.entities.pillars = newPillars;
		this.paddleData = newPaddleData;

		this.gameState.updatePlayerMapping(activePlayers);

	}

	updateExistingBallRadii() {
		const pd = this.pd;
		const cfg = this.cfg;
		const phaseConfig = getPhaseConfig(this.gameState.currentPhase);
		const newBallRadius = cfg.BALL_RADIUS * getBallScaleForPlayerCount(phaseConfig.playerCount);

		for (const ballEnt of this.entities.balls) {
			if (ballEnt !== undefined && pd.isActive(ballEnt)) {
				pd.radius[ballEnt] = newBallRadius;
			}
		}
	}

	resetBallsForNewPhase() {
		const pd = this.pd;
		const cfg = this.cfg;

		this.entities.balls.forEach(ballEnt => {
			if (ballEnt !== undefined && pd.isActive(ballEnt)) {
				pd.destroy(ballEnt);
			}
		});
		this.entities.balls.length = 0;

		const ballConfig = getPhaseBallConfig(this.gameState.currentPhase);

		this.createBalls(ballConfig.initialBalls);

		this.startPhaseSpawning(this.gameState.currentPhase);
	}

	updatePaddleInputState(fixedPlayerId, moveInput) {
		if (this.gameState.isRebuilding) return;

		if (this.gameState.playerStates.eliminated.has(fixedPlayerId)) {
			return;
		}

		const paddleIndex = this.gameState.playerMapping[fixedPlayerId] ?? fixedPlayerId;

		if (paddleIndex >= 0 && paddleIndex < this.paddleData.inputStates.length) {
			this.paddleData.inputStates[paddleIndex] = Math.max(-1, Math.min(1, moveInput));
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

		const currentTime = performance.now();

		if (this.gameState.checkRebuildComplete()) {
			this.completeArenaRebuild();
		}

		if (this.gameState.isRebuilding) {
			return this.getState();
		}

		this.updateBallSpawning(currentTime);
		const pd = this.pd;
		const cfg = this.cfg;

		this.updatePaddleMovement();

		for (let ss = 0; ss < cfg.SUB_STEPS; ss++) {
			PhysicsSystems.movement(pd, this.dt, ENTITY_MASKS.BALL);

			this.handleArenaCollisions();

			for (const ballEnt of this.entities.balls) {
				if (!pd.isActive(ballEnt) || pd.isEliminated[ballEnt] === 1) continue;
				for (const pillarEnt of this.entities.pillars) {
					// if (!pd.isActive(pillarEnt)) continue;
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
					paddleId: fixedPlayerId,
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
				// Add spawn info
				spawning: this.spawnState.enabled,
				spawnedThisPhase: this.spawnState.spawnedThisPhase,
				targetBalls: this.spawnState.targetBallCount,
				nextSpawnIn: this.spawnState.enabled ?
					Math.max(0, this.spawnState.nextSpawnTime - performance.now()) : 0,
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
		this.verifyEntityIntegrity();
		this.updateExistingBallRadii();
		this.redistributeSurvivingPlayers();
		this.resetBallsForNewPhase();
		this.gameState.completeArenaRebuild();

		this.verifyEntityIntegrity();
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
