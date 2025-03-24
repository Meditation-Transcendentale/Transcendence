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

// constructor(scene: Scene, zoneId: number, totalPlayers: number, arenaRadius: number) {
//     this.zoneId = zoneId;
//     //console.log(zoneId);
//     this.masterMesh = Paddle.getMasterMesh(scene);
//
//     const angle = (2 * Math.PI / totalPlayers) * zoneId;
//     const offset = arenaRadius * 1;
//     this.zoneCenter = new Vector3(offset * Math.cos(angle), 0, offset * Math.sin(angle));
//
//     const zoneAngleWidth = (2 * Math.PI) / totalPlayers;
//     const leftAngle = angle - zoneAngleWidth / 2;
//     const rightAngle = angle + zoneAngleWidth / 2;
//     const pillarOffset = arenaRadius * 1;
//     this.leftPillarPosition = new Vector3(pillarOffset * Math.cos(leftAngle), 0, pillarOffset * Math.sin(leftAngle));
//     this.rightPillarPosition = new Vector3(pillarOffset * Math.cos(rightAngle), 0, pillarOffset * Math.sin(rightAngle));
//     const chordLength = 2 * pillarOffset * Math.sin(zoneAngleWidth / 2);
//     this.maxOffset = chordLength / 2 - 0.56;
//     console.log(this.maxOffset);
//     this.localBaseMatrix = Matrix.Translation(this.zoneCenter.x, 0.5, this.zoneCenter.z);
//     const tangentangle = angle + Math.PI / 2;
//     const rotationMatrix = Matrix.RotationY(-tangentangle);
//     this.localBaseMatrix = rotationMatrix.multiply(this.localBaseMatrix);
//     this.instanceIndex = Paddle.addInstance(scene, this.localBaseMatrix);
//     this.showWall(scene);
// }
export function createGameTemplate(ecs: ECSManager, config: GameTemplateConfig): void {
	const zoneAngleWidth = (2 * Math.PI) / config.numberOfPlayers;

	for (let i = 0; i < config.numberOfPlayers; i++) {
		const angle = (2 * Math.PI / config.numberOfPlayers) * i;
		const x = (config.arenaRadius) * Math.cos(angle);
		const z = (config.arenaRadius) * Math.sin(angle);
		console.log("x = ",x, "z = ", z);
		const paddleEntity = new Entity();
		paddleEntity.addComponent(new PaddleComponent(new Vector3(x, 0, z)));
		paddleEntity.addComponent(new InputComponent());
		paddleEntity.addComponent(new ShieldComponent());
		paddleEntity.addComponent(new TransformComponent(
			new Vector3(x, 0.5, z),
			new Vector3(0, -(angle + (Math.PI / 2)), 0),
			new Vector3(1, 1, 1)
		));
		paddleEntity.addComponent(new ShieldTransformComponent(
			new Vector3(x, 0.5, z),
			new Vector3(0, -(angle + (Math.PI / 2)), 0),
			new Vector3(0, 0, 0),
			i
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

	for (let i = 0; i < config.numPillars; i++) {
		const angle = (2 * Math.PI / config.numberOfPlayers) * i;
		const leftAngle = angle - zoneAngleWidth / 2;
		const rightAngle = angle + zoneAngleWidth / 2;
		const x = config.arenaRadius * Math.cos(leftAngle);
		const z = config.arenaRadius * Math.sin(leftAngle);
		const pillarEntity = new Entity();
		pillarEntity.addComponent(new PillarComponent(new Vector3(x, 0, z)));
		pillarEntity.addComponent(new TransformComponent(
			new Vector3(x, 1, z),
			new Vector3(0, -(leftAngle + (Math.PI / 2)), 0),
			new Vector3(1, 1, 1)
		));
		ecs.addEntity(pillarEntity);
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
