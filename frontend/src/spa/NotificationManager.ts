import Router from "./Router";
import { decodeNotificationMessage } from "./proto/helper";
import { notif } from "./proto/message.js";
// import { lobbyVue } from "../Vue";
import { User } from "./User";
import { getRequest } from "./requests";
import { Popup } from "./Popup";

class NotificationManagerC {
	private container: HTMLDivElement;
	private defaultDiv: HTMLDivElement;

	private defaultDuration = 5000; //in millisecond

	private canceled!: Array<HTMLElement>;
	private state = false;

	private css: HTMLLinkElement;

	private ws: WebSocket | null;


	private defaultFriendPopup: HTMLDivElement;
	private defaultGamePopup: HTMLDivElement;

	private hover = false;


	constructor() {
		this.container = document.createElement("div");
		this.container.id = "notification-container";

		this.defaultDiv = document.createElement("div");
		this.defaultDiv.className = "notification";

		this.defaultFriendPopup = this.createWindow('friend-request', 'FRIEND REQUEST');
		this.defaultGamePopup = this.createWindow('game-invite', 'INVITATION TO GAME');

		this.css = document.createElement('link');
		this.css.rel = 'stylesheet';
		this.css.type = 'text/css';
		this.css.href = '/css/style.css';

		this.canceled = new Array<HTMLElement>;

		this.ws = null;

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

	public setupWs() {
		if (Router.AUTHENTIFICATION) {
			const url = `wss://${window.location.hostname}:7000/notifications?uuid=${encodeURIComponent(User.uuid as string)}`;

			this.ws = new WebSocket(url);

			this.ws.binaryType = "arraybuffer";
			this.ws.onopen = () => {
				console.log('Connected to notifications server')
			}

			this.ws.onmessage = (event) => {

				let newNotification: notif.NotificationMessage;
				try {
					newNotification = decodeNotificationMessage(new Uint8Array(event.data));
				} catch (err) {
					console.error("Failed to decode NotificationMessage", err);
					return;
				}

				if (newNotification.friendRequest != null) {
					const n = this.defaultDiv.cloneNode(true) as HTMLDivElement;
					const p = this.defaultFriendPopup.cloneNode(true) as HTMLDivElement;
					const popSpan = document.createElement('span');
					getRequest(`info/uuid/${newNotification.friendRequest.sender}`)
						.then((json) => {
							n.innerText = `Friend Request: ${(json as any).username}`;
							popSpan.innerText = `${(json as any).username} wants to be friend with you.`;
						});
					p.appendChild(popSpan);
					n.addEventListener("click", () => {
						Popup.addPopup(p);
					})
					NotificationManager.addDiv(n);
				}
				if (newNotification.friendAccept != null) {
					console.log(`FRIEND ACCEPT: ${newNotification.friendAccept.sender}`);
				}
				if (newNotification.gameInvite != null) {
					console.log(`GAME INVITE: ${newNotification.gameInvite.sender}|${newNotification.gameInvite.lobbyid}`);
				}
				if (newNotification.statusUpdate != null) {
					console.log(`NEW STATUS: ${newNotification.statusUpdate.sender}|${newNotification.statusUpdate.status}|${newNotification.statusUpdate?.option}`);
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

	private createWindow(id: string, title: string): HTMLDivElement {
		const windowDiv: HTMLDivElement = document.createElement('div');
		windowDiv.id = id;
		windowDiv.className = 'window';

		const windowBar: HTMLDivElement = document.createElement('div');
		windowBar.className = 'window-bar';
		windowBar.textContent = title;

		const windowContent = document.createElement('div');
		windowContent.className = 'window-content';

		const yesBtn = document.createElement('input');
		yesBtn.id = `${id}-yes`;
		yesBtn.type = 'button';
		yesBtn.value = 'ACCEPT';

		const noBtn: HTMLInputElement = document.createElement('input');
		noBtn.id = `${id}-no`;
		noBtn.type = 'button';
		noBtn.value = 'DECLINE';

		windowContent.appendChild(yesBtn);
		windowContent.appendChild(noBtn);
		windowDiv.appendChild(windowBar);
		windowDiv.appendChild(windowContent);

		return windowDiv;
	}
}

export const NotificationManager = new NotificationManagerC();