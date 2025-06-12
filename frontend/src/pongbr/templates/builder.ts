// ecs_builders.ts
// Modular ECS entity builders for circular pong arena

import { Entity } from "../ecs/Entity";
import { UIComponent } from "../components/UIComponent";
import { PaddleComponent } from "../components/PaddleComponent";
import { GoalComponent } from "../components/GoalComponent";
import { WallComponent } from "../components/WallComponent";
import { PillarComponent } from "../components/PillarComponent";
import { BallComponent } from "../components/BallComponent";
import { DisabledComponent } from "../components/DisabledComponent";
import { TransformComponent } from "../components/TransformComponent";
import { Vector3 } from "@babylonjs/core";

// ─── In-File Default Configuration ─────────────────────────────────────
const DEFAULT_CONFIG = {
	arenaRadius: 50,    // circle radius
	wallWidth: 1,       // thickness of walls and death walls
	paddleHeight: 1,    // vertical size of paddles and goals
	paddleDepth: 0.4,   // radial thickness of paddle
	goalDepth: 1,       // radial thickness of goal opening
};

type GameTemplateConfig = typeof DEFAULT_CONFIG;

type PaddleBundle = {
	paddle: Entity;
	goal: Entity;
	deathWall: Entity;
	pillars: [Entity, Entity];
};

// ─── 1. Score UI ─────────────────────────────────────────────────────
export function buildScoreUI(ecs: any): Entity {
	const ui = new Entity();
	ui.addComponent(new UIComponent());
	ecs.addEntity(ui);
	return ui;
}
export function buildPaddles(
	ecs: any,
	cfg: BuilderConfig,
	playerCount: number
): PaddleBundle[] {
	const bundles: PaddleBundle[] = [];
	const angleStep = (2 * Math.PI) / playerCount;
	const paddleRadius = cfg.arenaRadius - cfg.paddleDepth / 2;
	const goalRadius = cfg.arenaRadius + cfg.wallWidth / 2 + cfg.goalDepth / 2;

	for (let i = 0; i < playerCount; i++) {
		// define slice boundaries and midpoint
		const sliceStart = i * angleStep;
		const sliceEnd = sliceStart + angleStep;
		const midAngle = sliceStart + angleStep / 2;
		const cosM = Math.cos(midAngle), sinM = Math.sin(midAngle);
		const rotY = -midAngle + Math.PI / 2;
		const arcLen = paddleRadius * angleStep;

		// — Paddle at slice midpoint —
		const paddlePos = new Vector3(
			cosM * paddleRadius,
			cfg.paddleHeight / 2,
			sinM * paddleRadius
		);
		const paddle = new Entity();
		paddle.addComponent(new PaddleComponent(i, paddlePos.clone(), 0));
		paddle.addComponent(
			new TransformComponent(
				paddlePos,
				new Vector3(0, rotY, 0),
				new Vector3(arcLen / 15, arcLen / 15 / cfg.paddleHeight, cfg.paddleDepth)
			)
		);
		ecs.addEntity(paddle);

		// — Goal at same midpoint, outer ring —
		const goalPos = new Vector3(
			cosM * goalRadius,
			cfg.paddleHeight / 2,
			sinM * goalRadius
		);
		const goal = new Entity();
		goal.addComponent(new GoalComponent(i, goalPos.clone()));
		goal.addComponent(
			new TransformComponent(
				goalPos,
				new Vector3(0, rotY, 0),
				new Vector3(arcLen, cfg.paddleHeight, cfg.goalDepth)
			)
		);
		ecs.addEntity(goal);

		// — Death wall (hidden until activation) — same size as goal
		const deathWall = new Entity();
		deathWall.addComponent(new WallComponent(i, goalPos.clone()));
		deathWall.addComponent(
			new TransformComponent(
				goalPos,
				new Vector3(0, rotY, 0),
				new Vector3(arcLen, 1, cfg.goalDepth)
			)
		);
		deathWall.addComponent(new DisabledComponent());
		ecs.addEntity(deathWall);

		// — Pillars at slice boundaries —
		const pillars: [Entity, Entity] = [null as any, null as any];
		[sliceStart, sliceEnd].forEach((ang, idx) => {
			const cx = Math.cos(ang), cz = Math.sin(ang);
			const pillarPos = new Vector3(
				cx * paddleRadius,
				cfg.paddleHeight / 2,
				cz * paddleRadius
			);
			const pillar = new Entity();
			pillar.addComponent(new PillarComponent(i, idx === 0 ? 'start' : 'end'));
			pillar.addComponent(
				new TransformComponent(
					pillarPos,
					new Vector3(0, rotY, 0),
					new Vector3(arcLen / 10, cfg.paddleHeight, arcLen / 10)
				)
			);
			ecs.addEntity(pillar);
			pillars[idx] = pillar;
		});

		bundles.push({ paddle, goal, deathWall, pillars });
	}

	return bundles;
}
// ─── 3. Build Arena Walls ───────────────────────────────────────────
export function buildWalls(ecs: any, config: GameTemplateConfig): Entity[] {
	const walls: Entity[] = [];
	const R = config.arenaRadius + config.wallWidth / 2;
	const positions = [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2];
	positions.forEach(angle => {
		const length = 2 * Math.PI * R / 4; // quarter circle length
		const x = Math.cos(angle) * R;
		const z = Math.sin(angle) * R;
		const wall = new Entity();
		wall.addComponent(new WallComponent(0, new Vector3(x, 0, z)));
		wall.addComponent(
			new TransformComponent(
				new Vector3(x, 0, z),
				new Vector3(0, angle, 0),
				new Vector3(angle % Math.PI ? config.wallWidth : length, 1, angle % Math.PI ? length : config.wallWidth)
			)
		);
		ecs.addEntity(wall);
		walls.push(wall);
	});
	return walls;
}

// ─── 4. Build Ball ─────────────────────────────────────────────────
export function buildBall(ecs: any): Entity {
	const ball = new Entity();
	const startPos = new Vector3(0, 0.5, 0);
	ball.addComponent(new BallComponent(0, startPos, Vector3.Zero()));
	ball.addComponent(new TransformComponent(startPos, Vector3.Zero(), Vector3.One()));
	ecs.addEntity(ball);
	return ball;
}

// ─── 5. Assemble Game Template ─────────────────────────────────────
export function createGameTemplate(ecs: any, playerCount: number): PaddleBundle[] {
	const config = DEFAULT_CONFIG;
	buildScoreUI(ecs);
	const bundles = buildPaddles(ecs, config, playerCount);
	buildWalls(ecs, config);
	buildBall(ecs);
	return bundles;
}

