export abstract class ABlock {
	protected parent!: HTMLElement;
	protected container!: HTMLElement;

	constructor(parent: HTMLElement) {
		this.parent = parent;
	}

	public disable() {
		this.container.setAttribute("disabled", "true");
		if (this.container.parentNode !== null) {
			this.parent.removeChild(this.container)
		}
	}

	public enable() {
		this.container.setAttribute("disabled", "false");
		this.parent.appendChild(this.container);
	}
}
