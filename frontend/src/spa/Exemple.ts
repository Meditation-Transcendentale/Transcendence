import { Matrix } from "../babyImport";
import { App3D } from "../3d/App";
import { NotifiactionManager } from "./NotifiactionManager";
import { Popup } from "./Popup";

interface exempleHtmlReference {
	exempleDiv: { html: HTMLDivElement, id: number };
	popupDiv: HTMLDivElement;
	notifDiv: HTMLDivElement;
	exemple: HTMLInputElement,
	popup: HTMLInputElement,
	notif: HTMLInputElement
}

export default class Exemple {
	private div: HTMLDivElement;
	private ref: exempleHtmlReference;
	private css: HTMLLinkElement;

	private state: boolean;

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.css = div.querySelector("link") as HTMLLinkElement;

		this.state = true;

		this.ref = {
			exempleDiv: { html: div.querySelector("#exemple-exemple") as HTMLDivElement, id: -1 },
			popupDiv: div.querySelector("#exemple-popup") as HTMLDivElement,
			notifDiv: div.querySelector("#exemple-notif") as HTMLDivElement,
			exemple: div.querySelector("#exemple-exemple-input") as HTMLInputElement,
			popup: div.querySelector("#exemple-popup-input") as HTMLInputElement,
			notif: div.querySelector("#exemple-notif-input") as HTMLInputElement,
		}

		this.ref.exempleDiv.id = App3D.addCSS3dObject({
			html: this.ref.exempleDiv.html,
			width: 1.9,
			height: 1.9,
			world: Matrix.RotationY(Math.PI * 0.5).multiply(Matrix.Translation(15, 2, 8)),
			enable: false
		})

		this.ref.exemple.addEventListener("click", () => {
			const n = this.ref.notifDiv.cloneNode(true) as HTMLDivElement;
			n.addEventListener("click", () => {
				Popup.addPopup(this.ref.popupDiv);
			})
			NotifiactionManager.addDiv(n);
		})

		//this.ref.notif.addEventListener("click", () => {
		//	Popup.addPopup(this.ref.popupDiv);
		//})

		this.ref.popup.addEventListener("click", () => {
			NotifiactionManager.addText("ouai, ca va?");
			this.state = !this.state;
			//Popup.removePopup();
			App3D.setVue((this.state ? "exemple1" : "exemple2"));
		})
	}

	public load(param: URLSearchParams) {
		document.head.appendChild(this.css);
		App3D.setVue((this.state ? "exemple1" : "exemple2"));
		App3D.setCSS3dObjectEnable(this.ref.exempleDiv.id, true);
	}

	public unload() {
		App3D.setCSS3dObjectEnable(this.ref.exempleDiv.id, false);
		this.css.remove();
	}
}
