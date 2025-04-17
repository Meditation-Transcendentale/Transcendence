import { Auth } from "./auth/Auth";
import { SimpleForm } from "./customElements/SimpleForm";
import { createContainer } from "./utils";

export class UI {
	private ui: HTMLElement;

	private auth: Auth;

	constructor() {
		this.initCustomElements();

		this.ui = createContainer("ui", "");
		document.body.appendChild(this.ui);

		this.auth = new Auth(this.ui);


	}

	private initCustomElements() {
		customElements.define("simple-form", SimpleForm, { extends: "form" });
	}
}
