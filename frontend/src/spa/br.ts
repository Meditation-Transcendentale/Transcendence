import Router from "./Router";
import { PongBR } from "../pongbr/PongBR";


export default class br {
	private div: HTMLDivElement;
	private pongbr: PongBR | null;

	private mod: string | null;
	private map: string | null;
	private id: string | null;

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.pongbr = null;
		// PongBR.INIT();
		this.mod = null;
		this.map = null;
		this.id = null;
	}

	public load(params: URLSearchParams) {
		// this.pongbr?.dispose();
		this.pongbr = new PongBR(document.querySelector("#canvas"), params.get("id"));
		this.pongbr.start();
	}
}

