import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { BallComponent } from "../components/BallComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { localPaddleId } from "../PongBR.js";
import { TransformComponent } from "../components/TransformComponent.js";

export class MovementSystem extends System {
	update(entities: Entity[], deltaTime: number): void {
		// console.log("Move system:", performance.now());
		entities.forEach(entity => {
			if (entity.hasComponent(BallComponent)) {
				const ball = entity.getComponent(BallComponent)!;
				// ball.position.set(ball.position.x + ball.velocity.x * (deltaTime / 1000), 0.5, ball.position.z + ball.velocity.z * (deltaTime / 1000));
				// ball.position.set(ball.position.x + ball.velocity.x, 0.5, ball.position.z + ball.velocity.z);
			}
			if (entity.hasComponent(PaddleComponent)) {
				const paddle = entity.getComponent(PaddleComponent)!;
				const transform = entity.getComponent(TransformComponent) as TransformComponent
				if (paddle.id == localPaddleId) {
					const dist = Math.abs(paddle.offset - paddle.serverOffset);
					if (dist > 0) {
						if (dist >= 0.003) {
							paddle.offset = paddle.serverOffset;
						} else {
							const corrected = (1 - 0.8) * paddle.offset + 0.8 * paddle.serverOffset;
							paddle.offset = corrected;
						}
						transform.rotation.y = paddle.baseRotation - paddle.offset;
					}
				}
			}
		});
	}
}
