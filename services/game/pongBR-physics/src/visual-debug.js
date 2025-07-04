// visual-debug.js
// Terminal-based live visualizer for either PhysicsBR or LegacyPhysics (one at a time)

import blessed from 'blessed';
import { PhysicsBR } from './physicsBR.js';
import { Physics as LegacyPhysics } from './Physics.js';
import { generateMockState, generateInputs } from './benchmark.js';

const USE_BR = false; // Toggle this to false to test LegacyPhysics

const TICKS = 999999;
const FPS = 5;
const WIDTH = 80;
const HEIGHT = 40;

const screen = blessed.screen({ smartCSR: true });
screen.title = 'Physics Visual Debug';

const outputBox = blessed.box({
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	tags: false,
	style: { fg: 'white', bg: 'black' },
});

screen.append(outputBox);

let tick = 0;
let STATE;
let brWorld;

function initializeState() {
	STATE = generateMockState(10, 5, 20); // fewer entities for visibility
	if (USE_BR) {
		PhysicsBR.games.clear();
		PhysicsBR.processTick({ gameId: 'br', tick: 0, state: STATE, inputs: [] });
	} else {
		LegacyPhysics.games.clear();
		LegacyPhysics.processTick({ gameId: 'legacy', tick: 0, state: STATE, inputs: [] });
	}
}

function drawWorldBR(world) {
	if (!world || !world.ballPosX) return '';
	const grid = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(' '));

	for (let i = 0; i < world.ballCount; i++) {
		if (!world.ballAlive[i]) continue;
		const x = Math.round((world.ballPosX[i] + 300) * WIDTH / 600);
		const y = Math.round((world.ballPosY[i] + 300) * HEIGHT / 600);
		if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) grid[y][x] = 'o';
	}

	for (let i = 0; i < world.paddleCount; i++) {
		const x = Math.round((world.paddlePosX[i] + 300) * WIDTH / 600);
		const y = Math.round((world.paddlePosY[i] + 300) * HEIGHT / 600);
		if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) grid[y][x] = '|';
	}

	return grid.map(row => row.join('')).join('\n');
}

function drawWorldLegacy(balls, paddles) {
	const grid = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(' '));

	for (const ball of balls) {
		const x = Math.round((ball.x + 300) * WIDTH / 600);
		const y = Math.round((ball.y + 300) * HEIGHT / 600);
		if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) grid[y][x] = 'o';
	}

	for (const paddle of paddles) {
		const x = Math.round((paddle.x + 300) * WIDTH / 600);
		const y = Math.round((paddle.y + 300) * HEIGHT / 600);
		if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) grid[y][x] = '|';
	}

	return grid.map(row => row.join('')).join('\n');
}

function loop() {
	const inputs = generateInputs(10);

	let content = '';
	if (USE_BR) {
		PhysicsBR.processTick({ gameId: 'br', tick, state: STATE, inputs });
		if (PhysicsBR._lastWorld) brWorld = PhysicsBR._lastWorld;
		content = drawWorldBR(brWorld);
	} else {
		const legacy = LegacyPhysics.processTick({ gameId: 'legacy', tick, state: STATE, inputs });
		content = drawWorldLegacy(legacy.balls, legacy.paddles);
	}

	outputBox.setContent(content);
	screen.render();
	tick++;
	if (tick < TICKS) setTimeout(loop, 1000 / FPS);
	else process.exit(0);
}

initializeState();
loop();
