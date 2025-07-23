import { inputState } from "./inputState";
import { sendInput } from "./websocketManager";
import { GameManager } from "./gameManager";

let gameManager: GameManager | null = null;

export function initializeInput(gm: GameManager): void {
    gameManager = gm;

    window.addEventListener("keydown", (event: KeyboardEvent) => {
        if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
            event.preventDefault();
        }

        switch (event.key) {
            case "a":
                inputState.a = true;
                break;
            case "d":
                inputState.d = true;
                break;
            default:
                break;
        }

        //sendInput({ type: "MOVE_PADDLE", key: event.key, isPressed: true });
        //sendInput({ type: "MOVE_PADDLE", direction: getDirectionFromInput() });
    });

    window.addEventListener("keyup", (event: KeyboardEvent) => {
        switch (event.key) {
            case "a":
                inputState.a = false;
                break;
            case "d":
                inputState.d = false;
                break;
            default:
                break;
        }
        //sendInput({ type: "MOVE_PADDLE", direction: getDirectionFromInput() });
    });
}
function getDirectionFromInput(): number {
    if (inputState.a && !inputState.d) {
        return -1;
    } else if (!inputState.a && inputState.d) {
        return 1;
    } else {
        return 0;
    }
}
