import Router from "./Router";
import { PongBR } from "../pongbr/PongBR";
import { App3D } from "../3d/App";


export default class br {
	private div: HTMLDivElement;
	private pongbr: PongBR | null;

	private mod: string | null;
	private map: string | null;
	private id: string | null;

	constructor(div: HTMLDivElement) {
		this.div = div;
		App3D.setVue('test');
		this.pongbr = null;
		// PongBR.INIT();
		this.mod = null;
		this.map = null;
		this.id = null;
	}

	public unload() {
		App3D.unloadVue('test');
		document.querySelector("canvas")?.blur();
		//this.pongbr?.dispose();
		//this.div.remove();
	}

	public load(params: URLSearchParams) {
		App3D.loadVue('test');
		document.querySelector("canvas")?.focus();
		// this.pongbr?.dispose();
		this.pongbr = new PongBR(document.querySelector("#canvas"), params.get("id"), App3D.scene);
		this.pongbr.start();
	}
}

