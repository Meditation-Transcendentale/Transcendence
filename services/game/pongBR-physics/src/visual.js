import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const raylib = require('raylib');
import { PhysicsEngine } from './physicsEngine.js';

const WIDTH = 1920;
const HEIGHT = 1080;
const CENTER = { x: WIDTH / 2, y: HEIGHT / 2 };

// Camera and UI state
let ZOOM = 2.0;
let camX = 0;
let camY = 0;
let paused = false;

// Debug visualization toggles
let showDebug = true;
let showPaddleSlices = true;
let showVelocities = false;
let showCollisionLog = false;
let showBallIDs = false;
let showPaddleIDs = false;
let showPillars = true;
let showPillarIDs = false;
let showEliminatedPlayers = true;
let showPhaseInfo = true;
let showPaddleSizes = true; // New: Show actual paddle sizes

// Debug data
let collisionLog = [];
const MAX_LOG_ENTRIES = 15;
let lastGameTick = 0;

// Physics setup
const NUM_PLAYERS = 100;
const NUM_BALLS = 200;
const engine = new PhysicsEngine();
engine.initBattleRoyale(NUM_PLAYERS, NUM_BALLS);

raylib.InitWindow(WIDTH, HEIGHT, "Battle Royale Physics Debugger");
raylib.SetTargetFPS(60);

// === UTILITY FUNCTIONS ===

function toScreen(x, y) {
	return {
		x: (CENTER.x + (x - camX) * ZOOM),
		y: (CENTER.y + (y - camY) * ZOOM)
	};
}

function drawText(text, x, y, size = 16, color = raylib.WHITE) {
	raylib.DrawText(text, x, y, size, color);
}

function logEvent(message, color = raylib.WHITE) {
	collisionLog.push({ message, color, time: Date.now() });
	if (collisionLog.length > MAX_LOG_ENTRIES) {
		collisionLog.shift();
	}
}

// === VISUALIZATION FUNCTIONS ===

function drawArena() {
	const arenaCenter = toScreen(0, 0);
	const arenaRadius = engine.cfg.ARENA_RADIUS * ZOOM;

	// Arena boundary
	raylib.DrawCircleLines(arenaCenter.x, arenaCenter.y, arenaRadius, raylib.WHITE);

	// Goal detection boundary
	const goalRadius = (engine.cfg.ARENA_RADIUS + engine.cfg.GOAL_DETECTION_MARGIN) * ZOOM;
	raylib.DrawCircleLines(arenaCenter.x, arenaCenter.y, goalRadius, raylib.Color(255, 255, 0, 100));

	// Arena center point
	raylib.DrawCircle(arenaCenter.x, arenaCenter.y, 3, raylib.RED);

	// Player division lines (if debug enabled)
	if (showDebug) {
		const numActivePlayers = engine.playerStates.activePlayers.size;
		const totalPaddles = engine.entities.paddles.length;

		// Show current player divisions
		if (numActivePlayers > 0 && totalPaddles > 0) {
			const angleStep = (2 * Math.PI) / totalPaddles;
			for (let i = 0; i < Math.min(totalPaddles, 32); i++) {
				const angle = i * angleStep;
				const lineX = arenaCenter.x + Math.cos(angle) * arenaRadius;
				const lineY = arenaCenter.y + Math.sin(angle) * arenaRadius;
				raylib.DrawLine(arenaCenter.x, arenaCenter.y, lineX, lineY, raylib.Color(128, 128, 128, 100));
			}
		}
	}
}

