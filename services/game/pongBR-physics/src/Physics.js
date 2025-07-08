
// import { Game } from './Game.js';
// import AABBTree from './utils/AABBTree.js';
// import { movementSystem } from './ecs/systems.js';
// import {
// 	updateAABB,
// 	computeCircleBoxMTV,
// } from './utils/collisionUtils.js';
//
// /**
//  * Core physics service: manages multiple Game instances and steps them.
//  */
//
// const DEBUG_PHYSICS = true;  // flip to false in prod
//
// function mark(label) {
// 	if (DEBUG_PHYSICS && performance && performance.mark) {
// 		performance.mark(`${label}-start`);
// 	}
// }
//
// function measure(label) {
// 	if (DEBUG_PHYSICS && performance && performance.measure) {
// 		performance.mark(`${label}-end`);
// 		performance.measure(label,
// 			`${label}-start`,
// 			`${label}-end`
// 		);
// 		const entries = performance.getEntriesByName(label);
// 		console.log(`[physics][${label}]`, entries[0].duration.toFixed(3), 'ms');
// 		performance.clearMarks(`${label}-start`);
// 		performance.clearMarks(`${label}-end`);
// 		performance.clearMeasures(label);
// 	}
// }
//
// const MAX_OFFSET = 8.4;
// const SPEED = 10;
// export const Physics = {
// 	games: new Map(),
//
// 	/**
// 	   * Run one tick of physics for a game.
// 	   * @param {Object} params
// 	   * @param {string} params.gameId
// 	   * @param {number} params.tick
// 	   * @param {Object} params.state
// 	   * @param {Array}  params.inputs
// 	   * @returns {{ gameId: string, tick: number, balls: Array, paddles: Array }}
// 	   */
//
// 	// message PhysicsRequest {
// 	//   string gameId = 1;
// 	//   int64 tick = 2;
// 	//   repeated PaddleInput input = 3;
// 	//   int32 stage = 4; // BR mode stage; others: ignored
// 	// }
// 	processTick({ gameId, tick, input }) {
// 		if (!this.games.has(gameId)) {
// 			console.log(`[physics] Initializing new game ${gameId}`);
// 			this.games.set(gameId, new Game(gameId));
// 		}
// 		// console.log(performance.now());
// 		mark('physics');
//
// 		let events = [];
// 		const game = this.games.get(gameId);
// 		const em = game.entityManager;
// 		const subSteps = 10;
// 		const dt = 1 / 60 / subSteps;
//
// 		if (input && Array.isArray(input)) {
// 			for (let i = 0; i < input.length; i++) {
// 				const { id, move } = input[i];
// 				game.updatePaddleInput(id, move);
//
// 			}
// 		}
//
// 		const paddles = em.getEntitiesWithComponents(['paddle', 'position']);
//
// 		// mark('paddle-update');
// 		for (let i = 0; i < paddles.length; i++) {
// 			const entity = paddles[i];
// 			const paddle = entity.getComponent('paddle');
// 			const position = entity.getComponent('position');
//
// 			const move = paddle.move ?? 0;
// 			if (move === 0)
// 				continue;
// 			let offset = paddle.offset ?? 0;
//
// 			const velocity = move * SPEED * 1 / 60;
// 			offset += velocity;
//
// 			offset = Math.max(-MAX_OFFSET, Math.min(offset, MAX_OFFSET));
// 			paddle.offset = offset;
//
// 			if (i === 0)
// 				position.y = -offset;
// 			else
// 				position.y = offset;
// 			paddle.dirty = true;
// 		}
//
// 		// measure('paddle-update');
// 		// mark('tree-build');
// 		const collidableEntities = em.getEntitiesWithComponents(['position', 'collider']);
// 		const tree = new AABBTree();
// 		for (let i = 0, len = collidableEntities.length; i < len; i++) {
// 			const entity = collidableEntities[i];
// 			const pos = entity.getComponent('position');
// 			const collider = entity.getComponent('collider');
// 			updateAABB(pos, collider);
// 			tree.insert(entity, collider.aabb);
// 		}
// 		// measure('tree-build');
//
// 		for (let step = 0; step < subSteps; step++) {
// 			// mark('movement');
// 			movementSystem(em, dt);
// 			// measure('movement');
//
// 			// mark('tree-update');
// 			for (let i = 0, len = collidableEntities.length; i < len; i++) {
// 				const entity = collidableEntities[i];
// 				const pos = entity.getComponent('position');
// 				const collider = entity.getComponent('collider');
// 				updateAABB(pos, collider);
// 				tree.updateEntity(entity, collider.aabb);
// 			}
// 			// measure('tree-update');
//
// 			const ballEntities = em.getEntitiesWithComponents(['ball', 'position', 'velocity', 'collider']);
//
// 			// for (let i = 0, len = ballEntities.length; i < len; i++) {
// 			// 	const ball = ballEntities[i];
// 			// 	const ballCollider = ball.getComponent('collider');
// 			// 	if (ballCollider.type !== 'circle') continue;
// 			// 	const ballPos = ball.getComponent('position');
// 			// 	const ballVel = ball.getComponent('velocity');
// 			//
// 			// 	let weightedMTVx = 0, weightedMTVy = 0, totalPenetration = 0;
// 			// 	const potentialCollisions = tree.query(ballCollider.aabb);
// 			// 	for (let j = 0, jLen = potentialCollisions.length; j < jLen; j++) {
// 			// 		const other = potentialCollisions[j];
// 			// 		if (other === ball) continue;
// 			// 		const otherCollider = other.getComponent('collider');
// 			// 		if (otherCollider.type === 'box' && other.getComponent('wall')) {
// 			// 			const wallPos = other.getComponent('position');
// 			// 			const wall = other.getComponent('wall');
// 			//
// 			// 			const { mtv, penetration } = computeCircleBoxMTV(ballPos, ballCollider, wallPos, otherCollider);
// 			// 			// if (wall.isGoal === true && penetration > 0) {
// 			// 			// 	// let scorer = wall.id === 0
// 			// 			// 	// 	? 0  // right paddle component id
// 			// 			// 	// 	: 1; // left paddle component id
// 			// 			// 	let scorer = ballPos.x > 0 ? 1 : 0;
// 			// 			// 	events.push({ type: 'goal', gameId, playerId: scorer });
// 			// 			// 	console.log(`Scorer id = ${scorer}`);
// 			// 			// 	game.resetBall();
// 			// 			// 	break;
// 			// 			// }
// 			// 			if (penetration > 0) {
// 			// 				weightedMTVx += mtv.x * penetration;
// 			// 				weightedMTVy += mtv.y * penetration;
// 			// 				totalPenetration += penetration;
// 			// 			}
// 			// 		}
// 			// 	}
// 			// 	if (totalPenetration > 0) {
// 			// 		const avgMTVx = weightedMTVx / totalPenetration;
// 			// 		const avgMTVy = weightedMTVy / totalPenetration;
// 			// 		ballPos.x += avgMTVx;
// 			// 		ballPos.y += avgMTVy;
// 			// 		const mag = Math.hypot(avgMTVx, avgMTVy);
// 			// 		if (mag > 0) {
// 			// 			const normalX = avgMTVx / mag;
// 			// 			const normalY = avgMTVy / mag;
// 			// 			const dot = ballVel.x * normalX + ballVel.y * normalY;
// 			// 			const restitution = 1;
// 			// 			ballVel.x -= 2 * dot * normalX * restitution;
// 			// 			ballVel.y -= 2 * dot * normalY * restitution;
// 			// 		}
// 			// 	}
// 			// }
//
// 			// mark('collision-detect');
// 			const paddleEntities = em.getEntitiesWithComponents(['paddle', 'position', 'collider']);
// 			for (let i = 0, len = ballEntities.length; i < len; i++) {
// 				const ball = ballEntities[i];
// 				const ballCollider = ball.getComponent('collider');
// 				if (ballCollider.type !== 'circle') continue;
// 				const ballPos = ball.getComponent('position');
// 				const ballVel = ball.getComponent('velocity');
// 				let collidedPaddle = null;
// 				let weightedMTVx = 0, weightedMTVy = 0, totalPenetration = 0;
// 				for (let j = 0, jLen = paddleEntities.length; j < jLen; j++) {
// 					const paddle = paddleEntities[j];
// 					const paddleCollider = paddle.getComponent('collider');
// 					if (paddleCollider.type !== 'box') continue;
// 					const paddlePos = paddle.getComponent('position');
// 					const { mtv, penetration } = computeCircleBoxMTV(ballPos, ballCollider, paddlePos, paddleCollider);
// 					if (penetration > 0) {
// 						weightedMTVx += mtv.x * penetration;
// 						weightedMTVy += mtv.y * penetration;
// 						totalPenetration += penetration;
// 						if (!collidedPaddle) {
// 							collidedPaddle = paddle;
// 						}
// 					}
// 				}
// 				if (totalPenetration > 0) {
// 					const avgMTVx = weightedMTVx / totalPenetration;
// 					const avgMTVy = weightedMTVy / totalPenetration;
//
// 					ballPos.x += avgMTVx;
// 					ballPos.y += avgMTVy;
//
// 					if (collidedPaddle) {
// 						const paddlePos = collidedPaddle.getComponent('position');
// 						const paddleCollider = collidedPaddle.getComponent('collider');
// 						const paddleHalfHeight = paddleCollider.width / 2;
// 						const relativeIntersectY = ballPos.y - paddlePos.y;
//
// 						let rawNormY = relativeIntersectY / paddleHalfHeight;
// 						rawNormY = Math.max(-1, Math.min(1, rawNormY));
//
// 						const deadZone = 0.;
// 						let mappedY;
// 						if (Math.abs(rawNormY) < deadZone) {
// 							mappedY = 0;
// 						} else {
// 							mappedY = rawNormY > 0
// 								? (rawNormY - deadZone) / (1 - deadZone)
// 								: (rawNormY + deadZone) / (1 - deadZone);
// 						}
//
// 						const maxBounceAngle = (75 * Math.PI) / 180;
// 						const bounceAngle = mappedY * maxBounceAngle;
//
// 						const isLeftPaddle = paddlePos.x < 0;
// 						const directionX = isLeftPaddle ? +1.2 : -1.2;
// 						const speed = Math.hypot(ballVel.x, ballVel.y);
//
// 						ballVel.x = speed * Math.cos(-bounceAngle) * directionX;
// 						ballVel.y = speed * -Math.sin(-bounceAngle);
//
// 						const maxSpeed = 150;
// 						const newSpeed = Math.hypot(ballVel.x, ballVel.y);
// 						if (newSpeed > maxSpeed) {
// 							const scale = maxSpeed / newSpeed;
// 							ballVel.x *= scale;
// 							ballVel.y *= scale;
// 						}
// 					}
// 				}
// 			}
// 		}
// 		// measure('collision-detect');
// 		measure('physics');
//
// 		const tempstate = game.getState();
// 		return {
// 			gameId,
// 			tick: tick,
// 			balls: tempstate.balls,
// 			paddles: tempstate.paddles,
// 			events
// 		};
// 	},
//
// 	/**
//   * Handle inputs that should be applied immediately (no waiting for next tick).
//   * @param {Object} payload
//   * @param {string} payload.gameId
//   * @param {Array<{playerId: number, input: {type: string}}>} [payload.inputs]
//   */
// 	handleImmediateInput({ gameId, inputs = [] }) {
// 		const game = this.games.get(gameId);
// 		if (!game) {
// 			console.log('Game not found for gameId:', gameId);
// 			return;
// 		}
//
// 		// console.log('Immediate inputs received:', inputs);
// 		for (let i = 0, len = inputs.length; i < len; i++) {
// 			const { playerId, input } = inputs[i];
// 			// console.log('Processing input:', playerId, input);
// 			if (input.type === 'disableWall') {
// 				game.setWallOff(playerId);
// 			} else if (input.type === 'enableWall') {
// 				game.setWallOn(playerId);
// 			} else if (input.type === 'newPlayerConnected') {
// 				game.markAllEntitiesDirty();
// 			}
// 			else if (input.type === 'resetBall') {
// 				game.resetBall();
// 			}
// 			else if (input.type === 'serve') {
// 				game.launchBall();
// 			}
// 		}
// 	},
//
// 	/**
//   * Remove a game from memory (when it ends).
//   * @param {string} gameId
//   */
// 	removeGame(gameId) {
// 		if (this.games.has(gameId)) {
// 			this.games.delete(gameId);
// 			console.log(`[Physics] Removed game ${gameId}`);
// 		}
// 	}
// };
//
//

