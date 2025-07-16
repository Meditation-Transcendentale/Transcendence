export const CFG = {
	TARGET_FPS: 60,
	SUB_STEPS: 8,  // Reduced but more efficient sub-steps
	ARENA_RADIUS: 200,
	MAX_PLAYERS: 100,
	INITIAL_BALLS: 200,
	BALL_RADIUS: 0.5,
	INITIAL_SPEED: 50,
	PADDLE_FILL: 0.25,  // fraction of cell arc used by paddle
	PADDLE_RATIO: 1 / 20,  // paddle thickness relative to arc width

	// Precision settings
	COLLISION_EPSILON: 1e-6,  // Minimum distance for collision calculations
	VELOCITY_DAMPING: 0.9999,  // Slight damping to prevent energy accumulation
};

// Physics Data (SoA)
class PhysicsData {
	constructor(maxEntities) {
		this.count = 0;
		this.posX = new Float32Array(maxEntities);
		this.posY = new Float32Array(maxEntities);
		this.velX = new Float32Array(maxEntities);
		this.velY = new Float32Array(maxEntities);
		this.radius = new Float32Array(maxEntities);
		this.halfW = new Float32Array(maxEntities);
		this.halfH = new Float32Array(maxEntities);
		this.rot = new Float32Array(maxEntities);
		this.mask = new Uint8Array(maxEntities);
		this.arenaX = 0;
		this.arenaY = 0;
	}

	create(mask) {
		const id = this.count++;
		this.mask[id] = mask;
		return id;
	}
}

// Uniform Grid Broadphase (for ball-ball collisions only)
class UniformGrid {
	constructor(cellSize) {
		this.cellSize = cellSize;
		this.buckets = Object.create(null);
	}

	reset() {
		this.buckets = Object.create(null);
	}

	add(id, x, y) {
		const gx = Math.floor(x / this.cellSize);
		const gy = Math.floor(y / this.cellSize);
		const key = `${gx},${gy}`;
		if (!this.buckets[key]) this.buckets[key] = [];
		this.buckets[key].push(id);
	}
}

// Movement System (Euler Integrator)
function movementSystem(pd, dt) {
	for (let i = 0; i < pd.count; i++) {
		if (!pd.mask[i]) continue;
		pd.posX[i] += pd.velX[i] * dt;
		pd.posY[i] += pd.velY[i] * dt;
	}
}

// Ball-Ball Collision Detection and Response
function collideBallBall(pd, i, j) {
	const dx = pd.posX[j] - pd.posX[i];
	const dy = pd.posY[j] - pd.posY[i];
	const R = pd.radius[i] + pd.radius[j];
	const d2 = dx * dx + dy * dy;

	if (d2 >= R * R) return; // No collision

	const dist = Math.sqrt(d2);
	if (dist < 1e-6) { // Handle edge case of identical positions
		// Separate balls with small random offset
		const angle = Math.random() * 2 * Math.PI;
		const separation = R * 0.5;
		pd.posX[i] += Math.cos(angle) * separation;
		pd.posY[i] += Math.sin(angle) * separation;
		pd.posX[j] -= Math.cos(angle) * separation;
		pd.posY[j] -= Math.sin(angle) * separation;
		return;
	}

	const nx = dx / dist;
	const ny = dy / dist;
	const overlap = R - dist;

	// PRECISE separation - move balls apart proportional to their mass (assuming equal mass)
	const separation = overlap * 0.5;
	pd.posX[i] -= nx * separation;
	pd.posY[i] -= ny * separation;
	pd.posX[j] += nx * separation;
	pd.posY[j] += ny * separation;

	// PRECISE elastic collision response
	const vi = pd.velX[i] * nx + pd.velY[i] * ny;
	const vj = pd.velX[j] * nx + pd.velY[j] * ny;

	// Only reflect if balls are moving toward each other
	if (vi - vj > 0) {
		pd.velX[i] -= 2 * vi * nx;
		pd.velY[i] -= 2 * vi * ny;
		pd.velX[j] -= 2 * vj * nx;
		pd.velY[j] -= 2 * vj * ny;
	}
}

