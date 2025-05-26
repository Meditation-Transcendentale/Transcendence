import Router from "./Router";

import { postRequest } from "./requests";
import { raiseStatus } from "./utils";

type authHtmlReference = {
	username: HTMLInputElement;
	password: HTMLInputElement;
	login: HTMLFormElement;
	register: HTMLInputElement;
	twofaToken: HTMLInputElement;
	twofa: HTMLInputElement;
}

class Auth {
	private div: HTMLDivElement;
	private htmlReference: authHtmlReference;

	constructor(div: HTMLDivElement) {
		this.div = div;

		this.htmlReference = {
			username: this.div.querySelector("#login-username") as HTMLInputElement,
			password: this.div.querySelector("#login-password") as HTMLInputElement,
			login: this.div.querySelector("#login") as HTMLFormElement,
			register: this.div.querySelector("#register") as HTMLInputElement,
			twofaToken: this.div.querySelector("#login-2fa-token") as HTMLInputElement,
			twofa: this.div.querySelector("#login-2fa-submit") as HTMLInputElement,
		};

		this.htmlReference.login.addEventListener("submit", (ev) => {
			ev.preventDefault();
			postRequest("auth/login", {
				username: this.htmlReference.username.value,
				password: this.htmlReference.password.value
			})
				.then((json) => { this.loginResolve(json) })
				.catch((resp) => { this.loginReject(resp) })
		})

		this.htmlReference.twofa.addEventListener("click", () => {
			postRequest("/auth/login", {
				username: this.htmlReference.username.value,
				password: this.htmlReference.password.value,
				token: this.htmlReference.twofaToken.value
			})
				.then((json) => { this.loginResolve(json) })
				.catch((resp) => { this.loginReject(resp) })
		})

		this.htmlReference.register.addEventListener("click", () => {
			Router.nav("/register");
		})
	}

	public load(params: URLSearchParams) {
		this.htmlReference.twofa.setAttribute("disabled", "true");
		this.htmlReference.username.value = "";
		this.htmlReference.password.value = "";
		this.htmlReference.twofaToken.value = "";
		console.log("loading auth")

		document.querySelector("#main-container")?.appendChild(this.div);
	};

	public async unload() {
		this.div.remove();
	}

	private loginResolve(json: any) {
		raiseStatus(true, json.message);
		Router.nav("/home", true);
	}

	private loginReject(resp: Response) {
		resp.json()
			.then((json) => { raiseStatus(false, json.message); })
		if (resp.status == 400) {
			this.htmlReference.twofa.setAttribute("disabled", "false");
		}
	}

}

export default Auth;


