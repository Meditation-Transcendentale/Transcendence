import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const raylib = require('raylib');
import { PhysicsEngine } from './physicsEngine.js';

const WIDTH = 1920;
const HEIGHT = 1080;
const CENTER = { x: WIDTH / 2, y: HEIGHT / 2 };

// Simple state
let ZOOM = 2.0;
let camX = 0;
let camY = 0;
let paused = false;

// Event log for key events only
let eventLog = [];
const MAX_EVENTS = 8;

// Physics setup
const NUM_PLAYERS = 100; // Smaller for easier visualization
const NUM_BALLS = 200;
const engine = new PhysicsEngine();
engine.initBattleRoyale(NUM_PLAYERS, NUM_BALLS);

raylib.InitWindow(WIDTH, HEIGHT, "Phase Transition Debugger");
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
	eventLog.push({ message, color, time: Date.now() });
	if (eventLog.length > MAX_EVENTS) {
		eventLog.shift();
	}
}

// === DRAWING FUNCTIONS ===

function drawArena() {
	const arenaCenter = toScreen(0, 0);
	const arenaRadius = engine.cfg.ARENA_RADIUS * ZOOM;

	// Arena boundary
	raylib.DrawCircleLines(arenaCenter.x, arenaCenter.y, arenaRadius, raylib.WHITE);

	// Center point
	raylib.DrawCircle(arenaCenter.x, arenaCenter.y, 3, raylib.RED);
}

function drawBalls(balls) {
	for (const ball of balls) {
		const pos = toScreen(ball.x, ball.y);
		const ballRadius = Math.max(2, ball.radius * ZOOM);
		raylib.DrawCircle(pos.x, pos.y, ballRadius, raylib.RED);
	}
}

function drawPillars() {
	// Get pillars from engine directly
	for (let i = 0; i < engine.entities.pillars.length; i++) {
		const pillarEnt = engine.entities.pillars[i];
		if (pillarEnt === undefined || !engine.pd.isActive(pillarEnt)) continue;

		const x = engine.pd.posX[pillarEnt];
		const y = engine.pd.posY[pillarEnt];
		const rot = engine.pd.rot[pillarEnt];
		const halfW = engine.pd.halfW[pillarEnt];
		const halfH = engine.pd.halfH[pillarEnt];
		const isEliminated = engine.pd.isEliminated[pillarEnt];

		const pos = toScreen(x, y);
		const pillarWidth = Math.max(4, halfW * 2 * ZOOM);
		const pillarHeight = Math.max(4, halfH * 2 * ZOOM);
		const rotationDegrees = rot * (180 / Math.PI);

		// Color: purple for active, dark gray for eliminated
		const pillarColor = isEliminated ? raylib.DARKGRAY : raylib.PURPLE;

		// Draw pillar
		raylib.DrawRectanglePro(
			{ x: pos.x, y: pos.y, width: pillarWidth, height: pillarHeight },
			{ x: pillarWidth / 2, y: pillarHeight / 2 },
			rotationDegrees,
			pillarColor
		);

		// Simple outline
		const outlineColor = isEliminated ? raylib.GRAY : raylib.MAGENTA;
		raylib.DrawRectangleLinesEx(
			{ x: pos.x - pillarWidth / 2, y: pos.y - pillarHeight / 2, width: pillarWidth, height: pillarHeight },
			1,
			outlineColor
		);
	}
}

function drawPaddles(paddles) {
	for (let i = 0; i < paddles.length; i++) {
		const paddle = paddles[i];
		const paddleEnt = engine.entities.paddles[i];

		if (!paddleEnt || !engine.pd.isActive(paddleEnt)) continue;

		// Get actual paddle data from physics
		const x = engine.pd.posX[paddleEnt];
		const y = engine.pd.posY[paddleEnt];
		const rot = engine.pd.rot[paddleEnt];
		const halfW = engine.pd.halfW[paddleEnt];
		const halfH = engine.pd.halfH[paddleEnt];

		const pos = toScreen(x, y);
		const paddleWidth = halfW * 2 * ZOOM;
		const paddleHeight = halfH * 2 * ZOOM;
		const rotationDegrees = rot * (180 / Math.PI);

		// Color based on status: Blue=alive, Gray=dead
		const paddleColor = paddle.dead ? raylib.GRAY : raylib.BLUE;

		// Draw paddle
		raylib.DrawRectanglePro(
			{ x: pos.x, y: pos.y, width: paddleWidth, height: paddleHeight },
			{ x: paddleWidth / 2, y: paddleHeight / 2 },
			rotationDegrees,
			paddleColor
		);

		// Simple status indicator
		const statusColor = paddle.dead ? raylib.RED : raylib.GREEN;
		raylib.DrawCircle(pos.x - 20, pos.y, 5, statusColor);

		// Show player ID and paddle size
		drawText(`P${i}`, pos.x + 15, pos.y - 15, 12, raylib.WHITE);
		drawText(`${(halfW * 2).toFixed(0)}`, pos.x + 15, pos.y, 10, raylib.CYAN);
	}
}

