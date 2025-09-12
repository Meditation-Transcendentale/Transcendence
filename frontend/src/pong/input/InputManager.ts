export class InputManager {
	private keysPressed: Set<string> = new Set();
	private keydownHandler: (e: KeyboardEvent) => void;
	private keyupHandler: (e: KeyboardEvent) => void;
	private isActive: boolean = false;

	constructor() {

		this.keydownHandler = (e: KeyboardEvent) => {
			this.keysPressed.add(e.code);
		}

		this.keyupHandler = (e: KeyboardEvent) => {
			this.keysPressed.delete(e.code);
		}
	}

	isKeyPressed(keyCode: string): boolean {
		return this.keysPressed.has(keyCode);
	}

	enable(){
		if (!this.isActive) {
			document.addEventListener("keydown", this.keydownHandler);
			document.addEventListener("keyup", this.keyupHandler);
			this.isActive = true;
		}
	}

	disable(){
		if (this.isActive) {
			document.removeEventListener("keydown", this.keydownHandler);
			document.removeEventListener("keyup", this.keyupHandler);
			this.keysPressed.clear();
			this.isActive = false;
		}
	}
}
