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
import { PortalComponent } from "../components/PortalComponent";
import { TransformNode, Vector3 } from "@babylonImport";
import { ECSManager } from "../../pong/ecs/ECSManager";

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
	arenaRadius: 200,    // circle radius
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
	pillar: Entity;
};

// ─── 1. Score UI ─────────────────────────────────────────────────────
export function buildScoreUI(ecs: any): Entity {
	const ui = new Entity();
	ui.addComponent(new UIComponent());
	ecs.addEntity(ui);
	return ui;
}

export function buildPaddles(
	ecs: ECSManager,
	playerCount: number,
	pongRoot: TransformNode
): PaddleBundle[] {
	const bundles: PaddleBundle[] = [];
	const {
		arenaRadius,
		paddleWidth,
		paddleHeight,
		wallWidth,
		goalDepth,
	} = DEFAULT_CONFIG;

	const angleStep = (2 * Math.PI) / playerCount;
	const paddleArc = angleStep * 0.25;
	const halfArc = paddleArc / 2;
	const y = paddleHeight / 2;
	const goalRadius = arenaRadius + wallWidth / 2 + goalDepth / 2;
	const pillarArc = angleStep * 0.1;
	const pillarSize = arenaRadius * pillarArc;
	const usableArc = angleStep - pillarArc;
	const halfUsableArc = usableArc / 2;
	const maxOffset = halfUsableArc - halfArc;

	for (let i = 0; i < playerCount; i++) {
		const sliceStart = i * angleStep;
		const midAngle = sliceStart + pillarArc + halfUsableArc;

		// Match physics engine positioning exactly
		const paddleAngle = midAngle;  // Same as physics

		// Calculate position like physics engine does
		const paddleX = Math.cos(paddleAngle) * arenaRadius;
		const paddleZ = Math.sin(paddleAngle) * arenaRadius;  // Note: Z in Babylon.js, Y in physics

		// Calculate rotation to face inward (same as physics)
		const paddleRotY = -paddleAngle;  // Face inward

		const scene = pongRoot.getScene();

		// Debug: Log the values to compare with physics
		console.log(`Paddle ${i}: angle=${(paddleAngle * 180 / Math.PI).toFixed(1)}° pos=(${paddleX.toFixed(1)}, ${paddleZ.toFixed(1)}) rot=${(paddleRotY * 180 / Math.PI).toFixed(1)}°, maxoffset=${maxOffset * 180 / Math.PI}`);

		// Optional: Debug line to visualize paddle direction
		// const debugLine = MeshBuilder.CreateLines("line", {
		// 	points: [
		// 		Vector3.Zero(),
		// 		new Vector3(paddleX, 0, paddleZ),
		// 	],
		// }, scene);
		// debugLine.parent = pongRoot;

		// ---- Paddle ----
		const paddle = new Entity();
		paddle.addComponent(
			new PaddleComponent(i, Vector3.Zero(), 0, maxOffset, paddleRotY, playerCount / 4)
		);
		if (i == 0)
			paddle.addComponent(new InputComponent(true));
		else
			paddle.addComponent(new InputComponent(false));
		paddle.addComponent(
			new TransformComponent(
				new Vector3(0, 0, 0),  // Position at arena boundary
				new Vector3(0, paddleRotY, 0),     // Rotation to face inward
				Vector3.One(),
				pongRoot
			)
		);
		ecs.addEntity(paddle);
		// ---- Goal & Death Wall ----
		const goalPos = new Vector3(
			Math.cos(midAngle) * goalRadius,
			y,
			Math.sin(midAngle) * goalRadius
		);
		const goalSize = new Vector3(paddleWidth, paddleHeight, goalDepth * (1 + 1 / playerCount));

		const goal = new Entity();
		goal.addComponent(new GoalComponent(i, goalPos));
		goal.addComponent(new TransformComponent(goalPos, new Vector3(0, paddleRotY, 0), goalSize, pongRoot));
		ecs.addEntity(goal);

		const deathWall = new Entity();
		deathWall.addComponent(new WallComponent(i, goalPos));
		deathWall.addComponent(new TransformComponent(goalPos, new Vector3(0, paddleRotY, 0), new Vector3(paddleWidth, 1, goalSize.z), pongRoot));
		deathWall.addComponent(new DisabledComponent());
		ecs.addEntity(deathWall);

		// ---- Pillars ----
		const angle = midAngle - maxOffset - halfArc;
		const baseX = Math.cos(angle) * arenaRadius;
		const baseZ = Math.sin(angle) * arenaRadius;

		const tx = -Math.sin(angle);
		const tz = Math.cos(angle);
		const halfThickness = pillarSize / 2;

		const px = baseX - tx * halfThickness;
		const pz = baseZ - tz * halfThickness;
		const yaw = -angle;
		//const debugLine2 = MeshBuilder.CreateLines("line2", {
		//	points: [
		//		Vector3.Zero(),
		//		new Vector3(Math.cos(angle) * 300, 0, Math.sin(angle) * 300),
		//	],
		//}, scene);
		//debugLine2.parent = pongRoot;
		const pillar = new Entity();
		pillar.addComponent(new PillarComponent(i));
		pillar.addComponent(
			new TransformComponent(
				new Vector3(px, y, pz),
				new Vector3(0, yaw, 0),
				new Vector3(pillarSize, paddleHeight * 2 * pillarSize, pillarSize),
				pongRoot
			)
		);
		ecs.addEntity(pillar);		// ---- Bundle ----

		bundles.push({ sliceIndex: i, paddle, goal, deathWall, pillar });
	}


	return bundles;
}