// Paddle Collision System (no arena boundary)
function handlePaddleCollisions(pd, ballEnts, paddleEnts, cfg) {
	const numPlayers = paddleEnts.length;
	const angleStep = (2 * Math.PI) / numPlayers;

	for (let i = 0; i < ballEnts.length; i++) {
		const ent = ballEnts[i];
		const ballX = pd.posX[ent];
		const ballY = pd.posY[ent];
		const ballRadius = pd.radius[ent];
		const distFromCenter = Math.sqrt(ballX * ballX + ballY * ballY);

		const collisionDistance = cfg.ARENA_RADIUS - ballRadius;

		if (distFromCenter >= collisionDistance && distFromCenter <= cfg.ARENA_RADIUS + 1) {
			const nx = ballX / distFromCenter;
			const ny = ballY / distFromCenter;
			const velocityDotNormal = pd.velX[ent] * nx + pd.velY[ent] * ny;

			if (velocityDotNormal <= 0) continue;

			const ballAngle = Math.atan2(ballY, ballX);
			let normalizedBallAngle = ballAngle;
			while (normalizedBallAngle < 0) normalizedBallAngle += 2 * Math.PI;
			while (normalizedBallAngle >= 2 * Math.PI) normalizedBallAngle -= 2 * Math.PI;

			let collisionOccurred = false;

			for (let paddleIndex = 0; paddleIndex < numPlayers; paddleIndex++) {
				const pillarArc = angleStep * 0.1;
				const usableArc = angleStep - pillarArc;
				const halfUsableArc = usableArc / 2;
				const sliceStart = paddleIndex * angleStep;
				const paddleCenterAngle = sliceStart + pillarArc + halfUsableArc;

				const arcWidth = angleStep * cfg.PADDLE_FILL;
				const startAngle = paddleCenterAngle - arcWidth / 2;
				const endAngle = paddleCenterAngle + arcWidth / 2;

				// Normalize angles
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
					// Paddle collision
					pd.posX[ent] = nx * collisionDistance;
					pd.posY[ent] = ny * collisionDistance;

					const dot = pd.velX[ent] * nx + pd.velY[ent] * ny;
					pd.velX[ent] -= 2 * dot * nx;
					pd.velY[ent] -= 2 * dot * ny;

					pd.velX[ent] *= cfg.VELOCITY_DAMPING;
					pd.velY[ent] *= cfg.VELOCITY_DAMPING;

					collisionOccurred = true;
					break;
				}
			}
		}
	}
}

// Pillar Collision System
function handlePillarCollisions(pd, ballEnts, pillarEnts, cfg) {
	for (let i = 0; i < ballEnts.length; i++) {
		const ballEnt = ballEnts[i];
		const ballX = pd.posX[ballEnt];
		const ballY = pd.posY[ballEnt];
		const ballRadius = pd.radius[ballEnt];

		for (let j = 0; j < pillarEnts.length; j++) {
			const pillarEnt = pillarEnts[j];
			const pillarX = pd.posX[pillarEnt];
			const pillarY = pd.posY[pillarEnt];
			const pillarRadius = pd.radius[pillarEnt]; // Treat pillar as circular for collision

			// Calculate distance between ball and pillar center
			const dx = ballX - pillarX;
			const dy = ballY - pillarY;
			const distance = Math.sqrt(dx * dx + dy * dy);
			const minDistance = ballRadius + pillarRadius;

			if (distance < minDistance && distance > cfg.COLLISION_EPSILON) {
				// Collision detected - bounce ball off pillar
				const nx = dx / distance; // Normal vector from pillar to ball
				const ny = dy / distance;

				// Separate ball from pillar
				const overlap = minDistance - distance;
				pd.posX[ballEnt] += nx * overlap;
				pd.posY[ballEnt] += ny * overlap;

				// Reflect velocity (elastic collision)
				const dot = pd.velX[ballEnt] * nx + pd.velY[ballEnt] * ny;
				pd.velX[ballEnt] -= 2 * dot * nx;
				pd.velY[ballEnt] -= 2 * dot * ny;

				// Apply damping
				pd.velX[ballEnt] *= cfg.VELOCITY_DAMPING;
				pd.velY[ballEnt] *= cfg.VELOCITY_DAMPING;
			}
		}
	}
}

export class PhysicsEngine {
	constructor(cfg = CFG) {
		this.cfg = cfg;
		this.pd = new PhysicsData(cfg.MAX_PLAYERS + cfg.INITIAL_BALLS + cfg.MAX_PLAYERS + 16); // Extra space for pillars
		this.dt = 1 / cfg.TARGET_FPS / cfg.SUB_STEPS;
		this.grid = null;
		this.paddleEnts = [];
		this.ballEnts = [];
		this.pillarEnts = []; // Add pillar tracking
	}

