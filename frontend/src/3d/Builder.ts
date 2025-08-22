import { Vector3 } from "@babylonImport";
import { Monolith } from "./Monolith";
import { SDFBuilder } from "./Sdf";

export function createTempleMonolith(scene: any, size: number): Monolith {
	const monolith = new Monolith(scene, size, Vector3.Zero());

	const basePlatform = SDFBuilder.box(
		new Vector3(size * 1.2, size * 0.2, size * 1.2),
		{
			position: new Vector3(0, -size * 0.1, 0),
		}
	);

	const mainPyramid = SDFBuilder.pyramid(
		1.0,
		{
			position: new Vector3(0, 0., 0),
			scale: new Vector3(size * 0.5, size * 2., size * 0.2)
		}
	);

	const mainEntrance = SDFBuilder.cylinder(
		0.5,
		size * 0.6,
		{
			position: new Vector3(0, size * 0.08, 0),
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

//// Example 2: Fortress with towers
//export function createFortressMonolith(scene: any, size: number): Monolith {
//	const monolith = new Monolith(scene, size, Vector3.Zero());
//
//	// Main keep (central tower)
//	const mainKeep = SDFBuilder.cylinder(
//		0.5,
//		1.0,
//		{
//			position: new Vector3(0, size * 0.4, 0),
//			scale: new Vector3(size * 0.3, size * 0.8, size * 0.3)
//		}
//	);
//
//	// Corner towers
//	const towers = [
//		{ x: -size * 0.4, z: -size * 0.4 },
//		{ x: size * 0.4, z: -size * 0.4 },
//		{ x: -size * 0.4, z: size * 0.4 },
//		{ x: size * 0.4, z: size * 0.4 }
//	].map(pos =>
//		SDFBuilder.cylinder(
//			0.5,
//			1.0,
//			{
//				position: new Vector3(pos.x, size * 0.25, pos.z),
//				scale: new Vector3(size * 0.15, size * 0.5, size * 0.15)
//			}
//		)
//	);
//
//	// Connecting walls
//	const walls = [
//		// Front and back walls
//		SDFBuilder.box(
//			new Vector3(size * 0.8, size * 0.3, size * 0.1),
//			{ position: new Vector3(0, size * 0.15, -size * 0.4) }
//		),
//		SDFBuilder.box(
//			new Vector3(size * 0.8, size * 0.3, size * 0.1),
//			{ position: new Vector3(0, size * 0.15, size * 0.4) }
//		),
//		// Side walls
//		SDFBuilder.box(
//			new Vector3(size * 0.1, size * 0.3, size * 0.8),
//			{ position: new Vector3(-size * 0.4, size * 0.15, 0) }
//		),
//		SDFBuilder.box(
//			new Vector3(size * 0.1, size * 0.3, size * 0.8),
//			{ position: new Vector3(size * 0.4, size * 0.15, 0) }
//		)
//	];
//
//	// Gate entrance
//	const gate = SDFBuilder.box(
//		new Vector3(size * 0.2, size * 0.25, size * 0.2),
//		{ position: new Vector3(0, size * 0.125, -size * 0.4) }
//	);
//
//	// Arrow slits in towers
//	const arrowSlits = towers.map((_, index) => {
//		const pos = [
//			{ x: -size * 0.4, z: -size * 0.4 },
//			{ x: size * 0.4, z: -size * 0.4 },
//			{ x: -size * 0.4, z: size * 0.4 },
//			{ x: size * 0.4, z: size * 0.4 }
//		][index];
//
//		return SDFBuilder.box(
//			new Vector3(size * 0.02, size * 0.1, size * 0.2),
//			{ position: new Vector3(pos.x, size * 0.3, pos.z) }
//		);
//	});
//
//	// Combine fortress
//	const fortress = SDFBuilder.subtract(
//		SDFBuilder.union(mainKeep, ...towers, ...walls),
//		SDFBuilder.union(gate, ...arrowSlits)
//	);
//
//	monolith.setSDFTree(fortress);
//	return monolith;
//}
//
//// Example 3: Organic crystal formation
//export function createCrystalMonolith(scene: any, size: number): Monolith {
//	const monolith = new Monolith(scene, size, Vector3.Zero());
//
//	// Central crystal cluster
//	const mainCrystal = SDFBuilder.pyramid(
//		1.0,
//		{
//			position: new Vector3(0, size * 0.3, 0),
//			scale: new Vector3(size * 0.4, size * 0.6, size * 0.4)
//		}
//	);
//
//	// Smaller crystal growths
//	const crystalGrowths = [
//		SDFBuilder.pyramid(1.0, {
//			position: new Vector3(-size * 0.3, size * 0.2, -size * 0.2),
//			rotation: new Vector3(0, Math.PI * 0.3, Math.PI * 0.1),
//			scale: new Vector3(size * 0.15, size * 0.25, size * 0.15)
//		}),
//		SDFBuilder.pyramid(1.0, {
//			position: new Vector3(size * 0.25, size * 0.15, size * 0.3),
//			rotation: new Vector3(0, -Math.PI * 0.4, -Math.PI * 0.15),
//			scale: new Vector3(size * 0.12, size * 0.2, size * 0.12)
//		}),
//		SDFBuilder.pyramid(1.0, {
//			position: new Vector3(size * 0.1, size * 0.4, -size * 0.35),
//			rotation: new Vector3(Math.PI * 0.2, Math.PI * 0.1, 0),
//			scale: new Vector3(size * 0.08, size * 0.15, size * 0.08)
//		})
//	];
//
//	// Smooth union for organic feel
//	const crystalFormation = SDFBuilder.smoothUnion(
//		size * 0.05, // Smoothness factor
//		mainCrystal,
//		...crystalGrowths
//	);
//
//	// Add some cavities for more detail
//	const cavities = [
//		SDFBuilder.sphere(0.5, {
//			position: new Vector3(-size * 0.1, size * 0.25, size * 0.1),
//			scale: new Vector3(size * 0.08, size * 0.08, size * 0.08)
//		}),
//		SDFBuilder.sphere(0.5, {
//			position: new Vector3(size * 0.15, size * 0.35, -size * 0.1),
//			scale: new Vector3(size * 0.06, size * 0.06, size * 0.06)
//		})
//	];
//
//	const finalCrystal = SDFBuilder.subtract(
//		crystalFormation,
//		SDFBuilder.union(...cavities)
//	);
//
//	monolith.setSDFTree(finalCrystal);
//	return monolith;
//}
//
//// Example 4: Modern architectural structure
//export function createModernMonolith(scene: any, size: number): Monolith {
//	const monolith = new Monolith(scene, size, Vector3.Zero());
//
//	// Base structure
//	const base = SDFBuilder.box(
//		new Vector3(size * 0.8, size * 0.1, size * 0.8),
//		{ position: new Vector3(0, size * 0.05, 0) }
//	);
//
//	// Main tower with twisted geometry
//	const mainTower = SDFBuilder.box(
//		new Vector3(size * 0.4, size * 0.8, size * 0.4),
//		{
//			position: new Vector3(0, size * 0.4, 0),
//			rotation: new Vector3(0, Math.PI * 0.125, 0) // 22.5 degree twist
//		}
//	);
//
//	// Side annexes
//	const leftAnnex = SDFBuilder.box(
//		new Vector3(size * 0.2, size * 0.4, size * 0.3),
//		{ position: new Vector3(-size * 0.35, size * 0.2, 0) }
//	);
//
//	const rightAnnex = SDFBuilder.box(
//		new Vector3(size * 0.2, size * 0.5, size * 0.3),
//		{ position: new Vector3(size * 0.35, size * 0.25, 0) }
//	);
//
//	// Windows and openings
//	const mainWindows = [
//		// Vertical window strip
//		SDFBuilder.box(
//			new Vector3(size * 0.05, size * 0.6, size * 0.3),
//			{ position: new Vector3(0, size * 0.4, size * 0.15) }
//		),
//		// Horizontal bands
//		SDFBuilder.box(
//			new Vector3(size * 0.35, size * 0.03, size * 0.3),
//			{ position: new Vector3(0, size * 0.3, size * 0.15) }
//		),
//		SDFBuilder.box(
//			new Vector3(size * 0.35, size * 0.03, size * 0.3),
//			{ position: new Vector3(0, size * 0.5, size * 0.15) }
//		)
//	];
//
//	const annexWindows = [
//		SDFBuilder.box(
//			new Vector3(size * 0.15, size * 0.05, size * 0.25),
//			{ position: new Vector3(-size * 0.35, size * 0.2, 0) }
//		),
//		SDFBuilder.box(
//			new Vector3(size * 0.15, size * 0.05, size * 0.25),
//			{ position: new Vector3(size * 0.35, size * 0.25, 0) }
//		)
//	];
//
//	// Bridge connecting structures
//	const bridge = SDFBuilder.box(
//		new Vector3(size * 0.15, size * 0.05, size * 0.1),
//		{ position: new Vector3(0, size * 0.6, 0) }
//	);
//
//	// Combine all elements
//	const modernStructure = SDFBuilder.subtract(
//		SDFBuilder.union(base, mainTower, leftAnnex, rightAnnex, bridge),
//		SDFBuilder.union(...mainWindows, ...annexWindows)
//	);
//
//	monolith.setSDFTree(modernStructure);
//	return monolith;
//}
//
//// Example 5: Interactive builder pattern
//export class MonolithBuilder {
//	private scene: any;
//	private monolith: Monolith;
//	private currentSDF: any = null;
//
//	constructor(scene: any, size: number) {
//		this.scene = scene;
//		this.monolith = new Monolith(scene, size, Vector3.Zero());
//	}
//
//	// Start with a base shape
//	base(type: 'box' | 'sphere' | 'cylinder' | 'pyramid', params: any, transform?: any) {
//		switch (type) {
//			case 'box':
//				this.currentSDF = SDFBuilder.box(params.size, transform);
//				break;
//			case 'sphere':
//				this.currentSDF = SDFBuilder.sphere(params.radius, transform);
//				break;
//			case 'cylinder':
//				this.currentSDF = SDFBuilder.cylinder(params.radius, params.height, transform);
//				break;
//			case 'pyramid':
//				this.currentSDF = SDFBuilder.pyramid(params.height, transform);
//				break;
//		}
//		return this;
//	}
//
//	// Add shapes with operations
//	add(type: 'box' | 'sphere' | 'cylinder' | 'pyramid', params: any, transform?: any) {
//		let shape;
//		switch (type) {
//			case 'box':
//				shape = SDFBuilder.box(params.size, transform);
//				break;
//			case 'sphere':
//				shape = SDFBuilder.sphere(params.radius, transform);
//				break;
//			case 'cylinder':
//				shape = SDFBuilder.cylinder(params.radius, params.height, transform);
//				break;
//			case 'pyramid':
//				shape = SDFBuilder.pyramid(params.height, transform);
//				break;
//			default:
//				return this;
//		}
//
//		if (this.currentSDF) {
//			this.currentSDF = SDFBuilder.union(this.currentSDF, shape);
//		} else {
//			this.currentSDF = shape;
//		}
//		return this;
//	}
//
//	subtract(type: 'box' | 'sphere' | 'cylinder' | 'pyramid', params: any, transform?: any) {
//		let shape;
//		switch (type) {
//			case 'box':
//				shape = SDFBuilder.box(params.size, transform);
//				break;
//			case 'sphere':
//				shape = SDFBuilder.sphere(params.radius, transform);
//				break;
//			case 'cylinder':
//				shape = SDFBuilder.cylinder(params.radius, params.height, transform);
//				break;
//			case 'pyramid':
//				shape = SDFBuilder.pyramid(params.height, transform);
//				break;
//			default:
//				return this;
//		}
//
//		if (this.currentSDF) {
//			this.currentSDF = SDFBuilder.subtract(this.currentSDF, shape);
//		}
//		return this;
//	}
//
//	smoothUnion(smoothness: number, type: 'box' | 'sphere' | 'cylinder' | 'pyramid', params: any, transform?: any) {
//		let shape;
//		switch (type) {
//			case 'box':
//				shape = SDFBuilder.box(params.size, transform);
//				break;
//			case 'sphere':
//				shape = SDFBuilder.sphere(params.radius, transform);
//				break;
//			case 'cylinder':
//				shape = SDFBuilder.cylinder(params.radius, params.height, transform);
//				break;
//			case 'pyramid':
//				shape = SDFBuilder.pyramid(params.height, transform);
//				break;
//			default:
//				return this;
//		}
//
//		if (this.currentSDF) {
//			this.currentSDF = SDFBuilder.smoothUnion(smoothness, this.currentSDF, shape);
//		} else {
//			this.currentSDF = shape;
//		}
//		return this;
//	}
//
//	build(): Monolith {
//		if (this.currentSDF) {
//			this.monolith.setSDFTree(this.currentSDF);
//		}
//		return this.monolith;
//	}
//}

// Usage example of the builder pattern:
export function createCustomMonolith(scene: any, size: number): Monolith {
	return new MonolithBuilder(scene, size)
		.base('pyramid', { height: 1.0 }, {
			scale: new Vector3(size * 0.8, size, size * 0.8)
		})
		.subtract('cylinder', { radius: 0.5, height: size * 0.6 }, {
			position: new Vector3(0, size * 0.3, 0),
			rotation: new Vector3(Math.PI * 0.5, 0, 0),
			scale: new Vector3(size * 0.25, 1, size * 0.25)
		})
		.smoothUnion(size * 0.1, 'sphere', { radius: 0.5 }, {
			position: new Vector3(-size * 0.4, size * 0.2, 0),
			scale: new Vector3(size * 0.2, size * 0.2, size * 0.2)
		})
		.add('cylinder', { radius: 0.5, height: 1.0 }, {
			position: new Vector3(size * 0.5, size * 0.25, 0),
			scale: new Vector3(size * 0.1, size * 0.5, size * 0.1)
		})
		.build();
}
