// components/DisabledComponent.ts
import { Component } from "../ecs/Component";
/**
 * Marker component to disable an entity by default.
 * Remove or toggle this component to enable the entity.
 */
export class DisabledComponent implements Component {
	public static key = "DisabledComponent";
	constructor(public isEnabled: boolean = false) { }
}
