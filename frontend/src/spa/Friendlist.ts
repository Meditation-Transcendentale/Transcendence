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
	private friends: Map<string, friend>;


	constructor() {
		this.friends = new Map<string, friend>;
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
				getRequest(`info/username/${encodeURIComponent(this.ref.search.value)}`)
					.then((json) => { this.searchResolve(json) })
					.catch((resp) => { console.log(resp) })
			}
		})

		getRequest("friends/get/friendlist")
			.then((json) => { this.friendlistResolve(json) })
			.catch((err) => { console.log(err.json()) })
		getRequest("friends/get/requests")
			.then((json) => { this.friendlistInviteResolve(json) })
			.catch((err) => { console.log(err.json()) })
	}

	public load() {
		Popup.addPopup(this.div);
	}

	private searchResolve(json: any) {
		this.ref.result.appendChild(this.createResult(json.user.username));
	}

	private friendlistResolve(json: any) {

		for (let i of json.friendlist) {
			const f = this.createFriend(i.friend_username, i.friend_uuid);
			this.friends.set(i.friend_uuid, f);
			this.ref.away.appendChild(f.div);
		}
	}

	private friendlistInviteResolve(json: any) {
		for (let i of json.friendsRequests) {
			getRequest(`info/username/${i.sender_username}`)
				.then((json: any) => { this.addToInvite(i.sender_username, i.sender_username) })
				.catch((err) => { console.log(err) });
		}
	}

	private createFriend(name: string, id: string): friend {
		const div = document.createElement("div");
		const n = document.createElement("input");
		const s = document.createElement("input");
		const e = document.createElement("input");
		n.type = "button";
		n.value = name;
		s.type = "button"
		s.value = "away";
		e.type = "button";
		e.value = "remove";

		n.addEventListener('click', () => {
			gAth.loadProfile(n.value);
		})

		s.addEventListener('click', () => {
			if (s.value == 'away') {
				div.remove();
				s.value = "connected";
				this.ref.connected.appendChild(div);
			} else {
				div.remove();
				s.value = 'away';
				this.ref.away.appendChild(div)
			}
		})

		e.addEventListener('click', () => {
			getRequest(`info/uuid/${id}`)
				.then((json: any) => {
					deleteRequest("friends/delete", { inputUsername: json.username })
						.catch((err) => { console.log(err) });
				})
			this.friends.get(id)?.div.remove();
			this.friends.delete(id)
		})
		div.appendChild(n);
		div.appendChild(s);
		div.appendChild(e);
		return {
			div: div,
			name: n,
			status: s,
			edit: e
		};
	}


	private createResult(username: string): HTMLDivElement {
		const div = document.createElement("div");
		const n = document.createElement("input");
		const a = document.createElement("input");

		n.type = "button";
		n.value = username;
		a.type = "button";
		a.value = "add";

		n.addEventListener('click', () => {
			gAth.loadProfile(n.value);
		})

		a.addEventListener("click", () => {
			postRequest(`friends/add`, { inputUsername: username });
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
			gAth.loadProfile(username);
		})
		a.addEventListener("click", () => {
			// getRequest(`info/uuid/${uuid}`)
			// 	.then((json: any) => {
			// 		postRequest("friends/accept", { inputUsername: json.username })
			// 			.then(() => { div.remove(); this.addFriend(json.username, uuid) })
			// 			.catch((err) => { console.log(err) });
			// 	})
			postRequest("friends/accept", { inputUsername: username })
				.then(() => { div.remove(); this.addFriend(username, uuid) })
				.catch((err) => { console.log(err) });

		})
		r.addEventListener("click", () => {
			// getRequest(`info/uuid/${uuid}`)
			// 	.then((json: any) => {
			// 		postRequest("friends/decline", { inputUsername: json.username })
			// 			.then(() => { div.remove(); })
			// 			.catch((err) => { console.log(err) });
			// 	})
			deleteRequest("friends/decline", { inputUsername: username })
				.then(() => { div.remove(); })
				.catch((err) => { console.log(err) });
		})
		div.appendChild(n);
		div.appendChild(a);
		div.appendChild(r);
		this.ref.invite.appendChild(div);
		return div;
	}

	public addFriend(username: string, uuid: string) {
		const f = this.createFriend(username, uuid);
		this.friends.set(uuid, f);
		this.ref.away.appendChild(f.div);
	}
}

export const gFriendList = new FriendlistC();
