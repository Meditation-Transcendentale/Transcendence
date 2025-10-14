import { avatarRequest, deleteRequest, patchRequest, postRequest } from "../networking/request";
import { User } from "../User";
import { htmlManager } from "./HtmlManager";
import { Popup, PopupType } from "./Popup";

export class Settings {

	private settingsPopup: Popup;
	private changeUsernamePopup!: Popup;
	private changePasswordPopup!: Popup;
	private changeAvatarPopup!: Popup;
	private updateTwoFAPopup!: Popup;
	private twoFAQrCodePopup!: Popup;

	private toggle2FABtn: HTMLButtonElement;
	private qrCodeSrc: string = "";
	private twoFAEnabled: boolean = false;

	constructor() {


		this.toggle2FABtn = document.createElement("button");
		this.toggle2FABtn.id = "toggle-2fa-btn";

		this.settingsPopup = new Popup({
			type: PopupType.custom,
			title: "Settings",
			id: "settings-popup",
			text: "",
			div: this.createSettingsDiv()
		});


		this.changeUsernamePopup = new Popup({
			type: PopupType.validation,
			title: "Change Username",
			id: "change-username-popup",
			input: "username",
			submit: (password: string, token?: string, input?: string) => {
				patchRequest("update-info/username", { username: input, password: password, token: token })
					.then(async (json) => {
						await User.check(),
							htmlManager.ath.updateProfileInfo(),
							this.changeUsernamePopup.close()
					})
					.catch((err) => { })
			},
			abort: () => {
			}
		});

		this.changePasswordPopup = new Popup({
			type: PopupType.validation,
			title: "Change Password",
			id: "change-password-popup",
			input: "password",
			submit: (password: string, token?: string, input?: string) => {
				patchRequest("update-info/password", { newPassword: input, password: password, token: token })
					.then(async (json) => {
						await User.check(),
							this.changePasswordPopup.close()
					})
					.catch((err) => { })
			},
			abort: () => {
			}
		});

		this.changeAvatarPopup = new Popup({
			type: PopupType.custom,
			title: "Change Avatar",
			id: "change-avatar-popup",
			div: this.createAvatarDiv()
		});

		this.updateTwoFAPopup = new Popup({
			type: PopupType.validation,
			title: "Update 2FA",
			id: "update-2fa-popup",
			submit: (password: string, token?: string, input?: string) => {
				this.handle2FAToggle(password, token);
			},
			abort: () => {
			}
		});
	}

	private createAvatarDiv(): HTMLDivElement {
		const div = document.createElement("div");
		div.id = "change-avatar-div";
		div.style.display = "flex";
		div.style.flexDirection = "column";
		div.style.gap = "10px";

		const fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.accept = "image/*";

		const previewImg = document.createElement("img");
		previewImg.id = "avatar-preview-img";

		fileInput.addEventListener("change", () => {
			const file = fileInput.files ? fileInput.files[0] : null;

			const url = file ? URL.createObjectURL(file) : "/cdn/default_avatar.jpg";
			previewImg.src = url;

			div.appendChild(previewImg);
		});

		const uploadBtn = document.createElement("button");
		uploadBtn.textContent = "Upload";

		uploadBtn.addEventListener("click", () => {
			const file = fileInput.files ? fileInput.files[0] : null;
			if (file) {
				const formData = new FormData();
				formData.append("avatar", file);

				avatarRequest("update-info/avatar", formData)
					.then(async (json) => {
						await User.check();
						htmlManager.ath.updateProfileInfo();
						this.changeAvatarPopup.close();
					})
					.catch((err) => { })
			}
		});

		div.appendChild(fileInput);
		div.appendChild(uploadBtn);

		return div;
	}

	private handle2FAToggle(password: string, token?: string) {

		if (this.twoFAEnabled) {
			deleteRequest("update-info/disable-2fa", { password, token })
				.then(async (json: any) => {
					this.toggle2FABtn.textContent = "Enable 2FA",
						await User.check(),
						this.updateTwoFAPopup.close(),
						this.settingsPopup.close(),
						this.twoFAEnabled = User.twofa === 1;
				})
				.catch((err: any) => { err.json() })

		} else {
			postRequest("update-info/enable-2fa", { password })
				.then(async (json: any) => {
					this.qrCodeSrc = json.qrCode,
						this.twoFAQrCodePopup = new Popup({
							type: PopupType.custom,
							title: "Scan this QR code with your authenticator app.",
							div: this.createQrCodeDiv()
						});
					this.twoFAQrCodePopup.show(),
						await User.check(),
						this.toggle2FABtn.textContent = "Disable 2FA",
						this.updateTwoFAPopup.close(),
						this.settingsPopup.close(),
						this.twoFAEnabled = User.twofa === 1;
				})
				.catch((err: any) => { err.json() })
		}

	}

	private createQrCodeDiv(): HTMLDivElement {
		const div = document.createElement("div");
		div.style.display = "flex";
		div.style.flexDirection = "column";
		div.style.alignItems = "center";
		div.style.gap = "10px";

		const img = document.createElement("img");
		img.src = this.qrCodeSrc;
		img.alt = "2FA QR Code";
		img.style.width = "150px";
		img.style.height = "150px";

		div.appendChild(img);

		return div;
	}

	private update2FAButton() {
		if (this.twoFAEnabled)
			this.toggle2FABtn.textContent = "Disable 2FA";
		else
			this.toggle2FABtn.textContent = "Enable 2FA";
	}

	private createSettingsDiv(): HTMLDivElement {
		const div = document.createElement("div");
		div.id = "settings-div";
		// div.style.display = "flex";
		// div.style.flexDirection = "column";
		// div.style.gap = "10px";

		const changeUsernameBtn = document.createElement("button");
		changeUsernameBtn.id = "change-username-btn";
		changeUsernameBtn.textContent = "Change Username";

		const changePasswordBtn = document.createElement("button");
		changePasswordBtn.id = "change-password-btn";
		changePasswordBtn.textContent = "Change Password";

		const changeAvatarBtn = document.createElement("button");
		changeAvatarBtn.id = "change-avatar-btn";
		changeAvatarBtn.textContent = "Change Avatar";

		changeUsernameBtn.addEventListener("click", () => {
			this.changeUsernamePopup.show();
		});

		changePasswordBtn.addEventListener("click", () => {
			this.changePasswordPopup.show();
		});

		changeAvatarBtn.addEventListener("click", () => {
			this.changeAvatarPopup.show();
		});

		this.toggle2FABtn.addEventListener("click", () => {
			this.updateTwoFAPopup.show();
		});

		div.appendChild(changeUsernameBtn);
		div.appendChild(changePasswordBtn);
		div.appendChild(changeAvatarBtn);
		div.appendChild(this.toggle2FABtn);

		return div;
	}

	public load() {
		this.twoFAEnabled = User.twofa === 1;
		this.update2FAButton();
		this.settingsPopup.show();

	}

	public unload() {
		this.settingsPopup.close();
	}
}
