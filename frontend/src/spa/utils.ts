export function raiseStatus(ok: boolean, msg: string): void {
	const status = document.querySelector("#status") as HTMLElement;

	status.setAttribute("ok", ok ? "true" : "false");
	status.innerHTML = msg;
	status.animate([
		{ opacity: 0 },
		{ opacity: 1 },
		{ opacity: 1 },
		{ opacity: 0 }
	], {
		duration: 3000,
		iterations: 1,
		easing: "ease-out"
	})
}

export function createButton(value: string, onClick: (btn: HTMLInputElement) => void): HTMLInputElement {
	const btn = document.createElement("input");
	btn.type = "button";
	btn.value = value;
	btn.addEventListener("click", () => {
		onClick(btn);
	});
	return btn;
}



export function setDraggable(win: HTMLElement) {
	const drag = win.querySelector(".drag");
	if (!drag) { return };
	drag.addEventListener('mousedown', (e: any) => {
		var offsetX = e.clientX - parseInt(window.getComputedStyle(win).left);
		var offsetY = e.clientY - parseInt(window.getComputedStyle(win).top);

		function mouseMoveHandler(e: any) {
			win.style.top = (e.clientY - offsetY) + 'px';
			win.style.left = (e.clientX - offsetX) + 'px';
		}
		function reset() {
			window.removeEventListener('mousemove', mouseMoveHandler);
			window.removeEventListener('mouseup', reset);
		}
		window.addEventListener('mousemove', mouseMoveHandler);
		window.addEventListener('mouseup', reset);
	});
}

export function createDivception(options: {
	class: string,
	children?: string[],
	childrenClass?: string,
}): HTMLDivElement {
	const div = document.createElement("div");

	div.className = options.class;
	if (!options.children) { return div; };
	for (let i = 0; i < options.children.length; i++) {
		const child = document.createElement("div");
		child.innerText = options.children[i];
		child.className = options.childrenClass ? options.childrenClass : "";
		div.appendChild(child);
	}
	return div;
}
