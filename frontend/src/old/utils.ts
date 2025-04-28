export function createContainer(id: string, className: string): HTMLElement {
	const container = document.createElement("div");
	container.id = id;
	container.setAttribute("class", className);

	return container;
}
