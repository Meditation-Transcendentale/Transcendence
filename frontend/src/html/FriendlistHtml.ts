import { deleteRequest, ISearchRequestResponce, postRequest } from "../networking/request";
import { htmlManager } from "./HtmlManager";
import { NotificationType } from "./NotificationHtml";

interface IFriendUser {
	div: HTMLDivElement;
	username: HTMLSpanElement;
	avatar: HTMLImageElement;
	status: HTMLButtonElement;
	btn1: HTMLButtonElement;
	btn2?: HTMLButtonElement;
}

export class FriendlistHtml {
	private friend: Map<string, IFriendUser>;
	private request: Map<string, IFriendUser>;

	private div!: HTMLDivElement;

	private form!: HTMLFormElement;

	private friendContainer!: HTMLDivElement;
	private requestContainer!: HTMLDivElement;
	private searchContainer!: HTMLDivElement;
	private searchResult!: HTMLDivElement;

	private friendOnlinesContainer!: HTMLDivElement;
	private friendAwayContainer!: HTMLDivElement;

	constructor() {
		this.friend = new Map<string, IFriendUser>;
		this.request = new Map<string, IFriendUser>;

		this.div = document.createElement("div");
		this.div.className = "friendlist-container";

		this.setupForm();
		this.setupContainers();
		this.setupSearchContainer();
	}

	public toogle() {
		if (document.body.contains(this.div)) {
			this.div.remove();
		} else {
			this.form.reset();
			// this.form.querySelector("[name=friend]")?.toggleAttribute("click", true)
			// this.form.querySelector("[name=request]")?.toggleAttribute("click", false)
			// this.form.querySelector("[name=search]")?.toggleAttribute("click", false)
			// this.friendContainer.classList.remove("hidden");
			// this.requestContainer.classList.add("hidden");
			// this.searchContainer.classList.add("hidden");
			document.body.appendChild(this.div);
		}
		return;
	}

