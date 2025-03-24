import { Vector2 } from "@babylonjs/core";
import { Component } from "../ecs/Component.js";

export class InputComponent implements Component {
    public up: boolean = false;
    public down: boolean = false;
	public pointer: Vector2 = new Vector2(0, 0);
}