//export function buildPaddles(
//	ecs: any,
//	playerCount: number,
//	pongRoot: TransformNode
//): PaddleBundle[] {
//	const bundles: PaddleBundle[] = [];
//	const config: GameTemplateConfig = DEFAULT_CONFIG;
//	const {
//		arenaRadius,
//		paddleWidth,
//		paddleHeight,
//		wallWidth,
//		goalDepth,
//	} = config;
//
//	const angleStep = (2 * Math.PI) / playerCount;
//	const paddleArc = angleStep * 0.25;
//	const halfArc = paddleArc / 2;
//	const y = paddleHeight / 2 + 1;
//	const goalRadius = arenaRadius + wallWidth / 2 + goalDepth / 2;
//	const pillarSize = arenaRadius * angleStep * 0.1;
//	const pillarArc = angleStep * 0.1;
//	const effectiveSlice = angleStep - pillarArc * 2;
//	const halfEffectiveSlice = effectiveSlice / 2;
//	const maxOffset = halfEffectiveSlice - halfArc;
//
//	for (let i = 0; i < playerCount; i++) {
//		const sliceStart = i * angleStep;
//		const midAngle = sliceStart + pillarArc + halfEffectiveSlice;
//
//		const yaw = - (midAngle - halfArc / 2);
//
//		const paddle = new Entity();
//		paddle.addComponent(
//			new PaddleComponent(i, new Vector3(0, 0, 0), 0, maxOffset, yaw, playerCount / 2)
//		);
//		paddle.addComponent(new InputComponent(true));
//		paddle.addComponent(
//			new TransformComponent(
//				new Vector3(0, 0, 0),
//				new Vector3(0, yaw, 0),
//				new Vector3(1, 1, 1),
//				pongRoot
//			)
//		);
//		ecs.addEntity(paddle);
//
//		const gx = Math.cos(midAngle) * goalRadius;
//		const gz = Math.sin(midAngle) * goalRadius;
//		const goal = new Entity();
//		goal.addComponent(new GoalComponent(i, new Vector3(gx, y, gz)));
//		goal.addComponent(
//			new TransformComponent(
//				new Vector3(gx, y, gz),
//				new Vector3(0, yaw, 0),
//				new Vector3(paddleWidth, paddleHeight, goalDepth * (1 + 1 / playerCount)),
//				pongRoot
//			)
//		);
//		ecs.addEntity(goal);
//
//		const deathWall = new Entity();
//		deathWall.addComponent(new WallComponent(i, new Vector3(gx, y, gz)));
//		deathWall.addComponent(
//			new TransformComponent(
//				new Vector3(gx, y, gz),
//				new Vector3(0, yaw, 0),
//				new Vector3(paddleWidth, 1, goalDepth * (1 + 1 / playerCount)),
//				pongRoot
//			)
//		);
//		deathWall.addComponent(new DisabledComponent());
//		ecs.addEntity(deathWall);
//
//		// Pillars
//		const pillars: [Entity, Entity] = [null as any, null as any];
//		[sliceStart, sliceStart + angleStep].forEach((angle, idx) => {
//			const baseX = Math.cos(angle) * arenaRadius;
//			const baseZ = Math.sin(angle) * arenaRadius;
//
//			const tx = -Math.sin(angle);
//			const tz = Math.cos(angle);
//
//			const halfThickness = pillarSize / 2;  // or whatever your mesh’s thickness is
//
//			const px = baseX - tx * halfThickness;
//			const pz = baseZ - tz * halfThickness;
//
//			const yaw = -angle;  // so its “face” points inward
//
//			const pillar = new Entity();
//			pillar.addComponent(new PillarComponent(i, idx === 0 ? "start" : "end"));
//			pillar.addComponent(
//				new TransformComponent(
//					new Vector3(px, y, pz),
//					new Vector3(0, yaw, 0),
//					new Vector3(pillarSize, paddleHeight * 2, pillarSize),
//					pongRoot
//				)
//			);
//			ecs.addEntity(pillar);
//			pillars[idx] = pillar;
//		});
//		bundles.push({ sliceIndex: i, paddle, goal, deathWall, pillars });
//	}
//
//	return bundles;
//}

