import { Game } from './Game.js';
import AABBTree from './utils/AABBTree.js';
import { movementSystem } from './ecs/systems.js';
import {
	updateAABB,
	computeCircleBoxMTV,
} from './utils/collisionUtils.js';

/**
 * Core physics service: manages multiple Game instances and steps them.
 */

export const Physics = {
	games: new Map(),

	/**
	   * Run one tick of physics for a game.
	   * @param {Object} params
	   * @param {string} params.gameId
	   * @param {number} params.tick
	   * @param {Object} params.state
	   * @param {Array}  params.inputs
	   * @returns {{ gameId: string, tick: number, balls: Array, paddles: Array }}
	   */

	processTick({ gameId, lastState }) {
		if (!this.games.has(gameId)) {
			console.log(`[physics] Initializing new game ${gameId}`);
			this.games.set(gameId, new Game(gameId, lastState));
		}
		let events = [];
		const game = this.games.get(gameId);
		const em = game.entityManager;
		const subSteps = 20;
		const dt = 1 / 60 / subSteps;

		// for (let i = 0, ilen = inputs.length; i < ilen; i++) {
		// 	const { playerId, input, type } = inputs[i];
		// 	if (type === 'paddleUpdate') {
		// 		game.updatePaddleInput(playerId, input);
		// 	}
		// }

		const collidableEntities = em.getEntitiesWithComponents(['position', 'collider']);
		const tree = new AABBTree();
		for (let i = 0, len = collidableEntities.length; i < len; i++) {
			const entity = collidableEntities[i];
			const pos = entity.getComponent('position');
			const collider = entity.getComponent('collider');
			updateAABB(pos, collider);
			tree.insert(entity, collider.aabb);
		}

		for (let step = 0; step < subSteps; step++) {
			movementSystem(em, dt);

			for (let i = 0, len = collidableEntities.length; i < len; i++) {
				const entity = collidableEntities[i];
				const pos = entity.getComponent('position');
				const collider = entity.getComponent('collider');
				updateAABB(pos, collider);
				tree.updateEntity(entity, collider.aabb);
			}

			const ballEntities = em.getEntitiesWithComponents(['ball', 'position', 'velocity', 'collider']);

			for (let i = 0, len = ballEntities.length; i < len; i++) {
				const ball = ballEntities[i];
				const ballVel = ball.getComponent('velocity');
			}

			for (let i = 0, len = ballEntities.length; i < len; i++) {
				const ball = ballEntities[i];
				const ballCollider = ball.getComponent('collider');
				if (ballCollider.type !== 'circle') continue;
				const ballPos = ball.getComponent('position');
				const ballVel = ball.getComponent('velocity');

				let weightedMTVx = 0, weightedMTVy = 0, totalPenetration = 0;
				const potentialCollisions = tree.query(ballCollider.aabb);
				for (let j = 0, jLen = potentialCollisions.length; j < jLen; j++) {
					const other = potentialCollisions[j];
					if (other === ball) continue;
					const otherCollider = other.getComponent('collider');
					if (otherCollider.type === 'box' && other.getComponent('wall')) {
						const wallPos = other.getComponent('position');
						const wall = other.getComponent('wall');

						const { mtv, penetration } = computeCircleBoxMTV(ballPos, ballCollider, wallPos, otherCollider);
						if (wall.isGoal === true && penetration > 0) {
							let scorer = wall.id === 0
								? 1  // right paddle component id
								: 0; // left paddle component id
							scorer = ballPos.x > 0 ? 0 : 1;
							events.push({ type: 'goal', gameId, playerId: scorer });
							break;
						}
						if (penetration > 0) {
							weightedMTVx += mtv.x * penetration;
							weightedMTVy += mtv.y * penetration;
							totalPenetration += penetration;
						}
					}
				}
				if (totalPenetration > 0) {
					const avgMTVx = weightedMTVx / totalPenetration;
					const avgMTVy = weightedMTVy / totalPenetration;
					ballPos.x += avgMTVx;
					ballPos.y += avgMTVy;
					const mag = Math.hypot(avgMTVx, avgMTVy);
					if (mag > 0) {
						const normalX = avgMTVx / mag;
						const normalY = avgMTVy / mag;
						const dot = ballVel.x * normalX + ballVel.y * normalY;
						const restitution = 1;
						ballVel.x -= 2 * dot * normalX * restitution;
						ballVel.y -= 2 * dot * normalY * restitution;
					}
				}
			}

			const paddleEntities = em.getEntitiesWithComponents(['paddle', 'position', 'collider']);
			for (let i = 0, len = ballEntities.length; i < len; i++) {
				const ball = ballEntities[i];
				const ballCollider = ball.getComponent('collider');
				if (ballCollider.type !== 'circle') continue;
				const ballPos = ball.getComponent('position');
				const ballVel = ball.getComponent('velocity');

				let weightedMTVx = 0, weightedMTVy = 0, totalPenetration = 0;
				for (let j = 0, jLen = paddleEntities.length; j < jLen; j++) {
					const paddle = paddleEntities[j];
					const paddleCollider = paddle.getComponent('collider');
					if (paddleCollider.type !== 'box') continue;
					const paddlePos = paddle.getComponent('position');
					const { mtv, penetration } = computeCircleBoxMTV(ballPos, ballCollider, paddlePos, paddleCollider);
					if (penetration > 0) {
						weightedMTVx += mtv.x * penetration;
						weightedMTVy += mtv.y * penetration;
						totalPenetration += penetration;
					}
				}
				if (totalPenetration > 0) {
					const avgMTVx = weightedMTVx / totalPenetration;
					const avgMTVy = weightedMTVy / totalPenetration;
					ballPos.x += avgMTVx;
					ballPos.y += avgMTVy;
					const mag = Math.hypot(avgMTVx, avgMTVy);
					if (mag > 0) {
						const normalX = avgMTVx / mag;
						const normalY = avgMTVy / mag;
						const dot = ballVel.x * normalX + ballVel.y * normalY;
						const restitution = 1;
						ballVel.x -= 2 * dot * normalX * restitution;
						ballVel.y -= 2 * dot * normalY * restitution;
					}
				}
			}
		}

		const tempstate = game.getState();
		return {
			gameId,
			tick,
			balls: tempstate.balls,
			paddles: tempstate.paddles,
			events
		};
	},

	/**
  * Handle inputs that should be applied immediately (no waiting for next tick).
  * @param {Object} payload
  * @param {string} payload.gameId
  * @param {Array<{playerId: number, input: {type: string}}>} [payload.inputs]
  */
	handleImmediateInput({ gameId, inputs = [] }) {
		const game = this.games.get(gameId);
		if (!game) {
			console.log('Game not found for gameId:', gameId);
			return;
		}

		// console.log('Immediate inputs received:', inputs);
		for (let i = 0, len = inputs.length; i < len; i++) {
			const { playerId, input } = inputs[i];
			// console.log('Processing input:', playerId, input);
			if (input.type === 'disableWall') {
				game.setWallOff(playerId);
			} else if (input.type === 'enableWall') {
				game.setWallOn(playerId);
			} else if (input.type === 'newPlayerConnected') {
				game.markAllEntitiesDirty();
			}
			else if (input.type === 'resetBall') {
				game.resetBall();
			}
			else if (input.type === 'serve') {
				game.launchBall();
			}
		}
	},

	/**
  * Remove a game from memory (when it ends).
  * @param {string} gameId
  */
	removeGame(gameId) {
		if (this.games.has(gameId)) {
			this.games.delete(gameId);
			console.log(`[Physics] Removed game ${gameId}`);
		}
	}
};

