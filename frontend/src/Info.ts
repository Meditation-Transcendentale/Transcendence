import { meReject, meRequest } from "./checkMe";

class UpdateInfo {
	private loaded: boolean;

	private validationPopup!: HTMLElement;
	private validation2FA!: HTMLElement;
	private validationPassword!: HTMLElement;
	private validationSubmit!: HTMLElement;

	constructor() {
		this.loaded = false;
	}

	public init() {
		if (this.loaded) {
			return;
		}

		document.getElementById("update-info-submit")?.addEventListener('click', (e) => {
			e.preventDefault();
			this.setupValidationPopup(this.updateInfoRequest, {
				username: document.getElementById("update-info-username")?.value,
				avatar: document.getElementById("update-info-avatar")?.value,
				password: "",
				token: ""
			}, this.requestResolve, this.requestReject, true);
		});


		document.getElementById("update-password-submit")?.addEventListener('click', (e) => {
			e.preventDefault();
			this.setupValidationPopup(this.updatePasswordRequest, {
				password: document.getElementById("update-password-old")?.value,
				newPassword: document.getElementById("update-password-new")?.value,
				token: ""
			}, this.requestResolve, this.requestReject, false)
		})

		document.getElementById("enable-2fa")?.addEventListener("click", (e) => {
			e.preventDefault();
			console.log("eee");
			this.setupValidationPopup(
				document.getElementById('enable-2fa').checked == 1 ? this.enable2faRequest : this.disable2faRequest,
				{},
				document.getElementById('enable-2fa').checked == 1 ? this.enable2faResolve : this.disable2faResolve,
				this.requestReject,
				true, false
			);
		});

		this.loaded = true;
	}


	private async setupValidationPopup(callback: any, callbackParams: any, resolveHandler: any, rejectHandler: any, askPassword = true, ask2FA = true) {


		const response = await meRequest()
			.catch(() => {
				meReject();
				return;
			});
		const need2fa = response.userInfo.two_fa_enabled;

		document.getElementById("validation-password").setAttribute("display", need2fa == 0 || ask2FA == false);
		document.getElementById("validation-2fa").setAttribute("display", need2fa != 0 && ask2FA);

		if (need2fa == 0 && !askPassword) {
			callback(callbackParams)
				.then((json: JSON) => {
					resolveHandler(json)
				})
				.catch((error: Response) => {
					rejectHandler(error);
				})
			return;
		}


		document.getElementById("validation-submit").addEventListener('click', (e) => {
			if (need2fa != 0 && ask2FA) {
				callbackParams.token = document.getElementById("validation-2fa").value;
			} else {
				callbackParams.password = document.getElementById("validation-password").value;
			}
			callback(callbackParams)
				.then((json: JSON) => {
					resolveHandler(json);
				})
				.catch((error: Response) => {
					rejectHandler(error);
				})
			document.body.classList.toggle("modal-open");
			document.getElementById("validation-popup")?.setAttribute("disabled", "true");
		}, { once: true }); //OUIIIIII once true du bonheur!!!!!!


		document.body.classList.toggle("modal-open");
		document.getElementById("validation-popup")?.setAttribute("disabled", "false")
	}


	public reset() {
		meRequest("no-cache")
			.catch(() => meReject())
			.then((json) => {
				document.getElementById("enable-2fa").checked = json.userInfo.two_fa_enabled != 0;
			})
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
		if (!response.ok) {
			return Promise.reject(response);
		}

		return response.json();
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
		if (!response.ok) {
			return Promise.reject(response);
		}

		return response.json();
	}

	private async enable2faRequest(body: { password: string }) {
		const response = await fetch("https://localhost:3000/update-info/enable-2fa", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(body)
		});
		if (!response.ok) {
			return Promise.reject(response);
		}

		return response.json();
	}

	private async disable2faRequest(body: { password: string }) {
		const response = await fetch("https://localhost:3000/update-info/disable-2fa", {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(body)
		});
		if (!response.ok) {
			return Promise.reject(response);
		}

		return response.json();
	}

	private enable2faResolve(json: JSON) {
		document.getElementById("status")?.dispatchEvent(
			new CustomEvent("status", { detail: { ok: true, json: json.message } }));
		const img = document.createElement("img");
		img.src = json.qrCode;
		img.id = "2fa-qrcode";
		document.getElementById("info")?.appendChild(img);
		setTimeout(() => {
			document.getElementById("2fa-qrcode")?.remove();
		}, 10000);
		document.getElementById("enable-2fa").checked = true;
		document.getElementById("validation-2fa").value = "";
		document.getElementById("validation-password").value = "";
		document.getElementById("update-password-old").value = "";
		document.getElementById("update-password-new").value = "";
		document.getElementById("update-info-username").value = "";
		document.getElementById("update-info-avatar").value = "";
	}

	private disable2faResolve(json: JSON) {
		document.getElementById("status")?.dispatchEvent(
			new CustomEvent("status", { detail: { ok: true, json: json.message } }))
		document.getElementById("enable-2fa").checked = false;
		document.getElementById("validation-2fa").value = "";
		document.getElementById("validation-password").value = "";
		document.getElementById("update-password-old").value = "";
		document.getElementById("update-password-new").value = "";
		document.getElementById("update-info-username").value = "";
		document.getElementById("update-info-avatar").value = "";

	}

	private requestResolve(json: JSON) {
		document.getElementById("status")?.dispatchEvent(
			new CustomEvent("status", { detail: { ok: true, json: json.message } }))
		document.getElementById("validation-2fa").value = "";
		document.getElementById("validation-password").value = "";
		document.getElementById("update-password-old").value = "";
		document.getElementById("update-password-new").value = "";
		document.getElementById("update-info-username").value = "";
		document.getElementById("update-info-avatar").value = "";
	}

	private requestReject(response: Response) {
		response.json()
			.then((json) => {
				document.getElementById("status")?.dispatchEvent(
					new CustomEvent("status", { detail: { ok: false, json: json.message } }))
			})
	}
}

export default UpdateInfo;

