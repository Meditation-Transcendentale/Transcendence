import Router from "./Router";

class Auth {
	private loaded: boolean;
	private twofaPopup!: HTMLElement;
	private twofaSubmit!: HTMLElement;

	constructor() {
		this.loaded = false;
	}

	public init() {
		if (this.loaded == true) {
			return;
		}

		// gapi.load("auth2", () => {
		// 	gapi.auth2.init({ client_id: "532264983031-05k4fba7tc2f005dtrk1qqo8aug3bpd2.apps.googleusercontent.com" })
		// 		.then(() => {
		// 			gapi.signin2.render();
		// 		}, eonsole.log("error"));
		// })

		document.getElementById("login")?.addEventListener("submit", (ev) => {
			ev.preventDefault();
			this.loginRequest(document.getElementById("login-username").value, document.getElementById("login-password").value)
				.then((response) => { this.loginResolve(response) })
				.catch((error) => { this.loginReject(error) });
		});


		document.getElementById("register")?.addEventListener("click", (ev) => {
			ev.preventDefault();
			Router.nav("/register");
		})

		document.getElementById("login-2fa-submit")?.addEventListener("click", (e) => {
			this.loginRequest(
				document.getElementById("login-username").value,
				document.getElementById("login-password").value,
				document.getElementById("login-2fa-token").value)
				.then((response) => { this.loginResolve(response) })
				.catch((error) => { this.loginReject(error) });
		});

		this.loaded = true;
	}

	public reset() {
		document.getElementById("login-username").value = "";
		document.getElementById("login-password").value = "";
		document.getElementById("login-2fa-token").value = "";
	}

	private async loginRequest(username: string, password: string, token = "") {
		const response = await fetch("https://localhost:3000/auth/login", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({
				username: username,
				password: password,
				token: token
			})

		})
		if (!response.ok) {
			return Promise.reject(response);
		}

		return response.json();
	}


	private loginResolve(json: JSON) {
		document.getElementById("status")?.dispatchEvent(new CustomEvent("status", { detail: { ok: true, json: json.message } }));
		// document.getElementById("main-container")?.dispatchEvent(new CustomEvent("nav", { detail: { path: "/home", return: true } }));
		Router.nav("", true);
	}

	private loginReject(response: Response) {
		response.json()
			.then((json) => {
				document.getElementById("status")?.dispatchEvent(new CustomEvent("status", { detail: { ok: response.ok, json: json.message } }))
			});
		if (response.status == 400) {
			document.getElementById("login-2fa")?.setAttribute("disabled", "false");
		}
		console.log(response);
	}
}

export default Auth;



