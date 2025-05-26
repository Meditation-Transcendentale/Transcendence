import { meReject, meRequest } from "./checkMe";
import Router from "./Router"; 


export interface Friend {
	id : number;
	friend_username: string;
}

export interface FriendRequest {
	id: number,
	sender_username: string,
	receiver_username: string
}

class Friendlist {
	private friendList: HTMLTableElement | null = null;

	private loaded: boolean;
	constructor() {
		this.loaded = false;
	}

	public init() {
		if (this.loaded){
			return;
		}
		try {
			this.renderSearchUser();
			this.initFriendRequests();
		} catch (err) {
			console.log (err)
		}
		this.loaded = true;
	}
	
	public async reset() {
		try {
			const resp = await this.friendlist_Request();
			if (resp.status === 404){
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


	private initFriendRequests(){
		const result = document.getElementById("friendrequests-container");
		const friendrequests_button = document.getElementById("friendrequests-button");
		const resp_table = document.createElement("table");
		result!.appendChild(resp_table);
		friendrequests_button!.addEventListener("click", async () => {
			resp_table.innerHTML = '';
			const resp = await this.getFriendRequests_Request();
			const requestList : FriendRequest[] = resp.message.friendsRequests;
			requestList.forEach(request => {
				const tr = document.createElement("tr");
				const td = document.createElement("td");
	
				td.innerText = request.sender_username;
	
				tr.appendChild(td);
				tr.appendChild(this.createButton("Accept", () => this.acceptFriendRequest_Request(request.sender_username).then(() => this.reset()), true));
				tr.appendChild(this.createButton("Decline", () => this.declineFriendRequest_Request(request.sender_username).then(() => this.reset()), true));
				tr.appendChild(this.createButton("Block", () => this.blockUser_Request(request.sender_username).then(() => this.reset()), true));
				tr.appendChild(this.createButton("Stats", () => {
					Router.nav("/home/stats?u=" + request.sender_username);
				}, true));
				tr.appendChild(this.createButton("Watch", () => {/* w.e */ }, false));
				resp_table!.appendChild(tr);
			});
		})
	}


	private renderSearchUser() {
		const result = document.getElementById("result-container");
		const search_button = document.getElementById("search-button");
		const value_search = document.getElementById("search-input");
		const resp_table = document.createElement("table");
		result!.appendChild(resp_table);

		search_button!.addEventListener("click", async () => {
			resp_table.innerHTML = '';
			const resp = await this.searchUser_Request(value_search!.value as string);
			if (resp.status === 404){
				console.log("user doesn't exist");
				return;
			}
			if (resp.ok) {
				for(let user in resp.message) {
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
			} else {
				throw new Error(`Request failed with status ${resp.status}`);
			}
		});
	}

	private renderFriendList(friendlist: Friend[]) {
		const container = document.getElementById("friendlist-container");
		if (this.friendList){
			this.friendList.remove();
		}
		this.friendList = document.createElement("table");

		friendlist.forEach(friend => {
			const tr = document.createElement("tr");
			const td = document.createElement("td");

			td.innerText = friend.friend_username;
			console.log(friend.friend_username);
			tr.appendChild(td);
			tr.appendChild(this.createButton("Remove", () => this.deleteFriend_Request(friend.friend_username), true));
			tr.appendChild(this.createButton("Block", () => this.blockUser_Request(friend.friend_username), true));
			tr.appendChild(this.createButton("Stats", () => {
				Router.nav("/home/stats?u=" + friend.friend_username);
			}, true));
			tr.appendChild(this.createButton("Watch", () => {/* w.e */ }, false));
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
			if (toRemove){ btn.parentElement!.remove();}
		});
		return btn;
	}

	private async friendlist_Request() {
		const response = await fetch("https://localhost:3000/friends/get/friendlist", {
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
		console.log (final);
		return final;
	}
	
	private async acceptFriendRequest_Request(acceptedUsername: string) {
		const response = await fetch("https://localhost:3000/friends/accept", { 
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				inputUsername: acceptedUsername,
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
		const response = await fetch("https://localhost:3000/friends/add", { 
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

	private async declineFriendRequest_Request(declinedUsername: string) {
		const response = await fetch("https://localhost:3000/friends/decline", { 
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				inputUsername: declinedUsername,
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

	private async deleteFriend_Request(deletedUsername: string) {
		const response = await fetch("https://localhost:3000/friends/delete", { 
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


	private async blockUser_Request(blockedUsername: string) {
		const response = await fetch("https://localhost:3000/friends/block", { 
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
		const response = await fetch("https://localhost:3000/info/" + searchedUsername, {
			method: 'GET',
			cache: 'no-store',
			headers: {
				'Accept': 'application/json',
			},
			credentials: 'include'
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

	private async getFriendRequests_Request() {
		const response = await fetch("https://localhost:3000/friends/get/requests", {
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
		console.log (final);
		return final;
	}
}
export default Friendlist;