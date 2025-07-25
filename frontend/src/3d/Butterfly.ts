import { GlowLayer, LoadAssetContainerAsync, Matrix, Mesh, Scene, TransformNode, Vector3, Vector4 } from "@babylonImport";
import { ButterflyMaterial } from "./Shader";
import { Noise } from "./Noise";

export class Butterfly {

	public root: TransformNode;

	private mesh!: Mesh;
	private material: ButterflyMaterial;
	private scene: Scene;

	private once = 0;

	private moves!: Float32Array;

	public positions: Array<Vector3>;

	private velocities: Array<Vector3>;

	private directions!: Float32Array;
	private flying!: Float32Array;


	private deltas!: Float32Array;
	private n: number = 300;

	private speed = 0.8;

	private octree: OctreeBlock;
	private flock: number = 1;
	private disperse: number = 0;

	public glowLayer!: GlowLayer;
	private glowMat!: ButterflyMaterial;

	public origin: Vector3;

	private grid!: Grid2D;

	private fps: HTMLElement;


	constructor(scene: Scene, origin: Vector3) {
		this.scene = scene;
		this.origin = origin;

		this.material = new ButterflyMaterial("butterfly", this.scene);
		this.glowMat = new ButterflyMaterial("butterfly", this.scene);

		this.root = new TransformNode("butterflyRoot", this.scene);
		this.root.position = new Vector3(0, 1, -20);
		this.root.scaling = new Vector3(2, 2, 2);

		this.octree = new OctreeBlock(5, new Vector3(0, 1, 0), 11);
		this.grid = new Grid2D({
			width: 42,
			depth: 42,
			height: 10,
			minPerCell: 100,
			cellSize: 1
		})

		this.positions = new Array();
		this.velocities = new Array();




		this.fps = document.getElementById('fps') as HTMLElement;

	}

	public async init() {
		const loaded = await LoadAssetContainerAsync("/assets/butterfly2.glb", this.scene);
		this.mesh = loaded.meshes[1] as Mesh;
		this.mesh.name = 'butterfly';
		this.mesh.optimizeIndices();
		loaded.addAllToScene();
		this.mesh.parent = this.root;

		this.mesh.position.set(0, 0, 0);
		this.mesh.scaling.setAll(0.13);
		this.mesh.material = this.material
		this.mesh.alwaysSelectAsActiveMesh = true;

		this.thinInstance(this.n, 16);
		//this.octree.print();
		this.glowLayer = new GlowLayer("glow", this.scene);
		this.glowLayer.setMaterialForRendering(this.mesh, this.glowMat);

		this.glowLayer.intensity = 0.5;
		this.glowLayer.isEnabled = false;

	}

	f() {
		console.log("OCTREEE");
		//this.octree.printRoot();
		setTimeout(() => (this.f()), 3000);
	}

	public update(time: number, deltaTime: number) {
		if (this.once == 0) {
			// setTimeout(() => { this.f(); }, 500);
			this.activeFlock();
			this.once = 1;
		}
		this.material.setFloat("time", time);
		this.glowMat.setFloat("time", time);
		//const bf = performance.now();
		this.applyForcesGrid(deltaTime);
		//const af = performance.now();
		//this.fps.innerText = (af - bf).toFixed();
	}

