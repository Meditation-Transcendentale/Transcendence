import { NotificationManager } from "./NotificationManager";
import { Popup } from "./Popup";
import { cdnRequest, meRequest, patchRequest, postRequest } from "./requests";
import Stats from "./Stats";
import { User } from "./User";

interface athHtmlReference {
	menu: HTMLDivElement,
	setting: HTMLInputElement,
	quit: HTMLInputElement,
}

class Ath {
	private div: HTMLDivElement;
	private ref: athHtmlReference;
	private css: HTMLElement;

	private quit: AthQuit;
	private profile: Profile;

	private loaded = false;

	constructor(div: HTMLDivElement) {
		this.div = div;
		this.ref = {
			menu: div.querySelector("#menu") as HTMLDivElement,
			setting: div.querySelector("#setting-btn") as HTMLInputElement,
			quit: div.querySelector("#quit-btn") as HTMLInputElement
		}
		this.css = div.querySelector("link") as HTMLElement;

		this.quit = new AthQuit(div);
		this.profile = new Profile(div.querySelector("#profile-div") as HTMLDivElement);
		//this.setting = new AthSetting(div);
		// this.notif = new AthNotif(div);

		this.ref.setting.addEventListener('click', () => {
			this.profile.load(User.username);
		})

		this.ref.quit.addEventListener("click", () => {
			this.quit.load();
		})





		// this.ref.settingEdit.addEventListener("click", () => { //FOR Username
		// })

		NotificationManager.setupWs();

		console.log("USER", User);
	}

	public load(params: URLSearchParams) {
		if (this.loaded) { return; }
		document.head.appendChild(this.css);
		document.body.appendChild(this.ref.menu);
		this.loaded = true;
	}

	public async unload() {
		this.ref.menu.remove();
		this.loaded = false;
	}

	// private settingUpdate() {
	// 	if (this.avatarChange) {
	// 		const body = new FormData();
	// 		body.append('avatar', this.ref.avatarChange.files[0]);
	// 		patchRequest("update-info/avatar", body, false)
	// 			.then(() => {
	// 				this.ref.settingEdit.toggleAttribute("off", true);
	// 				this.avatarChange = false;
	// 				meRequest()
	// 					.then(() => { console.log(User) })
	// 					.catch((err) => { console.log(err) })
	// 				cdnRequest(User.avatar as string)
	// 					.then((json) => { console.log(json) })
	// 					.catch((err) => { console.log(err) })
	// 			})
	// 			.catch(() => {
	// 				console.error("Error changing avatar");
	// 			})
	// 	}
	// }
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
			alert("fix cdn");
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


}


interface profilHtmlReference {
	username: HTMLInputElement,
	avatar: HTMLImageElement,
	avatarFile: HTMLInputElement,
	security: HTMLInputElement,
}

class Profile {
	private div: HTMLDivElement;
	private ref: profilHtmlReference;

	private stats: Stats;

	constructor(div: HTMLDivElement) {
		this.div = div;

		this.ref = {
			username: div.querySelector("#username-input") as HTMLInputElement,
			avatar: div.querySelector("#avatar-image") as HTMLImageElement,
			avatarFile: div.querySelector("#avatar-file") as HTMLInputElement,
			security: div.querySelector("#security-input") as HTMLInputElement,
		}

		this.ref.avatarFile.addEventListener('change', () => {
			this.ref.avatar.src = URL.createObjectURL(this.ref.avatarFile.files[0]);
		})

		this.stats = new Stats(div.querySelector("#stats-div") as HTMLDivElement)

	}

	public load(player: string) {
		this.stats.load(player);
		Popup.addPopup(this.div);
	}


}

export default Ath;