// services/game/pong-physics/src/Physics.js

import { PhysicsEngine } from './physicsEngine.js';

export const Physics = {
	games: new Map(),

	processTick({ gameId, tick, inputs }) {
		if (!this.games.has(gameId)) {
			const eng = new PhysicsEngine();
			eng.initBattleRoyale({
				numPlayers: eng.cfg.MAX_PLAYERS,
				numBalls: eng.cfg.INITIAL_BALLS
			});
			this.games.set(gameId, eng);
		}

		const eng = this.games.get(gameId);

		// apply paddle inputs
		if (Array.isArray(inputs)) {
			for (const { playerId, move } of inputs) {
				eng.updatePaddleInput(playerId, move);
			}
		}

		const { balls, paddles, events } = eng.step();
		return { gameId, tick, balls, paddles, events };
	},

	handleImmediateInput({ gameId, inputs = [] }) {
		const eng = this.games.get(gameId);
		if (!eng) return;
		for (const { playerId, input } of inputs) {
			if (input.type === 'disableWall') {
				// find wall ent and zero its mask bit:
				const wEnt = [...eng.pd.mask.entries()]
					.find(([i, m]) => m & (1 << 2) && eng.paddleIdToEnt.get(playerId) != null)?.[0];
				if (wEnt != null) eng.pd.mask[wEnt] &= ~(1 << 2);
			}
			// handle other immediate inputs similarly…
		}
	},

	removeGame(gameId) {
		this.games.delete(gameId);
	}
};

