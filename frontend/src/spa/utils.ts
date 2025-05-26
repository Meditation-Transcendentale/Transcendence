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