	initBattleRoyale(numPlayers, numBalls) {
		const pd = this.pd;
		const cfg = this.cfg;

		// Reset counts
		pd.count = 0;
		this.paddleEnts = [];
		this.ballEnts = [];
		this.pillarEnts = [];

		// Grid for ball-ball collisions
		const gridCellSize = cfg.BALL_RADIUS * 4;
		this.grid = new UniformGrid(gridCellSize);

		// Initialize paddles and pillars
		const angleStep = (2 * Math.PI) / numPlayers; // Fixed: use numPlayers instead of hardcoded 100
		const paddleArc = angleStep * cfg.PADDLE_FILL;
		const halfArc = paddleArc / 2;
		const pillarArc = angleStep * 0.1;
		const usableArc = angleStep - pillarArc;
		const halfUsableArc = usableArc / 2;

		for (let pid = 0; pid < numPlayers; pid++) {
			// ---- Create Paddle ----
			const paddleEnt = pd.create(2); // mask = 2 for paddles
			this.paddleEnts[pid] = paddleEnt;

			const sliceStart = pid * angleStep;
			const midAngle = sliceStart + pillarArc + halfUsableArc;
			const paddleAngle = midAngle;

			pd.posX[paddleEnt] = Math.cos(paddleAngle) * cfg.ARENA_RADIUS;
			pd.posY[paddleEnt] = Math.sin(paddleAngle) * cfg.ARENA_RADIUS;
			pd.rot[paddleEnt] = paddleAngle - Math.PI / 2; // Face inward

			// Set paddle dimensions
			const perim = 2 * Math.PI * cfg.ARENA_RADIUS;
			const cellW = (perim / numPlayers) * cfg.PADDLE_FILL;
			pd.halfW[paddleEnt] = cellW / 2;
			pd.halfH[paddleEnt] = (cellW * cfg.PADDLE_RATIO) / 2;
			pd.radius[paddleEnt] = cellW / 2;

			// ---- Create Pillar ----
			const pillarEnt = pd.create(3); // mask = 3 for pillars
			this.pillarEnts[pid] = pillarEnt;

			// Match your client pillar positioning logic
			const maxOffset = halfUsableArc - halfArc;
			const pillarAngle = midAngle - maxOffset - halfArc;
			const pillarSize = cfg.ARENA_RADIUS * pillarArc;

			// Position pillar (matching your client logic)
			const baseX = Math.cos(pillarAngle) * cfg.ARENA_RADIUS;
			const baseY = Math.sin(pillarAngle) * cfg.ARENA_RADIUS;

			const tx = -Math.sin(pillarAngle);
			const ty = Math.cos(pillarAngle);
			const halfThickness = pillarSize / 2;

			pd.posX[pillarEnt] = baseX - tx * halfThickness;
			pd.posY[pillarEnt] = baseY - ty * halfThickness;
			pd.rot[pillarEnt] = -pillarAngle;

			// Set pillar collision radius (approximate as circle)
			pd.radius[pillarEnt] = pillarSize / 2; // Use half the pillar size as collision radius
			pd.halfW[pillarEnt] = pillarSize / 2;
			pd.halfH[pillarEnt] = pillarSize / 2;

			console.log(`Paddle ${pid}: angle=${(paddleAngle * 180 / Math.PI).toFixed(1)}° pos=(${pd.posX[paddleEnt].toFixed(1)}, ${pd.posY[paddleEnt].toFixed(1)})`);
			console.log(`Pillar ${pid}: angle=${(pillarAngle * 180 / Math.PI).toFixed(1)}° pos=(${pd.posX[pillarEnt].toFixed(1)}, ${pd.posY[pillarEnt].toFixed(1)}) radius=${pd.radius[pillarEnt].toFixed(1)}`);
		}

		// Initialize balls (unchanged)
		for (let b = 0; b < numBalls; b++) {
			const ent = pd.create(1); // mask = 1 for balls
			this.ballEnts[b] = ent;

			pd.radius[ent] = cfg.BALL_RADIUS;

			// Spawn balls in inner area
			const maxSpawnRadius = cfg.ARENA_RADIUS * 0.6;
			const r0 = Math.sqrt(Math.random()) * maxSpawnRadius;
			const t0 = Math.random() * 2 * Math.PI;
			pd.posX[ent] = r0 * Math.cos(t0);
			pd.posY[ent] = r0 * Math.sin(t0);

			// Random velocity
			const d = Math.random() * 2 * Math.PI;
			pd.velX[ent] = Math.cos(d) * cfg.INITIAL_SPEED;
			pd.velY[ent] = Math.sin(d) * cfg.INITIAL_SPEED;
		}
	}

