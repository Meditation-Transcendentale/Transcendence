import { inputState } from "./inputState";
import { sendInput } from "./websocketManager";
import { GameManager } from "./gameManager";

let gameManager: GameManager | null = null;

/**
 * Initializes the input event listeners and stores the GameManager instance.
 * @param gm - The GameManager instance to use for local paddle updates.
 */
export function initializeInput(gm: GameManager): void {
	gameManager = gm;

	// Keydown event: mark the key as pressed.
	window.addEventListener("keydown", (event: KeyboardEvent) => {
		// Prevent default behavior for arrow keys.
		if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
			event.preventDefault();
		}

		switch (event.key) {
			case "a":
				inputState.left = true;
				break;
			case "d":
				inputState.right = true;
				break;
			default:
				break;
		}

		// Optionally, you can send the keydown event to the server immediately.
		sendInput({ type: "MOVE_PADDLE", key: event.key, isPressed: true });
	});

	// Keyup event: mark the key as released.
	window.addEventListener("keyup", (event: KeyboardEvent) => {
		switch (event.key) {
			case "a":
				inputState.left = false;
				break;
			case "d":
				inputState.right = false;
				break;
			default:
				break;
		}

		// Optionally, send the keyup event to the server.
		sendInput({ type: "MOVE_PADDLE", key: event.key, isPressed: false });
	});
}