	private setupForm() {
		this.form = document.createElement("form");
		this.form.className = "friendlist-form";

		const friend = document.createElement("button");
		friend.type = "submit";
		const request = friend.cloneNode() as HTMLButtonElement;
		const search = friend.cloneNode() as HTMLButtonElement;
		friend.name = "friend";
		request.name = "request";
		search.name = "search";
		friend.textContent = "FRIENDS";
		request.textContent = "REQUEST";
		search.textContent = "SEARCH";

		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			if (!e.submitter || !e.submitter.hasAttribute("name"))
				return;
			const submitter = e.submitter.getAttribute("name");
			switch (submitter) {
				case "friend": {
					this.friendContainer.classList.remove("hidden");
					this.requestContainer.classList.add("hidden");
					this.searchContainer.classList.add("hidden");
					friend.toggleAttribute("click", true)
					request.toggleAttribute("click", false)
					search.toggleAttribute("click", false)
					// console.log("friendlist friend");
					break;
				}
				case "request": {
					this.friendContainer.classList.add("hidden");
					this.requestContainer.classList.remove("hidden");
					this.searchContainer.classList.add("hidden");
					friend.toggleAttribute("click", false)
					request.toggleAttribute("click", true)
					search.toggleAttribute("click", false)
					// console.log("friendlist request");
					break;
				}
				case "search": {
					this.friendContainer.classList.add("hidden");
					this.requestContainer.classList.add("hidden");
					this.searchContainer.classList.remove("hidden");
					friend.toggleAttribute("click", false)
					request.toggleAttribute("click", false)
					search.toggleAttribute("click", true)
					// console.log("friendlist search");
					break;
				}
			}
		})
		friend.toggleAttribute("click", true)
		this.form.appendChild(friend);
		this.form.appendChild(request);
		this.form.appendChild(search);
		this.div.appendChild(this.form);
	}

	private setupContainers() {
		this.friendContainer = document.createElement("div");
		this.friendContainer.className = "friendlist-content hidden";
		this.requestContainer = this.friendContainer.cloneNode() as HTMLDivElement;
		this.searchContainer = this.friendContainer.cloneNode() as HTMLDivElement;

		this.friendOnlinesContainer = document.createElement("div");
		this.friendOnlinesContainer.className = "friendlist-online-content";
		this.friendAwayContainer = document.createElement("div");
		this.friendAwayContainer.className = "friendlist-away-content";
		this.friendContainer.appendChild(this.friendOnlinesContainer);
		this.friendContainer.appendChild(this.friendAwayContainer);

		this.friendContainer.classList.remove("hidden");
		this.div.appendChild(this.friendContainer);
		this.div.appendChild(this.requestContainer);
		this.div.appendChild(this.searchContainer);
	}

	private setupSearchContainer() {
		const form = document.createElement("form");
		form.className = "friendlist-search-form";
		const text = document.createElement("input");
		const submit = document.createElement("button");
		submit.type = "submit";
		submit.textContent = "search";
		text.type = "search";
		text.placeholder = "username....";
		text.name = "username";
		text.autocomplete = "off";

		form.appendChild(text);
		// form.appendChild(submit);

		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const data = new FormData(form);
			console.log(data);
			this.searchResult.innerHTML = "";
			postRequest("info/search", { identifier: data.get("username"), type: "username" })
				.then((json: any) => {
					this.createUserElement(json.data, "search");
				})
				.catch(() => {
					this.searchResult.innerText = "User not found";
					htmlManager.notification.add({ type: NotificationType.error, error: "friend search" })
				})
		})

		this.searchContainer.appendChild(form);

		this.searchResult = document.createElement("div");
		this.searchResult.className = "friendlist-search-results";

		this.searchContainer.appendChild(this.searchResult);
	}

	public resetFriends(update: Array<{ id: number, friend_username: string, friend_uuid: string }>) {
		this.friendOnlinesContainer.innerHTML = "";
		this.friendAwayContainer.innerHTML = "";
		for (let i = 0; i < update.length; i++) {
			this.createUserElementAsync(update[i].friend_uuid, "friend");
		}
	}

	public resetRequest(update: Array<{ id: number, receiver_username: string, receiver_uuid: string, sender_username: string, sender_uuid: string }>) {
		this.requestContainer.innerHTML = "";
		for (let i = 0; i < update.length; i++) {
			this.createUserElementAsync(update[i].sender_uuid, "request");
		}
	}

	public addFriend(user: ISearchRequestResponce) {
		if (this.friend.has(user.uuid)) {
			this.friend.get(user.uuid)!.div.remove();
			this.friend.delete(user.uuid);
		}
		this.createUserElement(user, "friend");
	}

	public addRequest(user: ISearchRequestResponce) {
		if (!this.request.has(user.uuid))
			this.createUserElement(user, "request");
	}

	public updateStatus(uuid: string, status: string, change: boolean) {
		if (!this.friend.has(uuid))
			return;
		const friend = this.friend.get(uuid) as IFriendUser;
		if (change)
			friend.div.remove();
		friend.status.textContent = status;
		friend.status.setAttribute("status", status);
		if (change)
			if (status !== "offline")
				this.friendOnlinesContainer.appendChild(friend.div);
			else
				this.friendAwayContainer.appendChild(friend.div);

	}

	private createUserElement(user: ISearchRequestResponce, type: string) {
		const uuid = user.uuid;
		const div = document.createElement("div");
		div.className = "friendlist-user";
		const username = document.createElement("span");
		const avatar = document.createElement("img");
		const status = document.createElement("button");
		const btn = document.createElement("button");

		status.classList.add("friendlist-status");
		btn.classList.add("friendlist-button");
		div.appendChild(avatar);
		div.appendChild(username);
		div.appendChild(status);
		div.appendChild(btn);

		//// need to add decline button for request;

		let btn2 = btn.cloneNode() as HTMLButtonElement;

		if (type == "friend") {
			this.friend.set(uuid, {
				div: div,
				username: username,
				avatar: avatar,
				status: status,
				btn1: btn
			})
		} else if (type == "request") {
			this.request.set(uuid, {
				div: div,
				username: username,
				avatar: avatar,
				status: status,
				btn1: btn,
				btn2: btn2
			})

		}

		username.textContent = user.username;
		avatar.src = `${user.avatar_path}`;
		status.textContent = user.status;
		status.setAttribute("status", user.status);

		switch (type) {
			case "friend": {
				btn.textContent = "x";
				btn.addEventListener("click", () => {
					div.remove();
					this.friend.delete(uuid);
					deleteRequest("friends/delete", { inputUuid: uuid })
						.catch(() => { htmlManager.notification.add({ type: NotificationType.error, error: "friend delete request" }) });
				})
				if (user.status != "offline")
					this.friendOnlinesContainer.appendChild(div);
				else
					this.friendAwayContainer.appendChild(div);
				break;
			}
			case "request": {
				btn.textContent = "+";
				btn2.textContent = "x";
				status.remove();
				div.appendChild(btn2);
				btn.addEventListener("click", () => {
					postRequest("friends/accept", { inputUuid: uuid })
						.then(() => {
							div.remove();
							this.createUserElementAsync(uuid, "friend");
						})
						.catch((err) => { htmlManager.notification.add({ type: NotificationType.error, error: "friend accept request" }) });
				})
				btn2.addEventListener("click", () => {
					deleteRequest("friends/decline", { inputUuid: uuid })
						.then(() => {
							div.remove();
							this.request.delete(uuid);
						})
						.catch((err) => { htmlManager.notification.add({ type: NotificationType.error, error: "friend decline request" }) });

				})
				this.requestContainer.appendChild(div);
				break;
			}
			case "search": {
				btn.textContent = "+";
				btn.addEventListener("click", () => {
					postRequest(`friends/add`, { inputUuid: uuid })
						.catch((err) => { htmlManager.notification.add({ type: NotificationType.error, error: "friend send request" }) });
				})
				this.searchResult.appendChild(div);
				break;
			}
		}
	}


	public async createUserElementAsync(uuid: string, type: string) {
		const div = document.createElement("div");
		div.className = "friendlist-user";
		const username = document.createElement("span");
		const avatar = document.createElement("img");
		const status = document.createElement("button");
		const btn = document.createElement("button");

		status.classList.add("friendlist-status");
		btn.classList.add("friendlist-button");
		div.appendChild(avatar);
		div.appendChild(username);
		div.appendChild(status);
		div.appendChild(btn);

		//// need to add decline button for request;

		let btn2 = btn.cloneNode() as HTMLButtonElement;

		if (type == "friend") {
			this.friend.set(uuid, {
				div: div,
				username: username,
				avatar: avatar,
				status: status,
				btn1: btn
			})
		} else if (type == "request") {
			this.request.set(uuid, {
				div: div,
				username: username,
				avatar: avatar,
				status: status,
				btn1: btn,
				btn2: btn2
			})

		}

		const json: any = await postRequest("info/search", { identifier: uuid, type: "uuid" })
			.catch((err) => { htmlManager.notification.add({ type: NotificationType.error, error: "friendlist createUserElement" }) });
		username.textContent = json.data.username;
		avatar.src = `${json.data.avatar_path}`;
		status.textContent = json.data.status;
		status.setAttribute("status", json.data.status);

		switch (type) {
			case "friend": {
				btn.textContent = "x";
				btn.addEventListener("click", () => {
					div.remove();
					this.friend.delete(uuid);
					deleteRequest("friends/delete", { inputUuid: uuid })
						.catch(() => { htmlManager.notification.add({ type: NotificationType.error, error: "friend delete request" }) });
				})
				if (json.data.status != "offline")
					this.friendOnlinesContainer.appendChild(div);
				else
					this.friendAwayContainer.appendChild(div);
				break;
			}
			case "request": {
				btn.textContent = "+";
				btn2.textContent = "x";
				status.remove();
				div.appendChild(btn2);
				btn.addEventListener("click", () => {
					postRequest("friends/accept", { inputUuid: uuid })
						.then(() => {
							div.remove();
							this.createUserElementAsync(uuid, "friend");
						})
						.catch((err) => { htmlManager.notification.add({ type: NotificationType.error, error: "friend accept request" }) });
				})
				btn2.addEventListener("click", () => {
					deleteRequest("friends/decline", { inputUuid: uuid })
						.then(() => {
							div.remove();
							this.request.delete(uuid);
						})
						.catch((err) => { htmlManager.notification.add({ type: NotificationType.error, error: "friend decline request" }) });

				})
				this.requestContainer.appendChild(div);
				break;
			}
			case "search": {
				btn.textContent = "+";
				btn.addEventListener("click", () => {
					postRequest(`friends/add`, { inputUuid: uuid })
						.catch((err) => { htmlManager.notification.add({ type: NotificationType.error, error: "friend send request" }) });
				})
				this.searchResult.appendChild(div);
				break;
			}
		}
	}
}
