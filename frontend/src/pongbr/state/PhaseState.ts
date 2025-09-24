/**
 * PhaseState - Manages phase transition synchronization with physics engine
 */

import { Entity } from "../ecs/Entity.js";
import { PaddleComponent } from "../components/PaddleComponent.js";

export interface PhaseTransitionEvent {
	type: 'PHASE_TRANSITION';
	phase: string;
	remainingPlayers: number;
	timestamp: number;
}

export interface RebuildCompleteEvent {
	type: 'REBUILD_COMPLETE';
	phase: string;
	activePlayers: number[];
	playerMapping: Record<number, number>;
	timestamp: number;
}

export interface GameStateInfo {
	activePlayers: number[];
	eliminatedPlayers: number[];
	currentPhase: string;
	isRebuilding: boolean;
	rebuildTimeRemaining: number;
	playerMapping: Record<number, number>;
	isGameOver: boolean;
	winner?: number;
}

export class PhaseState {
	public currentStage: number = 1;
	public currentPhase: string = 'Phase 1';
	public isRebuilding: boolean = false;
	public rebuildTimeRemaining: number = 0;
	public pendingStage?: number;
	public playerMapping: Record<number, number> = {};
	public visualStage: number = 1;
	private justRebuilt: boolean = false;

	private static readonly PHASE_CONFIG = {
		'Phase 1': { stage: 1, playerCount: 100 },
		'Phase 2': { stage: 2, playerCount: 50 },
		'Phase 3': { stage: 3, playerCount: 25 },
		'Phase 4': { stage: 4, playerCount: 12 },
		'Final Phase': { stage: 5, playerCount: 3 }
	};

	updateGameState(gameState: GameStateInfo): void {
		const wasRebuilding = this.isRebuilding;

		this.currentPhase = gameState.currentPhase || 'Phase 1';
		this.isRebuilding = gameState.isRebuilding || false;
		this.rebuildTimeRemaining = gameState.rebuildTimeRemaining || 0;
		this.playerMapping = gameState.playerMapping || {};

		const config = PhaseState.PHASE_CONFIG[this.currentPhase];
		if (!config)
			console.log(`NOT WORKING`)
		if (config) {
			this.currentStage = config.stage;
		}

		if (wasRebuilding !== this.isRebuilding) {
			if (this.isRebuilding) {
				console.log(`🔄 Phase rebuilding started: ${this.currentPhase} (${this.rebuildTimeRemaining}ms remaining)`);
			} else {
				console.log(`✅ Phase rebuild completed: ${this.currentPhase}`);
			}
		}
	}

	handlePhaseTransition(event: PhaseTransitionEvent): void {
		console.log(`🚀 Phase transition starting: ${event.phase} (${event.remainingPlayers} players)`);

		const config = PhaseState.PHASE_CONFIG[event.phase];
		if (config) {
			this.pendingStage = config.stage;
			console.log(`⏳ Pending stage transition: ${this.currentStage} → ${config.stage}`);
		}
	}

	handleRebuildComplete(event: RebuildCompleteEvent): { shouldTransition: boolean; playerCount: number; shouldRemap: boolean } {
		console.log(`Rebuild complete: ${event.phase}`);

		const config = PhaseState.PHASE_CONFIG[event.phase];
		if (!config) {
			console.error(`❌ Unknown phase: ${event.phase}`);
			return { shouldTransition: false, playerCount: 100, shouldRemap: false };
		}

		const oldVisualStage = this.visualStage;
		this.currentPhase = event.phase;
		this.currentStage = config.stage;
		this.playerMapping = event.playerMapping;
		this.pendingStage = undefined;

		const shouldTransition = oldVisualStage !== config.stage;
		let shouldRemap = false;

		if (shouldTransition) {
			this.visualStage = config.stage;
			this.justRebuilt = true;
		} else {
			if (this.justRebuilt) {
				this.justRebuilt = false;
			} else {
				shouldRemap = true;
			}
		}

		return {
			shouldTransition,
			playerCount: config.playerCount,
			shouldRemap
		};
	}

	shouldSyncToStage(serverStage: number): { shouldTransition: boolean; playerCount: number } {
		if (this.isRebuilding) {
			return { shouldTransition: false, playerCount: 100 };
		}

		if (this.visualStage === serverStage) {
			return { shouldTransition: false, playerCount: 100 };
		}


		const phaseEntry = Object.entries(PhaseState.PHASE_CONFIG).find(([_, config]) => config.stage === serverStage);

		if (!phaseEntry) {
			return { shouldTransition: false, playerCount: 100 };
		}

		const [phaseName, config] = phaseEntry;

		this.currentStage = serverStage;
		this.currentPhase = phaseName;
		this.visualStage = serverStage;
		return {
			shouldTransition: true,
			playerCount: config.playerCount
		};
	}

	isReadyForTransition(): boolean {
		return !this.isRebuilding && this.pendingStage === undefined;
	}

	getCurrentPlayerCount(): number {
		const config = PhaseState.PHASE_CONFIG[this.currentPhase];
		return config ? config.playerCount : 100;
	}

	getRebuildProgress(): number {
		if (!this.isRebuilding || this.rebuildTimeRemaining <= 0) {
			return 1.0;
		}

		const totalRebuildTime = 3000;
		const elapsed = totalRebuildTime - this.rebuildTimeRemaining;
		return Math.min(1.0, Math.max(0.0, elapsed / totalRebuildTime));
	}

	reset(): void {
		this.currentStage = 1;
		this.currentPhase = 'Phase 1';
		this.isRebuilding = false;
		this.rebuildTimeRemaining = 0;
		this.pendingStage = undefined;
		this.playerMapping = {};
		this.visualStage = 1;
		this.justRebuilt = false;
		console.log('🔄 Phase state reset to initial state');
	}

	remapPaddleEntities(entities: Entity[], playerMapping: Record<number, number>): void {
		console.log('🔄 Remapping paddle entities after rebuild:', playerMapping);

		Object.entries(playerMapping).forEach(([originalPlayerId, newPaddleIndex]) => {
			const playerId = parseInt(originalPlayerId);

			const paddleEntity = entities.find(e =>
				e.hasComponent(PaddleComponent) &&
				e.getComponent(PaddleComponent)!.id === playerId
			);

			if (paddleEntity) {
				const paddleComp = paddleEntity.getComponent(PaddleComponent)!;
				const oldIndex = paddleComp.paddleIndex;
				paddleComp.paddleIndex = newPaddleIndex;
				console.log(`📝 Player ${playerId}: paddle index ${oldIndex} → ${newPaddleIndex}`);
			} else {
				console.warn(`⚠️ Could not find paddle entity for player ${playerId}`);
			}
		});

		console.log('✅ Paddle entity remapping complete');
	}

	getDebugInfo(): string {
		return `Phase: ${this.currentPhase} (Logic: ${this.currentStage}, Visual: ${this.visualStage}) | ` +
			`Rebuilding: ${this.isRebuilding} | ` +
			`Pending: ${this.pendingStage || 'none'} | ` +
			`Progress: ${(this.getRebuildProgress() * 100).toFixed(1)}%`;
	}
}
