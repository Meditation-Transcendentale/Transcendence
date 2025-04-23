import { ABlock } from "../../ABlock";
import { SimpleForm } from "../../customElements/SimpleForm";
import { CustomEvents } from "../../CustomEvents";
import { updateInfoRequest, updatePasswordRequest } from "../../requests";
import { createContainer } from "../../utils";

export class Info extends ABlock {
	private updateInfo!: SimpleForm;
	private updatePassword!: SimpleForm;
	private update2FA!: HTMLElement;


	constructor(parent: HTMLElement) {
		super(parent);

		this.init();
	}

	private init() {
		this.container = createContainer("info-container", "info");
		this.container.addEventListener("enable", () => {
			this.enable();
		})
		this.container.addEventListener("disable", () => {
			this.disable();
		})

		this.initUpdateInfo();
		this.initUpdatePassword();

		this.container.appendChild(this.updateInfo);
		this.container.appendChild(this.updatePassword);

		this.initUpdate2FA();

	}

	private initUpdateInfo() {
		this.updateInfo = document.createElement("form", { is: "simple-form" }) as SimpleForm;
		this.updateInfo.addEventListener("submit", (ev) => {
			this.updateInfoHandler(ev);
		})

		this.updateInfo.id = "update-info-form";
		this.updateInfo.setAttribute("class", "update-info form");

		this.updateInfo.field1.id = "update-info-username";
		this.updateInfo.field1.setAttribute("class", "update-info username-input");

		this.updateInfo.field2.id = "update-info-avatar";
		this.updateInfo.field2.setAttribute("type", "url");
		this.updateInfo.field2.setAttribute("class", "update-info avatar-input");
		this.updateInfo.field2.setAttribute("placeholder", "Avatar url")

		this.updateInfo.submitButton.id = "update-info-form-button";
		this.updateInfo.submitButton.setAttribute("class", "info button");
		this.updateInfo.submitButton.setAttribute("value", "Update Info");
	}

	private initUpdatePassword() {
		this.updatePassword = document.createElement("form", { is: "simple-form" }) as SimpleForm;
		this.updatePassword.addEventListener("submit", (ev) => {
			this.updatePasswordHandler(ev);
		})

		this.updatePassword.id = "update-password-form";
		this.updatePassword.setAttribute("class", "update-password form");

		this.updatePassword.field1.id = "update-password-old";
		this.updatePassword.field1.setAttribute("class", "update-password old-password-input");
		this.updatePassword.field1.setAttribute("type", "password");
		this.updatePassword.field1.setAttribute("placeholder", "Old Password")
		this.updatePassword.field1.setAttribute("autocomplete", "new-password");

		this.updatePassword.field2.id = "update-Password-avatar";
		this.updatePassword.field2.setAttribute("type", "password");
		this.updatePassword.field2.setAttribute("class", "update-password new-password-input");
		this.updatePassword.field2.setAttribute("placeholder", "New Password")
		this.updatePassword.field2.setAttribute("autocomplete", "new-password");

		this.updatePassword.submitButton.id = "update-password-form-button";
		this.updatePassword.submitButton.setAttribute("class", "password button");
		this.updatePassword.submitButton.setAttribute("value", "Update Pasword");


	}

	private initUpdate2FA() {
		this.update2FA = document.createElement("input");
		this.update2FA.setAttribute("type", "checkbox");
		if (sessionStorage.getItem("2FA") == "true") {
			this.update2FA.setAttribute("checked", "");
		}
		this.update2FA.addEventListener("click", () => {
			sessionStorage.setItem("2FA", sessionStorage.getItem("2FA") === "false");
			console.log("2FA handler")
		})
		const la = document.createElement("label");
		la.innerHTML = "Enable 2FA";
		this.container.appendChild(this.update2FA);
		this.container.appendChild(la);


	}

	private async updateInfoHandler(ev: Event) {
		ev.preventDefault();

		await updateInfoRequest(this.updateInfo.field1.value, this.updateInfo.field2.value)
			.then((response) => {
				this.updateInfo.field1.value = "";
				this.updateInfo.field2.value = "";
				document.getElementById("status")?.dispatchEvent(new CustomEvent("status", { detail: response }));
			})
			.catch((error) => console.log(error));

	}

	private async updatePasswordHandler(ev: Event) {
		ev.preventDefault();

		await updatePasswordRequest(this.updatePassword.field1.value, this.updatePassword.field2.value)
			.then((response) => {
				this.updatePassword.field1.value = "";
				this.updatePassword.field2.value = "";
				document.getElementById("status")?.dispatchEvent(new CustomEvent("status", { detail: response }));
			})
			.catch((error) => console.log(error));
	}
}
