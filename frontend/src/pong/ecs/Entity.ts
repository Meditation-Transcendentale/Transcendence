import { Component } from "./Component.js";

export class Entity {
    private static _idCounter = 0;
    public readonly id: number;
    public components: Map<string, Component> = new Map();

    constructor() {
        this.id = Entity._idCounter++;
    }

    addComponent(component: Component): this {
        const name = component.constructor.name;
        this.components.set(name, component);
        return this;
    }

    getComponent<T>(componentClass: { new(...args: any[]): T }): T | undefined {
        return this.components.get(componentClass.name) as T;
    }

    hasComponent(componentClass: Function): boolean {
        return this.components.has(componentClass.name);
    }
}
