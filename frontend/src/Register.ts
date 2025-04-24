class Register {
	constructor() {
		console.log("Register loaded successfully");

		document.getElementById("register")?.addEventListener("submit", (ev) => {
			ev.preventDefault();
			this.registerRequest(document.getElementById("register-username").value, document.getElementById("register-password").value)
				.then((response) => { this.registerResponse(response) })
				.catch((error) => console.log(error));
		});

	}

	private registerResponse(response: any) {
		document.getElementById("status")?.setAttribute("ok", response.ok);
		document.getElementById('status').value = response.message;

		if (response.ok == false) {
			throw response;
		}

		this.loginRequest(document.getElementById("register-username").value, document.getElementById("register-password").value)
			.then((response) => { this.loginResponse(response) })
	}

	private loginResponse(response: any) {
		document.getElementById("status")?.setAttribute("ok", response.ok);
		document.getElementById('status').value = response.message;

		if (response.ok == false) {
			throw response;
		}

		document.getElementById("main-container")?.dispatchEvent(new CustomEvent('nav', { detail: { path: "/home" } }))
	}

	private async registerRequest(username: string, password: string) {
		const response = await fetch("https://localhost:3000/register", {
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


}


const register = new Register();