function drawPaddleSlice(paddleIndex, centerAngle, offset, isEliminated = false) {
	const cfg = engine.cfg;
	const arenaCenter = toScreen(0, 0);
	const arenaRadius = cfg.ARENA_RADIUS * ZOOM;

	if (centerAngle === undefined || centerAngle === null) return;

	// Get current paddle angle
	const currentAngle = centerAngle + (offset || 0);

	// Calculate arc width - after rebuild, all paddles are active
	const numPaddles = engine.entities.paddles.length;
	const angleStep = (2 * Math.PI) / numPaddles;
	const arcWidth = angleStep * cfg.PADDLE_FILL;

	const startAngle = currentAngle - arcWidth / 2;
	const endAngle = currentAngle + arcWidth / 2;

	// Generate color
	const hue = (paddleIndex * 360 / Math.max(NUM_PLAYERS, numPaddles)) % 360;
	const saturation = isEliminated ? 0.3 : 0.8;
	const value = isEliminated ? 0.4 : 0.9;
	const color = raylib.ColorFromHSV(hue, saturation, value);
	const alpha = isEliminated ? 50 : 100;
	const transparentColor = raylib.Color(color.r, color.g, color.b, alpha);

	// Draw arc
	const segments = Math.max(8, Math.floor(arcWidth * 50));
	const innerRadius = arenaRadius - 15;
	const outerRadius = arenaRadius + 5;

	for (let i = 0; i < segments; i++) {
		const angle1 = startAngle + (i / segments) * arcWidth;
		const angle2 = startAngle + ((i + 1) / segments) * arcWidth;

		const inner1X = arenaCenter.x + Math.cos(angle1) * innerRadius;
		const inner1Y = arenaCenter.y + Math.sin(angle1) * innerRadius;
		const outer1X = arenaCenter.x + Math.cos(angle1) * outerRadius;
		const outer1Y = arenaCenter.y + Math.sin(angle1) * outerRadius;

		const inner2X = arenaCenter.x + Math.cos(angle2) * innerRadius;
		const inner2Y = arenaCenter.y + Math.sin(angle2) * innerRadius;
		const outer2X = arenaCenter.x + Math.cos(angle2) * outerRadius;
		const outer2Y = arenaCenter.y + Math.sin(angle2) * outerRadius;

		raylib.DrawTriangle(
			{ x: inner1X, y: inner1Y },
			{ x: outer1X, y: outer1Y },
			{ x: inner2X, y: inner2Y },
			transparentColor
		);
		raylib.DrawTriangle(
			{ x: outer1X, y: outer1Y },
			{ x: outer2X, y: outer2Y },
			{ x: inner2X, y: inner2Y },
			transparentColor
		);
	}
}

function drawBalls(balls) {
	for (let i = 0; i < balls.length; i++) {
		const ball = balls[i];
		const pos = toScreen(ball.x, ball.y);
		const ballRadius = Math.max(2, ball.radius * ZOOM);

		// Draw ball
		raylib.DrawCircle(pos.x, pos.y, ballRadius, raylib.RED);

		// Draw velocity vector
		if (showVelocities) {
			const velScale = 0.05;
			const velEndX = pos.x + ball.vx * velScale * ZOOM;
			const velEndY = pos.y + ball.vy * velScale * ZOOM;
			raylib.DrawLine(pos.x, pos.y, velEndX, velEndY, raylib.BLUE);
		}

		// Draw ball ID
		if (showBallIDs) {
			drawText(`${ball.id}`, pos.x + 5, pos.y - 10, 10, raylib.WHITE);
		}
	}
}

