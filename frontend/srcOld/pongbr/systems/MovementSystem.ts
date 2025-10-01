import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { BallComponent } from "../components/BallComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { localPaddleId } from "../PongBR.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { Vector3 } from "@babylonImport";

export class MovementSystem extends System {
	update(entities: Entity[], deltaTime: number): void {
		entities.forEach(entity => {
			if (entity.hasComponent(BallComponent)) {
				const ball = entity.getComponent(BallComponent)!;
				let newPosX = ball.position.x + ball.velocity.x * (deltaTime);
				let newPosZ = ball.position.z + ball.velocity.z * (deltaTime);

				if (!ball.previousPosition) {
					ball.previousPosition = ball.position.clone();
				} else {
					ball.previousPosition.set(ball.position.x, ball.position.y, ball.position.z);
				}

				ball.position.set(newPosX, ball.position.y, newPosZ);
				const now = performance.now();
				const age = now - ball.lastServerUpdate;

				if (age < 17) {
					const dist = Vector3.Distance(ball.position, ball.serverPosition);
					if (dist > 0 && dist < 1) {
						const corrected = Vector3.Lerp(ball.position, ball.serverPosition, 0.1);
						ball.position.copyFrom(corrected);
					} else if (dist > 1) {
						ball.position.copyFrom(ball.serverPosition);
					}
				}
			}
			if (entity.hasComponent(PaddleComponent)) {
				const paddle = entity.getComponent(PaddleComponent)!;
				const transform = entity.getComponent(TransformComponent) as TransformComponent;
				if (paddle.id == localPaddleId) {
					const dist = Math.abs(paddle.offset - paddle.serverOffset);
					if (dist > 0) {
						if (dist >= 0.003) {
							paddle.offset = paddle.serverOffset;
						} else {
							const smoothingFactor = 0.85;
							paddle.offset = paddle.offset * (1 - smoothingFactor) + paddle.serverOffset * smoothingFactor;
						}
						transform.rotation.y = paddle.baseRotation - paddle.offset;
					}

					paddle.lastServerOffset = paddle.serverOffset;
				}
			}
		});
	}
}
