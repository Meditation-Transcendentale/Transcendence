import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const raylib = require('raylib');

import { PhysicsEngine } from './physicsEngine.js';

const WIDTH = 1920;
const HEIGHT = 1080;
const CENTER = { x: WIDTH / 2, y: HEIGHT / 2 };
let ZOOM = 5.;
const perim = 2 * Math.PI * 200;
const w = (perim / 100) * 0.25

const engine = new PhysicsEngine();
engine.initBattleRoyale(engine.cfg.MAX_PLAYERS, engine.cfg.INITIAL_BALLS);

raylib.InitWindow(WIDTH, HEIGHT, "Physics Debugger");
raylib.SetTargetFPS(60);

let camX = 0;
let camY = 0;
function toScreen(x, y) {
	return {
		x: (CENTER.x + (x - camX) * ZOOM),
		y: (CENTER.y + (y - camY) * ZOOM)
	};
}

while (!raylib.WindowShouldClose()) {
	engine.step(); // progress simulation
	const { balls, paddles } = engine.getState();

	raylib.BeginDrawing();
	raylib.SetConfigFlags(raylib.FLAG_MSAA_4X_HINT);
	raylib.ClearBackground(raylib.RAYWHITE);

	// Arena circle (optional, for context)
	raylib.DrawCircle(CENTER.x - (camX * ZOOM), CENTER.y - (camY * ZOOM), 200 * ZOOM, raylib.LIGHTGRAY);

	// Draw balls
	for (const b of balls) {
		const pos = toScreen(b.x, b.y);
		raylib.DrawCircle(pos.x, pos.y, 0.5 * ZOOM, raylib.RED);
		raylib.DrawLine(pos.x, pos.y, pos.x + b.vx * 4, pos.y + b.vy * 4, raylib.BLUE); // velocity line
	}

	// Draw paddles
	for (const p of paddles) {
		const pos = toScreen(p.x, p.y);
		raylib.DrawRectanglePro(
			{ x: pos.x, y: pos.y, width: w * ZOOM, height: (w * 1 / 20) * ZOOM }, // you can parameterize size if needed
			{ x: w * ZOOM / 2., y: (w * 1 / 20) / 2. },
			p.rot * (180 / Math.PI), // no rotation for now
			raylib.BLUE
		);
		console.log(p.rot);
	}
	if (raylib.IsKeyDown(raylib.KEY_RIGHT)) camX += 5 / ZOOM;
	if (raylib.IsKeyDown(raylib.KEY_LEFT)) camX -= 5 / ZOOM;
	if (raylib.IsKeyDown(raylib.KEY_UP)) camY -= 5 / ZOOM;
	if (raylib.IsKeyDown(raylib.KEY_DOWN)) camY += 5 / ZOOM;
	if (raylib.IsKeyDown(raylib.KEY_I)) ZOOM += 1 / ZOOM;
	if (raylib.IsKeyDown(raylib.KEY_O)) ZOOM -= 1 / ZOOM;
	raylib.DrawText("Press ESC to quit", 10, 10, 20, raylib.DARKGRAY);

	raylib.EndDrawing();
}

raylib.CloseWindow();
