// Physics.js
import AABBTree from './AABBTree.js';
import { movementSystem } from './systems.js';
import { updateAABB, computeCircleBoxMTV, resolveCircleCircleCollision } from './utils/collisionUtils.js';
import Game from './Game.js';

const Physics = {
	update(deltaTime) {
		const subSteps = 20;
		const dt = deltaTime / subSteps;

		const collidableEntities = Game.entityManager.getEntitiesWithComponents(['position', 'collider']);
		const tree = new AABBTree();
		collidableEntities.forEach(entity => {
			const pos = entity.getComponent('position');
			const collider = entity.getComponent('collider');
			updateAABB(pos, collider);
			tree.insert(entity, collider.aabb);
		});

		for (let step = 0; step < subSteps; step++) {
			movementSystem(Game.entityManager, dt);

			collidableEntities.forEach(entity => {
				const pos = entity.getComponent('position');
				const collider = entity.getComponent('collider');
				updateAABB(pos, collider);
				tree.updateEntity(entity, collider.aabb);
			});

			// Ball–wall collisions.
			const ballEntities = Game.entityManager.getEntitiesWithComponents(['ball', 'position', 'velocity', 'collider']);
			ballEntities.forEach(ball => {
				const ballCollider = ball.getComponent('collider');
				if (ballCollider.type !== 'circle') return;
				const ballPos = ball.getComponent('position');
				const ballVel = ball.getComponent('velocity');

				let weightedMTV = { x: 0, y: 0 };
				let totalPenetration = 0;
				const potentialCollisions = tree.query(ballCollider.aabb);
				potentialCollisions.forEach(other => {
					if (other === ball) return;
					const otherCollider = other.getComponent('collider');
					if (otherCollider.type === 'box' && other.getComponent('wall')) {
						const wallPos = other.getComponent('position');
						const wall = other.getComponent('wall');

						// if (wall.isActive === true) {
						const { mtv, penetration } = computeCircleBoxMTV(ballPos, ballCollider, wallPos, otherCollider);
						if (penetration > 0) {
							weightedMTV.x += mtv.x * penetration;
							weightedMTV.y += mtv.y * penetration;
							totalPenetration += penetration;
							// }
						}
					}
				});

				if (totalPenetration > 0) {
					const avgMTV = {
						x: weightedMTV.x / totalPenetration,
						y: weightedMTV.y / totalPenetration
					};

					ballPos.x += avgMTV.x;
					ballPos.y += avgMTV.y;

					const mag = Math.hypot(avgMTV.x, avgMTV.y);
					if (mag > 0) {
						const normal = { x: avgMTV.x / mag, y: avgMTV.y / mag };
						const dot = ballVel.x * normal.x + ballVel.y * normal.y;
						const restitution = 1;
						ballVel.x = ballVel.x - 2 * dot * normal.x * restitution;
						ballVel.y = ballVel.y - 2 * dot * normal.y * restitution;
					}
				}
			});

			// Ball–paddle collisions.
			const paddleEntities = Game.entityManager.getEntitiesWithComponents(['paddle', 'position', 'collider']);
			ballEntities.forEach(ball => {
				const ballCollider = ball.getComponent('collider');
				if (ballCollider.type !== 'circle') return;
				const ballPos = ball.getComponent('position');
				const ballVel = ball.getComponent('velocity');

				let weightedMTV = { x: 0, y: 0 };
				let totalPenetration = 0;

				paddleEntities.forEach(paddle => {
					const paddleCollider = paddle.getComponent('collider');
					if (paddleCollider.type !== 'box') return;
					const paddlePos = paddle.getComponent('position');
					const { mtv, penetration } = computeCircleBoxMTV(ballPos, ballCollider, paddlePos, paddleCollider);
					if (penetration > 0) {
						weightedMTV.x += mtv.x * penetration;
						weightedMTV.y += mtv.y * penetration;
						totalPenetration += penetration;
					}
				});

				if (totalPenetration > 0) {
					const avgMTV = {
						x: weightedMTV.x / totalPenetration,
						y: weightedMTV.y / totalPenetration
					};

					ballPos.x += avgMTV.x;
					ballPos.y += avgMTV.y;

					const mag = Math.hypot(avgMTV.x, avgMTV.y);
					if (mag > 0) {
						const normal = { x: avgMTV.x / mag, y: avgMTV.y / mag };
						const dot = ballVel.x * normal.x + ballVel.y * normal.y;
						const restitution = 1.2;
						ballVel.x = ballVel.x - 2 * dot * normal.x * restitution;
						ballVel.y = ballVel.y - 2 * dot * normal.y * restitution;
					}
				}
			});

			// Ball–ball collisions using broad-phase query.
			const balls = Game.entityManager.getEntitiesWithComponents(['ball', 'position', 'velocity', 'collider']);
			const ballIndexMap = new Map();
			balls.forEach((ball, index) => {
				ballIndexMap.set(ball, index);
			});

			balls.forEach(ball => {
				const ballCollider = ball.getComponent('collider');
				if (ballCollider.type !== 'circle') return;

				const posA = ball.getComponent('position');
				const velA = ball.getComponent('velocity');

				const potentialColliders = tree.query(ballCollider.aabb);

				potentialColliders.forEach(candidate => {
					if (candidate === ball) return;
					if (!candidate.hasComponent('ball')) return;
					if (ballIndexMap.get(candidate) <= ballIndexMap.get(ball)) return;

					const candidateCollider = candidate.getComponent('collider');
					if (candidateCollider.type !== 'circle') return;

					const posB = candidate.getComponent('position');
					const velB = candidate.getComponent('velocity');

					resolveCircleCircleCollision(posA, ballCollider, velA, posB, candidateCollider, velB, 1);
				});
			});
		}
	},

	getState() {
		return Game.getState();
	},

	clearDirty() {
		Game.clearDirty();
	}
};

