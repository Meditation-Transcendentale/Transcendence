export const CFG = {
	TARGET_FPS: 60,
	SUB_STEPS: 8,  // Reduced but more efficient sub-steps
	ARENA_RADIUS: 200,
	MAX_PLAYERS: 100,
	INITIAL_BALLS: 200,
	BALL_RADIUS: 0.25,
	INITIAL_SPEED: 50,
	PADDLE_FILL: 0.25,  // fraction of cell arc used by paddle
	PADDLE_RATIO: 1 / 5,  // paddle thickness relative to arc width

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

// Utility function for rotating a point around origin
function rotatePoint(x, y, angle) {
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);
	return {
		x: x * cos - y * sin,
		y: x * sin + y * cos
	};
}

// Square (Oriented Bounding Box) vs Circle collision detection
function collideCircleWithOBB(circleX, circleY, circleRadius, rectX, rectY, rectHalfW, rectHalfH, rectAngle) {
	// Transform circle center to rectangle's local coordinate system
	const dx = circleX - rectX;
	const dy = circleY - rectY;

	// Rotate the circle center to align with the rectangle's axes
	const localPoint = rotatePoint(dx, dy, -rectAngle);
	const localX = localPoint.x;
	const localY = localPoint.y;

	// Find the closest point on the rectangle to the circle center
	const closestX = Math.max(-rectHalfW, Math.min(rectHalfW, localX));
	const closestY = Math.max(-rectHalfH, Math.min(rectHalfH, localY));

	// Calculate distance from circle center to closest point
	const distX = localX - closestX;
	const distY = localY - closestY;
	const distanceSquared = distX * distX + distY * distY;

	// Check if collision occurred
	if (distanceSquared <= circleRadius * circleRadius) {
		const distance = Math.sqrt(distanceSquared);

		// Calculate collision normal in local space
		let normalX, normalY;

		if (distance < 1e-6) {
			// Circle center is inside rectangle, push out along shortest axis
			if (rectHalfW - Math.abs(localX) < rectHalfH - Math.abs(localY)) {
				normalX = localX > 0 ? 1 : -1;
				normalY = 0;
			} else {
				normalX = 0;
				normalY = localY > 0 ? 1 : -1;
			}
		} else {
			// Normal points from closest point to circle center
			normalX = distX / distance;
			normalY = distY / distance;
		}

		// Transform normal back to world space
		const worldNormal = rotatePoint(normalX, normalY, rectAngle);

		// Calculate penetration depth
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

// Updated Pillar Collision System - Now uses square collision detection
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
			const pillarHalfW = pd.halfW[pillarEnt];
			const pillarHalfH = pd.halfH[pillarEnt];
			const pillarAngle = pd.rot[pillarEnt];

			// Use square collision detection
			const collision = collideCircleWithOBB(
				ballX, ballY, ballRadius,
				pillarX, pillarY, pillarHalfW, pillarHalfH, pillarAngle
			);

			if (collision.collision) {
				// Separate ball from pillar
				pd.posX[ballEnt] += collision.normalX * collision.penetration;
				pd.posY[ballEnt] += collision.normalY * collision.penetration;

				// Reflect velocity (elastic collision)
				const dot = pd.velX[ballEnt] * collision.normalX + pd.velY[ballEnt] * collision.normalY;
				pd.velX[ballEnt] -= 2 * dot * collision.normalX;
				pd.velY[ballEnt] -= 2 * dot * collision.normalY;

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
		this.pd = new PhysicsData(cfg.MAX_PLAYERS + cfg.INITIAL_BALLS + cfg.MAX_PLAYERS + 16);
		this.dt = 1 / cfg.TARGET_FPS / cfg.SUB_STEPS;
		this.grid = null;
		this.paddleEnts = [];
		this.ballEnts = [];
		this.pillarEnts = [];

		this.paddleOffsets = [];     // Current offset of each paddle from center
		this.paddleMaxOffsets = [];  // Maximum allowed offset for each paddle
		this.paddleCenterAngles = []; // Base angle for each paddle (center of usable arc)
	}

	initBattleRoyale(numPlayers, numBalls) {
		const pd = this.pd;
		const cfg = this.cfg;

		// Reset counts
		pd.count = 0;
		this.paddleEnts = [];
		this.ballEnts = [];
		this.pillarEnts = [];
		this.paddleOffsets = [];
		this.paddleMaxOffsets = [];
		this.paddleCenterAngles = [];

		// Grid for ball-ball collisions
		const gridCellSize = cfg.BALL_RADIUS * 4;
		this.grid = new UniformGrid(gridCellSize);

		// Initialize paddles and pillars
		const angleStep = (2 * Math.PI) / numPlayers;
		const paddleArc = angleStep * cfg.PADDLE_FILL;
		const halfArc = paddleArc / 2;
		const pillarArc = angleStep * 0.1;
		const usableArc = angleStep - pillarArc;
		const halfUsableArc = usableArc / 2;
		const maxOffsets = halfUsableArc - halfArc;

		for (let pid = 0; pid < numPlayers; pid++) {
			// ---- Create Paddle ----
			const paddleEnt = pd.create(2); // mask = 2 for paddles
			this.paddleEnts[pid] = paddleEnt;

			const sliceStart = pid * angleStep;
			const midAngle = sliceStart + pillarArc + halfUsableArc;
			const paddleAngle = midAngle;

			this.paddleCenterAngles[pid] = midAngle;
			this.paddleMaxOffsets[pid] = maxOffsets;
			this.paddleOffsets[pid] = 0;

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
			pd.rot[pillarEnt] = pillarAngle;

			// Set pillar dimensions for square collision
			pd.halfW[pillarEnt] = pillarSize / 2;  // Half width
			pd.halfH[pillarEnt] = pillarSize / 2;  // Half height
			pd.radius[pillarEnt] = pillarSize / 2; // Keep radius for visualization/debug

			console.log(`Paddle ${pid}: angle=${(paddleAngle * 180 / Math.PI).toFixed(1)}° pos=(${pd.posX[paddleEnt].toFixed(1)}, ${pd.posY[paddleEnt].toFixed(1)})`);
			console.log(`Pillar ${pid}: angle=${(pillarAngle * 180 / Math.PI).toFixed(1)}° pos=(${pd.posX[pillarEnt].toFixed(1)}, ${pd.posY[pillarEnt].toFixed(1)}) size=${pillarSize.toFixed(1)}`);
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

	// FIXED: Paddle collision detection moved inside class as method
	handlePaddleCollisions(pd, ballEnts, paddleEnts, cfg) {
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
					// NOW this.paddleCenterAngles works because it's inside the class
					const currentPaddleAngle = this.paddleCenterAngles[paddleIndex] + this.paddleOffsets[paddleIndex];
					const arcWidth = angleStep * cfg.PADDLE_FILL;
					const startAngle = currentPaddleAngle - arcWidth / 2;
					const endAngle = currentPaddleAngle + arcWidth / 2;

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

	updatePaddleInput(pid, moveInput) {
		if (pid >= this.paddleEnts.length) return;

		const paddleEnt = this.paddleEnts[pid];
		if (paddleEnt == null) return;

		const cfg = this.cfg;
		const dt = this.dt * this.cfg.SUB_STEPS; // Full frame time step

		// Movement speed (adjust as needed)
		const moveSpeed = 2.0; // radians per second
		const deltaOffset = moveInput * moveSpeed * dt;

		// Update offset with constraints
		const newOffset = this.paddleOffsets[pid] + deltaOffset;
		const maxOffset = this.paddleMaxOffsets[pid];

		// Clamp offset to valid range
		this.paddleOffsets[pid] = Math.max(-maxOffset, Math.min(maxOffset, newOffset));
		console.log(`deltaOffset = ${deltaOffset}, newOffset = ${newOffset}, maxOffset = ${maxOffset}`);

		// Calculate new paddle position
		const centerAngle = this.paddleCenterAngles[pid];
		const currentAngle = centerAngle + this.paddleOffsets[pid];

		// Update paddle physics data
		const pd = this.pd;
		pd.posX[paddleEnt] = Math.cos(currentAngle) * cfg.ARENA_RADIUS;
		pd.posY[paddleEnt] = Math.sin(currentAngle) * cfg.ARENA_RADIUS;
		pd.rot[paddleEnt] = currentAngle - Math.PI / 2; // Face inward

		// Set velocity for smooth movement (optional, for visual smoothness)
		pd.velX[paddleEnt] = 0; // Paddles move instantly to new position
		pd.velY[paddleEnt] = 0;

		// Debug output
		console.log(`Paddle ${pid}: offset=${(this.paddleOffsets[pid] * 180 / Math.PI).toFixed(1)}° angle=${(currentAngle * 180 / Math.PI).toFixed(1)}°`);
	}

	step() {
		const pd = this.pd;

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

			// 2. Handle paddle collisions (now using class method)
			this.handlePaddleCollisions(pd, this.ballEnts, this.paddleEnts, this.cfg);

			// 3. Handle pillar collisions (now with square collision)
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
			offset: this.paddleOffsets[i]
		}));

		const pillars = this.pillarEnts.map((ent, i) => ({
			id: i,
			x: pd.posX[ent],
			y: pd.posY[ent],
			rot: pd.rot[ent],
			radius: pd.radius[ent],
			halfW: pd.halfW[ent], // Add dimensions for visualization
			halfH: pd.halfH[ent]
		}));

		return {
			balls,
			paddles,
			pillars,
			events: [],
			arenaCenter: { x: pd.arenaX, y: pd.arenaY },
			config: this.cfg,
			numPlayers: this.paddleEnts.length
		};
	}
}
