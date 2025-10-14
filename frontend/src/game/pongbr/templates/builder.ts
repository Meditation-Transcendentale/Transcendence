// ecs_builders.ts
// Modular ECS entity builders for circular pong arena

import { Entity } from "../ecs/Entity";
import { UIComponent } from "../components/UIComponent";
import { PaddleComponent } from "../components/PaddleComponent";
import { GoalComponent } from "../components/GoalComponent";
import { WallComponent } from "../components/WallComponent";
import { PillarComponent } from "../components/PillarComponent";
import { BallComponent } from "../components/BallComponent";
import { InputComponent } from "../components/InputComponent";
import { TransformComponent } from "../components/TransformComponent";
import { TransformNode, Vector3 } from "../../../babylon";
import { ECSManager } from "../ecs/ECSManager";
import GameUI from "../../GameUI";
import { localPaddleId } from "../PongBR";

// ─── In-File Default Configuration ─────────────────────────────────────
const DEFAULT_CONFIG = {
	arenaRadius: 200,    // circle radius
	wallWidth: 1,       // thickness of walls and death walls
	paddleWidth: 1,       // thickness of walls and death walls
	paddleHeight: 1,    // vertical size of paddles and goals
	paddleDepth: 1,   // radial thickness of paddle
	goalDepth: 1,       // radial thickness of goal opening
};

type GameTemplateConfig = typeof DEFAULT_CONFIG;

export type PaddleBundle = {
	sliceIndex: number;
	paddle: Entity;
	goal: Entity;
	deathWall: Entity;
	pillar: Entity;
};

// ─── 1. Score UI ─────────────────────────────────────────────────────
export function buildUI(ecs: any, gameUI: GameUI): Entity {
	const ui = new Entity();
	ui.addComponent(new UIComponent(gameUI));
	ecs.addEntity(ui);
	return ui;
}

export function buildPaddles(
	ecs: ECSManager,
	playerCount: number,
	pongRoot: TransformNode
	, localPaddleIndex: number
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
	const pillarArc = angleStep * 0.025;
	const pillarSize = arenaRadius * pillarArc;
	const usableArc = angleStep - pillarArc;
	const halfUsableArc = usableArc / 2;
	const maxOffset = halfUsableArc - halfArc;

	for (let i = 0; i < playerCount; i++) {
		const isLocal = (i === localPaddleIndex);
		const sliceStart = i * angleStep;
		const midAngle = sliceStart + pillarArc + halfUsableArc;
		// const midAngle = sliceStart + pillarArc/ 2 + halfUsableArc;

		const paddleRotY = - midAngle;  // Same as physics
		// console.log(`paddle  id = ${i} sliceStart = ${sliceStart}, paddleRotY = ${paddleRotY}`)


		// const paddleRotY = -paddleAngle;  // Face inward


		// ---- Paddle ----
		const paddle = new Entity();
		paddle.addComponent(
			new PaddleComponent(i, 0, maxOffset, paddleRotY, playerCount / 4, isLocal)
		);

		paddle.addComponent(new InputComponent(isLocal));
		paddle.addComponent(new TransformComponent(
			Vector3.Zero(),
			new Vector3(0, paddleRotY, 0),
			Vector3.One(),
			pongRoot
		));

		if (isLocal) {
			pongRoot.rotation.y = -paddleRotY;
		}

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
		deathWall.addComponent(new TransformComponent(Vector3.Zero(), new Vector3(0, paddleRotY, 0), Vector3.One(), pongRoot));
		const transform = deathWall.getComponent(TransformComponent);
		transform?.disable();
		ecs.addEntity(deathWall);

		// ---- Pillars ----
		const angle = midAngle - maxOffset - halfArc;
		const baseX = Math.cos(angle) * (arenaRadius + pillarSize / 2);
		const baseZ = Math.sin(angle) * (arenaRadius + pillarSize / 2);

		const tx = -Math.sin(angle);
		const tz = Math.cos(angle);
		const halfThickness = pillarSize / 2;

		const px = baseX - tx * halfThickness;
		const pz = baseZ - tz * halfThickness;
		const yaw = -angle;
		const pillar = new Entity();
		pillar.addComponent(new PillarComponent(i));
		pillar.addComponent(
			new TransformComponent(
				new Vector3(px, pillarSize * 1.5 / 2 + 2.5, pz),
				new Vector3(0, yaw, 0),
				new Vector3(pillarSize, pillarSize * 1.5, pillarSize),
				pongRoot
			)
		);
		ecs.addEntity(pillar);

		bundles.push({ sliceIndex: i, paddle, goal, deathWall, pillar });
	}


	return bundles;
}

// ─── 4. Build Ball ─────────────────────────────────────────────────
export function buildBall(ecs: any, pongRoot: TransformNode) {
	for (let i = 0; i < 200; i++) {
		const ball = new Entity();
		const startPos = new Vector3(0, 0, 0);
		ball.addComponent(new BallComponent(i, startPos, Vector3.Zero()));
		ball.addComponent(new TransformComponent(startPos, Vector3.Zero(), Vector3.One(), pongRoot));
		ecs.addEntity(ball);
	}
	return;
}

// ─── 5. Assemble Game Template ─────────────────────────────────────
export function createGameTemplate(ecs: ECSManager, playerCount: number, pongRoot: TransformNode, gameUI: GameUI, paddleId: number): PaddleBundle[] {
	console.log(`CREATE GAME TEMPLATE CALLED paddleId = ${paddleId}`)
	const config = DEFAULT_CONFIG;
	buildUI(ecs, gameUI);
	const bundles = buildPaddles(ecs, playerCount, pongRoot, paddleId);
	buildBall(ecs, pongRoot);
	return bundles;
}

