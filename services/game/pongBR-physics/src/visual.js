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
let debugMode = true; // Show collision debugging by default

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
	for (let i = 0; i < balls.length; i++) {
		const ball = balls[i];
		const pos = toScreen(ball.x, ball.y);
		const ballRadius = Math.max(2, ball.radius * ZOOM);
		
		// Color code balls: Red=normal, Orange=near collision
		const distFromCenter = Math.sqrt(ball.x * ball.x + ball.y * ball.y);
		const collisionDistance = engine.cfg.ARENA_RADIUS - ball.radius;
		const isNearCollision = distFromCenter >= collisionDistance - 20;
		const ballColor = isNearCollision ? raylib.ORANGE : raylib.RED;
		
		raylib.DrawCircle(pos.x, pos.y, ballRadius, ballColor);
		
		// Show ball angle for first few balls
		if (debugMode && i < 3 && isNearCollision) {
			const ballAngle = Math.atan2(ball.y, ball.x);
			let normalizedAngle = ballAngle;
			while (normalizedAngle < 0) normalizedAngle += 2 * Math.PI;
			const angleDegrees = (normalizedAngle * 180 / Math.PI).toFixed(1);
			drawText(`${angleDegrees}°`, pos.x + 15, pos.y - 5, 10, raylib.WHITE);
		}
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

		// Debug info for first few pillars
		if (debugMode && i < 5) {
			const pillarAngle = Math.atan2(y, x);
			const angleDegrees = (pillarAngle * 180 / Math.PI).toFixed(1);
			drawText(`PIL${i}`, pos.x + 20, pos.y - 20, 10, raylib.WHITE);
			drawText(`${angleDegrees}°`, pos.x + 20, pos.y - 5, 8, raylib.YELLOW);
			drawText(`${x.toFixed(0)},${y.toFixed(0)}`, pos.x + 20, pos.y + 8, 8, raylib.CYAN);
		}
	}
}

