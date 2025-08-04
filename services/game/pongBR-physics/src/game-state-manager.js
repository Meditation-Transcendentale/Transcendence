// game-state-manager.js

import { CFG, getPhaseConfig, getPhasePaddleSize, ENTITY_MASKS } from './physics-config.js';

export class GameStateManager {
	constructor(onRebuildStart = null) {
		this.playerStates = {
			eliminated: new Set(),
			activePlayers: new Set(),
			eliminationOrder: []
		};

		this.currentPhase = 'Phase 1';
		this.isRebuilding = false;
		this.rebuildStartTime = 0;
		this.playerMapping = {};
		this.originalPlayerCount = 0;
		this.fixedPlayerIds = [];
		this.gameOver = false;

		this.gameEvents = [];
		this.onRebuildStart = onRebuildStart;
	}

	initBattleRoyale(numPlayers) {
		this.originalPlayerCount = numPlayers;
		this.fixedPlayerIds = Array.from({ length: numPlayers }, (_, i) => i);

		this.playerStates.eliminated.clear();
		this.playerStates.activePlayers.clear();
		this.playerStates.eliminationOrder = [];

		for (let pid = 0; pid < numPlayers; pid++) {
			this.playerStates.activePlayers.add(pid);
		}
		this.playerMapping = {};
		this.currentPhase = 'Phase 1';
		this.isRebuilding = false;
		this.gameOver = false;
		this.gameEvents = [];
	}

	findPlayerByAngle(ballAngle, numCurrentPaddles) {
		while (ballAngle < 0) ballAngle += 2 * Math.PI;
		while (ballAngle >= 2 * Math.PI) ballAngle -= 2 * Math.PI;

		const angleStep = (2 * Math.PI) / numCurrentPaddles;

		for (let paddleIndex = 0; paddleIndex < numCurrentPaddles; paddleIndex++) {
			const sliceStart = paddleIndex * angleStep;
			const sliceEnd = (paddleIndex + 1) * angleStep;

			const withinSlice = sliceStart <= sliceEnd ?
				(ballAngle >= sliceStart && ballAngle <= sliceEnd) :
				(ballAngle >= sliceStart || ballAngle <= sliceEnd);

			if (withinSlice) {
				if (this.playerMapping && Object.keys(this.playerMapping).length > 0) {
					const reverseMapping = Object.entries(this.playerMapping)
						.find(([origId, newIdx]) => newIdx === paddleIndex);
					return reverseMapping ? parseInt(reverseMapping[0]) : paddleIndex;
				}
				return paddleIndex;
			}
		}
		return -1;
	}

	eliminatePlayer(playerId, ballIndex) {
		if (this.playerStates.eliminated.has(playerId)) {
			return;
		}

		this.playerStates.eliminated.add(playerId);
		this.playerStates.activePlayers.delete(playerId);
		this.playerStates.eliminationOrder.push({
			playerId,
			timestamp: Date.now(),
			ballIndex
		});

		this.gameEvents.push({
			type: 'PLAYER_ELIMINATED',
			playerId,
			timestamp: Date.now(),
			remainingPlayers: this.playerStates.activePlayers.size
		});

		// console.log(`Player ${playerId} eliminated! ${this.playerStates.activePlayers.size} players remaining.`);

		this.checkPhaseTransition();
	}

	checkPhaseTransition() {
		const remainingPlayers = this.playerStates.activePlayers.size;

		if (remainingPlayers <= 1) {
			this.endGame();
			return;
		}

		let targetPhase = this.currentPhase;
		if (remainingPlayers <= 3 && remainingPlayers > 1) targetPhase = 'Final Phase';
		else if (remainingPlayers <= 12) targetPhase = 'Phase 4';
		else if (remainingPlayers <= 25) targetPhase = 'Phase 3';
		else if (remainingPlayers <= 50) targetPhase = 'Phase 2';
		else targetPhase = 'Phase 1';

		if (this.currentPhase !== targetPhase) {
			this.triggerPhaseTransition(targetPhase);
		}
	}

