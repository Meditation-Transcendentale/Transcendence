import Router from "./Router";
import { postRequest } from "./requests";

interface authHtmlReference {
	container: HTMLDivElement;
	form: HTMLFormElement;
	googleInput: HTMLInputElement;
	FTIntraInput: HTMLInputElement;
	error: HTMLDivElement;
	tokenDiv: HTMLDivElement;
	tokenReset: HTMLButtonElement;
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
			form: div.querySelector("#loginForm") as HTMLFormElement,
			googleInput: div.querySelector("#google-input") as HTMLInputElement,
			FTIntraInput: div.querySelector("#FTIntra-input") as HTMLInputElement,
			error: div.querySelector("#login-error") as HTMLDivElement,
			tokenDiv: div.querySelector("#twofa-container") as HTMLDivElement,
			tokenReset: div.querySelector("#token-reset") as HTMLButtonElement
		}

		this.ref.form.addEventListener("submit", (e) => {
			e.preventDefault();
			let data = new FormData(this.ref.form);
			const submitter = e!.submitter!.name as string;
			if (submitter == "login") {
				this.login(data);
			} else if (submitter == "register") {
				this.register(data);
			} else if (submitter == "token") {
				if (data.has("twofa1") && data.has("twofa2") && data.has("twofa3") && data.has("twofa4") && data.has("twofa5") && data.has("twofa6")) {
					// console.log(data.getAll("twofa"));
					this.login(data, data.get("twofa1") + data.get("twofa2") + data.get("twofa3") + data.get("twofa4") + data.get("twofa5") + data.get("twofa6"));
				}
			} else if (submitter == "dismiss") {
				this.setTokenRequired(false);
			}
		})

		this.ref.tokenReset.addEventListener("click", (e) => {
			this.setTokenRequired(false);
			this.ref.error.innerText = "";
		})

		this.ref.googleInput.addEventListener("click", (e) => {
			console.log("Google login not implemented yet.");
		})

		this.ref.FTIntraInput?.addEventListener("click", (e) => {
			console.log("FTIntra login not implemented yet.");
		})

		this.initToken();
	}

	public load(params: URLSearchParams) {
		this.ref.form.reset();
		this.ref.tokenDiv.classList.add("hidden");
		this.setTokenRequired(false);
		document.head.appendChild(this.css);
		document.body.appendChild(this.ref.container);
	}

	public async unload() {
		this.css.remove();
		this.ref.container.remove();
	}

	private login(data: FormData, token = "") {
		postRequest("auth/login", {
			username: data.get("username"),
			password: data.get("password"),
			token: token
		})
			.then((json) => { this.loginResolve(json) })
			.catch((resp) => { this.requestReject(data, resp) })
	}

	private register(data: FormData) {
		postRequest("register", {
			username: data.get("username"),
			password: data.get("password")
		})
			.then((json) => { this.registerResolve(data, json) })
			.catch((resp) => { this.requestReject(data, resp) });
	}

	private loginResolve(json: any) {
		Router.nav("/home", true);
	}

	private async requestReject(data: FormData, resp: Response) {
		try {
			let j = await resp.json();
			this.ref.error.innerText = j.message;
			if (j.code == 40018) {
				this.ref.tokenDiv.classList.remove("hidden");
				this.setTokenRequired(true);
			}
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
			.catch((resp) => { this.requestReject(data, resp) })
	}

	private setTokenRequired(state: boolean) {
		(this.ref.tokenDiv.querySelectorAll(".token-number") as NodeListOf<HTMLInputElement>).forEach((e) => {
			e.required = state;
		});
		(this.ref.form.querySelectorAll(".disabledable") as NodeListOf<HTMLInputElement>).forEach((e) => {
			e.disabled = state;
		});
		if (!state) {
			this.ref.tokenDiv.classList.add("hidden");

		}
	}

	private initToken() {
		const tokens = this.ref.tokenDiv.querySelectorAll(".token-number") as NodeListOf<HTMLInputElement>;
		tokens.forEach((e, i) => {
			e.required = false;
			e.addEventListener("input", () => {
				if (e.value.length == 1 && i < tokens.length - 1) {
					tokens[i + 1].focus();
				}
			})
			e.addEventListener("keyup", (ev) => {
				if (ev.key == "Backspace" && i > 0 && e.value.length == 0) {
					tokens[i - 1].focus();
				}
			})
		})

	}

}
export default Auth  
