import { Camera } from "@babylonjs/core";
import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { ThinInstanceManager } from "../rendering/ThinInstanceManager.js";
import { BallComponent } from "../components/BallComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { WallComponent } from "../components/WallComponent.js";
import { PillarComponent } from "../components/PillarComponent.js";

export class ThinInstanceSystem extends System {
	private ballManager: ThinInstanceManager;
	private paddleManager: ThinInstanceManager;
	private wallManager: ThinInstanceManager;
	private pillarManager: ThinInstanceManager;
	private camera: Camera;
	private frameCount: number = 0;

	constructor(
		ballManager: ThinInstanceManager,
		paddleManager: ThinInstanceManager,
		wallManager: ThinInstanceManager,
		pillarManager: ThinInstanceManager,
		camera: Camera
	) {
		super();
		this.ballManager = ballManager;
		this.paddleManager = paddleManager;
		this.wallManager = wallManager;
		this.pillarManager = pillarManager;
		this.camera = camera;
	}

	update(entities: Entity[], deltaTime: number): void {
		this.frameCount++;
		this.ballManager.update(entities, BallComponent, this.camera, this.frameCount);
		this.pillarManager.update(entities, PillarComponent, this.camera, this.frameCount);

		const paddleEntities = entities.filter(e => e.hasComponent(PaddleComponent));
		const activePaddleEntities = paddleEntities.filter(e => {
			const paddle = e.getComponent(PaddleComponent);
			return paddle && !paddle.displayAsWall;
		});
		const wallEntities = paddleEntities.filter(e => {
			const paddle = e.getComponent(PaddleComponent);
			return paddle && paddle.displayAsWall;
		});
		//console.log("Paddle count:", paddleEntities.length,
		//	"Active paddles:", activePaddleEntities.length,
		//	"Walls:", wallEntities.length);

		this.paddleManager.update(activePaddleEntities, PaddleComponent, this.camera, this.frameCount);
		this.wallManager.update(wallEntities, PaddleComponent, this.camera, this.frameCount);
	}
}
