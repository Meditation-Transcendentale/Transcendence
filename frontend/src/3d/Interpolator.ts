import { Vector3 } from "@babylonImport";

interface interElem {
	ref: Vector3,
	start: Vector3,
	end: Vector3,
	duration: number,
	startTime: number,
	callback: any
}

interface interAddOptions {
	start: Vector3,
	end: Vector3,
	duration: number,
	callback: any
}

class InterpolatorC {
	private elems: Array<interElem>;

	constructor() {
		this.elems = new Array<interElem>;
	}

	public update(time: number) {
		for (let i = 0; i < this.elems.length; i++) {
			const e = this.elems[i];
			this.linearInterpolate(e.start, e.end, Math.min(1., (time - e.startTime) / e.duration), e.ref)
			e.callback();
			if (time - e.startTime > e.duration) {
				this.elems.splice(i, 1);
				i--;
			}
		}
	}

	public addElem(option: interAddOptions) {
		this.elems.push({
			ref: option.start,
			start: option.start.clone(),
			end: option.end,
			duration: option.duration,
			startTime: performance.now() * 0.001,
			callback: option.callback
		});
	}

	private linearInterpolate(start: Vector3, end: Vector3, a: number, ref: Vector3) {
		ref.set(
			start.x * (1. - a) + a * end.x,
			start.y * (1. - a) + a * end.y,
			start.z * (1. - a) + a * end.z
		);
	}
}

export const Interpolator = new InterpolatorC();
