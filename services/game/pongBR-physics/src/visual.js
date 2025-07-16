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

// Debug data
let collisionLog = [];
const MAX_LOG_ENTRIES = 15;

// Physics setup
const NUM_PLAYERS = 100;
const NUM_BALLS = 200;
const engine = new PhysicsEngine();
engine.initBattleRoyale(NUM_PLAYERS, NUM_BALLS);

raylib.InitWindow(WIDTH, HEIGHT, "Paddle Physics Debugger");
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

	// Arena center point
	raylib.DrawCircle(arenaCenter.x, arenaCenter.y, 3, raylib.RED);

	// Player division lines (if debug enabled)
	if (showDebug) {
		const angleStep = (2 * Math.PI) / NUM_PLAYERS;
		const linesToShow = Math.min(NUM_PLAYERS, 20); // Limit visual clutter

		for (let i = 0; i < linesToShow; i++) {
			const angle = i * angleStep;
			const lineX = arenaCenter.x + Math.cos(angle) * arenaRadius;
			const lineY = arenaCenter.y + Math.sin(angle) * arenaRadius;
			raylib.DrawLine(arenaCenter.x, arenaCenter.y, lineX, lineY, raylib.DARKGRAY);
		}
	}
}

function drawPaddleSlice(paddleIndex) {
	const cfg = engine.cfg;
	const arenaCenter = toScreen(0, 0);
	const arenaRadius = cfg.ARENA_RADIUS * ZOOM;

	// Calculate slice boundaries
	const angleStep = (2 * Math.PI) / NUM_PLAYERS;
	const paddleCenterAngle = paddleIndex * angleStep;
	const arcWidth = angleStep * cfg.PADDLE_FILL;
	const startAngle = paddleCenterAngle - arcWidth / 2;
	const endAngle = paddleCenterAngle + arcWidth / 2;

	// Generate a color for this paddle (HSV to get nice spread of colors)
	const hue = (paddleIndex * 360 / NUM_PLAYERS) % 360;
	const color = raylib.ColorFromHSV(hue, 0.8, 0.9);
	const transparentColor = raylib.Color(color.r, color.g, color.b, 100);

	// Draw thick arc on the arena ring
	const segments = Math.max(8, Math.floor(arcWidth * 50));
	const innerRadius = arenaRadius - 15; // Inner edge of the ring
	const outerRadius = arenaRadius + 5;  // Outer edge of the ring

	for (let i = 0; i < segments; i++) {
		const angle1 = startAngle + (i / segments) * arcWidth;
		const angle2 = startAngle + ((i + 1) / segments) * arcWidth;

		// Calculate the 4 points of this segment
		const inner1X = arenaCenter.x + Math.cos(angle1) * innerRadius;
		const inner1Y = arenaCenter.y + Math.sin(angle1) * innerRadius;
		const outer1X = arenaCenter.x + Math.cos(angle1) * outerRadius;
		const outer1Y = arenaCenter.y + Math.sin(angle1) * outerRadius;

		const inner2X = arenaCenter.x + Math.cos(angle2) * innerRadius;
		const inner2Y = arenaCenter.y + Math.sin(angle2) * innerRadius;
		const outer2X = arenaCenter.x + Math.cos(angle2) * outerRadius;
		const outer2Y = arenaCenter.y + Math.sin(angle2) * outerRadius;

		// Draw the segment as a quad
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

		// Draw outline
		raylib.DrawLine(inner1X, inner1Y, inner2X, inner2Y, color);
		raylib.DrawLine(outer1X, outer1Y, outer2X, outer2Y, color);
	}

	// Draw slice boundaries
	const startInnerX = arenaCenter.x + Math.cos(startAngle) * innerRadius;
	const startInnerY = arenaCenter.y + Math.sin(startAngle) * innerRadius;
	const startOuterX = arenaCenter.x + Math.cos(startAngle) * outerRadius;
	const startOuterY = arenaCenter.y + Math.sin(startAngle) * outerRadius;

	const endInnerX = arenaCenter.x + Math.cos(endAngle) * innerRadius;
	const endInnerY = arenaCenter.y + Math.sin(endAngle) * innerRadius;
	const endOuterX = arenaCenter.x + Math.cos(endAngle) * outerRadius;
	const endOuterY = arenaCenter.y + Math.sin(endAngle) * outerRadius;

	raylib.DrawLine(startInnerX, startInnerY, startOuterX, startOuterY, color);
	raylib.DrawLine(endInnerX, endInnerY, endOuterX, endOuterY, color);
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

		// Draw ball ID (for all balls when enabled)
		if (showBallIDs) {
			drawText(`${i}`, pos.x + 5, pos.y - 10, 10, raylib.WHITE);
		}
	}
}

