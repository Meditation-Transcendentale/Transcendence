
interface playHtmlReference {
	mod: HTMLSelectElement;
	map: HTMLSelectElement;
	submod: HTMLSelectElement;
	create: HTMLInputElement;
	joinID: HTMLInputElement;
	join: HTMLInputElement;
	refresh: HTMLInputElement;
	list: HTMLDivElement;
};

export default class Play {
	private div: HTMLDivElement;
	private ref: playHtmlReference;

	private gameIP = "10.19.255.59";
	constructor(div: HTMLDivElement) {
		this.div = div;

		this.ref = {
			mod: div.querySelector("#play-mod") as HTMLSelectElement,
			map: div.querySelector("#play-map") as HTMLSelectElement,
			submod: div.querySelector("#play-submod") as HTMLSelectElement,
			create: div.querySelector("#create-btn") as HTMLInputElement,
			joinID: div.querySelector("#join-id") as HTMLInputElement,
			join: div.querySelector("#join-btn") as HTMLInputElement,
			refresh: div.querySelector("#play-refresh") as HTMLInputElement,
			list: div.querySelector("#play-list") as HTMLDivElement
		}

		this.ref.mod.addEventListener("change", () => {
			if (this.ref.mod.value == "pong") {
				this.ref.submod.removeAttribute("disabled");
			} else {
				this.ref.submod.setAttribute("disabled", "");
			}
		});

		this.ref.joinID.addEventListener('input', () => {
			this.ref.join.disabled = false;
		})

		this.ref.create.addEventListener("click", () => {
			console.log(`create lobby: mod=${this.ref.mod.value == "pong" ? this.ref.submod.value : this.ref.mod.value}, map=${this.ref.map.value}`);
		})

		this.ref.join.addEventListener("click", () => {
			console.log(`join lobby: id=${this.ref.joinID.value}`);
		})

		this.ref.refresh.addEventListener("click", () => {
			console.log("refresh lobby list")
		})
	}

	public load(params: URLSearchParams) {
		this.ref.join.disabled = true;
		document.querySelector("#home-container")?.appendChild(this.div);
	}

	public async unload() {
		this.div.remove();
	}
}

