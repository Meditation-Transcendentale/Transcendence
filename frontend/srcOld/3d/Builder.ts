import { Vector3 } from "@babylonImport";
import { Monolith } from "./Monolith";
import { SDFBuilder } from "./Sdf";

export function createTempleMonolith(scene: any, size: number, cursor: Vector3): Monolith {
	const monolith = new Monolith(scene, size, cursor);

	monolith.setCustomBounds(
		new Vector3(-size * 0.6, -size * 0.1, -size * 0.5),
		new Vector3(size * 0.6, size * 1., size * 0.5)
	);

	const mainPyramid = SDFBuilder.pyramid(1.0, {
		position: new Vector3(0, size * 0.3, 0),
		scale: new Vector3(size * 0.4, size * 0.9, size * 0.3)
	});

	const floatingPyramid = SDFBuilder.pyramid(1.0, {
		position: new Vector3(0, size * 0.295, 0),
		scale: new Vector3(size * 0.4, -size * 0.2, size * 0.3)
	});


	const mainEntrance = SDFBuilder.cylinder(1.0, 1.0, {
		position: new Vector3(0, size * 0.3, size * 0.12),
		rotation: new Vector3(Math.PI * 0.5, 0, 0),
		scale: new Vector3(size * 0.08, size * 0.9, size * 0.08)
	});

	const temple = SDFBuilder.union(
		SDFBuilder.subtract(
			SDFBuilder.union(mainPyramid, floatingPyramid),
			mainEntrance,
		)
	);

	monolith.setSDFTree(temple);
	return monolith;
}
