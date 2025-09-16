import { gFriendList } from "./Friendlist";
import { NotificationManager } from "./NotificationManager";
import { Popup } from "./Popup";
import { cdnRequest, getRequest, meRequest, patchRequest, postRequest } from "./requests";
import Stats from "./Stats";
import { User } from "./User";

interface athHtmlReference {
	menu: HTMLDivElement,
	setting: HTMLInputElement,
	quit: HTMLInputElement,
	friendlist: HTMLInputElement,
}

class Ath {
	private div!: HTMLDivElement;
	private ref!: athHtmlReference;
	private css!: HTMLElement;

	private quit!: AthQuit;
	private profile!: Profile;

	private loaded = false;

	constructor() {

	}

	public init(div: HTMLDivElement) {
		this.div = div;
		this.ref = {
			menu: div.querySelector("#menu") as HTMLDivElement,
			setting: div.querySelector("#setting-btn") as HTMLInputElement,
			quit: div.querySelector("#quit-btn") as HTMLInputElement,
			friendlist: div.querySelector("#friend-btn") as HTMLInputElement
		}
		this.css = div.querySelector("link") as HTMLElement;

		this.quit = new AthQuit(div);
		this.profile = new Profile(div.querySelector("#profile-div") as HTMLDivElement);
		//this.setting = new AthSetting(div);
		// this.notif = new AthNotif(div);

		this.ref.setting.addEventListener('click', () => {
			this.profile.load(User.username as string, true);
		})

		this.ref.quit.addEventListener("click", () => {
			this.quit.load();
		})

		this.ref.friendlist.addEventListener("click", () => {
			gFriendList.load();
		})

		gFriendList.init(div.querySelector("#friendlist-container") as HTMLDivElement);

		NotificationManager.setupWs();

		console.log("USER", User);
	}

	public load(params: URLSearchParams) {
		if (this.loaded) { return; }
		document.head.appendChild(this.css);
		document.body.appendChild(this.ref.menu);
		this.loaded = true;
	}

	public loadProfile(username: string) {
		this.profile.load(username);
	}

	public async unload() {
		this.ref.menu.remove();
		this.loaded = false;
	}
}

interface quitHtmlReference {
	quitY: HTMLInputElement,
	quitN: HTMLInputElement,
}

class AthQuit {
	private div: HTMLDivElement;
	private ref: quitHtmlReference;

	constructor(div: HTMLDivElement) {
		this.div = div.querySelector("#quit-window") as HTMLDivElement;

		this.ref = {
			quitY: div.querySelector("#quit-yes") as HTMLInputElement,
			quitN: div.querySelector("#quit-no") as HTMLInputElement,
		}

		this.ref.quitY.addEventListener("click", () => {
			postRequest("auth/logout", {})
				.then(() => { window.location.reload() })
				.catch(() => { window.location.reload() })
		})

		this.ref.quitN.addEventListener("click", () => {
			this.unload();
		})
	}

	public load() {
		Popup.addPopup(this.div);
	}

	public unload() {
		Popup.removePopup();
	}
}


interface settingHtmlReference {
	username: HTMLInputElement,
	twofa: HTMLInputElement,
	password: HTMLInputElement,
	editUsername: HTMLInputElement,
	editAvatar: HTMLInputElement,
	avatarImg: HTMLImageElement,
	avatarChange: HTMLInputElement,
	passwordWindow: HTMLDivElement,
	passwordInput: HTMLInputElement,
	passwordSubmit: HTMLInputElement,
	passwordChangeWindow: HTMLDivElement,
	passwordOls: HTMLInputElement,
	passwordNew: HTMLInputElement,
	passwordChangeSubmit: HTMLInputElement,
	twofaWindow: HTMLDivElement,
	twofaInput: HTMLInputElement,
	twofaSubmit: HTMLInputElement

}

enum verifyState {
	username,
	password,
	twofa
}

class AthSetting {
	private div: HTMLDivElement;
	private ref: settingHtmlReference;

	private state!: verifyState;

	constructor(div: HTMLDivElement) {
		this.div = div.querySelector("#setting-window") as HTMLDivElement;

		this.ref = {
			username: div.querySelector("#username-change") as HTMLInputElement,
			twofa: div.querySelector("#twofa-change") as HTMLInputElement,
			password: div.querySelector('#password-change') as HTMLInputElement,
			editUsername: div.querySelector("#username-edit") as HTMLInputElement,
			editAvatar: div.querySelector("#avatar-edit") as HTMLInputElement,
			avatarImg: div.querySelector("#avatar-img") as HTMLImageElement,
			avatarChange: div.querySelector("#avatar-change") as HTMLInputElement,
			passwordWindow: div.querySelector("#password-window") as HTMLDivElement,
			passwordInput: div.querySelector("#password-input") as HTMLInputElement,
			passwordSubmit: div.querySelector("#password-submit") as HTMLInputElement,
			passwordChangeWindow: div.querySelector("#password-change-window") as HTMLDivElement,
			passwordOls: div.querySelector("#password-old-input") as HTMLInputElement,
			passwordNew: div.querySelector("#password-new-input") as HTMLInputElement,
			passwordChangeSubmit: div.querySelector("#password-change-submit") as HTMLInputElement,
			twofaWindow: div.querySelector("#twofa-window") as HTMLDivElement,
			twofaInput: div.querySelector("#twofa-input") as HTMLInputElement,
			twofaSubmit: div.querySelector("#twofa-submit") as HTMLInputElement
		}

		this.ref.avatarChange.addEventListener('change', () => {
			this.ref.avatarImg.src = URL.createObjectURL(this.ref.avatarChange.files[0]);
			this.ref.editAvatar.removeAttribute('off');
		})

		this.ref.editAvatar.addEventListener("click", () => {
			this.avatarUpdate()
		})

		this.ref.username.addEventListener("keydown", () => {
			this.ref.editUsername.removeAttribute("off");
		})

		this.ref.editUsername.addEventListener("click", () => {
			this.state = verifyState.username;
			//this.setVerifyPopup();
		})



	}

