import { ParticleSystem, Vector3, Texture, Scene, Color4 } from "@babylonjs/core";
import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { BallComponent } from "../components/BallComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";

export class VisualEffectSystem extends System {
	private scene!: Scene;
	private particlePool: ParticleSystem[] = [];
	private maxParticle: number = 5;
	private texture: Texture;

	constructor(scene: Scene) {
		super();
		this.scene = scene;
		this.texture = new Texture("textures/Shard_Alpha.png", this.scene);
		for (let i = 0; i < this.maxParticle; i++) {
			this.particlePool.push(this.createParticleSystem());
		}
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

			if ((transform.position.x >= 14 || transform.position.x <= -14) /*&& ball.destroy === false*/) {
				const direction = ball.velocity.clone();
				const position = transform.position.clone().add(ball.velocity.scale(4 * deltaTime / 1000));
				position.y = 0.5;

				this.emitParticles(position, direction);
			}
		}
	}

	private createParticleSystem(): ParticleSystem {
		const ps = new ParticleSystem("particles", 10, this.scene);
		ps.particleTexture = this.texture;

		ps.color1 = new Color4(1.0, 1.0, 1.0, 1.0);
		ps.color2 = new Color4(1.0, 1.0, 1.0, 1.0);
		ps.colorDead = new Color4(0.0, 0.0, 0.0, 1.0);

		ps.minSize = 0.01;
		ps.maxSize = 0.5;

		ps.minLifeTime = 0.1;
		ps.maxLifeTime = 0.25;

		ps.emitRate = 10;

		ps.minEmitPower = 1;
		ps.maxEmitPower = 3;
		ps.updateSpeed = 0.005;

		ps.manualEmitCount = 50;

		ps.minInitialRotation = 0;
		ps.maxInitialRotation = 2 * Math.PI;

		ps.stop();
		return ps;
	}

	private emitParticles(position: Vector3, direction: Vector3) {
		const ps = this.particlePool.find(p => !p.isStarted());
		if (!ps) return;

		const spread = 0.5;
		const randomVec = () => new Vector3(
			(Math.random() - 0.5) * spread,
			(Math.random() - 0.5) * spread,
			(Math.random() - 0.5) * spread
		);

		ps.emitter = position;
		ps.createDirectedSphereEmitter(1, direction.add(randomVec()), direction.add(randomVec().negate()));
		ps.manualEmitCount = 50;
		ps.start();

		setTimeout(() => {
			ps.stop();
			ps.reset();
		}, (0.25 / 0.005 * (1000 / 60)) + 50);
	}

	dispose(): void {
		for (const ps of this.particlePool) {
			ps.stop();
			ps.dispose();
		}
		this.particlePool = [];
	}
}