	triggerPhaseTransition(newPhase) {
		this.currentPhase = newPhase;
		this.gameEvents.push({
			type: 'PHASE_TRANSITION',
			phase: newPhase,
			remainingPlayers: this.playerStates.activePlayers.size,
			timestamp: Date.now()
		});

		// console.log(`Phase Transition: ${newPhase} - ${this.playerStates.activePlayers.size} players remaining`);
		this.startArenaRebuild();
	}

	startArenaRebuild() {
		this.isRebuilding = true;
		this.rebuildStartTime = Date.now();
		// console.log(`Starting arena rebuild for ${this.currentPhase}...`);

		if (this.onRebuildStart) {
			this.onRebuildStart();
		}
	}

	checkRebuildComplete() {
		if (!this.isRebuilding) return false;

		const elapsed = Date.now() - this.rebuildStartTime;
		if (elapsed >= CFG.REBUILD_DURATION) {
			this.completeArenaRebuild();
			return true;
		}
		return false;
	}

	completeArenaRebuild() {
		// console.log(`Completing arena rebuild for ${this.currentPhase}`);
		this.isRebuilding = false;
		this.playerStates.eliminated.clear();

		this.gameEvents.push({
			type: 'REBUILD_COMPLETE',
			phase: this.currentPhase,
			activePlayers: Array.from(this.playerStates.activePlayers),
			playerMapping: { ...this.playerMapping },
			timestamp: Date.now()
		});

		// console.log(`Arena rebuild complete! ${this.playerStates.activePlayers.size} players remaining.`);
	}

	updatePlayerMapping(activePlayers) {
		this.playerMapping = {};
		activePlayers.forEach((fixedPlayerId, newPaddleIndex) => {
			this.playerMapping[fixedPlayerId] = newPaddleIndex;
		});
		// console.log('Player mapping updated:', this.playerMapping);
	}

	endGame() {
		const activePlayers = Array.from(this.playerStates.activePlayers);
		const winner = activePlayers.length === 1 ? activePlayers[0] : null;

		this.gameOver = true;

		this.gameEvents.push({
			type: 'GAME_END',
			winner,
			timestamp: Date.now(),
			eliminationOrder: [...this.playerStates.eliminationOrder]
		});

		console.log(winner !== null ? `Game Over! Winner: Player ${winner}` : 'Game Over! No winner.');
	}

	calculatePlayerRanks() {
		const ranks = new Array(this.originalPlayerCount).fill(0);

		this.playerStates.eliminationOrder.forEach((elimination, index) => {
			ranks[elimination.playerId] = this.originalPlayerCount - index;
		});

		this.playerStates.activePlayers.forEach(playerId => {
			ranks[playerId] = 1;
		});

		return ranks;
	}

	getAndClearEvents() {
		const events = [...this.gameEvents];
		this.gameEvents = [];
		return events;
	}

	getGameState() {
		return {
			activePlayers: Array.from(this.playerStates.activePlayers),
			eliminatedPlayers: Array.from(this.playerStates.eliminated),
			currentPhase: this.currentPhase,
			isRebuilding: this.isRebuilding,
			rebuildTimeRemaining: this.isRebuilding ?
				Math.max(0, CFG.REBUILD_DURATION - (Date.now() - this.rebuildStartTime)) : 0,
			playerMapping: this.playerMapping,
			isGameOver: this.gameOver,
			winner: this.playerStates.activePlayers.size === 1
				? Array.from(this.playerStates.activePlayers)[0] : null
		};
	}

	reset() {
		this.playerStates.eliminated.clear();
		this.playerStates.activePlayers.clear();
		this.playerStates.eliminationOrder = [];
		this.gameEvents = [];
		this.currentPhase = 'Phase 1';
		this.isRebuilding = false;
		this.rebuildStartTime = 0;
		this.playerMapping = {};
		this.originalPlayerCount = 0;
		this.gameOver = false;
		this.fixedPlayerIds = [];
	}
}
