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
	speed: number;
	getPoint(timestamp: number): Vector3;
	inRange(timestamp: number, deltaTime: number, speed: number): boolean;
	reset(): void;

}

export interface sectionBezierOption {
	origin: Vector3,
	control: Vector3,
	destination: Vector3,
	segments: number,
}

export class SectionBezier implements ISection {
	public duration: number;
	private origin: Vector3;
	public readonly destination: Vector3;
	private points: Array<Vector3>;
	private length: number;

	private acceleration: number;

	public speed!: number;
	private travel: number;


	constructor(acceleration: number, option: sectionBezierOption) {
		// this.duration = duration;
		this.duration = 0;
		this.origin = option.origin;
		this.destination = option.destination;

		const curve = Curve3.CreateQuadraticBezier(this.origin, option.control, this.destination, option.segments);
		this.points = curve.getPoints();
		this.length = curve.length();
		console.log("curve length", curve.length());

		this.acceleration = acceleration;
		this.speed = 0;
		this.travel = 0;
	}

	public getPoint(timestamp: number): Vector3 {
		return this.points[Math.floor((this.travel / this.length) * this.points.length)];
	}

	public inRange(timestamp: number, deltaTime: number, speed: number): boolean {
		this.speed = speed + this.acceleration * deltaTime;
		this.speed = Math.max(this.speed, 0.);
		this.travel += this.speed * deltaTime;
		this.duration = timestamp;
		return this.travel <= this.length;
	}

	public reset(): void {
		this.travel = 0;
	}

	public getDurationFromSpeed(speed: number): { duration: number, finalSpeed: number } | null {
		const delta = speed * speed + 4 * this.acceleration * this.length;
		if (delta < 0) {
			return null;
		}
		const t = (-speed + Math.sqrt(delta)) / (2 * this.acceleration);
		const s = speed + this.acceleration * t;
		return { duration: t, finalSpeed: s };
	}
}

export class SectionStatic implements ISection {
	public readonly duration: number;
	public readonly destination: Vector3;

	public speed = 0;

	constructor(duration: number, point: Vector3) {
		this.duration = duration;
		this.destination = point;
	}

	public getPoint(timestamp: number): Vector3 {
		return this.destination;
	}

	public inRange(timestamp: number, deltaTime: number, speed: number) {
		this.speed = speed;
		return timestamp <= this.duration;
	}

	public reset(): void { }
}

export class SectionManual implements ISection {
	public readonly duration: number;
	public readonly destination: Vector3;

	private points: Array<Vector3>;
	public speed = 0;

	constructor(duration: number, points: Array<Vector3>) {
		this.duration = duration;
		this.destination = points[points.length - 1];
		this.points = points;
	}

	public getPoint(timestamp: number): Vector3 {
		return this.points[Math.floor((timestamp / this.duration) * this.points.length)];
	}

	public inRange(timestamp: number, deltaTime: number, speed: number) {
		this.speed = speed;
		return timestamp <= this.duration;
	}

	public reset(): void { }
}

export class Track {
	private sections: Array<ISection>;
	private startTime: number;

	private _loop: boolean;
	private _dead: boolean;

	public readonly id: number;

	private static ID: number = 0;

	private initialSpeed: number;
	private speed: number;

	private pastTime: number;

	constructor(initialSpeed: number, loop: boolean = false) {
		this._loop = loop;
		this.sections = new Array<ISection>;
		this.startTime = 0;
		this._dead = false;
		this.id = Track.ID;
		Track.ID++;

		this.initialSpeed = initialSpeed;
		this.speed = this.initialSpeed;
		this.pastTime = 0;
	}

	public addSection(section: ISection) {
		this.sections.push(section);
	}

	public reset(loop: boolean = this._loop) {
		this.startTime = performance.now() * 0.001;
		this.speed = this.initialSpeed;
		this.pastTime = this.startTime;
		this._loop = loop;
		this._dead = false;
		for (let i = 0; i < this.sections.length; i++) {
			this.sections[i].reset();
		}
	}

	public getPoint(time: number): Vector3 | null {
		let timestamp = time - this.startTime;
		let deltaTime = time - this.pastTime;
		this.pastTime = time;
		for (let i = 0; i < this.sections.length; i++) {
			if (this.sections[i].inRange(timestamp, deltaTime, this.speed)) {
				let v = this.sections[i].getPoint(timestamp);
				this.speed = this.sections[i].speed;
				return v;
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


