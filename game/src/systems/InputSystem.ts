import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { InputComponent } from "../components/InputComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { InputManager } from "../input/InputManager.js";
import { Matrix, Scene, Vector3 } from "@babylonjs/core";

export class InputSystem extends System {
    private inputManager: InputManager;
	private scene: Scene;

    constructor(inputManager: InputManager, scene: Scene) {
        super();
        this.inputManager = inputManager;
		this.scene = scene;
    }

    update(entities: Entity[], deltaTime: number): void {
        entities.forEach(entity => {
            if (entity.hasComponent(InputComponent) && entity.hasComponent(PaddleComponent)) {
                const input = entity.getComponent(InputComponent)!;
				const paddle = entity.getComponent(PaddleComponent)!;
                let speed = 0.3;
				if (this.inputManager.isKeyPressed("Space")) {
					input.down = true;
                } else if (input.down == true){
                    input.down = false;
                }
				input.pointer = this.inputManager.pointerPosition();
				const ray = this.scene.createPickingRay(input.pointer.x, input.pointer.y, Matrix.Identity(), null);
				const hit = this.scene.pickWithRay(ray);
				if (hit?.pickedMesh) {
					let targetPosition = hit.pickedPoint!;
					targetPosition.y = paddle.position.y;

					let direction = targetPosition.subtract(paddle.position);
					const distance = direction.length();
					direction.y = paddle.position.y;

					if (distance < 0.01){
						paddle.velocity = Vector3.Zero();
					} else {
						paddle.rotation.y = Math.atan2(direction.x, direction.z);
						direction.normalize();
						speed *= Math.min(distance, 1);
						paddle.velocity = Vector3.Lerp(paddle.velocity, direction.scale(speed), 0.5);
					}
				}
            }
        });
    }
}
