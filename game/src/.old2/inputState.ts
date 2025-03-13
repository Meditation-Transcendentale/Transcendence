// File: /src/inputState.ts

export const inputState = {
	a: false,
	d: false
};

document.addEventListener("keydown", (event: KeyboardEvent) => {
	if (event.key === "a") {
		inputState.a = true;
	} else if (event.key === "d") {
		inputState.d = true;
	}
});

document.addEventListener("keyup", (event: KeyboardEvent) => {
	if (event.key === "a") {
		inputState.a = false;
	} else if (event.key === "d") {
		inputState.d = false;
	}
});

