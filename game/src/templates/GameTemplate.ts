import { Vector3 } from "@babylonjs/core";
import { ECSManager } from "../ecs/ECSManager.js";
import { Entity } from "../ecs/Entity.js";
import { BallComponent } from "../components/BallComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { ShieldComponent } from "../components/ShieldComponent.js"
import { PillarComponent } from "../components/PillarComponent.js";
import { WallComponent } from "../components/WallComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { InputComponent } from "../components/InputComponent.js";
import { ThinInstanceComponent } from "../components/ThinInstanceComponent.js";
import { ShieldTransformComponent } from "../components/ShieldTransformComponent.js";

export interface GameTemplateConfig {
	numberOfPlayers: number;
	numberOfBalls: number;
	arenaRadius: number;
	numPillars: number;
	numWalls: number;
}

export function calculateArenaRadius(numPlayers: number): number {
	const playerWidth = 7;
	const centralAngleDeg = 360 / numPlayers;
	const halfCentralAngleRad = (centralAngleDeg / 2) * Math.PI / 180;

	const radius = playerWidth / (2 * Math.sin(halfCentralAngleRad));

	return radius;
}

export function createGameTemplate(ecs: ECSManager, config: GameTemplateConfig): void {
	const zoneAngleWidth = (2 * Math.PI) / config.numberOfPlayers;

	for (let i = 0; i < config.numberOfPlayers; i++) {
		const angle = (2 * Math.PI / config.numberOfPlayers) * i;
		const paddleEntity = new Entity();
		paddleEntity.addComponent(new PaddleComponent(new Vector3(0, 0, 0)));
		paddleEntity.addComponent(new InputComponent());
		paddleEntity.addComponent(new ShieldComponent());
		paddleEntity.addComponent(new TransformComponent(
			new Vector3(0, 0.25, 0),
			new Vector3(0, 0, 0),
			new Vector3(1, 1, 1)
		));
		ecs.addEntity(paddleEntity);
	}

	for (let i = 0; i < config.numberOfBalls; i++) {
		const pos = new Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
		const vel = new Vector3(Math.random(), Math.random(), 0);
		const ballEntity = new Entity();
		ballEntity.addComponent(new BallComponent(pos, vel));
		ballEntity.addComponent(new TransformComponent(pos, Vector3.Zero(), new Vector3(1, 1, 1)));
		ecs.addEntity(ballEntity);
	}

	for (let i = 0; i < config.numWalls; i++) {
		const angle = (2 * Math.PI / config.numberOfPlayers) * i;
		const x = (config.arenaRadius) * Math.cos(angle);
		const z = (config.arenaRadius) * Math.sin(angle);
		const wallEntity = new Entity();
		wallEntity.addComponent(new WallComponent(new Vector3(x, 0, z)));
		wallEntity.addComponent(new TransformComponent(
			new Vector3(x, 0.5, z),
			new Vector3(0, -(angle + (Math.PI / 2)), 0),
			new Vector3(1, 1, 1)
		));
		ecs.addEntity(wallEntity);
	}
}
