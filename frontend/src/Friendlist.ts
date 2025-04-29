import { meReject, meRequest } from "./checkMe";

export interface Friend {
	id : number;
	friend_username: string;
}

class Friendlist {
	private friendList: HTMLTableElement | null = null;

	private loaded: boolean;
	constructor() {
		this.loaded = false;
	}

	public async init() {
		if (this.loaded){
			return;
		}
		// try {
		// 	const resp = await this.friendlist_Request();
		// 	if (resp.ok) {
		// 		this.renderFriendList(resp.message.friendlist);
		// 	} else {
		// 		throw new Error(`Request failed with status ${resp.status}`);
		// 	}
		// } catch (err) {
		// 	console.error(err);
		// }
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

			tr.appendChild(td);
			tr.appendChild(this.createButton("Remove", () => this.deleteFriend_Request(friend.friend_username)));
			tr.appendChild(this.createButton("Block", () => this.blockUser_Request(friend.friend_username)));
			tr.appendChild(this.createButton("Stats", () => { /* statsRequest(friend.friend_username) and display stuff*/}));
			tr.appendChild(this.createButton("Watch", () => {/* w.e */ }));
			this.friendList!.appendChild(tr);
		});
		container!.appendChild(this.friendList);
		this.loaded = true;
	}
	
	private createButton(label: string, onClick: () => void): HTMLInputElement {
		const btn = document.createElement("input");
		btn.type = "button";
		btn.value = label;
		btn.addEventListener("click", onClick);
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
		this.loaded = false;
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
		this.loaded = false;
		return final;
	}
}
export default Friendlist;

// private async enable() {
// 	this.container.innerHTML = '';

// 	this.renderSearchBar();
	

// 	super.enable();
// }

// private renderSearchBar() {
// 	const wrapper = document.createElement("div");
// 	const input = document.createElement("input");
// 	const button = document.createElement("input");
// 	const resultContainer = document.createElement("div");

// 	input.type = "text";
// 	input.placeholder = "Search user...";
// 	input.style.marginRight = "10px";

// 	button.type = "button";
// 	button.value = "Search";

// 	button.addEventListener("click", () => this.handleUserSearch(input.value.trim(), resultContainer));
// 	input.addEventListener("keypress", (e) => {
// 		if (e.key === "Enter") button.click();
// 	});

// 	wrapper.appendChild(input);
// 	wrapper.appendChild(button);
// 	this.container.appendChild(wrapper);
// 	this.container.appendChild(resultContainer);
// }

// private async handleUserSearch(query: string, resultContainer: HTMLElement) {
// 	resultContainer.innerHTML = '';
// 	if (!query) return;

// 	try {
// 		const user = await addFriend_Request(query); //create searchUser_Request
// 		if (!user) {
// 			resultContainer.innerText = "User not found 😕";
// 			return;
// 		}

// 		const userBox = document.createElement("div"); 
// 		userBox.innerText = user.message;

// 		// userBox.appendChild(this.createButton("Add", () => addFriend_Request(user.username)));
// 		// userBox.appendChild(this.createButton("Block", () => { /* Block logic */ }));
// 		// userBox.appendChild(this.createButton("Stats", () => { /* Stats logic */ }));

// 		resultContainer.appendChild(userBox);
// 	} catch (err) {
// 		console.error(err);
// 		resultContainer.innerText = "Error searching user.";
// 	}
// }



// private disable() {
// 	this.container.innerHTML = '';
// 	this.friendList = null;
// 	super.disable();
// }