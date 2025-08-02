class CPopup {
	private container: HTMLDivElement;
	private blur: HTMLDivElement;
	private popup!: HTMLElement;

	constructor() {
		this.container = document.createElement("div");
		this.blur = document.createElement("div");
		this.blur.className = "blur-popup";

		this.container.appendChild(this.blur);

		this.blur.addEventListener("click", () => {
			this.removePopup();
		})
	}

	public addPopup(popup: HTMLElement) {
		this.popup?.remove();
		this.popup = popup;
		this.popup.style.zIndex = "11";
		this.container.appendChild(popup);
		document.body.appendChild(this.container);
	}

	public removePopup() {
		this.container.remove();
		this.popup?.remove();
	}
}

export const Popup = new CPopup();