	private applyForcesGrid(deltaTime: number) {
		const v0 = Vector3.Zero();
		let cell = this.grid.nextCell();
		const repel = new Vector3();
		const align = new Vector3();
		const flock = new Vector3();
		const cursor = new Vector3();

		const speed = this.speed * deltaTime;

		const r = new Vector3();
		while (cell != null) {
			const onEdge = this.grid.cellOnEdge(this.grid.currentCell - 1);
			for (let i = 0; i < cell!.count; i++) {
				const ii = cell.indexes[i];
				const ip = this.positions[ii];
				const iv = this.velocities[ii];
				let ff = 0;
				flock.setAll(0.);
				align.setAll(0.);
				repel.setAll(0.);
				for (let j = 0; j < cell!.count; j++) {
					const jj = cell.indexes[j];
					if (j != i) {
						const jp = this.positions[jj];
						ip.subtractToRef(jp, r);
						if (r.dot(iv) > 0.) {
							flock.addInPlace(jp);
							align.addInPlace(this.velocities[jj]);
							ff++;
							repel.addInPlace((r.length() < 0.3 + this.disperse ? r : v0));
						}
					}
				}
				// ff += +onEdge;
				flock.scaleInPlace(ff > 0 ? 1 / ff : 1);
				align.scaleInPlace(ff > 0 ? 1. / ff : 1);
				flock.subtractInPlace(ff > 0 ? ip : v0);
				align.subtractInPlace(ff > 0 ? iv : v0);

				this.origin.subtractToRef(ip, cursor);
				const cursorL = cursor.length();
				cursor.scaleInPlace(cursorL < 4 ? 0.02 : 0.);
				const cursorField = cursorL < 5.5 ? 0 : 1.;

				flock.scaleInPlace(0.5 * speed * this.flock * cursorField);
				// flock.subtractInPlace(onEdge == true ? ip.scale(speed)  : v0);
				align.scaleInPlace(1 * speed);
				repel.scaleInPlace(2 * speed);

				iv.addInPlace(align).addInPlace(flock).addInPlace(repel).addInPlace(cursor);
				const l = iv.length();
				//iv.scaleInPlace((l > this.speed * 2 ? this.speed * 1.2 / l : 1) * (l < this.speed ? this.speed / l : 1));
				if (l > speed * 2) {
					iv.scaleInPlace(speed * 1.2 / l)
				} else if (l < speed) {
					iv.scaleInPlace(speed / l)
				}

				this.bound(iv, ip, speed);

				ip.addInPlace(iv.scale(Math.min(1., this.flying[ii])));
				ip.toArray(this.moves, ii * 3);
				this.directions[ii * 2] = iv.x;
				this.directions[ii * 2 + 1] = iv.z;
				this.perching(ip, ii);
			}
			cell.indexes.fill(-1, 0, cell.count);
			cell.count = 0;
			cell = this.grid.nextCell();
		}
		cell = this.grid.outCell;
		for (let i = 0; i < cell!.count; i++) {
			const ii = cell.indexes[i];
			const ip = this.positions[ii];
			const iv = this.velocities[ii];
			flock.setAll(0.);
			flock.subtractInPlace(ip);

			flock.scaleInPlace(speed * 0.005);

			iv.addInPlace(flock);
			const l = iv.length();
			if (l > speed * 2) {
				iv.scaleInPlace(speed * 1.2 / l)
			} else if (l < speed) {
				iv.scaleInPlace(speed / l)
			}
			ip.addInPlace(iv);
			ip.toArray(this.moves, ii * 3);
			this.directions[ii * 2] = iv.x;
			this.directions[ii * 2 + 1] = iv.z;
		}
		cell.indexes.fill(-1, 0, cell.count);
		cell.count = 0;

		this.mesh.thinInstanceBufferUpdated("move");
		this.mesh.thinInstanceBufferUpdated("direction");

		this.grid.addArray(this.positions);
	}

	private activeFlock() {
		this.flock = 1;
		this.disperse = 0;
		setTimeout(() => { this.disbaleFlock() }, (Math.random() * 0.5 + 0.5) * 3000);
	}

	private disbaleFlock() {
		this.flock = 0.;
		this.disperse = 0.3;
		setTimeout(() => { this.disbaleFlock() }, (Math.random() * 0.5 + 0.5) * 100);
	}

	private perching(bp: Vector3, index: number) {
		if (bp.y < 0.1 && this.flying[index] > 100) {
			this.flying[index] = 0;
			setTimeout(() => { this.flying[index] = 0.1 }, (Math.random() * 0.5 + 0.5) * 1000);
		} else {
			this.flying[index] = this.flying[index] * 1.01;
		}

	}

	private bound(v: Vector3, p: Vector3, speed: number) {
		// v.x = (Math.abs(p.x) > 9 ? (speed * -Math.sign(p.x)) * 0.5 : v.x);
		v.y = (p.y > 1. || p.y < 0 ? (speed * -Math.sign(p.y)) * 0.5 : v.y);
		// v.z = (Math.abs(p.z) > 9 ? (speed * -Math.sign(p.z)) * 0.5 : v.z);

	}

