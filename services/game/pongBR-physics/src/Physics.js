import { PhysicsEngine } from './physics-engine.js';

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

		if (Array.isArray(inputs)) {
			for (const { id, move } of inputs) {
				eng.updatePaddleInputState(id, move);
			}
		}

		try {
			const { balls, paddles, stage, ranks, end, events } = eng.step();
			const gameState = eng.gameState.getGameState();
			return { gameId, tick, balls, paddles, stage, ranks, end, events, gameState };
		} catch (err) {
			console.error('Physics.step() failed at tick', tick, err);
			throw err;
		}
	},

	removeGame(gameId) {
		this.games.delete(gameId);
	}
};

