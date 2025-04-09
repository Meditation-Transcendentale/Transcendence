import { Vector3 } from "@babylonjs/core";
import { ECSManager } from "../ecs/ECSManager.js";
import { Entity } from "../ecs/Entity.js";
import { BallComponent } from "../components/BallComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { WallComponent } from "../components/WallComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { InputComponent } from "../components/InputComponent.js";

export interface GameTemplateConfig {
	numberOfPlayers: number;
	numberOfBalls: number;
	// arenaRadius: number;
	numPillars: number;
	numWalls: number;
}

// export function calculateArenaRadius(numPlayers: number): number {
// 	const playerWidth = 7;
// 	const centralAngleDeg = 360 / numPlayers;
// 	const halfCentralAngleRad = (centralAngleDeg / 2) * Math.PI / 180;

// 	const radius = playerWidth / (2 * Math.sin(halfCentralAngleRad));

// 	return radius;
// }

export function createGameTemplate(ecs: ECSManager, config: GameTemplateConfig, localPaddleId: number): void {
	console.log("localplayerif in template=" + localPaddleId);

	for (let i = 0; i < 2; i++) {
		const paddleEntity = new Entity();
		const x = i ? -30 : 30;
		paddleEntity.addComponent(new PaddleComponent(i, new Vector3(x, 1, 0), 0));
		if (i === localPaddleId)
			paddleEntity.addComponent(new InputComponent(true));
		else
			paddleEntity.addComponent(new InputComponent());
		paddleEntity.addComponent(new TransformComponent(
			new Vector3(x, 1, 0),
			new Vector3(0, 90 * Math.PI / 180, 0),
			new Vector3(1, 1, 1)
		));
		ecs.addEntity(paddleEntity);
	}

	// for (let i = 0; i < config.numberOfPlayers; i++) {
	// 	const angle = (2 * Math.PI / config.numberOfPlayers) * i;
	// 	const x = (config.arenaRadius) * Math.cos(angle);
	// 	const z = (config.arenaRadius) * Math.sin(angle);
	// 	const paddleEntity = new Entity();
	// 	if (i === localPaddleId) {
	// 		paddleEntity.addComponent(new PaddleComponent(i, new Vector3(x, 0, z), 0, false));
	// 		paddleEntity.addComponent(new InputComponent(true));
	// 	}
	// 	else {
	// 		paddleEntity.addComponent(new PaddleComponent(i, new Vector3(x, 0, z)), 0, false);
	// 		paddleEntity.addComponent(new InputComponent());
	// 	}
	// 	paddleEntity.addComponent(new TransformComponent(
	// 		new Vector3(x, 0.5, z),
	// 		new Vector3(0, -(angle + (Math.PI / 2)), 0),
	// 		new Vector3(1, 1, 1)
	// 	));
	// 	ecs.addEntity(paddleEntity);
	// }

	const ballEntity = new Entity();
	const pos = new Vector3(0, 0, 0);
	const vel = new Vector3(Math.random(), Math.random(), 0);
	ballEntity.addComponent(new BallComponent(0, pos, vel));
	ballEntity.addComponent(new TransformComponent(pos, Vector3.Zero(), new Vector3(1, 1, 1)));
	ecs.addEntity(ballEntity);
	
	// for (let i = 0; i < config.numberOfBalls; i++) {
	// 	const pos = new Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
	// 	const vel = new Vector3(Math.random(), Math.random(), 0);
	// 	const ballEntity = new Entity();
	// 	ballEntity.addComponent(new BallComponent(i, pos, vel));
	// 	ballEntity.addComponent(new TransformComponent(pos, Vector3.Zero(), new Vector3(1, 1, 1)));
	// 	console.log(i);
	// 	ecs.addEntity(ballEntity);
	// }

	// for (let i = 0; i < config.numPillars; i++) {
	// 	const angle = (2 * Math.PI / config.numberOfPlayers) * i;
	// 	const leftAngle = angle - zoneAngleWidth / 2;
	// 	const rightAngle = angle + zoneAngleWidth / 2;
	// 	const x = config.arenaRadius * Math.cos(leftAngle);
	// 	const z = config.arenaRadius * Math.sin(leftAngle);
	// 	const pillarEntity = new Entity();
	// 	pillarEntity.addComponent(new PillarComponent(new Vector3(x, 0, z)));
	// 	pillarEntity.addComponent(new TransformComponent(
	// 		new Vector3(x, 1, z),
	// 		new Vector3(0, -(leftAngle + (Math.PI / 2)), 0),
	// 		new Vector3(1, 1, 1)
	// 	));
	// 	ecs.addEntity(pillarEntity);
	// }

	// for (let i = 0; i < 4; i++) {
	// 	const wallEntity = new Entity();
	// 	let x = i ? 20 : 0;
	// 	let z = i ? 0 : 30;
	// 	const rot_y = i ? 0 : 90;
	// 	if (i == 1)
	// 		x *= -1;
	// 	else if (i == 3)
	// 		z *= -1;
	// 	wallEntity.addComponent(new WallComponent(i, new Vector3(x, 1, z)));
	// 	wallEntity.addComponent(new TransformComponent(
	// 		new Vector3(x, 1, z),
	// 		new Vector3(0, rot_y, 0),
	// 		new Vector3(1, 1, 1)
	// 	));
	// 	ecs.addEntity(wallEntity);
	// }

	const wallEntity = new Entity();
	wallEntity.addComponent(new WallComponent(0, new Vector3(20, 0, 0)));
	wallEntity.addComponent(new TransformComponent(
		new Vector3(20, 0, 0),
		new Vector3(0, 0, 0),
		new Vector3(1, 1, 1)
	));
	ecs.addEntity(wallEntity);

	// for (let i = 0; i < config.numWalls; i++) {
	// 	const angle = (2 * Math.PI / config.numberOfPlayers) * i;
	// 	const x = (config.arenaRadius) * Math.cos(angle);
	// 	const z = (config.arenaRadius) * Math.sin(angle);
	// 	const wallEntity = new Entity();
	// 	wallEntity.addComponent(new WallComponent(i, new Vector3(x, 1, z)));
	// 	wallEntity.addComponent(new TransformComponent(
	// 		new Vector3(x, 1, z),
	// 		new Vector3(0, -(angle + (Math.PI / 2)), 0),
	// 		new Vector3(1, 1, 1)
	// 	));
	// 	console.log("wall ", i, x, z, angle);
	// 	ecs.addEntity(wallEntity);
	// }
}
