import { routeManager } from "../route/RouteManager";
import { stateManager } from "../state/StateManager";
import { htmlManager } from "./HtmlManager";
import { Popup, PopupType } from "./Popup";

interface INotification {
	type: NotificationType;
	/*
	* duration in ms 
	*/
	duration?: number;
	history?: boolean;
}

interface IFriendRequest extends INotification {
	uuid: string,
	username: string,
}

interface IFriendAccept extends INotification {
	uuid: string,
	username: string
}

interface IGameInvite extends INotification {
	uuid: string,
	username: string,
	lobbyId: string
}

interface IStatusUpdate extends INotification {
	uuid: string,
	username: string,
	status: string
}

interface ITextNotification extends INotification {
	text: string
}

interface ICustomNotification extends INotification {
	div: HTMLElement
}

interface IErrorNotification extends INotification {
	error: string
}

export enum NotificationType {
	friendRequest,
	friendAccept,
	gameInvite,
	statusUpdate,
	text,
	custom,
	error
};

type Notification = IFriendAccept | IFriendRequest | IGameInvite | IStatusUpdate | ITextNotification | ICustomNotification | IErrorNotification;

export class NotificationHtml {
	private history: Set<HTMLElement>;
	private container: HTMLDivElement;
	private default: HTMLDivElement;

	private defaultDuration = 3000;

	constructor() {
		this.history = new Set<HTMLElement>();

		this.container = document.createElement("div");
		this.container.className = "notification-container";
		document.body.appendChild(this.container);

		this.default = document.createElement("div");
		this.default.className = "notification";
		//Add close button
	}

	public load() {
		document.body.appendChild(this.container);
	}

	public add(notification: Notification) {
		if (!notification.duration)
			notification.duration = this.defaultDuration;
		if (!notification.history)
			notification.history = false;
		switch (notification.type) {
			case NotificationType.friendRequest: {
				this.addFriendRequest(notification as IFriendRequest);
				break;
			}
			case NotificationType.text: {
				this.addText(notification as ITextNotification);
				break;
			}
			case NotificationType.gameInvite: {
				this.addGameInvite(notification as IGameInvite);
				break;
			}
			case NotificationType.error: {
				this.addError(notification as IErrorNotification)
				break;
			}
			case NotificationType.custom: {
				break;
			}
		}
	}

	private addFriendRequest(option: IFriendRequest) {
		const div = this.default.cloneNode(true) as HTMLDivElement;
		const label = document.createElement("label");
		const sender = document.createElement("span");

		div.classList.add("notification-click");
		label.className = "notification-text";
		sender.className = "notification-username";

		div.style.animationDuration = `${option.duration}ms`;

		label.textContent = "Friend request from ";
		sender.textContent = option.username;

		div.appendChild(label);
		div.appendChild(sender);

		div.addEventListener("click", () => {
			const p = new Popup({
				type: PopupType.accept,
				title: "New Frien Request",
				text: `you received a friend request from ${option.username}`,
				accept: () => {
					console.log("friend request accept");
				},
				decline: () => {
					console.log("friend request decline");
				}
			})
			p.show();
		})

		this.container.prepend(div);
		if (option.history) {
			this.history.add(div);
		}
		setTimeout(() => { div.remove() }, option.duration);
	}

	private addText(option: ITextNotification) {
		const div = this.default.cloneNode(true) as HTMLDivElement;
		const label = document.createElement("span");

		label.className = "notification-text";

		div.style.animationDuration = `${option.duration}ms`;

		label.textContent = option.text;

		div.appendChild(label);

		this.container.prepend(div);
		if (option.history) {
			this.history.add(div);
		}
		setTimeout(() => { div.remove() }, option.duration);

	}

	private addGameInvite(option: IGameInvite) {
		const div = this.default.cloneNode(true) as HTMLDivElement;
		const label = document.createElement("label");
		const sender = document.createElement("span");

		div.classList.add("notification-click");
		label.className = "notification-text";
		sender.className = "notification-username";

		div.style.animationDuration = `${option.duration}ms`;

		label.textContent = "invited you to a lobby";
		sender.textContent = option.username;

		div.appendChild(sender);
		div.appendChild(label);

		div.addEventListener("click", () => {
			const p = new Popup({
				type: PopupType.accept,
				title: "Invitation",
				text: `${option.username} invited you to join his lobby`,
				accept: () => {
					stateManager.lobbyId = option.lobbyId;
					routeManager.nav("/lobby");
				},
				decline: () => {
				}
			})
			p.show();
		})

		this.container.prepend(div);
		if (option.history) {
			this.history.add(div);
		}
		setTimeout(() => { div.remove() }, option.duration);

	}

	private addError(option: IErrorNotification) {
		const div = this.default.cloneNode(true) as HTMLDivElement;
		const label = document.createElement("span");

		// label.className = "notification-text";
		div.classList.add("notification-error");

		div.style.animationDuration = `${option.duration}ms`;

		label.textContent = option.error;

		div.appendChild(label);

		this.container.prepend(div);
		if (option.history) {
			this.history.add(div);
		}
		setTimeout(() => { div.remove() }, option.duration);

	}



	private addFriendAccept(notification: IFriendAccept) {

	}


	private addStatusUpdate(notification: IStatusUpdate) {

	}



	private addCustom(notification: ICustomNotification) {

	}

}
