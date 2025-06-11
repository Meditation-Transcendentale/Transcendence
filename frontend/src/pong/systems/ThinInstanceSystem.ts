import { Camera } from "@babylonjs/core";
import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { ThinInstanceManager } from "../rendering/ThinInstanceManager.js";
import { BallComponent } from "../components/BallComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { WallComponent } from "../components/WallComponent.js";

export class ThinInstanceSystem extends System {
	private ballManager: ThinInstanceManager;
	private paddleManager: ThinInstanceManager;
	private wallManager: ThinInstanceManager;
	private camera: Camera;
	private frameCount: number = 0;

	constructor(
		ballManager: ThinInstanceManager,
		paddleManager: ThinInstanceManager,
		wallManager: ThinInstanceManager,
		camera: Camera
	) {
		super();
		this.ballManager = ballManager;
		this.paddleManager = paddleManager;
		this.wallManager = wallManager;
		this.camera = camera;
	}

	update(entities: Entity[], deltaTime: number): void {
		// console.log("Thin instance system:", performance.now());
		this.frameCount++;
		this.ballManager.update(entities, BallComponent, this.camera, this.frameCount);

		const paddleEntities = entities.filter(e => e.hasComponent(PaddleComponent));
		const activePaddleEntities = paddleEntities.filter(e => {
			const paddle = e.getComponent(PaddleComponent);
			return paddle;
		});

		this.paddleManager.update(activePaddleEntities, PaddleComponent, this.camera, this.frameCount);
		this.wallManager.update(entities, WallComponent, this.camera, this.frameCount);
	}
}