	private thinInstance(n: number, radius: number) {


		const bufferMatrix = new Float32Array(16 * n);
		this.moves = new Float32Array(3 * n);
		this.directions = new Float32Array(2 * n);
		this.flying = new Float32Array(n);

		for (let i = 0; i < n; i++) {

			this.flying[i] = 1;

			const matT = Matrix.Identity();

			const matrix = matT;

			const position = new Vector3(
				(Math.random() * 2 - 1.) * radius,
				(Math.random() * 2 - 1.) * 0.5,
				(Math.random() * 2 - 1.) * radius,
			);

			matrix.copyToArray(bufferMatrix, i * 16);
			position.toArray(this.moves, i * 3);
			const v = new Vector3(
				Math.random() * 2. - 1,
				Math.random() * 2 - 1,
				Math.random() * 2 - 1
			);
			v.normalize().scaleInPlace(this.speed);

			this.positions.push(position);
			this.velocities.push(v);
			this.octree.add(i, position);
			this.directions[i * 2] = v.x;
			this.directions[i * 2 + 1] = v.z;
			this.grid.add(i, position);
		}

		this.mesh.thinInstanceSetBuffer('matrix', bufferMatrix, 16, true);
		this.mesh.thinInstanceSetBuffer('move', this.moves, 3, false);
		this.mesh.thinInstanceSetBuffer('direction', this.directions, 2, false);
	}
}





interface Cell {
	indexes: Int16Array, //after calculating new pos need to set index to -1 if leave the cell;
	count: number
}
interface gridoptions {
	width: number,
	height?: number,
	depth: number,
	cellSize: number,
	minPerCell: number
}


class Grid2D {
	public cells: Array<Cell>; //May change to Array<int16Array>
	public outCell: Cell;

	public readonly width: number;
	public readonly depth: number;
	public readonly cellSize: number;
	public readonly minPerCell: number;

	private readonly width2: number;
	private readonly depth2: number;

	private readonly widthCount: number;
	private readonly depthCount: number;
	private readonly cellCount: number;

	private usedCell: Set<number>;


	public currentCell: number;


	constructor(options: gridoptions) {
		this.width = options.width;
		this.depth = options.depth;
		this.cellSize = options.cellSize;
		this.minPerCell = options.minPerCell;

		this.width2 = this.width * 0.5;
		this.depth2 = this.depth * 0.5;

		this.widthCount = Math.ceil(this.width / this.cellSize);
		this.depthCount = Math.ceil(this.depth / this.cellSize);
		this.cellCount = this.widthCount * Math.ceil(this.depth / this.cellSize);

		this.cells = new Array<Cell>(this.cellCount)
		console.log(this.cellCount);
		for (let i = 0; i < this.cellCount; i++) {
			this.cells[i] = {
				indexes: new Int16Array(this.minPerCell),
				count: 0
			}
			this.cells[i].indexes.fill(-1);
		}
		this.currentCell = 0;
		this.usedCell = new Set<number>();

		this.outCell = {
			indexes: new Int16Array(this.minPerCell),
			count: 0
		};
	}

	public add(index: number, position: Vector3) {
		const cell = this.getCellFromPosition(position);

		cell.indexes[cell.count] = index;
		cell.count++;
	}

	public addArray(positions: Vector3[]) {
		//console.log(positions.length);
		for (let i = 0; i < positions.length; i++) {
			this.add(i, positions[i]);
		}
	}

	public nextCell(): Cell | null {
		for (let i = this.currentCell; i < this.cells.length; i++) {
			let cell = this.cells[i];
			if (cell.count > 0) {
				this.currentCell = i + 1;
				return cell;
			}
		}
		this.currentCell = 0;
		return null;
	}

	private getCellFromPosition(position: Vector3): Cell {
		let x = ((position.x + this.width2) / this.cellSize) << 0; //similar to Math.trunc() but with bitshift, work for number < MAX_INT
		let z = ((position.z + this.depth2) / this.cellSize) << 0;

		//console.log(position.x, position.y, position.z);

		if (x >= this.widthCount || x < 0 || z >= this.depthCount || z < 0) { // WHEN freeze fucking break
			// console.warn(position, x);
			// alert("OUT OF BOUND")
			// x = 0;
			return this.outCell;
		}

		z *= this.widthCount;
		x += z;
		// if (!this.usedCell.has(x)) { //Maybe put it somewhere else;
		// 	this.usedCell.add(x);
		// }

		return this.cells[x];
	}

	cellOnEdge(cellIndex: number): boolean {
		const cx = cellIndex % this.widthCount;
		const cz = (cellIndex / this.widthCount) << 0;
		return (
			cx == 0 || cx == this.widthCount - 1
			|| cz == 0 || cz == this.depth - 1
		)
	}
}


