import Router from "./Router";

class Register {
	private loaded: boolean;

	constructor() {
		this.loaded = false;
	}

	public init() {
		if (this.loaded == true) {
			return;
		}
		document.getElementById("register")?.addEventListener("submit", (ev) => {
			ev.preventDefault();
			this.registerRequest(
				document.getElementById("register-username")?.value,
				document.getElementById("register-password")?.value
			)
				.then((json) => this.registerResolve(json))
				.catch((error) => { this.requestReject(error) });
		});

		document.getElementById("login")?.addEventListener("click", (ev) => {
			ev.preventDefault();
			Router.nav("/auth");
		})



		this.loaded = true;
	}

	public reset() { }

	private registerResolve(json: JSON) {
		document.getElementById("status")?.dispatchEvent(
			new CustomEvent("status", { detail: { ok: true, json: json.message } }));

		this.loginRequest(
			document.getElementById("register-username")?.value,
			document.getElementById("register-password")?.value)
			.then((json) => { this.loginResolve(json) });
	}

	private loginResolve(json: JSON) {
		document.getElementById("status")?.dispatchEvent(
			new CustomEvent("status", { detail: { ok: true, json: json.message } }));
		document.getElementById("register-username")?.setAttribute("value", "");
		document.getElementById("register-password")?.setAttribute("value", "");
		Router.nav("/home", true);
	}

	private requestReject(response: Response) {
		response.json()
			.then((json) => {
				document.getElementById("status")?.dispatchEvent(
					new CustomEvent("status", { detail: { ok: response.ok, json: json.message } }));
			})
	}

	private async registerRequest(username: string, password: string) {
		const response = await fetch("https://localhost:3000/register", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({
				username: username,
				password: password,
			})

		})
		if (!response.ok) {
			return Promise.reject(response);
		}

		return response.json();
	}



	private async loginRequest(username: string, password: string) {
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
			})

		})
		if (!response.ok) {
			return Promise.reject(response);
		}

		return response.json();
	}

}


export default Register;


