import { createContainer } from "../utils";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export class Auth {
	private container!: HTMLElement;

	private signUp!: SignUp;
	private signIn!: SignIn;

	private authChoice!: HTMLElement;

	constructor(parent: HTMLElement) {
		this.init();

		parent.appendChild(this.container);
	}

	private init() {
		this.container = createContainer("auth-container", "auth");

		this.authChoice = createContainer("auth-choice-container", "auth-choice");

		const l = document.createElement("input");
		l.id = "choice-sign-up-button";
		l.type = "button";
		l.setAttribute("class", "auth-choice sign-up-button");
		l.setAttribute("value", "Sign Up");
		l.addEventListener("click", () => { this.buttonHandler(this.signUp) });

		const s = document.createElement("input");
		s.id = "choice-sign-in-button";
		s.type = "button";
		s.setAttribute("class", "auth-choice sign-in-button");
		s.setAttribute("value", "Sign In");
		s.addEventListener("click", () => { this.buttonHandler(this.signIn) });

		this.authChoice.appendChild(l);
		this.authChoice.appendChild(s);
		this.container.appendChild(this.authChoice);



		this.signUp = new SignUp(this.container);
		this.signIn = new SignIn(this.container);
	}

	private buttonHandler(button: undefined) {
		this.authChoice.setAttribute("disabled", "true");
		button.enable();
	}

	public reset() {
		this.container.setAttribute("disable", "false");
		this.signUp.disable();
		this.signIn.disable();
	}

}
