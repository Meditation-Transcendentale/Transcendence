import { App3D } from "../3d/App";
import { registerVue } from "../Vue";
import { postRequest } from "./requests";
import Router from "./Router";
import { raiseStatus } from "./utils";

type registerHtmlReference = {
	username: HTMLInputElement,
	password: HTMLInputElement,
	register: HTMLFormElement,
	result: HTMLInputElement
}

class Register {
	private div: HTMLDivElement;
	private ref: registerHtmlReference;

	constructor(div: HTMLDivElement) {
		this.div = div;

		this.ref = {
			username: div.querySelector("#register-username") as HTMLInputElement,
			password: div.querySelector("#register-password") as HTMLInputElement,
			register: div.querySelector("#register-form") as HTMLFormElement,
			result: div.querySelector("#register-submit") as HTMLInputElement
		};

		this.ref.register.addEventListener("submit", (e) => {
			e.preventDefault();
			postRequest("register", {
				username: this.ref.username.value,
				password: this.ref.password.value
			})
				.then((json) => { this.registerResolve(json) })
				.catch((resp) => { this.requestReject(resp) });
		})

		App3D.setVue('register');
		registerVue.windowAddEvent('login', 'click', () => {
			Router.nav("/login");
		})

	}

	public load(params: URLSearchParams) {
		App3D.loadVue('register');
		document.querySelector("#main-container")?.appendChild(this.div);
	}

	public async unload() {
		App3D.unloadVue('register');
		this.div.remove();
	}

	private registerResolve(json: any) {
		raiseStatus(true, json.message);
		postRequest("auth/login", {
			username: this.ref.username.value,
			password: this.ref.password.value
		})
			.then((json) => { this.loginResolve(json) })
			.catch((resp) => { this.requestReject(resp) })
	}

	private loginResolve(json: any) {
		raiseStatus(true, json.message);
		Router.nav("/home", true);
	}

	private requestReject(resp: Response) {
		try {
			resp.json()
				.then((json) => { raiseStatus(false, json.message); })
		} catch (err) {
			this.ref.result.value = "FATAL ERROR";
			this.ref.result.setAttribute('error', '');
			setTimeout(() => { this.ref.result.value = "login"; this.ref.result.removeAttribute('error') }, 1000);
		}


	}

}


export default Register;


