import { App3D } from "../3d/App";

export default class Test {
	private div: HTMLDivElement;

	constructor(div: HTMLDivElement) {
		this.div = div;
		App3D.setVue('test');
	}

	public load(params: URLSearchParams) {
		App3D.loadVue('test');
		//document.querySelector("#main-container")?.appendChild(this.div);
	}

	public unload() {
		App3D.unloadVue('test');
		//this.div.remove();
	}
}
