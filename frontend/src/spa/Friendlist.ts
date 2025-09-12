import { meReject, meRequest } from "./checkMe";
import { Popup } from "./Popup";
import { deleteRequest, getRequest, postRequest } from "./requests";
import Router from "./Router";
import { createButton, setDraggable } from "./utils";


//interface Friend {
//	id: number;
//	friend_username: string;
//}
//
//interface friendlistHtmlReference {
//	friendsBtn: HTMLInputElement;
//	friends: HTMLDivElement;
//	pendingBtn: HTMLInputElement;
//	pending: HTMLDivElement;
//	search: HTMLInputElement;
//	searchResult: HTMLDivElement;
//}

//export default class OFriendlist {
//	private div: HTMLDivElement;
//	private ref: friendlistHtmlReference;
//
//	constructor(div: HTMLDivElement) {
//		this.div = div;
//
//		this.ref = {
//			friendsBtn: div.querySelector("#fl-friends-btn") as HTMLInputElement,
//			friends: div.querySelector("#fl-friends") as HTMLDivElement,
//			pendingBtn: div.querySelector("#fl-pending-btn") as HTMLInputElement,
//			pending: div.querySelector("#fl-pending") as HTMLDivElement,
//			search: div.querySelector("#fl-search-input") as HTMLInputElement,
//			searchResult: div.querySelector("#fl-search-result") as HTMLDivElement,
//		}
//
//
//
//		this.ref.friends.style.display = "block";
//		this.ref.pending.style.display = "none";
//
//		this.ref.friendsBtn.addEventListener("click", () => {
//			this.ref.friends.style.display = (this.ref.friends.style.display == "none" ? "block" : "none");
//		})
//
//		this.ref.pendingBtn.addEventListener("click", () => {
//			this.ref.pending.style.display = (this.ref.pending.style.display == "none" ? "block" : "none");
//		})
//
//		this.ref.search.addEventListener("keypress", (e) => {
//			if (e.key == "Enter" && this.ref.search.value.length > 0) {
//				getRequest(`info/${encodeURIComponent(this.ref.search.value)}`)
//					.then((json) => { this.searchResolve(json) })
//					.catch((resp) => { this.searchReject(resp) })
//			}
//		})
//
//		setDraggable(this.div.querySelector(".window") as HTMLDivElement);
//	}
//
//
//	public load(params: URLSearchParams) {
//		document.querySelector("#home-container")?.appendChild(this.div);
//		getRequest("friends/get/friendlist")
//			.then((json) => { this.friendlistResolve(json) });
//		getRequest("friends/get/requests")
//			.then((json) => { this.pendingResolve(json) });
//	}
//
//	public async unload() {
//		this.div.remove();
//	}
//
//	private friendlistResolve(json: any) {
//		const frienlist = json.friendlist as Array<Object>;
//		const div = document.createElement("div");
//
//		frienlist.forEach((friend: any) => {
//			let user = document.createElement("div");
//			user.innerText = friend.friend_username;
//			user.className = "list-element";
//			user.appendChild(createButton("Stats", () => { Router.nav(`/stats?u=${friend.friend_username}`) }));
//			user.appendChild(createButton("Remove", (btn: HTMLInputElement) => {
//				deleteRequest(`friends/delete`, { inputUsername: friend.friend_username })
//					.then(() => { btn.parentElement?.remove() })
//			}))
//			div.appendChild(user);
//		})
//		this.ref.friends.innerHTML = "";
//		this.ref.friends.appendChild(div);
//
//
//	}
//
//	private searchResolve(json: any) {
//		const search = json.user as any;
//		const div = document.createElement("div");
//
//		let user = document.createElement("div");
//		user.innerText = search.username;
//		user.appendChild(createButton("Stats", () => { Router.nav(`/stats?u=${search.username}`) }));
//		user.appendChild(createButton("Add", (btn: HTMLInputElement) => {
//			postRequest("friends/add", { inputUsername: search.username })
//				.then(() => { div.remove(); });
//		}));
//		div.appendChild(user);
//
//		this.ref.searchResult.appendChild(div);
//	}
//
//	private searchReject(resp: Response) {
//		if (resp.status) {
//			resp.json().then((json) => console.log(json));
//		}
//	}
//
//	private pendingResolve(json: any) {
//		console.log(json);
//		const pendinglist = json.friendsRequests as Array<Object>;
//		const div = document.createElement("div");
//
//		pendinglist.forEach((pending: any) => {
//			let user = document.createElement("div");
//			user.innerText = pending.sender_username;
//			user.appendChild(createButton("Accept", (btn: HTMLInputElement) => {
//				postRequest(`friends/accept`, { inputUsername: pending.sender_username })
//					.then(() => { btn.parentElement?.remove() })
//			}))
//			div.appendChild(user);
//		})
//		this.ref.pending.innerHTML = "";
//		this.ref.pending.appendChild(div);
//	}
//
//
//
//
//}

interface friendlistHtmlReference {
	search: HTMLInputElement;
	result: HTMLDivElement;
	friends: HTMLDivElement;

}

interface friend {
	id: number;
	div: HTMLDivElement;
}

class FriendlistC {
	private div!: HTMLDivElement;
	private ref!: friendlistHtmlReference;

	private friends: Array<friend>;


	constructor() {
		this.friends = new Array<friend>;
	}

	public init(div: HTMLDivElement) {
		this.div = div;
		this.ref = {
			search: div.querySelector("#friendlist-search") as HTMLInputElement,
			friends: div.querySelector("#friendlist") as HTMLDivElement,
			result: document.createElement("div")
		}

		this.ref.search.addEventListener("keypress", (e) => {
			if (e.key == "Enter" && this.ref.search.value.length > 0) {
				getRequest(`info/username/${encodeURIComponent(this.ref.search.value)}`)
					.then((json) => { this.searchResolve(json) })
					.catch((resp) => { console.log(resp) })
			}
		})

		getRequest("friends/get/friendlist")
			.then((json) => { console.log(json) })
			.catch((err) => { console.log(err.json()) })
		getRequest("friends/get/requests")
			.then((json) => { console.log(json) })
			.catch((err) => { console.log(err.json()) })
	}

	public load() {
		Popup.addPopup(this.div);
	}

	private searchResolve(json: any) {
		this.ref.result.innerText = json.user.username;
		this.div.appendChild(this.ref.result);
		postRequest(`friends/add`, { inputUsername: json.user.username });
		postRequest(`friends/accept`, { inputUsername: json.user.username });
	}



}

export const gFreindList = new FriendlistC();
