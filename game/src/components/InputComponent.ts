import { Component } from "../ecs/Component.js";

export class InputComponent implements Component {
    public up: boolean = false;
    public down: boolean = false;
}