export default Physics;

// import AABBTree from './AABBTree.js';
// import { movementSystem } from './systems.js';
// import { updateAABB, computeCircleBoxMTV, resolveCircleCircleCollision } from './utils/collisionUtils.js';
// import Game from './Game.js';
//
// const Physics = {
// 	update(deltaTime) {
// 		const subSteps = 20;
// 		const dt = deltaTime / subSteps;
//
// 		for (let step = 0; step < subSteps; step++) {
// 			movementSystem(Game.entityManager, dt);
//
// 			const collidableEntities = Game.entityManager.getEntitiesWithComponents(['position', 'collider']);
// 			collidableEntities.forEach(entity => {
// 				const pos = entity.getComponent('position');
// 				const collider = entity.getComponent('collider');
// 				updateAABB(pos, collider);
// 			});
//
// 			const tree = new AABBTree();
// 			collidableEntities.forEach(entity => {
// 				const collider = entity.getComponent('collider');
// 				tree.insert(entity, collider.aabb);
// 			});
//
// 			// ball–wall collisions.
// 			const ballEntities = Game.entityManager.getEntitiesWithComponents(['ball', 'position', 'velocity', 'collider']);
// 			ballEntities.forEach(ball => {
// 				const ballCollider = ball.getComponent('collider');
// 				if (ballCollider.type !== 'circle') return;
// 				const ballPos = ball.getComponent('position');
// 				const ballVel = ball.getComponent('velocity');
//
// 				let weightedMTV = { x: 0, y: 0 };
// 				let totalPenetration = 0;
// 				const potentialCollisions = tree.query(ballCollider.aabb);
// 				potentialCollisions.forEach(other => {
// 					if (other === ball) return;
// 					const otherCollider = other.getComponent('collider');
// 					if (otherCollider.type === 'box' && other.getComponent('wall')) {
// 						const wallPos = other.getComponent('position');
// 						const wall = other.getComponent('wall');
//
// 						if (wall.isActive === true) {
// 							const { mtv, penetration } = computeCircleBoxMTV(ballPos, ballCollider, wallPos, otherCollider);
// 							if (penetration > 0) {
// 								weightedMTV.x += mtv.x * penetration;
// 								weightedMTV.y += mtv.y * penetration;
// 								totalPenetration += penetration;
// 							}
// 						}
// 					}
// 				});
//
// 				if (totalPenetration > 0) {
// 					const avgMTV = {
// 						x: weightedMTV.x / totalPenetration,
// 						y: weightedMTV.y / totalPenetration
// 					};
//
// 					ballPos.x += avgMTV.x;
// 					ballPos.y += avgMTV.y;
//
// 					const mag = Math.hypot(avgMTV.x, avgMTV.y);
// 					if (mag > 0) {
// 						const normal = { x: avgMTV.x / mag, y: avgMTV.y / mag };
// 						const dot = ballVel.x * normal.x + ballVel.y * normal.y;
// 						const restitution = 1;
// 						ballVel.x = ballVel.x - 2 * dot * normal.x * restitution;
// 						ballVel.y = ballVel.y - 2 * dot * normal.y * restitution;
// 					}
// 				}
// 			});
//
// 			const paddleEntities = Game.entityManager.getEntitiesWithComponents(['paddle', 'position', 'collider']);
// 			ballEntities.forEach(ball => {
// 				const ballCollider = ball.getComponent('collider');
// 				if (ballCollider.type !== 'circle') return;
// 				const ballPos = ball.getComponent('position');
// 				const ballVel = ball.getComponent('velocity');
//
// 				let weightedMTV = { x: 0, y: 0 };
// 				let totalPenetration = 0;
//
// 				paddleEntities.forEach(paddle => {
// 					const paddleCollider = paddle.getComponent('collider');
// 					if (paddleCollider.type !== 'box') return;
// 					const paddlePos = paddle.getComponent('position');
// 					const { mtv, penetration } = computeCircleBoxMTV(ballPos, ballCollider, paddlePos, paddleCollider);
// 					if (penetration > 0) {
// 						weightedMTV.x += mtv.x * penetration;
// 						weightedMTV.y += mtv.y * penetration;
// 						totalPenetration += penetration;
// 					}
// 				});
//
// 				if (totalPenetration > 0) {
// 					const avgMTV = {
// 						x: weightedMTV.x / totalPenetration,
// 						y: weightedMTV.y / totalPenetration
// 					};
//
// 					ballPos.x += avgMTV.x;
// 					ballPos.y += avgMTV.y;
//
// 					const mag = Math.hypot(avgMTV.x, avgMTV.y);
// 					if (mag > 0) {
// 						const normal = { x: avgMTV.x / mag, y: avgMTV.y / mag };
// 						const dot = ballVel.x * normal.x + ballVel.y * normal.y;
// 						const restitution = 1.2;
// 						ballVel.x = ballVel.x - 2 * dot * normal.x * restitution;
// 						ballVel.y = ballVel.y - 2 * dot * normal.y * restitution;
// 					}
// 				}
// 			});
// 			const balls = Game.entityManager.getEntitiesWithComponents(['ball', 'position', 'velocity', 'collider']);
// 			const ballIndexMap = new Map();
// 			balls.forEach((ball, index) => {
// 				ballIndexMap.set(ball, index);
// 			});
//
// 			balls.forEach(ball => {
// 				const ballCollider = ball.getComponent('collider');
// 				if (ballCollider.type !== 'circle') return;
//
// 				const posA = ball.getComponent('position');
// 				const velA = ball.getComponent('velocity');
//
// 				const potentialColliders = tree.query(ballCollider.aabb);
//
// 				potentialColliders.forEach(candidate => {
// 					if (candidate === ball) return;
//
// 					if (!candidate.hasComponent('ball')) return;
//
// 					if (ballIndexMap.get(candidate) <= ballIndexMap.get(ball)) return;
//
// 					const candidateCollider = candidate.getComponent('collider');
// 					if (candidateCollider.type !== 'circle') return;
//
// 					const posB = candidate.getComponent('position');
// 					const velB = candidate.getComponent('velocity');
//
// 					resolveCircleCircleCollision(posA, ballCollider, velA, posB, candidateCollider, velB, 1);
// 				});
// 			});
// 		}
// 	},
//
// 	getState() {
// 		return Game.getState();
// 	},
//
// 	clearDirty() {
// 		Game.clearDirty();
// 	}
// };
//
// export default Physics;
