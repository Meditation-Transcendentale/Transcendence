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
		this.wallEntities = {};
		this.pillarEntities = {};
		this.options = initialState.options || {};
		this.players = this.options.players || [];
		this.arenaRadius = this.calculateArenaRadius(this.options.maxPlayers || this.players.length || 2);

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

		const maxPlayers = this.options.maxPlayers || this.players.length || 2;

		for (let i = 0; i < 100; i++) {
			const angle = (2 * Math.PI / maxPlayers) * i;
			const x = this.arenaRadius * Math.cos(angle);
			const y = this.arenaRadius * Math.sin(angle);
			const rotationY = -(angle + Math.PI / 2);

			const wallEntity = this.entityManager.createEntity();
			wallEntity
				.addComponent('position', Position(x, y))
				.addComponent('wall', { id: i, rotation: rotationY, isActive: true, dirty: true })
				.addComponent('collider', BoxCollider(config.WALL_WIDTH, config.WALL_HEIGHT, rotationY));

			this.wallEntities[i] = wallEntity;

			const paddleEntity = this.entityManager.createEntity();
			paddleEntity
				.addComponent('position', Position(x, y))
				.addComponent('paddle', {
					id: i,
					speed: config.PADDLE_SPEED,
					offset: 0,
					maxOffset: config.MAX_OFFSET,
					isConnected: !!this.players[i],
					dirty: true
				})
				.addComponent('collider', BoxCollider(config.PADDLE_WIDTH, config.PADDLE_HEIGHT, rotationY));

			this.paddleEntities[i] = paddleEntity;

			if (this.players[i]) {
				wallEntity.getComponent('wall').isActive = false;
				wallEntity.getComponent('wall').dirty = true;
			}
		}
		const zoneAngleWidth = (2 * Math.PI) / maxPlayers;
		for (let i = 0; i < maxPlayers; i++) {
			const angle = (2 * Math.PI / maxPlayers) * i;
			const leftAngle = angle - zoneAngleWidth / 2;
			const x = this.arenaRadius * Math.cos(leftAngle);
			const y = this.arenaRadius * Math.sin(leftAngle);
			const rotation = -(leftAngle + (Math.PI / 2));

			const pillarEntity = this.entityManager.createEntity();
			pillarEntity
				.addComponent('position', Position(x, y))
				.addComponent('pillar', {
					id: i,
					rotation: rotation
				})
				.addComponent('collider', BoxCollider(0.2, 0.2, rotation));
			this.pillarEntities[i] = pillarEntity;
		}

	}

	update(tick, inputs) {
		for (const { playerId, input } of inputs || []) {
			this.updatePaddleInput(playerId, input);
		}
		movementSystem(this.entityManager, 1 / 60);
		return this.getState();
	}

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
