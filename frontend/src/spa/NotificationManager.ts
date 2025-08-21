import Router from "./Router";
import { decodeNotificationMessage } from "./proto/helper";
import { notif } from "./proto/message.js";
// import { lobbyVue } from "../Vue";
import { User } from "./User";
import { getRequest } from "./requests";

class NotificationManagerC {
	private container: HTMLDivElement;
	private defaultDiv: HTMLDivElement;

	private defaultDuration = 5000; //in millisecond

	private canceled!: Array<HTMLElement>;
	private state = false;

	private ws: WebSocket | null;

	private hover = false;

	constructor() {
		this.container = document.createElement("div");
		this.container.id = "notification-container";

		this.defaultDiv = document.createElement("div");
		this.defaultDiv.className = "notification";

		this.canceled = new Array<HTMLElement>;

		this.ws = null;

		this.setupWs();

		this.container.addEventListener("mouseenter", () => {
			for (let i = 0; i < this.canceled.length; i++) {
				this.canceled[i]?.remove();
			}
			this.canceled = new Array<HTMLElement>;
			this.hover = true;
		})

		this.container.addEventListener("mouseleave", () => {
			for (let i = 0; i < this.canceled.length; i++) {
				setTimeout(() => {
					if (this.hover) {
						this.canceled.push(this.canceled[i]);
					} else {
						this.canceled[i]?.remove();
					}
				}, this.defaultDuration)
			}
			this.hover = false;
		})

	}

	public addDiv(div: HTMLDivElement) {
		div.className = "notification";
		div.style.setProperty("--duration", `${this.defaultDuration + 10}ms`)
		this.container.insertBefore(div, this.container.firstChild);
		setTimeout(() => {
			if (this.hover) {
				this.canceled.push(div);
			} else {
				div.remove();
			}
		}, this.defaultDuration)
	}

	public setEnable(state: boolean) {
		if (state && !this.state) {
			document.body.appendChild(this.container);
		} else if (!state && this.state) {
			this.container.remove();
		}
		this.state = state;
	}

	public addText(str: string) {
		const n = this.defaultDiv.cloneNode() as HTMLDivElement;
		n.innerText = str;
		n.style.setProperty("--duration", `${this.defaultDuration + 10}ms`)
		this.container.insertBefore(n, this.container.firstChild);
		setTimeout(() => {
			if (this.hover) {
				this.canceled.push(n);
			} else {
				n.remove();
			}
		}, this.defaultDuration)
	}

	private setupWs() {
		if (Router.AUTHENTIFICATION) {
			console.log ("slt", User.uuid as string);
			const url = `wss://${window.location.hostname}:7000/notifications?uuid=${encodeURIComponent(User.uuid as string)}`;

			this.ws = new WebSocket(url);

			this.ws.onopen = () => {
				console.log('Connected to notifications server')
			}

			this.ws.onmessage = (event) => {

				let newNotification: notif.NotificationMessage;
				try {
					newNotification = decodeNotificationMessage(event.data);
				} catch (err) {
					console.error ("Failed to decode NotificationMessage", err);
					return ;
				}

				if (newNotification.friendUpdate != null) {
					console.log (`FRIEND UPDATE: ${newNotification.friendUpdate.sender}`);
				}
				if (newNotification.gameInvite != null ) {
					console.log (`GAME INVITE: ${newNotification.gameInvite.sender}|${newNotification.gameInvite.lobbyid}`);
				}
				if (newNotification.statusUpdate != null) {
					console.log (`NEW STATUS: ${newNotification.statusUpdate.sender}|${newNotification.statusUpdate.option}`);
				}
			}

			this.ws.onerror = (err) => {
				console.error('WebSocket error:', err)
			}

			this.ws.onclose = () => {
				console.log('WebSocket connection closed')
			}
		}
	}

}

export const NotificationManager = new NotificationManagerC();
