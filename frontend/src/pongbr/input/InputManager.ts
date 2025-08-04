export class InputManager {
	private keysPressed: Set<string> = new Set();

	constructor() {
		document.querySelector('canvas')?.addEventListener("keydown", (e) => {
			this.keysPressed.add(e.code);
			console.log("keydown:", e.code);
		});
		document.querySelector('canvas')?.addEventListener("keyup", (e) => this.keysPressed.delete(e.code));
	}

	isKeyPressed(keyCode: string): boolean {
		return this.keysPressed.has(keyCode);
	}
}
