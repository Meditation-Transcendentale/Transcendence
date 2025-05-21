import { deleteRequest, patchRequest, postRequest } from "./requests";
import { User } from "./User";
import { raiseStatus } from "./utils";

interface infoHtmlReference {
	username: HTMLInputElement,
	avatar: HTMLImageElement,
	edit: HTMLInputElement,
	password: HTMLInputElement,
	twofa: HTMLInputElement,
	popup: HTMLDivElement,
	popupPassword: HTMLInputElement,
	popupNewPassword: HTMLInputElement,
	popup2fa: HTMLInputElement
	popupSubmit: HTMLInputElement
};

enum popupState {
	password = 0,
	twofa = 1,
	changePass = 3,
	changePass2fa = 4
}

export default class Info {
	private div: HTMLDivElement;
	private ref: infoHtmlReference;

	constructor(div: HTMLDivElement) {
		this.div = div;

		this.ref = {
			username: div.querySelector("#info-username") as HTMLInputElement,
			avatar: div.querySelector("#info-avatar") as HTMLImageElement,
			edit: div.querySelector("#info-edit") as HTMLInputElement,
			password: div.querySelector("#update-password") as HTMLInputElement,
			twofa: div.querySelector("#update-2fa") as HTMLInputElement,
			popup: div.querySelector("#info-popup") as HTMLDivElement,
			popupPassword: div.querySelector("#info-valid-password") as HTMLInputElement,
			popupNewPassword: div.querySelector("#info-new-password") as HTMLInputElement,
			popup2fa: div.querySelector("#info-valid-2fa") as HTMLInputElement,
			popupSubmit: div.querySelector("#info-valid-submit") as HTMLInputElement,
		}

		this.ref.popup.remove();

		this.ref.username.addEventListener("change", () => { this.ref.edit.disabled = false });

		this.ref.edit.addEventListener("click", () => {
			this.setupPopup(User.twofa == 1 ? popupState.twofa : popupState.password, this.updateInfo)
		})

		this.ref.password.addEventListener("click", () => {
			this.setupPopup(User.twofa == 1 ? popupState.changePass2fa : popupState.changePass, this.updatePassword)
		})

		this.ref.twofa.addEventListener("click", () => {
			User.twofa == 1 ?
				this.setupPopup(popupState.password, this.disable2fa) :
				this.setupPopup(popupState.password, this.enable2fa)
		})
	}

	public load(params: URLSearchParams) {
		this.ref.popup.remove();
		this.ref.username.placeholder = User.username as string;
		this.ref.edit.disabled = true;
		this.ref.avatar.src = (User.avatar ? User.avatar : "default_avatr.jpg");
		this.ref.twofa.checked = (User.twofa as number) != 0;

		document.querySelector("#home-container")?.appendChild(this.div);
	}

	public async unload() {
		this.div.remove();
	}

	private async setupPopup(state: popupState, handler: any) {
		this.ref.popupPassword.remove();
		this.ref.popupNewPassword.remove();
		this.ref.popup2fa.remove();
		this.ref.popupSubmit.remove();
		this.ref.popupPassword.value = "";
		this.ref.popupNewPassword.value = "";
		this.ref.popup2fa.value = "";

		switch (state) {
			case popupState.password: {
				this.ref.popup.appendChild(this.ref.popupPassword);
				this.ref.popup.appendChild(this.ref.popupSubmit);
				break;
			}
			case popupState.twofa: {
				this.ref.popup.appendChild(this.ref.popup2fa);
				this.ref.popup.appendChild(this.ref.popupSubmit);
				break;
			}
			case popupState.changePass: {
				this.ref.popup.appendChild(this.ref.popupPassword);
				this.ref.popup.appendChild(this.ref.popupNewPassword);
				this.ref.popup.appendChild(this.ref.popupSubmit);
				break;
			}
			case popupState.changePass2fa: {
				this.ref.popup.appendChild(this.ref.popupPassword);
				this.ref.popup.appendChild(this.ref.popupNewPassword);
				this.ref.popup.appendChild(this.ref.popupSubmit);
				this.ref.popup.appendChild(this.ref.popup2fa);
				break;
			}
			default: {
				break;
			}
		}

		this.ref.popupSubmit.addEventListener("click", () => {
			this.ref.popup.remove();
			handler();
		}, { once: true })
		this.div.appendChild(this.ref.popup);
	}

	private async updateInfo() {
		patchRequest(`update-info`, {
			username: this.ref.username.value,
			avatar: "default_avatar.jpg",
			password: (User.twofa == 0 ? this.ref.popupPassword.value : ""),
			token: (User.twofa == 1 ? this.ref.popup2fa.value : "")
		})
			.then((json: any) => {
				User.username = this.ref.username.value;
				User.avatar = "default_avatar.jpg";
				this.ref.username.placeholder = User.username;
				this.ref.username.value = "";
				raiseStatus(true, json.message);

			})
			.catch((resp: Response) => {
				resp.json().then((json) => { raiseStatus(false, json.message) })
			})
	}

	private async updatePassword() {
		patchRequest('update-info/password', {
			password: this.ref.popupPassword.value,
			newPassword: this.ref.popupNewPassword.value,
			token: (User.twofa == 1 ? this.ref.popup2fa.value : "")
		})
			.then((json: any) => {
				raiseStatus(true, json.message);
			})
			.catch((resp: Response) => {
				resp.json().then((json) => raiseStatus(true, json.message));
			})
	}

	private async enable2fa() {
		postRequest('update-info/enable-2fa', { password: this.ref.popupPassword.value })
			.then((json: any) => {
				this.ref.twofa.checked = true;
				User.twofa = 1;

				//NEED TO CHANGE BUT TOO LAZY
				const img = document.createElement("img");
				img.src = json.qrCode;
				img.id = "2fa-qrcode";
				document.getElementById("info")?.appendChild(img);
				setTimeout(() => {
					document.getElementById("2fa-qrcode")?.remove();
				}, 10000);
			})
			.catch((resp: Response) => {
				resp.json().then((json) => { raiseStatus(false, json.message) })
			})
	}

	private async disable2fa() {
		deleteRequest("update-info/disable-2fa", { password: this.ref.popupPassword.value })
			.then(() => {
				this.ref.twofa.checked = false;
				User.twofa = 0;
			})
			.catch((resp: Response) => {
				resp.json().then((json) => { raiseStatus(false, json.message) });
			})
	}
}