function drawPaddles(paddles) {
	for (let i = 0; i < paddles.length; i++) {
		const paddle = paddles[i];
		const paddleEnt = engine.entities.paddles[i];

		if (!paddleEnt || !engine.pd.isActive(paddleEnt)) continue;

		// Get paddle data from physics engine
		const x = engine.pd.posX[paddleEnt];
		const y = engine.pd.posY[paddleEnt];
		const rot = engine.pd.rot[paddleEnt];
		const halfW = engine.pd.halfW[paddleEnt];
		const halfH = engine.pd.halfH[paddleEnt];

		const pos = toScreen(x, y);
		const paddleWidth = halfW * 2 * ZOOM;
		const paddleHeight = halfH * 2 * ZOOM;
		const rotationDegrees = rot * (180 / Math.PI);

		// Determine if paddle is eliminated (dead)
		const isEliminated = paddle.dead;
		const paddleColor = isEliminated ? raylib.GRAY : raylib.BLUE;

		// Draw paddle rectangle with actual physics dimensions
		raylib.DrawRectanglePro(
			{ x: pos.x, y: pos.y, width: paddleWidth, height: paddleHeight },
			{ x: paddleWidth / 2, y: paddleHeight / 2 },
			rotationDegrees,
			paddleColor
		);

		// Draw paddle slice when enabled
		if (showPaddleSlices && i < engine.paddleData.centerAngles.length) {
			const centerAngle = engine.paddleData.centerAngles[i];
			const offset = engine.paddleData.offsets[i] || 0;
			drawPaddleSlice(i, centerAngle, offset, isEliminated);
		}

		// Draw paddle size info
		if (showPaddleSizes) {
			const sizeText = `${(halfW * 2).toFixed(1)}x${(halfH * 2).toFixed(1)}`;
			drawText(sizeText, pos.x + 15, pos.y - 25, 10, raylib.CYAN);
		}

		// Draw paddle ID and status
		if (showPaddleIDs) {
			// Map to original player ID if after rebuild
			let displayId = i;
			if (engine.playerMapping && Object.keys(engine.playerMapping).length > 0) {
				const reverseMapping = Object.entries(engine.playerMapping).find(([origId, newIdx]) => newIdx === i);
				displayId = reverseMapping ? parseInt(reverseMapping[0]) : i;
			}

			const status = isEliminated ? "DEAD" : "ALIVE";
			const textColor = isEliminated ? raylib.RED : raylib.WHITE;
			drawText(`P${displayId} ${status}`, pos.x + 15, pos.y - 15, 12, textColor);

			// Show move input
			const move = paddle.move || 0;
			if (move !== 0) {
				const moveText = move > 0 ? "→" : "←";
				drawText(moveText, pos.x - 25, pos.y, 14, raylib.YELLOW);
			}
		}
	}
}

function drawPillars(state) {
	if (!showPillars) return;

	// Get pillars from engine directly
	const pillars = [];
	for (let i = 0; i < engine.entities.pillars.length; i++) {
		const pillarEnt = engine.entities.pillars[i];
		if (pillarEnt !== undefined && engine.pd.isActive(pillarEnt)) {
			pillars.push({
				id: i,
				x: engine.pd.posX[pillarEnt],
				y: engine.pd.posY[pillarEnt],
				rot: engine.pd.rot[pillarEnt],
				radius: engine.pd.radius[pillarEnt],
				halfW: engine.pd.halfW[pillarEnt],
				halfH: engine.pd.halfH[pillarEnt],
				isEliminated: engine.pd.isEliminated[pillarEnt]
			});
		}
	}

	for (let i = 0; i < pillars.length; i++) {
		const pillar = pillars[i];
		const pos = toScreen(pillar.x, pillar.y);

		const pillarWidth = Math.max(6, pillar.halfW * 2 * ZOOM);
		const pillarHeight = Math.max(6, pillar.halfH * 2 * ZOOM);
		const rotationDegrees = pillar.rot * (180 / Math.PI);

		// Color based on elimination status
		const pillarColor = pillar.isEliminated ? raylib.Color(128, 0, 128, 100) : raylib.PURPLE;

		// Draw pillar
		raylib.DrawRectanglePro(
			{ x: pos.x, y: pos.y, width: pillarWidth, height: pillarHeight },
			{ x: pillarWidth / 2, y: pillarHeight / 2 },
			rotationDegrees,
			pillarColor
		);

		// Draw pillar outline
		const halfW = pillarWidth / 2;
		const halfH = pillarHeight / 2;
		const cos = Math.cos(pillar.rot);
		const sin = Math.sin(pillar.rot);

		const corners = [
			{ x: -halfW, y: -halfH },
			{ x: halfW, y: -halfH },
			{ x: halfW, y: halfH },
			{ x: -halfW, y: halfH }
		];

		const worldCorners = corners.map(corner => ({
			x: pos.x + (corner.x * cos - corner.y * sin),
			y: pos.y + (corner.x * sin + corner.y * cos)
		}));

		const outlineColor = pillar.isEliminated ? raylib.Color(255, 0, 255, 100) : raylib.MAGENTA;
		for (let j = 0; j < 4; j++) {
			const start = worldCorners[j];
			const end = worldCorners[(j + 1) % 4];
			raylib.DrawLine(start.x, start.y, end.x, end.y, outlineColor);
		}

		// Draw collision radius
		const pillarRadius = pillar.radius * ZOOM;
		raylib.DrawCircleLines(pos.x, pos.y, pillarRadius, raylib.Color(255, 0, 255, 80));

		// Draw pillar ID
		if (showPillarIDs) {
			const statusText = pillar.isEliminated ? " (DEAD)" : "";
			drawText(`PL${i}${statusText}`, pos.x + pillarWidth / 2 + 5, pos.y - 10, 10, raylib.MAGENTA);
		}
	}
}

