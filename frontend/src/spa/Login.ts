import { App3D } from "../3d/App";
//import { loginVue } from "../Vue";
import Router from "./Router";

import { postRequest } from "./requests";
import { raiseStatus } from "./utils";

type authHtmlReference = {
	username: HTMLInputElement;
	password: HTMLInputElement;
	login: HTMLFormElement;
	result: HTMLInputElement;
	//twofaToken: HTMLInputElement;
	//twofa: HTMLInputElement;
}

class Login {
	private div: HTMLDivElement;
	private ref: authHtmlReference;

	constructor(div: HTMLDivElement) {
		this.div = div;
		//
		this.ref = {
			username: this.div.querySelector("#login-username") as HTMLInputElement,
			password: this.div.querySelector("#login-password") as HTMLInputElement,
			login: this.div.querySelector("#login-form") as HTMLFormElement,
			result: this.div.querySelector("#login-submit") as HTMLInputElement,
			//twofaToken: this.div.querySelector("#login-2fa-token") as HTMLInputElement,
			//twofa: this.div.querySelector("#login-2fa-submit") as HTMLInputElement,
		};
		//
		this.ref.login.addEventListener("submit", (ev) => {
			ev.preventDefault();
			postRequest("auth/login", {
				username: this.ref.username.value,
				password: this.ref.password.value
			})
				.then((json) => { this.loginResolve(json) })
				.catch((resp) => { this.loginReject(resp) })
		})

		//
		//this.htmlReference.twofa.addEventListener("click", () => {
		//	postRequest("/auth/login", {
		//		username: this.htmlReference.username.value,
		//		password: this.htmlReference.password.value,
		//		token: this.htmlReference.twofaToken.value
		//	})
		//		.then((json) => { this.loginResolve(json) })
		//		.catch((resp) => { this.loginReject(resp) })
		//})

		//this.htmlReference.register.addEventListener("click", () => {
		//	Router.nav("/register");
		//})
		App3D.setVue('login');
		const loginVue = App3D.getVue('login');
		loginVue.windowAddEvent('register', 'click', () => {
			Router.nav("/register")
		})


	}

	public load(params: URLSearchParams) {
		App3D.loadVue('login');
		//this.htmlReference.twofa.setAttribute("disabled", "true");
		//this.htmlReference.username.value = "";
		//this.htmlReference.password.value = "";
		//this.htmlReference.twofaToken.value = "";
		//console.log("loading auth")

		document.querySelector("#main-container")?.appendChild(this.div);
	};

	public async unload() {
		App3D.unloadVue('login');
		this.div.remove();
	}

	private loginResolve(json: any) {
		//raiseStatus(true, json.message);
		Router.nav("/home", true);
	}

	private loginReject(resp: Response) {
		try {
			resp.json();
			//.then((json) => { raiseStatus(false, json.message); })
		} catch (err) {
			this.ref.result.value = "FATAL ERROR";
			this.ref.result.setAttribute('error', '');
			setTimeout(() => { this.ref.result.value = "login"; this.ref.result.removeAttribute('error') }, 1000);
		}
		//if (resp.status == 400) {
		//	this.htmlReference.twofa.setAttribute("disabled", "false");
		//}
	}

}

export default Login;


