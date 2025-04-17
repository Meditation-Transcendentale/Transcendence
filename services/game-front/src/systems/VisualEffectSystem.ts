import { ParticleSystem, Vector3, Texture, Scene, Color4 } from "@babylonjs/core";
import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { BallComponent } from "../components/BallComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";

export class VisualEffectSystem extends System {
	private scene!: Scene;

	constructor(scene: Scene) {
		super();
		this.scene = scene;
		
	}

	update(entities: Entity[], deltaTime: number): void {
		for (const entity of entities) {
			if (
				!entity.hasComponent(BallComponent) ||
				!entity.hasComponent(TransformComponent)
			) {
				continue;
			}
			const transform = entity.getComponent(TransformComponent)!;
			const ball = entity.getComponent(BallComponent)!;
			if ((transform.position.x >= 15 || transform.position.x <= -15) && ball.destroy === false) {
				const direction = ball.velocity.clone();
				const spread = 0.5;
				const randomVec = () => new Vector3(
					(Math.random() - 0.5) * spread,
					(Math.random() - 0.5) * spread,
					(Math.random() - 0.5) * spread
				);
				
				let particleSystem = new ParticleSystem("particles", 200, this.scene);
				let position = transform.position.clone();
				position.set(position.x + ball.velocity.x * (deltaTime / 1000), 0.5, position.z + ball.velocity.z * (deltaTime / 1000));
				particleSystem.emitter = position;
				
				//Texture of each particle
				particleSystem.particleTexture = new Texture("textures/Shard_Alpha.png", this.scene);

				// Where the particles come from

				// Colors of all particles
				particleSystem.color1 = new Color4(0.7, 0.8, 1.0, 1.0);
				particleSystem.color2 = new Color4(0.2, 0.5, 1.0, 1.0);
				particleSystem.colorDead = new Color4(0, 0, 0.2, 1.0);

				// Size of each particle (random between...
				particleSystem.minSize = 0.01;
				particleSystem.maxSize = 0.5;

				// Life time of each particle (random between...
				particleSystem.minLifeTime = 0.3;
				particleSystem.maxLifeTime = 0.75;

				// Emission rate
				particleSystem.emitRate = 10;


				/******* Emission Space ********/
				particleSystem.createDirectedSphereEmitter(1, direction.add(randomVec()), direction.add(randomVec().negate()))


				// Speed
				particleSystem.minEmitPower = 1;
				particleSystem.maxEmitPower = 3;
				particleSystem.updateSpeed = 0.005;

				particleSystem.manualEmitCount = 50;

				particleSystem.minInitialRotation = 0;
				particleSystem.maxInitialRotation = 2 * Math.PI;

				// Start the particle system
				particleSystem.start();

				transform.scale = new Vector3(0, 0, 0);
				ball.velocity = new Vector3(0, 0, 0);
				ball.destroy = true;
			}
		}
		
	}
}