import { ABlock } from "../ABlock";
import { SimpleForm } from "../customElements/SimpleForm";
import { CustomEvents } from "../CustomEvents";
import { AuthResponse, loginRequest, registerRequest } from "../requests";
import { createContainer } from "../utils";

export class SignIn extends ABlock {
	private form!: SimpleForm;

	constructor(parent: HTMLElement) {
		super();
		this.init();

		parent.appendChild(this.container);
	}

	private init() {
		this.container = createContainer("sign-in-container", "sign-in");

		this.form = document.createElement("form", { is: "simple-form" }) as SimpleForm;
		this.form.id = "sign-in-form";
		this.form.setAttribute("class", "sign-in form");

		this.form.field1.id = "sign-in-username";
		this.form.field1.setAttribute("class", "sign-in username-input");

		this.form.field2.id = "sign-in-password";
		this.form.field2.setAttribute("class", "sign-in password-input");

		this.form.submitButton.id = "sign-in-button";
		this.form.submitButton.setAttribute("class", "sign-in button");
		this.form.submitButton.setAttribute("value", "Sign In");

		this.form.addEventListener("submit", (ev) => { this.submitHandler(ev) });

		this.container.appendChild(this.form);

		this.disable()
	}

	public reset() {
		this.form.field1.value = "";
		this.form.field2.value = "";
		this.disable();
	}


	private async submitHandler(ev: Event) {
		ev.preventDefault();

		await registerRequest(this.form.field1.value, this.form.field2.value)
			.then((response) => { this.responseHandler(response) })
			.catch((error) => {
				console.log('Error: ', error);
			})

	}


	private async responseHandler(response: AuthResponse) {
		document.getElementById("status")?.dispatchEvent(new CustomEvent("status", { detail: response }));
		console.log(response);
		if (response.ok) {
			await loginRequest(this.form.field1.value, this.form.field2.value)
				.then((response) => {
					document.getElementById("status")?.dispatchEvent(new CustomEvent("status", { detail: response }));
					console.log(response);
					if (response.ok) {
						this.success();
						return;
					}
				})
				.catch((error) => console.log("Error: ", error));
			return;
		}
		return;
	}

	private success() {
		this.reset();
		document.getElementById("ui")?.dispatchEvent(CustomEvents.auth);
	}


}
