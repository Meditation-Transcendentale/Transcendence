import { postRequest } from "../networking/request";
import { routeManager } from "../route/RouteManager";
import { IHtml } from "./IHtml";


export class AuthHtml implements IHtml {
	private css!: HTMLLinkElement;
	private container!: HTMLDivElement;
	private form!: HTMLFormElement;
	private googleInput!: HTMLInputElement;
	private intraInput!: HTMLInputElement;
	private tokenContainer!: HTMLDivElement;
	private tokenReset!: HTMLButtonElement;
	private error!: HTMLDivElement;

	constructor() { }

	public init(div: HTMLElement): void {
		this.css = div.querySelector("link") as HTMLLinkElement;

		this.container = div.querySelector("#login-content") as HTMLDivElement;
		this.form = div.querySelector("#loginForm") as HTMLFormElement;
		this.googleInput = div.querySelector("#google-input") as HTMLInputElement;
		this.intraInput = div.querySelector("#FTIntra-input") as HTMLInputElement;
		this.error = div.querySelector("#login-error") as HTMLDivElement;
		this.tokenContainer = div.querySelector("#twofa-container") as HTMLDivElement;
		this.tokenReset = div.querySelector("#token-reset") as HTMLButtonElement;

		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			let data = new FormData(this.form);
			const submitter = e!.submitter!.name as string;
			if (submitter == "login") {
				this.login(data);
			} else if (submitter == "register") {
				this.register(data);
			} else if (submitter == "token") {
				if (data.has("twofa1") && data.has("twofa2") && data.has("twofa3") && data.has("twofa4") && data.has("twofa5") && data.has("twofa6")) {
					// console.log(data.getAll("twofa"));
					this.login(data, data.get("twofa1") as string + data.get("twofa2") + data.get("twofa3") + data.get("twofa4") + data.get("twofa5") + data.get("twofa6"));
				}
			} else if (submitter == "dismiss") {
				this.setTokenRequired(false);
			}
		})

		this.tokenReset.addEventListener("click", () => {
			this.setTokenRequired(false);
			this.error.innerText = "";
		})

		this.googleInput.addEventListener("click", () => {
			window.google.accounts.id.prompt();
		})

		this.intraInput.addEventListener("click", () => {
			this.intraLogin();
		})

		this.initToken();

		this.initGoogle();


	}

	public load(): void {
		this.form.reset();
		this.tokenContainer.classList.add("hidden");
		this.setTokenRequired(false);
		document.head.appendChild(this.css);
		document.body.appendChild(this.container);
	}


	public unload(): void {
		this.css.remove();
		this.container.remove();
	}

	private intraLogin() {
		const redirectUri = `https://${window.location.hostname}:7000/api/auth/42`;
		const uri = encodeURIComponent(redirectUri);
		const state = encodeURIComponent(JSON.stringify({ redirect_uri: redirectUri }));
		console.log('Decoded redirect_uri:', decodeURIComponent(uri));
		const intraUrl = `https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-400234df0a18d81e039591e1b141029e457ec4d673a0f23e7fc3828493a2c593&redirect_uri=${uri}&response_type=code&state=${state}`;

		window.open(intraUrl, "42Intra", "width=600,height=600");

		window.addEventListener("message", (event) => {
			if (event.origin !== `https://${window.location.hostname}:7000`) return;

			if (event.data.type === "ft_login_success") {
				routeManager.nav("/home", true, true);
			} else if (event.data.type === "ft_login_error") {
				this.error.innerText = "Connection with 42 failed : " + event.data.message;
				this.error.classList.remove("hidden");
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
		routeManager.nav("/home", true, true);
	}

	private async requestReject(data: FormData, resp: Response) {
		try {
			let j = await resp.json();
			this.error.innerText = j.message;
			if (j.code == 40018) {
				this.tokenContainer.classList.remove("hidden");
				this.setTokenRequired(true);
			}
		} catch (err) {
			this.error.innerText = "AHAH"
		}
		this.error.classList.remove("hidden");
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
		(this.tokenContainer.querySelectorAll(".token-number") as NodeListOf<HTMLInputElement>).forEach((e) => {
			e.required = state;
		});
		(this.form.querySelectorAll(".disabledable") as NodeListOf<HTMLInputElement>).forEach((e) => {
			e.disabled = state;
		});
		if (!state) {
			this.tokenContainer.classList.add("hidden");

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
		const tokens = this.tokenContainer.querySelectorAll(".rune-input") as NodeListOf<HTMLInputElement>;
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

