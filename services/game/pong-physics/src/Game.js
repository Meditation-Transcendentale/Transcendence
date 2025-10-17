// services/game/pong-physics/src/Game.js
import { createEntityManager } from './ecs/ecs.js';
import { Position, Velocity, CircleCollider, BoxCollider } from './ecs/components.js';
import { movementSystem } from './ecs/systems.js';
import { config } from './utils/config.js';

/**
 * Represents a single Pong game’s state and logic.
 */

export class Game {
	/**
  * @param {string} gameId
  * @param {Object} initialState
  * @param {Array}  initialState.balls   Array of ball descriptors
  * @param {Object} [initialState.options]
  */
	constructor(gameId) {
		this.gameId = gameId;
		this.entityManager = createEntityManager();
		this.paddleEntities = {};
		this.wallEntities = {};
		this.options = {};
		this.players = this.options.players || [];
		this.now = Date.now();
		this.delay = 3000;
		this.launch = false;
		this.start = false;

		this.init();
		// this.launchBall();
	}

	/** Initialize entities: one ball, two paddles, and four walls */
	init() {
		const ballEntity = this.entityManager.createEntity();
		ballEntity
			.addComponent('position', Position(0, 0))
			.addComponent('velocity', Velocity(0, 0))
			.addComponent('ball', { id: 0, radius: config.BALL_RADIUS })
			.addComponent('collider', CircleCollider(config.BALL_RADIUS));

		for (let i = 0; i < 2; i++) {
			const offset = (config.arenaWidth / 2 * config.paddleOffsetRatio) * config.scaleFactor;
			const x = (i === 0 ? 1 : -1) * offset;
			const y = 0;
			const rotation_y = (i === 0 ? 90 : -90) * Math.PI / 180;

			const paddleEntity = this.entityManager.createEntity();
			paddleEntity
				.addComponent('position', Position(x, y))
				.addComponent('paddle', {
					id: i,
					move: 0,
					speed: config.paddleSpeed,
					offset: 0,
					maxOffset: config.MAX_OFFSET,
					isConnected: !!this.players[i],
					dirty: true
				})
				.addComponent('collider', BoxCollider(config.paddleWidth, config.paddleHeight, rotation_y));

			this.paddleEntities[i] = paddleEntity;
		}

		for (let i = 0; i < 2; i++) {
			let x, y, rotation, wallWidth, isGoal;

			if (i % 2 === 0) {
				x = 0;
				y = (config.arenaHeight / 2 + config.wallHeight / 2) * config.scaleFactor;
				rotation = 0;
				wallWidth = config.arenaWidth * config.scaleFactor;
				isGoal = false;
			} else {
				x = (config.arenaWidth / 2 * config.paddleOffsetRatio + config.wallHeight) * config.scaleFactor;
				y = 0;
				rotation = 90 * Math.PI / 180;
				wallWidth = config.arenaHeight * config.scaleFactor;
				isGoal = true;
			}

			const wallEntity1 = this.entityManager.createEntity();
			wallEntity1
				.addComponent('position', Position(x, y))
				.addComponent('wall', {
					id: i,
					rotation: rotation,
					isActive: true,
					wallWidth: wallWidth,
					isGoal: isGoal,
					dirty: true
				})
				.addComponent('collider', BoxCollider(wallWidth, config.wallHeight, rotation));
			this.wallEntities[i] = (wallEntity1);

			const wallEntity2 = this.entityManager.createEntity();
			wallEntity2
				.addComponent('position', Position(-x, -y))
				.addComponent('wall', {
					id: i,
					rotation: rotation,
					isActive: true,
					wallWidth: wallWidth,
					isGoal: isGoal,
					dirty: true
				})
				.addComponent('collider', BoxCollider(wallWidth, config.wallHeight, rotation));
			this.wallEntities[i] = (wallEntity2);
		}
	}

	/**
	   * Advance the game by one frame.
	   * @param {number} tick             The current tick index
	   * @param {Array<{playerId: number, input: Object}>} [inputs]
	   * @returns {{ balls: Array, paddles: Array }}
	   */
	update(tick, inputs) {
		for (const { playerId, input } of inputs || []) {
			this.updatePaddleInput(playerId, input);
		}
		movementSystem(this.entityManager, 1 / 60);
		return this.getState();
	}

	/**
   * Apply a single paddle move.
   * @param {number} playerId
   * @param {{offset: number, x: number, y: number}} input
   */
	updatePaddleInput(playerId, move) {
		const paddleEntity = this.paddleEntities[playerId];
		if (!paddleEntity) return;

		const paddle = paddleEntity.getComponent('paddle');
		paddle.move = move;
	}

