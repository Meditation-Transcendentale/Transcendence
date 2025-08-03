class CPopup {
	private container: HTMLDivElement;
	private blur: HTMLDivElement;
	private popup!: HTMLElement;

	private popups: Array<HTMLElement>

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
}

export const Popup = new CPopup();
