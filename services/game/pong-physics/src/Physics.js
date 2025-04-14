import { Game } from './Game.js';
import AABBTree from './utils/AABBTree.js';
import { movementSystem } from './ecs/systems.js';
import {
	updateAABB,
	computeCircleBoxMTV,
	resolveCircleCircleCollision
} from './utils/collisionUtils.js';
import { encodeStateUpdate } from './binary.js';

export const Physics = {
	games: new Map(),

	processTick({ gameId, tick, state, inputs }) {
		if (!this.games.has(gameId)) {
			console.log(`[physics] Initializing new game ${gameId}`);
			this.games.set(gameId, new Game(gameId, state));
		}
		const game = this.games.get(gameId);
		const em = game.entityManager;
		const subSteps = 5;
		const dt = 1 / 60 / subSteps;

		for (let i = 0, ilen = inputs.length; i < ilen; i++) {
			const { playerId, input, type } = inputs[i];
			if (type === 'paddleUpdate') {
				game.updatePaddleInput(playerId, input);
			}
		}

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
				if (Math.abs(ballVel.x) < 0.01) ballVel.x = 0;
				if (Math.abs(ballVel.y) < 0.01) ballVel.y = 0;
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
						// if (wall.isActive === true) {
						const { mtv, penetration } = computeCircleBoxMTV(ballPos, ballCollider, wallPos, otherCollider);
						if (penetration > 0) {
							weightedMTVx += mtv.x * penetration;
							weightedMTVy += mtv.y * penetration;
							totalPenetration += penetration;
						}
						// }
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

			const balls = ballEntities;
			const ballIndexMap = new Map();
			for (let i = 0, len = balls.length; i < len; i++) {
				ballIndexMap.set(balls[i], i);
			}
			for (let i = 0, len = balls.length; i < len; i++) {
				const ball = balls[i];
				const ballCollider = ball.getComponent('collider');
				if (ballCollider.type !== 'circle') continue;
				const posA = ball.getComponent('position');
				const velA = ball.getComponent('velocity');
				const potentialColliders = tree.query(ballCollider.aabb);
				for (let j = 0, jLen = potentialColliders.length; j < jLen; j++) {
					const candidate = potentialColliders[j];
					if (candidate === ball) continue;
					if (!candidate.hasComponent('ball')) continue;
					if (ballIndexMap.get(candidate) <= ballIndexMap.get(ball)) continue;
					const candidateCollider = candidate.getComponent('collider');
					if (candidateCollider.type !== 'circle') continue;
					const posB = candidate.getComponent('position');
					const velB = candidate.getComponent('velocity');
					resolveCircleCircleCollision(posA, ballCollider, velA, posB, candidateCollider, velB, 1);
				}
			}
		}

		const tempstate = game.getState();
		return {
			gameId,
			tick,
			balls: tempstate.balls,
			paddles: tempstate.paddles
		};
	},

	handleImmediateInput({ gameId, inputs = [] }) {
		const game = this.games.get(gameId);
		if (!game) {
			console.log('Game not found for gameId:', gameId);
			return;
		}

		console.log('Immediate inputs received:', inputs);
		for (let i = 0, len = inputs.length; i < len; i++) {
			const { playerId, input } = inputs[i];
			console.log('Processing input:', playerId, input);
			if (input.type === 'disableWall') {
				game.setWallOff(playerId);
			} else if (input.type === 'enableWall') {
				game.setWallOn(playerId);
			} else if (input.type === 'newPlayerConnected') {
				game.markAllEntitiesDirty();
			}
		}
	},

	getSerializedSize(obj) {
		return Buffer.byteLength(JSON.stringify(obj), 'utf8');
	},

	removeGame(gameId) {
		if (this.games.has(gameId)) {
			this.games.delete(gameId);
			console.log(`[Physics] Removed game ${gameId}`);
		}
	}
};