function drawPhaseInfo() {
	if (!showPhaseInfo) return;

	const state = engine.getState();
	const gameState = state.gameState;

	// Phase info box
	const boxX = WIDTH - 350;
	const boxY = 10;
	const boxW = 330;
	const boxH = 280;

	raylib.DrawRectangle(boxX, boxY, boxW, boxH, raylib.Color(0, 0, 0, 150));
	raylib.DrawRectangleLines(boxX, boxY, boxW, boxH, raylib.YELLOW);

	let yOffset = boxY + 10;
	const lineHeight = 18;

	// Phase title
	drawText("=== BATTLE ROYALE STATUS ===", boxX + 10, yOffset, 14, raylib.YELLOW);
	yOffset += lineHeight * 1.5;

	// Current phase
	drawText(`Phase: ${gameState.currentPhase}`, boxX + 10, yOffset, 14, raylib.WHITE);
	yOffset += lineHeight;

	// Player counts
	const activeCount = gameState.activePlayers.length;
	const eliminatedCount = gameState.eliminatedPlayers.length;
	const totalCount = engine.originalPlayerCount || NUM_PLAYERS;

	drawText(`Active Players: ${activeCount}/${totalCount}`, boxX + 10, yOffset, 12, raylib.GREEN);
	yOffset += lineHeight;

	drawText(`Eliminated: ${eliminatedCount}`, boxX + 10, yOffset, 12, raylib.RED);
	yOffset += lineHeight;

	// Paddle count vs player count
	const paddleCount = engine.entities.paddles.length;
	drawText(`Paddles in Arena: ${paddleCount}`, boxX + 10, yOffset, 12, raylib.CYAN);
	yOffset += lineHeight;

	// Phase sizing info
	const phaseConfig = engine.getPhaseConfig();
	const phasePaddleSize = engine.getPhasePaddleSize();
	drawText(`Phase Target: ${phaseConfig.playerCount} players`, boxX + 10, yOffset, 12, raylib.LIGHTGRAY);
	yOffset += lineHeight;
	drawText(`Phase Paddle Size: ${phasePaddleSize.toFixed(1)}`, boxX + 10, yOffset, 12, raylib.LIGHTGRAY);
	yOffset += lineHeight;

	// Rebuild status
	if (gameState.isRebuilding) {
		const timeLeft = Math.ceil(gameState.rebuildTimeRemaining / 1000);
		drawText(`REBUILDING... ${timeLeft}s`, boxX + 10, yOffset, 12, raylib.ORANGE);
		yOffset += lineHeight;
	}

	// Player mapping info
	if (gameState.playerMapping && Object.keys(gameState.playerMapping).length > 0) {
		drawText("Player Remapping Active", boxX + 10, yOffset, 12, raylib.ORANGE);
		yOffset += lineHeight;

		// Show first few mappings
		const mappings = Object.entries(gameState.playerMapping).slice(0, 3);
		mappings.forEach(([origId, newIdx]) => {
			drawText(`  P${origId} → Slot${newIdx}`, boxX + 10, yOffset, 10, raylib.LIGHTGRAY);
			yOffset += lineHeight * 0.8;
		});

		if (Object.keys(gameState.playerMapping).length > 3) {
			drawText(`  ... and ${Object.keys(gameState.playerMapping).length - 3} more`, boxX + 10, yOffset, 10, raylib.LIGHTGRAY);
			yOffset += lineHeight * 0.8;
		}
	}

	// Game over status
	if (gameState.isGameOver) {
		const winner = gameState.winner;
		const winText = winner !== null ? `Winner: Player ${winner}` : "No Winner";
		drawText(`GAME OVER: ${winText}`, boxX + 10, yOffset, 12, raylib.GOLD);
		yOffset += lineHeight;
	}

	// Stage info
	if (state.stage) {
		drawText(`Stage: ${state.stage}`, boxX + 10, yOffset, 12, raylib.CYAN);
		yOffset += lineHeight;
	}

	// Performance stats
	if (state.frameStats) {
		yOffset += 5;
		drawText("=== PERFORMANCE ===", boxX + 10, yOffset, 12, raylib.YELLOW);
		yOffset += lineHeight;

		const stats = state.frameStats;
		drawText(`Entities: ${engine.pd.count}`, boxX + 10, yOffset, 10, raylib.WHITE);
		yOffset += lineHeight * 0.8;
		drawText(`Free: ${engine.pd.freeList.length}`, boxX + 10, yOffset, 10, raylib.WHITE);
		yOffset += lineHeight * 0.8;
		drawText(`Grid Buckets: ${engine.ballGrid.buckets.size}`, boxX + 10, yOffset, 10, raylib.WHITE);
	}
}

