import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { BallComponent } from "../components/BallComponent.js";

export class MovementSystem extends System {
    update(entities: Entity[], deltaTime: number): void {
        entities.forEach(entity => {
            if (entity.hasComponent(BallComponent)) {
                const ball = entity.getComponent(BallComponent)!;
                ball.position.addInPlace(ball.velocity.scale(deltaTime / 1000));
            }
        });
    }
}
