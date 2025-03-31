// game.js
import { EntityManager } from './ecs.js';
import { Position, Velocity, Collider } from './components.js';
import { CircleCollider, BoxCollider } from './components.js';
import { movementSystem } from './systems.js';
import { config } from './utils/config.js';

class Game {
	constructor() {
		this.arenaRadius = this.calculateArenaRadius(100);
		this.entityManager = new EntityManager();
		this.paddleEntities = {};
		this.init();
	}

	calculateArenaRadius(numPlayers) {
		const playerWidth = 7;
		const centralAngleDeg = 360 / numPlayers;
		const halfCentralAngleRad = (centralAngleDeg / 2) * Math.PI / 180;
		return playerWidth / (2 * Math.sin(halfCentralAngleRad));
	}

	init() {
		for (let i = 0; i < 200; i++) {
			const circleRadius = 50;
			const r = Math.sqrt(Math.random()) * circleRadius;
			const theta = Math.random() * 2 * Math.PI;
			const x = r * Math.cos(theta);
			const y = r * Math.sin(theta);
			const ballEntity = this.entityManager.createEntity();
			ballEntity
				.addComponent('position', Position(x, y))
				.addComponent('velocity', Velocity(0, 25))
				.addComponent('ball', { id: i, radius: config.BALL_RADIUS })
				.addComponent('collider', CircleCollider(config.BALL_RADIUS));
		}

		for (let i = 0; i < 100; i++) {
			const angle = (2 * Math.PI / 100) * i;
			const x = this.arenaRadius * Math.cos(angle);
			const y = this.arenaRadius * Math.sin(angle);
			const rotationY = -(angle + Math.PI / 2);
			const wallEntity = this.entityManager.createEntity();
			wallEntity
				.addComponent('position', Position(x, y))
				.addComponent('wall', { id: i, rotation: rotationY, isActive: true, dirty: true })
				.addComponent('collider', BoxCollider(config.WALL_WIDTH, config.WALL_HEIGHT, rotationY));
			// console.log("wall ", i, x, y, angle);
		}
	}

	update(deltaTime) {
		movementSystem(this.entityManager, deltaTime);
	}

	updatePaddleInput(playerId, input) {
		const paddleEntity = this.paddleEntities[playerId];
		if (paddleEntity) {
			const paddle = paddleEntity.getComponent('paddle');
			const position = paddleEntity.getComponent('position');
			paddle.offset = input.offset;
			paddle.offset = Math.max(-paddle.maxOffset, Math.min(paddle.offset, paddle.maxOffset));
			paddle.dirty = true;
			position.x = input.x;
			position.y = input.y;
		}
	}

	addPaddle(playerId, startX, startY) {
		const angle = (2 * Math.PI / 100) * playerId;
		const x = this.arenaRadius * Math.cos(angle);
		const y = this.arenaRadius * Math.sin(angle);
		const rotationY = -(angle + Math.PI / 2);

		const paddleEntity = this.entityManager.createEntity();
		paddleEntity
			.addComponent('position', Position(x, y))
			.addComponent('paddle', {
				id: playerId,
				speed: config.PADDLE_SPEED,
				offset: 0,
				maxOffset: config.MAX_OFFSET,
				isConnected: true,
				dirty: true
			})
			.addComponent('collider', BoxCollider(config.PADDLE_WIDTH, config.PADDLE_HEIGHT, rotationY));
		this.paddleEntities[playerId] = paddleEntity;
	}

	setPaddleOff(playerId) {
		const paddleEntity = this.paddleEntities[playerId];
		if (paddleEntity) {
			const paddle = paddleEntity.getComponent('paddle');
			paddle.isConnected = false;
			paddle.dirty = true;
		}
	}

	setPaddleOn(playerId) {
		const paddleEntity = this.paddleEntities[playerId];
		if (paddleEntity) {
			const paddle = paddleEntity.getComponent('paddle');
			paddle.isConnected = true;
			paddle.dirty = true;
		}
	}

	setWallOff(wallId) {
		const walls = this.entityManager.getEntitiesWithComponents(['wall']);
		const wallEntity = walls.find(entity => entity.getComponent('wall').id === wallId);
		if (wallEntity) {
			const wall = wallEntity.getComponent('wall');
			wall.isActive = false;
			wall.dirty = true;
		}
	}

	setWallOn(wallId) {
		const walls = this.entityManager.getEntitiesWithComponents(['wall']);
		const wallEntity = walls.find(entity => entity.getComponent('wall').id === wallId);
		if (wallEntity) {
			const wall = wallEntity.getComponent('wall');
			wall.isActive = true;
			wall.dirty = true;
		}
	}

	clearDirty() {
		this.entityManager.getEntitiesWithComponents(['wall']).forEach(entity => {
			entity.getComponent('wall').dirty = false;
		});
		Object.values(this.paddleEntities).forEach(entity => {
			entity.getComponent('paddle').dirty = false;
		});
	}

	getFullState() {
		const balls = this.entityManager.getEntitiesWithComponents(['ball', 'position', 'velocity']).map(entity => {
			const pos = entity.getComponent('position');
			const vel = entity.getComponent('velocity');
			const ball = entity.getComponent('ball');
			return { id: ball.id, x: pos.x, y: pos.y, vx: vel.x, vy: vel.y };
		});

		const walls = this.entityManager.getEntitiesWithComponents(['wall']).map(entity => {
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

	getState() {
		const dirtyWalls = this.entityManager.getEntitiesWithComponents(['wall'])
			.filter(entity => entity.getComponent('wall').dirty)
			.map(entity => {
				const wall = entity.getComponent('wall');
				return { id: wall.id, wall: wall.isActive };
			});

		const dirtyPaddles = Object.keys(this.paddleEntities)
			.map(key => {
				const paddleEntity = this.paddleEntities[key];
				const paddle = paddleEntity.getComponent('paddle');
				return paddle.dirty ? { id: paddle.id, offset: paddle.offset, connected: paddle.isConnected } : null;
			})
			.filter(item => item !== null);

		// Reset dirty flags
		this.entityManager.getEntitiesWithComponents(['wall']).forEach(entity => {
			entity.getComponent('wall').dirty = false;
		});
		Object.values(this.paddleEntities).forEach(entity => {
			entity.getComponent('paddle').dirty = false;
		});

		const balls = this.entityManager.getEntitiesWithComponents(['ball', 'position', 'velocity']).map(entity => {
			const pos = entity.getComponent('position');
			const vel = entity.getComponent('velocity');
			const ball = entity.getComponent('ball');
			return { id: ball.id, x: pos.x, y: pos.y, vx: vel.x, vy: vel.y };
		});

		return { balls, walls: dirtyWalls, paddles: dirtyPaddles };
	}
	getDebugState() {
		const wallEntities = this.entityManager.getEntitiesWithComponents(['wall', 'position']);
		const walls = wallEntities.map(entity => {
			const pos = entity.getComponent('position');
			const wall = entity.getComponent('wall');
			const collider = entity.getComponent('collider');
			return {
				id: wall.id,
				x: pos.x,
				y: pos.y,
				rotation: wall.rotation
			};
		});

		return { walls };
	}
}

export default new Game();
