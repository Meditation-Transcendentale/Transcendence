class Lobby {
	private loaded: boolean = false;

	constructor() {

	}

	public init() {
		if (this.loaded) { return };
		document.getElementById("pong-mod")?.addEventListener("click", () => {
			document.getElementById("lobby-submod")?.removeAttribute("disabled");
		})

		document.getElementById("br-mod")?.addEventListener("click", () => {
			document.getElementById("lobby-submod")?.setAttribute("disabled", "");
		})

		document.getElementById("io-mod")?.addEventListener("click", () => {
			document.getElementById("lobby-submod")?.setAttribute("disabled", "");
		})
		document.getElementById("lobby-create")?.addEventListener("click", () => {
			console.log("Create lobby: ", document.getElementById("lobby-mod").value,
				document.getElementById("lobby-mod").value == "pong" ? ` | ${document.getElementById("lobby-submod").value}` : " ");
		})
		this.loaded = true;
	}

	public reset() { }
}

export default Lobby;
