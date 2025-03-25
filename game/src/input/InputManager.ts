import { Vector2 } from "@babylonjs/core";

export class InputManager {
    private keysPressed: Set<string> = new Set();
	private pointer: Vector2 = new Vector2(0, 0);
	private oldPointer: Vector2 = new Vector2(0, 0);

    constructor() {
        window.addEventListener("keydown", (e) => {
			this.keysPressed.add(e.code);
			console.log(e.code);
		});
        window.addEventListener("keyup", (e) => this.keysPressed.delete(e.code));
		window.addEventListener("pointermove", (e) => {
			this.pointer.x = e.clientX;
			this.pointer.y = e.clientY;
		});
    }

    isKeyPressed(keyCode: string): boolean {
        return this.keysPressed.has(keyCode);
    }

	pointerPosition(){
		return this.pointer;
	}
}


// window.addEventListener("pointermove", (event) => {
// 	this.pointerX = event.clientX;
// 	this.pointerY = event.clientY;
// });
// window.addEventListener("pointerdown", (event) => {
// 	this.buttonPressed[event.button] = true;
// });

// window.addEventListener("pointerup", (event) => {
// 	if (event.buttons === 0) {
// 		this.buttonPressed = {};
// 	} else {
// 		this.buttonPressed[event.button] = false;
// 	}
// });