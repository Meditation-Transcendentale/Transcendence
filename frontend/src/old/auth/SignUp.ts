import { ABlock } from "../ABlock";
import { SimpleForm } from "../customElements/SimpleForm";
import { CustomEvents } from "../CustomEvents";
import { AuthResponse, loginRequest } from "../requests";
import { createContainer } from "../utils";

export class SignUp extends ABlock {
	private form!: SimpleForm;

	constructor(parent: HTMLElement) {
		super(parent);
		this.init();

	}

	private init() {
		this.container = createContainer("sign-up-container", "sign-up");

		this.form = document.createElement("form", { is: "simple-form" }) as SimpleForm;
		this.form.id = "sign-up-form";
		this.form.setAttribute("class", "sign-up form");

		this.form.field1.id = "sign-up-username";
		this.form.field1.setAttribute("class", "sign-up username-input");

		this.form.field2.id = "sign-up-password";
		this.form.field2.setAttribute("class", "sign-up password-input");

		this.form.submitButton.id = "sign-up-button";
		this.form.submitButton.setAttribute("class", "sign-up button");
		this.form.submitButton.setAttribute("value", "Sign Up");

		this.form.addEventListener("submit", (ev) => { this.submitHandler(ev) });

		this.container.appendChild(this.form);


	}

	public reset() {
		this.form.field1.value = "";
		this.form.field2.value = "";
		this.disable();
	}


	private async submitHandler(ev: Event) {
		ev.preventDefault();

		console.log(this.form.field1.value, this.form.field2.value);
		const dum = await loginRequest(this.form.field1.value, this.form.field2.value)
			.then((response) => {
				this.responseHandler(response);
			}
			)
			.catch(error => {
				console.log("ERROR: fetch login");
			});
	}

	private responseHandler(response: AuthResponse) {
		document.getElementById("status")?.dispatchEvent(new CustomEvent("status", { detail: response }));
		if (response.ok) {
			sessionStorage.setItem("username", this.form.field1.value);
			sessionStorage.setItem("2FA", "false");
			this.success();
			return;
		}

		if (response.status === 400 && response.message === "2FA token is required") {
			console.log("handle 2FA");
		}

		return;
	}

	private success() {
		this.reset();
		document.getElementById("ui")?.dispatchEvent(CustomEvents.auth);
	}
}
