import { Entity } from "./Entity.js";

export abstract class System {
    abstract update(entities: Entity[], deltaTime: number): void;
}
