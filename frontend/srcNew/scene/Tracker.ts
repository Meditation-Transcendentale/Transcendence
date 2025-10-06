import { Vector3 } from "../babylon";

// export interface IDirtyObject {
// 	_isDirty: boolean;
// }

export type TrackerCallback = (value: any, time?: number, deltaTime?: number) => void;

export class Tracker {
	private value: Map<string, any>;
	private callback: Map<string, TrackerCallback>;

	constructor() {
		this.value = new Map<string, any>;
		this.callback = new Map<string, TrackerCallback>;
	}

	public add(key: string, value: any) {
		this.value.set(key, value);
	}

	public track(key: string, callback: TrackerCallback) {
		this.callback.set(key, callback);
	}

	public update(time: number, deltaTime: number) {
		this.value.forEach((value: any, key: string, map: Map<string, any>) => {
			if (this.callback.has(key))
				(this.callback.get(key) as TrackerCallback)(value, time, deltaTime);
		})
	}
}
