import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { BallComponent } from "../components/BallComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { localPaddleId } from "../PongBR.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { Vector3 } from "../../../babylon";
import { InputComponent } from "../components/InputComponent.js";

export class MovementSystem extends System {
	update(entities: Entity[], deltaTime: number): void {
		for (const entity of entities) {
			if (!entity.hasComponent(BallComponent)) continue;

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

			if (age < 100) {
				const dist = Vector3.Distance(ball.position, ball.serverPosition);
				if (dist > 0 && dist < 1) {
					const smoothness = 6.3;
					const lerpFactor = 1.0 - Math.exp(-smoothness * deltaTime);
					const corrected = Vector3.Lerp(ball.position, ball.serverPosition, lerpFactor);
					ball.position.copyFrom(corrected);
				} else if (dist > 1) {
					ball.position.copyFrom(ball.serverPosition);
				}
			}
		}

		for (const entity of entities) {
			if (!entity.hasComponent(PaddleComponent)) continue;

			const paddle = entity.getComponent(PaddleComponent)!;
			const input = entity.getComponent(InputComponent)!;
			const transform = entity.getComponent(TransformComponent) as TransformComponent;
			if (input.isLocal) {
				const dist = Math.abs(paddle.offset - paddle.serverOffset);
				if (dist > 0) {
					if (dist >= 0.003) {
						paddle.offset = paddle.serverOffset;
					} else {
						const smoothness = 113.0;
						const smoothingFactor = 1.0 - Math.exp(-smoothness * deltaTime);
						paddle.offset = paddle.offset * (1 - smoothingFactor) + paddle.serverOffset * smoothingFactor;
					}
					transform.rotation.y = paddle.baseRotation - paddle.offset;
					transform.markDirty();
				}

				paddle.lastServerOffset = paddle.serverOffset;
			}
		}
	}
}
