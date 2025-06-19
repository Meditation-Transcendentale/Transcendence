// systems/AnimationSystem.ts
import { System } from "../ecs/System.js";
import { Entity } from "../ecs/Entity.js";
import { AnimationComponent } from "../components/AnimationComponent.js";
import { TransformComponent } from "../components/TransformComponent.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

export class AnimationSystem implements System {
	update(entities: Entity[], deltaSec: number) {
		// filter for exactly the entities we care about:
		entities
			.filter(ent =>
				ent.hasComponent(AnimationComponent) &&
				ent.hasComponent(TransformComponent)
			)
			.forEach(ent => {
				const anim = ent.getComponent(AnimationComponent)!;
				const tx = ent.getComponent(TransformComponent)!;

				anim.elapsed = Math.min(anim.elapsed + deltaSec, anim.duration);
				const t = anim.ease(anim.elapsed / anim.duration);
				const lerp = (a: Vector3, b: Vector3) => Vector3.Lerp(a, b, t);

				switch (anim.prop) {
					case "position": tx.position = lerp(anim.from, anim.to); break;
					case "rotation": tx.rotation = lerp(anim.from, anim.to); break;
					case "scale": tx.scale = lerp(anim.from, anim.to); break;
				}

				if (anim.elapsed >= anim.duration) {
					ent.removeComponent(AnimationComponent);
				}
			});
	}
}

