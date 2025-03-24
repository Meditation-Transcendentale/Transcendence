import { Camera } from "@babylonjs/core";
import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { ThinInstanceManager } from "../rendering/ThinInstanceManager.js";
import { BallComponent } from "../components/BallComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { WallComponent } from "../components/WallComponent.js";
import { PillarComponent } from "../components/PillarComponent.js";
import { ShieldComponent } from "../components/ShieldComponent.js";

export class ThinInstanceSystem extends System {
    private ballManager: ThinInstanceManager;
    private paddleManager: ThinInstanceManager;
	private shieldManager: ThinInstanceManager;
    private wallManager: ThinInstanceManager;
    private pillarManager: ThinInstanceManager;
    private camera: Camera;
    private frameCount: number = 0;

    constructor(
        ballManager: ThinInstanceManager,
        paddleManager: ThinInstanceManager,
		shieldManager: ThinInstanceManager,
        wallManager: ThinInstanceManager,
        pillarManager: ThinInstanceManager,
        camera: Camera
    ) {
        super();
        this.ballManager = ballManager;
        this.paddleManager = paddleManager;
		this.shieldManager = shieldManager;
        this.wallManager = wallManager;
        this.pillarManager = pillarManager;
        this.camera = camera;
    }

	update(entities: Entity[], deltaTime: number): void {
		this.frameCount++;
		this.ballManager.update(entities, BallComponent, this.camera, this.frameCount);
		this.paddleManager.update(entities, PaddleComponent, this.camera, this.frameCount);
		
		// const shieldEntities = entities.filter(e => e.hasComponent(ShieldComponent));
		// const activeShieldEntities = shieldEntities.filter(e => {
		// 	const shield = e.getComponent(ShieldComponent);
		// 	return shield && shield.isActive;
		// });
		
		this.shieldManager.update(entities, ShieldComponent, this.camera, this.frameCount);
		this.wallManager.update(entities, WallComponent, this.camera, this.frameCount);
		this.pillarManager.update(entities, PillarComponent, this.camera, this.frameCount);
		
	}
}
