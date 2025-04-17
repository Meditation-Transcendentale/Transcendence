export abstract class ABlock {
	protected container!: HTMLElement;

	constructor() { }

	public disable() {
		this.container.setAttribute("disabled", "true");
	}

	public enable() {
		this.container.setAttribute("disabled", "false");
	}
}
