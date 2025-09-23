import { gAth } from "./Ath";
import { meReject, meRequest } from "./checkMe";
import { Popup } from "./Popup";
import { deleteRequest, getRequest, postRequest } from "./requests";
import Router from "./Router";
import { createButton, setDraggable } from "./utils";


interface friendlistHtmlReference {
	search: HTMLInputElement;
	result: HTMLDivElement;
	connected: HTMLDivElement;
	away: HTMLDivElement;
	invite: HTMLDivElement;
}

interface friend {
	div: HTMLDivElement;
	name: HTMLInputElement;
	status: HTMLInputElement;
	edit: HTMLInputElement;
}

class FriendlistC {
	private div!: HTMLDivElement;
	private ref!: friendlistHtmlReference;

	// private friends: Array<friend>;
	private friendsOnline: Map<string, friend>;
	private friendsAway: Map<string, friend>;


	constructor() {
		this.friendsOnline = new Map<string, friend>;
		this.friendsAway = new Map<string, friend>;
	}

	public init(div: HTMLDivElement) {
		this.div = div;
		this.ref = {
			search: div.querySelector("#friendlist-search") as HTMLInputElement,
			result: div.querySelector("#friendlist-search-result") as HTMLDivElement,
			connected: div.querySelector("#friendlist-connected") as HTMLDivElement,
			away: div.querySelector("#friendlist-away") as HTMLDivElement,
			invite: div.querySelector("#friendlist-invite") as HTMLDivElement
		}

		this.ref.search.addEventListener("keypress", (e) => {
			if (e.key == "Enter" && this.ref.search.value.length > 0) {
				this.ref.result.innerHTML = "";
				postRequest("info/search", { identifier: this.ref.search.value, type: "username" })
					.then((json) => { this.searchResolve(json) })
					.catch((resp) => { console.log(resp) })
			}
		})

		getRequest("friends/get/friendlist")
			.then((json) => { this.friendlistResolve(json) })
			.catch((err) => { console.log(err.json()) })
		getRequest("friends/get/requests")
			.then((json) => { this.friendlistInviteResolve(json) })
			.catch((err) => { console.log("Sans Manque de Respect") })
	}

	public load() {
		Popup.addPopup(this.div);
	}

	private searchResolve(json: any) {
		this.ref.result.appendChild(this.createResult(json.data.username, json.data.uuid));
	}

	private friendlistResolve(json: any) {
		for (let i of json.friendlist) {
			this.addToFriend(i.friend_username, i.friend_uuid, i.friend_status)
		}
	}

	private friendlistInviteResolve(json: any) {
		for (let i of json.friendsRequests) {
			this.addToInvite(i.sender_username, i.sender_uuid)
		}
	}

	public addToFriend(username: string, uuid: string, status: string) {
		postRequest("info/search", { identifier: uuid, type: "uuid" });
		const div = document.createElement("div");
		const n = document.createElement("input");
		const s = document.createElement("input");
		const e = document.createElement("input");
		n.type = "button";
		n.value = username;
		s.type = "button"
		s.value = status;
		e.type = "button";
		e.value = "remove";

		n.addEventListener('click', () => {
			gAth.loadProfile(uuid);
		})

		s.addEventListener("click", () => {
			this.updateStatus(uuid, s.value == "offline" ? "online" : "offline")
		})

		e.addEventListener('click', () => {
			deleteRequest("friends/delete", { inputUuid: uuid })
				.catch((err) => { console.log(err) });
			this.friendsOnline.get(uuid)?.div.remove();
			this.friendsOnline.delete(uuid)
			this.friendsAway.get(uuid)?.div.remove();
			this.friendsAway.delete(uuid)
		})
		div.appendChild(n);
		div.appendChild(s);
		div.appendChild(e);

		const f = {
			div: div,
			name: n,
			status: s,
			edit: e
		};
		if (status == "offline") {
			this.friendsAway.set(uuid, f);
			this.ref.away.appendChild(f.div);
		} else {
			this.friendsOnline.set(uuid, f);
			this.ref.connected.appendChild(f.div);
		}
	}


	private createResult(username: string, uuid: string): HTMLDivElement {
		const div = document.createElement("div");
		const n = document.createElement("input");
		const a = document.createElement("input");

		n.type = "button";
		n.value = username;
		a.type = "button";
		a.value = "add";

		n.addEventListener('click', () => {
			gAth.loadProfile(uuid);
		})

		a.addEventListener("click", () => {
			postRequest(`friends/add`, { inputUuid: uuid });
		})
		div.appendChild(n);
		div.appendChild(a);
		return div;
	}

	public addToInvite(username: string, uuid: string): HTMLDivElement {
		const div = document.createElement("div");
		const n = document.createElement("input");
		const a = document.createElement("input");
		const r = document.createElement("input");

		n.type = "button";
		n.value = username;
		a.type = "button";
		a.value = "accept";
		r.type = "button";
		r.value = "refuse";

		n.addEventListener('click', () => {
			gAth.loadProfile(uuid);
		})
		a.addEventListener("click", () => {
			postRequest("friends/accept", { inputUuid: uuid })
				.then(() => { div.remove(); this.addToFriend(username, uuid, "offline") })
				.catch((err) => { console.log(err) });

		})
		r.addEventListener("click", () => {
			deleteRequest("friends/decline", { inputUuid: uuid })
				.then(() => { div.remove(); })
				.catch((err) => { console.log(err) });
		})
		div.appendChild(n);
		div.appendChild(a);
		div.appendChild(r);
		this.ref.invite.appendChild(div);
		return div;
	}

	public updateStatus(uuid: string, status: string) {
		if (status == "offline") {
			if (this.friendsOnline.has(uuid)) {
				const f = this.friendsOnline.get(uuid) as friend;
				f.div.remove();
				this.friendsAway.set(uuid, f);
				this.friendsOnline.delete(uuid);
				f.status.value = status;
				this.ref.away.appendChild(f.div);
			}
		} else {
			if (this.friendsAway.has(uuid)) {
				const f = this.friendsAway.get(uuid) as friend;
				f.div.remove();
				this.friendsOnline.set(uuid, f);
				this.friendsAway.delete(uuid);
				f.status.value = status;
				this.ref.connected.appendChild(f.div);
			} else {
				this.friendsOnline.get(uuid)!.status.value = status;
			}
		}
	}

	public get onlineFriends(): Map<string, friend> {
		return this.friendsOnline;
	}
}

export const gFriendList = new FriendlistC();
