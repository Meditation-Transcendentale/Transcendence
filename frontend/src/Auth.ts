class Auth {
	private loaded: boolean;
	private twofaPopup!: HTMLElement;
	private twofaSubmit!: HTMLElement;

	constructor() {
		console.log("Auth loaded successfully");
		this.loaded = false;
	}

	public init() {
		if (this.loaded == true) {
			return;
		}

		document.getElementById("login")?.addEventListener("submit", (ev) => {
			ev.preventDefault();
			this.loginRequest(document.getElementById("login-username").value, document.getElementById("login-password").value)
				.then((response) => { this.loginResponse(response) })
				.catch((error) => console.log(error));
		});


		document.getElementById("register")?.addEventListener("click", (ev) => {
			ev.preventDefault();
			document.getElementById("main-container")?.dispatchEvent(new CustomEvent("nav", { detail: { path: "/register" } }));
		})

		document.getElementById("login-2fa-submit")?.addEventListener("click", (e) => {
			this.loginRequest(
				document.getElementById("login-username").value,
				document.getElementById("login-password").value,
				document.getElementById("login-2fa-token").value)
				.then((response) => { this.loginResponse(response) })
				.catch((error) => console.log(error));
		});

		document.getElementById("auth")?.addEventListener("click", (e) => {
			document.getElementById("login-username")?.removeAttribute("disabled");
			document.getElementById("login-password")?.removeAttribute("disabled");
			document.getElementById("login-2fa")?.setAttribute("disabled", "true");
		})

		this.loaded = true;
	}

	public reset() {

	}

	private async loginRequest(username: string, password: string, token = "") {
		const response = await fetch("https://localhost:3000/auth/login", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				username: username,
				password: password,
				token: token
			})
		});


		const data = await response.json();

		const final = {
			message: data.message,
			status: response.status,
			ok: response.ok
		};
		return final;
	};

	private loginResponse(response: any) {
		document.getElementById("status")?.setAttribute("ok", response.ok);
		document.getElementById('status').value = response.message;

		if (response.status == 400) {
			document.getElementById("login-2fa").setAttribute("disabled", "false");
			document.getElementById("login-username").setAttribute("disabled", "");
			document.getElementById("login-password").setAttribute("disabled", "");
		}
		if (response.ok == false) {
			throw response;
		}
		document.getElementById("login-username").value = "";
		document.getElementById("login-password").value = "";


		document.getElementById("main-container")?.dispatchEvent(new CustomEvent("nav", { detail: { path: "/home", return: true } }))

	}


}

export default Auth;



