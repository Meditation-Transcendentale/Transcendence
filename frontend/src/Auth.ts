class Auth {

	private loaded: boolean;
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

		this.loaded = true;

	}

	private async loginRequest(username: string, password: string) {
		const response = await fetch("https://localhost:3000/auth/login", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				username: username,
				password: password
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

		if (response.ok == false) {
			throw response;
		}
		document.getElementById("login-username").value = "";
		document.getElementById("login-password").value = "";


		document.getElementById("main-container")?.dispatchEvent(new CustomEvent("nav", { detail: { path: "/home" } }))

	}


}

export default Auth;