// class Grid3D {
// 	public cells: Array<Cell>; //May change to Array<int16Array>
//
// 	public readonly width: number;
// 	public readonly depth: number;
// 	public readonly height: number;
// 	public readonly cellSize: number;
// 	public readonly minPerCell: number;
//
// 	private readonly width2: number;
// 	private readonly depth2: number;
// 	private readonly height2: number;
//
// 	private readonly widthCount: number;
// 	private readonly planeCount: number;
// 	private readonly cellCount: number;
//
// 	private usedCell: Set<number>;
//
//
// 	public currentCell: number;
//
//
// 	constructor(options: gridoptions) {
// 		this.width = options.width;
// 		this.height = options.height!;
// 		this.depth = options.depth;
// 		this.cellSize = options.cellSize;
// 		this.minPerCell = options.minPerCell;
//
// 		this.width2 = this.width * 0.5;
// 		this.height2 = this.height * 0.5;
// 		this.depth2 = this.depth * 0.5;
//
// 		this.widthCount = Math.ceil(this.width / this.cellSize);
// 		this.planeCount = this.widthCount * Math.ceil(this.depth / this.cellSize);
// 		this.cellCount = this.planeCount * Math.ceil(this.height / this.cellSize);
//
// 		this.cells = new Array<Cell>(this.cellCount)
// 		console.log(this.cellCount);
// 		for (let i = 0; i < this.cellCount; i++) {
// 			this.cells[i] = {
// 				indexes: new Int16Array(this.minPerCell),
// 				count: 0
// 			}
// 			this.cells[i].indexes.fill(-1);
// 		}
// 		this.currentCell = 0;
// 		this.usedCell = new Set<number>();
// 	}
//
// 	public add(index: number, position: Vector3) {
// 		const cell = this.getCellFromPosition(position);
//
// 		cell.indexes[cell.count] = index;
// 		cell.count++;
// 	}
//
// 	public addArray(positions: Vector3[]) {
//
//
// 		for (let i = 0; i < positions.length; i++) {
// 			this.add(i, positions[i]);
// 		}
// 	}
//
// 	public nextCell(): Cell | null {
// 		// for (let i of this.usedCell) {
// 		// 	let cell = this.cells[i];
// 		// 	this.usedCell.delete(i);
// 		// 	return cell;
// 		// }
// 		for (let i = this.currentCell; i < this.cells.length; i++) {
// 			let cell = this.cells[i];
// 			if (cell.count > 0) {
// 				this.currentCell = i + 1;
// 				return cell;
// 			}
// 		}
// 		//
// 		// this.usedCell.clear();
// 		this.currentCell = 0;
// 		return null;
// 	}
//
// 	private getCellFromPosition(position: Vector3): Cell {
// 		let x = ((position.x + this.width2) / this.cellSize) << 0; //similar to Math.trunc() but with bitshift, work for number < MAX_INT
// 		let y = ((position.y + this.height2) / this.cellSize) << 0;
// 		let z = ((position.z + this.depth2) / this.cellSize) << 0;
//
// 		//console.log(position.x, position.y, position.z);
// 		z *= this.widthCount;
// 		y *= this.planeCount;
//
// 		x += z + y;
// 		if (x > this.cellCount) { // WHEN freeze fucking break
// 			console.warn(position, x);
// 			x = 0;
// 		}
//
// 		// if (!this.usedCell.has(x)) { //Maybe put it somewhere else;
// 		// 	this.usedCell.add(x);
// 		// }
//
// 		return this.cells[x];
// 	}
//
// 	cellOnEdge(cellIndex: number): boolean {
// 		const cx = cellIndex % this.widthCount;
// 		const cz = ((cellIndex % this.planeCount) / this.widthCount) << 0;
// 		return (
// 			cellIndex < this.planeCount * 3 || cellIndex > this.cellCount - this.planeCount
// 			|| cx == 0 || cx == this.widthCount - 1
// 			|| cz == 0 || cz == this.depth - 1
// 		)
// 	}
// }

class OctreeBlock {
	public entries: Map<number, Vector3>;
	public blocks: Array<OctreeBlock>;
	public blocksLength: number;
	public depth: number;

	public center: Vector3;
	public radius: number;


	constructor(depth: number, center: Vector3, radius: number) {
		this.entries = new Map();
		this.depth = depth;
		this.blocks = new Array();
		this.radius = radius;
		this.center = center;

		this.blocksLength = 0;
		this.split();
	}

	public update() {
		this.clean();
		if (this.entries.size < 2) { return };
		for (let k of this.entries.keys()) {
			let v = this.entries.get(k) as Vector3;
			for (let i = 0; i < 8; i++) {
				this.blocks[i].add(k, v);
			}
		}
	}

	public clean() {
		for (let k of this.entries.keys()) {
			let v = this.entries.get(k) as Vector3;
			if (!this.in(v)) {
				this.remove(k);
			}
		}
		for (let i = 0; i < this.blocksLength; i++) {
			this.blocks[i].clean();
		}
	}

