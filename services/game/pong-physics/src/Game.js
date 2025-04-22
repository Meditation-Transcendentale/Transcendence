// services/game/pongBR-physics/src/Game.js
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
	constructor(gameId, initialState) {
		this.gameId = gameId;
		this.entityManager = createEntityManager();
		this.paddleEntities = {};
		this.wallEntities = {};
		this.state = initialState;
		this.options = initialState.options || {};
		this.players = this.options.players || [];

		this.init();
	}

	/** Initialize entities: one ball, two paddles, and four walls */
	init() {
		const balls = this.state.balls;
		const ball = balls[0];
		const ballEntity = this.entityManager.createEntity();
		ballEntity
			.addComponent('position', Position(ball.x, ball.y))
			.addComponent('velocity', Velocity(ball.vx, ball.vy))
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
			let x, y, rotation, wallWidth;

			if (i % 2 === 0) {
				x = 0;
				y = (config.arenaHeight / 2 + config.wallHeight / 2) * config.scaleFactor;
				rotation = 0;
				wallWidth = config.arenaWidth * config.scaleFactor;
			} else {
				x = (config.arenaWidth / 2 + config.wallHeight) * config.scaleFactor;
				y = 0;
				rotation = 90 * Math.PI / 180;
				wallWidth = config.arenaHeight * config.scaleFactor;
			}

			const wallEntity1 = this.entityManager.createEntity();
			wallEntity1
				.addComponent('position', Position(x, y))
				.addComponent('wall', {
					id: i,
					rotation: rotation,
					isActive: true,
					wallWidth: wallWidth,
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
	updatePaddleInput(playerId, input) {
		const paddleEntity = this.paddleEntities[playerId];
		if (!paddleEntity) return;

		const paddle = paddleEntity.getComponent('paddle');
		const position = paddleEntity.getComponent('position');
		if (paddle.offset !== input.offset || position.x !== input.x || position.y !== input.y) {
			paddle.offset = input.offset;
			paddle.offset = Math.max(-paddle.maxOffset, Math.min(paddle.offset, paddle.maxOffset));
			position.x = input.x;
			position.y = input.y;
			paddle.dirty = true;
		}
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
				if (!paddle.dirty) return null;
				paddle.dirty = false;
				return { id: paddle.id, offset: paddle.offset, connected: paddle.isConnected };
			})
			.filter(Boolean);

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

}
