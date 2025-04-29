import { ABlock } from "../../ABlock";
import { SimpleForm } from "../../customElements/SimpleForm";
import { CustomEvents } from "../../CustomEvents";
import { deleteFriend_Request, friendlist_Request, addFriend_Request, blockUser_Request, statsRequest} from "../../requests";
import { createContainer } from "../../utils";

export interface Friend {
	id : number;
	friend_username: string;
}

export class Friendlist extends ABlock {
	private friendList: HTMLTableElement | null = null;

	constructor(parent: HTMLElement) {
		super(parent);
		this.init();
	}

	private init() {
		this.container = createContainer("friendlist-container", "friendlist");
		this.container.addEventListener("enable", () => this.enable());
		this.container.addEventListener("disable", () => this.disable());
	}

	private async enable() {
		this.container.innerHTML = '';

		this.renderSearchBar();
		
		try {
			const resp = await friendlist_Request();
			if (resp.ok) {
				this.renderFriendList(resp.json.friendlist);
			} else {
				throw new Error(`Request failed with status ${resp.status}`);
			}
		} catch (err) {
			console.error(err);
		}
		super.enable();
	}

	private renderSearchBar() {
		const wrapper = document.createElement("div");
		const input = document.createElement("input");
		const button = document.createElement("input");
		const resultContainer = document.createElement("div");

		input.type = "text";
		input.placeholder = "Search user...";
		input.style.marginRight = "10px";

		button.type = "button";
		button.value = "Search";

		button.addEventListener("click", () => this.handleUserSearch(input.value.trim(), resultContainer));
		input.addEventListener("keypress", (e) => {
			if (e.key === "Enter") button.click();
		});

		wrapper.appendChild(input);
		wrapper.appendChild(button);
		this.container.appendChild(wrapper);
		this.container.appendChild(resultContainer);
	}

	private async handleUserSearch(query: string, resultContainer: HTMLElement) {
		resultContainer.innerHTML = '';
		if (!query) return;

		try {
			const user = await addFriend_Request(query); //create searchUser_Request
			if (!user) {
				resultContainer.innerText = "User not found 😕";
				return;
			}

			const userBox = document.createElement("div"); 
			userBox.innerText = user.message;

			// userBox.appendChild(this.createButton("Add", () => addFriend_Request(user.username)));
			// userBox.appendChild(this.createButton("Block", () => { /* Block logic */ }));
			// userBox.appendChild(this.createButton("Stats", () => { /* Stats logic */ }));

			resultContainer.appendChild(userBox);
		} catch (err) {
			console.error(err);
			resultContainer.innerText = "Error searching user.";
		}
	}

	private renderFriendList(friendlist: Friend[]) {
		this.friendList = document.createElement("table");

		friendlist.forEach(friend => {
			const tr = document.createElement("tr");
			const td = document.createElement("td");
			td.innerText = friend.friend_username;

			tr.appendChild(td);
			tr.appendChild(this.createButton("Remove", () => deleteFriend_Request(friend.friend_username)));
			tr.appendChild(this.createButton("Block", () => blockUser_Request(friend.friend_username)));
			tr.appendChild(this.createButton("Stats", () => { /* statsRequest(friend.friend_username) and display stuff*/}));

			this.friendList!.appendChild(tr);
		});

		this.container.appendChild(this.friendList);
	}

	private createButton(label: string, onClick: () => void): HTMLInputElement {
		const btn = document.createElement("input");
		btn.type = "button";
		btn.value = label;
		btn.addEventListener("click", onClick);
		return btn;
	}

	private disable() {
		this.container.innerHTML = '';
		this.friendList = null;
		super.disable();
	}
}


