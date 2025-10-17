import { htmlManager } from "./html/HtmlManager";
import { NotificationType } from "./html/NotificationHtml";
import { getRequest, ISearchRequestResponce, postRequest } from "./networking/request";
import { streamManager } from "./stream/StreamManager";

interface IFriend {
	username: string,
	status: string
}

class UserC {
	public username!: string;
	public uuid!: string;
	public status!: string;
	public avatar!: string;
	public twofa!: number;

	public friendsBusy: Set<string>;
	public friendsOnline: Set<string>;
	public friendsAway: Set<string>;

	private _once = true;

	public external: boolean;

	constructor() {
		console.log("%c USER", "color: white; background-color: red");
		this.friendsOnline = new Set<string>;
		this.friendsAway = new Set<string>;
		this.friendsBusy = new Set<string>;
		this.twofa = 0;
		this.external = false;
	}

	public check(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			getRequest("info/me", "no-cache")
				.then((json: any) => {
					this.username = json.userInfo.username;
					this.uuid = json.userInfo.uuid;
					this.twofa = json.userInfo.two_fa_enabled;
					this.avatar = json.userInfo.avatar_path;
					this.status = json.userInfo.status;
					this.external = json.userInfo.provider !== "local";

					if (this._once) {
						this._once = false;
						this.requestFriends()
							.then(() => streamManager.notification.connect());
					}
					resolve(true);
				})
				.catch((err) => {
					reject(new Error("not authentifiated"));
				})

		})
	}

	public updateFriendStatus(user: ISearchRequestResponce) {
		const change = (user.status !== "offline" && (this.friendsOnline.has(user.uuid) || this.friendsBusy.has(user.uuid))) || (user.status == "offline" && this.friendsOnline.has(user.uuid));

		if (user.status == "offline" || user.status == "online" && this.friendsAway.has(user.uuid))
			htmlManager.notification.add({
				type: NotificationType.text,
				text: `${user.username} ${user.status}`,
			});
		if (user.status === "online") {
			this.friendsAway.delete(user.uuid);
			this.friendsOnline.add(user.uuid);
			this.friendsBusy.delete(user.uuid);
		} else if (user.status === "offline") {
			this.friendsOnline.delete(user.uuid);
			this.friendsAway.add(user.uuid);
			this.friendsBusy.delete(user.uuid);
		} else {
			this.friendsAway.delete(user.uuid);
			this.friendsOnline.delete(user.uuid);
			this.friendsBusy.add(user.uuid);
		}

		htmlManager.friendlist.updateStatus(user, change);
		htmlManager.lobby.updateInviteCustom(user.uuid, user.status == "online");
	}

	public addFriend(user: ISearchRequestResponce) {
		htmlManager.friendlist.addFriend(user);
		if (user.status == "online")
			this.friendsOnline.add(user.uuid);
		else if (user.status == "offline")
			this.friendsAway.add(user.uuid);
		else
			this.friendsBusy.add(user.uuid);
		htmlManager.lobby.updateInviteCustom(user.uuid, user.status == "online");
	}

	public async addFriendBis(uuid: string) {
		const json: any = await postRequest("info/search", { identifier: uuid, type: "uuid" })
			.catch((err) => htmlManager.notification.error(err));
		const status = json.data.status;
		if (status == "online")
			this.friendsOnline.add(uuid);
		else if (status == "offline")
			this.friendsAway.add(uuid);
		else
			this.friendsBusy.add(uuid);
		htmlManager.lobby.updateInviteCustom(uuid, status == "online");
	}

	public async requestFriends() {
		const json: any = await getRequest("friends/get/friendlist")
			.catch((err) => htmlManager.notification.error(err));
		if (json && json.friendlist) {
			this.setupFriends(json.friendlist);
			htmlManager.friendlist.resetFriends(json.friendlist);
		}
		const js: any = await getRequest("friends/get/requests")
			.catch((err) => htmlManager.notification.error(err));
		if (js && js.friendsRequests) {
			htmlManager.friendlist.resetRequest(js.friendsRequests);
		}
	}

	private setupFriends(update: Array<{ id: number, friend_username: string, friend_uuid: string, friend_status: string }>) {
		for (let i = 0; i < update.length; i++) {
			if (update[i].friend_status == "online")
				this.friendsOnline.add(update[i].friend_uuid);
			else if (update[i].friend_status == "offline")
				this.friendsAway.add(update[i].friend_uuid);
			else {
				this.friendsBusy.add(update[i].friend_uuid);
			}
		}
	}

	public removeFriend(uuid: string) {
		this.friendsOnline.delete(uuid);
		this.friendsAway.delete(uuid);
		this.friendsBusy.delete(uuid);
		htmlManager.friendlist.removeFriend(uuid);
		htmlManager.lobby.updateInviteCustom(uuid, false);
	}

}

export const User = new UserC();
