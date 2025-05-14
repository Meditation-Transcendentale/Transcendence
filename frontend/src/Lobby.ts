import { meReject, meRequest } from "./checkMe";
import Router from "./Router";

enum eState {
	none = 0,
	connect = 1,
	join = 2,
	ready = 3
};

class Lobby {
	private loaded = false;
	private id: string | null;
	private ws: WebSocket | null;
	private state: eState;
	private uuid: string | null;
	private mod: string | null;
	private submod: string | null;
	private map: string | null;

	private gameIP = "10.19.225.59";

	constructor() {
		this.id = null;
		this.ws = null;
		this.uuid = null;
		this.state = eState.none;
	}

	public init() {
		if (this.loaded) { return };

		document.getElementById("lobby-ready")?.addEventListener("click", () => {
			this.wsSend("ready");
			this.state = eState.ready;
		});

		document.getElementById("lobby-quit")?.addEventListener("click", () => {
			this.id = null;
			this.ws?.close();
			this.ws = null;
			this.state = 0;
			Router.nav("/home/play");
		})


		this.loaded = true;
	}

	public async reset(params: URLSearchParams) {
		if (this.id && this.ws && this.id != params.get("id") as string) {
			Router.nav("/home/lobby?id=" + this.id);
			return;
		}
		if (!params.has("id")) { Router.nav("/home/play") }

		this.id = params.get("id") as string;
		if (!this.ws) {
			const json = await meRequest()
				.catch(() => meReject());
			this.uuid = json.userInfo.uuid;
			const url = `ws://${this.gameIP}:5001/lobbies?lobbyId=${encodeURIComponent(this.id)}&userId=${encodeURIComponent(this.uuid)}`;

			this.ws = new WebSocket(url);
			this.setupWs();
		}
	}

	private setupWs() {
		this.ws.onopen = () => {
			this.state = eState.connect;
			console.log("Lobby: ws connected");
			this.wsSend("join");
			this.state = eState.join;
			document.getElementById("lobby-ready")?.removeAttribute("disabled");
		}
		this.ws.onclose = () => {
			this.state = eState.none;
			this.ws = null;
			console.log("Lobby: ws closed");
		};

		this.ws.onerror = (err) => {
			console.warn("Lobby: ws error: " + err);
		}

		this.ws.onmessage = (msg) => {
			this.wsMsgCallback(msg)
		}
	}

	private wsMsgCallback(msg: {}) {
		const data = JSON.parse(msg.data);
		if (data.type == "error" && data.message == "Lobby not found") {
			this.id = null;
			this.ws?.close();
			this.ws = null;
			this.state = 0;
			Router.nav("/home/play");
			return;
		}

		if (data.type == "lobby.update") {
			this.mod = data.mode;
			this.map = data.map;
			this.submod = data.submode;
		}

		console.log(msg.data);
		if (data.type == "start" || data.status == "starting") {
			console.log("Everyone is ready");
		}
		if (data.type == "start") {
			Router.nav(encodeURI(`/game?id=${data.gameId}&mod=${this.mod}&map=${this.map}&submod=${this.submod}`));
			this.ws?.close();
		}
	}

	private async wsSend(type: string) {
		console.log("Lobby: ws send " + type);
		const msg = JSON.stringify({ type: type, lobbyId: this.id, userId: this.uuid });
		if (this.ws) { this.ws?.send(msg); }
	}

}

export default Lobby;
