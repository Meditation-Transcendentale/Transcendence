import { meReject, meRequest } from "./checkMe";

class Lobby {
	private loaded: boolean = false;
	private ws: WebSocket = null;
	private lobbyId = null;

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
			const apiBase = document.getElementById("apiBase")!.value.trim();
			this.log(`➡ POST ${apiBase}/lobby/create { mode:"${document.getElementById("lobby-mod").value}", map:"${document.getElementById("lobby-map").value}" ${document.getElementById("lobby-mod").value == "pong" ? ', submode:"' + document.getElementById("lobby-submod").value + '"' : " "} }`);

			this.createRequest(apiBase)
				.then((json) => {
					this.lobbyId = json.lobbyId || json.id;
					document.getElementById("lobby-result")!.textContent = `Lobby ID: ${this.lobbyId}`;
					this.log(`✅ Lobby created: ${JSON.stringify(json)}`);
					document.getElementById("connectBtn")?.removeAttribute("disabled");
				})
				.catch((error) => {
					this.log(`❌ Create lobby error: ${error}`)
					document.getElementById("connectBtn")?.setAttribute("disabled", "");
				})
		})

		document.getElementById("connectBtn")?.addEventListener("click", async () => {
			const me = await meRequest()
				.catch(() => { meReject(); });
			const wsUrl = document.getElementById("wsUrl")!.value.trim();
			const url = `${wsUrl}?lobbyId=${encodeURIComponent(this.lobbyId)}&userId=${encodeURIComponent(me.userInfo.uuid)}`;

			this.log(`➡ WS connect ${url}`);

			this.ws = new WebSocket(url);

			this.ws.onopen = () => {
				this.log('✅ WS open');
				document.getElementById("connection-status")!.textContent = 'Connected';
				document.getElementById("connection-status")!.style.color = 'green';
				document.getElementById("connectBtn")!.disabled = true;
				document.getElementById("disconnectBtn")!.disabled = false;
				document.getElementById("joinBtn")!.disabled = false;
				document.getElementById("readyBtn")!.disabled = false;
				document.getElementById("heartbeatBtn")!.disabled = false;
			};
			this.ws.onclose = () => {
				this.log('❌ WS closed');
				document.getElementById("connection-status")!.textContent = 'Disconnected';
				document.getElementById("connection-status")!.style.color = 'gray';
				document.getElementById("connectBtn")!.disabled = false;
				document.getElementById("disconnectBtn")!.disabled = true;
				document.getElementById("joinBtn")!.disabled = true;
				document.getElementById("readyBtn")!.disabled = true;
				document.getElementById("heartbeatBtn")!.disabled = true;
			};

			this.ws.onerror = (err) => {
				this.log(`⚠ WS error: ${err}`);
			}
			this.ws.onmessage = (ev) => {
				this.log(`⬅ WS message: ${ev.data}`);
			}


		})

		document.getElementById("disconnectBtn")?.addEventListener("click", () => {
			if (this.ws) {
				this.ws.close();
				this.ws = null;
			}
		})

		window.onbeforeunload = () => {
			if (this.ws) {
				this.ws.close();
			}
		}


		document.getElementById("joinBtn")?.addEventListener("click", () => {
			this.wsSend("join");
		})

		document.getElementById("readyBtn")?.addEventListener("click", () => {
			this.wsSend("ready");
		})

		document.getElementById("heartbeatBtn")?.addEventListener("click", () => {
			this.wsSend("heartbeat");
		})



		this.loaded = true;
	}

	public reset() { }

	private log(msg: string) {
		const time = new Date().toISOString();
		document.getElementById("log")!.textContent += `[${time}] ${msg}\n`;
		document.getElementById("log")!.scrollTop = document.getElementById("log")!.scrollHeight;
	}


	private async createRequest(apiUrl: string) {
		const response = await fetch(apiUrl + "/lobby/create", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			mode: 'cors',
			body: JSON.stringify({
				"mode": document.getElementById("lobby-mod").value,
				"map": document.getElementById("lobby-map").value,
				"submode": document.getElementById("lobby-submod").value
			})
		});
		if (!response.ok) {
			const error = response.json()
				.then((json) => {
					return json.error || response.statusText;
				})
			return Promise.reject(error);
		}

		return response.json();
	}

	private async wsSend(type: string) {
		meRequest()
			.catch(() => { meReject(); })
			.then((json) => {
				const msg = { type: type, lobbyId: this.lobbyId, userId: json.userInfo.uuid };
				const str = JSON.stringify(msg);
				this.ws.send(str);
				this.log(`➡ WS send: ${str}`)

			})
	}
}

export default Lobby;