// ─── 3. Build Arena Walls ───────────────────────────────────────────
export function buildWalls(ecs: any, config: GameTemplateConfig, pongRoot: TransformNode): Entity[] {
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
				new Vector3(angle % Math.PI ? config.wallWidth : length, 1, angle % Math.PI ? length : config.wallWidth),
				pongRoot
			)
		);
		ecs.addEntity(wall);
		walls.push(wall);
	});
	return walls;
}

// ─── 4. Build Ball ─────────────────────────────────────────────────
export function buildBall(ecs: any, pongRoot: TransformNode) {
	for (let i = 0; i < 200; i++) {
		const ball = new Entity();
		const startPos = new Vector3(0, 10, 0);
		ball.addComponent(new BallComponent(i, startPos, Vector3.Zero()));
		ball.addComponent(new TransformComponent(startPos, Vector3.Zero(), Vector3.One(), pongRoot));
		ecs.addEntity(ball);
	}
	return;
}

export function buildPortal(ecs: any, pongRoot: TransformNode) {
	const startPos = new Vector3(0, 0, 0);
	let angle = Math.PI / 4;
	for (let i = 0; i < 4; i++) {
		const portal = new Entity();
		portal.addComponent(new PortalComponent(i, startPos,));
		portal.addComponent(new TransformComponent(startPos, new Vector3(Math.PI * 2 / 3, angle, -Math.PI / 4), Vector3.One(), pongRoot));
		angle += Math.PI / 2;
		ecs.addEntity(portal);
	}
	return;

}
// ─── 5. Assemble Game Template ─────────────────────────────────────
export function createGameTemplate(ecs: ECSManager, playerCount: number, pongRoot: TransformNode): PaddleBundle[] {
	const config = DEFAULT_CONFIG;
	buildScoreUI(ecs);
	const bundles = buildPaddles(ecs, playerCount, pongRoot);
	buildWalls(ecs, config, pongRoot);
	buildBall(ecs, pongRoot);
	buildPortal(ecs, pongRoot);
	return bundles;
}