function drawPaddles(paddles) {
	for (let i = 0; i < paddles.length; i++) {
		const paddle = paddles[i];
		const pos = toScreen(paddle.x, paddle.y);

		// Calculate visual paddle dimensions
		const perim = 2 * Math.PI * engine.cfg.ARENA_RADIUS;
		const cellWidth = (perim / NUM_PLAYERS) * 0.25;
		const paddleWidth = cellWidth * ZOOM;
		const paddleHeight = paddleWidth * engine.cfg.PADDLE_RATIO;

		// Draw paddle rectangle (visual representation)
		raylib.DrawRectanglePro(
			{ x: pos.x, y: pos.y, width: paddleWidth, height: paddleHeight },
			{ x: paddleWidth / 2, y: paddleHeight / 2 },
			paddle.rot * (180 / Math.PI),
			raylib.BLUE
		);

		// Draw paddle slice (collision area) - for all paddles when enabled
		if (showPaddleSlices) {
			drawPaddleSlice(i);
		}

		// Draw paddle ID (for all paddles when enabled)
		if (showPaddleIDs) {
			drawText(`P${i}`, pos.x + 15, pos.y - 15, 12, raylib.WHITE);
		}
	}
}

function drawCollisionDebug(balls) {
	if (!showCollisionLog) return;

	const cfg = engine.cfg;
	let activeCollisions = 0;

	// Check for balls near boundary
	for (let i = 0; i < Math.min(balls.length, 50); i++) { // Limit checks for performance
		const ball = balls[i];
		const distFromCenter = Math.sqrt(ball.x * ball.x + ball.y * ball.y);
		const ballRadius = ball.radius;

		// Check if ball is near or at boundary
		if (distFromCenter >= cfg.ARENA_RADIUS - ballRadius * 2) {
			const pos = toScreen(ball.x, ball.y);
			const atBoundary = distFromCenter >= cfg.ARENA_RADIUS - ballRadius;

			// Draw distance indicator
			const color = atBoundary ? raylib.GREEN : raylib.YELLOW;
			raylib.DrawCircle(pos.x, pos.y, 8, raylib.Color(color.r, color.g, color.b, 100));

			if (atBoundary) {
				activeCollisions++;
				logEvent(`Ball ${i} at boundary (${distFromCenter.toFixed(1)}/${cfg.ARENA_RADIUS})`, raylib.GREEN);
			}
		}
	}

	// Limit log spam
	if (activeCollisions === 0 && Math.random() < 0.98) return; // Only log occasionally when no collisions
}

function drawUI() {
	const cfg = engine.cfg;

	// Background for UI
	raylib.DrawRectangle(10, 10, 400, HEIGHT - 20, raylib.Color(0, 0, 0, 150));

	let yOffset = 20;
	const lineHeight = 22;

	// Title
	drawText("=== PADDLE PHYSICS DEBUGGER ===", 20, yOffset, 20, raylib.YELLOW);
	yOffset += lineHeight * 1.5;

	// Stats
	drawText(`Players: ${NUM_PLAYERS} | Balls: ${engine.ballEnts.length}`, 20, yOffset, 14);
	yOffset += lineHeight;

	drawText(`Paddle Fill: ${cfg.PADDLE_FILL} (${((cfg.PADDLE_FILL / NUM_PLAYERS) * 360).toFixed(1)}° per paddle)`, 20, yOffset, 14);
	yOffset += lineHeight;

	drawText(`Ball Radius: ${cfg.BALL_RADIUS} | Arena: ${cfg.ARENA_RADIUS}`, 20, yOffset, 14);
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
		"R: Reset Simulation",
		"Arrows: Move Camera",
		"I/O: Zoom In/Out"
	];

	controls.forEach(control => {
		drawText(control, 20, yOffset, 12, raylib.LIGHTGRAY);
		yOffset += lineHeight * 0.8;
	});

	// Collision log
	if (showCollisionLog && collisionLog.length > 0) {
		yOffset += 10;
		drawText("=== COLLISION LOG ===", 20, yOffset, 14, raylib.YELLOW);
		yOffset += lineHeight;

		const recentLogs = collisionLog.slice(-8);
		recentLogs.forEach(log => {
			drawText(log.message, 20, yOffset, 11, log.color);
			yOffset += lineHeight * 0.7;
		});
	}

	// Camera info (bottom right)
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

	// Reset simulation
	if (raylib.IsKeyPressed(raylib.KEY_R)) {
		engine.pd.count = 0;
		engine.paddleEnts = [];
		engine.ballEnts = [];
		engine.initBattleRoyale(NUM_PLAYERS, NUM_BALLS);
		camX = 0;
		camY = 0;
		collisionLog = [];
		console.log(`Simulation reset! Players: ${NUM_PLAYERS}, Balls: ${NUM_BALLS}`);
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
	ZOOM = Math.max(0.5, Math.min(ZOOM, 10)); // Clamp zoom
}

// === MAIN LOOP ===

while (!raylib.WindowShouldClose()) {
	handleInput();

	// Step simulation
	if (!paused) {
		engine.step();
	}

	const { balls, paddles } = engine.getState();

	raylib.BeginDrawing();
	raylib.ClearBackground(raylib.BLACK);

	// Draw game world
	drawArena();
	drawBalls(balls);
	drawPaddles(paddles);

	// Debug visualization
	if (showCollisionLog) {
		drawCollisionDebug(balls);
	}

	// UI overlay
	drawUI();

	raylib.EndDrawing();
}

raylib.CloseWindow();
