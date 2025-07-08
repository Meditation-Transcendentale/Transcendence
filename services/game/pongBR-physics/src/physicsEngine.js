// services/game/pong-physics/src/physicsEngine.js

// ─── 1. Configuration ─────────────────────────────────────────────────────
export const CFG = {
	TARGET_FPS: 60,
	SUB_STEPS: 10,
	ARENA_RADIUS: 200,
	MAX_ENTITIES: 512,
	INITIAL_BALLS: 200,
	MAX_PLAYERS: 100,
	BALL_RADIUS: 1,
	INITIAL_SPEED: 50,
	WALL_HEIGHT: 10,
	PADDLE_HEIGHT: 20,
	PILLAR_SIZE: 5,
	CELL_SIZE: 2,   // ~ 2 × BALL_RADIUS
	RNG_SEED: 123456,
};

// ─── 2. Seeded RNG ─────────────────────────────────────────────────────────
function createRNG(seed) {
	let a = seed >>> 0;
	return () => {
		let t = (a += 0x6D2B79F5);
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

// ─── 3. Physics Data (SoA + Free List) ────────────────────────────────────
class PhysicsData {
	constructor(max = CFG.MAX_ENTITIES) {
		this.freeList = [];
		this.count = 0;
		this.max = max;
		// Structure-of-Arrays buffers
		this.posX = new Float32Array(max);
		this.posY = new Float32Array(max);
		this.velX = new Float32Array(max);
		this.velY = new Float32Array(max);
		this.radius = new Float32Array(max);
		this.halfW = new Float32Array(max);
		this.halfH = new Float32Array(max);
		this.rot = new Float32Array(max);
		// bit0=ball, bit1=paddle, bit2=wall, bit3=pillar
		this.mask = new Uint8Array(max);
	}

	create() {
		const id = this.freeList.length ? this.freeList.pop() : this.count++;
		if (id >= this.max) throw new Error('Exceeded max entities');
		this.mask[id] = 0;
		return id;
	}

	destroy(id) {
		this.mask[id] = 0;
		this.freeList.push(id);
	}
}

// ─── 4. Integrator ────────────────────────────────────────────────────────
function integrate(pd, dt) {
	for (let i = 0; i < pd.count; i++) {
		if (!pd.mask[i]) continue;
		pd.posX[i] += pd.velX[i] * dt;
		pd.posY[i] += pd.velY[i] * dt;
	}
}

// ─── 5. Uniform-Grid Broadphase ───────────────────────────────────────────
class UniformGrid {
	constructor(arenaRadius, cellSize) {
		this.radius = arenaRadius;
		this.size = cellSize;
		this.gridW = Math.ceil((2 * arenaRadius) / cellSize);
		this.buckets = Array.from({ length: this.gridW * this.gridW }, () => []);
	}

	reset() {
		for (const b of this.buckets) b.length = 0;
	}

	add(id, x, y) {
		const gx = Math.floor((x + this.radius) / this.size);
		const gy = Math.floor((y + this.radius) / this.size);
		const idx = gx + gy * this.gridW;
		if (idx >= 0 && idx < this.buckets.length) {
			this.buckets[idx].push(id);
		}
	}
}

// ─── 6. Collision Helpers ─────────────────────────────────────────────────

/** Circle–Circle collision & response */
function collideBalls(pd, grid) {
	for (const cell of grid.buckets) {
		const L = cell.length;
		for (let a = 0; a < L; a++) {
			const i = cell[a];
			for (let b = a + 1; b < L; b++) {
				const j = cell[b];
				const dx = pd.posX[j] - pd.posX[i];
				const dy = pd.posY[j] - pd.posY[i];
				const sumR = pd.radius[i] + pd.radius[j];
				const dist2 = dx * dx + dy * dy;
				if (dist2 >= sumR * sumR) continue;

				const dist = Math.sqrt(dist2) || sumR;
				const overlap = sumR - dist;
				const nx = dx / dist, ny = dy / dist;

				// separate
				pd.posX[i] -= nx * overlap * 0.5;
				pd.posY[i] -= ny * overlap * 0.5;
				pd.posX[j] += nx * overlap * 0.5;
				pd.posY[j] += ny * overlap * 0.5;

				// reflect velocities
				const vi = pd.velX[i] * nx + pd.velY[i] * ny;
				const vj = pd.velX[j] * nx + pd.velY[j] * ny;
				pd.velX[i] -= 2 * vi * nx;
				pd.velY[i] -= 2 * vi * ny;
				pd.velX[j] -= 2 * vj * nx;
				pd.velY[j] -= 2 * vj * ny;
			}
		}
	}
}

/**
 * Compute MTV & response for circle vs. oriented box
 */
function computeCircleBoxMTV(cx, cy, radius,
	bx, by, halfW, halfH, rotation) {
	const cos = Math.cos(-rotation);
	const sin = Math.sin(-rotation);
	const localX = cos * (cx - bx) - sin * (cy - by);
	const localY = sin * (cx - bx) + cos * (cy - by);

	const closestX = Math.max(-halfW, Math.min(localX, halfW));
	const closestY = Math.max(-halfH, Math.min(localY, halfH));

	const dx = localX - closestX, dy = localY - closestY;
	const dist2 = dx * dx + dy * dy;
	if (dist2 === 0) return null;

	const dist = Math.sqrt(dist2);
	const penetration = radius - dist;
	if (penetration <= 0) return null;

	const nx = dx / dist, ny = dy / dist;
	const mtvLocalX = nx * penetration, mtvLocalY = ny * penetration;

	// rotate MTV back to world
	const worldX = cos * mtvLocalX + -sin * mtvLocalY;
	const worldY = sin * mtvLocalX + cos * mtvLocalY;
	return { mtvX: worldX, mtvY: worldY, nx, ny };
}

/** Circle–Box collision & response for paddles, walls, pillars */
function collideBallBoxes(pd, grid) {
	const max = pd.count;
	for (const cell of grid.buckets) {
		for (const bi of cell) {
			if ((pd.mask[bi] & 1) === 0) continue; // only balls
			for (let be = 0; be < max; be++) {
				const m = pd.mask[be];
				if ((m & ((1 << 1) | (1 << 2) | (1 << 3))) === 0) continue;
				const mtv = computeCircleBoxMTV(
					pd.posX[bi], pd.posY[bi], pd.radius[bi],
					pd.posX[be], pd.posY[be], pd.halfW[be], pd.halfH[be], pd.rot[be]
				);
				if (!mtv) continue;

				// separate
				pd.posX[bi] += mtv.mtvX;
				pd.posY[bi] += mtv.mtvY;
				// bounce
				const vDot = pd.velX[bi] * mtv.nx + pd.velY[bi] * mtv.ny;
				pd.velX[bi] -= 2 * vDot * mtv.nx;
				pd.velY[bi] -= 2 * vDot * mtv.ny;
			}
		}
	}
}

// ─── 7. Physics Engine ────────────────────────────────────────────────────
export class PhysicsEngine {
	constructor(cfg = CFG) {
		this.cfg = cfg;
		this.rng = createRNG(cfg.RNG_SEED);
		this.pd = new PhysicsData(cfg.MAX_ENTITIES);
		this.grid = new UniformGrid(cfg.ARENA_RADIUS, cfg.CELL_SIZE);
		this.dt = 1 / cfg.TARGET_FPS / cfg.SUB_STEPS;
		this.events = [];

		this.ballIdToEnt = new Map();
		this.paddleIdToEnt = new Map();
	}

	initBattleRoyale({ numPlayers, numBalls }) {
		const pd = this.pd;
		const rand = this.rng;
		const cfg = this.cfg;

		// Spawn balls
		for (let bid = 0; bid < numBalls; bid++) {
			const ent = pd.create();
			this.ballIdToEnt.set(bid, ent);
			pd.mask[ent] = 1 << 0;
			pd.radius[ent] = cfg.BALL_RADIUS;
			const r = Math.sqrt(rand()) * (cfg.ARENA_RADIUS * 0.5);
			const θ = rand() * 2 * Math.PI;
			pd.posX[ent] = r * Math.cos(θ);
			pd.posY[ent] = r * Math.sin(θ);
			const dir = rand() * 2 * Math.PI;
			pd.velX[ent] = Math.cos(dir) * cfg.INITIAL_SPEED;
			pd.velY[ent] = Math.sin(dir) * cfg.INITIAL_SPEED;
		}

		// Spawn paddles, walls, pillars
		const perim = 2 * Math.PI * cfg.ARENA_RADIUS;
		const step = (2 * Math.PI) / numPlayers;

		for (let pid = 0; pid < numPlayers; pid++) {
			const angle = step * pid;
			const x = cfg.ARENA_RADIUS * Math.cos(angle);
			const y = cfg.ARENA_RADIUS * Math.sin(angle);
			const rot = angle + Math.PI / 2;

			// Paddle
			const pent = pd.create();
			this.paddleIdToEnt.set(pid, pent);
			pd.mask[pent] = 1 << 1;
			pd.posX[pent] = x;
			pd.posY[pent] = y;
			pd.halfW[pent] = perim / (2 * numPlayers);
			pd.halfH[pent] = cfg.PADDLE_HEIGHT;
			pd.rot[pent] = rot;

			// Wall
			const went = pd.create();
			pd.mask[went] = 1 << 2;
			pd.posX[went] = x;
			pd.posY[went] = y;
			pd.halfW[went] = perim / (2 * numPlayers);
			pd.halfH[went] = cfg.WALL_HEIGHT;
			pd.rot[went] = rot;

			// Pillar
			const piet = pd.create();
			pd.mask[piet] = 1 << 3;
			pd.posX[piet] = x;
			pd.posY[piet] = y;
			pd.halfW[piet] = cfg.PILLAR_SIZE;
			pd.halfH[piet] = cfg.PILLAR_SIZE;
			pd.rot[piet] = rot;
		}
	}

	updatePaddleInput(playerId, move) {
		const ent = this.paddleIdToEnt.get(playerId);
		if (ent == null) return;
		// convert move [-1..1] into vertical velocity:
		this.pd.velY[ent] = move * this.cfg.INITIAL_SPEED;
	}

	step() {
		this.events.length = 0;
		const pd = this.pd, grid = this.grid;

		for (let s = 0; s < this.cfg.SUB_STEPS; s++) {
			integrate(pd, this.dt);

			grid.reset();
			for (let i = 0; i < pd.count; i++) {
				if (pd.mask[i] & (1 << 0)) {
					grid.add(i, pd.posX[i], pd.posY[i]);
				}
			}

			collideBalls(pd, grid, this.events);
			collideBallBoxes(pd, grid, this.events);
		}

		return this._emitState();
	}

	_emitState() {
		const pd = this.pd;
		const out = { balls: [], paddles: [], events: this.events };
		for (let i = 0; i < pd.count; i++) {
			const m = pd.mask[i];
			if (!m) continue;
			if (m & (1 << 0)) {
				out.balls.push({
					id: [...this.ballIdToEnt].find(([_, e]) => e === i)[0],
					x: pd.posX[i],
					y: pd.posY[i],
					vx: pd.velX[i],
					vy: pd.velY[i]
				});
			}
			if (m & (1 << 1)) {
				out.paddles.push({
					id: [...this.paddleIdToEnt].find(([_, e]) => e === i)[0],
					x: pd.posX[i],
					y: pd.posY[i]
				});
			}
		}
		return out;
	}
}
