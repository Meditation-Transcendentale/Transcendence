import { htmlManager } from "./html/HtmlManager";
import { NotificationType } from "./html/NotificationHtml";
import { getRequest, ISearchRequestResponce, postRequest } from "./networking/request";

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
						this.requestFriends();
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
		htmlManager.friendlist.updateStatus(user.uuid, user.status, change);
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
	}

	public requestFriends() {
		getRequest("friends/get/friendlist")
			.then((json: any) => {
				console.log(json);
				this.setupFriends(json.friendlist);
				htmlManager.friendlist.resetFriends(json.friendlist);
			})
		getRequest("friends/get/requests")
			.then((json: any) => {
				console.log(json);
				htmlManager.friendlist.resetRequest(json.friendsRequests);
			})

	}

	private setupFriends(update: Array<{ id: number, friend_username: string, friend_uuid: string, friend_status: string }>) {
		for (let i = 0; i < update.length; i++) {
			if (update[i].friend_status !== "offline")
				this.friendsOnline.add(update[i].friend_uuid);
			else
				this.friendsAway.add(update[i].friend_uuid);
		}
	}

	public removeFriend(uuid: string) {
		this.friendsOnline.delete(uuid);
		this.friendsAway.delete(uuid);
		htmlManager.friendlist.removeFriend(uuid);
	}

}

export const User = new UserC();
