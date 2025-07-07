// benchmark.js
// Performance test harness for PhysicsBR and legacy Physics

import { PhysicsBR } from './physicsBR.js';
import { Physics as LegacyPhysics } from './Physics.js';
import { performance } from 'node:perf_hooks';

export function generateMockState(playerCount, ballRadius = 5, ballCount = 200) {
	const paddles = Array.from({ length: playerCount }, (_, i) => {
		const angle = (i / playerCount) * 2 * Math.PI;
		const radius = 290;
		return {
			x: Math.cos(angle) * radius,
			y: Math.sin(angle) * radius,
			halfW: 6,
			halfH: 20
		};
	});

	const balls = Array.from({ length: ballCount }, (_, i) => {
		const angle = (i / ballCount) * 2 * Math.PI;
		const speed = 150;
		return {
			x: 0,
			y: 0,
			vx: Math.cos(angle) * speed,
			vy: Math.sin(angle) * speed,
			radius: ballRadius
		};
	});

	return { paddles, balls };
}

export function generateInputs(playerCount) {
	const inputs = [];
	for (let i = 0; i < playerCount; i++) {
		const input = {
			type: 'paddleUpdate',
			playerId: i,
			input: {
				x: Math.random() * 10 - 5,
				y: Math.random() * 10 - 5
			}
		};
		inputs.push(input);
	}
	return inputs;
}

function runBenchmark(engine, label, { gameId = 'bench', playerCount = 25, ballCount = 200, ticks = 300 }) {
	const state = generateMockState(playerCount, 5, ballCount);
	const results = [];

	for (let t = 0; t < ticks; t++) {
		const inputs = generateInputs(playerCount);
		const start = performance.now();
		engine.processTick({ gameId, tick: t, state, inputs });
		const duration = performance.now() - start;
		results.push(duration);
	}

	const total = results.reduce((a, b) => a + b, 0);
	const avg = total / results.length;
	const max = Math.max(...results);
	const min = Math.min(...results);

	console.log(`${label} Benchmark:`);
	console.log(`Players: ${playerCount}, Balls: ${ballCount}, Ticks: ${ticks}`);
	console.log(`Average Tick Time: ${avg.toFixed(3)} ms`);
	console.log(`Min: ${min.toFixed(3)} ms, Max: ${max.toFixed(3)} ms\n`);
}

// Run both benchmarks
//runBenchmark(PhysicsBR, 'PhysicsBR (Data-Oriented)', { playerCount: 100, ballCount: 200, ticks: 1200 });
//runBenchmark(LegacyPhysics, 'Legacy Physics (OOP)', { playerCount: 100, ballCount: 200, ticks: 1200 });

