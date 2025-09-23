import Router from "./Router";
import { postRequest } from "./requests";

interface authHtmlReference {
	container: HTMLDivElement;
	form: HtMLFormElement;
	googleInput: HTMLInputElement;
	error: HTMLDivElement;
}

class Auth {
	private div: HTMLDivElement;
	private ref: authHtmlReference;

	private css: HTMLElement;

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.css = div.querySelector("link") as HTMLElement;
		this.ref = {
			container: div.querySelector("#login-content") as HTMLDivElement,
			form: div.querySelector("#loginForm") as HtMLFormElement,
			googleInput: div.querySelector("#google-input") as HTMLInputElement,
			error: div.querySelector("#login-error") as HTMLDivElement
		}

		this.ref.form.addEventListener("submit", (e) => {
			e.preventDefault();
			let data = new FormData(this.ref.form);
			if (e.submitter.name == "login") {
				this.login(data);
			} else if (e.submitter.name == "register") {
				this.register(data);
			}
	  	})
	}

	public load(params: URLSearchParams) {
		this.ref.form.reset();
		document.head.appendChild(this.css);
		document.body.appendChild(this.ref.container);
	}

	public async unload() {
		this.css.remove();
		this.ref.container.remove();
	}

	private login(data: FormData) {
		postRequest("auth/login", {
			username: data.get("username"),
			password: data.get("password")
		})
			.then((json) => { this.loginResolve(json) })
			.catch((resp) => { this.requestReject(resp) })
	}

	private register(data: FormData) {
		postRequest("register", {
			username: data.get("username"),
			password: data.get("password")
		})
			.then((json) => { this.registerResolve(data, json) })
			.catch((resp) => { this.requestReject(resp) });
	}

	private loginResolve(json: any) {
		Router.nav("/home", true);
	}

	private async requestReject(resp: Response) {
		try {
			let j=await  resp.json();
			this.ref.error.innerText = j.message;
		} catch (err) {
			this.ref.error.innerText = "AHAH"
		}
		this.ref.error.classList.remove("hidden");
	}

	private registerResolve(data: FormData, json: any) {
		postRequest("auth/login", {
			username: data.get("username"),
			password: data.get("password")
		})
			.then((json) => { this.loginResolve(json) })
			.catch((resp) => { this.requestReject(resp) })
	}

}
export default Auth  
