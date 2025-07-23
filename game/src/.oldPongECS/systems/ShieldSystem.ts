import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { InputComponent } from "../components/InputComponent.js";
import { PaddleComponent } from "../components/PaddleComponent.js";
import { ShieldComponent } from "../components/ShieldComponent.js";

export class ShieldSystem extends System {
	update(entities: Entity[], deltaTime: number): void {
		entities.forEach(entity => {
			if (entity.hasComponent(PaddleComponent) && entity.hasComponent(InputComponent) && entity.hasComponent(ShieldComponent)) {
				const player = entity.getComponent(PaddleComponent)!;
				const shield = entity.getComponent(ShieldComponent)!;
				const input = entity.getComponent(InputComponent)!;
				this.spawnShield(input, player, shield);
			}
		});
	}

	private spawnShield(input: InputComponent, player: PaddleComponent, shield: ShieldComponent): void {
		if (!player.isAlive) return;

		if (shield.angleFactor != 1 && input.down == true)
			shield.isActive = 1.0;
		else
			shield.isActive = 0.0;

		if (input.down === true) {
			shield.lastInputDelay = performance.now();
			shield.angleFactor = Math.min(1, shield.angleFactor + 0.01);
		} else if (performance.now() - shield.lastInputDelay >= 500) {
			shield.angleFactor = Math.max(0.5, shield.angleFactor - 0.01);
		}
		shield.oldAngleFactor = shield.angleFactor;
	}

	
}
