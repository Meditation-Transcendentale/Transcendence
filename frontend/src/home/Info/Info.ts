import { ABlock } from "../../ABlock";
import { createContainer } from "../../utils";

export class Info extends ABlock {

	constructor(parent: HTMLElement) {
		super();

		this.init();
		parent.appendChild(this.container);
	}

	private init() {
		this.container = createContainer("info-container", "info");



	}
}
