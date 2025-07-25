import { PhysicsEngine } from './physicsEngine.js';

export const Physics = {
	games: new Map(),

	processTick({ gameId, tick, inputs }) {
		if (!this.games.has(gameId)) {
			const eng = new PhysicsEngine();
			eng.initBattleRoyale(
				eng.cfg.MAX_PLAYERS,
				eng.cfg.INITIAL_BALLS
			);
			this.games.set(gameId, eng);
		}

		const eng = this.games.get(gameId);

		// Apply paddle inputs
		if (Array.isArray(inputs)) {
			for (const { id, move } of inputs) {
				//console.log(`Handling input for player: ${id}`);
				eng.updatePaddleInputState(id, move);
			}
		}

		// Start measuring performance
		//const startTime = performance.now();

		try {
			const { balls, paddles, stage, ranks, end, events } = eng.step();
			// End measuring performance
			//const endTime = performance.now();
			//const duration = endTime - startTime;
			//
			//console.log(`Step execution time for game ${gameId} at tick ${tick}: ${duration} milliseconds`);

			return { gameId, tick, balls, paddles, stage, ranks, end, events };
		} catch (err) {
			console.error('Physics.step() failed at tick', tick, err);
			throw err;
		}
	},

	removeGame(gameId) {
		this.games.delete(gameId);
	}
};

