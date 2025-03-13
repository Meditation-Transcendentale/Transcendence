export class InputManager {
    private keysPressed: Set<string> = new Set();

    constructor() {
        window.addEventListener("keydown", (e) => this.keysPressed.add(e.code));
        window.addEventListener("keyup", (e) => this.keysPressed.delete(e.code));
    }

    isKeyPressed(keyCode: string): boolean {
        return this.keysPressed.has(keyCode);
    }
}