	updatePaddleInput(pid, move) {
		const ent = this.paddleEnts[pid];
		if (ent == null) return;

		// Move paddle tangentially around the arena
		const v = move * this.cfg.INITIAL_SPEED;
		this.pd.velX[ent] = Math.sin(this.pd.rot[ent]) * v;
		this.pd.velY[ent] = -Math.cos(this.pd.rot[ent]) * v;
	}

	step() {
		const pd = this.pd;

		// Zero paddle velocities (they'll be set by input)
		this.paddleEnts.forEach(ent => {
			pd.velX[ent] = 0;
			pd.velY[ent] = 0;
		});

		// Zero pillar velocities (pillars are static)
		this.pillarEnts.forEach(ent => {
			pd.velX[ent] = 0;
			pd.velY[ent] = 0;
		});

		// Sub-steps for numerical stability
		const subDt = this.dt;

		for (let ss = 0; ss < this.cfg.SUB_STEPS; ss++) {
			// 1. Move all entities
			movementSystem(pd, subDt);

			// 2. Handle paddle collisions
			handlePaddleCollisions(pd, this.ballEnts, this.paddleEnts, this.cfg);

			// 3. Handle pillar collisions
			handlePillarCollisions(pd, this.ballEnts, this.pillarEnts, this.cfg);

			// 4. Handle ball-ball collisions
			this.grid.reset();

			for (let i = 0; i < this.ballEnts.length; i++) {
				const ent = this.ballEnts[i];
				this.grid.add(ent, pd.posX[ent], pd.posY[ent]);
			}

			for (const key in this.grid.buckets) {
				const ids = this.grid.buckets[key];
				if (ids.length < 2) continue;

				const entries = ids.map(id => ({
					id,
					minX: pd.posX[id] - pd.radius[id],
					maxX: pd.posX[id] + pd.radius[id]
				}));
				entries.sort((a, b) => a.minX - b.minX);

				for (let i = 0; i < entries.length; i++) {
					for (let j = i + 1; j < entries.length; j++) {
						if (entries[j].minX > entries[i].maxX) break;

						const A = entries[i].id;
						const B = entries[j].id;
						collideBallBall(pd, A, B);
					}
				}
			}

			// 5. Optional: Remove balls that are too far from arena (performance optimization)
			/*
			for (let i = this.ballEnts.length - 1; i >= 0; i--) {
				const ent = this.ballEnts[i];
				const ballX = pd.posX[ent];
				const ballY = pd.posY[ent];
				const distFromCenter = Math.sqrt(ballX * ballX + ballY * ballY);
				
				// Remove balls that are very far from arena (escaped)
				if (distFromCenter > this.cfg.ARENA_RADIUS * 3) {
					this.ballEnts.splice(i, 1);
					pd.mask[ent] = 0; // Mark as inactive
				}
			}
			*/
		}

		return this.getState();
	}

	getState() {
		const pd = this.pd;

		const balls = this.ballEnts.map((ent, i) => ({
			id: i,
			x: pd.posX[ent],
			y: pd.posY[ent],
			vx: pd.velX[ent],
			vy: pd.velY[ent],
			radius: pd.radius[ent]
		}));

		const paddles = this.paddleEnts.map((ent, i) => ({
			id: i,
			x: pd.posX[ent],
			y: pd.posY[ent],
			rot: pd.rot[ent],
			radius: pd.radius[ent]
		}));

		// Include pillars in the state for debugging/visualization
		const pillars = this.pillarEnts.map((ent, i) => ({
			id: i,
			x: pd.posX[ent],
			y: pd.posY[ent],
			rot: pd.rot[ent],
			radius: pd.radius[ent]
		}));

		return {
			balls,
			paddles,
			pillars, // Add pillars to state
			events: [],
			arenaCenter: { x: pd.arenaX, y: pd.arenaY },
			config: this.cfg,
			numPlayers: this.paddleEnts.length
		};
	}
}
