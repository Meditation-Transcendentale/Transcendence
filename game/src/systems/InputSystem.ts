import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { InputComponent } from "../components/InputComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { InputManager } from "../input/InputManager.js";

export class InputSystem extends System {
    private inputManager: InputManager;

    constructor(inputManager: InputManager) {
        super();
        this.inputManager = inputManager;
    }

    update(entities: Entity[], deltaTime: number): void {
        entities.forEach(entity => {
            if (entity.hasComponent(InputComponent) && entity.hasComponent(PaddleComponent)) {
                const input = entity.getComponent(InputComponent)!;
                // const speed = 0.1 * (deltaTime / 16.67);
                // if (this.inputManager.isKeyPressed("a")) {
                //     paddle.position.y += speed;
                //     input.up = true;
                // } else {
                //     input.up = false;
                // }
                // if (this.inputManager.isKeyPressed("d")) {
                //     paddle.position.y -= speed;
                //     input.down = true;
                // } else {
                //     input.down = false;
                // }
				if (this.inputManager.isKeyPressed("Space")) {
					input.down = true;
					// console.log("input down: ", input.down);
                } else if (input.down == true){
                    input.down = false;
                }
            }
        });
    }
}
