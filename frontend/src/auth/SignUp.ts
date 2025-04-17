import { ABlock } from "../ABlock";
import { SimpleForm } from "../customElements/SimpleForm";
import { CustomEvents } from "../CustomEvents";
import { createContainer } from "../utils";

export class SignUp extends ABlock {
	private form!: SimpleForm;

	constructor(parent: HTMLElement) {
		super();
		this.init();

		parent.appendChild(this.container);
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

		this.disable();

	}

	private submitHandler(ev: Event) {
		ev.preventDefault();
		this.form.field1.value = "";
		this.form.field2.value = "";

		document.getElementById("ui")?.dispatchEvent(CustomEvents.auth);
	}
}
