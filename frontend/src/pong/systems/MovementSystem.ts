import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { BallComponent } from "../components/BallComponent.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

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

				if (age < 17){
					const dist = Vector3.Distance(ball.position, ball.serverPosition);
					if (dist > 0 && dist < 0.5) {
						const corrected = Vector3.Lerp(ball.position, ball.serverPosition, 0.1);
						ball.position.copyFrom(corrected);
					} else if (dist > 0.5) {
						ball.position.copyFrom(ball.serverPosition);
					}
				}
			}
		});
	}
}
