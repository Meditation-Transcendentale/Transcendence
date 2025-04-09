import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { WallComponent } from "../components/WallComponent.js";
import { InputComponent } from "../components/InputComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";

export class EliminationSystem extends System {
	update(entities: Entity[], deltaTime: number): void {
		entities.forEach(entity => {
			if (entity.hasComponent(PaddleComponent)) {
				const paddle = entity.getComponent(PaddleComponent)! as any;
				if (paddle.eliminated) {
					entity.components.delete(PaddleComponent.name);
					entity.components.delete(InputComponent.name);

					const transform = entity.getComponent(TransformComponent);
					if (transform) {
						entity.addComponent(new WallComponent(0, transform.position));
					} else {
						entity.addComponent(new WallComponent(0, paddle.position));
					}
				}
			}
		});
	}
}
