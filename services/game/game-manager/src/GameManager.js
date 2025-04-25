// services/game/game-manager/src/GameManager.js
import { decodeRaw, encodeFull } from './binary.js';
import { Game } from './Game.js';
import { JSONCodec } from 'nats';
const jc = JSONCodec();

export class GameManager {
	constructor(nc) {
		this.nc = nc;
		this.games = new Map(); // gameId -> { type, state, inputs, tick, interval }
	}

	start() {
		console.log('[game-manager] Ready to manage games');
	}

	handleInput({ type, gameId, playerId, input, tick }) {
		const game = this.games.get(gameId);
		if (!game) return;

		if (type === 'disableWall' || type === 'enableWall' || type === 'newPlayerConnected') {
			this.nc.publish(`game.pong.input`, JSON.stringify({
				gameId,
				inputs: [{ playerId, type }]
			}));
			return;
		}

		const currentTick = typeof tick === 'number' ? tick : game.tick + 1;
		if (!game.inputs[currentTick]) {
			game.inputs[currentTick] = [];
		}
		game.inputs[currentTick].push({ playerId, type, input });
	}

	handlePhysicsResult(buffer) {
		const phys = decodeRaw(buffer);

		const match = this.games.get(phys.gameId);
		if (!match) return;

		match.state = {
			tick: phys.tick,
			balls: phys.balls,
			paddles: phys.paddles
		};

		const out = encodeFull(
			phys.gameId,
			phys.tick,
			phys.balls,
			phys.paddles,
			match.score,
			match.isPaused,
			match.isGameOver
		);

		this.nc.publish(match.options.stateTopic, out);
	}
	createMatch(options = {}) {
		const gameInstance = new Game(options);
		const gameId = gameInstance.getState().gameId;
		const tickRate = 1000 / (options.tickRate || 60);

		const match = {
			type: gameInstance.mode,
			state: gameInstance.getState(),
			tick: 0,
			inputs: {},
			options,
			status: 'created',
			interval: null,
			score: { 0: 0, 1: 0 },
			isPaused: false,
			isGameOver: false
		};
		Object.keys(match.state.paddles).forEach(pid => {
			match.score[pid] = 0;
		});
		this.games.set(gameId, match);
		console.log(`[game-manager] Created ${match.type} match ${gameId}`);
		return gameId;
	}

	endMatch(gameId) {
		const match = this.games.get(gameId);
		if (match) {

			match.status = 'ended'
			this.nc.publish(`game.${match.type}.end`, JSON.stringify({ gameId }));
			this.games.delete(gameId);
			console.log(`[game-manager] Ended match ${gameId}`);
		}
	}

	launchGame(gameId) {
		const match = this.games.get(gameId);
		if (!match || match.status !== 'created') return false;

		match.status = 'running';
		const tickRate = 1000 / (match.options.tickRate || 60);

		const gameLoop = () => {
			if (match.status !== 'running') return;
			const startTime = Date.now();
			match.tick++;
			const inputs = match.inputs[match.tick] || [];
			this.nc.publish(match.options.physicsTopic, JSON.stringify({
				gameId,
				tick: match.tick,
				state: match.state,
				inputs
			}));

			const elapsed = Date.now() - startTime;
			const delay = Math.max(0, tickRate - elapsed);
			setTimeout(gameLoop, delay);
		};

		gameLoop();
		console.log(`[game-manager] Launched match ${gameId}`);
		return true;
	}

	/**
 * Invoked when physics reports a goal.
 * @param {{gameId: string, playerId: number}} ev
 */
	_onGoal({ gameId, playerId }) {
		const match = this.games.get(gameId);
		if (!match || match.isPaused || match.isGameOver) return;

		match.score[playerId]++;
		const winScore = match.options.winScore || 5;
		console.log(match.score);
		if (match.score[playerId] >= winScore) {
			match.isGameOver = true;
			match.status = 'ended';
			this.nc.publish(
				`game.${match.type}.end`,
				jc.encode({ gameId, winner: playerId })
			);
			return;
		}

		this.nc.publish(
			`game.${match.type}.input`,
			JSON.stringify({
				gameId,
				inputs: [{ playerId: null, input: { type: 'resetBall' } }]
			})
		);

		match.isPaused = true;

		setTimeout(() => {
			match.isPaused = false;
			this.nc.publish(
				`game.${match.type}.input`,
				JSON.stringify({
					gameId,
					inputs: [{ playerId: null, input: { type: 'serve' } }]
				})
			);
		}, match.options.pauseMs || 1000);
	}
}
