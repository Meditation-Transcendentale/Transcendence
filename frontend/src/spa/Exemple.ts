import { Matrix } from "../babyImport";
import { App3D } from "../3d/App";

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

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.css = div.querySelector("link") as HTMLLinkElement;

		this.ref = {
			exempleDiv: { html: div.querySelector("#exemple-exemple") as HTMLDivElement, id: -1 },
			popupDiv: div.querySelector("#exemple-popup") as HTMLDivElement,
			notifDiv: div.querySelector("#exemple-notif") as HTMLDivElement,
			exemple: div.querySelector("#exemple-exemple-input") as HTMLInputElement,
			popup: div.querySelector("#exemple-popup-input") as HTMLInputElement,
			notif: div.querySelector("#exemple-notif-input") as HTMLInputElement,
		}

		this.ref.input.id = App3D.addCSS3dObject({
			html: this.ref.input.html,
			width: 1,
			height: 1,
			world: Matrix.RotationY(Math.PI * 0.5).multiply(Matrix.Translation(15, 2, 8)),
			enable: false
		})




	}
}
