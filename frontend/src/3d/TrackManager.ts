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
	getDurationFromSpeed(speed: number): { duration: number, finalSpeed: number } | null;
}

export interface sectionBezierOption {
	origin: Vector3,
	control: Vector3,
	destination: Vector3,
}

export class SectionBezier implements ISection {
	public duration: number;
	private origin: Vector3;
	private control: Vector3;
	public readonly destination: Vector3;
	private length: number;

	private acceleration: number;

	public speed!: number;
	private travel: number;

	private static temp_v0 = new Vector3();
	private static temp_v1 = new Vector3();
	private static temp_v2 = new Vector3();


	constructor(acceleration: number, option: sectionBezierOption) {
		// this.duration = duration;
		this.duration = 0;
		this.origin = option.origin;
		this.destination = option.destination;
		this.control = option.control;

		this.length = this.calculateLength();

		this.acceleration = acceleration;
		this.speed = 0;
		this.travel = 0;
	}

	public getPoint(timestamp: number): Vector3 {
		const t = this.travel / this.length;
		const mt = 1 - t;
		this.origin.scaleToRef(mt * mt, SectionBezier.temp_v0);
		this.control.scaleToRef(2 * mt * t, SectionBezier.temp_v1);
		this.destination.scaleToRef(t * t, SectionBezier.temp_v2);
		SectionBezier.temp_v0.addInPlace(SectionBezier.temp_v1);
		SectionBezier.temp_v0.addInPlace(SectionBezier.temp_v2);
		return SectionBezier.temp_v0;
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
		const delta = (speed * speed) + (2 * this.acceleration * this.length);
		if (delta < 0) {
			return null;
		}
		const t = (-speed + Math.sqrt(delta)) / (this.acceleration);
		const s = speed + this.acceleration * t;
		return { duration: t, finalSpeed: s };
	}

	// based on Dave Eberly implementation, https://gamedev.net/forums/topic/551455-length-of-a-generalized-quadratic-bezier-curve-in-3d/
	private calculateLength() {
		// ASSERT:  C[0], C[1], and C[2] are distinct points.    
		// The position is the following vector-valued function for 0 <= t <= 1.   
		//   P(t) = (1-t)^2*C[0] + 2*(1-t)*t*C[1] + t^2*C[2].   
		// The derivative is
		//   P'(t) = -2*(1-t)*C[0] + 2*(1-2*t)*C[1] + 2*t*C[2]  
		//         = 2*(C[0] - 2*C[1] + C[2])*t + 2*(C[1] - C[0])   
		//         = 2*A[1]*t + 2*A[0]    // The squared length of the derivative is    
		//   f(t) = 4*Dot(A[1],A[1])*t^2 + 8*Dot(A[0],A[1])*t + 4*Dot(A[0],A[0])    
		// The length of the curve is    
		//   integral[0,1] sqrt(f(t)) dt    
		const a0 = this.control.subtract(this.origin);	// A[0] not zero by assumption
		const a1 = this.control.scale(-2);
		a1.addInPlace(this.origin);
		a1.addInPlace(this.destination);

		if (a1.length() != 0) {
			let c = 4. * a1.dot(a1);
			let b = 8. * a0.dot(a1);
			let a = 4. * a0.dot(a0);
			let q = 4. * a * c - b * b;
			// Antiderivative of sqrt(c*t^2 + b*t + a) is        
			// F(t) = (2*c*t + b)*sqrt(c*t^2 + b*t + a)/(4*c)        
			//   + (q/(8*c^{3/2}))*log(2*sqrt(c*(c*t^2 + b*t + a)) + 2*c*t + b)        
			// Integral is F(1) - F(0).        
			let twoCpB = 2. * c + b;
			let sumCBA = c + b + a;
			let mult0 = 0.25 / c;
			let mult1 = q / (8. * Math.pow(c, 1.5));
			return mult0 * (twoCpB * Math.sqrt(sumCBA) - b * Math.sqrt(a)) + mult1 * (Math.log(2. * Math.sqrt(c * sumCBA) + twoCpB) - Math.log(2. * Math.sqrt(c * a) + b));
		} else {
			return 2. * a0.length();
		}
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

	public getDurationFromSpeed(speed: number): { duration: number, finalSpeed: number } | null {
		return {
			duration: this.duration,
			finalSpeed: speed
		}
	}
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

	public getDurationFromSpeed(speed: number): { duration: number, finalSpeed: number } | null {
		return {
			duration: this.duration,
			finalSpeed: speed
		}
	}

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

	public calculateDuration(speed: number = this.initialSpeed): number | null {
		let totalDuration = 0;
		for (let i = 0; i < this.sections.length; i++) {
			let r = this.sections[i].getDurationFromSpeed(speed);
			if (r == null) {
				return null;
			}
			totalDuration += r.duration;
			speed = r.finalSpeed;
		}
		return totalDuration;
	}
}