function drawPhaseInfo() {
	const state = engine.getState();
	const gameState = state.gameState;

	// Simple info box
	const boxX = WIDTH - 300;
	const boxY = 10;
	const boxW = 280;
	const boxH = 150;

	raylib.DrawRectangle(boxX, boxY, boxW, boxH, raylib.Color(0, 0, 0, 180));
	raylib.DrawRectangleLines(boxX, boxY, boxW, boxH, raylib.YELLOW);

	let yOffset = boxY + 15;
	const lineHeight = 20;

	// Phase and player count
	drawText(`${gameState.currentPhase}`, boxX + 15, yOffset, 18, raylib.YELLOW);
	yOffset += lineHeight * 1.2;

	const activeCount = gameState.activePlayers.length;
	const totalCount = engine.originalPlayerCount || NUM_PLAYERS;
	drawText(`Players: ${activeCount}/${totalCount}`, boxX + 15, yOffset, 14, raylib.WHITE);
	yOffset += lineHeight;

	// Phase paddle size
	const phasePaddleSize = engine.getPhasePaddleSize();
	drawText(`Paddle Size: ${phasePaddleSize.toFixed(1)}`, boxX + 15, yOffset, 12, raylib.CYAN);
	yOffset += lineHeight;

	// Status
	if (gameState.isRebuilding) {
		const timeLeft = Math.ceil(gameState.rebuildTimeRemaining / 1000);
		drawText(`REBUILDING... ${timeLeft}s`, boxX + 15, yOffset, 12, raylib.ORANGE);
	} else if (gameState.isGameOver) {
		const winner = gameState.winner;
		const winText = winner !== null ? `Winner: P${winner}` : "No Winner";
		drawText(`GAME OVER`, boxX + 15, yOffset, 14, raylib.GOLD);
		yOffset += lineHeight * 0.8;
		drawText(winText, boxX + 15, yOffset, 12, raylib.GOLD);
	}
}

function drawUI() {
	const state = engine.getState();

	// Simple UI panel
	raylib.DrawRectangle(10, 10, 350, HEIGHT - 20, raylib.Color(0, 0, 0, 150));

	let yOffset = 20;
	const lineHeight = 22;

	// Title
	drawText("Phase Transition Debugger", 20, yOffset, 18, raylib.YELLOW);
	yOffset += lineHeight * 1.5;

	// Basic info
	drawText(`Active: ${engine.playerStates.activePlayers.size}`, 20, yOffset, 14);
	yOffset += lineHeight;
	drawText(`Balls: ${state.balls.length}`, 20, yOffset, 14);
	yOffset += lineHeight;

	// Status
	const status = paused ? "PAUSED" : "RUNNING";
	const statusColor = paused ? raylib.RED : raylib.GREEN;
	drawText(`Status: ${status}`, 20, yOffset, 16, statusColor);
	yOffset += lineHeight * 1.5;

	// Simple controls
	drawText("=== CONTROLS ===", 20, yOffset, 14, raylib.CYAN);
	yOffset += lineHeight;

	const controls = [
		"SPACE: Pause/Resume",
		"T: Eliminate Random Player",
		"R: Reset Game",
		"1-5: Force Phase",
		"Arrows: Move Camera",
		"I/O: Zoom"
	];

	controls.forEach(control => {
		drawText(control, 20, yOffset, 12, raylib.LIGHTGRAY);
		yOffset += lineHeight * 0.9;
	});

	// Event log - only important events
	if (eventLog.length > 0) {
		yOffset += 20;
		drawText("=== RECENT EVENTS ===", 20, yOffset, 14, raylib.YELLOW);
		yOffset += lineHeight;

		eventLog.forEach(event => {
			drawText(event.message, 20, yOffset, 11, event.color);
			yOffset += lineHeight * 0.8;
		});
	}

	// Camera info
	drawText(`Zoom: ${ZOOM.toFixed(1)}x`, WIDTH - 150, HEIGHT - 40, 12);
}

