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
import { InputComponent } from "../components/InputComponent";
import { TransformComponent } from "../components/TransformComponent";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { PortalComponent } from "../components/PortalComponent";

function intersectSegmentsXZ(
	A: Vector3,
	B: Vector3,
	C: Vector3,
	D: Vector3
): Vector3 | null {
	const ab = B.subtract(A);
	const cd = D.subtract(C);
	const ac = C.subtract(A);

	const denom = ab.x * cd.z - ab.z * cd.x;
	if (Math.abs(denom) < 1e-6) {
		// Parallel or nearly so
		return null;
	}

	const t = (ac.x * cd.z - ac.z * cd.x) / denom;
	if (t < 0 || t > 1) return null;

	const u = (ac.x * ab.z - ac.z * ab.x) / denom;
	if (u < 0 || u > 1) return null;

	// Intersection lies on both segments
	return new Vector3(
		A.x + t * ab.x,
		A.y + t * ab.y,  // or keep original Y, depending on your use
		A.z + t * ab.z
	);
}
// ─── In-File Default Configuration ─────────────────────────────────────
const DEFAULT_CONFIG = {
	arenaRadius: 100,    // circle radius
	wallWidth: 10,       // thickness of walls and death walls
	paddleWidth: 1,       // thickness of walls and death walls
	paddleHeight: 1,    // vertical size of paddles and goals
	paddleDepth: 1,   // radial thickness of paddle
	goalDepth: 1,       // radial thickness of goal opening
};

type GameTemplateConfig = typeof DEFAULT_CONFIG;

type PaddleBundle = {
	sliceIndex: number;
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
	playerCount: number,
	config: GameTemplateConfig = DEFAULT_CONFIG
): PaddleBundle[] {
	const bundles: PaddleBundle[] = [];
	const {
		arenaRadius,
		paddleWidth,
		paddleHeight,
		wallWidth,
		goalDepth,
	} = config;

	const angleStep = (2 * Math.PI) / playerCount;
	const halfSlice = angleStep / 2;
	const paddleArc = angleStep * 0.07;
	const halfArc = paddleArc / 2;
	const maxOffset = halfSlice - halfArc;
	const y = paddleHeight / 2 + 1;
	const goalRadius = arenaRadius + wallWidth / 2 + goalDepth / 2;
	const pillarSize = arenaRadius * angleStep * 0.07;

	for (let i = 0; i < playerCount; i++) {
		const sliceStart = i * angleStep;
		const midAngle = sliceStart + halfSlice;

		const yaw = - (midAngle - halfArc) + Math.PI / 2;

		const paddle = new Entity();
		paddle.addComponent(
			new PaddleComponent(i, new Vector3(0, 0, 0), 0, maxOffset, yaw, playerCount / 2)
		);
		paddle.addComponent(new InputComponent(true));
		paddle.addComponent(
			new TransformComponent(
				new Vector3(0, 0, 0),
				new Vector3(0, yaw, 0),
				new Vector3(1, 1, 1)
			)
		);
		ecs.addEntity(paddle);

		const gx = Math.cos(midAngle) * goalRadius;
		const gz = Math.sin(midAngle) * goalRadius;
		const goal = new Entity();
		goal.addComponent(new GoalComponent(i, new Vector3(gx, y, gz)));
		goal.addComponent(
			new TransformComponent(
				new Vector3(gx, y, gz),
				new Vector3(0, yaw, 0),
				new Vector3(paddleWidth, paddleHeight, goalDepth * (1 + 1 / playerCount))
			)
		);
		ecs.addEntity(goal);

		const deathWall = new Entity();
		deathWall.addComponent(new WallComponent(i, new Vector3(gx, y, gz)));
		deathWall.addComponent(
			new TransformComponent(
				new Vector3(gx, y, gz),
				new Vector3(0, yaw, 0),
				new Vector3(paddleWidth, 1, goalDepth * (1 + 1 / playerCount))
			)
		);
		deathWall.addComponent(new DisabledComponent());
		ecs.addEntity(deathWall);

		// Pillars
		const pillars: [Entity, Entity] = [null as any, null as any];
		[sliceStart, sliceStart + angleStep].forEach((angle, idx) => {
			// radial position on the circle
			const baseX = Math.cos(angle) * arenaRadius;
			const baseZ = Math.sin(angle) * arenaRadius;

			// compute the tangent (local right) at that angle:
			// tangent = (-sin, 0, +cos)
			const tx = -Math.sin(angle);
			const tz = Math.cos(angle);

			// half your pillar’s thickness in world units:
			const halfThickness = pillarSize / 2;  // or whatever your mesh’s thickness is

			// step the pillar *back* toward the arena by half its thickness:
			const px = baseX - tx * halfThickness;
			const pz = baseZ - tz * halfThickness;

			const yaw = -angle + Math.PI / 2;  // so its “face” points inward

			const pillar = new Entity();
			pillar.addComponent(new PillarComponent(i, idx === 0 ? "start" : "end"));
			pillar.addComponent(
				new TransformComponent(
					new Vector3(px, y, pz),
					new Vector3(0, yaw, 0),
					new Vector3(pillarSize, paddleHeight, pillarSize)
				)
			);
			ecs.addEntity(pillar);
			pillars[idx] = pillar;
		});
		bundles.push({ sliceIndex: i, paddle, goal, deathWall, pillars });
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

export function buildPortal(ecs: any) {
	const startPos = new Vector3(0, 0, 0);
	let angle = Math.PI / 4;
	for (let i = 0; i < 4; i++) {
		const portal = new Entity();
		portal.addComponent(new PortalComponent(i, startPos,));
		portal.addComponent(new TransformComponent(startPos, new Vector3(Math.PI * 2 / 3, angle, -Math.PI / 4), Vector3.One()));
		angle += Math.PI / 2;
		ecs.addEntity(portal);
	}
	return;
}
// ─── 5. Assemble Game Template ─────────────────────────────────────
export function createGameTemplate(ecs: any, playerCount: number): PaddleBundle[] {
	const config = DEFAULT_CONFIG;
	buildScoreUI(ecs);
	const bundles = buildPaddles(ecs, playerCount);
	buildWalls(ecs, config);
	buildBall(ecs);
	buildPortal(ecs);
	return bundles;
}