function drawCollisionDebug(balls, state) {
	if (!showCollisionLog) return;

	const cfg = engine.cfg;

	// Check balls near arena boundary
	for (let i = 0; i < Math.min(balls.length, 20); i++) {
		const ball = balls[i];
		const distFromCenter = Math.sqrt(ball.x * ball.x + ball.y * ball.y);

		if (distFromCenter >= cfg.ARENA_RADIUS - ball.radius * 2) {
			const pos = toScreen(ball.x, ball.y);
			const atBoundary = distFromCenter >= cfg.ARENA_RADIUS - ball.radius;
			const inGoal = distFromCenter > cfg.ARENA_RADIUS + cfg.GOAL_DETECTION_MARGIN;

			let color = raylib.YELLOW;
			if (inGoal) color = raylib.RED;
			else if (atBoundary) color = raylib.GREEN;

			raylib.DrawCircle(pos.x, pos.y, 8, raylib.Color(color.r, color.g, color.b, 100));

			if (inGoal) {
				logEvent(`Ball ${i} in GOAL area (${distFromCenter.toFixed(1)})`, raylib.RED);
			} else if (atBoundary) {
				logEvent(`Ball ${i} at boundary (${distFromCenter.toFixed(1)})`, raylib.GREEN);
			}
		}
	}
}

