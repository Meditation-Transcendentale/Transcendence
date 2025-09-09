import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { BallComponent } from "../components/BallComponent.js";
import { Vector3 } from "@babylonImport";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { localPaddleId } from "../Pong.js";
import { InputComponent } from "../components/InputComponent.js";

export class MovementSystem extends System {

	update(entities: Entity[], deltaTime: number): void {
		entities.forEach(entity => {
			if (entity.hasComponent(BallComponent)) {
				const ball = entity.getComponent(BallComponent)!;
				let newPosX = ball.position.x + ball.velocity.x * (deltaTime / 1000);
				let newPosZ = ball.position.z + ball.velocity.z * (deltaTime / 1000);

				if (!ball.previousPosition) {
					ball.previousPosition = ball.position.clone();
				} else {
					ball.previousPosition.set(ball.position.x, ball.position.y, ball.position.z);
				}

				if (newPosZ <= 15 && newPosZ >= -15) {
					ball.position.set(newPosX, 0.5, newPosZ);
				}
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
				const input = entity.getComponent(InputComponent)!;
				if (paddle.id == localPaddleId || input.gameMode == "local") {
					const dist = Math.abs(paddle.offset - paddle.serverOffset);
					if (dist > 0) {
						console.log("dist", dist);
						if (dist >= 0.5) {
							paddle.offset = paddle.serverOffset;
						} else {
							const corrected = (1 - 0.3) * paddle.offset + 0.3 * paddle.serverOffset;
							paddle.offset = corrected;
						}
					}
				}
			}
		});
	}
}
