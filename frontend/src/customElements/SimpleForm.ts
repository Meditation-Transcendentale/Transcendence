export class SimpleForm extends HTMLFormElement {

	public field1!: HTMLElement;
	public field2!: HTMLElement;
	public submitButton!: HTMLElement;

	constructor() {
		super();

		this.field1 = document.createElement("input");
		this.field1.setAttribute("type", "text");
		this.field1.setAttribute("name", "username");
		this.field1.setAttribute("placeholder", "Username");

		this.field2 = document.createElement("input");
		this.field2.setAttribute("type", "password");
		this.field2.setAttribute("name", "username");
		this.field2.setAttribute("placeholder", "Password");

		this.submitButton = document.createElement("input");
		this.submitButton.setAttribute("type", "submit");
		this.submitButton.setAttribute("name", "submit");
		this.submitButton.setAttribute("placeholder", "Send");

		this.appendChild(this.field1);
		this.appendChild(this.field2);
		this.appendChild(this.submitButton);


	}

	connectedCallback() {
		console.log("simple form connected");
	}

}
