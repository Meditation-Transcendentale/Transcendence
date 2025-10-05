
export enum PopupType {
	custom
}


interface IPopupOption {
	id?: string,
	type: PopupType
}

interface ICustomPopupOption extends IPopupOption {
	div: HTMLElement;
}

export type PopupOption = ICustomPopupOption;

export namespace Popup {

	export function add(option: PopupOption): PopupElement {
		const dialog = document.createElement("dialog");
		switch (option.type) {
			case PopupType.custom: {
				dialog.appendChild(option.div);
				break;
			}
		}
		return new PopupElement(option.div);
	}
}

export class PopupElement {
	// private dialog: HTMLDialogElement;
	private container: HTMLDivElement;

	constructor(div: HTMLDialogElement) {
		this.container = document.createElement("div");
		// this.container.style.opacity = "1";
		this.container.style.width = "100%";
		this.container.style.height = "100%";
		this.container.style.pointerEvents = "all";
		this.container.style.zIndex = "10";

		// this.dialog = div;
		// this.dialog.className = "popup";
		// this.dialog.style.display = "block";
		// this.dialog.style.top = "50%";
		// this.dialog.style.opacity = "1";

		this.container.appendChild(div);
		div.style.zIndex = "11";

		this.container.addEventListener("click", () => {
			this.remove();
		})
	}

	public show() {
		document.body.appendChild(this.container);
		// this.dialog.open = true;
		// this.dialog.focus();
	}

	public remove() {
		this.container.remove();
	}
}
