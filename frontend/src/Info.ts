import { meRequest } from "./checkMe";

class UpdateInfo {
	private loaded: boolean;

	private validationPopup!: HTMLElement;
	private validation2FA!: HTMLElement;
	private validationPassword!: HTMLElement;
	private validationSubmit!: HTMLElement;

	constructor() {
		console.log("Update Info successfull import");

		this.loaded = false;
	}

	private async setupValidationPopup(callback: any, callbackParams: any, askPassword = true) {

		const response = await meRequest();
		const need2fa = response.message.userInfo.two_fa_enabled;

		document.getElementById("validation-password").setAttribute("display", need2fa == 0);
		document.getElementById("validation-2fa").setAttribute("display", need2fa != 0);

		if (need2fa == 0 && !askPassword) {
			callback(callbackParams)
				.then((response) => {
					this.success(response);
				})
				.catch((error) => {
					console.log(error);
				})
			return;
		}

		document.getElementById("validation-submit").addEventListener('click', (e) => {
			if (need2fa != 0) {
				callbackParams.token = document.getElementById("validation-2fa").value;
			} else {
				callbackParams.password = document.getElementById("validation-password").value;
			}
			callback(callbackParams)
				.then((response) => {
					this.success(response);
				})
				.catch((error) => {
					console.log(error);
				})
			document.getElementById("validation-popup")?.setAttribute("disabled", "true");
		}, { once: true }); //OUIIIIII once true du bonheur!!!!!!
		document.getElementById("validation-popup")?.setAttribute("disabled", "false")
	}

	public init() {
		document.getElementById("update-info-submit")?.addEventListener('click', (e) => {
			e.preventDefault();
			console.log(e);
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

		document.getElementById("validation-2fa").value = "";
		document.getElementById("validation-password").value = "";
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

