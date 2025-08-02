import { Popup } from "./Popup";
import { postRequest } from "./requests";
import { User } from "./User";

interface athHtmlReference {
	menu: HTMLDivElement,
	settingBtn: HTMLInputElement,
	quitBtn: HTMLInputElement,
	setting: HTMLDivElement,
	quitWindow: HTMLDivElement,
	quitY: HTMLInputElement,
	quitN: HTMLInputElement
}

class Ath {
	private div: HTMLDivElement;
	private ref: athHtmlReference;
	private css: HTMLElement;

	private loaded = false;

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.ref = {
			menu: div.querySelector("#menu") as HTMLDivElement,
			settingBtn: div.querySelector("#setting-btn") as HTMLInputElement,
			quitBtn: div.querySelector("#quit-btn") as HTMLInputElement,
			setting: div.querySelector("#setting-container") as HTMLDivElement,
			quitWindow: div.querySelector("#quit-window") as HTMLDivElement,
			quitY: div.querySelector("#quit-yes") as HTMLInputElement,
			quitN: div.querySelector("#quit-no") as HTMLInputElement
		}
		this.css = div.querySelector("link") as HTMLElement;

		this.ref.settingBtn.addEventListener('click', () => {
			Popup.addPopup(this.ref.setting);
		})

		this.ref.quitBtn.addEventListener("click", () => {
			Popup.addPopup(this.ref.quitWindow);
		})

		this.ref.quitY.addEventListener("click", () => {
			postRequest("auth/logout", {})
				.then(() => { window.location.reload() })
				.catch(() => { window.location.reload() })
		})

		this.ref.quitN.addEventListener("click", () => {
			Popup.removePopup();
		})

		console.log("USER", User);
	}

	public load(params: URLSearchParams) {
		if (this.loaded) { return; }
		document.head.appendChild(this.css);
		document.body.appendChild(this.ref.menu);
		this.loaded = true;
	}

	public async unload() {
		this.ref.menu.remove();
		this.loaded = false;
	}
}

export default Ath;
