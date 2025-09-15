interface validationHtmlReference {
	div: HTMLDivElement,
	password: HTMLInputElement,
	token: HTMLInputElement,
	submit: HTMLInputElement,
	exit: HTMLInputElement
}

class CPopup {
	private container: HTMLDivElement;
	private blur: HTMLDivElement;
	private popup!: HTMLElement;

	private popups: Array<HTMLElement>

	private validationRef!: validationHtmlReference;
	private validationCallback: any;

	private zindex: number;

	constructor() {
		this.container = document.createElement("div");
		this.blur = document.createElement("div");
		this.blur.className = "blur-popup";

		this.container.appendChild(this.blur);

		this.blur.addEventListener("click", () => {
			this.removePopup();
		})

		this.popups = new Array<HTMLElement>;

		this.zindex = 11;
		this.createValidationWindow();
	}

	public addPopup(popup: HTMLElement) {
		this.popup = popup;
		this.popup.style.zIndex = `${this.zindex}`;
		this.popups.push(popup);
		this.zindex++;
		this.container.appendChild(popup);
		document.body.appendChild(this.container);
	}

	public removePopup() {
		this.container.remove();
		// this.popup?.remove();
		for (let i = 0; i < this.popups.length; i++) {
			this.popups[i].remove();
		}
		this.zindex = 11;
		this.popups = new Array<HTMLElement>;
	}

	public addValidation(password: boolean, token: boolean, callback: any) {
		this.validationRef.token.remove();
		this.validationRef.password.remove();
		this.validationRef.submit.remove();
		this.validationRef.exit.remove();
		if (password) {
			this.validationRef.div.appendChild(this.validationRef.password);
		}
		if (token) {
			this.validationRef.div.appendChild(this.validationRef.token);
		}
		this.validationRef.div.appendChild(this.validationRef.submit);
		this.validationRef.div.appendChild(this.validationRef.exit);
		this.validationCallback = callback;

		this.validationRef.password.value = "";
		this.validationRef.token.value = "";

		this.addPopup(this.validationRef.div);
	}

	private removeValidation() {
		this.validationRef.div.remove();
	}

	private createValidationWindow() {
		this.validationRef = {
			div: document.createElement("div"),
			password: document.createElement("input"),
			token: document.createElement("input"),
			submit: document.createElement("input"),
			exit: document.createElement("input")
		}

		this.validationRef.div.className = "window popup-window";
		this.validationRef.password.type = "password";
		this.validationRef.password.placeholder = "password";
		this.validationRef.token.type = "text";
		this.validationRef.token.placeholder = "token";
		this.validationRef.submit.type = "button";
		this.validationRef.submit.value = "Submit";
		this.validationRef.exit.type = "button";
		this.validationRef.exit.value = "Exit";


		this.validationRef.div.id = "validation-window";
		const b = document.createElement("div");
		b.className = "window-bar";
		b.innerText = "VALIDATION";
		this.validationRef.div.appendChild(b);
		this.validationRef.password.className = "validation-input";
		this.validationRef.token.className = "validation-input";
		this.validationRef.submit.className = "validation-submit";
		this.validationRef.exit.className = "validation-exit";

		this.validationRef.submit.addEventListener("click", () => {
			if (this.validationCallback(this.validationRef.password.value, this.validationRef.token.value)) {
				this.removeValidation();
			}
		})

		this.validationRef.exit.addEventListener('click', () => {
			this.removeValidation()
		})

	}
}

export const Popup = new CPopup();
