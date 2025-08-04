export class InputManager {
	private keysPressed: Set<string> = new Set();

	constructor() {
		document.addEventListener("keydown", (e) => {
			this.keysPressed.add(e.code);
		});
		document.addEventListener("keyup", (e) => this.keysPressed.delete(e.code));
	}

	isKeyPressed(keyCode: string): boolean {
		return this.keysPressed.has(keyCode);
	}
}
