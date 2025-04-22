import { ABlock } from "./ABlock";
import { createContainer } from "./utils";


export class Status extends ABlock {

	constructor(parent: HTMLElement) {
		super();

		this.init();

		parent.appendChild(this.container);

	}

	private init() {
		this.container = createContainer("status", "status");
		//this.container.id = "error";

		this.container.addEventListener("status", (ev) => {
			this.container.setAttribute("ok", ev.detail.ok);
			this.container.innerHTML = ev.detail.message;
		})
	}


}
