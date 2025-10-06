import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { ThinInstanceManager } from "../rendering/ThinInstanceManager.js";
import { BallComponent } from "../components/BallComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { WallComponent } from "../components/WallComponent.js";
import { GoalComponent } from "../components/GoalComponent.js";
import { PillarComponent } from "../components/PillarComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { Camera } from "../../../babylon";

export class ThinInstanceSystem extends System {
	private ballManager: ThinInstanceManager;
	private paddleManager: ThinInstanceManager;
	private wallManager: ThinInstanceManager;
	private goalManager: ThinInstanceManager;
	private pillarManager: ThinInstanceManager;
	private camera: Camera;
	private frameCount: number = 0;

	constructor(
		ballManager: ThinInstanceManager,
		paddleManager: ThinInstanceManager,
		wallManager: ThinInstanceManager,
		goalManager: ThinInstanceManager,
		pillarManager: ThinInstanceManager,
		camera: Camera
	) {
		super();
		this.ballManager = ballManager;
		this.paddleManager = paddleManager;
		this.wallManager = wallManager;
		this.goalManager = goalManager;
		this.pillarManager = pillarManager;
		this.camera = camera;
	}

	update(entities: Entity[], deltaTime: number): void {
		this.frameCount++;
		this.ballManager.update(entities, BallComponent, this.camera, this.frameCount);
		this.paddleManager.update(entities, PaddleComponent, this.camera, this.frameCount);
		this.wallManager.update(entities, WallComponent, this.camera, this.frameCount);
		this.goalManager.update(entities, GoalComponent, this.camera, this.frameCount);
		this.pillarManager.update(entities, PillarComponent, this.camera, this.frameCount);
	}

	reset(entities: Entity[]): void {
		const paddleEntities = entities.filter(e => e.hasComponent(PaddleComponent));
		paddleEntities.forEach(entity => {
			const transform = entity.getComponent(TransformComponent);
			if (transform) {
				transform.enable();
				transform.position = transform.basePosition.clone();
			}
		});

		const wallEntities = entities.filter(e => e.hasComponent(WallComponent));
		wallEntities.forEach(entity => {
			const transform = entity.getComponent(TransformComponent);
			if (transform) {
				transform.disable();
			}
		});

		this.frameCount = 0;
	}
}