function drawPaddles(paddles) {
	const numPlayers = engine.entities.paddles.length;
	const angleStep = (2 * Math.PI) / numPlayers;
	
	for (let paddleIndex = 0; paddleIndex < paddles.length; paddleIndex++) {
		const paddle = paddles[paddleIndex];
		const paddleEnt = engine.entities.paddles[paddleIndex];

		if (!paddleEnt || !engine.pd.isActive(paddleEnt)) continue;

		// Get paddle physics data
		const x = engine.pd.posX[paddleEnt];
		const y = engine.pd.posY[paddleEnt];
		const rot = engine.pd.rot[paddleEnt];
		const halfW = engine.pd.halfW[paddleEnt];
		const halfH = engine.pd.halfH[paddleEnt];

		// Get player ID mapping (same logic as collision detection)
		let fixedPlayerId = paddleIndex;
		if (engine.gameState && engine.gameState.playerMapping && Object.keys(engine.gameState.playerMapping).length > 0) {
			const reverseMapping = Object.entries(engine.gameState.playerMapping)
				.find(([playerId, pIdx]) => pIdx === paddleIndex);
			if (reverseMapping) {
				fixedPlayerId = parseInt(reverseMapping[0]);
			}
		}

		// Calculate collision area (same as physics)
		let currentPaddleAngle, arcWidth;
		const isEliminated = engine.gameState && engine.gameState.playerStates && engine.gameState.playerStates.eliminated.has(fixedPlayerId);
		if (isEliminated) {
			currentPaddleAngle = engine.paddleData.centerAngles[paddleIndex];
			arcWidth = angleStep;
		} else {
			currentPaddleAngle = engine.paddleData.centerAngles[paddleIndex] + engine.paddleData.offsets[paddleIndex];
			arcWidth = angleStep * engine.cfg.PADDLE_FILL;
		}

		const pos = toScreen(x, y);
		const paddleWidth = halfW * 2 * ZOOM;
		const paddleHeight = halfH * 2 * ZOOM;
		const rotationDegrees = rot * (180 / Math.PI);

		// Color: Blue=alive, Gray=eliminated, Lime=first 3 paddles for debugging
		let paddleColor;
		if (isEliminated) {
			paddleColor = raylib.GRAY;
		} else if (debugMode && paddleIndex < 3) {
			paddleColor = raylib.LIME; // Highlight first 3 for debugging
		} else {
			paddleColor = raylib.BLUE;
		}

		// Draw paddle
		raylib.DrawRectanglePro(
			{ x: pos.x, y: pos.y, width: paddleWidth, height: paddleHeight },
			{ x: paddleWidth / 2, y: paddleHeight / 2 },
			rotationDegrees,
			paddleColor
		);

		// Draw debug rays in debug mode
		if (debugMode && paddleIndex < 5) {
			const arenaCenter = toScreen(0, 0);
			const rayLength = engine.cfg.ARENA_RADIUS * ZOOM;
			
			// Paddle start and end angles (physical paddle bounds)
			const paddleStartAngle = engine.paddleData.centerAngles[paddleIndex] - (angleStep / 2);
			const paddleEndAngle = engine.paddleData.centerAngles[paddleIndex] + (angleStep / 2);
			
			// Collision slice start and end angles  
			const sliceStartAngle = currentPaddleAngle - arcWidth / 2;
			const sliceEndAngle = currentPaddleAngle + arcWidth / 2;
			
			// Draw paddle bounds (green rays)
			const paddleStartX = arenaCenter.x + Math.cos(paddleStartAngle) * rayLength;
			const paddleStartY = arenaCenter.y + Math.sin(paddleStartAngle) * rayLength;
			const paddleEndX = arenaCenter.x + Math.cos(paddleEndAngle) * rayLength;
			const paddleEndY = arenaCenter.y + Math.sin(paddleEndAngle) * rayLength;
			
			raylib.DrawLine(arenaCenter.x, arenaCenter.y, paddleStartX, paddleStartY, raylib.GREEN);
			raylib.DrawLine(arenaCenter.x, arenaCenter.y, paddleEndX, paddleEndY, raylib.GREEN);
			
			// Draw collision slice bounds (red rays)
			const sliceStartX = arenaCenter.x + Math.cos(sliceStartAngle) * rayLength * 0.9;
			const sliceStartY = arenaCenter.y + Math.sin(sliceStartAngle) * rayLength * 0.9;
			const sliceEndX = arenaCenter.x + Math.cos(sliceEndAngle) * rayLength * 0.9;
			const sliceEndY = arenaCenter.y + Math.sin(sliceEndAngle) * rayLength * 0.9;
			
			raylib.DrawLine(arenaCenter.x, arenaCenter.y, sliceStartX, sliceStartY, raylib.RED);
			raylib.DrawLine(arenaCenter.x, arenaCenter.y, sliceEndX, sliceEndY, raylib.RED);
		}

		// Show debug info for first 3 paddles or basic info
		if (debugMode && paddleIndex < 3) {
			drawText(`P${fixedPlayerId}`, pos.x + 15, pos.y - 25, 12, raylib.WHITE);
			drawText(`${(currentPaddleAngle * 180 / Math.PI).toFixed(1)}°`, pos.x + 15, pos.y - 10, 10, raylib.CYAN);
			drawText(`${(arcWidth * 180 / Math.PI).toFixed(1)}°`, pos.x + 15, pos.y + 5, 10, raylib.MAGENTA);
		} else {
			drawText(`P${fixedPlayerId}`, pos.x + 15, pos.y - 15, 12, raylib.WHITE);
		}
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
	
	// Debug mode indicator
	const debugText = debugMode ? "Debug: ON" : "Debug: OFF";
	const debugColor = debugMode ? raylib.GREEN : raylib.GRAY;
	drawText(debugText, 20, yOffset, 14, debugColor);
	yOffset += lineHeight;
	
	// Collision system indicator
	const collisionText = engine.useSimplifiedCollision === 2 ? "Collision: OPTIMIZED" : "Collision: ORIGINAL";
	const collisionColor = engine.useSimplifiedCollision === 2 ? raylib.MAGENTA : raylib.CYAN;
	drawText(collisionText, 20, yOffset, 14, collisionColor);
	yOffset += lineHeight;
	
	// Collision debug info
	if (debugMode) {
		const nearCollisionBalls = state.balls.filter(ball => {
			const dist = Math.sqrt(ball.x * ball.x + ball.y * ball.y);
			return dist >= engine.cfg.ARENA_RADIUS - ball.radius - 20;
		}).length;
		drawText(`Near collision: ${nearCollisionBalls}`, 20, yOffset, 14, raylib.ORANGE);
		yOffset += lineHeight;
	}

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
		"D: Toggle Debug Mode",
		"S: Toggle Original/Optimized", 
		"P: Log Pillar Positions",
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

	// Debug mode toggle
	if (raylib.IsKeyPressed(raylib.KEY_D)) {
		debugMode = !debugMode;
		logEvent(`Debug mode: ${debugMode ? 'ON' : 'OFF'}`, raylib.CYAN);
	}

	// Collision system toggle
	if (raylib.IsKeyPressed(raylib.KEY_S)) {
		engine.useSimplifiedCollision = engine.useSimplifiedCollision === 0 ? 2 : 0;
		const mode = engine.useSimplifiedCollision === 2 ? 'OPTIMIZED' : 'ORIGINAL';
		logEvent(`Collision: ${mode}`, raylib.MAGENTA);
	}

	// Force pillar position update
	if (raylib.IsKeyPressed(raylib.KEY_P)) {
		// Trigger pillar position recalculation if needed
		logEvent("Pillar positions logged to console", raylib.ORANGE);
		console.log("=== PILLAR POSITIONS ===");
		for (let i = 0; i < Math.min(5, engine.entities.pillars.length); i++) {
			const pillarEnt = engine.entities.pillars[i];
			if (pillarEnt && engine.pd.isActive(pillarEnt)) {
				const x = engine.pd.posX[pillarEnt];
				const y = engine.pd.posY[pillarEnt];
				const angle = Math.atan2(y, x) * 180 / Math.PI;
				console.log(`Pillar ${i}: pos(${x.toFixed(2)}, ${y.toFixed(2)}) angle=${angle.toFixed(2)}°`);
			}
		}
	}

	// Camera
	const camSpeed = 8 / ZOOM;
	if (raylib.IsKeyDown(raylib.KEY_RIGHT)) camX += camSpeed;
	if (raylib.IsKeyDown(raylib.KEY_LEFT)) camX -= camSpeed;
	if (raylib.IsKeyDown(raylib.KEY_UP)) camY -= camSpeed;
	if (raylib.IsKeyDown(raylib.KEY_DOWN)) camY += camSpeed;

	// Zoom
	if (raylib.IsKeyDown(raylib.KEY_I)) ZOOM *= 1.02;
	if (raylib.IsKeyDown(raylib.KEY_O)) ZOOM *= 0.98;
	ZOOM = Math.max(0.8, Math.min(ZOOM, 10));
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
