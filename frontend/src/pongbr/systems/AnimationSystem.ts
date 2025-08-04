// systems/AnimationSystem.ts
import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { AnimationComponent } from "../components/AnimationComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";

import { PortalComponent } from "../components/PortalComponent.js";
export class AnimationSystem implements System {
	update(entities: Entity[], deltaSec: number) {
		entities
			.filter(ent =>
				ent.hasComponent(PortalComponent) &&
				ent.hasComponent(TransformComponent)
			)
			.forEach(ent => {
				const tx = ent.getComponent(TransformComponent)!;
				tx.rotation.y += Math.PI / 1000;
				// tx.rotation.z -= Math.PI / 220;

			});
	}
}