function drawUI() {
	const cfg = engine.cfg;
	const state = engine.getState();

	// Background for UI
	raylib.DrawRectangle(10, 10, 500, HEIGHT - 20, raylib.Color(0, 0, 0, 150));

	let yOffset = 20;
	const lineHeight = 22;

	// Title
	drawText("=== BATTLE ROYALE DEBUGGER ===", 20, yOffset, 20, raylib.YELLOW);
	yOffset += lineHeight * 1.5;

	// Stats
	drawText(`Total Players: ${NUM_PLAYERS} | Active: ${engine.playerStates.activePlayers.size}`, 20, yOffset, 14);
	yOffset += lineHeight;

	drawText(`Balls: ${state.balls.length} | Paddles: ${engine.entities.paddles.length}`, 20, yOffset, 14);
	yOffset += lineHeight;

	drawText(`Arena: ${cfg.ARENA_RADIUS} | Ball Radius: ${cfg.BALL_RADIUS}`, 20, yOffset, 14);
	yOffset += lineHeight;

	const status = paused ? "PAUSED" : "RUNNING";
	const statusColor = paused ? raylib.RED : raylib.GREEN;
	drawText(`Status: ${status}`, 20, yOffset, 16, statusColor);
	yOffset += lineHeight * 1.5;

	// Controls
	drawText("=== CONTROLS ===", 20, yOffset, 16, raylib.CYAN);
	yOffset += lineHeight;

	const controls = [
		"SPACE: Pause/Resume",
		"D: Toggle Debug Info",
		"S: Toggle Paddle Slices",
		"V: Toggle Velocities",
		"C: Toggle Collision Debug",
		"B: Toggle Ball IDs",
		"P: Toggle Paddle IDs",
		"L: Toggle Pillars",
		"K: Toggle Pillar IDs",
		"E: Toggle Eliminated Players",
		"F: Toggle Phase Info",
		"Z: Toggle Paddle Sizes",
		"R: Reset Simulation",
		"T: Test Elimination",
		"1-5: Force Phase Transition",
		"Arrows: Move Camera",
		"I/O: Zoom In/Out"
	];

	controls.forEach(control => {
		drawText(control, 20, yOffset, 12, raylib.LIGHTGRAY);
		yOffset += lineHeight * 0.8;
	});

	// Toggle status
	yOffset += 10;
	drawText("=== TOGGLE STATUS ===", 20, yOffset, 14, raylib.CYAN);
	yOffset += lineHeight;

	const toggles = [
		{ name: "Debug Info", active: showDebug },
		{ name: "Paddle Slices", active: showPaddleSlices },
		{ name: "Velocities", active: showVelocities },
		{ name: "Collision Log", active: showCollisionLog },
		{ name: "Ball IDs", active: showBallIDs },
		{ name: "Paddle IDs", active: showPaddleIDs },
		{ name: "Pillars", active: showPillars },
		{ name: "Pillar IDs", active: showPillarIDs },
		{ name: "Eliminated", active: showEliminatedPlayers },
		{ name: "Phase Info", active: showPhaseInfo },
		{ name: "Paddle Sizes", active: showPaddleSizes }
	];

	toggles.forEach(toggle => {
		const color = toggle.active ? raylib.GREEN : raylib.RED;
		const status = toggle.active ? "ON" : "OFF";
		drawText(`${toggle.name}: ${status}`, 20, yOffset, 11, color);
		yOffset += lineHeight * 0.7;
	});

	// Event log
	if (showCollisionLog && collisionLog.length > 0) {
		yOffset += 10;
		drawText("=== EVENT LOG ===", 20, yOffset, 14, raylib.YELLOW);
		yOffset += lineHeight;

		const recentLogs = collisionLog.slice(-8);
		recentLogs.forEach(log => {
			drawText(log.message, 20, yOffset, 10, log.color);
			yOffset += lineHeight * 0.6;
		});
	}

	// Camera info
	drawText(`Zoom: ${ZOOM.toFixed(1)}x`, WIDTH - 150, HEIGHT - 60, 14);
	drawText(`Camera: (${camX.toFixed(0)}, ${camY.toFixed(0)})`, WIDTH - 150, HEIGHT - 40, 14);
}

// === INPUT HANDLING ===

