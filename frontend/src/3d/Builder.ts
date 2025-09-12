import { Vector3 } from "@babylonImport";
import { Monolith } from "./Monolith";
import { SDFBuilder } from "./Sdf";

export function createTempleMonolith(scene: any, size: number, cursor: Vector3): Monolith {
	const monolith = new Monolith(scene, size, cursor);

	const basePlatform = SDFBuilder.box(
		new Vector3(size * 0.8, size * 0.2, size * 0.8),
		{
			position: new Vector3(0, 0.7, 0),
		}
	);
	//const pillar = SDFBuilder.box(
	//	new Vector3(size * 0.01, 2. + size * 10., size * 0.01),
	//	//{
	//	//	position: new Vector3(0., 0., 0.),
	//	//	rotation: Vector3.Zero(),
	//	//	scale: Vector3.Zero()
	//	//}
	//);

	const mainPyramid = SDFBuilder.pyramid(
		1.0,
		{
			position: new Vector3(0, 2., 0),
			scale: new Vector3(size * 0.5, size * 2., size * 0.4)
		}
	);

	const mainEntrance = SDFBuilder.cylinder(
		0.5,
		size * 0.6,
		{
			position: new Vector3(0, 2. + size * 0.08, 0),
			rotation: new Vector3(Math.PI * 0.5, 0, 0),
			scale: new Vector3(size * 0.1, size * 2., size * 0.1)
		}
	);

	const temple = SDFBuilder.union(
		basePlatform,
		SDFBuilder.subtract(mainPyramid, SDFBuilder.union(mainEntrance)),

	);

	monolith.setSDFTree(temple);
	return monolith;
}
