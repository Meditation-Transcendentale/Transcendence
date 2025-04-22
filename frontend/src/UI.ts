import { Auth } from "./auth/Auth";
import { SimpleForm } from "./customElements/SimpleForm";
import { CustomEvents } from "./CustomEvents";
import { Status } from "./Status";
import { Home } from "./home/Home";
import { createContainer } from "./utils";

export class UI {
	private ui: HTMLElement;

	private auth: Auth;
	private home: Home;
	private error: Status;

	constructor() {
		this.initCustomElements();
		CustomEvents.build();

		this.ui = createContainer("ui", "");
		document.body.appendChild(this.ui);

		this.ui.addEventListener("auth", () => { this.successfullAuth() });
		this.ui.addEventListener("quit", () => { this.quit() });

		this.error = new Status(this.ui);
		this.auth = new Auth(this.ui);
		this.home = new Home(this.ui);

	}

	private successfullAuth() {
		this.auth.disable();
		this.home.reset();
	}

	private quit() {
		this.home.disable();
		this.auth.reset();
	}

	private initCustomElements() {
		customElements.define("simple-form", SimpleForm, { extends: "form" });
	}
}