function handleInput() {
	// Toggle controls
	if (raylib.IsKeyPressed(raylib.KEY_SPACE)) paused = !paused;
	if (raylib.IsKeyPressed(raylib.KEY_D)) showDebug = !showDebug;
	if (raylib.IsKeyPressed(raylib.KEY_S)) showPaddleSlices = !showPaddleSlices;
	if (raylib.IsKeyPressed(raylib.KEY_V)) showVelocities = !showVelocities;
	if (raylib.IsKeyPressed(raylib.KEY_C)) showCollisionLog = !showCollisionLog;
	if (raylib.IsKeyPressed(raylib.KEY_B)) showBallIDs = !showBallIDs;
	if (raylib.IsKeyPressed(raylib.KEY_P)) showPaddleIDs = !showPaddleIDs;
	if (raylib.IsKeyPressed(raylib.KEY_L)) showPillars = !showPillars;
	if (raylib.IsKeyPressed(raylib.KEY_K)) showPillarIDs = !showPillarIDs;
	if (raylib.IsKeyPressed(raylib.KEY_E)) showEliminatedPlayers = !showEliminatedPlayers;
	if (raylib.IsKeyPressed(raylib.KEY_F)) showPhaseInfo = !showPhaseInfo;
	if (raylib.IsKeyPressed(raylib.KEY_Z)) showPaddleSizes = !showPaddleSizes;

	// Force phase transitions for testing
	if (raylib.IsKeyPressed(raylib.KEY_ONE)) {
		engine.currentPhase = 'Phase 1';
		engine.startArenaRebuild();
		logEvent("Forced Phase 1 transition", raylib.CYAN);
	}
	if (raylib.IsKeyPressed(raylib.KEY_TWO)) {
		engine.currentPhase = 'Phase 2';
		engine.startArenaRebuild();
		logEvent("Forced Phase 2 transition", raylib.CYAN);
	}
	if (raylib.IsKeyPressed(raylib.KEY_THREE)) {
		engine.currentPhase = 'Phase 3';
		engine.startArenaRebuild();
		logEvent("Forced Phase 3 transition", raylib.CYAN);
	}
	if (raylib.IsKeyPressed(raylib.KEY_FOUR)) {
		engine.currentPhase = 'Phase 4';
		engine.startArenaRebuild();
		logEvent("Forced Phase 4 transition", raylib.CYAN);
	}
	if (raylib.IsKeyPressed(raylib.KEY_FIVE)) {
		engine.currentPhase = 'Final Phase';
		engine.startArenaRebuild();
		logEvent("Forced Final Phase transition", raylib.CYAN);
	}

	// Test elimination (eliminate a random active player)
	if (raylib.IsKeyPressed(raylib.KEY_T)) {
		const activePlayers = Array.from(engine.playerStates.activePlayers);
		if (activePlayers.length > 1) {
			const randomPlayer = activePlayers[Math.floor(Math.random() * activePlayers.length)];
			const randomBall = Math.floor(Math.random() * engine.entities.balls.length);
			engine.eliminatePlayer(randomPlayer, randomBall);
			logEvent(`TEST: Eliminated Player ${randomPlayer}`, raylib.ORANGE);
		}
	}

	// Reset simulation
	if (raylib.IsKeyPressed(raylib.KEY_R)) {
		engine.resetGame();
		engine.initBattleRoyale(NUM_PLAYERS, NUM_BALLS);
		camX = 0;
		camY = 0;
		collisionLog = [];
		logEvent("Simulation reset!", raylib.GREEN);
	}

	// Camera controls
	const camSpeed = 10 / ZOOM;
	if (raylib.IsKeyDown(raylib.KEY_RIGHT)) camX += camSpeed;
	if (raylib.IsKeyDown(raylib.KEY_LEFT)) camX -= camSpeed;
	if (raylib.IsKeyDown(raylib.KEY_UP)) camY -= camSpeed;
	if (raylib.IsKeyDown(raylib.KEY_DOWN)) camY += camSpeed;

	// Zoom controls
	if (raylib.IsKeyDown(raylib.KEY_I)) ZOOM *= 1.02;
	if (raylib.IsKeyDown(raylib.KEY_O)) ZOOM *= 0.98;
	ZOOM = Math.max(0.5, Math.min(ZOOM, 10));
}

// === MAIN LOOP ===

while (!raylib.WindowShouldClose()) {
	handleInput();

	// Step simulation
	if (!paused) {
		const state = engine.step();
		lastGameTick++;

		// Log events from physics engine
		if (state.events) {
			state.events.forEach(event => {
				let color = raylib.WHITE;
				let message = `${event.type}`;

				switch (event.type) {
					case 'PLAYER_ELIMINATED':
						color = raylib.RED;
						message = `Player ${event.playerId} eliminated! ${event.remainingPlayers} left`;
						break;
					case 'PHASE_TRANSITION':
						color = raylib.YELLOW;
						message = `${event.phase} - ${event.remainingPlayers} players`;
						break;
					case 'ARENA_REBUILD_START':
						color = raylib.ORANGE;
						message = `Arena rebuild started for ${event.phase}`;
						break;
					case 'ARENA_REBUILD_COMPLETE':
						color = raylib.GREEN;
						message = `Arena rebuild complete - ${event.activePlayers.length} active`;
						break;
					case 'GAME_END':
						color = raylib.GOLD;
						message = event.winner ? `Winner: Player ${event.winner}!` : 'Game Over - No winner';
						break;
				}
				logEvent(message, color);
			});
		}
	}

	const state = engine.getState();

	raylib.BeginDrawing();
	raylib.ClearBackground(raylib.BLACK);

	// Draw game world
	drawArena();
	drawBalls(state.balls);
	drawPaddles(state.paddles);
	drawPillars(state);

	// Debug visualization
	if (showCollisionLog) {
		drawCollisionDebug(state.balls, state);
	}

	// UI overlays
	drawUI();
	drawPhaseInfo();

	raylib.EndDrawing();
}

raylib.CloseWindow();