	public leafs(final: Array<OctreeBlock>) {
		if (this.entries.size == 0) { return; }
		if (this.blocksLength == 0) {
			final.push(this);
			return;
		}
		for (let i = 0; i < 8; i++) {
			this.blocks[i].leafs(final);
		}
	}

	public leaf(key: number): number[] | void {
		if (this.blocksLength == 0) {
			return this.allButOne(key);
		}
		for (let i = 0; i < this.blocksLength; i++) {
			if (this.blocks[i].has(key)) {
				return this.blocks[i].leaf(key);
			}
		}

		return [];
	}

	public has(key: number) {
		return this.entries.has(key);
	}

	public allButOne(key: number): number[] {
		const final: number[] = [];
		for (let i of this.entries.keys()) {
			if (i != key) {
				final.push(i);
			}
		}
		return final;
	}

	public add(key: number, value: Vector3): boolean {
		if (!this.in(value)) {
			this.remove(key);
			return false;
		}

		// if (this.entries.size > 1) { this.virtualSplit() }
		this.entries.set(key, value);
		if (this.depth == 0 || this.entries.size == 1) { return true; }
		if (this.virtualSplit()) {
			for (let k of this.entries.keys()) {
				let v = this.entries.get(k) as Vector3;
				for (let j = 0; j < 8; j++) {
					this.blocks[j].add(k, v);
				}
			}
			return true;
		}
		for (let i = 0; i < 8; i++) {
			this.blocks[i].add(key, value);
		}
		return true;
	}

	public remove(key: number): boolean {
		if (!this.entries.has(key)) { return false; }
		this.entries.delete(key);
		let br: boolean = true;
		for (let i = 0; i < this.blocksLength; i++) {
			br = br && this.blocks[i].remove(key);
		}
		if (br || this.entries.size == 1) {
			this.blocksLength = 0;
		}
		return this.entries.size == 0;
	}

	public virtualSplit(): boolean {
		if (this.depth == 0 || this.blocksLength > 0) { return false; }
		this.blocksLength = 8;
		return true;
	}

	public split() {
		if (this.depth == 0) { return; }
		const radius = this.radius * 0.5;
		this.blocks.push(
			new OctreeBlock(this.depth - 1,
				new Vector3(
					this.center.x - radius,
					this.center.y - radius,
					this.center.z - radius,
				), radius));
		this.blocks.push(
			new OctreeBlock(this.depth - 1,
				new Vector3(
					this.center.x - radius,
					this.center.y - radius,
					this.center.z + radius,
				), radius));
		this.blocks.push(
			new OctreeBlock(this.depth - 1,
				new Vector3(
					this.center.x + radius,
					this.center.y - radius,
					this.center.z + radius,
				), radius));
		this.blocks.push(
			new OctreeBlock(this.depth - 1,
				new Vector3(
					this.center.x + radius,
					this.center.y - radius,
					this.center.z - radius,
				), radius));
		this.blocks.push(
			new OctreeBlock(this.depth - 1,
				new Vector3(
					this.center.x - radius,
					this.center.y + radius,
					this.center.z - radius,
				), radius));
		this.blocks.push(
			new OctreeBlock(this.depth - 1,
				new Vector3(
					this.center.x - radius,
					this.center.y + radius,
					this.center.z + radius,
				), radius));
		this.blocks.push(
			new OctreeBlock(this.depth - 1,
				new Vector3(
					this.center.x + radius,
					this.center.y + radius,
					this.center.z + radius,
				), radius));
		this.blocks.push(
			new OctreeBlock(this.depth - 1,
				new Vector3(
					this.center.x + radius,
					this.center.y + radius,
					this.center.z - radius,
				), radius));
	}

	public in(v: Vector3): boolean {
		return Math.abs(v.x - this.center.x) < this.radius &&
			Math.abs(v.y - this.center.y) < this.radius &&
			Math.abs(v.z - this.center.z) < this.radius;
		// console.log('inn', b, v);
		// return b;
	}

	public print() {
		if (this.blocksLength > 0) {
			for (let i = 0; i < 8; i++) {
				this.blocks[i].print();
			}
		} else if (this.entries.size > 0) {
			// this.printRoot();
			console.log(`depth: ${this.depth}::
				-center: ${this.center}, radius: ${this.radius}
				-entries: ${this.entries.size}::`, this.entries)
		}
	}

	public printRoot() {
		console.log(this.depth, this.entries);
	}
}

