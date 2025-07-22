import { Vector3 } from "@babylonImport";
import { ECSManager } from "../ecs/ECSManager.js";
import { Entity } from "../ecs/Entity.js";
import { BallComponent } from "../components/BallComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { WallComponent } from "../components/WallComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { InputComponent } from "../components/InputComponent.js";
import { UIComponent } from "../components/UIComponent.js";

export interface GameTemplateConfig {
	numberOfBalls: number;
	arenaSizeX: number;
	arenaSizeZ: number;
	wallWidth: number;
}

export function createGameTemplate(ecs: ECSManager, config: GameTemplateConfig, localPaddleId: number, gameMode: string): void {
	console.log("localplayerif in template=" + localPaddleId);

	const scoreUI = new Entity();
	scoreUI.addComponent(new UIComponent(gameMode));
	ecs.addEntity(scoreUI);

	for (let i = 0; i < 4; i++) {
		const paddleEntity = new Entity();
		const posX = config.arenaSizeX / 2 / 10 * 9;
		const x = i % 2 ? -posX : posX;
		const rotation_y = i % 2 ? -90 * Math.PI / 180 : 90 * Math.PI / 180;
		paddleEntity.addComponent(new PaddleComponent(i, new Vector3(x, 0.25, 0), 0));
		if (i === localPaddleId || gameMode == "local")
			paddleEntity.addComponent(new InputComponent(true, gameMode));
		else
			paddleEntity.addComponent(new InputComponent(false, gameMode));
		paddleEntity.addComponent(new TransformComponent(
			new Vector3(x, 0.25, 0),
			new Vector3(0, rotation_y, 0),
			new Vector3(1, 1, 1)
		));
		ecs.addEntity(paddleEntity);
	}

	for (let i = 0; i < 2; i++) {
		let x = i % 2 ? config.arenaSizeX / 2 + config.wallWidth / 4 : 0;
		let z = i % 2 ? 0 : config.arenaSizeZ / 2 + config.wallWidth / 2;
		const rotation_y = i % 2 ? 0 : 90 * Math.PI / 180;
		const scale_x = i % 2 ? 1 / 2 : 1;
		const scale_z = i % 2 ? 1 : 1 / config.arenaSizeZ * (config.arenaSizeX + config.wallWidth);
		let wallEntity = new Entity();
		wallEntity.addComponent(new WallComponent(0, new Vector3(x, 0, z)));
		wallEntity.addComponent(new TransformComponent(
			new Vector3(x, 0, z),
			new Vector3(0, rotation_y, 0),
			new Vector3(scale_x, 1, scale_z)
		));
		ecs.addEntity(wallEntity);

		wallEntity = new Entity();
		wallEntity.addComponent(new WallComponent(0, new Vector3(-x, 0, -z)));
		wallEntity.addComponent(new TransformComponent(
			new Vector3(-x, 0, -z),
			new Vector3(0, rotation_y, 0),
			new Vector3(scale_x, 1, scale_z)
		));
		ecs.addEntity(wallEntity);
	}

	const ballEntity = new Entity();
	const pos = new Vector3(0, 0, 0);
	const vel = new Vector3(0, 0, 0);
	ballEntity.addComponent(new BallComponent(0, pos, vel));
	ballEntity.addComponent(new TransformComponent(pos, Vector3.Zero(), new Vector3(1, 1, 1)));
	ecs.addEntity(ballEntity);
}
