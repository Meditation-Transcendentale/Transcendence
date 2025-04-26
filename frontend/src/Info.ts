class UpdateInfo {
	private loaded: boolean;

	private validationPopup!: HTMLElement;
	private validation2FA!: HTMLElement;
	private validationPassword!: HTMLElement;
	private validationSubmit!: HTMLElement;

	constructor() {
		console.log("Update Info successfull import");

		this.createValidationPopup();
		this.loaded = false;
	}

	private createValidationPopup() {
		this.validationPopup = document.createElement("div");
		this.validationPopup.id = "update-info-validation-popup";

		this.validation2FA = document.createElement("input");
		this.validation2FA.id = "validation-popup-2fa";
		this.validation2FA.setAttribute("type", "text");
		this.validation2FA.setAttribute("placeholder", "2FA Code");

		this.validationPassword = document.createElement("input");
		this.validationPassword.id = "validation-popup-2fa";
		this.validationPassword.setAttribute("type", "password");
		this.validationPassword.setAttribute("placeholder", "Password");

		this.validationSubmit = document.createElement("input");
		this.validationSubmit.id = "validation-popup-2fa";
		this.validationSubmit.setAttribute("type", "button");
		this.validationSubmit.setAttribute("value", "Submit");

		this.validationPopup.appendChild(this.validation2FA);
		this.validationPopup.appendChild(this.validationPassword);
		this.validationPopup.appendChild(this.validationSubmit);
	}

	private setupValidationPopup(callback: any, callbackParams: any, askPassword = true) {
		const need2fa = false;

		this.validationPassword.setAttribute("display", !need2fa);
		this.validation2FA.setAttribute("display", need2fa);


		// this.validationSubmit.removeEventListener("click");
		if (!need2fa && !askPassword) {
			callback(callbackParams)
				.then((response) => {
					this.success(response);
				})
				.catch((error) => {
					console.log(error);
				})
			return;
		}

		this.validationSubmit.addEventListener('click', (e) => {
			if (need2fa) {
				callbackParams.token = this.validation2FA.value;
			} else {
				callbackParams.password = this.validationPassword.value;
			}
			callback(callbackParams)
				.then((response) => {
					this.success(response);
					this.validationPopup.remove();
				})
				.catch((error) => {
					console.log(error);
				})
			// document.getElementById("info")?.removeChild(this.validationPopup);
			this.validationPopup.remove();
		}, { once: true });

		document.getElementById("info")?.appendChild(this.validationPopup);
	}

	public init() {
		document.getElementById("update-info-submit")?.addEventListener('click', (e) => {
			e.preventDefault();
			this.setupValidationPopup(this.updateInfoRequest, {
				username: document.getElementById("update-info-username")?.value,
				avatar: document.getElementById("update-info-avatar")?.value,
				password: "",
				token: ""
			}, true);
		});


		document.getElementById("update-password-submit")?.addEventListener('click', (e) => {
			e.preventDefault();
			this.setupValidationPopup(this.updatePasswordRequest, {
				password: document.getElementById("update-password-old")?.value,
				newPassword: document.getElementById("update-password-new")?.value,
				token: ""
			}, false)
		})
	}

	public reset() {

	}

	private async updatePasswordRequest(body: { password: string, newPassword: string, token: string }) {
		const response = await fetch("https://localhost:3000/update-info/password", {
			method: 'PATCH',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(body)
		});

		const data = await response.json();

		const final = {
			message: data.message,
			status: response.status,
			ok: response.ok
		};
		return final;
	}

	private async updateInfoRequest(body: { username: string, avatar: string, password: string, token: string }) {
		const response = await fetch("https://localhost:3000/update-info", {
			method: 'PATCH',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(body)
		});

		const data = await response.json();

		const final = {
			message: data.message,
			status: response.status,
			ok: response.ok
		};
		return final;
	}

	private success(response: any) {
		document.getElementById("status")?.setAttribute("ok", response.ok);
		document.getElementById('status').value = response.message;

		this.validation2FA.value = "";
		this.validationPassword.value = "";
		document.getElementById("update-password-old").value = "";
		document.getElementById("update-password-new").value = "";
		document.getElementById("update-info-username").value = "";
		document.getElementById("update-info-avatar").value = "";

		if (!response.ok) {
			throw "error";
		}
		return;
	}
}

export default UpdateInfo;

