import Router from "./Router";
import { google } from "./proto/message";
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
			this.google_login();
		})

		this.ref.FTIntraInput?.addEventListener("click", (e) => {
			this.ft_login();
		})

		this.initToken();

		this.initGoogle();
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

	private google_login() {
		window.google.accounts.id.prompt();
		// window.google.accounts.id.renderButton(this.ref.googleInput, {
		// 	theme: "outline",
		// 	size: "large",
		// });
	}

	private ft_login() {
		const intraUrl = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-a52a0d9baca0584c24f69c90aaea3aae24b86c22f3e4e27838f8ce9249d5fd93&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fauth%2F42&response_type=code";
		window.open(intraUrl, "42Intra", "width=600,height=600");

		window.addEventListener("message", (event) => {
			if (event.origin !== "https://localhost:3000") return;

			if (event.data.type === "ft_login_success") {
				Router.nav("/home", true);
			} else if (event.data.type === "ft_login_error") {
				this.ref.error.innerText = "Connection with 42 failed.";
				this.ref.error.classList.remove("hidden");
			}
		});
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

	private initGoogle() {
		window.google.accounts?.id?.initialize({
			client_id: "1089807862778-laga27uqspepmtq7pbp55khbbjn86sqd.apps.googleusercontent.com",
			callback: (res: any) => {
				postRequest("auth/auth-google", {
					token: res.credential
				})
					.then((json) => { this.loginResolve(json) })
					.catch((resp) => { this.requestReject(new FormData(), resp) })
			}
		});
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
