// services/game/pong-physics/src/physicsEngine.js

// Configuration
export const CFG = {
	TARGET_FPS: 60,
	SUB_STEPS: 10,
	ARENA_RADIUS: 200,
	MAX_PLAYERS: 100,
	INITIAL_BALLS: 200,
	BALL_RADIUS: 1,
	INITIAL_SPEED: 50,
	PADDLE_FILL: 3,  // fraction of cell arc used by paddle
	PADDLE_RATIO: 1 / 40,  // paddle thickness relative to arc width
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
	}

	create(mask) {
		const id = this.count++;
		this.mask[id] = mask;
		return id;
	}
}

// Uniform Grid Broadphase
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

// Collision Detection and Response
function collideBallBall(pd, i, j) {
	const dx = pd.posX[j] - pd.posX[i];
	const dy = pd.posY[j] - pd.posY[i];
	const R = pd.radius[i] + pd.radius[j];
	const d2 = dx * dx + dy * dy;
	if (d2 >= R * R) return;
	const dist = Math.sqrt(d2) || R;
	const nx = dx / dist;
	const ny = dy / dist;
	const overlap = (R - dist) * 0.5;
	pd.posX[i] -= nx * overlap;
	pd.posY[i] -= ny * overlap;
	pd.posX[j] += nx * overlap;
	pd.posY[j] += ny * overlap;
	const vi = pd.velX[i] * nx + pd.velY[i] * ny;
	const vj = pd.velX[j] * nx + pd.velY[j] * ny;
	pd.velX[i] -= 2 * vi * nx;
	pd.velY[i] -= 2 * vi * ny;
	pd.velX[j] -= 2 * vj * nx;
	pd.velY[j] -= 2 * vj * ny;
}

function collideBallPaddle(pd, bi, pi) {
	const bx = pd.posX[pi], by = pd.posY[pi];
	const hw = pd.halfW[pi], hh = pd.halfH[pi];
	const angle = -pd.rot[pi];
	const cosB = Math.cos(angle), sinB = Math.sin(angle);

	// Transform circle center into box local space
	const cx = pd.posX[bi], cy = pd.posY[bi];
	const dx0 = cx - bx, dy0 = cy - by;
	const cosA = Math.cos(angle), sinA = -Math.sin(angle);
	const lx = cosA * dx0 - sinA * dy0;
	const ly = sinA * dx0 + cosA * dy0;

	// Clamp to box extents
	const clx = Math.max(-hw, Math.min(lx, hw));
	const cly = Math.max(-hh, Math.min(ly, hh));
	const dlx = lx - clx, dly = ly - cly;

	// Check for overlap
	const dist2 = dlx * dlx + dly * dly;
	const r = pd.radius[bi];
	if (dist2 > r * r) return;  // no collision

	// Compute penetration
	const dist = Math.sqrt(dist2) || r;
	const pen = r - dist;
	// if (pen > 0) {
	// 	console.log(`[debug collision] bi=${bi}, pi=${pi}, penetration=${pen.toFixed(2)}`);
	// }

	// Compute normals and MTV in local space
	const nxl = dlx / dist;
	const nyl = dly / dist;
	const mtxl = nxl * pen, mtyl = nyl * pen;

	// Convert MTV back to world space
	const mtx = cosB * mtxl - sinB * mtyl;
	const mty = sinB * mtxl + cosB * mtyl;
	pd.posX[bi] += mtx;
	pd.posY[bi] += mty;

	// Reflect velocity about the world-space normal
	const nxw = cosB * nxl - sinB * nyl;
	const nyw = sinB * nxl + cosB * nyl;
	const dot = pd.velX[bi] * nxw + pd.velY[bi] * nyw;
	pd.velX[bi] -= 2 * dot * nxw;
	pd.velY[bi] -= 2 * dot * nyw;
}

export class PhysicsEngine {
	constructor(cfg = CFG) {
		this.cfg = cfg;
		this.pd = new PhysicsData(cfg.MAX_PLAYERS + cfg.INITIAL_BALLS + 16);
		this.dt = 1 / cfg.TARGET_FPS / cfg.SUB_STEPS;
		this.grid = null;
		this.paddleEnts = [];
		this.ballEnts = [];
	}

