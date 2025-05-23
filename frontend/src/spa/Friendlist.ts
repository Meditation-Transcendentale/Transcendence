import { meReject, meRequest } from "./checkMe";
import { getRequest } from "./requests";
import Router from "./Router";


interface Friend {
	id: number;
	friend_username: string;
}

interface friendlistHtmlReference {
	friendsBtn: HTMLInputElement;
	friends: HTMLDivElement;
	pendingBtn: HTMLInputElement;
	pending: HTMLDivElement;
	search: HTMLInputElement;
	searchResult: HTMLDivElement;

}

export default class Friendlist {
	private div: HTMLDivElement;
	private ref: friendlistHtmlReference;

	constructor(div: HTMLDivElement) {
		this.div = div;

		this.ref = {
			friendsBtn: div.querySelector("#fl-friends-btn") as HTMLInputElement,
			friends: div.querySelector("#fl-friends") as HTMLDivElement,
			pendingBtn: div.querySelector("#fl-pending-btn") as HTMLInputElement,
			pending: div.querySelector("#fl-pending") as HTMLDivElement,
			search: div.querySelector("#fl-search-input") as HTMLInputElement,
			searchResult: div.querySelector("#fl-search-result") as HTMLDivElement
		}

		this.ref.friends.style.display = "block";
		this.ref.pending.style.display = "none";

		this.ref.friendsBtn.addEventListener("click", () => {
			this.ref.friends.style.display = (this.ref.friends.style.display == "none" ? "block" : "none");
		})

		this.ref.pendingBtn.addEventListener("click", () => {
			this.ref.pending.style.display = (this.ref.pending.style.display == "none" ? "block" : "none");
		})

		this.ref.search.addEventListener("keypress", (e) => {
			if (e.key == "Enter" && this.ref.search.value.length > 0) {
				getRequest(`info/${encodeURIComponent(this.ref.search.value)}`)
					.then((json) => { this.loginResolve(json) })
					.catch((resp) => { this.loginReject(resp) })
			}
		})
	}


	public load(params: URLSearchParams) {
		document.querySelector("#home-container")?.appendChild(this.div);
	}

	public async unload() {
		this.div.remove();
	}

	private loginResolve(json: any) {
		console.log(json);
	}

	private loginReject(resp: Response) {
		if (resp.status) {
			resp.json().then((json) => console.log(json));
		}
	}

}

class FriendlistC {
	private friendList: HTMLTableElement | null = null;

	private loaded: boolean;
	constructor() {
		this.loaded = false;
	}

	public init() {
		if (this.loaded) {
			return;
		}
		try {
			const result = document.getElementById("result-container");
			const search_button = document.getElementById("search-button");
			const value_search = document.getElementById("search-input");
			const resp_table = document.createElement("table");
			result!.appendChild(resp_table);

			search_button!.addEventListener("click", async () => {
				resp_table.innerHTML = '';
				const resp = await this.searchUser_Request(value_search!.value as string);
				for (let user in resp.message) {
					const tr = document.createElement("tr");
					const td = document.createElement("td");

					td.innerText = resp.message[user].username;
					console.log(resp.message[user].username);
					tr.appendChild(td);
					tr.appendChild(this.createButton("Add", () => this.addFriend_Request(resp.message[user].username), false));
					tr.appendChild(this.createButton("Block", () => this.blockUser_Request(resp.message[user].username), false));
					tr.appendChild(this.createButton("Stats", () => {
						Router.nav("/home/stats?u=" + resp.message[user].username);
					}, false));
					tr.appendChild(this.createButton("Watch", () => {/* w.e */ }, false));
					resp_table!.appendChild(tr);
				};
			});
		} catch (err) {
			console.log(err)
		}
		this.loaded = true;
	}

	public async reset() {
		try {
			const resp = await this.friendlist_Request();
			if (resp.status === 404) {
				console.log("friendlist empty");
				return;
			}
			if (resp.ok) {
				this.renderFriendList(resp.message.friendlist);
			} else {
				throw new Error(`Request failed with status ${resp.status}`);
			}
		} catch (err) {
			console.error(err);
		}
	}

	private renderFriendList(friendlist: Friend[]) {
		const container = document.getElementById("friendlist-container");
		if (this.friendList) {
			this.friendList.remove();
		}
		this.friendList = document.createElement("table");

		friendlist.forEach(friend => {
			const tr = document.createElement("tr");
			const td = document.createElement("td");

			td.innerText = friend.friend_username;

			tr.appendChild(td);
			tr.appendChild(this.createButton("Remove", () => this.deleteFriend_Request(friend.friend_username), true));
			tr.appendChild(this.createButton("Block", () => this.blockUser_Request(friend.friend_username), true));
			tr.appendChild(this.createButton("Stats", () => {
				Router.nav("/home/stats?u=" + friend.friend_username);
			}, true));
			tr.appendChild(this.createButton("Watch", () => {/* w.e */ }, true));
			this.friendList!.appendChild(tr);
		});
		container!.appendChild(this.friendList);
	}

	private createButton(label: string, onClick: () => void, toRemove: boolean): HTMLInputElement {
		const btn = document.createElement("input");
		btn.type = "button";
		btn.value = label;
		btn.addEventListener("click", () => {
			onClick();
			if (toRemove) { btn.parentElement!.remove(); }
		});
		return btn;
	}

	private async friendlist_Request() {
		const response = await fetch(`https://${window.location.hostname}:3000/friends/get/friendlist`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
			},
			credentials: 'include',
		});


		const data = await response.json();

		const final = {
			message: data,
			status: response.status,
			ok: response.ok
		};
		console.log(final);
		return final;
	}

	private async deleteFriend_Request(deletedUsername: string) {
		const response = await fetch(`https://${window.location.hostname}:3000/friends/delete`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				inputUsername: deletedUsername,
			})
		});
		const data = await response.json();

		const final = {
			message: data.message,
			status: response.status,
			ok: response.ok
		};
		console.log(final);
		return final;
	}

	private async addFriend_Request(addedUsername: string) {
		const response = await fetch(`https://${window.location.hostname}:3000/friends/add`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				inputUsername: addedUsername,
			})
		});
		const data = await response.json();

		const final = {
			message: data.message,
			status: response.status,
			ok: response.ok
		};
		console.log(final);
		return final;
	}

	private async blockUser_Request(blockedUsername: string) {
		const response = await fetch(`https://${window.location.hostname}:3000/friends/block`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				inputUsername: blockedUsername,
			})
		});

		const data = await response.json();

		const final = {
			message: data.message,
			status: response.status,
			ok: response.ok
		};
		console.log(final);
		return final;
	}

	private async searchUser_Request(searchedUsername: string) {
		const response = await fetch(`https://${window.location.hostname}:3000/info/` + searchedUsername, {
			method: 'GET',
			cache: 'no-store',
			headers: {
				'Accept': 'application/json',
			},
			credentials: 'include'
			// body: JSON.stringify({
			// 	inputUsername: searchedUsername,
			// })
		})
		const data = await response.json();

		const final = {
			message: data,
			status: response.status,
			ok: response.ok
		};
		console.log(final);
		return final;
	}
}

