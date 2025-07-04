import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { BallComponent } from "../components/BallComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";

export class MovementSystem extends System {
    update(entities: Entity[], deltaTime: number): void {
        entities.forEach(entity => {
            if (entity.hasComponent(BallComponent)) {
                const ball = entity.getComponent(BallComponent)!;
                ball.position.addInPlace(ball.velocity.scale(deltaTime / 1000));
            }
			if (entity.hasComponent(PaddleComponent)){
				const player = entity.getComponent(PaddleComponent)!;
				const transform = entity.getComponent(TransformComponent)!;
				player.position.addInPlace(player.velocity.scale(deltaTime / 100));
				const distance = Math.hypot(player.position.x, player.position.z);
				if ( distance > 10 - 0.5){
					const factor = (10 - 0.5) / distance;
					player.position.x *= factor;
					player.position.z *= factor;
				}
				transform.position = player.position;
				transform.rotation = player.rotation;
			}
        });
    }
}
