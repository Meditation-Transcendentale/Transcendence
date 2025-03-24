export class InputManager {
    private keysPressed: Set<string> = new Set();
	// private buttonsPressed: Set<number> = new Set();

    constructor() {
        window.addEventListener("keydown", (e) => {
			this.keysPressed.add(e.code);
			console.log(e.code);
		});
        window.addEventListener("keyup", (e) => this.keysPressed.delete(e.code));
    }

    isKeyPressed(keyCode: string): boolean {
        return this.keysPressed.has(keyCode);
    }

	// isButtonPressed(buttonCode: number): boolean {
	// 	return this.buttonsPressed.has(buttonCode);
	// }
}
