import { ABlock } from "../ABlock";
import { SimpleForm } from "../customElements/SimpleForm";
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

	private submitHandler(ev: Event) {
		ev.preventDefault();
		this.form.field1.value = "";
		this.form.field2.value = "";

		alert("Sign In");
	}
}
