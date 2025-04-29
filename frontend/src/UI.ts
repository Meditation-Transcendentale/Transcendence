import { Auth } from "./auth/Auth";
import { SimpleForm } from "./customElements/SimpleForm";
import { CustomEvents } from "./CustomEvents";
import { Status } from "./Status";
//import { Home } from "./home/Home";
import { createContainer } from "./utils";
import { Router } from "./Router";
import Home from "./home/Home";

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
		this.home = new Home(this.ui);




		//router set routes at init + default callback -> to ui function
		//at first ui handle if auth / home + auth / home direct
		//check if connected
		//
		//recup url
		//
		//checked log in
		//
		//this.home = new Home(this.ui);

	}

	private async successfullAuth() {
		//if (this.home === null) {
		//	const home = await import("./home/Home");
		//	this.home = new home.default(this.ui);
		//	this.auth.disable();
		//}

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
