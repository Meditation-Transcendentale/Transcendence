import { postRequest } from "./requests";
import Router from "./Router";
import { raiseStatus } from "./utils";

type registerHtmlReference = {
	username: HTMLInputElement,
	password: HTMLInputElement,
	register: HTMLInputElement,
	login: HTMLAnchorElement
}

class Register {
	private div: HTMLDivElement;
	private htmlReference: registerHtmlReference;

	constructor(div: HTMLDivElement) {
		this.div = div;

		this.htmlReference = {
			username: div.querySelector("#register-username") as HTMLInputElement,
			password: div.querySelector("#register-password") as HTMLInputElement,
			register: div.querySelector("#register-submit") as HTMLInputElement,
			login: div.querySelector("#login") as HTMLAnchorElement
		};

		this.htmlReference.register.addEventListener("click", () => {
			postRequest("register", {
				username: this.htmlReference.username.value,
				password: this.htmlReference.password.value
			})
				.then((json) => { this.registerResolve(json) })
				.catch((resp) => { this.requestReject(resp) });
		})

		this.htmlReference.login.addEventListener("click", (e) => {
			e.preventDefault();
			Router.nav("/login");
		})

	}

	public load(params: URLSearchParams) {
		document.querySelector("#main-container")?.appendChild(this.div);
	}

	public async unload() {
		this.div.remove();
	}

	private registerResolve(json: any) {
		raiseStatus(true, json.message);
		postRequest("auth/login", {
			username: this.htmlReference.username.value,
			password: this.htmlReference.password.value
		})
			.then((json) => { this.loginResolve(json) })
			.catch((resp) => { this.requestReject(resp) })
	}

	private loginResolve(json: any) {
		raiseStatus(true, json.message);
		Router.nav("/home", true);
	}

	private requestReject(resp: Response) {
		resp.json()
			.then((json) => raiseStatus(false, json.message));

	}

}


export default Register;