	public load(player: string) {
		this.ref.username.value = User.username as string;
		this.ref.twofa.value = (User.twofa as number > 0 ? "2FA Enabled" : "2FA Disabled");
		this.ref.editUsername.toggleAttribute("off", true);
		this.ref.editAvatar.toggleAttribute("off", true);
		Popup.addPopup(this.div);
	}

	public unload() {
		Popup.removePopup();
	}

	//private setVerifyPopup() {
	//	switch (this.state) {
	//		case verifyState.username: {
	//			this.ref.passwordInput.value = "";
	//			Popup.addPopup(this.ref.passwordWindow);
	//			break;
	//		}
	//		case verifyState.password: {
	//			break;
	//		}
	//	}
	//}

	private avatarUpdate() {
		const body = new FormData();
		body.append('avatar', this.ref.avatarChange.files[0]);
		patchRequest("update-info/avatar", body, false)
			.then((json) => {
				// const url = URL.createObjectURL(json.data.cdnPath)
				const url = new URL(json.data.cdnPath);
				console.log(json.data.cdnPath);
				this.ref.avatarImg.src = `https://${window.location.hostname}:7000${encodeURI(url.pathname)}`;
			})
		// .then(() => {
		// 	meRequest()
		// 		.then(() => { console.log(User) })
		// 		.catch((err) => { console.log(err) })
		// 	cdnRequest(User.avatar as string)
		// 		.then((json) => { console.log(json) })
		// 		.catch((err) => { console.log(err) })
		// })
		// .catch(() => {
		// 	console.error("Error changing avatar");
		// })
	}


}


interface profilHtmlReference {
	usernameContainer: HTMLDivElement,
	username: HTMLSpanElement,
	usernameInput: HTMLInputElement,
	avatar: HTMLImageElement,
	avatarFile: HTMLInputElement,
	security: HTMLInputElement,
	edit: HTMLInputElement
}

class Profile {
	private div: HTMLDivElement;
	private ref: profilHtmlReference;

	private stats: Stats;
	private edit: boolean;

	constructor(div: HTMLDivElement) {
		this.div = div;

		this.ref = {
			usernameContainer: div.querySelector("#profile-username") as HTMLDivElement,
			username: div.querySelector("#username-text") as HTMLSpanElement,
			usernameInput: div.querySelector("#username-input") as HTMLInputElement,
			avatar: div.querySelector("#avatar-image") as HTMLImageElement,
			avatarFile: div.querySelector("#avatar-file") as HTMLInputElement,
			security: div.querySelector("#security-input") as HTMLInputElement,
			edit: div.querySelector("#edit-input") as HTMLInputElement
		}

		this.ref.avatarFile.addEventListener('change', () => {
			const body = new FormData();
			body.append('avatar', this.ref.avatarFile.files[0]);
			patchRequest("update-info/avatar", body, false)
				.then((json: any) => {
					this.ref.avatar.src = `/cdn${json.data.cdnPath}`;
				})
				.catch((err) => {
					NotificationManager.addText(err);
				})
		})


		console.log(User.username)
		this.ref.usernameInput.addEventListener("keyup", () => {
			this.ref.edit.disabled = this.ref.usernameInput.value.length <= 0 || this.ref.usernameInput.value == User.username;
		})

		this.ref.edit.addEventListener("click", () => {
			Popup.addValidation(true, User.twofa != 0, (p: string, t: string, success: any) => {
				patchRequest("update-info/username", { username: this.ref.usernameInput.value, password: p, token: t })
					.then((json) => { meRequest("no-cache"); success(); })
					.catch((err) => { NotificationManager.addText(err); })
			})
		})


		this.stats = new Stats(div.querySelector("#stats-div") as HTMLDivElement)

	}

	public load(uuid: string, self = false) {
		Popup.removePopup();
		this.stats.load(uuid);
		this.setup(uuid, self);
	}

	private setup(uuid: string, self: boolean) {
		this.ref.username.remove();
		this.ref.usernameInput.remove();
		this.ref.edit.remove();
		if (self) {
			this.ref.avatarFile.disabled = false;
			this.ref.usernameInput.value = User.username as string;
			this.ref.edit.disabled = true;
			this.ref.avatar.src = `/cdn${User.avatar}`;
			this.ref.usernameContainer.appendChild(this.ref.usernameInput);
			this.ref.usernameContainer.appendChild(this.ref.edit);
			Popup.addPopup(this.div);
		} else {
			postRequest("/info/search", { identifier: uuid, type: "uuid" })
				.then((json: any) => {
					this.ref.avatarFile.disabled = true;
					this.ref.username.innerText = json.data.username;
					this.ref.avatar.src = `/cdn${json.data.avatar_path}`;
					this.ref.usernameContainer.appendChild(this.ref.username);
					Popup.addPopup(this.div);
				})
		}
	}
}

// export default Ath;
export const gAth = new Ath();
