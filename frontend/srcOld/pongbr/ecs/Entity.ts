import { Component } from "./Component.js";

export class Entity {
	private static _idCounter = 0;
	public readonly id = Entity._idCounter++;
	// Use the class itself as key
	public components = new Map<Function, Component>();

	addComponent<C extends Component>(comp: C): this {
		this.components.set(comp.constructor, comp);
		return this;
	}

	getComponent<T>(cls: { new(...args: any[]): T }): T | undefined {
		return this.components.get(cls) as T | undefined;
	}

	hasComponent(cls: Function): boolean {
		return this.components.has(cls);
	}

	removeComponent<T>(cls: { new(...args: any[]): T }): this {
		this.components.delete(cls);
		return this;
	}
}

