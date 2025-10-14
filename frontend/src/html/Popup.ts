import { stateManager } from "../state/StateManager";
import { User } from "../User";

export enum PopupType {
	accept,
	validation,
	custom
}

interface IPopupOption {
	type: PopupType,
	title?: string
	id?: string,
	text?: string,
}

interface ICustomPopupOption extends IPopupOption {
	div: HTMLElement;
}

interface IAcceptPopupOption extends IPopupOption {
	accept: () => void;
	decline: () => void;
}

interface IValidationPopupOption extends IPopupOption {
	input?: string;
	submit: (password: string, token?: string, input?: string) => void;
	abort: () => void;
}

export type PopupOption = ICustomPopupOption | IAcceptPopupOption | IValidationPopupOption;

export class Popup {
	private option: PopupOption;
	private dialog: HTMLDialogElement;
	private form: HTMLFormElement;

	private token!: HTMLInputElement;

	constructor(option: PopupOption) {
		this.option = option;
		this.dialog = document.createElement("dialog");
		this.form = document.createElement("form");
		this.form.method = "dialog";
		this.form.autocomplete = "off";
		this.dialog.appendChild(this.form);


		const h = document.createElement("input");
		h.type = "text";
		h.name = "hidden";
		h.style.display = "none";
		h.autocomplete = "nope";
		this.form.appendChild(h);

		if (option.id)
			this.dialog.id = option.id;

		if (option.title) {
			const head = document.createElement("header");
			head.textContent = option.title;
			this.form.appendChild(head);
		}

		if (option.text) {
			const span = document.createElement("span");
			span.textContent = option.text;
			this.form.appendChild(span);
		}

		switch (option.type) {
			case PopupType.accept: {
				this.generateAcceptPopup();
				break;
			}
			case PopupType.custom: {
				this.generateCustomPopup(option as ICustomPopupOption);
				break;
			}
			case PopupType.validation: {
				this.generateValidationPopup(option as IValidationPopupOption);
				break;
			}
		}

		this.dialog.addEventListener('click', ({ target: dialog }) => {
			if (dialog.nodeName === 'DIALOG') {
				this.close();
			}
		});
		this.dialog.addEventListener("close", () => { this.close() })
	}

	private generateAcceptPopup() {
		const footer = document.createElement("footer");
		this.form.appendChild(footer);

		const y = document.createElement("button");
		const n = document.createElement("button");
		y.textContent = "Accept";
		n.textContent = "Decline";

		y.addEventListener("click", () => {
			(this.option as IAcceptPopupOption).accept();
		})

		n.addEventListener("click", () => {
			(this.option as IAcceptPopupOption).decline();
		})

		footer.appendChild(y);
		footer.appendChild(n);
		this.dialog.classList.add("popup-accept");
	}

	private generateValidationPopup(option: IValidationPopupOption) {
		// const form = document.createElement("form");
		if (option.input) {
			const input = document.createElement("input");
			input.autocomplete = "new-password";
			input.required = true;
			input.name = "input";
			switch (option.input) {
				case "username": {
					input.type = "text";
					input.placeholder = "username";
					break;
				}
				case "password": {
					input.type = "password";
					input.placeholder = "new password";
					break;
				}
			}
			this.form.appendChild(input);
		}
		const password = document.createElement("input");
		password.type = "password";
		password.placeholder = "password";
		password.required = true;
		password.name = "password";
		this.form.appendChild(password);

		const token = document.createElement("input");
		token.type = "text";
		token.placeholder = "token";
		token.name = "token";
		token.required = true;
		this.form.appendChild(token);
		this.token = token;

		const submit = document.createElement("button");
		submit.type = "submit";
		submit.textContent = "Submit";
		const abort = document.createElement("button");
		abort.textContent = "Abort";

		const footer = document.createElement("footer");
		this.form.appendChild(footer);

		footer.appendChild(submit);
		footer.appendChild(abort);

		abort.addEventListener("click", () => {
			option.abort();
			this.close();
		})

		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			const data = new FormData(this.form);
			const i = data.get("input") as string;
			const p = data.get("password") as string;
			const t = data.get("token") as string;
			option.submit(p, t, i);
		})
	}

	private generateCustomPopup(option: ICustomPopupOption) {
		this.form.appendChild(option.div);
		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
		})
	}

	public show() {
		User.check()
		if (this.option.type == PopupType.validation) {
			this.token.hidden = User.twofa == 0;
			this.token.required = User.twofa != 0;
		}
		document.body.appendChild(this.dialog);
		// this.dialog.open = true;
		this.dialog.showModal();
		stateManager.popup += 1;
	}

	public close() {
		this.dialog.close();
		this.dialog.remove();
		stateManager.popup -= 1;
	}
}