	initBattleRoyale(numPlayers, numBalls) {
		const pd = this.pd;
		const cfg = this.cfg;
		const angleStep = (2 * Math.PI) / numPlayers;
		const paddleArc = angleStep * 0.25;
		const pillarArc = angleStep * 0.1;
		const usableArc = angleStep - pillarArc;
		const halfUsableArc = usableArc / 2;
		const maxOffset = halfUsableArc - paddleArc / 2;
		const perim = 2 * Math.PI * cfg.ARENA_RADIUS;
		const cellW = (perim / numPlayers) * cfg.PADDLE_FILL;
		this.grid = new UniformGrid(cellW);

		// for (let pid = 0; pid < numPlayers; pid++) {
		// 	const sliceStart = pid * angleStep;
		// 	const midAngle = sliceStart + pillarArc + halfUsableArc;
		// 	const paddleYaw = -midAngle;
		//
		// 	const ent = pd.create(2);
		// 	this.paddleEnts[pid] = ent;
		//
		// 	// Set rotation to match client-side yaw
		// 	pd.rot[ent] = paddleYaw;
		//
		// 	// Calculate paddle dimensions
		// 	pd.halfW[ent] = cellW / 2;
		// 	pd.halfH[ent] = (cellW * cfg.PADDLE_RATIO) / 2;
		//
		// 	// Position the paddle on the circumference of the circle
		// 	pd.posX[ent] = Math.cos(midAngle) * (cfg.ARENA_RADIUS);
		// 	pd.posY[ent] = Math.sin(midAngle) * (cfg.ARENA_RADIUS);
		//
		// 	console.log(`Paddle ${pid}: x = ${pd.posX[ent]}, y = ${pd.posY[ent]}, rotation = ${pd.rot[ent]}`);
		// }
		// Initialize paddles
		for (let pid = 0; pid < numPlayers; pid++) {
			const ang = (2 * Math.PI / numPlayers) * pid;
			const ent = pd.create(2);
			this.paddleEnts[pid] = ent;
			pd.rot[ent] = -(ang + Math.PI / 2);
			pd.halfW[ent] = cellW / 2;
			pd.halfH[ent] = (cellW * cfg.PADDLE_RATIO) / 2;
			pd.posX[ent] = Math.cos(ang) * (cfg.ARENA_RADIUS + 1);
			pd.posY[ent] = Math.sin(ang) * (cfg.ARENA_RADIUS + 1);
			console.log(`Paddle ${pid} : x = ${pd.posX[ent]} y = ${pd.posY[ent]}`);
		}

		// Initialize balls
		for (let b = 0; b < numBalls; b++) {
			const ent = pd.create(1);
			this.ballEnts[b] = ent;
			pd.radius[ent] = cfg.BALL_RADIUS;
			const r0 = Math.sqrt(Math.random()) * (cfg.ARENA_RADIUS * 0.5);
			const t0 = Math.random() * 2 * Math.PI;
			pd.posX[ent] = r0 * Math.cos(t0);
			pd.posY[ent] = r0 * Math.sin(t0);
			const d = Math.random() * 2 * Math.PI;
			pd.velX[ent] = Math.cos(d) * cfg.INITIAL_SPEED;
			pd.velY[ent] = Math.sin(d) * cfg.INITIAL_SPEED;
		}
	}

	updatePaddleInput(pid, move) {
		const ent = this.paddleEnts[pid];
		if (ent == null) return;
		// Adjust radial offset
		const v = move * this.cfg.INITIAL_SPEED;
		this.pd.velX[ent] = Math.sin(this.pd.rot[ent]) * v;
		this.pd.velY[ent] = -Math.cos(this.pd.rot[ent]) * v;
	}

	step() {
		const pd = this.pd;
		// Zero paddle velocities
		this.paddleEnts.forEach(ent => {
			pd.velX[ent] = 0;
			pd.velY[ent] = 0;
		});

		// if (this.ballEnts.length && this.paddleEnts.length) {
		// 	const fb = this.ballEnts[0], p0 = this.paddleEnts[0];
		// 	const bx = pd.posX[fb], by = pd.posY[fb];
		// 	const ang = pd.rot[p0];
		// 	const dx = bx - pd.posX[p0], dy = by - pd.posY[p0];
		// 	const lx = Math.cos(-ang) * dx - Math.sin(-ang) * dy;
		// 	const ly = Math.sin(-ang) * dx + Math.cos(-ang) * dy;
		// }

		// Sub-steps
		for (let ss = 0; ss < this.cfg.SUB_STEPS; ss++) {
			movementSystem(pd, this.dt);
			this.grid.reset();
			for (let i = 0; i < pd.count; i++) {
				if (pd.mask[i] & 3) {
					this.grid.add(i, pd.posX[i], pd.posY[i]);
				}
			}

			for (const key in this.grid.buckets) {
				const ids = this.grid.buckets[key];
				const entries = ids.map(id => ({
					id,
					minX: pd.posX[id] - (pd.mask[id] === 1 ? pd.radius[id] : pd.halfW[id]),
					maxX: pd.posX[id] + (pd.mask[id] === 1 ? pd.radius[id] : pd.halfW[id])
				}));
				entries.sort((a, b) => a.minX - b.minX);
				for (let i = 0; i < entries.length; i++) {
					for (let j = i + 1; j < entries.length && entries[j].minX <= entries[i].maxX; j++) {
						const A = entries[i].id, B = entries[j].id;
						const ma = pd.mask[A], mb = pd.mask[B];
						if (ma === 1 && mb === 1) {
							collideBallBall(pd, A, B);
						} else if (ma === 1 && mb === 2) {
							collideBallPaddle(pd, A, B);
						} else if (ma === 2 && mb === 1) {
							collideBallPaddle(pd, B, A);
						}
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
			vy: pd.velY[ent]
		}));
		const paddles = this.paddleEnts.map((ent, i) => ({
			id: i,
			x: pd.posX[ent],
			y: pd.posY[ent],
		}));
		return { balls, paddles, events: [] };
	}
}