	setWallOff(playerId) {
		const wall = this.wallEntities[playerId];
		console.log(wall);
		if (wall) {
			console.log("wall is off");
			wall.getComponent('wall').isActive = false;
			wall.getComponent('wall').dirty = true;
		}

		const paddle = this.paddleEntities[playerId]?.getComponent('paddle');
		console.log(paddle);
		if (paddle) {
			console.log("paddle is off");
			paddle.isConnected = true;
			paddle.dirty = true;
		}
	}

	setWallOn(playerId) {
		const wall = this.wallEntities[playerId];
		if (wall) {
			wall.getComponent('wall').isActive = true;
			wall.getComponent('wall').dirty = true;
		}

		const paddle = this.paddleEntities[playerId]?.getComponent('paddle');
		if (paddle) {
			paddle.isConnected = false;
			paddle.dirty = true;
		}
	}

	getFullState() {
		const balls = this.entityManager.getEntitiesWithComponents(['ball', 'position', 'velocity']).map(entity => {
			const pos = entity.getComponent('position');
			const vel = entity.getComponent('velocity');
			const ball = entity.getComponent('ball');
			return { id: ball.id, x: pos.x, y: pos.y, vx: vel.x, vy: vel.y };
		});

		const walls = Object.values(this.wallEntities).map(entity => {
			const wall = entity.getComponent('wall');
			return { id: wall.id, wall: wall.isActive };
		});

		const paddles = Object.keys(this.paddleEntities).reduce((acc, key) => {
			const paddleEntity = this.paddleEntities[key];
			const paddle = paddleEntity.getComponent('paddle');
			acc[key] = { id: paddle.id, offset: paddle.offset, connected: paddle.isConnected };
			return acc;
		}, {});

		return { balls, walls, paddles };
	}

	round(n, decimals = 2) {
		const factor = Math.pow(10, decimals);
		return Math.round(n * factor) / factor;
	}

	getState() {
		function round(n, decimals = 2) {
			const factor = Math.pow(10, decimals);
			return Math.round(n * factor) / factor;
		}

		const balls = this.entityManager.getEntitiesWithComponents(['ball', 'position', 'velocity'])
			.map(entity => {
				const pos = entity.getComponent('position');
				const vel = entity.getComponent('velocity');
				const ball = entity.getComponent('ball');
				return {
					id: ball.id,
					x: round(pos.x, 2),
					y: round(pos.y, 2),
					vx: round(vel.x, 2),
					vy: round(vel.y, 2)
				};

			});

		// const walls = Object.values(this.wallEntities)
		// 	.filter(e => e.getComponent('wall').dirty)
		// 	.map(entity => {
		// 		const wall = entity.getComponent('wall');
		// 		wall.dirty = false;
		// 		return { id: wall.id, wall: wall.isActive };
		// 	});

		const paddles = Object.keys(this.paddleEntities)
			.map(key => {
				const paddleEntity = this.paddleEntities[key];
				const paddle = paddleEntity.getComponent('paddle');
				// if (!paddle.dirty) return null;
				// paddle.dirty = false;
				return { id: paddle.id, move: paddle.move, offset: paddle.offset };
			});

		return { balls, paddles };
	}
	markAllEntitiesDirty() {
		// Object.values(this.wallEntities).forEach(entity => {
		// 	const wall = entity.getComponent('wall');
		// 	wall.dirty = true;
		// });
		Object.values(this.paddleEntities).forEach(entity => {
			const paddle = entity.getComponent('paddle');
			paddle.dirty = true;
		});
	}
	resetBall() {
		const ball = this.entityManager
			.getEntitiesWithComponents(['ball'])[0];
		const pos = ball.getComponent('position');
		pos.x = 0;
		pos.y = 0;

		const vel = ball.getComponent('velocity');
		const speed = 10; // adjust as desired
		const angleRange = Math.PI / 4; // 45°
		const baseAngle = Math.random() < 0.5
			? Math.random() * angleRange - angleRange / 2           // -22.5° … +22.5°
			: Math.PI + (Math.random() * angleRange - angleRange / 2); // 157.5° … 202.5°

		vel.x = 0;
		vel.y = 0;
		this.launch = false;
		// vel.x = Math.cos(baseAngle) * speed;
		// vel.y = 0;
		// vel.y = Math.sin(baseAngle) * speed;
		this.now = Date.now();
	}
	launchBall() {
		const ball = this.entityManager.getEntitiesWithComponents(['ball'])[0];
		const pos = ball.getComponent('position');
		pos.x = 0; pos.y = 0;
		const vel = ball.getComponent('velocity');
		const speed = config.ballSpeed || 10;
		const angle = (Math.random() * Math.PI / 2) - (Math.PI / 4);
		const dir = Math.random() < 0.5 ? -1 : 1;
		vel.x = Math.cos(angle) * speed * dir;
		vel.y = Math.sin(angle) * speed;
		this.launch = true;
	}

}
