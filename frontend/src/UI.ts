import { Auth } from "./auth/Auth";
import { SimpleForm } from "./customElements/SimpleForm";
import { CustomEvents } from "./CustomEvents";
import { Status } from "./Status";
//import { Home } from "./home/Home";
import { createContainer } from "./utils";

export class UI {
	private ui: HTMLElement;

	private auth: Auth;
	private home!: any;
	private error: Status;

	constructor() {
		this.initCustomElements();
		CustomEvents.build();

		this.ui = createContainer("ui", "");
		document.body.appendChild(this.ui);

		console.log("Session Username:", sessionStorage.getItem("username"));

		this.ui.addEventListener("auth", () => { this.successfullAuth() });
		this.ui.addEventListener("quit", () => { this.quit() });

		this.error = new Status(this.ui);
		this.auth = new Auth(this.ui);
		this.home = null;

		this.auth.enable();
		//this.home = new Home(this.ui);

	}

	private async successfullAuth() {
		if (this.home === null) {
			const home = await import("./home/Home");
			this.home = new home.default(this.ui);
			this.auth.disable();
		}

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
