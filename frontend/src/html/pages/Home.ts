import { IPage } from "./IPages";

class Home implements IPage {
	public loaded: boolean;
	private div: HTMLElement;

	constructor(div: HTMLElement) {
		this.div = div;
		this.loaded = false;
	}

	public load() {
		console.log("loaded home");
	}

	public unload() { }
}

export default Home;
