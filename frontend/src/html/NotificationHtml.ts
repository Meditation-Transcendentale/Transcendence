import { htmlManager } from "./HtmlManager";

interface INotification {
	type: NotificationType;
	duration?: string;
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

	private defaultDuration = "1s";

	constructor() {
		this.history = new Set<HTMLElement>();

		this.container = document.createElement("div");
		this.container.className = "notification-container";

		this.default = document.createElement("div");
		this.default.className = "notification";
		//Add close button


	}

	public add(notification: Notification) {
		if (!notification.duration) {
			notification.duration = this.defaultDuration;
		}
		switch (notification.type) {
			case NotificationType.friendRequest: {
				this.addFriendRequest(notification as IFriendRequest);
				break;
			}
			case NotificationType.friendAccept: {
				break;
			}
			case NotificationType.gameInvite: {
				break;
			}
			case NotificationType.statusUpdate: {
				break;
			}
			case NotificationType.text: {
				break;
			}
			case NotificationType.custom: {
				break;
			}
			case NotificationType.error: {
				break;
			}
		}
	}

	private addFriendRequest(notification: IFriendRequest) {
		const div = this.default.cloneNode(true) as HTMLDivElement;
		const label = document.createElement("label");
		const sender = document.createElement("span");

		div.classList.add("notification-click");
		label.className = "notification-text";
		sender.className = "notification-username";

		div.style.animationDuration = notification.duration as string;

		label.textContent = "Friend request from ";
		sender.textContent = notification.username;

		div.appendChild(label);
		div.appendChild(sender);

		div.addEventListener("click", () => {
			// htmlManager.popup.add({})
		})
	}

	private addFriendAccept(notification: IFriendAccept) {

	}

	private addGameInvite(notification: IGameInvite) {

	}

	private addStatusUpdate(notification: IStatusUpdate) {

	}

	private addText(notification: ITextNotification) {

	}

	private addCustom(notification: ICustomNotification) {

	}

	private addError(notification: IErrorNotification) {

	}
}
