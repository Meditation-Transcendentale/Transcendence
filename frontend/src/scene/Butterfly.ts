import { Matrix, Vector3 } from "../babylon";
import { Assets } from "./Assets";

export class Butterfly {

	private assets: Assets;

	private grid: Grid2D;

	private once = 0;

	private moves!: Float32Array;
	public positions: Array<Vector3>;
	private velocities: Array<Vector3>;
	private directions!: Float32Array;
	private flying!: Float32Array;

	private n: number = 100;
	private speed = 0.8;
	private flock: number = 1;
	private disperse: number = 0;

	private _enable: boolean;

	constructor(assets: Assets) {
		this.assets = assets;

		this.assets.butterflyMesh.scaling.setAll(0.4);


		this.grid = new Grid2D({
			width: 42,
			depth: 42,
			height: 10,
			minPerCell: this.n,
			cellSize: 1
		})

		this.positions = new Array();
		this.velocities = new Array();

		this.thinInstance(this.n, 30);

		this._enable = false;
	}

	public update(time: number, deltaTime: number) {
		if (!this._enable)
			return;
		if (this.once == 0) {
			this.activeFlock();
			this.once = 1;
		}
		this.assets.butterflyMaterial.setFloat("time", time);
		this.applyForcesGrid(deltaTime);
	}

	private applyForcesGrid(deltaTime: number) {
		const v0 = Vector3.Zero();
		let cell = this.grid.nextCell();
		const repel = new Vector3();
		const align = new Vector3();
		const flock = new Vector3();
		// const cursor = new Vector3();

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

				// this.origin.subtractToRef(ip, cursor);
				// const cursorL = cursor.length();
				// cursor.scaleInPlace(cursorL < 2 ? 0.02 : 0.);
				// const cursorField = cursorL < 2.5 ? 0 : 1.;

				// flock.scaleInPlace(0.5 * speed * this.flock * cursorField);
				flock.scaleInPlace(0.5 * speed * this.flock);
				// flock.subtractInPlace(onEdge == true ? ip.scale(speed)  : v0);
				align.scaleInPlace(1 * speed);
				repel.scaleInPlace(2 * speed);

				iv.addInPlace(align).addInPlace(flock).addInPlace(repel);//.addInPlace(cursor);
				const l = iv.length();
				//iv.scaleInPlace((l > this.speed * 2 ? this.speed * 1.2 / l : 1) * (l < this.speed ? this.speed / l : 1));
				if (l > speed * 2) {
					iv.scaleInPlace(speed * 1.2 / l)
				} else if (l < speed) {
					iv.scaleInPlace(speed / l)
				}

				this.bound(iv, ip, speed);

				ip.addInPlace(iv.scale(Math.min(1., this.directions[ii * 3 + 2])));
				ip.toArray(this.moves, ii * 3);
				this.directions[ii * 3] = iv.x;
				this.directions[ii * 3 + 1] = iv.z;
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
			this.directions[ii * 3] = iv.x;
			this.directions[ii * 3 + 1] = iv.z;
		}
		cell.indexes.fill(-1, 0, cell.count);
		cell.count = 0;

		this.assets.butterflyMesh.thinInstanceBufferUpdated("move");
		this.assets.butterflyMesh.thinInstanceBufferUpdated("direction");

		this.grid.addArray(this.positions);
	}

	private activeFlock() {
		this.flock = 1;
		this.disperse = 0;
		setTimeout(() => { this.disbaleFlock() }, (Math.random() * 0.5 + 0.5) * 1000);
	}

	private disbaleFlock() {
		this.flock = 0.;
		this.disperse = 0.3;
		setTimeout(() => { this.disbaleFlock() }, (Math.random() * 0.5 + 0.5) * 100);
	}

	private perching(bp: Vector3, index: number) {
		if (bp.y < 0.15 && this.directions[index * 3 + 2] > 100) {
			this.directions[index * 3 + 2] = 0;
			setTimeout(() => { this.directions[index * 3 + 2] = 0.1 }, (Math.random() * 0.5 + 0.5) * 1000);
		} else {
			this.directions[index * 3 + 2] = this.directions[index * 3 + 2] * 1.01;
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
		this.directions = new Float32Array(3 * n);
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
			this.directions[i * 3] = v.x;
			this.directions[i * 3 + 1] = v.z;
			this.directions[i * 3 + 2] = 1;
			this.grid.add(i, position);
		}

		this.assets.butterflyMesh.thinInstanceSetBuffer('matrix', bufferMatrix, 16, true);
		this.assets.butterflyMesh.thinInstanceSetBuffer('move', this.moves, 3, false);
		this.assets.butterflyMesh.thinInstanceSetBuffer('direction', this.directions, 3, false);
	}

	public set enable(value: boolean) {
		this._enable = value;
		this.assets.butterflyMesh.setEnabled(value);
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
		//console.log(this.cellCount);
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
