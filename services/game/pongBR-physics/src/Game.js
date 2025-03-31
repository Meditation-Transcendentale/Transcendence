// services/game/pongBR-physics/src/Game.js
import { createEntityManager } from './ecs/ecs.js';
import { Position, Velocity, CircleCollider, BoxCollider } from './ecs/components.js';
import { movementSystem } from './ecs/systems.js';
import { config } from './utils/config.js';

export class Game {
	constructor(gameId, initialState) {
		this.gameId = gameId;
		this.entityManager = createEntityManager();
		this.paddleEntities = {};
		this.options = initialState.options || {};
		this.players = this.options.players || [];
		this.arenaRadius = this.calculateArenaRadius(this.players.length);

		this.init();
	}

	calculateArenaRadius(numPlayers) {
		const playerWidth = 7;
		const centralAngleDeg = 360 / numPlayers;
		const halfCentralAngleRad = (centralAngleDeg / 2) * Math.PI / 180;
		return playerWidth / (2 * Math.sin(halfCentralAngleRad));
	}

	init() {
		const ballCount = this.options.ballCount || 1;
		for (let i = 0; i < ballCount; i++) {
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

		// Create one wall and one paddle per player
		this.players.forEach((playerId, i) => {
			const angle = (2 * Math.PI / this.players.length) * i;
			const x = this.arenaRadius * Math.cos(angle);
			const y = this.arenaRadius * Math.sin(angle);
			const rotationY = -(angle + Math.PI / 2);

			// Paddle entity
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

			// Wall entity
			const wallEntity = this.entityManager.createEntity();
			wallEntity
				.addComponent('position', Position(x, y))
				.addComponent('wall', { id: i, rotation: rotationY, isActive: true, dirty: true })
				.addComponent('collider', BoxCollider(config.WALL_WIDTH, config.WALL_HEIGHT, rotationY));
		});
	}

	update(tick, inputs) {
		// Handle paddle inputs
		for (const { playerId, input } of inputs || []) {
			this.updatePaddleInput(playerId, input);
		}
		// optional: handle inputs here to update paddles
		movementSystem(this.entityManager, 1 / 60);
		return this.getFullState();
	}

	updatePaddleInput(playerId, input) {
		const paddleEntity = this.paddleEntities[playerId];
		if (!paddleEntity) return;

		const paddle = paddleEntity.getComponent('paddle');
		const position = paddleEntity.getComponent('position');

		paddle.offset = input.offset;
		paddle.offset = Math.max(-paddle.maxOffset, Math.min(paddle.offset, paddle.maxOffset));
		paddle.dirty = true;

		position.x = input.x;
		position.y = input.y;
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
}
