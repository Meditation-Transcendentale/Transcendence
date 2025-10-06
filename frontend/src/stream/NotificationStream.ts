import { IStream } from "./IStream";
import { decodeNotificationMessage } from "../networking/helper";
import { notif } from "../networking/message";
import { User } from "../User";
import { postRequest } from "../networking/request";
import { htmlManager } from "../html/HtmlManager";

export class NotificationStream implements IStream {
	public ws: WebSocket | null;
	public connected: boolean;

	private path = `wss://${window.location.hostname}:7000/notifications?uuid=`;

	constructor() {
		this.ws = null;
		this.connected = false;
	}

	public connect(): void {
		if (this.connected)
			return;
		const url = `${this.path}${encodeURIComponent(User.uuid as string)}`;
		this.ws = new WebSocket(url);
		this.ws.binaryType = "arraybuffer";
		this.ws.onopen = () => {
			console.log('Connected to notifications server')
		}
		this.ws.onerror = (err) => {
			console.error('WebSocket error:', err)
		}
		this.ws.onclose = () => {
			console.log('WebSocket connection closed')
		}
		this.ws.onmessage = this.onMessage;
		this.connected = true;
	}

	public disconnect(): void {
		this.ws?.close();
		this.connected = false;
	}

	private onMessage(event: MessageEvent) {
		let newNotification: notif.NotificationMessage;
		try {
			newNotification = decodeNotificationMessage(new Uint8Array(event.data));
		} catch (err) {
			console.error("Failed to decode NotificationMessage", err);
			return;
		}
		console.log("notification: ", newNotification);

		if (newNotification.friendRequest != null) {
			this.onFriendRequest(newNotification.friendRequest);
		}
		if (newNotification.friendAccept != null) {
			this.onFriendAccept(newNotification.friendAccept);

		}
		if (newNotification.gameInvite != null) {
			this.onGameInvite(newNotification.gameInvite);
		}
		if (newNotification.statusUpdate != null) {
			this.onUpdateStatus(newNotification.statusUpdate);
		}
	}

	private onFriendRequest(notification: notif.IFriendUpdate) {
		postRequest("info/search", { identifier: notification.sender, type: "uuid" }) //data.username
			.then((json: any) => {
				// htmlManager.addNotification({type: "friend-request", uuid: notification.sender, username: json.data.username})
				// User.addFriendRequest(notification.sender, json.data.username);
			})
			.catch((err) => {
				console.error(err);
			})
	}

	private onFriendAccept(notification: notif.IFriendUpdate) {
		postRequest("info/search", { identifier: notification.sender, type: "uuid" }) //data.username
			.then((json: any) => {
				// htmlManager.addNotification({type: "friend-accept", uuid: notification.sender, username: json.data.username});
				// User.updateFriendlist();
			})
			.catch((err) => {
				console.error(err);
			})
	}

	private onGameInvite(notification: notif.IGameInvite) {
		postRequest("info/search", { identifier: notification.sender, type: "uuid" }) //data.username
			.then((json: any) => {
				// htmlManager.addNotification({type: "game-invite", uuid: notification.sender, username: json.data.username, lobbyId: notification.lobbyid});
			})
			.catch((err) => {
				console.error(err);
			})
	}

	private onUpdateStatus(notification: notif.IStatusUpdate) {
		// User.updateFriendStatus(notification.sender, notification.status);
	}
}
