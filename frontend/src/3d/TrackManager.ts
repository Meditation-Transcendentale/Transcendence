import { Curve3, Vector3 } from "@babylonImport";


class TrackManager {
	private tracks: Array<{ track: Track, callback: any }>;
	private tracksId: Set<number>;

	constructor() {
		this.tracks = new Array<{ track: Track, callback: any }>;
		this.tracksId = new Set<number>;
	}

	public addTrack(track: Track, callback: any) {
		if (this.tracksId.has(track.id)) {
			this.tracks.splice(this.getTrackIndex(track.id), 1);
		}
		this.tracksId.add(track.id);
		this.tracks.push({ track: track, callback: callback });
		track.reset();
	}

	public update(time: number) {
		let point;
		for (let i = 0; i < this.tracks.length;) {
			point = this.tracks[i].track.getPoint(time);
			if (point != null) {
				this.tracks[i].callback(point);
			}
			if (this.tracks[i].track.dead) {
				this.tracksId.delete(this.tracks[i].track.id)
				this.tracks.splice(i, 1);
			} else {
				i++;
			}
		}
	}

	private getTrackIndex(id: number): number {
		for (let i = 0; i < this.tracks.length; i++) {
			if (this.tracks[i].track.id == id) {
				return i;
			}
		}
		return 0;
	}
}

export const gTrackManager = new TrackManager();


interface ISection {
	readonly duration: number;
	readonly destination: Vector3;
	getPoint(timestamp: number): Vector3;

}

export interface sectionBezierOption {
	origin: Vector3,
	control: Vector3,
	destination: Vector3,
	segments: number
}

export class SectionBezier implements ISection {
	public readonly duration: number;
	private origin: Vector3;
	public readonly destination: Vector3;
	private points: Array<Vector3>;
	private length: number;


	constructor(duration: number, option: sectionBezierOption) {
		this.duration = duration;
		this.origin = option.origin;
		this.destination = option.destination;

		const curve = Curve3.CreateQuadraticBezier(this.origin, option.control, this.destination, option.segments);
		this.points = curve.getPoints();
		this.length = curve.length();
	}

	public getPoint(timestamp: number): Vector3 {
		return this.points[Math.floor((timestamp / this.duration) * this.points.length)];
	}
}

export class SectionStatic implements ISection {
	public readonly duration: number;
	public readonly destination: Vector3;

	constructor(duration: number, point: Vector3) {
		this.duration = duration;
		this.destination = point;
	}

	public getPoint(timestamp: number): Vector3 {
		return this.destination;
	}
}

export class SectionManual implements ISection {
	public readonly duration: number;
	public readonly destination: Vector3;

	private points: Array<Vector3>;

	constructor(duration: number, points: Array<Vector3>) {
		this.duration = duration;
		this.destination = points[points.length - 1];
		this.points = points;
	}

	public getPoint(timestamp: number): Vector3 {
		return this.points[Math.floor((timestamp / this.duration) * this.points.length)];
	}

}

export class Track {
	private sections: Array<ISection>;
	private startTime: number;

	private _loop: boolean;
	private _dead: boolean;

	public readonly id: number;

	private static ID: number = 0;

	constructor(loop: boolean = false) {
		this._loop = loop;
		this.sections = new Array<ISection>;
		this.startTime = 0;
		this._dead = false;
		this.id = Track.ID;
		Track.ID++;
	}

	public addSection(section: ISection) {
		this.sections.push(section);
	}

	public reset(loop: boolean = this._loop) {
		this.startTime = performance.now() * 0.001;
		this._loop = loop;
		this._dead = false;
	}

	public getPoint(time: number): Vector3 | null {
		let timestamp = time - this.startTime;
		for (let i = 0; i < this.sections.length; i++) {
			if (timestamp < this.sections[i].duration) {
				return this.sections[i].getPoint(timestamp);
			}
			timestamp -= this.sections[i].duration;
		}
		if (this.sections.length > 0) {
			this._dead = true;
			return this.sections[this.sections.length - 1].destination;
		}
		// if (this.loop)//Lazy will implement loop later if needed
		this._dead = true;
		return null;
	}

	public get loop(): boolean {
		return this._loop;
	}

	public get dead(): boolean {
		return this._dead;
	}
}


