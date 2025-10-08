import { stateManager } from "../state/StateManager";

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
	div?: HTMLElement
}

interface ICustomPopupOption extends IPopupOption {
	div: HTMLElement;
}

interface IAcceptPopupOption extends IPopupOption {
	accept: () => void;
	decline: () => void;
}

interface IValidationPopupOption extends IPopupOption {
	submit: (password: string, token: string) => void;
	abort: () => void;
}

export type PopupOption = ICustomPopupOption | IAcceptPopupOption;

export class Popup {
	private option: PopupOption;
	private dialog: HTMLDialogElement;
	private form: HTMLFormElement;

	constructor(option: PopupOption) {
		this.option = option;
		this.dialog = document.createElement("dialog");
		this.form = document.createElement("form");
		this.form.method = "dialog";
		this.dialog.appendChild(this.form);

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
	}

	private generateValidationPopup() {
	}

	private generateCustomPopup(option: ICustomPopupOption) {
		this.form.appendChild(option.div);
	}

	public show() {
		document.body.appendChild(this.dialog);
		this.dialog.showModal();
		stateManager.popup += 1;
	}

	public close() {
		// this.dialog.close();
		this.dialog.remove();
		stateManager.popup -= 1;
	}
}