// === INPUT HANDLING ===

function handleInput() {
	// Basic controls
	if (raylib.IsKeyPressed(raylib.KEY_SPACE)) paused = !paused;

	// Test elimination - this is the main feature
	if (raylib.IsKeyPressed(raylib.KEY_T)) {
		const activePlayers = Array.from(engine.playerStates.activePlayers);
		if (activePlayers.length > 1) {
			const randomPlayer = activePlayers[Math.floor(Math.random() * activePlayers.length)];
			const randomBall = Math.floor(Math.random() * engine.entities.balls.length);
			engine.eliminatePlayer(randomPlayer, randomBall);
			logEvent(`Eliminated Player ${randomPlayer}`, raylib.ORANGE);
		}
	}

	// Reset
	if (raylib.IsKeyPressed(raylib.KEY_R)) {
		engine.resetGame();
		engine.initBattleRoyale(NUM_PLAYERS, NUM_BALLS);
		camX = 0;
		camY = 0;
		eventLog = [];
		logEvent("Game reset!", raylib.GREEN);
	}

	// Force phases for testing
	if (raylib.IsKeyPressed(raylib.KEY_ONE)) forcePhase('Phase 1');
	if (raylib.IsKeyPressed(raylib.KEY_TWO)) forcePhase('Phase 2');
	if (raylib.IsKeyPressed(raylib.KEY_THREE)) forcePhase('Phase 3');
	if (raylib.IsKeyPressed(raylib.KEY_FOUR)) forcePhase('Phase 4');
	if (raylib.IsKeyPressed(raylib.KEY_FIVE)) forcePhase('Final Phase');

	// Camera
	const camSpeed = 8 / ZOOM;
	if (raylib.IsKeyDown(raylib.KEY_RIGHT)) camX += camSpeed;
	if (raylib.IsKeyDown(raylib.KEY_LEFT)) camX -= camSpeed;
	if (raylib.IsKeyDown(raylib.KEY_UP)) camY -= camSpeed;
	if (raylib.IsKeyDown(raylib.KEY_DOWN)) camY += camSpeed;

	// Zoom
	if (raylib.IsKeyDown(raylib.KEY_I)) ZOOM *= 1.02;
	if (raylib.IsKeyDown(raylib.KEY_O)) ZOOM *= 0.98;
	ZOOM = Math.max(0.8, Math.min(ZOOM, 6));
}

function forcePhase(phaseName) {
	engine.currentPhase = phaseName;
	engine.startArenaRebuild();
	logEvent(`Forced ${phaseName}`, raylib.CYAN);
}

// === MAIN LOOP ===

while (!raylib.WindowShouldClose()) {
	handleInput();

	// Step physics
	if (!paused) {
		const state = engine.step();

		// Log only key events
		if (state.events) {
			state.events.forEach(event => {
				let color = raylib.WHITE;
				let message = "";

				switch (event.type) {
					case 'PLAYER_ELIMINATED':
						color = raylib.RED;
						message = `P${event.playerId} eliminated! (${event.remainingPlayers} left)`;
						break;
					case 'PHASE_TRANSITION':
						color = raylib.YELLOW;
						message = `${event.phase} started!`;
						break;
					case 'ARENA_REBUILD_COMPLETE':
						color = raylib.GREEN;
						message = `Arena rebuilt - ${event.activePlayers.length} survivors`;
						break;
					case 'GAME_END':
						color = raylib.GOLD;
						message = event.winner ? `Winner: P${event.winner}!` : 'Game Over!';
						break;
					default:
						return; // Skip other events
				}
				logEvent(message, color);
			});
		}
	}

	const state = engine.getState();

	// Render
	raylib.BeginDrawing();
	raylib.ClearBackground(raylib.BLACK);

	// Draw game world - focus on the key elements
	drawArena();
	drawBalls(state.balls);
	drawPaddles(state.paddles);
	drawPillars(); // Show pillars to see complete arena structure

	// Simple UI
	drawUI();
	drawPhaseInfo();

	raylib.EndDrawing();
}

raylib.CloseWindow();
